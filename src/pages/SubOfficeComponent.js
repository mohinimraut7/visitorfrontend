// // src/pages/SubOfficeMaster.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Box, Button, Typography, IconButton, Paper, Container,
//   CircularProgress, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, useTheme, useMediaQuery
// } from '@mui/material';
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import { toast } from 'react-toastify';
// import AddSubOfficeModal from '../components/modals/AddSubOfficeModal';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': { backgroundColor: '#fbfcfd' },
//   '&:nth-of-type(even)': { backgroundColor: 'white' },
//   '&:hover': {
//     backgroundColor: '#e3f2fd !important',
//     transform: 'translateY(-1px)',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//     transition: 'all 0.2s ease-in-out'
//   },
// }));

// const SubOfficeMaster = () => {
//   const [suboffices, setSuboffices] = useState([]);
//   const [headoffices, setHeadoffices] = useState([]); // for dropdown
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [currentSuboffice, setCurrentSuboffice] = useState(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isSidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);

//   // Fetch Head Offices for dropdown
//   const fetchHeadOffices = async () => {
//     try {
//       const res = await fetch(`${baseUrl}/getAllHeadoffice`);
//       const data = await res.json();
//       if (res.ok) {
//         setHeadoffices(data.data || []);
//       }
//     } catch (err) {
//       console.error("Error fetching head offices:", err);
//     }
//   };

//   // Fetch All Suboffices
//   const fetchSuboffices = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${baseUrl}/getAllSuboffices`);
//       const data = await res.json();
//       if (res.ok && data.success) {
//         setSuboffices(data.suboffices || []);
//       } else {
//         toast.error(data.message || 'Suboffices लोड झाले नाहीत');
//       }
//     } catch (err) {
//       toast.error('Server Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHeadOffices();
//     fetchSuboffices();
//   }, []);

//   const handleOpenAdd = () => {
//     setCurrentSuboffice(null);
//     setOpenModal(true);
//   };

//   const handleOpenEdit = (suboffice) => {
//     setCurrentSuboffice(suboffice);
//     setOpenModal(true);
//   };

//   const handleClose = () => setOpenModal(false);

//   const handleDelete = async (id) => {
//     if (!window.confirm('खरंच डिलीट करायचं?')) return;
//     try {
//       const res = await fetch(`${baseUrl}/deleteSuboffice/${id}`, { method: 'DELETE' });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         toast.success('Suboffice डिलीट केले!');
//         fetchSuboffices();
//       } else {
//         toast.error(data.message || 'डिलीट करता आले नाही');
//       }
//     } catch (err) {
//       toast.error('Server Error');
//     }
//   };

//   const getResponsiveMargin = () => isMobile ? '0' : isSidebarOpen ? '14%' : '4%';
//   const getResponsiveWidth = () => isMobile ? '100%' : isSidebarOpen ? '82%' : '92%';

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
//         <CircularProgress size={60} sx={{ color: '#20B2AA' }} />
//       </Box>
//     );
//   }

//   return (
//     <div style={{
//       minHeight: 'calc(100vh - 40px)',
//       backgroundColor: '#f8f9fa',
//       padding: isMobile ? '10px' : '20px',
//       marginTop: '80px',
//       marginLeft: getResponsiveMargin(),
//       width: getResponsiveWidth(),
//       transition: 'all 0.3s ease-in-out',
//     }}>
//       <Container maxWidth={false} sx={{ p: 0 }}>
//         <Paper elevation={0} sx={{
//           p: isMobile ? '20px 15px' : '30px 25px',
//           borderRadius: '16px',
//           bgcolor: 'white',
//           boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//           border: '1px solid #e9ecef'
//         }}>
//           <Box sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mb: 3,
//             flexDirection: isMobile ? 'column' : 'row',
//             gap: isMobile ? 2 : 0
//           }}>
//             <Typography variant={isMobile ? "h5" : "h4"} sx={{
//               color: '#0d2136',
//               fontWeight: 600,
//               fontSize: isMobile ? '1.5rem' : '1.75rem',
//               letterSpacing: '0.5px'
//             }}>
//               SUB OFFICE MASTER
//             </Typography>

//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={handleOpenAdd}
//               sx={{
//                 bgcolor: '#20B2AA',
//                 color: '#fff',
//                 textTransform: 'uppercase',
//                 fontWeight: 600,
//                 borderRadius: '8px',
//                 px: 3,
//                 py: 1.5,
//                 '&:hover': {
//                   bgcolor: '#20B2AA',
//                   opacity: 0.9,
//                   transform: 'translateY(-2px)',
//                   boxShadow: '0 8px 20px rgba(32,178,170,0.4)'
//                 }
//               }}
//             >
//               Add Sub Office
//             </Button>
//           </Box>

//           <TableContainer sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
//             <Table stickyHeader>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: '#f8f9fa' }}>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>ID</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Actions</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Suboffice Name</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Head Office</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Address</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Contact</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Email</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {suboffices.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center" sx={{ py: 4, color: '#888' }}>
//                       No Suboffices Found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   suboffices.map((office, index) => (
//                     <StyledTableRow key={office._id}>
//                       <TableCell sx={{ fontWeight: 600 }}>{index + 1}</TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           <IconButton onClick={() => handleDelete(office._id)} sx={{ color: '#FFA534' }}>
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                           <IconButton onClick={() => handleOpenEdit(office)} sx={{ color: '#20B2AA' }}>
//                             <EditIcon fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: 600 }}>{office.subofficeName}</TableCell>
//                       <TableCell sx={{ color: '#20B2AA', fontWeight: 600 }}>
//                         {office.headOfficeId?.officeName || 'N/A'}
//                       </TableCell>
//                       <TableCell>{office.address}</TableCell>
//                       <TableCell>{office.contactNumber || '-'}</TableCell>
//                       <TableCell>{office.email || '-'}</TableCell>
//                     </StyledTableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Container>

//       <AddSubOfficeModal
//         open={openModal}
//         handleClose={handleClose}
//         currentSuboffice={currentSuboffice}
//         headoffices={headoffices}
//         onSuccess={() => {
//           handleClose();
//           fetchSuboffices();
//         }}
//       />
//     </div>
//   );
// };

// export default SubOfficeMaster;


// ===============================================================================


// src/pages/SubOfficeMaster.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Box, Button, Typography, IconButton, Paper, Container,
//   CircularProgress, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, useTheme, useMediaQuery
// } from '@mui/material';
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import { toast } from 'react-toastify';
// import AddSubOfficeModal from '../components/modals/AddSubOfficeModal';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': { backgroundColor: '#fbfcfd' },
//   '&:nth-of-type(even)': { backgroundColor: 'white' },
//   '&:hover': {
//     backgroundColor: '#e3f2fd !important',
//   },
// }));

// const SubOfficeMaster = () => {
//   const [suboffices, setSuboffices] = useState([]);
//   const [headoffices, setHeadoffices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [currentSuboffice, setCurrentSuboffice] = useState(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
//   const isSidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);

//   const fetchHeadOffices = async () => {
//     try {
//       const res = await fetch(`${baseUrl}/getAllHeadoffice`);
//       const data = await res.json();
//       if (res.ok) {
//         setHeadoffices(data.data || []);
//       }
//     } catch (err) {
//       console.error("Error fetching head offices:", err);
//     }
//   };

//   const fetchSuboffices = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${baseUrl}/getAllSuboffices`);
//       const data = await res.json();
//       if (res.ok && data.success) {
//         setSuboffices(data.suboffices || []);
//       } else {
//         toast.error(data.message || 'Suboffices लोड झाले नाहीत');
//       }
//     } catch (err) {
//       toast.error('Server Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHeadOffices();
//     fetchSuboffices();
//   }, []);

//   const handleOpenAdd = () => {
//     setCurrentSuboffice(null);
//     setOpenModal(true);
//   };

//   const handleOpenEdit = (suboffice) => {
//     setCurrentSuboffice(suboffice);
//     setOpenModal(true);
//   };

//   const handleClose = () => setOpenModal(false);

//   const handleDelete = async (id) => {
//     if (!window.confirm('खरंच डिलीट करायचं?')) return;
//     try {
//       const res = await fetch(`${baseUrl}/deleteSuboffice/${id}`, { method: 'DELETE' });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         toast.success('Suboffice डिलीट केले!');
//         fetchSuboffices();
//       } else {
//         toast.error(data.message || 'डिलीट करता आले नाही');
//       }
//     } catch (err) {
//       toast.error('Server Error');
//     }
//   };

//   // ******
//   const getResponsiveWidth = () => (isMobile ? '100%' : isTablet ? '90%' : (isSidebarOpen ? '80%' : '95%'));
//   const getResponsiveMargin = () => (isMobile ? '0' : isTablet ? (isSidebarOpen ? '15%' : '5%') : (isSidebarOpen ? '17%' : '4%'));

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
//             <Typography 
//               variant={isMobile ? "h5" : "h4"} 
//               sx={{ 
//                 color: '#0d2136', 
//                 fontWeight: 700,
//                 letterSpacing: '0.5px',
//               }}
//             >
//               SUB OFFICE MASTER
//             </Typography>

//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={handleOpenAdd}
//               sx={{
//                 borderRadius: '50px',
//                 textTransform: 'none',
//                 fontWeight: 'bold',
//                 px: 4,
//                 py: 1.5,
//                 bgcolor: '#0B1D2C',
//                 color: '#fff',
//                 '&:hover': {
//                   bgcolor: '#0E2840',
//                   opacity: 0.9
//                 },
//               }}
//             >
//               ADD SUB OFFICE
//             </Button>
//           </Box>

//           <TableContainer sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: '#f8f9fa' }}>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057', textAlign: 'center' }}>ID</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057', textAlign: 'center' }}>Actions</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057',minWidth: 170 }}>Suboffice Name</TableCell>
//                   {/* <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Head Office</TableCell> */}
//                    <TableCell align="center" sx={{ fontWeight: 700, color: '#495057',minWidth: 140 }}>Head Office</TableCell> {/* Wider column */}
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Address</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Contact</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Email</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {suboffices.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center" sx={{ py: 6, color: '#888', fontStyle: 'italic' }}>
//                       No Suboffices Found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   suboffices.map((office, index) => (
//                     <StyledTableRow key={office._id}>
//                       <TableCell align="center" sx={{ fontWeight: 600 }}>{index + 1}</TableCell>
//                       <TableCell align="center">
//                         <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
//                           <IconButton 
//                             size="small" 
//                             onClick={() => handleDelete(office._id)} 
//                             sx={{ 
//                               bgcolor: '#FFF3E0', 
//                               color: '#FFA534',
//                               '&:hover': { bgcolor: '#FFE0B2' }
//                             }}
//                           >
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                           <IconButton 
//                             size="small" 
//                             onClick={() => handleOpenEdit(office)} 
//                             sx={{ 
//                               bgcolor: '#E0F7FA', 
//                               color: '#00ACC1',
//                               '&:hover': { bgcolor: '#B2EBF2' }
//                             }}
//                           >
//                             <EditIcon fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: 600 }}>{office.subofficeName}</TableCell>
//                       <TableCell sx={{ color: '#1976d2', fontWeight: 600 }}>
//                         {office.headOfficeId?.officeName || 'N/A'}
//                       </TableCell>
//                       <TableCell>{office.address}</TableCell>
//                       <TableCell>{office.contactNumber || '-'}</TableCell>
//                       <TableCell>{office.email || '-'}</TableCell>
//                     </StyledTableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Container>

//       <AddSubOfficeModal
//         open={openModal}
//         handleClose={handleClose}
//         currentSuboffice={currentSuboffice}
//         headoffices={headoffices}
//         onSuccess={() => {
//           handleClose();
//           fetchSuboffices();
//         }}
//       />
//     </div>
//   );
// };

// export default SubOfficeMaster;

// =====================================

// src/pages/SubOfficeMaster.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Box, Button, Typography, IconButton, Paper, Container,
//   CircularProgress, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, useTheme, useMediaQuery, TablePagination
// } from '@mui/material';
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import { toast } from 'react-toastify';
// import AddSubOfficeModal from '../components/modals/AddSubOfficeModal';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': { backgroundColor: '#fbfcfd' },
//   '&:nth-of-type(even)': { backgroundColor: 'white' },
//   '&:hover': {
//     backgroundColor: '#e3f2fd !important',
//   },
// }));

// const SubOfficeMaster = () => {
//   const [suboffices, setSuboffices] = useState([]);
//   const [headoffices, setHeadoffices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [currentSuboffice, setCurrentSuboffice] = useState(null);

//   // Pagination state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
//   const isSidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);

//   const fetchHeadOffices = async () => {
//     try {
//       const res = await fetch(`${baseUrl}/getAllHeadoffice`);
//       const data = await res.json();
//       if (res.ok) {
//         setHeadoffices(data.data || []);
//       }
//     } catch (err) {
//       console.error("Error fetching head offices:", err);
//     }
//   };

//   const fetchSuboffices = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${baseUrl}/getAllSuboffices`);
//       const data = await res.json();
//       if (res.ok && data.success) {
//         setSuboffices(data.suboffices || []);
//       } else {
//         toast.error(data.message || 'Suboffices लोड झाले नाहीत');
//       }
//     } catch (err) {
//       toast.error('Server Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHeadOffices();
//     fetchSuboffices();
//   }, []);

//   const handleOpenAdd = () => {
//     setCurrentSuboffice(null);
//     setOpenModal(true);
//   };

//   const handleOpenEdit = (suboffice) => {
//     setCurrentSuboffice(suboffice);
//     setOpenModal(true);
//   };

//   const handleClose = () => setOpenModal(false);

//   const handleDelete = async (id) => {
//     if (!window.confirm('खरंच डिलीट करायचं?')) return;
//     try {
//       const res = await fetch(`${baseUrl}/deleteSuboffice/${id}`, { method: 'DELETE' });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         toast.success('Suboffice डिलीट केले!');
//         fetchSuboffices();
//       } else {
//         toast.error(data.message || 'डिलीट करता आले नाही');
//       }
//     } catch (err) {
//       toast.error('Server Error');
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const getResponsiveWidth = () => (isMobile ? '100%' : isTablet ? '90%' : (isSidebarOpen ? '80%' : '95%'));
//   const getResponsiveMargin = () => (isMobile ? '0' : isTablet ? (isSidebarOpen ? '15%' : '5%') : (isSidebarOpen ? '17%' : '4%'));

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

//   // Paginated data
//   const paginatedSuboffices = suboffices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <div style={gridStyle}>
//       <Container maxWidth={false} sx={{ p: '0 !important' }}>
//         <Paper elevation={0} sx={{ p: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', bgcolor: 'white', boxShadow: 3 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
//             <Typography 
//               variant={isMobile ? "h4" : "h3"} 
//               sx={{ 
//                 color: '#0d2136', 
//                 fontWeight: 800,
//                 letterSpacing: '0.5px',
//               }}
//             >
//               SUB OFFICE MASTER
//             </Typography>

//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={handleOpenAdd}
//               sx={{
//                 borderRadius: '50px',
//                 textTransform: 'none',
//                 fontWeight: 'bold',
//                 px: 4,
//                 py: 1.5,
//                 bgcolor: '#0B1D2C',
//                 color: '#fff',
//                 '&:hover': {
//                   bgcolor: '#0E2840',
//                   opacity: 0.9
//                 },
//               }}
//             >
//               ADD SUB OFFICE
//             </Button>
//           </Box>

//           {/* TableContainer with horizontal scroll support */}
//           <TableContainer 
//             sx={{ 
//               borderRadius: '12px', 
//               overflow: 'hidden', 
//               boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//               maxHeight: isMobile ? 500 : 650,
//               overflowX: 'auto',  // Force horizontal scroll when needed
//               '&::-webkit-scrollbar': {
//                 height: '8px',
//               },
//               '&::-webkit-scrollbar-thumb': {
//                 backgroundColor: '#c1c1c1',
//                 borderRadius: '4px',
//               },
//             }}
//           >
//             <Table stickyHeader sx={{ minWidth: 950 }}>  {/* Minimum width to force scroll on small screens */}
//               <TableHead>
//                 <TableRow sx={{ bgcolor: '#f8f9fa' }}>
//                   <TableCell align="center" sx={{ fontWeight: 700, color: '#495057', minWidth: 80 }}>ID</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 700, color: '#495057', minWidth: 120 }}>Actions</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057', minWidth: 220 }}>Suboffice Name</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 700, color: '#495057', minWidth: 200 }}>Head Office</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057', minWidth: 350 }}>Address</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 700, color: '#495057', minWidth: 140 }}>Contact</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 700, color: '#495057', minWidth: 220 }}>Email</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedSuboffices.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center" sx={{ py: 6, color: '#888', fontStyle: 'italic' }}>
//                       No Suboffices Found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   paginatedSuboffices.map((office, index) => (
//                     <StyledTableRow key={office._id}>
//                       <TableCell align="center" sx={{ fontWeight: 600 }}>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell align="center">
//                         <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
//                           <IconButton 
//                             size="small" 
//                             onClick={() => handleDelete(office._id)} 
//                             sx={{ 
//                               bgcolor: '#FFF3E0', 
//                               color: '#FFA534',
//                               '&:hover': { bgcolor: '#FFE0B2' }
//                             }}
//                           >
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                           <IconButton 
//                             size="small" 
//                             onClick={() => handleOpenEdit(office)} 
//                             sx={{ 
//                               bgcolor: '#E0F7FA', 
//                               color: '#00ACC1',
//                               '&:hover': { bgcolor: '#B2EBF2' }
//                             }}
//                           >
//                             <EditIcon fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: 600 }}>{office.subofficeName}</TableCell>
//                       <TableCell align="center" sx={{ color: '#1976d2', fontWeight: 600 }}>
//                         {office.headOfficeId?.officeName || 'N/A'}
//                       </TableCell>
//                       <TableCell sx={{ whiteSpace: 'normal', lineHeight: 1.5 }}>{office.address}</TableCell>
//                       <TableCell align="center">{office.contactNumber || '-'}</TableCell>
//                       <TableCell align="center">{office.email || '-'}</TableCell>
//                     </StyledTableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>

//             {/* Pagination at bottom */}
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 20, 50]}
//               component="div"
//               count={suboffices.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               labelRowsPerPage="Rows per page:"
//               labelDisplayedRows={({ from, to, count }) => `${from}–${to} of ${count}`}
//               sx={{
//                 bgcolor: '#f8f9fa',
//                 borderTop: '2px solid #e9ecef',
//                 '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//                   color: '#495057',
//                   fontWeight: 500,
//                 },
//               }}
//             />
//           </TableContainer>
//         </Paper>
//       </Container>

//       <AddSubOfficeModal
//         open={openModal}
//         handleClose={handleClose}
//         currentSuboffice={currentSuboffice}
//         headoffices={headoffices}
//         onSuccess={() => {
//           handleClose();
//           fetchSuboffices();
//         }}
//       />
//     </div>
//   );
// };

// export default SubOfficeMaster;

// ======================================

// src/pages/SubOfficeMaster.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Button, Typography, IconButton, Paper, Container,
  CircularProgress, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, useTheme, useMediaQuery, TablePagination
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import AddSubOfficeModal from '../components/modals/AddSubOfficeModal';
import { baseUrl } from '../config/config';
import { useSelector } from 'react-redux';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: '#fbfcfd' },
  '&:nth-of-type(even)': { backgroundColor: 'white' },
  '&:hover': {
    backgroundColor: '#e3f2fd !important',
  },
}));

const SubOfficeMaster = () => {
  const [suboffices, setSuboffices] = useState([]);
  const [headoffices, setHeadoffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentSuboffice, setCurrentSuboffice] = useState(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isSidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);

  const fetchHeadOffices = async () => {
    try {
      const res = await fetch(`${baseUrl}/getAllHeadoffice`);
      const data = await res.json();
      if (res.ok) {
        setHeadoffices(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching head offices:", err);
    }
  };

  const fetchSuboffices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/getAllSuboffices`);
      const data = await res.json();
      if (res.ok && data.success) {
        setSuboffices(data.suboffices || []);
      } else {
        toast.error(data.message || 'Suboffices लोड झाले नाहीत');
      }
    } catch (err) {
      toast.error('Server Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeadOffices();
    fetchSuboffices();
  }, []);

  const handleOpenAdd = () => {
    setCurrentSuboffice(null);
    setOpenModal(true);
  };

  const handleOpenEdit = (suboffice) => {
    setCurrentSuboffice(suboffice);
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  const handleDelete = async (id) => {
    if (!window.confirm('खरंच डिलीट करायचं?')) return;
    try {
      const res = await fetch(`${baseUrl}/deleteSuboffice/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('Suboffice डिलीट केले!');
        fetchSuboffices();
      } else {
        toast.error(data.message || 'डिलीट करता आले नाही');
      }
    } catch (err) {
      toast.error('Server Error');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getResponsiveWidth = () => (isMobile ? '100%' : isTablet ? '90%' : (isSidebarOpen ? '80%' : '95%'));
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

  // Paginated data
  const paginatedSuboffices = suboffices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div style={gridStyle}>
      <Container maxWidth={false} sx={{ p: '0 !important' }}>
        <Paper elevation={0} sx={{ p: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', bgcolor: 'white', boxShadow: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              sx={{ 
                color: '#0d2136', 
                fontWeight: 700,
                letterSpacing: '0.5px',
              }}
            >
              SUB OFFICE MASTER
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAdd}
              sx={{
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                bgcolor: '#0B1D2C',
                color: '#fff',
                '&:hover': {
                  bgcolor: '#0E2840',
                  opacity: 0.9
                },
              }}
            >
              ADD SUB OFFICE
            </Button>
          </Box>

          {/* Full wrapper for both vertical + horizontal scroll */}
          <Box
            sx={{
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              maxHeight: isMobile ? 500 : 650,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Inner scrollable container for horizontal scroll */}
            <Box sx={{ overflowX: 'auto', flexGrow: 1, '&::-webkit-scrollbar': { height: 8 } }}>
              <Table stickyHeader sx={{ minWidth: 1000 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                    <TableCell align="center" sx={{ fontWeight: 700, color: '#495057', minWidth: 10 }}>ID</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: '#495057', minWidth: 80 }}>Actions</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#495057', minWidth: 180 }}>Suboffice Name</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: '#495057', minWidth: 140 }}>Head Office</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#495057', minWidth: 380 }}>Address</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: '#495057', minWidth: 140 }}>Contact</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: '#495057', minWidth: 240 }}>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedSuboffices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 6, color: '#888', fontStyle: 'italic' }}>
                        No Suboffices Found
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedSuboffices.map((office, index) => (
                      <StyledTableRow key={office._id}>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <IconButton 
                              size="small" 
                              onClick={() => handleDelete(office._id)} 
                              sx={{ 
                                bgcolor: '#FFF3E0', 
                                color: '#FFA534',
                                '&:hover': { bgcolor: '#FFE0B2' }
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              onClick={() => handleOpenEdit(office)} 
                              sx={{ 
                                bgcolor: '#E0F7FA', 
                                color: '#00ACC1',
                                '&:hover': { bgcolor: '#B2EBF2' }
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{office.subofficeName}</TableCell>
                        <TableCell align="center" sx={{ color: '#1976d2', fontWeight: 600 }}>
                          {office.headOfficeId?.officeName || 'N/A'}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'normal', lineHeight: 1.5 }}>{office.address}</TableCell>
                        <TableCell align="center">{office.contactNumber || '-'}</TableCell>
                        <TableCell align="center">{office.email || '-'}</TableCell>
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Box>

            {/* Pagination fixed at bottom */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 50]}
              component="div"
              count={suboffices.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Rows per page:"
              labelDisplayedRows={({ from, to, count }) => `${from}–${to} of ${count}`}
              sx={{
                bgcolor: '#f8f9fa',
                borderTop: '2px solid #e9ecef',
                flexShrink: 0,
                '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                  color: '#495057',
                  fontWeight: 500,
                },
              }}
            />
          </Box>
        </Paper>
      </Container>

      <AddSubOfficeModal
        open={openModal}
        handleClose={handleClose}
        currentSuboffice={currentSuboffice}
        headoffices={headoffices}
        onSuccess={() => {
          handleClose();
          fetchSuboffices();
        }}
      />
    </div>
  );
};

export default SubOfficeMaster;