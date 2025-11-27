import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box, Paper, Typography, Button, Container, CircularProgress, useTheme, useMediaQuery,
  IconButton, Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { baseUrl } from '../config/config';
import { useDispatch, useSelector} from 'react-redux';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  borderRadius: '12px',
  backgroundColor: 'white',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  '& .MuiDataGrid-main': { borderRadius: '12px' },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #e9ecef',
    borderRadius: '12px 12px 0 0',
    fontSize: '14px',
    fontWeight: 600,
    color: '#495057',
    minHeight: '56px !important',
  },
  '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 600, fontSize: '14px', color: '#495057' },
  '& .MuiDataGrid-cell': {
    padding: theme.spacing(1.5),
    fontSize: '14px',
    color: '#495057',
    borderBottom: '1px solid #f1f3f4',
  },
  '& .MuiDataGrid-row': {
    '&:nth-of-type(odd)': { backgroundColor: '#fbfcfd' },
    '&:nth-of-type(even)': { backgroundColor: 'white' },
    '&:hover': {
      backgroundColor: '#e3f2fd !important',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s ease-in-out',
    },
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: '#f8f9fa',
    borderTop: '2px solid #e9ecef',
    borderRadius: '0 0 12px 12px',
    minHeight: '56px',
  },
}));

const columns = [
  { field: 'id', headerName: 'SR.NO', width: 90, headerAlign: 'center', align: 'center' },
  {
    field: 'photo',
    headerName: 'PHOTO',
    width: 100,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Avatar
        src={params.row.visitorPhoto}
        alt={params.row.fullName}
        sx={{ width: 50, height: 50, border: '3px solid #0040B9' }}
      >
        {params.row.fullName.charAt(0)}
      </Avatar>
    ),
  },
  { field: 'fullName', headerName: 'FULL NAME', width: 200, flex: 1 },
  { field: 'mobileNumber', headerName: 'MOBILE', width: 150, flex: 0.8 },
  { field: 'policeStation', headerName: 'POLICE STATION', width: 220, flex: 1 },
  { field: 'reasonToVisit', headerName: 'REASON', width: 180, flex: 1 },
  { field: 'entryTime', headerName: 'ENTRY TIME', width: 180, flex: 1 },
  { 
    field: 'feedback', 
    headerName: 'FEEDBACK', 
    width: 140, 
    flex: 0.8,
    renderCell: (params) => (
      <Typography sx={{ 
        fontWeight: 'bold', 
        color: params.row.feedbackGiven ? '#28a745' : '#dc3545',
        backgroundColor: params.row.feedbackGiven ? '#d4edda' : '#f8d7da',
        px: 1.5, py: 0.5, borderRadius: 2
      }}>
        {params.row.feedback || "Pending"}
      </Typography>
    )
  },
];

const VisitorMaster = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalVisitors: 0
  });

  const fetchVisitors = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/allVisitors`, {
        params: { page, limit: 10, search }
      });
      if (res.data.success) {
        const formatted = res.data.data.visitors.map((v, i) => ({
          id: i + 1 + (page - 1) * 10,
          ...v,
          entryTime: new Date(v.entryAt).toLocaleString('en-IN')
        }));
        setVisitors(formatted);
        setPagination(res.data.data.pagination);
      }
    } catch (err) {
      console.error("Error fetching visitors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const getResponsiveWidth = () => {
    if (isMobile) return '100%';
    if (isTablet) return '90%';
    return '92%';
  };

 const getResponsiveMargin = () => {
    if (isMobile) return '0';
    if (isTablet) return isSidebarOpen ? '15%' : '5%';
    return isSidebarOpen ? '18%' : '8%';
  };

  const gridStyle = {
    minHeight: 'calc(100vh - 40px)',
    width: getResponsiveWidth(),
    marginLeft: getResponsiveMargin(),
    marginTop: '100px',
    marginBottom: '20px',
    transition: 'all 0.3s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8f9fa',
    padding: isMobile ? '10px' : '20px',
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
        <CircularProgress size={60} sx={{ color: '#23CCEF' }} />
      </Box>
    );
  }

  return (
    <div style={gridStyle}>
      <Container maxWidth={false} sx={{ padding: '0 !important' }}>
        <Paper elevation={0} sx={{ padding: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', backgroundColor: 'white', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', border: '1px solid #e9ecef' }}>
          
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 2 : 0 }}>
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#0d2136', fontWeight: 600, fontSize: isMobile ? '1.5rem' : '1.75rem', letterSpacing: '0.5px', textAlign: isMobile ? 'center' : 'left' }}>
              VISITOR MASTER
            </Typography>
            {/* <Button
              size="small"
              variant="outlined"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: '#20B2AA',
                color: '#fff',
                borderColor: '#20B2AA',
                cursor: 'pointer',
                textTransform: 'uppercase',
                '&:hover': { backgroundColor: '#20B2AA', borderColor: '#20B2AA', transform: 'translateY(-1px)', boxShadow: '0 4px 12px #20B2AA', opacity: '0.9' },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Add Visitor
            </Button> */}
          </Box>

          <Box sx={{ width: '100%', height: isMobile ? '500px' : '650px' }}>
            <StyledDataGrid
              rows={visitors}
              columns={columns}
              pageSizeOptions={[5, 10, 20]}
              paginationMode="server"
              rowCount={pagination.totalVisitors}
              loading={loading}
              onPaginationModelChange={(model) => fetchVisitors(model.page + 1)}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
            />
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default VisitorMaster;