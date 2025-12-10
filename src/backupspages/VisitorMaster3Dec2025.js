import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box, Paper, Typography, Container, CircularProgress, useTheme, useMediaQuery, Avatar,
  Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { baseUrl } from '../config/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const marathiFontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Mangal:wght@400;700&display=swap');
  body { font-family: 'Mangal', Arial, sans-serif !important; }
`;

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  borderRadius: '12px',
  backgroundColor: 'white',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  '& .MuiDataGrid-row': {
    cursor: 'pointer',
    '&:hover': { backgroundColor: '#e3f2fd !important' },
  },
}));

const VisitorsMaster = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();

  const [visitors, setVisitors] = useState([]);
  const [allVisitors, setAllVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalVisitors: 0
  });

  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const columns = [
    { field: 'id', headerName: 'अ.क्र.', width: 80, headerAlign: 'center', align: 'center' },
    {
      field: 'photo',
      headerName: 'फोटो',
      width: 110,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const photoUrl = params.row.visitorPhoto ||
                         (params.row.visits?.length > 0 ? params.row.visits[params.row.visits.length - 1].visitorPhoto : null);

        return (
          <Avatar
            src={photoUrl}
            alt={params.row.fullName}
            sx={{
              width: 56,
              height: 56,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              bgcolor: '#e3f2fd'
            }}
          >
            {params.row.fullName?.charAt(0).toUpperCase()}
          </Avatar>
        );
      },
    },
    {
      field: 'fullName',
      headerName: 'पूर्ण नाव',
      width: 220,
      flex: 1,
      renderCell: (params) => (
        <Typography
          onClick={() => navigate(`/visitorhistory/${params.row._id}`)}
          sx={{
            color: '#1976d2',
            fontWeight: 600,
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline', color: '#0d47a1' },
          }}
        >
          {params.row.fullName}
        </Typography>
      ),
    },
    { field: 'mobileNumber', headerName: 'मोबाईल', width: 140 },
    { field: 'policeStation', headerName: 'पोलीस स्टेशन', width: 200 },
    { field: 'fullAddress', headerName: 'पत्ता', width: 250, flex: 1 },
    { field: 'pincode', headerName: 'पिनकोड', width: 120 },
    { field: 'district', headerName: 'जिल्हा', width: 150 },
  ];

  const filterVisitorsByDateRange = (visitorsData, start, end) => {
    if (!start || !end) return visitorsData;

    const startDateTime = dayjs(start).startOf('day');
    const endDateTime = dayjs(end).endOf('day');

    return visitorsData.filter(visitor => {
      if (!visitor.visits || visitor.visits.length === 0) return false;

      const hasVisitInRange = visitor.visits.some(visit => {
        const entryDate = dayjs(visit.entryAt);
        return entryDate.isAfter(startDateTime) && entryDate.isBefore(endDateTime);
      });

      return hasVisitInRange;
    });
  };

  const fetchVisitors = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/allVisitors`, {
        params: { page, limit: 10, search }
      });
      if (res.data.success) {
        let visitorsData = res.data.data.visitors;

        if (isFiltered && startDate && endDate) {
          visitorsData = filterVisitorsByDateRange(visitorsData, startDate, endDate);
        }

        const formatted = visitorsData.map((v, i) => ({
          id: i + 1 + (page - 1) * 10,
          ...v,
        }));
        setVisitors(formatted);
        setPagination(res.data.data.pagination);
      }
    } catch (err) {
      toast.error("Visitors लोड करण्यात त्रुटी!");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllForDownload = async () => {
    try {
      const res = await axios.get(`${baseUrl}/allVisitors`, { params: { limit: 10000 } });
      if (res.data.success) {
        let visitorsData = res.data.data.visitors;

        if (isFiltered && startDate && endDate) {
          visitorsData = filterVisitorsByDateRange(visitorsData, startDate, endDate);
        }

        const formatted = visitorsData.map((v, i) => ({
          'अ.क्र.': i + 1,
          'पूर्ण नाव': v.fullName || '-',
          'मोबाईल': v.mobileNumber || '-',
          'पोलीस स्टेशन': v.policeStation || '-',
          'पत्ता': v.fullAddress || '-',
          'पिनकोड': v.pincode || '-',
          'जिल्हा': v.district || '-',
        }));
        setAllVisitors(formatted);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVisitors();
    fetchAllForDownload();
  }, [isFiltered, startDate, endDate]);

  const handleApplyDateFilter = () => {
    if (!startDate || !endDate) {
      toast.warn("कृपया सुरवात आणि शेवटची तारीख निवडा!");
      return;
    }

    if (dayjs(endDate).isBefore(dayjs(startDate))) {
      toast.error("शेवटची तारीख सुरवातीच्या तारखेपेक्षा मागे असू शकत नाही!");
      return;
    }

    setIsFiltered(true);
    setDateFilterOpen(false);
    toast.success(`${dayjs(startDate).format('DD/MM/YYYY')} ते ${dayjs(endDate).format('DD/MM/YYYY')} या कालावधीत फिल्टर लागू केला!`);
  };

  const handleClearFilter = () => {
    setStartDate('');
    setEndDate('');
    setIsFiltered(false);
    setDateFilterOpen(false);
    toast.info("फिल्टर काढला!");
  };

  const handleDownloadExcel = () => {
    if (allVisitors.length === 0) {
      toast.warn("डाउनलोडसाठी डेटा उपलब्ध नाही!");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(allVisitors);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visitors");

    const fileName = isFiltered && startDate && endDate
      ? `भेट_देणाऱ्यांची_यादी_${dayjs(startDate).format('DD-MMM-YYYY')}_ते_${dayjs(endDate).format('DD-MMM-YYYY')}.xlsx`
      : `भेट_देणाऱ्यांची_यादी_${dayjs().format('DD-MMM-YYYY')}.xlsx`;

    XLSX.writeFile(wb, fileName);
    toast.success("Excel यशस्वीरित्या डाउनलोड झाला!");
  };

  const handleDownloadPDF = () => {
    if (allVisitors.length === 0) {
      toast.warn("PDF साठी डेटा उपलब्ध नाही!");
      return;
    }

    const dateRangeText = isFiltered && startDate && endDate
      ? `<h3 style="text-align:center; margin:10px 0; color:#d32f2f;">कालावधी: ${dayjs(startDate).format('DD/MM/YYYY')} ते ${dayjs(endDate).format('DD/MM/YYYY')}</h3>`
      : '';

    const content = `
      <div style="font-family: 'Mangal', sans-serif; padding: 40px; direction: ltr; font-size: 14px;">
        <h1 style="text-align:center; color:#d32f2f; margin:15px 0;">ठाणे ग्रामीण पोलीस</h1>
        <h2 style="text-align:center; color:#0d47a1; margin:10px 0;">भेट देणाऱ्यांची यादी (Visitors Master)</h2>
        ${dateRangeText}
        <h3 style="text-align:center; margin:20px 0; color:#1976d2;">
          एकूण भेट देणारे: <strong>${allVisitors.length}</strong> | तारीख: ${dayjs().format('DD/MM/YYYY')}
        </h3>

        <table border="1" cellspacing="0" cellpadding="10" style="width:100%; border-collapse:collapse; margin-top:20px; font-size:13px;">
          <thead style="background:#1976d2; color:white;">
            <tr>
              <th>अ.क्र.</th><th>पूर्ण नाव</th><th>मोबाईल</th><th>पोलीस स्टेशन</th><th>पत्ता</th><th>पिनकोड</th><th>जिल्हा</th>
            </tr>
          </thead>
          <tbody>
            ${allVisitors.map((v, i) => `
              <tr style="text-align:center;">
                <td>${i + 1}</td>
                <td>${v['पूर्ण नाव']}</td>
                <td>${v['मोबाईल']}</td>
                <td>${v['पोलीस स्टेशन']}</td>
                <td>${v['पत्ता']}</td>
                <td>${v['पिनकोड']}</td>
                <td>${v['जिल्हा']}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="margin-top:50px; text-align:right;">
          <p>तयार केले: ____________________</p>
          <p>दिनांक: ${dayjs().format('DD/MM/YYYY')}</p>
        </div>
      </div>
    `;

    const element = document.createElement('div');
    element.innerHTML = content;

    const style = document.createElement('style');
    style.innerHTML = marathiFontStyle;
    element.prepend(style);

    document.body.appendChild(element);

    const fileName = isFiltered && startDate && endDate
      ? `भेट_देणाऱ्यांची_यादी_${dayjs(startDate).format('DD-MMM-YYYY')}_ते_${dayjs(endDate).format('DD-MMM-YYYY')}.pdf`
      : `भेट_देणाऱ्यांची_यादी_${dayjs().format('DD-MMM-YYYY')}.pdf`;

    html2pdf()
      .set({
        margin: [15, 20, 15, 20],
        filename: fileName,
        html2canvas: { scale: 2 },
        jsPDF: { format: 'a4', orientation: 'landscape' }
      })
      .from(element)
      .save()
      .then(() => {
        document.body.removeChild(element);
        toast.success("PDF यशस्वीरित्या तयार झाला!");
      });
  };

  const getResponsiveWidth = () => (isMobile ? '100%' : isTablet ? '90%' : '80%');
  const getResponsiveMargin = () => (isMobile ? '0' : isTablet ? (isSidebarOpen ? '15%' : '5%') : (isSidebarOpen ? '18%' : '8%'));

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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
        <CircularProgress size={70} sx={{ color: '#23CCEF' }} />
      </Box>
    );
  }

  return (
    <div style={gridStyle}>
      <Container maxWidth={false} sx={{ p: '0 !important' }}>
        <Paper elevation={0} sx={{ p: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', bgcolor: 'white', boxShadow: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#0d2136', fontWeight: 600 }}>
              Visitors Master
              {isFiltered && startDate && endDate && (
                <Typography variant="body2" sx={{ color: '#d32f2f', fontWeight: 500, mt: 1 }}>
                  फिल्टर: {dayjs(startDate).format('DD/MM/YYYY')} ते {dayjs(endDate).format('DD/MM/YYYY')}
                </Typography>
              )}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Tooltip title="तारीख निवडा">
                <Button
                  variant="contained"
                  startIcon={<FilterListIcon />}
                  onClick={() => setDateFilterOpen(true)}
                  sx={{
                    bgcolor: isFiltered ? '#ed6c02' : '#1976d2',
                    '&:hover': { bgcolor: isFiltered ? '#e65100' : '#1565c0' }
                  }}
                >
                  {isFiltered ? 'फिल्टर सक्रिय' : 'तारीख फिल्टर'}
                </Button>
              </Tooltip>

              {isFiltered && (
                <Tooltip title="फिल्टर काढा">
                  <Button
                    variant="outlined"
                    startIcon={<ClearIcon />}
                    onClick={handleClearFilter}
                    sx={{
                      borderColor: '#d32f2f',
                      color: '#d32f2f',
                      '&:hover': { borderColor: '#b71c1c', bgcolor: '#ffebee' }
                    }}
                  >
                    Clear
                  </Button>
                </Tooltip>
              )}

              <Tooltip title="Excel डाउनलोड">
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadExcel}
                  sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
                >
                  Excel
                </Button>
              </Tooltip>

              <Tooltip title="PDF डाउनलोड (मराठी फॉन्टसह)">
                <Button
                  variant="contained"
                  startIcon={<PictureAsPdfIcon />}
                  onClick={handleDownloadPDF}
                  sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
                >
                  PDF
                </Button>
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ width: '100%', height: isMobile ? 500 : 650 }}>
            <StyledDataGrid
              rows={visitors}
              columns={columns}
              pageSizeOptions={[10, 20, 50]}
              paginationMode="server"
              rowCount={pagination.totalVisitors || 0}
              loading={loading}
              onPaginationModelChange={(model) => fetchVisitors(model.page + 1)}
              initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            />
          </Box>
        </Paper>
      </Container>

      <Dialog open={dateFilterOpen} onClose={() => setDateFilterOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 600 }}>
          तारीख फिल्टर निवडा
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            label="सुरुवातीची तारीख"
            type="date"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
          />
          <TextField
            label="शेवटची तारीख"
            type="date"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDateFilterOpen(false)} sx={{ color: '#666' }}>
            रद्द करा
          </Button>
          <Button
            onClick={handleApplyDateFilter}
            variant="contained"
            sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
          >
            फिल्टर लागू करा
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VisitorsMaster;

// ====================================================






