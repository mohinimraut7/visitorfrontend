// // src/pages/HeadOfficeMaster.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Box, Button, Typography, IconButton, Paper, Container,
//   CircularProgress, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, useTheme, useMediaQuery
// } from '@mui/material';
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import { toast } from 'react-toastify';
// import AddHeadOfficeModal from '../components/modals/AddHeadOfficeModal';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux'; // हे नवीन जोडले

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

// const HeadOfficeMaster = () => {
//   const [offices, setOffices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [currentOffice, setCurrentOffice] = useState(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   // Role Master सारखीच condition
//   const isSidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);

//   const fetchOffices = async () => {
//     setLoading(true);
//     try {
//       // तुझ्या backend प्रमाणे URL फक्त हे ठेव
//       const res = await fetch(`${baseUrl}/getAllHeadoffice`);
//       const data = await res.json();

//       console.log("API Response:", data); // Debug साठी

//       if (res.ok && data.message === "All Head Offices fetched successfully") {
//         setOffices(data.data || []);
//       } else {
//         toast.error(data.message || 'Head Offices लोड झाले नाहीत');
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Server Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOffices();
//   }, []);

//   const handleOpenAdd = () => {
//     setCurrentOffice(null);
//     setOpenModal(true);
//   };

//   const handleOpenEdit = (office) => {
//     setCurrentOffice(office);
//     setOpenModal(true);
//   };

//   const handleClose = () => setOpenModal(false);

//   const handleDelete = async (id) => {
//     if (!window.confirm('खरंच डिलीट करायचं?')) return;
//     try {
//       const res = await fetch(`${baseUrl}/deleteHeadoffice/${id}`, { method: 'DELETE' });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         toast.success('Head Office डिलीट केले!');
//         fetchOffices();
//       } else {
//         toast.error(data.message || 'डिलीट करता आले नाही');
//       }
//     } catch (err) {
//       toast.error('Server Error');
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
//         <CircularProgress size={60} sx={{ color: '#20B2AA' }} />
//       </Box>
//     );
//   }

//   // Role Master सारखीच responsive margin-left logic
//   const getResponsiveMargin = () => {
//     if (isMobile) return '0';
//     return isSidebarOpen ? '14%' : '4%';
//   };

//   const getResponsiveWidth = () => {
//     if (isMobile) return '100%';
//     return isSidebarOpen ? '82%' : '92%';
//   };

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
//           {/* Header */}
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
//               HEAD OFFICE MASTER
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
//                 },
//                 transition: 'all 0.3s ease'
//               }}
//             >
//               Add Head Office
//             </Button>
//           </Box>

//           {/* Table */}
//           <TableContainer sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
//             <Table stickyHeader>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: '#f8f9fa' }}>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>ID</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Actions</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Office Type</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Office Name</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Address</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Contact No</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057' }}>Email</TableCell>
              
               
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {offices.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center" sx={{ py: 4, color: '#888' }}>
//                       No Head Offices Found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   offices.map((office, index) => (
//                     <StyledTableRow key={office._id}>
//                       <TableCell sx={{ fontWeight: 600 }}>{index + 1}</TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           <IconButton
//                             onClick={() => handleDelete(office._id)}
//                             sx={{ color: '#FFA534', '&:hover': { bgcolor: 'rgba(255,165,52,0.1)' } }}
//                           >
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                           <IconButton
//                             onClick={() => handleOpenEdit(office)}
//                             sx={{ color: '#20B2AA', '&:hover': { bgcolor: 'rgba(32,178,170,0.1)' } }}
//                           >
//                             <EditIcon fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: 600 }}>{office.officeType || '-'}</TableCell>
//                       <TableCell>{office.address || '-'}</TableCell>
//                       <TableCell>{office.contactNumber || '-'}</TableCell>
//                       <TableCell>{office.email || '-'}</TableCell>
//                       <TableCell sx={{ color: '#20B2AA', fontWeight: 600 }}>
//                         <TableCell sx={{ fontWeight: 600 }}>{office.officeName || '-'}</TableCell>

                     
//                       </TableCell>
//                     </StyledTableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Container>

//       <AddHeadOfficeModal
//         open={openModal}
//         handleClose={handleClose}
//         currentOffice={currentOffice}
//         onSuccess={() => {
//           handleClose();
//           fetchOffices();
//         }}
//       />
//     </div>
//   );
// };

// export default HeadOfficeMaster;


// ===============================================


// // src/pages/HeadOfficeMaster.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Button, Typography, IconButton, Paper, Container,
  CircularProgress, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, useTheme, useMediaQuery
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import AddHeadOfficeModal from '../components/modals/AddHeadOfficeModal';
import { baseUrl } from '../config/config';
import { useSelector } from 'react-redux';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': { backgroundColor: '#e3f2fd !important' },
}));

const HeadOfficeMaster = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentOffice, setCurrentOffice] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);

  const fetchOffices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/getAllHeadoffice`);
      const data = await res.json();
      if (res.ok && data.success) {
        setOffices(data.data || []);
      } else {
        toast.error(data.message || 'Failed to load offices');
      }
    } catch (err) {
      toast.error('Server Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  const handleOpenAdd = () => { setCurrentOffice(null); setOpenModal(true); };
  const handleOpenEdit = (office) => { setCurrentOffice(office); setOpenModal(true); };
  const handleClose = () => setOpenModal(false);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this office?')) return;
    try {
      const res = await fetch(`${baseUrl}/deleteHeadoffice/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('Deleted successfully!');
        fetchOffices();
      } else {
        toast.error(data.message || 'Delete failed');
      }
    } catch (err) {
      toast.error('Server Error');
    }
  };

  const getMargin = () => isMobile ? 0 : isSidebarOpen ? '16%' : '3%';
  const getWidth = () => isMobile ? '100%' : isSidebarOpen ? '84%' : '95%';

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} sx={{ color: '#20B2AA' }} />
      </Box>
    );
  }

  return (
    <div style={{
      marginLeft: getMargin(),
      width: getWidth(),
      padding: '20px',
      marginTop: '80px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      transition: 'all 0.3s'
    }}>
      <Container maxWidth={false}>
        <Paper sx={{ p: 4, borderRadius: '16px', boxShadow: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" fontWeight={700} color="#0d2136">
              HEAD OFFICE MASTER
            </Typography>
            {/* <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}
              sx={{ bgcolor: '#20B2AA', '&:hover': { bgcolor: '#1a9a8f' } }}>
              Add Head Office
            </Button> */}
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
              ADD HEAD OFFICE
            </Button>
          </Box>

          <TableContainer sx={{ borderRadius: '12px', overflow: 'hidden' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f0f7fb' }}>
                  <TableCell><strong>Sr.No</strong></TableCell>
                  <TableCell sx={{minWidth: 110 }}><strong>Office Type</strong></TableCell>
                  <TableCell sx={{minWidth: 140 }}><strong>Office Name</strong></TableCell>
                  <TableCell><strong>Address</strong></TableCell>
                  <TableCell><strong>Contact</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell sx={{minWidth: 90 }}><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {offices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4, color: '#888' }}>
                      No Head Offices Found
                    </TableCell>
                  </TableRow>
                ) : (
                  offices.map((office, i) => (
                    <StyledTableRow key={office._id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#20B2AA' }}>
                        {office.officeType || '-'}
                      </TableCell>
                      <TableCell fontWeight={600}>{office.officeName}</TableCell>
                      <TableCell>{office.address || '-'}</TableCell>
                      <TableCell>{office.contactNumber || '-'}</TableCell>
                      <TableCell>{office.email || '-'}</TableCell>
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

      <AddHeadOfficeModal
        open={openModal}
        handleClose={handleClose}
        currentOffice={currentOffice}
        onSuccess={() => { handleClose(); fetchOffices(); }}
      />
    </div>
  );
};

export default HeadOfficeMaster;


// ==========================================

// src/pages/HeadOfficeMaster.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Box, Button, Typography, IconButton, Paper, Container,
//   CircularProgress, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, useTheme, useMediaQuery
// } from '@mui/material';
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import { toast } from 'react-toastify';
// import AddHeadOfficeModal from '../components/modals/AddHeadOfficeModal';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': { backgroundColor: '#fbfcfd' },
//   '&:nth-of-type(even)': { backgroundColor: 'white' },
//   '&:hover': {
//     backgroundColor: '#e3f2fd !important',
//   },
// }));

// const HeadOfficeMaster = () => {
//   const [offices, setOffices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [currentOffice, setCurrentOffice] = useState(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
//   const isSidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);

//   const fetchOffices = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${baseUrl}/getAllHeadoffice`);
//       const data = await res.json();
//       if (res.ok && data.success) {
//         setOffices(data.data || []);
//       } else {
//         toast.error(data.message || 'Failed to load offices');
//       }
//     } catch (err) {
//       toast.error('Server Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOffices();
//   }, []);

//   const handleOpenAdd = () => {
//     setCurrentOffice(null);
//     setOpenModal(true);
//   };

//   const handleOpenEdit = (office) => {
//     setCurrentOffice(office);
//     setOpenModal(true);
//   };

//   const handleClose = () => setOpenModal(false);

//   const handleDelete = async (id) => {
//     if (!window.confirm('खरंच डिलीट करायचं?')) return;
//     try {
//       const res = await fetch(`${baseUrl}/deleteHeadoffice/${id}`, { method: 'DELETE' });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         toast.success('Head Office डिलीट केले!');
//         fetchOffices();
//       } else {
//         toast.error(data.message || 'डिलीट करता आले नाही');
//       }
//     } catch (err) {
//       toast.error('Server Error');
//     }
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
//               HEAD OFFICE MASTER
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
//               ADD HEAD OFFICE
//             </Button>
//           </Box>

//           <TableContainer sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: '#f8f9fa' }}>
//                   <TableCell align="center" sx={{ fontWeight: 700, color: '#495057', width: 80 }}>Sr.No</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057', minWidth: 160 }}>Office Type</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057', minWidth: 200 }}>Office Name</TableCell>
//                   <TableCell sx={{ fontWeight: 700, color: '#495057', minWidth: 300 }}>Address</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 700, color: '#495057', width: 140 }}>Contact</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 700, color: '#495057', minWidth: 220 }}>Email</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 700, color: '#495057', width: 120 }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {offices.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center" sx={{ py: 6, color: '#888', fontStyle: 'italic' }}>
//                       No Head Offices Found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   offices.map((office, index) => (
//                     <StyledTableRow key={office._id}>
//                       <TableCell align="center" sx={{ fontWeight: 600 }}>{index + 1}</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>
//                         {office.officeType || '-'}
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: 600 }}>{office.officeName}</TableCell>
//                       <TableCell sx={{ whiteSpace: 'normal', lineHeight: 1.4 }}>{office.address || '-'}</TableCell>
//                       <TableCell align="center">{office.contactNumber || '-'}</TableCell>
//                       <TableCell align="center">{office.email || '-'}</TableCell>
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
//                     </StyledTableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Container>

//       <AddHeadOfficeModal
//         open={openModal}
//         handleClose={handleClose}
//         currentOffice={currentOffice}
//         onSuccess={() => {
//           handleClose();
//           fetchOffices();
//         }}
//       />
//     </div>
//   );
// };

// export default HeadOfficeMaster;