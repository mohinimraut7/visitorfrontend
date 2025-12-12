// src/pages/OfficeMaster.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Button, Typography, IconButton, Paper, Container,
  CircularProgress, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, useTheme, useMediaQuery
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import AddOfficeModal from '../components/modals/AddOfficeModal';
import { baseUrl } from '../config/config';
import { useSelector } from 'react-redux';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: '#fbfcfd' },
  '&:hover': {
    backgroundColor: '#e3f2fd !important',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
}));

const OfficeMaster = () => {
  const [officeTypes, setOfficeTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentOffice, setCurrentOffice] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);

  const fetchOfficeTypes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/getOffices`);
      const data = await res.json();

      if (res.ok) {
        setOfficeTypes(data.offices || []);
      } else {
        toast.error(data.message || 'Failed to load office types');
      }
    } catch (err) {
      toast.error('Server Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfficeTypes();
  }, []);

  const handleOpenAdd = () => {
    setCurrentOffice(null);
    setOpenModal(true);
  };

  const handleOpenEdit = (office) => {
    setCurrentOffice(office);
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this office type?')) return;

    try {
      const res = await fetch(`${baseUrl}/deleteOffice/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (res.ok) {
        toast.success('Office type deleted successfully!');
        fetchOfficeTypes();
      } else {
        toast.error(data.message || 'Delete failed');
      }
    } catch (err) {
      toast.error('Server Error');
    }
  };

  const getResponsiveMargin = () => isMobile ? '0' : isSidebarOpen ? '17%' : '4%';
  const getResponsiveWidth = () => isMobile ? '100%' : isSidebarOpen ? '82%' : '92%';

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} sx={{ color: '#20B2AA' }} />
      </Box>
    );
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 40px)',
      backgroundColor: '#f8f9fa',
      padding: isMobile ? '10px' : '20px',
      marginTop: '80px',
      marginLeft: getResponsiveMargin(),
      width: getResponsiveWidth(),
      transition: 'all 0.3s ease',
    }}>
      <Container maxWidth={false} sx={{ p: 0 }}>
        <Paper elevation={0} sx={{
          p: isMobile ? '20px 15px' : '30px 25px',
          borderRadius: '16px',
          bgcolor: 'white',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e9ecef'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 700, color: '#0d2136' }}>
              OFFICE MASTER
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAdd}
              sx={{
                bgcolor: '#20B2AA',
                '&:hover': { bgcolor: '#1a9a8f' },
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Add Office Type
            </Button>
          </Box>

          <TableContainer sx={{ borderRadius: '12px', overflow: 'hidden' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Sr.No</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Office Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {officeTypes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                      No Office Types Found
                    </TableCell>
                  </TableRow>
                ) : (
                  officeTypes.map((office, index) => (
                    <StyledTableRow key={office._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                        {office.officeType}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpenEdit(office)} color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(office._id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      <AddOfficeModal
        open={openModal}
        handleClose={handleClose}
        currentOffice={currentOffice}
        onSuccess={() => {
          handleClose();
          fetchOfficeTypes();
        }}
      />
    </div>
  );
};

export default OfficeMaster;