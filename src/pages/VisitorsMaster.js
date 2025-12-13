// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Box, Paper, Typography, Button, Container, CircularProgress, useTheme, useMediaQuery,
//   IconButton, Avatar
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useDispatch, useSelector} from 'react-redux';
// import { useNavigate } from 'react-router-dom'; // नवीन import

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   border: 'none',
//   borderRadius: '12px',
//   backgroundColor: 'white',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//   '& .MuiDataGrid-main': { borderRadius: '12px' },
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '2px solid #e9ecef',
//     borderRadius: '12px 12px 0 0',
//     fontSize: '14px',
//     fontWeight: 600,
//     color: '#495057',
//     minHeight: '56px !important',
//   },
//   '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 600, fontSize: '14px', color: '#495057' },
//   '& .MuiDataGrid-cell': {
//     padding: theme.spacing(1.5),
//     fontSize: '14px',
//     color: '#495057',
//     borderBottom: '1px solid #f1f3f4',
//   },
//   '& .MuiDataGrid-row': {
//     '&:nth-of-type(odd)': { backgroundColor: '#fbfcfd' },
//     '&:nth-of-type(even)': { backgroundColor: 'white' },
//     '&:hover': {
//       backgroundColor: '#e3f2fd !important',
//       transform: 'translateY(-1px)',
//       boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//       transition: 'all 0.2s ease-in-out',
//     },
//   },
//   '& .MuiDataGrid-footerContainer': {
//     backgroundColor: '#f8f9fa',
//     borderTop: '2px solid #e9ecef',
//     borderRadius: '0 0 12px 12px',
//     minHeight: '56px',
//   },
// }));

// const columns = (navigate) => [
//   { field: 'id', headerName: 'SR.NO', width: 90, headerAlign: 'center', align: 'center' },
//   {
//     field: 'photo',
//     headerName: 'PHOTO',
//     width: 100,
//     headerAlign: 'center',
//     align: 'center',
//     renderCell: (params) => (
//       <Avatar
//         src={params.row.visitorPhoto}
//         alt={params.row.fullName}
//         sx={{ width: 50, height: 50, border: '3px solid #0040B9' }}
//       >
//         {params.row.fullName.charAt(0)}
//       </Avatar>
//     ),
//   },
//   // { field: 'fullName', headerName: 'FULL NAME', width: 200, flex: 1 },
//    {
//     field: 'fullName',
//     headerName: 'FULL NAME',
//     width: 200,
//     flex: 1,
//     renderCell: (params) => (
//       <Typography
//         onClick={() => navigate(`/visitorhistory/${params.row._id}`)} // ID ने पाठवतो
//         sx={{
//           color: '#1976d2',
//           fontWeight: 600,
//           cursor: 'pointer',
//           '&:hover': {
//             textDecoration: 'underline',
//             color: '#0d47a1',
//           },
//         }}
//       >
//         {params.row.fullName}
//       </Typography>
//     ),
//   },
//   { field: 'mobileNumber', headerName: 'MOBILE', width: 150, flex: 0.8 },
//   { field: 'policeStation', headerName: 'POLICE STATION', width: 220, flex: 1 },
//    { field: 'pincode', headerName: 'PINCODE', width: 180, flex: 1 },
//   { field: 'district', headerName: 'DISTRICT', width: 180, flex: 1 },

  
//   // { field: 'reasonToVisit', headerName: 'REASON', width: 180, flex: 1 },
//   // { field: 'entryTime', headerName: 'ENTRY TIME', width: 180, flex: 1 },
//   // { 
//   //   field: 'feedback', 
//   //   headerName: 'FEEDBACK', 
//   //   width: 140, 
//   //   flex: 0.8,
//   //   renderCell: (params) => (
//   //     <Typography sx={{ 
//   //       fontWeight: 'bold', 
//   //       color: params.row.feedbackGiven ? '#28a745' : '#dc3545',
//   //       backgroundColor: params.row.feedbackGiven ? '#d4edda' : '#f8d7da',
//   //       px: 1.5, py: 0.5, borderRadius: 2
//   //     }}>
//   //       {params.row.feedback || "Pending"}
//   //     </Typography>
//   //   )
//   // },
// ];

// const VisitorsMaster = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

//   const [visitors, setVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//     const navigate = useNavigate(); // नवीन

//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalVisitors: 0
//   });

//   const fetchVisitors = async (page = 1, search = '') => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, {
//         params: { page, limit: 10, search }
//       });
//       if (res.data.success) {
//         const formatted = res.data.data.visitors.map((v, i) => ({
//           id: i + 1 + (page - 1) * 10,
//           ...v,
//           entryTime: new Date(v.entryAt).toLocaleString('en-IN')
//         }));
//         setVisitors(formatted);
//         setPagination(res.data.data.pagination);
//       }
//     } catch (err) {
//       console.error("Error fetching visitors:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//   }, []);

//   const getResponsiveWidth = () => {
//     if (isMobile) return '100%';
//     if (isTablet) return '90%';
//     return '92%';
//   };

//  const getResponsiveMargin = () => {
//     if (isMobile) return '0';
//     if (isTablet) return isSidebarOpen ? '15%' : '5%';
//     return isSidebarOpen ? '18%' : '8%';
//   };

//   const gridStyle = {
//     minHeight: 'calc(100vh - 40px)',
//     width: getResponsiveWidth(),
//     marginLeft: getResponsiveMargin(),
//     marginTop: '100px',
//     marginBottom: '20px',
//     transition: 'all 0.3s ease-in-out',
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#f8f9fa',
//     padding: isMobile ? '10px' : '20px',
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
//         <CircularProgress size={60} sx={{ color: '#23CCEF' }} />
//       </Box>
//     );
//   }

//   return (
//     <div style={gridStyle}>
//       <Container maxWidth={false} sx={{ padding: '0 !important' }}>
//         <Paper elevation={0} sx={{ padding: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', backgroundColor: 'white', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', border: '1px solid #e9ecef' }}>
          
//           <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 2 : 0 }}>
//             <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#0d2136', fontWeight: 600, fontSize: isMobile ? '1.5rem' : '1.75rem', letterSpacing: '0.5px', textAlign: isMobile ? 'center' : 'left' }}>
//               VISITORS MASTER
//             </Typography>
//             {/* <Button
//               size="small"
//               variant="outlined"
//               startIcon={<AddIcon />}
//               sx={{
//                 backgroundColor: '#20B2AA',
//                 color: '#fff',
//                 borderColor: '#20B2AA',
//                 cursor: 'pointer',
//                 textTransform: 'uppercase',
//                 '&:hover': { backgroundColor: '#20B2AA', borderColor: '#20B2AA', transform: 'translateY(-1px)', boxShadow: '0 4px 12px #20B2AA', opacity: '0.9' },
//                 transition: 'all 0.2s ease-in-out',
//               }}
//             >
//               Add Visitor
//             </Button> */}
//           </Box>

//           <Box sx={{ width: '100%', height: isMobile ? '500px' : '650px' }}>
//             <StyledDataGrid
//               rows={visitors}
//               columns={columns}
//               pageSizeOptions={[5, 10, 20]}
//               paginationMode="server"
//               rowCount={pagination.totalVisitors}
//               loading={loading}
//               onPaginationModelChange={(model) => fetchVisitors(model.page + 1)}
//               initialState={{
//                 pagination: { paginationModel: { pageSize: 10 } },
//               }}
//             />
//           </Box>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default VisitorsMaster;


// ==================================================

// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Box, Paper, Typography, Container, CircularProgress, useTheme, useMediaQuery, Avatar, Typography as MuiTypography
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   // तुमचा सगळा styling same राहील
//   border: 'none',
//   borderRadius: '12px',
//   backgroundColor: 'white',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//   '& .MuiDataGrid-row': {
//     cursor: 'pointer',
//     '&:hover': {
//       backgroundColor: '#e3f2fd !important',
//     },
//   },
//   // बाकी styling तुम्ही ठेवू शकता…
// }));

// const VisitorsMaster = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const navigate = useNavigate();

//   const [visitors, setVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalVisitors: 0
//   });

//   // ======== COLUMNS आता फंक्शन नाही, डायरेक्ट array आहे ========
//   const columns = [
//     { field: 'id', headerName: 'SR.NO', width: 90, headerAlign: 'center', align: 'center' },
//     {
//       field: 'photo',
//       headerName: 'PHOTO',
//       width: 100,
//       headerAlign: 'center',
//       align: 'center',
//       renderCell: (params) => (
//         <Avatar
//           src={params.row.visitorPhoto}
//           alt={params.row.fullName}
//           sx={{ width: 50, height: 50, border: '3px solid #0040B9' }}
//         >
//           {params.row.fullName?.charAt(0)}
//         </Avatar>
//       ),
//     },
//     {
//       field: 'fullName',
//       headerName: 'FULL NAME',
//       width: 200,
//       flex: 1,
//       renderCell: (params) => (
//         <MuiTypography
//           onClick={() => navigate(`/visitorhistory/${params.row._id}`)}
//           sx={{
//             color: '#1976d2',
//             fontWeight: 600,
//             cursor: 'pointer',
//             '&:hover': {
//               textDecoration: 'underline',
//               color: '#0d47a1',
//             },
//           }}
//         >
//           {params.row.fullName}
//         </MuiTypography>
//       ),
//     },
//     { field: 'mobileNumber', headerName: 'MOBILE', width: 150 },
//     { field: 'policeStation', headerName: 'POLICE STATION', width: 220, flex: 1 },
//     { field: 'pincode', headerName: 'PINCODE', width: 180 },
//     { field: 'district', headerName: 'DISTRICT', width: 180 },
//   ];
//   // ================================================================

//   const fetchVisitors = async (page = 1, search = '') => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, {
//         params: { page, limit: 10, search }
//       });
//       if (res.data.success) {
//         const formatted = res.data.data.visitors.map((v, i) => ({
//           id: i + 1 + (page - 1) * 10,
//           ...v,
//           // जर तुम्हाला latest visit चा entryAt हवा असेल तर backend मध्ये change करा
//           // entryTime: new Date(v.visits?.[v.visits.length-1]?.entryAt || v.createdAt).toLocaleString('en-IN')
//         }));
//         setVisitors(formatted);
//         setPagination(res.data.data.pagination);
//       }
//     } catch (err) {
//       console.error("Error fetching visitors:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//   }, []);

//   // तुमचे responsive styles same राहतील…
//   const getResponsiveWidth = () => (isMobile ? '100%' : isTablet ? '90%' : '92%');
//   const getResponsiveMargin = () => (isMobile ? '0' : isTablet ? (isSidebarOpen ? '15%' : '5%') : (isSidebarOpen ? '18%' : '8%'));

//   const gridStyle = {
//     minHeight: 'calc(100vh - 40px)',
//     width: getResponsiveWidth(),
//     marginLeft: getResponsiveMargin(),
//     marginTop: '100px',
//     marginBottom: '20px',
//     transition: 'all 0.3s ease-in-out',
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#f8f9fa',
//     padding: isMobile ? '10px' : '20px',
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
//         <CircularProgress size={60} sx={{ color: '#23CCEF' }} />
//       </Box>
//     );
//   }

//   return (
//     <div style={gridStyle}>
//       <Container maxWidth={false} sx={{ p: '0 !important' }}>
//         <Paper elevation={0} sx={{ p: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', bgcolor: 'white', boxShadow: 3 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
//             <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#0d2136', fontWeight: 600 }}>
//               VISITORS MASTER
//             </Typography>
//           </Box>

//           <Box sx={{ width: '100%', height: isMobile ? 500 : 650 }}>
//             <StyledDataGrid
//               rows={visitors}
//               columns={columns}                  // आता columns array आहे → error जाणार
//               pageSizeOptions={[10, 20, 50]}
//               paginationMode="server"
//               rowCount={pagination.totalVisitors || 0}
//               loading={loading}
//               onPaginationModelChange={(model) => fetchVisitors(model.page + 1)}
//               initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
//             />
//           </Box>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default VisitorsMaster;
// =============================================================
// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Box, Paper, Typography, Container, CircularProgress, useTheme, useMediaQuery, Avatar,
//   Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import DownloadIcon from '@mui/icons-material/Download';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import ClearIcon from '@mui/icons-material/Clear';
// import html2pdf from 'html2pdf.js';
// import * as XLSX from 'xlsx';
// import dayjs from 'dayjs';
// import { toast } from 'react-toastify';

// const marathiFontStyle = `
//   @import url('https://fonts.googleapis.com/css2?family=Mangal:wght@400;700&display=swap');
//   body { font-family: 'Mangal', Arial, sans-serif !important; }
// `;

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   border: 'none',
//   borderRadius: '12px',
//   backgroundColor: 'white',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//   '& .MuiDataGrid-row': {
//     cursor: 'pointer',
//     '&:hover': { backgroundColor: '#e3f2fd !important' },
//   },
// }));

// const VisitorsMaster = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const navigate = useNavigate();

//   const [visitors, setVisitors] = useState([]);
//   const [allVisitors, setAllVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalVisitors: 0
//   });

//   const [dateFilterOpen, setDateFilterOpen] = useState(false);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [isFiltered, setIsFiltered] = useState(false);

//   const columns = [
//     { field: 'id', headerName: 'अ.क्र.', width: 80, headerAlign: 'center', align: 'center' },
//     {
//       field: 'photo',
//       headerName: 'फोटो',
//       width: 110,
//       headerAlign: 'center',
//       align: 'center',
//       sortable: false,
//       renderCell: (params) => {
//         const photoUrl = params.row.visitorPhoto ||
//                          (params.row.visits?.length > 0 ? params.row.visits[params.row.visits.length - 1].visitorPhoto : null);

//         return (
//           <Avatar
//             src={photoUrl}
//             alt={params.row.fullName}
//             sx={{
//               width: 56,
//               height: 56,
//               boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//               fontSize: '1.4rem',
//               fontWeight: 'bold',
//               bgcolor: '#e3f2fd'
//             }}
//           >
//             {params.row.fullName?.charAt(0).toUpperCase()}
//           </Avatar>
//         );
//       },
//     },
//     {
//       field: 'fullName',
//       headerName: 'पूर्ण नाव',
//       width: 220,
//       flex: 1,
//       renderCell: (params) => (
//         <Typography
//           onClick={() => navigate(`/visitorhistory/${params.row._id}`)}
//           sx={{
//             color: '#1976d2',
//             fontWeight: 600,
//             cursor: 'pointer',
//             '&:hover': { textDecoration: 'underline', color: '#0d47a1' },
//           }}
//         >
//           {params.row.fullName}
//         </Typography>
//       ),
//     },
//     { field: 'mobileNumber', headerName: 'मोबाईल', width: 140 },
//     { field: 'policeStation', headerName: 'पोलीस स्टेशन', width: 200 },
//     { field: 'fullAddress', headerName: 'पत्ता', width: 250, flex: 1 },
//     { field: 'pincode', headerName: 'पिनकोड', width: 120 },
//     { field: 'district', headerName: 'जिल्हा', width: 150 },
//   ];

//   const filterVisitorsByDateRange = (visitorsData, start, end) => {
//     if (!start || !end) return visitorsData;

//     const startDateTime = dayjs(start).startOf('day');
//     const endDateTime = dayjs(end).endOf('day');

//     return visitorsData.filter(visitor => {
//       if (!visitor.visits || visitor.visits.length === 0) return false;

//       const hasVisitInRange = visitor.visits.some(visit => {
//         const entryDate = dayjs(visit.entryAt);
//         return entryDate.isAfter(startDateTime) && entryDate.isBefore(endDateTime);
//       });

//       return hasVisitInRange;
//     });
//   };

//   const fetchVisitors = async (page = 1, search = '') => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, {
//         params: { page, limit: 10, search }
//       });
//       if (res.data.success) {
//         let visitorsData = res.data.data.visitors;

//         if (isFiltered && startDate && endDate) {
//           visitorsData = filterVisitorsByDateRange(visitorsData, startDate, endDate);
//         }

//         const formatted = visitorsData.map((v, i) => ({
//           id: i + 1 + (page - 1) * 10,
//           ...v,
//         }));
//         setVisitors(formatted);
//         setPagination(res.data.data.pagination);
//       }
//     } catch (err) {
//       toast.error("Visitors लोड करण्यात त्रुटी!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllForDownload = async () => {
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, { params: { limit: 10000 } });
//       if (res.data.success) {
//         let visitorsData = res.data.data.visitors;

//         if (isFiltered && startDate && endDate) {
//           visitorsData = filterVisitorsByDateRange(visitorsData, startDate, endDate);
//         }

//         const formatted = visitorsData.map((v, i) => ({
//           'अ.क्र.': i + 1,
//           'पूर्ण नाव': v.fullName || '-',
//           'मोबाईल': v.mobileNumber || '-',
//           'पोलीस स्टेशन': v.policeStation || '-',
//           'पत्ता': v.fullAddress || '-',
//           'पिनकोड': v.pincode || '-',
//           'जिल्हा': v.district || '-',
//         }));
//         setAllVisitors(formatted);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//     fetchAllForDownload();
//   }, [isFiltered, startDate, endDate]);

//   const handleApplyDateFilter = () => {
//     if (!startDate || !endDate) {
//       toast.warn("कृपया सुरवात आणि शेवटची तारीख निवडा!");
//       return;
//     }

//     if (dayjs(endDate).isBefore(dayjs(startDate))) {
//       toast.error("शेवटची तारीख सुरवातीच्या तारखेपेक्षा मागे असू शकत नाही!");
//       return;
//     }

//     setIsFiltered(true);
//     setDateFilterOpen(false);
//     toast.success(`${dayjs(startDate).format('DD/MM/YYYY')} ते ${dayjs(endDate).format('DD/MM/YYYY')} या कालावधीत फिल्टर लागू केला!`);
//   };

//   const handleClearFilter = () => {
//     setStartDate('');
//     setEndDate('');
//     setIsFiltered(false);
//     setDateFilterOpen(false);
//     toast.info("फिल्टर काढला!");
//   };

//   const handleDownloadExcel = () => {
//     if (allVisitors.length === 0) {
//       toast.warn("डाउनलोडसाठी डेटा उपलब्ध नाही!");
//       return;
//     }
//     const ws = XLSX.utils.json_to_sheet(allVisitors);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Visitors");

//     const fileName = isFiltered && startDate && endDate
//       ? `भेट_देणाऱ्यांची_यादी_${dayjs(startDate).format('DD-MMM-YYYY')}_ते_${dayjs(endDate).format('DD-MMM-YYYY')}.xlsx`
//       : `भेट_देणाऱ्यांची_यादी_${dayjs().format('DD-MMM-YYYY')}.xlsx`;

//     XLSX.writeFile(wb, fileName);
//     toast.success("Excel यशस्वीरित्या डाउनलोड झाला!");
//   };

//   const handleDownloadPDF = () => {
//     if (allVisitors.length === 0) {
//       toast.warn("PDF साठी डेटा उपलब्ध नाही!");
//       return;
//     }

//     const dateRangeText = isFiltered && startDate && endDate
//       ? `<h3 style="text-align:center; margin:10px 0; color:#d32f2f;">कालावधी: ${dayjs(startDate).format('DD/MM/YYYY')} ते ${dayjs(endDate).format('DD/MM/YYYY')}</h3>`
//       : '';

//     const content = `
//       <div style="font-family: 'Mangal', sans-serif; padding: 40px; direction: ltr; font-size: 14px;">
//         <h1 style="text-align:center; color:#d32f2f; margin:15px 0;">ठाणे ग्रामीण पोलीस</h1>
//         <h2 style="text-align:center; color:#0d47a1; margin:10px 0;">भेट देणाऱ्यांची यादी (Visitors Master)</h2>
//         ${dateRangeText}
//         <h3 style="text-align:center; margin:20px 0; color:#1976d2;">
//           एकूण भेट देणारे: <strong>${allVisitors.length}</strong> | तारीख: ${dayjs().format('DD/MM/YYYY')}
//         </h3>

//         <table border="1" cellspacing="0" cellpadding="10" style="width:100%; border-collapse:collapse; margin-top:20px; font-size:13px;">
//           <thead style="background:#1976d2; color:white;">
//             <tr>
//               <th>अ.क्र.</th><th>पूर्ण नाव</th><th>मोबाईल</th><th>पोलीस स्टेशन</th><th>पत्ता</th><th>पिनकोड</th><th>जिल्हा</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${allVisitors.map((v, i) => `
//               <tr style="text-align:center;">
//                 <td>${i + 1}</td>
//                 <td>${v['पूर्ण नाव']}</td>
//                 <td>${v['मोबाईल']}</td>
//                 <td>${v['पोलीस स्टेशन']}</td>
//                 <td>${v['पत्ता']}</td>
//                 <td>${v['पिनकोड']}</td>
//                 <td>${v['जिल्हा']}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>

//         <div style="margin-top:50px; text-align:right;">
//           <p>तयार केले: ____________________</p>
//           <p>दिनांक: ${dayjs().format('DD/MM/YYYY')}</p>
//         </div>
//       </div>
//     `;

//     const element = document.createElement('div');
//     element.innerHTML = content;

//     const style = document.createElement('style');
//     style.innerHTML = marathiFontStyle;
//     element.prepend(style);

//     document.body.appendChild(element);

//     const fileName = isFiltered && startDate && endDate
//       ? `भेट_देणाऱ्यांची_यादी_${dayjs(startDate).format('DD-MMM-YYYY')}_ते_${dayjs(endDate).format('DD-MMM-YYYY')}.pdf`
//       : `भेट_देणाऱ्यांची_यादी_${dayjs().format('DD-MMM-YYYY')}.pdf`;

//     html2pdf()
//       .set({
//         margin: [15, 20, 15, 20],
//         filename: fileName,
//         html2canvas: { scale: 2 },
//         jsPDF: { format: 'a4', orientation: 'landscape' }
//       })
//       .from(element)
//       .save()
//       .then(() => {
//         document.body.removeChild(element);
//         toast.success("PDF यशस्वीरित्या तयार झाला!");
//       });
//   };

//   const getResponsiveWidth = () => (isMobile ? '100%' : isTablet ? '90%' : '80%');
//   const getResponsiveMargin = () => (isMobile ? '0' : isTablet ? (isSidebarOpen ? '15%' : '5%') : (isSidebarOpen ? '18%' : '8%'));

//   const gridStyle = {
//     minHeight: 'calc(100vh - 40px)',
//     width: getResponsiveWidth(),
//     marginLeft: getResponsiveMargin(),
//     marginTop: '100px',
//     marginBottom: '20px',
//     transition: 'all 0.3s ease-in-out',
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#f8f9fa',
//     padding: isMobile ? '10px' : '20px',
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
//         <CircularProgress size={70} sx={{ color: '#23CCEF' }} />
//       </Box>
//     );
//   }

//   return (
//     <div style={gridStyle}>
//       <Container maxWidth={false} sx={{ p: '0 !important' }}>
//         <Paper elevation={0} sx={{ p: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', bgcolor: 'white', boxShadow: 3 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
//             <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#0d2136', fontWeight: 600 }}>
//               Visitors Master
//               {isFiltered && startDate && endDate && (
//                 <Typography variant="body2" sx={{ color: '#d32f2f', fontWeight: 500, mt: 1 }}>
//                   फिल्टर: {dayjs(startDate).format('DD/MM/YYYY')} ते {dayjs(endDate).format('DD/MM/YYYY')}
//                 </Typography>
//               )}
//             </Typography>

//             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//               <Tooltip title="तारीख निवडा">
//                 <Button
//                   variant="contained"
//                   startIcon={<FilterListIcon />}
//                   onClick={() => setDateFilterOpen(true)}
//                   sx={{
//                     bgcolor: isFiltered ? '#ed6c02' : '#1976d2',
//                     '&:hover': { bgcolor: isFiltered ? '#e65100' : '#1565c0' }
//                   }}
//                 >
//                   {isFiltered ? 'फिल्टर सक्रिय' : 'तारीख फिल्टर'}
//                 </Button>
//               </Tooltip>

//               {isFiltered && (
//                 <Tooltip title="फिल्टर काढा">
//                   <Button
//                     variant="outlined"
//                     startIcon={<ClearIcon />}
//                     onClick={handleClearFilter}
//                     sx={{
//                       borderColor: '#d32f2f',
//                       color: '#d32f2f',
//                       '&:hover': { borderColor: '#b71c1c', bgcolor: '#ffebee' }
//                     }}
//                   >
//                     Clear
//                   </Button>
//                 </Tooltip>
//               )}

//               <Tooltip title="Excel डाउनलोड">
//                 <Button
//                   variant="contained"
//                   startIcon={<DownloadIcon />}
//                   onClick={handleDownloadExcel}
//                   sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
//                 >
//                   Excel
//                 </Button>
//               </Tooltip>

//               <Tooltip title="PDF डाउनलोड (मराठी फॉन्टसह)">
//                 <Button
//                   variant="contained"
//                   startIcon={<PictureAsPdfIcon />}
//                   onClick={handleDownloadPDF}
//                   sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
//                 >
//                   PDF
//                 </Button>
//               </Tooltip>
//             </Box>
//           </Box>

//           <Box sx={{ width: '100%', height: isMobile ? 500 : 650 }}>
//             <StyledDataGrid
//               rows={visitors}
//               columns={columns}
//               pageSizeOptions={[10, 20, 50]}
//               paginationMode="server"
//               rowCount={pagination.totalVisitors || 0}
//               loading={loading}
//               onPaginationModelChange={(model) => fetchVisitors(model.page + 1)}
//               initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
//             />
//           </Box>
//         </Paper>
//       </Container>

//       <Dialog open={dateFilterOpen} onClose={() => setDateFilterOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 600 }}>
//           तारीख फिल्टर निवडा
//         </DialogTitle>
//         <DialogContent sx={{ pt: 3 }}>
//           <TextField
//             label="सुरुवातीची तारीख"
//             type="date"
//             fullWidth
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//             sx={{ mb: 3 }}
//           />
//           <TextField
//             label="शेवटची तारीख"
//             type="date"
//             fullWidth
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={() => setDateFilterOpen(false)} sx={{ color: '#666' }}>
//             रद्द करा
//           </Button>
//           <Button
//             onClick={handleApplyDateFilter}
//             variant="contained"
//             sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
//           >
//             फिल्टर लागू करा
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default VisitorsMaster;


// =============================================================

// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Box, Paper, Typography, Container, CircularProgress, useTheme, useMediaQuery, Avatar,
//   Button, Tooltip
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import DownloadIcon from '@mui/icons-material/Download';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import html2pdf from 'html2pdf.js';
// import * as XLSX from 'xlsx';
// import dayjs from 'dayjs';
// import { toast } from 'react-toastify';

// // Marathi Font (Mangal) - Google Fonts वरून
// const marathiFontStyle = `
//   @import url('https://fonts.googleapis.com/css2?family=Mangal:wght@400;700&display=swap');
//   body { font-family: 'Mangal', Arial, sans-serif !important; }
// `;

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   border: 'none',
//   borderRadius: '12px',
//   backgroundColor: 'white',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//   '& .MuiDataGrid-row': {
//     cursor: 'pointer',
//     '&:hover': { backgroundColor: '#e3f2fd !important' },
//   },
// }));

// const VisitorsMaster = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const navigate = useNavigate();

//   const [visitors, setVisitors] = useState([]);
//   const [allVisitors, setAllVisitors] = useState([]); // For download
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalVisitors: 0
//   });

//   const columns = [
//     { field: 'id', headerName: 'अ.क्र.', width: 80, headerAlign: 'center', align: 'center' },
//     // {
//     //   field: 'photo',
//     //   headerName: 'फोटो',
//     //   width: 100,
//     //   headerAlign: 'center',
//     //   align: 'center',
//     //   renderCell: (params) => (
//     //     <Avatar
//     //       src={params.row.visitorPhoto}
//     //       alt={params.row.fullName}
//     //       sx={{ width: 50, height: 50, border: '3px solid #0040B9' }}
//     //     >
//     //       {params.row.fullName?.charAt(0)}
//     //     </Avatar>
//     //   ),
//     // },
//     {
//   field: 'photo',
//   headerName: 'फोटो',
//   width: 110,
//   headerAlign: 'center',
//   align: 'center',
//   sortable: false,
//   renderCell: (params) => {
//     // जर visitorPhoto नसेल तर latest visit चा photo घ्या
//     const photoUrl = params.row.visitorPhoto || 
//                      (params.row.visits?.length > 0 ? params.row.visits[params.row.visits.length - 1].visitorPhoto : null);

//     return (
//       <Avatar
//         src={photoUrl}
//         alt={params.row.fullName}
//         sx={{
//           width: 56,
//           height: 56,
//           // border: '4px solid #0040B9',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//           fontSize: '1.4rem',
//           fontWeight: 'bold',
//           bgcolor: '#e3f2fd'
//         }}
//       >
//         {params.row.fullName?.charAt(0).toUpperCase()}
//       </Avatar>
//     );
//   },
// },
//     {
//       field: 'fullName',
//       headerName: 'पूर्ण नाव',
//       width: 220,
//       flex: 1,
//       renderCell: (params) => (
//         <Typography
//           onClick={() => navigate(`/visitorhistory/${params.row._id}`)}
//           sx={{
//             color: '#1976d2',
//             fontWeight: 600,
//             cursor: 'pointer',
//             '&:hover': { textDecoration: 'underline', color: '#0d47a1' },
//           }}
//         >
//           {params.row.fullName}
//         </Typography>
//       ),
//     },
//     { field: 'mobileNumber', headerName: 'मोबाईल', width: 140 },
//     { field: 'policeStation', headerName: 'पोलीस स्टेशन', width: 200 },
//     { field: 'fullAddress', headerName: 'पत्ता', width: 250, flex: 1 },
//     { field: 'pincode', headerName: 'पिनकोड', width: 120 },
//     { field: 'district', headerName: 'जिल्हा', width: 150 },
//   ];

//   const fetchVisitors = async (page = 1, search = '') => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, {
//         params: { page, limit: 10, search }
//       });
//       if (res.data.success) {
//         const formatted = res.data.data.visitors.map((v, i) => ({
//           id: i + 1 + (page - 1) * 10,
//           ...v,
//         }));
//         setVisitors(formatted);
//         setPagination(res.data.data.pagination);
//       }
//     } catch (err) {
//       toast.error("Visitors लोड करण्यात त्रुटी!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch ALL visitors for download
//   const fetchAllForDownload = async () => {
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, { params: { limit: 10000 } });
//       if (res.data.success) {
//         const formatted = res.data.data.visitors.map((v, i) => ({
//           'अ.क्र.': i + 1,
//           'पूर्ण नाव': v.fullName || '-',
//           'मोबाईल': v.mobileNumber || '-',
//           'पोलीस स्टेशन': v.policeStation || '-',
//           'पत्ता': v.fullAddress || '-',
//           'पिनकोड': v.pincode || '-',
//           'जिल्हा': v.district || '-',
//         }));
//         setAllVisitors(formatted);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//     fetchAllForDownload();
//   }, []);

//   // Excel Download
//   const handleDownloadExcel = () => {
//     if (allVisitors.length === 0) {
//       toast.warn("डाउनलोडसाठी डेटा उपलब्ध नाही!");
//       return;
//     }
//     const ws = XLSX.utils.json_to_sheet(allVisitors);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Visitors");
//     XLSX.writeFile(wb, `भेट देणाऱ्यांची यादी_${dayjs().format('DD-MMM-YYYY')}.xlsx`);
//     toast.success("Excel यशस्वीरित्या डाउनलोड झाला!");
//   };

//   // PDF Download with Marathi Font (Mangal)
//   const handleDownloadPDF = () => {
//     if (allVisitors.length === 0) {
//       toast.warn("PDF साठी डेटा उपलब्ध नाही!");
//       return;
//     }

//     const content = `
//       <div style="font-family: 'Mangal', sans-serif; padding: 40px; direction: ltr; font-size: 14px;">
//         <h1 style="text-align:center; color:#d32f2f; margin:15px 0;">ठाणे ग्रामीण पोलीस</h1>
//         <h2 style="text-align:center; color:#0d47a1; margin:10px 0;">भेट देणाऱ्यांची यादी (Visitors Master)</h2>
//         <h3 style="text-align:center; margin:20px 0; color:#1976d2;">
//           एकूण भेट देणारे: <strong>${allVisitors.length}</strong> | तारीख: ${dayjs().format('DD/MM/YYYY')}
//         </h3>

//         <table border="1" cellspacing="0" cellpadding="10" style="width:100%; border-collapse:collapse; margin-top:20px; font-size:13px;">
//           <thead style="background:#1976d2; color:white;">
//             <tr>
//               <th>अ.क्र.</th><th>पूर्ण नाव</th><th>मोबाईल</th><th>पोलीस स्टेशन</th><th>पत्ता</th><th>पिनकोड</th><th>जिल्हा</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${allVisitors.map((v, i) => `
//               <tr style="text-align:center;">
//                 <td>${i + 1}</td>
//                 <td>${v['पूर्ण नाव']}</td>
//                 <td>${v['मोबाईल']}</td>
//                 <td>${v['पोलीस स्टेशन']}</td>
//                 <td>${v['पत्ता']}</td>
//                 <td>${v['पिनकोड']}</td>
//                 <td>${v['जिल्हा']}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>

//         <div style="margin-top:50px; text-align:right;">
//           <p>तयार केले: ____________________</p>
//           <p>दिनांक: ${dayjs().format('DD/MM/YYYY')}</p>
//         </div>
//       </div>
//     `;

//     const element = document.createElement('div');
//     element.innerHTML = content;

//     // Add font stylesheet
//     const style = document.createElement('style');
//     style.innerHTML = marathiFontStyle;
//     element.prepend(style);

//     document.body.appendChild(element);

//     html2pdf()
//       .set({
//         margin: [15, 20, 15, 20],
//         filename: `भेट_देणाऱ्यांची_यादी_${dayjs().format('DD-MMM-YYYY')}.pdf`,
//         html2canvas: { scale: 2 },
//         jsPDF: { format: 'a4', orientation: 'landscape' }
//       })
//       .from(element)
//       .save()
//       .then(() => {
//         document.body.removeChild(element);
//         toast.success("PDF यशस्वीरित्या तयार झाला!");
//       });
//   };

//   const getResponsiveWidth = () => (isMobile ? '100%' : isTablet ? '90%' : '80%');
//   const getResponsiveMargin = () => (isMobile ? '0' : isTablet ? (isSidebarOpen ? '15%' : '5%') : (isSidebarOpen ? '18%' : '8%'));

//   const gridStyle = {
//     minHeight: 'calc(100vh - 40px)',
//     width: getResponsiveWidth(),
//     marginLeft: getResponsiveMargin(),
//     marginTop: '100px',
//     marginBottom: '20px',
//     transition: 'all 0.3s ease-in-out',
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#f8f9fa',
//     padding: isMobile ? '10px' : '20px',
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
//         <CircularProgress size={70} sx={{ color: '#23CCEF' }} />
//       </Box>
//     );
//   }

//   return (
//     <div style={gridStyle}>
//       <Container maxWidth={false} sx={{ p: '0 !important' }}>
//         <Paper elevation={0} sx={{ p: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', bgcolor: 'white', boxShadow: 3 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
//             <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#0d2136', fontWeight: 600 }}>
//               Visitors Master
//             </Typography>

//             <Box sx={{ display: 'flex', gap: 2 }}>
//               <Tooltip title="Excel डाउनलोड">
//                 <Button
//                   variant="contained"
//                   startIcon={<DownloadIcon />}
//                   onClick={handleDownloadExcel}
//                   sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
//                 >
//                   Excel
//                 </Button>
//               </Tooltip>

//               <Tooltip title="PDF डाउनलोड (मराठी फॉन्टसह)">
//                 <Button
//                   variant="contained"
//                   startIcon={<PictureAsPdfIcon />}
//                   onClick={handleDownloadPDF}
//                   sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
//                 >
//                   PDF
//                 </Button>
//               </Tooltip>
//             </Box>
//           </Box>

//           <Box sx={{ width: '100%', height: isMobile ? 500 : 650 }}>
//             <StyledDataGrid
//               rows={visitors}
//               columns={columns}
//               pageSizeOptions={[10, 20, 50]}
//               paginationMode="server"
//               rowCount={pagination.totalVisitors || 0}
//               loading={loading}
//               onPaginationModelChange={(model) => fetchVisitors(model.page + 1)}
//               initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
//             />
//           </Box>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default VisitorsMaster;

// ================================================================

// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Box, Paper, Typography, Container, CircularProgress, useTheme, useMediaQuery, Avatar,
//   Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import DownloadIcon from '@mui/icons-material/Download';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import ClearIcon from '@mui/icons-material/Clear';
// import html2pdf from 'html2pdf.js';
// import * as XLSX from 'xlsx';
// import dayjs from 'dayjs';
// import { toast } from 'react-toastify';

// const marathiFontStyle = `
//   @import url('https://fonts.googleapis.com/css2?family=Mangal:wght@400;700&display=swap');
//   body { font-family: 'Mangal', Arial, sans-serif !important; }
// `;

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   border: 'none',
//   borderRadius: '12px',
//   backgroundColor: 'white',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//   '& .MuiDataGrid-row': {
//     cursor: 'pointer',
//     '&:hover': { backgroundColor: '#e3f2fd !important' },
//   },
// }));

// const VisitorsMaster = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const navigate = useNavigate();

//   const [visitors, setVisitors] = useState([]);
//   const [allVisitors, setAllVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalVisitors: 0
//   });

//   const [dateFilterOpen, setDateFilterOpen] = useState(false);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [isFiltered, setIsFiltered] = useState(false);

//   const columns = [
//     { field: 'id', headerName: 'अ.क्र.', width: 80, headerAlign: 'center', align: 'center' },
//     {
//       field: 'photo',
//       headerName: 'फोटो',
//       width: 110,
//       headerAlign: 'center',
//       align: 'center',
//       sortable: false,
//       renderCell: (params) => {
//         const photoUrl = params.row.visitorPhoto ||
//                          (params.row.visits?.length > 0 ? params.row.visits[params.row.visits.length - 1].visitorPhoto : null);

//         return (
//           <Avatar
//             src={photoUrl}
//             alt={params.row.fullName}
//             sx={{
//               width: 56,
//               height: 56,
//               boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//               fontSize: '1.4rem',
//               fontWeight: 'bold',
//               bgcolor: '#e3f2fd'
//             }}
//           >
//             {params.row.fullName?.charAt(0).toUpperCase()}
//           </Avatar>
//         );
//       },
//     },
//     {
//       field: 'fullName',
//       headerName: 'पूर्ण नाव',
//       width: 220,
//       flex: 1,
//       renderCell: (params) => (
//         <Typography
//           onClick={() => navigate(`/visitorhistory/${params.row._id}`)}
//           sx={{
//             color: '#1976d2',
//             fontWeight: 600,
//             cursor: 'pointer',
//             '&:hover': { textDecoration: 'underline', color: '#0d47a1' },
//           }}
//         >
//           {params.row.fullName}
//         </Typography>
//       ),
//     },
//     { field: 'mobileNumber', headerName: 'मोबाईल', width: 140 },
//     { field: 'policeStation', headerName: 'पोलीस स्टेशन', width: 200 },
//     { field: 'fullAddress', headerName: 'पत्ता', width: 250, flex: 1 },
//     { field: 'pincode', headerName: 'पिनकोड', width: 120 },
//     { field: 'district', headerName: 'जिल्हा', width: 150 },
//   ];

//   const filterVisitorsByDateRange = (visitorsData, start, end) => {
//     if (!start || !end) return visitorsData;

//     const startDateTime = dayjs(start).startOf('day');
//     const endDateTime = dayjs(end).endOf('day');

//     return visitorsData.filter(visitor => {
//       if (!visitor.visits || visitor.visits.length === 0) return false;

//       const hasVisitInRange = visitor.visits.some(visit => {
//         const entryDate = dayjs(visit.entryAt);
//         return entryDate.isAfter(startDateTime) && entryDate.isBefore(endDateTime);
//       });

//       return hasVisitInRange;
//     });
//   };

//   const fetchVisitors = async (page = 1, search = '') => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, {
//         params: { page, limit: 10, search }
//       });
//       if (res.data.success) {
//         let visitorsData = res.data.data.visitors;

//         if (isFiltered && startDate && endDate) {
//           visitorsData = filterVisitorsByDateRange(visitorsData, startDate, endDate);
//         }

//         const formatted = visitorsData.map((v, i) => ({
//           id: i + 1 + (page - 1) * 10,
//           ...v,
//         }));
//         setVisitors(formatted);
//         setPagination(res.data.data.pagination);
//       }
//     } catch (err) {
//       toast.error("Visitors लोड करण्यात त्रुटी!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllForDownload = async () => {
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, { params: { limit: 10000 } });
//       if (res.data.success) {
//         let visitorsData = res.data.data.visitors;

//         if (isFiltered && startDate && endDate) {
//           visitorsData = filterVisitorsByDateRange(visitorsData, startDate, endDate);
//         }

//         const formatted = visitorsData.map((v, i) => ({
//           'अ.क्र.': i + 1,
//           'पूर्ण नाव': v.fullName || '-',
//           'मोबाईल': v.mobileNumber || '-',
//           'पोलीस स्टेशन': v.policeStation || '-',
//           'पत्ता': v.fullAddress || '-',
//           'पिनकोड': v.pincode || '-',
//           'जिल्हा': v.district || '-',
//         }));
//         setAllVisitors(formatted);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//     fetchAllForDownload();
//   }, [isFiltered, startDate, endDate]);

//   const handleApplyDateFilter = () => {
//     if (!startDate || !endDate) {
//       toast.warn("कृपया सुरवात आणि शेवटची तारीख निवडा!");
//       return;
//     }

//     if (dayjs(endDate).isBefore(dayjs(startDate))) {
//       toast.error("शेवटची तारीख सुरवातीच्या तारखेपेक्षा मागे असू शकत नाही!");
//       return;
//     }

//     setIsFiltered(true);
//     setDateFilterOpen(false);
//     toast.success(`${dayjs(startDate).format('DD/MM/YYYY')} ते ${dayjs(endDate).format('DD/MM/YYYY')} या कालावधीत फिल्टर लागू केला!`);
//   };

//   const handleClearFilter = () => {
//     setStartDate('');
//     setEndDate('');
//     setIsFiltered(false);
//     setDateFilterOpen(false);
//     toast.info("फिल्टर काढला!");
//   };

//   const handleDownloadExcel = () => {
//     if (allVisitors.length === 0) {
//       toast.warn("डाउनलोडसाठी डेटा उपलब्ध नाही!");
//       return;
//     }
//     const ws = XLSX.utils.json_to_sheet(allVisitors);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Visitors");

//     const fileName = isFiltered && startDate && endDate
//       ? `भेट_देणाऱ्यांची_यादी_${dayjs(startDate).format('DD-MMM-YYYY')}_ते_${dayjs(endDate).format('DD-MMM-YYYY')}.xlsx`
//       : `भेट_देणाऱ्यांची_यादी_${dayjs().format('DD-MMM-YYYY')}.xlsx`;

//     XLSX.writeFile(wb, fileName);
//     toast.success("Excel यशस्वीरित्या डाउनलोड झाला!");
//   };

//   const handleDownloadPDF = () => {
//     if (allVisitors.length === 0) {
//       toast.warn("PDF साठी डेटा उपलब्ध नाही!");
//       return;
//     }

//     const dateRangeText = isFiltered && startDate && endDate
//       ? `<h3 style="text-align:center; margin:10px 0; color:#d32f2f;">कालावधी: ${dayjs(startDate).format('DD/MM/YYYY')} ते ${dayjs(endDate).format('DD/MM/YYYY')}</h3>`
//       : '';

//     const content = `
//       <div style="font-family: 'Mangal', sans-serif; padding: 40px; direction: ltr; font-size: 14px;">
//         <h1 style="text-align:center; color:#d32f2f; margin:15px 0;">ठाणे ग्रामीण पोलीस</h1>
//         <h2 style="text-align:center; color:#0d47a1; margin:10px 0;">भेट देणाऱ्यांची यादी (Visitors Master)</h2>
//         ${dateRangeText}
//         <h3 style="text-align:center; margin:20px 0; color:#1976d2;">
//           एकूण भेट देणारे: <strong>${allVisitors.length}</strong> | तारीख: ${dayjs().format('DD/MM/YYYY')}
//         </h3>

//         <table border="1" cellspacing="0" cellpadding="10" style="width:100%; border-collapse:collapse; margin-top:20px; font-size:13px;">
//           <thead style="background:#1976d2; color:white;">
//             <tr>
//               <th>अ.क्र.</th><th>पूर्ण नाव</th><th>मोबाईल</th><th>पोलीस स्टेशन</th><th>पत्ता</th><th>पिनकोड</th><th>जिल्हा</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${allVisitors.map((v, i) => `
//               <tr style="text-align:center;">
//                 <td>${i + 1}</td>
//                 <td>${v['पूर्ण नाव']}</td>
//                 <td>${v['मोबाईल']}</td>
//                 <td>${v['पोलीस स्टेशन']}</td>
//                 <td>${v['पत्ता']}</td>
//                 <td>${v['पिनकोड']}</td>
//                 <td>${v['जिल्हा']}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>

//         <div style="margin-top:50px; text-align:right;">
//           <p>तयार केले: ____________________</p>
//           <p>दिनांक: ${dayjs().format('DD/MM/YYYY')}</p>
//         </div>
//       </div>
//     `;

//     const element = document.createElement('div');
//     element.innerHTML = content;

//     const style = document.createElement('style');
//     style.innerHTML = marathiFontStyle;
//     element.prepend(style);

//     document.body.appendChild(element);

//     const fileName = isFiltered && startDate && endDate
//       ? `भेट_देणाऱ्यांची_यादी_${dayjs(startDate).format('DD-MMM-YYYY')}_ते_${dayjs(endDate).format('DD-MMM-YYYY')}.pdf`
//       : `भेट_देणाऱ्यांची_यादी_${dayjs().format('DD-MMM-YYYY')}.pdf`;

//     html2pdf()
//       .set({
//         margin: [15, 20, 15, 20],
//         filename: fileName,
//         html2canvas: { scale: 2 },
//         jsPDF: { format: 'a4', orientation: 'landscape' }
//       })
//       .from(element)
//       .save()
//       .then(() => {
//         document.body.removeChild(element);
//         toast.success("PDF यशस्वीरित्या तयार झाला!");
//       });
//   };

//   const getResponsiveWidth = () => (isMobile ? '100%' : isTablet ? '90%' : '80%');
//   const getResponsiveMargin = () => (isMobile ? '0' : isTablet ? (isSidebarOpen ? '15%' : '5%') : (isSidebarOpen ? '18%' : '8%'));

//   const gridStyle = {
//     minHeight: 'calc(100vh - 40px)',
//     width: getResponsiveWidth(),
//     marginLeft: getResponsiveMargin(),
//     marginTop: '100px',
//     marginBottom: '20px',
//     transition: 'all 0.3s ease-in-out',
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#f8f9fa',
//     padding: isMobile ? '10px' : '20px',
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
//         <CircularProgress size={70} sx={{ color: '#23CCEF' }} />
//       </Box>
//     );
//   }

//   return (
//     <div style={gridStyle}>
//       <Container maxWidth={false} sx={{ p: '0 !important' }}>
//         <Paper elevation={0} sx={{ p: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', bgcolor: 'white', boxShadow: 3 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
//             <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#0d2136', fontWeight: 600 }}>
//               Visitors Master
//               {isFiltered && startDate && endDate && (
//                 <Typography variant="body2" sx={{ color: '#d32f2f', fontWeight: 500, mt: 1 }}>
//                   फिल्टर: {dayjs(startDate).format('DD/MM/YYYY')} ते {dayjs(endDate).format('DD/MM/YYYY')}
//                 </Typography>
//               )}
//             </Typography>

//             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//               <Tooltip title="तारीख निवडा">
//                 <Button
//                   variant="contained"
//                   startIcon={<FilterListIcon />}
//                   onClick={() => setDateFilterOpen(true)}
//                   sx={{
//                     bgcolor: isFiltered ? '#ed6c02' : '#1976d2',
//                     '&:hover': { bgcolor: isFiltered ? '#e65100' : '#1565c0' }
//                   }}
//                 >
//                   {isFiltered ? 'फिल्टर सक्रिय' : 'तारीख फिल्टर'}
//                 </Button>
//               </Tooltip>

//               {isFiltered && (
//                 <Tooltip title="फिल्टर काढा">
//                   <Button
//                     variant="outlined"
//                     startIcon={<ClearIcon />}
//                     onClick={handleClearFilter}
//                     sx={{
//                       borderColor: '#d32f2f',
//                       color: '#d32f2f',
//                       '&:hover': { borderColor: '#b71c1c', bgcolor: '#ffebee' }
//                     }}
//                   >
//                     Clear
//                   </Button>
//                 </Tooltip>
//               )}

//               <Tooltip title="Excel डाउनलोड">
//                 <Button
//                   variant="contained"
//                   startIcon={<DownloadIcon />}
//                   onClick={handleDownloadExcel}
//                   sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
//                 >
//                   Excel
//                 </Button>
//               </Tooltip>

//               <Tooltip title="PDF डाउनलोड (मराठी फॉन्टसह)">
//                 <Button
//                   variant="contained"
//                   startIcon={<PictureAsPdfIcon />}
//                   onClick={handleDownloadPDF}
//                   sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
//                 >
//                   PDF
//                 </Button>
//               </Tooltip>
//             </Box>
//           </Box>

//           <Box sx={{ width: '100%', height: isMobile ? 500 : 650 }}>
//             <StyledDataGrid
//               rows={visitors}
//               columns={columns}
//               pageSizeOptions={[10, 20, 50]}
//               paginationMode="server"
//               rowCount={pagination.totalVisitors || 0}
//               loading={loading}
//               onPaginationModelChange={(model) => fetchVisitors(model.page + 1)}
//               initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
//             />
//           </Box>
//         </Paper>
//       </Container>

//       <Dialog open={dateFilterOpen} onClose={() => setDateFilterOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 600 }}>
//           तारीख फिल्टर निवडा
//         </DialogTitle>
//         <DialogContent sx={{ pt: 3 }}>
//           <TextField
//             label="सुरुवातीची तारीख"
//             type="date"
//             fullWidth
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//             sx={{ mb: 3 }}
//           />
//           <TextField
//             label="शेवटची तारीख"
//             type="date"
//             fullWidth
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={() => setDateFilterOpen(false)} sx={{ color: '#666' }}>
//             रद्द करा
//           </Button>
//           <Button
//             onClick={handleApplyDateFilter}
//             variant="contained"
//             sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
//           >
//             फिल्टर लागू करा
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default VisitorsMaster;

// ====================================================

// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Box, Paper, Typography, Container, CircularProgress, useTheme, useMediaQuery, Avatar,
//   Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import DownloadIcon from '@mui/icons-material/Download';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import ClearIcon from '@mui/icons-material/Clear';
// import html2pdf from 'html2pdf.js';
// import * as XLSX from 'xlsx';
// import dayjs from 'dayjs';
// import { toast } from 'react-toastify';

// const marathiFontStyle = `
//   @import url('https://fonts.googleapis.com/css2?family=Mangal:wght@400;700&display=swap');
//   body { font-family: 'Mangal', Arial, sans-serif !important; }
// `;

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   border: 'none',
//   borderRadius: '12px',
//   backgroundColor: 'white',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//   '& .MuiDataGrid-row': {
//     cursor: 'pointer',
//     '&:hover': { backgroundColor: '#e3f2fd !important' },
//   },
// }));

// const VisitorsMaster = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const navigate = useNavigate();

//   const [visitors, setVisitors] = useState([]);
//   const [allVisitors, setAllVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalVisitors: 0
//   });

//   const [dateFilterOpen, setDateFilterOpen] = useState(false);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [isFiltered, setIsFiltered] = useState(false);

//   const columns = [
//     { field: 'id', headerName: 'अ.क्र.', width: 80, headerAlign: 'center', align: 'center' },
//     {
//       field: 'photo',
//       headerName: 'फोटो',
//       width: 110,
//       headerAlign: 'center',
//       align: 'center',
//       sortable: false,
//       renderCell: (params) => {
//         const photoUrl = params.row.visitorPhoto ||
//                          (params.row.visits?.length > 0 ? params.row.visits[params.row.visits.length - 1].visitorPhoto : null);

//         return (
//           <Avatar
//             src={photoUrl}
//             alt={params.row.fullName}
//             sx={{
//               width: 56,
//               height: 56,
//               boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//               fontSize: '1.4rem',
//               fontWeight: 'bold',
//               bgcolor: '#e3f2fd'
//             }}
//           >
//             {params.row.fullName?.charAt(0).toUpperCase()}
//           </Avatar>
//         );
//       },
//     },
//     {
//       field: 'fullName',
//       headerName: 'पूर्ण नाव',
//       width: 220,
//       flex: 1,
//       renderCell: (params) => (
//         <Typography
//           onClick={() => navigate(`/visitorhistory/${params.row._id}`)}
//           sx={{
//             color: '#1976d2',
//             fontWeight: 600,
//             cursor: 'pointer',
//             '&:hover': { textDecoration: 'underline', color: '#0d47a1' },
//           }}
//         >
//           {params.row.fullName}
//         </Typography>
//       ),
//     },
//     { field: 'mobileNumber', headerName: 'मोबाईल', width: 140 },
//     { field: 'policeStation', headerName: 'पोलीस स्टेशन', width: 200 },
//     { field: 'fullAddress', headerName: 'पत्ता', width: 250, flex: 1 },
//     { field: 'pincode', headerName: 'पिनकोड', width: 120 },
//     { field: 'district', headerName: 'जिल्हा', width: 150 },
//   ];

//   const filterVisitorsByDateRange = (visitorsData, start, end) => {
//     if (!start || !end) return visitorsData;

//     const startDateTime = dayjs(start).startOf('day');
//     const endDateTime = dayjs(end).endOf('day');

//     return visitorsData.filter(visitor => {
//       if (!visitor.visits || visitor.visits.length === 0) return false;

//       const hasVisitInRange = visitor.visits.some(visit => {
//         const entryDate = dayjs(visit.entryAt);
//         return entryDate.isAfter(startDateTime) && entryDate.isBefore(endDateTime);
//       });

//       return hasVisitInRange;
//     });
//   };

//   const fetchVisitors = async (page = 1, search = '') => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, {
//         params: { page, limit: 10, search }
//       });
//       if (res.data.success) {
//         let visitorsData = res.data.data.visitors;

//         if (isFiltered && startDate && endDate) {
//           visitorsData = filterVisitorsByDateRange(visitorsData, startDate, endDate);
//         }

//         const formatted = visitorsData.map((v, i) => ({
//           id: i + 1 + (page - 1) * 10,
//           ...v,
//         }));
//         setVisitors(formatted);
//         setPagination(res.data.data.pagination);
//       }
//     } catch (err) {
//       toast.error("Visitors लोड करण्यात त्रुटी!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllForDownload = async () => {
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, { params: { limit: 10000 } });
//       if (res.data.success) {
//         let visitorsData = res.data.data.visitors;

//         if (isFiltered && startDate && endDate) {
//           visitorsData = filterVisitorsByDateRange(visitorsData, startDate, endDate);
//         }

//         const formatted = visitorsData.map((v, i) => ({
//           'अ.क्र.': i + 1,
//           'पूर्ण नाव': v.fullName || '-',
//           'मोबाईल': v.mobileNumber || '-',
//           'पोलीस स्टेशन': v.policeStation || '-',
//           'पत्ता': v.fullAddress || '-',
//           'पिनकोड': v.pincode || '-',
//           'जिल्हा': v.district || '-',
//         }));
//         setAllVisitors(formatted);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//     fetchAllForDownload();
//   }, [isFiltered, startDate, endDate]);

//   const handleApplyDateFilter = () => {
//     if (!startDate || !endDate) {
//       toast.warn("कृपया सुरवात आणि शेवटची तारीख निवडा!");
//       return;
//     }

//     if (dayjs(endDate).isBefore(dayjs(startDate))) {
//       toast.error("शेवटची तारीख सुरवातीच्या तारखेपेक्षा मागे असू शकत नाही!");
//       return;
//     }

//     setIsFiltered(true);
//     setDateFilterOpen(false);
//     toast.success(`${dayjs(startDate).format('DD/MM/YYYY')} ते ${dayjs(endDate).format('DD/MM/YYYY')} या कालावधीत फिल्टर लागू केला!`);
//   };

//   const handleClearFilter = () => {
//     setStartDate('');
//     setEndDate('');
//     setIsFiltered(false);
//     setDateFilterOpen(false);
//     toast.info("फिल्टर काढला!");
//   };

//   const handleDownloadExcel = () => {
//     if (allVisitors.length === 0) {
//       toast.warn("डाउनलोडसाठी डेटा उपलब्ध नाही!");
//       return;
//     }
//     const ws = XLSX.utils.json_to_sheet(allVisitors);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Visitors");

//     const fileName = isFiltered && startDate && endDate
//       ? `भेट_देणाऱ्यांची_यादी_${dayjs(startDate).format('DD-MMM-YYYY')}_ते_${dayjs(endDate).format('DD-MMM-YYYY')}.xlsx`
//       : `भेट_देणाऱ्यांची_यादी_${dayjs().format('DD-MMM-YYYY')}.xlsx`;

//     XLSX.writeFile(wb, fileName);
//     toast.success("Excel यशस्वीरित्या डाउनलोड झाला!");
//   };

//   const handleDownloadPDF = () => {
//     if (allVisitors.length === 0) {
//       toast.warn("PDF साठी डेटा उपलब्ध नाही!");
//       return;
//     }

//     const dateRangeText = isFiltered && startDate && endDate
//       ? `<h3 style="text-align:center; margin:10px 0; color:#d32f2f;">कालावधी: ${dayjs(startDate).format('DD/MM/YYYY')} ते ${dayjs(endDate).format('DD/MM/YYYY')}</h3>`
//       : '';

//     const content = `
//       <div style="font-family: 'Mangal', sans-serif; padding: 40px; direction: ltr; font-size: 14px;">
//         <h1 style="text-align:center; color:#d32f2f; margin:15px 0;">ठाणे ग्रामीण पोलीस</h1>
//         <h2 style="text-align:center; color:#0d47a1; margin:10px 0;">भेट देणाऱ्यांची यादी (Visitors Master)</h2>
//         ${dateRangeText}
//         <h3 style="text-align:center; margin:20px 0; color:#1976d2;">
//           एकूण भेट देणारे: <strong>${allVisitors.length}</strong> | तारीख: ${dayjs().format('DD/MM/YYYY')}
//         </h3>

//         <table border="1" cellspacing="0" cellpadding="10" style="width:100%; border-collapse:collapse; margin-top:20px; font-size:13px;">
//           <thead style="background:#1976d2; color:white;">
//             <tr>
//               <th>अ.क्र.</th><th>पूर्ण नाव</th><th>मोबाईल</th><th>पोलीस स्टेशन</th><th>पत्ता</th><th>पिनकोड</th><th>जिल्हा</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${allVisitors.map((v, i) => `
//               <tr style="text-align:center;">
//                 <td>${i + 1}</td>
//                 <td>${v['पूर्ण नाव']}</td>
//                 <td>${v['मोबाईल']}</td>
//                 <td>${v['पोलीस स्टेशन']}</td>
//                 <td>${v['पत्ता']}</td>
//                 <td>${v['पिनकोड']}</td>
//                 <td>${v['जिल्हा']}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>

//         <div style="margin-top:50px; text-align:right;">
//           <p>तयार केले: ____________________</p>
//           <p>दिनांक: ${dayjs().format('DD/MM/YYYY')}</p>
//         </div>
//       </div>
//     `;

//     const element = document.createElement('div');
//     element.innerHTML = content;

//     const style = document.createElement('style');
//     style.innerHTML = marathiFontStyle;
//     element.prepend(style);

//     document.body.appendChild(element);

//     const fileName = isFiltered && startDate && endDate
//       ? `भेट_देणाऱ्यांची_यादी_${dayjs(startDate).format('DD-MMM-YYYY')}_ते_${dayjs(endDate).format('DD-MMM-YYYY')}.pdf`
//       : `भेट_देणाऱ्यांची_यादी_${dayjs().format('DD-MMM-YYYY')}.pdf`;

//     html2pdf()
//       .set({
//         margin: [15, 20, 15, 20],
//         filename: fileName,
//         html2canvas: { scale: 2 },
//         jsPDF: { format: 'a4', orientation: 'landscape' }
//       })
//       .from(element)
//       .save()
//       .then(() => {
//         document.body.removeChild(element);
//         toast.success("PDF यशस्वीरित्या तयार झाला!");
//       });
//   };

//   const getResponsiveWidth = () => (isMobile ? '100%' : isTablet ? '90%' : '80%');
//   const getResponsiveMargin = () => (isMobile ? '0' : isTablet ? (isSidebarOpen ? '15%' : '5%') : (isSidebarOpen ? '18%' : '8%'));

//   const gridStyle = {
//     minHeight: 'calc(100vh - 40px)',
//     width: getResponsiveWidth(),
//     marginLeft: getResponsiveMargin(),
//     marginTop: '100px',
//     marginBottom: '20px',
//     transition: 'all 0.3s ease-in-out',
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#f8f9fa',
//     padding: isMobile ? '10px' : '20px',
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
//         <CircularProgress size={70} sx={{ color: '#23CCEF' }} />
//       </Box>
//     );
//   }

//   return (
//     <div style={gridStyle}>
//       <Container maxWidth={false} sx={{ p: '0 !important' }}>
//         <Paper elevation={0} sx={{ p: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', bgcolor: 'white', boxShadow: 3 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
//             <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#0d2136', fontWeight: 600 }}>
//               Visitors Master
//               {isFiltered && startDate && endDate && (
//                 <Typography variant="body2" sx={{ color: '#d32f2f', fontWeight: 500, mt: 1 }}>
//                   फिल्टर: {dayjs(startDate).format('DD/MM/YYYY')} ते {dayjs(endDate).format('DD/MM/YYYY')}
//                 </Typography>
//               )}
//             </Typography>

//             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//               <Tooltip title="तारीख निवडा">
//                 <Button
//                   variant="contained"
//                   startIcon={<FilterListIcon />}
//                   onClick={() => setDateFilterOpen(true)}
//                   sx={{
//                     bgcolor: isFiltered ? '#ed6c02' : '#1976d2',
//                     '&:hover': { bgcolor: isFiltered ? '#e65100' : '#1565c0' }
//                   }}
//                 >
//                   {isFiltered ? 'फिल्टर सक्रिय' : 'तारीख फिल्टर'}
//                 </Button>
//               </Tooltip>

//               {isFiltered && (
//                 <Tooltip title="फिल्टर काढा">
//                   <Button
//                     variant="outlined"
//                     startIcon={<ClearIcon />}
//                     onClick={handleClearFilter}
//                     sx={{
//                       borderColor: '#d32f2f',
//                       color: '#d32f2f',
//                       '&:hover': { borderColor: '#b71c1c', bgcolor: '#ffebee' }
//                     }}
//                   >
//                     Clear
//                   </Button>
//                 </Tooltip>
//               )}

//               <Tooltip title="Excel डाउनलोड">
//                 <Button
//                   variant="contained"
//                   startIcon={<DownloadIcon />}
//                   onClick={handleDownloadExcel}
//                   sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
//                 >
//                   Excel
//                 </Button>
//               </Tooltip>

//               <Tooltip title="PDF डाउनलोड (मराठी फॉन्टसह)">
//                 <Button
//                   variant="contained"
//                   startIcon={<PictureAsPdfIcon />}
//                   onClick={handleDownloadPDF}
//                   sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
//                 >
//                   PDF
//                 </Button>
//               </Tooltip>
//             </Box>
//           </Box>

//           <Box sx={{ width: '100%', height: isMobile ? 500 : 650 }}>
//             <StyledDataGrid
//               rows={visitors}
//               columns={columns}
//               pageSizeOptions={[10, 20, 50]}
//               paginationMode="server"
//               rowCount={pagination.totalVisitors || 0}
//               loading={loading}
//               onPaginationModelChange={(model) => fetchVisitors(model.page + 1)}
//               initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
//             />
//           </Box>
//         </Paper>
//       </Container>

//       <Dialog open={dateFilterOpen} onClose={() => setDateFilterOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 600 }}>
//           तारीख फिल्टर निवडा
//         </DialogTitle>
//         <DialogContent sx={{ pt: 3 }}>
//           <TextField
//             label="सुरुवातीची तारीख"
//             type="date"
//             fullWidth
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//             sx={{ mb: 3 }}
//           />
//           <TextField
//             label="शेवटची तारीख"
//             type="date"
//             fullWidth
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={() => setDateFilterOpen(false)} sx={{ color: '#666' }}>
//             रद्द करा
//           </Button>
//           <Button
//             onClick={handleApplyDateFilter}
//             variant="contained"
//             sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
//           >
//             फिल्टर लागू करा
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default VisitorsMaster;

// ====================================================


// =============================================================================


// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Box, Paper, Typography, Container, CircularProgress, useTheme, useMediaQuery, Avatar,
//   Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import DownloadIcon from '@mui/icons-material/Download';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import ClearIcon from '@mui/icons-material/Clear';
// import PrintIcon from '@mui/icons-material/Print';
// import CloseIcon from '@mui/icons-material/Close';
// import html2pdf from 'html2pdf.js';
// import * as XLSX from 'xlsx';
// import dayjs from 'dayjs';
// import { toast } from 'react-toastify';

// const marathiFontStyle = `
//   @import url('https://fonts.googleapis.com/css2?family=Mangal:wght@400;700&display=swap');
//   body { font-family: 'Mangal', Arial, sans-serif !important; }
// `;

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   border: 'none',
//   borderRadius: '12px',
//   backgroundColor: 'white',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//   '& .MuiDataGrid-row': {
//     cursor: 'pointer',
//     '&:hover': { backgroundColor: '#e3f2fd !important' },
//   },
// }));

// const VisitorsMaster = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const navigate = useNavigate();

//   // लॉगिन केलेला युजर
//   const user = useSelector((state) => state.auth.user);

//   const [visitors, setVisitors] = useState([]);
//   const [allVisitors, setAllVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalVisitors: 0
//   });

//   const [dateFilterOpen, setDateFilterOpen] = useState(false);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [isFiltered, setIsFiltered] = useState(false);

//   const [profileDialogOpen, setProfileDialogOpen] = useState(false);
//   const [selectedVisitor, setSelectedVisitor] = useState(null);

//   const handlePhotoClick = (visitorData) => {
//     setSelectedVisitor(visitorData);
//     setProfileDialogOpen(true);
//   };

//   const handlePrintProfile = () => {
//     if (!selectedVisitor) return;

//     const printWindow = window.open('', '', 'width=800,height=900');

//     const photoUrl = selectedVisitor.visitorPhoto ||
//                      (selectedVisitor.visits?.length > 0 ? selectedVisitor.visits[selectedVisitor.visits.length - 1].visitorPhoto : '');

//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <title>Visitor Profile</title>
//         <style>
//           @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;700&display=swap');
//           * { margin:0; padding:0; box-sizing:border-box; }
//           body { font-family: 'Mukta', sans-serif; background:white; padding:30px; }
//           .card { max-width:750px; margin:auto; border:8px solid #1e3a8a; border-radius:16px; overflow:hidden; background:white; box-shadow:0 10px 30px rgba(0,0,0,0.2); }
//           .header { background:linear-gradient(135deg,#1e3a8a,#1e40af); color:white; text-align:center; padding:25px; border-bottom:5px solid #fbbf24; }
//           .title { font-size:36px; font-weight:700; margin:10px 0 5px; text-shadow:2px 2px 6px rgba(0,0,0,0.4); }
//           .subtitle { font-size:20px; opacity:0.95; margin-top:8px; }
//           .content { padding:40px; }
//           .photo-section { text-align:center; margin-bottom:30px; }
//           .photo { width:180px; height:180px; border-radius:12px; object-fit:cover; border:6px solid #1e3a8a; box-shadow:0 10px 25px rgba(0,0,0,0.3); }
//           .info-section { margin-top:30px; }
//           .row { display:flex; margin-bottom:20px; padding:15px; background:#f8f9fa; border-radius:8px; border-left:5px solid #1e3a8a; }
//           .label { font-weight:700; color:#1e3a8a; min-width:200px; font-size:18px; }
//           .value { font-weight:500; color:#1f2937; font-size:18px; }
//           .footer { text-align:center; padding:20px; color:#64748b; font-size:14px; border-top:3px dashed #94a3b8; margin-top:30px; }
//           @media print { body { padding:0; } @page { margin:15mm; } }
//         </style>
//       </head>
//       <body onload="window.print(); setTimeout(()=>window.close(),1500)">
//         <div class="card">
//           <div class="header">
//             <div class="title">ठाणे ग्रामीण पोलीस</div>
//             <div class="subtitle">Thane Rural Police</div>
//             <div class="subtitle" style="margin-top:15px; font-size:24px;">अभ्यागत प्रोफाईल</div>
//           </div>
//           <div class="content">
//             <div class="photo-section">
//               ${photoUrl ? `<img src="${photoUrl}" class="photo" alt="Visitor" />` : `<div class="photo" style="display:flex;align-items:center;justify-content:center;background:#e3f2fd;font-size:4rem;font-weight:bold;color:#1e3a8a;">${selectedVisitor.fullName?.charAt(0).toUpperCase()}</div>`}
//             </div>
//             <div class="info-section">
//               <div class="row"><span class="label">पूर्ण नाव :</span><span class="value">${selectedVisitor.fullName || '-'}</span></div>
//               <div class="row"><span class="label">मोबाईल नंबर :</span><span class="value">${selectedVisitor.mobileNumber || '-'}</span></div>
//               <div class="row"><span class="label">पोलीस स्टेशन :</span><span class="value">${selectedVisitor.policeStation || '-'}</span></div>
//               <div class="row"><span class="label">पत्ता :</span><span class="value">${selectedVisitor.fullAddress || '-'}</span></div>
//               <div class="row"><span class="label">पिनकोड :</span><span class="value">${selectedVisitor.pincode || '-'}</span></div>
//               <div class="row"><span class="label">जिल्हा :</span><span class="value">${selectedVisitor.district || '-'}</span></div>
//             </div>
//             <div class="footer">
//               <p>प्रिंट तारीख: ${dayjs().format('DD/MM/YYYY')} | वेळ: ${dayjs().format('hh:mm A')}</p>
//             </div>
//           </div>
//         </div>
//       </body>
//       </html>
//     `);

//     printWindow.document.close();
//   };

//   const columns = [
//     { field: 'id', headerName: 'अ.क्र.', width: 80, headerAlign: 'center', align: 'center' },
//     {
//       field: 'photo',
//       headerName: 'फोटो',
//       width: 110,
//       headerAlign: 'center',
//       align: 'center',
//       sortable: false,
//       renderCell: (params) => {
//         const photoUrl = params.row.visitorPhoto ||
//                          (params.row.visits?.length > 0 ? params.row.visits[params.row.visits.length - 1].visitorPhoto : null);

//         return (
//           <Avatar
//             src={photoUrl}
//             alt={params.row.fullName}
//             onClick={(e) => {
//               e.stopPropagation();
//               handlePhotoClick(params.row);
//             }}
//             sx={{
//               width: 56,
//               height: 56,
//               boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//               fontSize: '1.4rem',
//               fontWeight: 'bold',
//               bgcolor: '#e3f2fd',
//               cursor: 'pointer',
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.1)',
//                 boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
//               }
//             }}
//           >
//             {params.row.fullName?.charAt(0).toUpperCase()}
//           </Avatar>
//         );
//       },
//     },
//     {
//       field: 'fullName',
//       headerName: 'पूर्ण नाव',
//       width: 220,
//       flex: 1,
//       renderCell: (params) => (
//         <Typography
//           onClick={() => navigate(`/visitorhistory/${params.row._id}`)}
//           sx={{
//             color: '#1976d2',
//             fontWeight: 600,
//             cursor: 'pointer',
//             '&:hover': { textDecoration: 'underline', color: '#0d47a1' },
//           }}
//         >
//           {params.row.fullName}
//         </Typography>
//       ),
//     },
//     { field: 'mobileNumber', headerName: 'मोबाईल', width: 140 },
//     { field: 'policeStation', headerName: 'पोलीस स्टेशन', width: 200 },
//     { field: 'fullAddress', headerName: 'पत्ता', width: 250, flex: 1 },
//     { field: 'pincode', headerName: 'पिनकोड', width: 120 },
//     { field: 'district', headerName: 'जिल्हा', width: 150 },
//     { field: 'addedByRole', headerName: 'फॉर्म भरून घेणारा अधिकारी', width: 150 },
//     { field: 'officeName', headerName: 'ऑफिस चे नाव', width: 150 },
//     { field: 'officeType', headerName: 'ऑफिस चा प्रकार', width: 150 },
//   ];

//   const filterVisitorsByDateRange = (visitorsData, start, end) => {
//     if (!start || !end) return visitorsData;

//     const startDateTime = dayjs(start).startOf('day');
//     const endDateTime = dayjs(end).endOf('day');

//     return visitorsData.filter(visitor => {
//       if (!visitor.visits || visitor.visits.length === 0) return false;

//       const hasVisitInRange = visitor.visits.some(visit => {
//         const entryDate = dayjs(visit.entryAt);
//         return entryDate.isAfter(startDateTime) && entryDate.isBefore(endDateTime);
//       });

//       return hasVisitInRange;
//     });
//   };

//   const fetchVisitors = async (page = 1, search = '') => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, {
//         params: { page, limit: 10, search }
//       });
//       if (res.data.success) {
//         let visitorsData = res.data.data.visitors;

//         // जर युजर Sub Office चा असेल तर फक्त त्याचेच visitors दाखव
//         if (user?.officeType === "Sub Office" && user?.officeName) {
//           visitorsData = visitorsData.filter(v => v.officeName === user.officeName);
//         }

//         if (isFiltered && startDate && endDate) {
//           visitorsData = filterVisitorsByDateRange(visitorsData, startDate, endDate);
//         }

//         const formatted = visitorsData.map((v, i) => ({
//           id: i + 1 + (page - 1) * 10,
//           ...v,
//         }));
//         setVisitors(formatted);
//         setPagination(res.data.data.pagination);
//       }
//     } catch (err) {
//       toast.error("Visitors लोड करण्यात त्रुटी!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllForDownload = async () => {
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, { params: { limit: 10000 } });
//       if (res.data.success) {
//         let visitorsData = res.data.data.visitors;

//         // Sub Office युजरला फक्त त्याचेच visitors डाउनलोडला जावेत
//         if (user?.officeType === "Sub Office" && user?.officeName) {
//           visitorsData = visitorsData.filter(v => v.officeName === user.officeName);
//         }

//         if (isFiltered && startDate && endDate) {
//           visitorsData = filterVisitorsByDateRange(visitorsData, startDate, endDate);
//         }

//         const formatted = visitorsData.map((v, i) => ({
//           'अ.क्र.': i + 1,
//           'पूर्ण नाव': v.fullName || '-',
//           'मोबाईल': v.mobileNumber || '-',
//           'पोलीस स्टेशन': v.policeStation || '-',
//           'पत्ता': v.fullAddress || '-',
//           'पिनकोड': v.pincode || '-',
//           'जिल्हा': v.district || '-',
//           'addedByRole': v.addedByRole || '-',
//           'officeName': v.officeName || '-',
//           'officeType': v.officeType || '-'
//         }));
//         setAllVisitors(formatted);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//     fetchAllForDownload();
//   }, [isFiltered, startDate, endDate, user?.officeName]);

//   const handleApplyDateFilter = () => {
//     if (!startDate || !endDate) {
//       toast.warn("कृपया सुरवात आणि शेवटची तारीख निवडा!");
//       return;
//     }

//     if (dayjs(endDate).isBefore(dayjs(startDate))) {
//       toast.error("शेवटची तारीख सुरवातीच्या तारखेपेक्षा मागे असू शकत नाही!");
//       return;
//     }

//     setIsFiltered(true);
//     setDateFilterOpen(false);
//     toast.success(`${dayjs(startDate).format('DD/MM/YYYY')} ते ${dayjs(endDate).format('DD/MM/YYYY')} या कालावधीत फिल्टर लागू केला!`);
//   };

//   const handleClearFilter = () => {
//     setStartDate('');
//     setEndDate('');
//     setIsFiltered(false);
//     setDateFilterOpen(false);
//     toast.info("फिल्टर काढला!");
//   };

//   const handleDownloadExcel = () => {
//     if (allVisitors.length === 0) {
//       toast.warn("डाउनलोडसाठी डेटा उपलब्ध नाही!");
//       return;
//     }
//     const ws = XLSX.utils.json_to_sheet(allVisitors);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Visitors");

//     const fileName = isFiltered && startDate && endDate
//       ? `भेट_देणाऱ्यांची_यादी_${dayjs(startDate).format('DD-MMM-YYYY')}_ते_${dayjs(endDate).format('DD-MMM-YYYY')}.xlsx`
//       : `भेट_देणाऱ्यांची_यादी_${dayjs().format('DD-MMM-YYYY')}.xlsx`;

//     XLSX.writeFile(wb, fileName);
//     toast.success("Excel यशस्वीरित्या डाउनलोड झाला!");
//   };

//   const handleDownloadPDF = () => {
//     if (allVisitors.length === 0) {
//       toast.warn("PDF साठी डेटा उपलब्ध नाही!");
//       return;
//     }

//     const dateRangeText = isFiltered && startDate && endDate
//       ? `<h3 style="text-align:center; margin:10px 0; color:#d32f2f;">कालावधी: ${dayjs(startDate).format('DD/MM/YYYY')} ते ${dayjs(endDate).format('DD/MM/YYYY')}</h3>`
//       : '';

//     const content = `
//       <div style="font-family: 'Mangal', sans-serif; padding: 40px; direction: ltr; font-size: 14px;">
//         <h1 style="text-align:center; color:#d32f2f; margin:15px 0;">ठाणे ग्रामीण पोलीस</h1>
//         <h2 style="text-align:center; color:#0d47a1; margin:10px 0;">भेट देणाऱ्यांची यादी (Visitors Master)</h2>
//         ${dateRangeText}
//         <h3 style="text-align:center; margin:20px 0; color:#1976d2;">
//           एकूण भेट देणारे: <strong>${allVisitors.length}</strong> | तारीख: ${dayjs().format('DD/MM/YYYY')}
//         </h3>

//         <table border="1" cellspacing="0" cellpadding="10" style="width:100%; border-collapse:collapse; margin-top:20px; font-size:13px;">
//           <thead style="background:#1976d2; color:white;">
//             <tr>
//               <th>अ.क्र.</th><th>पूर्ण नाव</th><th>मोबाईल</th><th>पोलीस स्टेशन</th><th>पत्ता</th><th>पिनकोड</th><th>जिल्हा</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${allVisitors.map((v, i) => `
//               <tr style="text-align:center;">
//                 <td>${i + 1}</td>
//                 <td>${v['पूर्ण नाव']}</td>
//                 <td>${v['मोबाईल']}</td>
//                 <td>${v['पोलीस स्टेशन']}</td>
//                 <td>${v['पत्ता']}</td>
//                 <td>${v['पिनकोड']}</td>
//                 <td>${v['जिल्हा']}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>

//         <div style="margin-top:50px; text-align:right;">
//           <p>तयार केले: ____________________</p>
//           <p>दिनांक: ${dayjs().format('DD/MM/YYYY')}</p>
//         </div>
//       </div>
//     `;

//     const element = document.createElement('div');
//     element.innerHTML = content;

//     const style = document.createElement('style');
//     style.innerHTML = marathiFontStyle;
//     element.prepend(style);

//     document.body.appendChild(element);

//     const fileName = isFiltered && startDate && endDate
//       ? `भेट_देणाऱ्यांची_यादी_${dayjs(startDate).format('DD-MMM-YYYY')}_ते_${dayjs(endDate).format('DD-MMM-YYYY')}.pdf`
//       : `भेट_देणाऱ्यांची_यादी_${dayjs().format('DD-MMM-YYYY')}.pdf`;

//     html2pdf()
//       .set({
//         margin: [15, 20, 15, 20],
//         filename: fileName,
//         html2canvas: { scale: 2 },
//         jsPDF: { format: 'a4', orientation: 'landscape' }
//       })
//       .from(element)
//       .save()
//       .then(() => {
//         document.body.removeChild(element);
//         toast.success("PDF यशस्वीरित्या तयार झाला!");
//       });
//   };

//   const getResponsiveWidth = () => (isMobile ? '100%' : isTablet ? '90%' : '80%');
//   const getResponsiveMargin = () => (isMobile ? '0' : isTablet ? (isSidebarOpen ? '15%' : '5%') : (isSidebarOpen ? '14%' : '4%'));

//   const gridStyle = {
//     minHeight: 'calc(100vh - 40px)',
//     width: getResponsiveWidth(),
//     marginLeft: getResponsiveMargin(),
//     marginTop: '100px',
//     marginBottom: '20px',
//     transition: 'all 0.3s ease-in-out',
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#f8f9fa',
//     padding: isMobile ? '10px' : '20px',
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
//         <CircularProgress size={70} sx={{ color: '#23CCEF' }} />
//       </Box>
//     );
//   }

//   const photoUrl = selectedVisitor?.visitorPhoto ||
//                    (selectedVisitor?.visits?.length > 0 ? selectedVisitor.visits[selectedVisitor.visits.length - 1].visitorPhoto : null);

//   return (
//     <div style={gridStyle}>
//       <Container maxWidth={false} sx={{ p: '0 !important' }}>
//         <Paper elevation={0} sx={{ p: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', bgcolor: 'white', boxShadow: 3 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
//             <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#0d2136', fontWeight: 600 }}>
//               Visitors Master
//               {isFiltered && startDate && endDate && (
//                 <Typography variant="body2" sx={{ color: '#d32f2f', fontWeight: 500, mt: 1 }}>
//                   फिल्टर: {dayjs(startDate).format('DD/MM/YYYY')} ते {dayjs(endDate).format('DD/MM/YYYY')}
//                 </Typography>
//               )}
//             </Typography>

//             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//               <Tooltip title="तारीख निवडा">
//                 <Button
//                   variant="contained"
//                   startIcon={<FilterListIcon />}
//                   onClick={() => setDateFilterOpen(true)}
//                   sx={{
//                     bgcolor: isFiltered ? '#ed6c02' : '#1976d2',
//                     '&:hover': { bgcolor: isFiltered ? '#e65100' : '#1565c0' }
//                   }}
//                 >
//                   {isFiltered ? 'फिल्टर सक्रिय' : 'तारीख फिल्टर'}
//                 </Button>
//               </Tooltip>

//               {isFiltered && (
//                 <Tooltip title="फिल्टर काढा">
//                   <Button
//                     variant="outlined"
//                     startIcon={<ClearIcon />}
//                     onClick={handleClearFilter}
//                     sx={{
//                       borderColor: '#d32f2f',
//                       color: '#d32f2f',
//                       '&:hover': { borderColor: '#b71c1c', bgcolor: '#ffebee' }
//                     }}
//                   >
//                     Clear
//                   </Button>
//                 </Tooltip>
//               )}

//               <Tooltip title="Excel डाउनलोड">
//                 <Button
//                   variant="contained"
//                   startIcon={<DownloadIcon />}
//                   onClick={handleDownloadExcel}
//                   sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
//                 >
//                   Excel
//                 </Button>
//               </Tooltip>

//               <Tooltip title="PDF डाउनलोड (मराठी फॉन्टसह)">
//                 <Button
//                   variant="contained"
//                   startIcon={<PictureAsPdfIcon />}
//                   onClick={handleDownloadPDF}
//                   sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
//                 >
//                   PDF
//                 </Button>
//               </Tooltip>
//             </Box>
//           </Box>

//           <Box sx={{ width: '100%', height: isMobile ? 500 : 650 }}>
//             <StyledDataGrid
//               rows={visitors}
//               columns={columns}
//               pageSizeOptions={[10, 20, 50]}
//               paginationMode="server"
//               rowCount={pagination.totalVisitors || 0}
//               loading={loading}
//               onPaginationModelChange={(model) => fetchVisitors(model.page + 1)}
//               initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
//             />
//           </Box>
//         </Paper>
//       </Container>

//       {/* बाकीचा डायलॉग कोड तसाच राहील */}
//       <Dialog open={dateFilterOpen} onClose={() => setDateFilterOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 600 }}>
//           तारीख फिल्टर निवडा
//         </DialogTitle>
//         <DialogContent sx={{ pt: 3 }}>
//           <TextField
//             label="सुरुवातीची तारीख"
//             type="date"
//             fullWidth
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//             sx={{ mb: 3 }}
//           />
//           <TextField
//             label="शेवटची तारीख"
//             type="date"
//             fullWidth
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={() => setDateFilterOpen(false)} sx={{ color: '#666' }}>
//             रद्द करा
//           </Button>
//           <Button
//             onClick={handleApplyDateFilter}
//             variant="contained"
//             sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
//           >
//             फिल्टर लागू करा
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* प्रोफाईल डायलॉग तसाच राहील */}
//       <Dialog
//         open={profileDialogOpen}
//         onClose={() => setProfileDialogOpen(false)}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: '16px',
//             border: '5px solid #1e3a8a'
//           }
//         }}
//       >
//         {/* ... प्रोफाईल डायलॉग तसाच राहील ... */}
//       </Dialog>
//     </div>
//   );
// };

// export default VisitorsMaster;


// ==============================================================

// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Box, Paper, Typography, Container, CircularProgress, useTheme, useMediaQuery, Avatar,
//   Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import DownloadIcon from '@mui/icons-material/Download';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import ClearIcon from '@mui/icons-material/Clear';
// import PrintIcon from '@mui/icons-material/Print';
// import CloseIcon from '@mui/icons-material/Close';
// import html2pdf from 'html2pdf.js';
// import * as XLSX from 'xlsx';
// import dayjs from 'dayjs';
// import { toast } from 'react-toastify';

// const marathiFontStyle = `
//   @import url('https://fonts.googleapis.com/css2?family=Mangal:wght@400;700&display=swap');
//   body { font-family: 'Mangal', Arial, sans-serif !important; }
// `;

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   border: 'none',
//   borderRadius: '12px',
//   backgroundColor: 'white',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//   '& .MuiDataGrid-row': {
//     cursor: 'pointer',
//     '&:hover': { backgroundColor: '#e3f2fd !important' },
//   },
// }));

// const VisitorsMaster = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const navigate = useNavigate();

//   const [visitors, setVisitors] = useState([]);
//   const [allVisitors, setAllVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalVisitors: 0
//   });

//   const [dateFilterOpen, setDateFilterOpen] = useState(false);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [isFiltered, setIsFiltered] = useState(false);

//   const [profileDialogOpen, setProfileDialogOpen] = useState(false);
//   const [selectedVisitor, setSelectedVisitor] = useState(null);

//   const handlePhotoClick = (visitorData) => {
//     setSelectedVisitor(visitorData);
//     setProfileDialogOpen(true);
//   };

//   const handlePrintProfile = () => {
//     if (!selectedVisitor) return;

//     const printWindow = window.open('', '', 'width=800,height=900');

//     const photoUrl = selectedVisitor.visitorPhoto ||
//                      (selectedVisitor.visits?.length > 0 ? selectedVisitor.visits[selectedVisitor.visits.length - 1].visitorPhoto : '');

//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <title>Visitor Profile</title>
//         <style>
//           @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;700&display=swap');
//           * { margin:0; padding:0; box-sizing:border-box; }
//           body { font-family: 'Mukta', sans-serif; background:white; padding:30px; }
//           .card { max-width:750px; margin:auto; border:8px solid #1e3a8a; border-radius:16px; overflow:hidden; background:white; box-shadow:0 10px 30px rgba(0,0,0,0.2); }
//           .header { background:linear-gradient(135deg,#1e3a8a,#1e40af); color:white; text-align:center; padding:25px; border-bottom:5px solid #fbbf24; }
//           .title { font-size:36px; font-weight:700; margin:10px 0 5px; text-shadow:2px 2px 6px rgba(0,0,0,0.4); }
//           .subtitle { font-size:20px; opacity:0.95; margin-top:8px; }
//           .content { padding:40px; }
//           .photo-section { text-align:center; margin-bottom:30px; }
//           .photo { width:180px; height:180px; border-radius:12px; object-fit:cover; border:6px solid #1e3a8a; box-shadow:0 10px 25px rgba(0,0,0,0.3); }
//           .info-section { margin-top:30px; }
//           .row { display:flex; margin-bottom:20px; padding:15px; background:#f8f9fa; border-radius:8px; border-left:5px solid #1e3a8a; }
//           .label { font-weight:700; color:#1e3a8a; min-width:200px; font-size:18px; }
//           .value { font-weight:500; color:#1f2937; font-size:18px; }
//           .footer { text-align:center; padding:20px; color:#64748b; font-size:14px; border-top:3px dashed #94a3b8; margin-top:30px; }
//           @media print { body { padding:0; } @page { margin:15mm; } }
//         </style>
//       </head>
//       <body onload="window.print(); setTimeout(()=>window.close(),1500)">
//         <div class="card">
//           <div class="header">
//             <div class="title">ठाणे ग्रामीण पोलीस</div>
//             <div class="subtitle">Thane Rural Police</div>
//             <div class="subtitle" style="margin-top:15px; font-size:24px;">अभ्यागत प्रोफाईल</div>
//           </div>
//           <div class="content">
//             <div class="photo-section">
//               ${photoUrl ? `<img src="${photoUrl}" class="photo" alt="Visitor" />` : `<div class="photo" style="display:flex;align-items:center;justify-content:center;background:#e3f2fd;font-size:4rem;font-weight:bold;color:#1e3a8a;">${selectedVisitor.fullName?.charAt(0).toUpperCase()}</div>`}
//             </div>
//             <div class="info-section">
//               <div class="row"><span class="label">पूर्ण नाव :</span><span class="value">${selectedVisitor.fullName || '-'}</span></div>
//               <div class="row"><span class="label">मोबाईल नंबर :</span><span class="value">${selectedVisitor.mobileNumber || '-'}</span></div>
//               <div class="row"><span class="label">पोलीस स्टेशन :</span><span class="value">${selectedVisitor.policeStation || '-'}</span></div>
//               <div class="row"><span class="label">पत्ता :</span><span class="value">${selectedVisitor.fullAddress || '-'}</span></div>
//               <div class="row"><span class="label">पिनकोड :</span><span class="value">${selectedVisitor.pincode || '-'}</span></div>
//               <div class="row"><span class="label">जिल्हा :</span><span class="value">${selectedVisitor.district || '-'}</span></div>
//             </div>
//             <div class="footer">
//               <p>प्रिंट तारीख: ${dayjs().format('DD/MM/YYYY')} | वेळ: ${dayjs().format('hh:mm A')}</p>
//             </div>
//           </div>
//         </div>
//       </body>
//       </html>
//     `);

//     printWindow.document.close();
//   };

//   const columns = [
//     { field: 'id', headerName: 'अ.क्र.', width: 80, headerAlign: 'center', align: 'center' },
//     {
//       field: 'photo',
//       headerName: 'फोटो',
//       width: 110,
//       headerAlign: 'center',
//       align: 'center',
//       sortable: false,
//       renderCell: (params) => {
//         const photoUrl = params.row.visitorPhoto ||
//                          (params.row.visits?.length > 0 ? params.row.visits[params.row.visits.length - 1].visitorPhoto : null);

//         return (
//           <Avatar
//             src={photoUrl}
//             alt={params.row.fullName}
//             onClick={(e) => {
//               e.stopPropagation();
//               handlePhotoClick(params.row);
//             }}
//             sx={{
//               width: 56,
//               height: 56,
//               boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//               fontSize: '1.4rem',
//               fontWeight: 'bold',
//               bgcolor: '#e3f2fd',
//               cursor: 'pointer',
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.1)',
//                 boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
//               }
//             }}
//           >
//             {params.row.fullName?.charAt(0).toUpperCase()}
//           </Avatar>
//         );
//       },
//     },
//     {
//       field: 'fullName',
//       headerName: 'पूर्ण नाव',
//       width: 220,
//       flex: 1,
//       renderCell: (params) => (
//         <Typography
//           onClick={() => navigate(`/visitorhistory/${params.row._id}`)}
//           sx={{
//             color: '#1976d2',
//             fontWeight: 600,
//             cursor: 'pointer',
//             '&:hover': { textDecoration: 'underline', color: '#0d47a1' },
//           }}
//         >
//           {params.row.fullName}
//         </Typography>
//       ),
//     },
//     { field: 'mobileNumber', headerName: 'मोबाईल', width: 140 },
//     { field: 'policeStation', headerName: 'पोलीस स्टेशन', width: 200 },
//     { field: 'fullAddress', headerName: 'पत्ता', width: 250, flex: 1 },
//     { field: 'pincode', headerName: 'पिनकोड', width: 120 },
//     { field: 'district', headerName: 'जिल्हा', width: 150 },
//         { field: 'addedByRole', headerName: 'फॉर्म भरून घेणारा अधिकारी', width: 150 },
//   { field: 'officeName', headerName: 'ऑफिस चे नाव', width: 150 },
// { field: 'officeType', headerName: 'ऑफिस चा प्रकार', width: 150 },

//   ];

//   const filterVisitorsByDateRange = (visitorsData, start, end) => {
//     if (!start || !end) return visitorsData;

//     const startDateTime = dayjs(start).startOf('day');
//     const endDateTime = dayjs(end).endOf('day');

//     return visitorsData.filter(visitor => {
//       if (!visitor.visits || visitor.visits.length === 0) return false;

//       const hasVisitInRange = visitor.visits.some(visit => {
//         const entryDate = dayjs(visit.entryAt);
//         return entryDate.isAfter(startDateTime) && entryDate.isBefore(endDateTime);
//       });

//       return hasVisitInRange;
//     });
//   };

//   const fetchVisitors = async (page = 1, search = '') => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, {
//         params: { page, limit: 10, search }
//       });
//       if (res.data.success) {
//         let visitorsData = res.data.data.visitors;

//         if (isFiltered && startDate && endDate) {
//           visitorsData = filterVisitorsByDateRange(visitorsData, startDate, endDate);
//         }

//         const formatted = visitorsData.map((v, i) => ({
//           id: i + 1 + (page - 1) * 10,
//           ...v,
//         }));
//         setVisitors(formatted);
//         setPagination(res.data.data.pagination);
//       }
//     } catch (err) {
//       toast.error("Visitors लोड करण्यात त्रुटी!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllForDownload = async () => {
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, { params: { limit: 10000 } });
//       if (res.data.success) {
//         let visitorsData = res.data.data.visitors;

//         if (isFiltered && startDate && endDate) {
//           visitorsData = filterVisitorsByDateRange(visitorsData, startDate, endDate);
//         }

//         const formatted = visitorsData.map((v, i) => ({
//           'अ.क्र.': i + 1,
//           'पूर्ण नाव': v.fullName || '-',
//           'मोबाईल': v.mobileNumber || '-',
//           'पोलीस स्टेशन': v.policeStation || '-',
//           'पत्ता': v.fullAddress || '-',
//           'पिनकोड': v.pincode || '-',
//           'जिल्हा': v.district || '-',
//           'addedByRole': v.addedByRole || '-',
//           'officeName': v.officeName || '-',
//              'addedByRole': v.addedByRole || '-',
//           'officeType': v.officeType || '-'
//         }));
//         setAllVisitors(formatted);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//     fetchAllForDownload();
//   }, [isFiltered, startDate, endDate]);

//   const handleApplyDateFilter = () => {
//     if (!startDate || !endDate) {
//       toast.warn("कृपया सुरवात आणि शेवटची तारीख निवडा!");
//       return;
//     }

//     if (dayjs(endDate).isBefore(dayjs(startDate))) {
//       toast.error("शेवटची तारीख सुरवातीच्या तारखेपेक्षा मागे असू शकत नाही!");
//       return;
//     }

//     setIsFiltered(true);
//     setDateFilterOpen(false);
//     toast.success(`${dayjs(startDate).format('DD/MM/YYYY')} ते ${dayjs(endDate).format('DD/MM/YYYY')} या कालावधीत फिल्टर लागू केला!`);
//   };

//   const handleClearFilter = () => {
//     setStartDate('');
//     setEndDate('');
//     setIsFiltered(false);
//     setDateFilterOpen(false);
//     toast.info("फिल्टर काढला!");
//   };

//   const handleDownloadExcel = () => {
//     if (allVisitors.length === 0) {
//       toast.warn("डाउनलोडसाठी डेटा उपलब्ध नाही!");
//       return;
//     }
//     const ws = XLSX.utils.json_to_sheet(allVisitors);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Visitors");

//     const fileName = isFiltered && startDate && endDate
//       ? `भेट_देणाऱ्यांची_यादी_${dayjs(startDate).format('DD-MMM-YYYY')}_ते_${dayjs(endDate).format('DD-MMM-YYYY')}.xlsx`
//       : `भेट_देणाऱ्यांची_यादी_${dayjs().format('DD-MMM-YYYY')}.xlsx`;

//     XLSX.writeFile(wb, fileName);
//     toast.success("Excel यशस्वीरित्या डाउनलोड झाला!");
//   };

//   const handleDownloadPDF = () => {
//     if (allVisitors.length === 0) {
//       toast.warn("PDF साठी डेटा उपलब्ध नाही!");
//       return;
//     }

//     const dateRangeText = isFiltered && startDate && endDate
//       ? `<h3 style="text-align:center; margin:10px 0; color:#d32f2f;">कालावधी: ${dayjs(startDate).format('DD/MM/YYYY')} ते ${dayjs(endDate).format('DD/MM/YYYY')}</h3>`
//       : '';

//     const content = `
//       <div style="font-family: 'Mangal', sans-serif; padding: 40px; direction: ltr; font-size: 14px;">
//         <h1 style="text-align:center; color:#d32f2f; margin:15px 0;">ठाणे ग्रामीण पोलीस</h1>
//         <h2 style="text-align:center; color:#0d47a1; margin:10px 0;">भेट देणाऱ्यांची यादी (Visitors Master)</h2>
//         ${dateRangeText}
//         <h3 style="text-align:center; margin:20px 0; color:#1976d2;">
//           एकूण भेट देणारे: <strong>${allVisitors.length}</strong> | तारीख: ${dayjs().format('DD/MM/YYYY')}
//         </h3>

//         <table border="1" cellspacing="0" cellpadding="10" style="width:100%; border-collapse:collapse; margin-top:20px; font-size:13px;">
//           <thead style="background:#1976d2; color:white;">
//             <tr>
//               <th>अ.क्र.</th><th>पूर्ण नाव</th><th>मोबाईल</th><th>पोलीस स्टेशन</th><th>पत्ता</th><th>पिनकोड</th><th>जिल्हा</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${allVisitors.map((v, i) => `
//               <tr style="text-align:center;">
//                 <td>${i + 1}</td>
//                 <td>${v['पूर्ण नाव']}</td>
//                 <td>${v['मोबाईल']}</td>
//                 <td>${v['पोलीस स्टेशन']}</td>
//                 <td>${v['पत्ता']}</td>
//                 <td>${v['पिनकोड']}</td>
//                 <td>${v['जिल्हा']}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>

//         <div style="margin-top:50px; text-align:right;">
//           <p>तयार केले: ____________________</p>
//           <p>दिनांक: ${dayjs().format('DD/MM/YYYY')}</p>
//         </div>
//       </div>
//     `;

//     const element = document.createElement('div');
//     element.innerHTML = content;

//     const style = document.createElement('style');
//     style.innerHTML = marathiFontStyle;
//     element.prepend(style);

//     document.body.appendChild(element);

//     const fileName = isFiltered && startDate && endDate
//       ? `भेट_देणाऱ्यांची_यादी_${dayjs(startDate).format('DD-MMM-YYYY')}_ते_${dayjs(endDate).format('DD-MMM-YYYY')}.pdf`
//       : `भेट_देणाऱ्यांची_यादी_${dayjs().format('DD-MMM-YYYY')}.pdf`;

//     html2pdf()
//       .set({
//         margin: [15, 20, 15, 20],
//         filename: fileName,
//         html2canvas: { scale: 2 },
//         jsPDF: { format: 'a4', orientation: 'landscape' }
//       })
//       .from(element)
//       .save()
//       .then(() => {
//         document.body.removeChild(element);
//         toast.success("PDF यशस्वीरित्या तयार झाला!");
//       });
//   };

//   const getResponsiveWidth = () => (isMobile ? '100%' : isTablet ? '90%' : '80%');
//   const getResponsiveMargin = () => (isMobile ? '0' : isTablet ? (isSidebarOpen ? '15%' : '5%') : (isSidebarOpen ? '14%' : '4%'));

//   const gridStyle = {
//     minHeight: 'calc(100vh - 40px)',
//     width: getResponsiveWidth(),
//     marginLeft: getResponsiveMargin(),
//     marginTop: '100px',
//     marginBottom: '20px',
//     transition: 'all 0.3s ease-in-out',
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#f8f9fa',
//     padding: isMobile ? '10px' : '20px',
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
//         <CircularProgress size={70} sx={{ color: '#23CCEF' }} />
//       </Box>
//     );
//   }

//   const photoUrl = selectedVisitor?.visitorPhoto ||
//                    (selectedVisitor?.visits?.length > 0 ? selectedVisitor.visits[selectedVisitor.visits.length - 1].visitorPhoto : null);

//   return (
//     <div style={gridStyle}>
//       <Container maxWidth={false} sx={{ p: '0 !important' }}>
//         <Paper elevation={0} sx={{ p: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', bgcolor: 'white', boxShadow: 3 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
//             <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#0d2136', fontWeight: 600 }}>
//               Visitors Master
//               {isFiltered && startDate && endDate && (
//                 <Typography variant="body2" sx={{ color: '#d32f2f', fontWeight: 500, mt: 1 }}>
//                   फिल्टर: {dayjs(startDate).format('DD/MM/YYYY')} ते {dayjs(endDate).format('DD/MM/YYYY')}
//                 </Typography>
//               )}
//             </Typography>

//             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//               <Tooltip title="तारीख निवडा">
//                 <Button
//                   variant="contained"
//                   startIcon={<FilterListIcon />}
//                   onClick={() => setDateFilterOpen(true)}
//                   sx={{
//                     bgcolor: isFiltered ? '#ed6c02' : '#1976d2',
//                     '&:hover': { bgcolor: isFiltered ? '#e65100' : '#1565c0' }
//                   }}
//                 >
//                   {isFiltered ? 'फिल्टर सक्रिय' : 'तारीख फिल्टर'}
//                 </Button>
//               </Tooltip>

//               {isFiltered && (
//                 <Tooltip title="फिल्टर काढा">
//                   <Button
//                     variant="outlined"
//                     startIcon={<ClearIcon />}
//                     onClick={handleClearFilter}
//                     sx={{
//                       borderColor: '#d32f2f',
//                       color: '#d32f2f',
//                       '&:hover': { borderColor: '#b71c1c', bgcolor: '#ffebee' }
//                     }}
//                   >
//                     Clear
//                   </Button>
//                 </Tooltip>
//               )}

//               <Tooltip title="Excel डाउनलोड">
//                 <Button
//                   variant="contained"
//                   startIcon={<DownloadIcon />}
//                   onClick={handleDownloadExcel}
//                   sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
//                 >
//                   Excel
//                 </Button>
//               </Tooltip>

//               <Tooltip title="PDF डाउनलोड (मराठी फॉन्टसह)">
//                 <Button
//                   variant="contained"
//                   startIcon={<PictureAsPdfIcon />}
//                   onClick={handleDownloadPDF}
//                   sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
//                 >
//                   PDF
//                 </Button>
//               </Tooltip>
//             </Box>
//           </Box>

//           <Box sx={{ width: '100%', height: isMobile ? 500 : 650 }}>
//             <StyledDataGrid
//               rows={visitors}
//               columns={columns}
//               pageSizeOptions={[10, 20, 50]}
//               paginationMode="server"
//               rowCount={pagination.totalVisitors || 0}
//               loading={loading}
//               onPaginationModelChange={(model) => fetchVisitors(model.page + 1)}
//               initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
//             />
//           </Box>
//         </Paper>
//       </Container>

//       <Dialog open={dateFilterOpen} onClose={() => setDateFilterOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 600 }}>
//           तारीख फिल्टर निवडा
//         </DialogTitle>
//         <DialogContent sx={{ pt: 3 }}>
//           <TextField
//             label="सुरुवातीची तारीख"
//             type="date"
//             fullWidth
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//             sx={{ mb: 3 }}
//           />
//           <TextField
//             label="शेवटची तारीख"
//             type="date"
//             fullWidth
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={() => setDateFilterOpen(false)} sx={{ color: '#666' }}>
//             रद्द करा
//           </Button>
//           <Button
//             onClick={handleApplyDateFilter}
//             variant="contained"
//             sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
//           >
//             फिल्टर लागू करा
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog
//         open={profileDialogOpen}
//         onClose={() => setProfileDialogOpen(false)}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: '16px',
//             border: '5px solid #1e3a8a'
//           }
//         }}
//       >
//         <DialogTitle sx={{
//           bgcolor: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
//           background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
//           color: 'white',
//           fontWeight: 700,
//           fontSize: '1.5rem',
//           textAlign: 'center',
//           position: 'relative',
//           pb: 3
//         }}>
//           अभ्यागत प्रोफाईल
//           <Button
//             onClick={() => setProfileDialogOpen(false)}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: 'white'
//             }}
//           >
//             <CloseIcon />
//           </Button>
//         </DialogTitle>
//         <DialogContent sx={{ pt: 4, pb: 3 }}>
//           {selectedVisitor && (
//             <Box>
//               <Box sx={{ textAlign: 'center', mb: 4 }}>
//                 <Avatar
//                   src={photoUrl}
//                   alt={selectedVisitor.fullName}
//                   sx={{
//                     width: 150,
//                     height: 150,
//                     margin: '0 auto',
//                     border: '6px solid #1e3a8a',
//                     boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
//                     fontSize: '3rem',
//                     fontWeight: 'bold',
//                     bgcolor: '#e3f2fd'
//                   }}
//                 >
//                   {selectedVisitor.fullName?.charAt(0).toUpperCase()}
//                 </Avatar>
//               </Box>

//               <Box sx={{ mt: 3 }}>
//                 <Box sx={{ mb: 2.5, p: 2, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: '5px solid #1e3a8a' }}>
//                   <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>
//                     पूर्ण नाव
//                   </Typography>
//                   <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mt: 0.5 }}>
//                     {selectedVisitor.fullName || '-'}
//                   </Typography>
//                 </Box>

//                 <Box sx={{ mb: 2.5, p: 2, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: '5px solid #1e3a8a' }}>
//                   <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>
//                     मोबाईल नंबर
//                   </Typography>
//                   <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mt: 0.5 }}>
//                     {selectedVisitor.mobileNumber || '-'}
//                   </Typography>
//                 </Box>

//                 <Box sx={{ mb: 2.5, p: 2, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: '5px solid #1e3a8a' }}>
//                   <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>
//                     पोलीस स्टेशन
//                   </Typography>
//                   <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mt: 0.5 }}>
//                     {selectedVisitor.policeStation || '-'}
//                   </Typography>
//                 </Box>

//                 <Box sx={{ mb: 2.5, p: 2, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: '5px solid #1e3a8a' }}>
//                   <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>
//                     पत्ता
//                   </Typography>
//                   <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mt: 0.5 }}>
//                     {selectedVisitor.fullAddress || '-'}
//                   </Typography>
//                 </Box>

//                 <Box sx={{ mb: 2.5, p: 2, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: '5px solid #1e3a8a' }}>
//                   <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>
//                     पिनकोड
//                   </Typography>
//                   <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mt: 0.5 }}>
//                     {selectedVisitor.pincode || '-'}
//                   </Typography>
//                 </Box>

//                 <Box sx={{ mb: 2.5, p: 2, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: '5px solid #1e3a8a' }}>
//                   <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>
//                     जिल्हा
//                   </Typography>
//                   <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mt: 0.5 }}>
//                     {selectedVisitor.district || '-'}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ p: 3, borderTop: '2px solid #e9ecef' }}>
//           <Button
//             onClick={() => setProfileDialogOpen(false)}
//             sx={{ color: '#666', fontWeight: 600 }}
//           >
//             बंद करा
//           </Button>
//           <Button
//             onClick={handlePrintProfile}
//             variant="contained"
//             startIcon={<PrintIcon />}
//             sx={{
//               bgcolor: '#1e3a8a',
//               '&:hover': { bgcolor: '#1e40af' },
//               fontWeight: 600,
//               px: 3
//             }}
//           >
//             प्रिंट करा
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default VisitorsMaster;

// ===========================================================
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
import PrintIcon from '@mui/icons-material/Print';
import CloseIcon from '@mui/icons-material/Close';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

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
    paddingTop: '8px', // 👈 virtual gap effect
    cursor: 'pointer',
    '&:hover': { backgroundColor: '#e3f2fd !important' },
  },
  '& .MuiDataGrid-virtualScrollerRenderZone': {
    gap: '4px', // 👈 proper spacing between rows
  },
}));

const VisitorsMaster = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

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

  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const handlePhotoClick = (visitorData) => {
    setSelectedVisitor(visitorData);
    setProfileDialogOpen(true);
  };

  const handlePrintProfile = () => {
    if (!selectedVisitor) return;

    const printWindow = window.open('', '', 'width=800,height=900');

    const photoUrl = selectedVisitor.visitorPhoto ||
                     (selectedVisitor.visits?.length > 0 ? selectedVisitor.visits[selectedVisitor.visits.length - 1].visitorPhoto : '');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Visitor Profile</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;700&display=swap');
          * { margin:0; padding:0; box-sizing:border-box; }
          body { font-family: 'Mukta', sans-serif; background:white; padding:30px; }
          .card { max-width:750px; margin:auto; border:8px solid #1e3a8a; border-radius:16px; overflow:hidden; background:white; box-shadow:0 10px 30px rgba(0,0,0,0.2); }
          .header { background:linear-gradient(135deg,#1e3a8a,#1e40af); color:white; text-align:center; padding:25px; border-bottom:5px solid #fbbf24; }
          .title { font-size:36px; font-weight:700; margin:10px 0 5px; text-shadow:2px 2px 6px rgba(0,0,0,0.4); }
          .subtitle { font-size:20px; opacity:0.95; margin-top:8px; }
          .content { padding:40px; }
          .photo-section { text-align:center; margin-bottom:30px; }
          .photo { width:180px; height:180px; border-radius:12px; object-fit:cover; border:6px solid #1e3a8a; box-shadow:0 10px 25px rgba(0,0,0,0.3); }
          .info-section { margin-top:30px; }
          .row { display:flex; margin-bottom:20px; padding:15px; background:#f8f9fa; border-radius:8px; border-left:5px solid #1e3a8a; }
          .label { font-weight:700; color:#1e3a8a; min-width:200px; font-size:18px; }
          .value { font-weight:500; color:#1f2937; font-size:18px; }
          .footer { text-align:center; padding:20px; color:#64748b; font-size:14px; border-top:3px dashed #94a3b8; margin-top:30px; }
          @media print { body { padding:0; } @page { margin:15mm; } }
        </style>
      </head>
      <body onload="window.print(); setTimeout(()=>window.close(),1500)">
        <div class="card">
          <div class="header">
            <div class="title">ठाणे ग्रामीण पोलीस</div>
            <div class="subtitle">Thane Rural Police</div>
            <div class="subtitle" style="margin-top:15px; font-size:24px;">अभ्यागत प्रोफाईल</div>
          </div>
          <div class="content">
            <div class="photo-section">
              ${photoUrl ? `<img src="${photoUrl}" class="photo" alt="Visitor" />` : `<div class="photo" style="display:flex;align-items:center;justify-content:center;background:#e3f2fd;font-size:4rem;font-weight:bold;color:#1e3a8a;">${selectedVisitor.fullName?.charAt(0).toUpperCase()}</div>`}
            </div>
            <div class="info-section">
              <div class="row"><span class="label">पूर्ण नाव :</span><span class="value">${selectedVisitor.fullName || '-'}</span></div>
              <div class="row"><span class="label">मोबाईल नंबर :</span><span class="value">${selectedVisitor.mobileNumber || '-'}</span></div>
              <div class="row"><span class="label">पोलीस स्टेशन :</span><span class="value">${selectedVisitor.policeStation || '-'}</span></div>
              <div class="row"><span class="label">पत्ता :</span><span class="value">${selectedVisitor.fullAddress || '-'}</span></div>
              <div class="row"><span class="label">पिनकोड :</span><span class="value">${selectedVisitor.pincode || '-'}</span></div>
              <div class="row"><span class="label">जिल्हा :</span><span class="value">${selectedVisitor.district || '-'}</span></div>
            </div>
            <div class="footer">
              <p>प्रिंट तारीख: ${dayjs().format('DD/MM/YYYY')} | वेळ: ${dayjs().format('hh:mm A')}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  const columns = [
    { field: 'id', headerName: 'अ.क्र.', width: 80, headerAlign: 'center', align: 'center' },
    // {
    //   field: 'photo',
    //   headerName: 'फोटो',
    //   width: 110,
    //   headerAlign: 'center',
    //   align: 'center',
    //   sortable: false,
    //   renderCell: (params) => {
    //     const photoUrl = params.row.visitorPhoto ||
    //                      (params.row.visits?.length > 0 ? params.row.visits[params.row.visits.length - 1].visitorPhoto : null);

    //     return (
    //       <Avatar
    //         src={photoUrl}
    //         alt={params.row.fullName}
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           handlePhotoClick(params.row);
    //         }}
    //         sx={{
    //           width: 56,
    //           height: 56,
    //           boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    //           fontSize: '1.4rem',
    //           fontWeight: 'bold',
    //           bgcolor: '#e3f2fd',
    //           cursor: 'pointer',
    //           transition: 'transform 0.2s',
    //           '&:hover': {
    //             transform: 'scale(1.1)',
    //             boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
    //           }
    //         }}
    //       >
    //         {params.row.fullName?.charAt(0).toUpperCase()}
    //       </Avatar>
    //     );
    //   },
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'पूर्ण नाव',
    //   width: 220,
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Typography
    //       onClick={() => navigate(`/visitorhistory/${params.row._id}`)}
    //       sx={{
    //         color: '#1976d2',
    //         fontWeight: 600,
    //         cursor: 'pointer',
    //         '&:hover': { textDecoration: 'underline', color: '#0d47a1' },
    //       }}
    //     >
    //       {params.row.fullName}
    //     </Typography>
    //   ),
    // },

// {
//   field: 'photo',
//   headerName: 'फोटो',
//   width: 90,                    // tight but perfect fit
//   headerAlign: 'center',
//   align: 'center',
//   sortable: false,
//   filterable: false,
//   disableColumnMenu: true,
//   renderCell: (params) => {
//     const photoUrl =
//       params.row.visitorPhoto ||
//       (params.row.visits?.length > 0
//         ? params.row.visits[params.row.visits.length - 1].visitorPhoto
//         : null);

//     return (
//       <Avatar
//         src={photoUrl || undefined}
//         alt={params.row.fullName}
//         sx={{
//           width: 50,
//           height: 50,
//           border: '3px solid #fff',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
//           fontSize: '1.5rem',
//           fontWeight: 'bold',
//           bgcolor: '#e3f2fd',
//           color: '#1976d2',
//           cursor: photoUrl ? 'pointer' : 'default',
//           transition: 'all 0.2s',
//           '&:hover': photoUrl
//             ? { transform: 'scale(1.12)', boxShadow: '0 8px 20px rgba(0,0,0,0.25)' }
//             : {},
//         }}
//         onClick={(e) => {
//           if (photoUrl) {
//             e.stopPropagation();
//             handlePhotoClick(params.row);
//           }
//         }}
//       >
//         {params.row.fullName?.charAt(0).toUpperCase() || '?'}
//       </Avatar>
//     );
//   },
// },

// {
//   field: 'photo',
//   headerName: 'फोटो',
//   width: 90,
//   headerAlign: 'center',
//   align: 'center',
//   sortable: false,
//   filterable: false,
//   disableColumnMenu: true,
//   renderCell: (params) => {
//     const photoUrl =
//       params.row.visitorPhoto ||
//       (params.row.visits?.length > 0
//         ? params.row.visits[params.row.visits.length - 1].visitorPhoto
//         : null);

//     return (
//       <Avatar
//         src={photoUrl || undefined}
//         alt={params.row.fullName}
//         variant="square"                     // This makes it SQUARE
//         onClick={(e) => {
//           if (photoUrl) {
//             e.stopPropagation();
//             handlePhotoClick(params.row);
//           }
//         }}
//         sx={{
//           width: 56,
//           height: 56,
//           borderRadius: 2,                   // 0 = sharp square, 2 = slightly rounded corners (looks premium)
//           border: '3px solid #fff',
//           boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
//           fontSize: '1.6rem',
//           fontWeight: 'bold',
//           bgcolor: '#e3f2fd',
//           color: '#1976d2',
//           cursor: photoUrl ? 'pointer' : 'default',
//           transition: 'all 0.25s ease',
//           '&:hover': photoUrl
//             ? {
//                 transform: 'scale(1.1)',
//                 boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
//               }
//             : {},
//         }}
//       >
//         {params.row.fullName?.charAt(0).toUpperCase() || '?'}
//       </Avatar>
//     );
//   },
// },



{
  field: 'photo',
  headerName: 'फोटो',
  width: 90,
  headerAlign: 'center',
  align: 'center',
  sortable: false,
  filterable: false,
  disableColumnMenu: true,
  renderCell: (params) => {
    const photoUrl =
      params.row.visitorPhoto ||
      (params.row.visits?.length > 0
        ? params.row.visits[params.row.visits.length - 1].visitorPhoto
        : null);

    // return (
    //   <Avatar
    //     src={photoUrl || undefined}
    //     alt={params.row.fullName}
    //     variant="square"
    //     onClick={(e) => {
    //       if (photoUrl) {
    //         e.stopPropagation();
    //         handlePhotoClick(params.row);
    //       }
    //     }}
    //     sx={{
    //       width: 56,
    //       height: 56,
    //       borderRadius: 2,
    //       border: '3px solid #fff',
    //       boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    //       fontSize: '1.6rem',
    //       fontWeight: 'bold',
    //       bgcolor: '#e3f2fd',
    //       color: '#1976d2',
    //       cursor: photoUrl ? 'pointer' : 'default',
    //       transition: 'all 0.25s ease',
    //       p: 0, // remove default padding from Avatar
    //       '& > img': {
    //         objectFit: 'cover',
    //         width: 'calc(100% - 3px)',   // 1.5px left + 1.5px right
    //         height: 'calc(100% - 3px)',   // 1.5px top + 1.5px bottom
    //         margin: '1.5px',              // this creates exact 1.5px padding all around
    //       },
    //       '&:hover': photoUrl
    //         ? {
    //             transform: 'scale(1.1)',
    //             boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
    //           }
    //         : {},
    //     }}
    //   >
    //     {params.row.fullName?.charAt(0).toUpperCase() || '?'}
    //   </Avatar>
    // );
 
 // ===== हे Avatar code replace करा =====
return (
  <Avatar
    src={photoUrl || undefined}
    alt={params.row.fullName}
    variant="circular" // Circular shape like screenshot
    onClick={(e) => {
      if (photoUrl) {
        e.stopPropagation();
        handlePhotoClick(params.row);
      }
    }}
    sx={{
      width: 48, // Screenshot प्रमाणे थोडा छोटा
      height: 48,
      border: '2px solid #e5e7eb', // Light gray border like screenshot
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Subtle shadow
      fontSize: '1.25rem', // Slightly smaller font
      fontWeight: '600',
      bgcolor: '#f3f4f6', // Light gray background like screenshot
      color: '#6b7280', // Gray text
      cursor: photoUrl ? 'pointer' : 'default',
      transition: 'all 0.2s ease', // Faster transition
      p: 0,
      '& > img': {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: '50%', // Ensure circular crop
      },
      '&:hover': {
        borderColor: '#d1d5db', // Slightly darker border on hover
        boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.15), 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        transform: 'scale(1.05)', // Subtle scale on hover
      },
    }}
  >
    {params.row.fullName?.charAt(0).toUpperCase() || '?'}
  </Avatar>
);
 
 
 
  },
},

{
  field: 'fullName',
  headerName: 'पूर्ण नाव',
  minWidth: 180,
  flex: 1,
  headerAlign: 'left',
  align: 'left',
  renderCell: (params) => (
    <Box
      onClick={() => navigate(`/visitorhistory/${params.row._id}`)}
      sx={{
        cursor: 'pointer',
        py: 1, // gives perfect vertical alignment with the avatar
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: '#1565c0',
          '&:hover': {
            color: '#0d47a1',
            textDecoration: 'underline',
          },
        }}
      >
        {params.row.fullName || '-'}
      </Typography>
    </Box>
  ),
},


    { field: 'mobileNumber', headerName: 'मोबाईल', width: 140 },
    { field: 'policeStation', headerName: 'पोलीस स्टेशन', width: 200 },
    { field: 'fullAddress', headerName: 'पत्ता', width: 250, flex: 1 },
    { field: 'pincode', headerName: 'पिनकोड', width: 120 },
    { field: 'district', headerName: 'जिल्हा', width: 150 },
    { field: 'addedByRole', headerName: 'फॉर्म भरून घेणारा अधिकारी', width: 150 },
    { field: 'officeName', headerName: 'ऑफिस चे नाव', width: 150 },
    { field: 'officeType', headerName: 'ऑफिस चा प्रकार', width: 150 },
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

        if (user?.officeType === "Sub Office" && user?.officeName) {
          visitorsData = visitorsData.filter(v => v.officeName === user.officeName);
        }

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

        if (user?.officeType === "Sub Office" && user?.officeName) {
          visitorsData = visitorsData.filter(v => v.officeName === user.officeName);
        }

        if (isFiltered && startDate && endDate) {
          visitorsData = filterVisitorsByDateRange(visitorsData, startDate, endDate);
        }

        const formatted = visitorsData.map((v, i) => ({
          'अ.क्र.': i + 1,
          'नाव': v.fullName || '-',
          'मोबाईल': v.mobileNumber || '-',
          'पोलीस स्टेशन': v.policeStation || '-',
          'पत्ता': v.fullAddress || '-',
          'पिनकोड': v.pincode || '-',
          'जिल्हा': v.district || '-',
          'addedByRole': v.addedByRole || '-',
          'officeName': v.officeName || '-',
          'officeType': v.officeType || '-'
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
  }, [isFiltered, startDate, endDate, user?.officeName]);

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
  const getResponsiveMargin = () => (isMobile ? '0' : isTablet ? (isSidebarOpen ? '15%' : '5%') : (isSidebarOpen ? '17%' : '4%'));

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

  const photoUrl = selectedVisitor?.visitorPhoto ||
                   (selectedVisitor?.visits?.length > 0 ? selectedVisitor.visits[selectedVisitor.visits.length - 1].visitorPhoto : null);

  return (
    <div style={gridStyle}>
      <Container maxWidth={false} sx={{ p: '0 !important' }}>
        <Paper elevation={0} sx={{ p: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', bgcolor: 'white', boxShadow: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
            <Typography 
           variant={isMobile ? "h4" : "h3"} 
    sx={{ 
      color: '#0d2136', 
      fontWeight: 800,
      letterSpacing: '0.5px',
    }}
            >
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
                  // sx={{
                  //   bgcolor: isFiltered ? '#ed6c02' : '#1976d2',
                  //   '&:hover': { bgcolor: isFiltered ? '#e65100' : '#1565c0' }
                  // }}

                     sx={{
        
          borderRadius: '50px',
          textTransform: 'none',
          fontWeight: 'bold',
          px: 3,

          borderColor: '#e3f2fd',
           color: '#fff',
            bgcolor: '#0B1D2C',
          '&:hover': {
               borderColor: '#e3f2fd',
           color: '#fff',
            bgcolor: '#0E2840',
            opacity:0.9
          },
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
                  // sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}

                     sx={{
        
          borderRadius: '50px',
          textTransform: 'none',
          px: 3,
          fontWeight: 'bold',
        borderColor: '#e3f2fd',
           color: '#fff',
            bgcolor: '#0B1D2C',
          '&:hover': {
               borderColor: '#e3f2fd',
           color: '#fff',
            bgcolor: '#0E2840',
            opacity:0.9
          },
        }}
                >
                  Excel
                </Button>
              </Tooltip>

              <Tooltip title="PDF डाउनलोड (मराठी फॉन्टसह)">
                <Button
                  variant="contained"
                  startIcon={<PictureAsPdfIcon />}
                  onClick={handleDownloadPDF}
                  // sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}

   sx={{
       
       
          borderRadius: '50px',
          textTransform: 'none',
          fontWeight: 500,
          px: 3,
           fontWeight: 'bold',
        borderColor: '#e3f2fd',
           color: '#fff',
            bgcolor: '#0B1D2C',
          '&:hover': {
               borderColor: '#e3f2fd',
           color: '#fff',
            bgcolor: '#0E2840',
            opacity:0.9
          },
        }}

                >
                  PDF
                </Button>
              </Tooltip>
            </Box>


            

{/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
  
  <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#0d2136', fontWeight: 700 }}>
    Visitors Master
    {isFiltered && startDate && endDate && (
      <Typography variant="body2" sx={{ color: '#d32f2f', fontWeight: 500, mt: 1, display: 'block' }}>
        फिल्टर: {dayjs(startDate).format('DD/MM/YYYY')} ते {dayjs(endDate).format('DD/MM/YYYY')}
      </Typography>
    )}
  </Typography>

  
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
   
    <Tooltip title="तारीख फिल्टर">
      <Button
        variant="outlined"
        startIcon={<FilterListIcon />}
        onClick={() => setDateFilterOpen(true)}
        sx={{
          borderColor: '#e0e0e0',
          color: '#666',
          borderRadius: '50px',
          textTransform: 'none',
          fontWeight: 500,
          px: 3,

          
          '&:hover': {
            borderColor: '#1976d2',
            color: '#1976d2',
            bgcolor: '#e3f2fd',
          },
        }}
      >
        Filter
      </Button>
    </Tooltip>

    
    <Tooltip title="Settings">
      <IconButton
        sx={{
          color: '#666',
          border: '1px solid #e0e0e0',
          borderRadius: '50%',
          p: 1.2,
          '&:hover': {
            color: '#1976d2',
            bgcolor: '#e3f2fd',
            borderColor: '#1976d2',
          },
        }}
      >
        <SettingsIcon />
      </IconButton>
    </Tooltip>

  
    <Tooltip title="नवीन अभ्यागत जोडा">
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => {
        
          toast.info("Add Visitor feature येत आहे...");
        }}
        sx={{
          bgcolor: '#6366f1',
          '&:hover': { bgcolor: '#4f46e5' },
          borderRadius: '50px',
          textTransform: 'none',
          fontWeight: 600,
          px: 4,
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
        }}
      >
        Add Visitor
      </Button>
    </Tooltip>

    
  </Box>
</Box> */}


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

      <Dialog
        open={profileDialogOpen}
        onClose={() => setProfileDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            border: '5px solid #1e3a8a'
          }
        }}
      >
        <DialogTitle sx={{
          bgcolor: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
          color: 'white',
          fontWeight: 700,
          fontSize: '1.5rem',
          textAlign: 'center',
          position: 'relative',
          pb: 3
        }}>
          अभ्यागत प्रोफाईल
          <Button
            onClick={() => setProfileDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white'
            }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent sx={{ pt: 4, pb: 3 }}>
          {selectedVisitor && (
            <Box>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Avatar
                  src={photoUrl}
                  alt={selectedVisitor.fullName}
                  sx={{
                    width: 150,
                    height: 150,
                    margin: '0 auto',
                    border: '6px solid #1e3a8a',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    bgcolor: '#e3f2fd'
                  }}
                >
                  {selectedVisitor.fullName?.charAt(0).toUpperCase()}
                </Avatar>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Box sx={{ mb: 2.5, p: 2, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: '5px solid #1e3a8a' }}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>
                    पूर्ण नाव
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mt: 0.5 }}>
                    {selectedVisitor.fullName || '-'}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2.5, p: 2, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: '5px solid #1e3a8a' }}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>
                    मोबाईल नंबर
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mt: 0.5 }}>
                    {selectedVisitor.mobileNumber || '-'}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2.5, p: 2, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: '5px solid #1e3a8a' }}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>
                    पोलीस स्टेशन
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mt: 0.5 }}>
                    {selectedVisitor.policeStation || '-'}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2.5, p: 2, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: '5px solid #1e3a8a' }}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>
                    पत्ता
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mt: 0.5 }}>
                    {selectedVisitor.fullAddress || '-'}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2.5, p: 2, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: '5px solid #1e3a8a' }}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>
                    पिनकोड
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mt: 0.5 }}>
                    {selectedVisitor.pincode || '-'}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2.5, p: 2, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: '5px solid #1e3a8a' }}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>
                    जिल्हा
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mt: 0.5 }}>
                    {selectedVisitor.district || '-'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '2px solid #e9ecef' }}>
          <Button
            onClick={() => setProfileDialogOpen(false)}
            sx={{ color: '#666', fontWeight: 600 }}
          >
            बंद करा
          </Button>
          <Button
            onClick={handlePrintProfile}
            variant="contained"
            startIcon={<PrintIcon />}
            sx={{
              bgcolor: '#1e3a8a',
              '&:hover': { bgcolor: '#1e40af' },
              fontWeight: 600,
              px: 3
            }}
          >
            प्रिंट करा
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VisitorsMaster;











