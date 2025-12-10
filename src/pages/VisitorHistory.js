// // VisitorHistory.jsx
// import React, { useEffect, useState } from 'react';
// import {
//   Box, Container, Paper, Typography, Avatar, Chip, Grid, Divider,
//   CircularProgress, Button, useTheme, useMediaQuery, Stack
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import PendingIcon from '@mui/icons-material/Pending';
// import DescriptionIcon from '@mui/icons-material/Description';
// import EventIcon from '@mui/icons-material/Event';

// const VisitorHistory = () => {
//   const { id } = useParams(); // visitor चा MongoDB _id
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const [visitor, setVisitor] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVisitor = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${baseUrl}/visitor/${id}`); // तुमचा backend route
//         if (res.data.success) {
//           setVisitor(res.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching visitor history:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchVisitor();
//   }, [id]);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress size={60} sx={{ color: '#23CCEF' }} />
//       </Box>
//     );
//   }

//   if (!visitor) {
//     return (
//       <Container>
//         <Typography variant="h5" color="error" align="center" mt={10}>
//           अभ्यागत सापडला नाही
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: isMobile ? 2 : 4, mb: 6 }}>
//       {/* Back Button */}
//       <Button
//         startIcon={<ArrowBackIcon />}
//         onClick={() => navigate(-1)}
//         sx={{ mb: 3, color: '#1976d2' }}
//       >
//         मागे जा
//       </Button>

//       {/* Main Card */}
//       <Paper elevation={6} sx={{ p: isMobile ? 3 : 5, borderRadius: 4, bgcolor: '#fff' }}>
//         {/* Header */}
//         <Grid container spacing={3} alignItems="center">
//           <Grid item>
//             <Avatar
//               src={visitor.visits[visitor.visits.length - 1]?.visitorPhoto || ''}
//               sx={{
//                 width: 100,
//                 height: 100,
//                 border: '4px solid #0040B9',
//                 boxShadow: 3
//               }}
//             >
//               {visitor.fullName.charAt(0)}
//             </Avatar>
//           </Grid>
//           <Grid item xs>
//             <Typography variant="h4" fontWeight={700} color="#0d2136">
//               {visitor.fullName}
//             </Typography>
//             <Typography variant="h6" color="text.secondary" mt={1}>
//               {visitor.mobileNumber} | {visitor.policeStation}, {visitor.district}
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               {visitor.fullAddress} - {visitor.pincode}
//             </Typography>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 4 }} />

//         {/* Visits History */}
//         <Typography variant="h5" fontWeight={600} mb={3} color="#0d2136">
//           भेटीचा इतिहास ({visitor.visits.length} भेटी)
//         </Typography>

//         <Stack spacing={3}>
//           {visitor.visits.slice().reverse().map((visit, index) => (
//             <Paper
//               key={visit.applicationId}
//               elevation={3}
//               sx={{
//                 p: 3,
//                 borderRadius: 3,
//                 borderLeft: `6px solid ${visit.feedbackGiven ? '#28a745' : '#ff9800'}`,
//                 bgcolor: visit.feedbackGiven ? '#f8fff9' : '#fff8e1'
//               }}
//             >
//               <Grid container spacing={2}>
//                 {/* Left */}
//                 <Grid item xs={12} md={8}>
//                   <Stack direction="row" spacing={2} alignItems="center" mb={1}>
//                     <Chip
//                       label={`भेट क्रमांक ${visit.visitNumber}`}
//                       color="primary"
//                       size="small"
//                       sx={{ fontWeight: 'bold' }}
//                     />
//                     <Chip
//                       label={visit.applicationId}
//                       variant="outlined"
//                       size="small"
//                     />
//                     <Chip
//                       icon={visit.feedbackGiven ? <CheckCircleIcon /> : <PendingIcon />}
//                       label={visit.feedbackGiven ? "फीडबॅक दिला" : "फीडबॅक बाकी"}
//                       color={visit.feedbackGiven ? "success" : "warning"}
//                       size="small"
//                     />
//                   </Stack>

//                   <Typography variant="body1" fontWeight={500}>
//                     <strong>भेटीचे कारण:</strong> {visit.reasonToVisit || '-'}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>संपर्क अधिकारी:</strong> {visit.contactPerson || '-'}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>सहप्रवासी:</strong> {visit.numberOfVisitors} व्यक्ती
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" mt={1}>
//                     <EventIcon fontSize="small" sx={{ mr: 1 }} />
//                     {new Date(visit.entryAt).toLocaleString('mr-IN')}
//                   </Typography>

//                   {visit.feedback && (
//                     <Box mt={2}>
//                       <Typography variant="body2" fontWeight="bold" color="#28a745">
//                         अभिप्राय: {visit.feedback}
//                       </Typography>
//                     </Box>
//                   )}
//                 </Grid>

//                 {/* Right - Photo + Document */}
//                 <Grid item xs={12} md={4} textAlign={isMobile ? "left" : "right"}>
//                   <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'start' : 'end', gap: 2 }}>
//                     <Avatar
//                       src={visit.visitorPhoto}
//                       variant="rounded"
//                       sx={{ width: 120, height: 160, borderRadius: 2, boxShadow: 2 }}
//                     />

//                     {visit.uploadDocument.length > 0 && (
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         startIcon={<DescriptionIcon />}
//                         href={visit.uploadDocument[0].url}
//                         target="_blank"
//                         sx={{ mt: 1 }}
//                       >
//                         दस्तऐवज पहा ({visit.uploadDocument.length})
//                       </Button>
//                     )}
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Paper>
//           ))}
//         </Stack>
//       </Paper>
//     </Container>
//   );
// };

// export default VisitorHistory;

// ========================================

// // src/pages/VisitorHistory.jsx   (Full Final Version)
// import React, { useEffect, useState } from 'react';
// import {
//   Box, Container, Paper, Typography, Avatar, Chip, Grid, Divider,
//   CircularProgress, Button, useTheme, useMediaQuery, Stack
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import PendingIcon from '@mui/icons-material/Pending';
// import DescriptionIcon from '@mui/icons-material/Description';
// import EventIcon from '@mui/icons-material/Event';

// const VisitorHistory = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

//   const [visitor, setVisitor] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVisitor = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${baseUrl}/visitor/${id}`);
//         if (res.data.success) {
//           setVisitor(res.data.data);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchVisitor();
//   }, [id]);

//   // Responsive Layout (User Master सारखंच)
//   const getWidth = () => {
//     if (isMobile) return '100%';
//     if (isTablet) return isSidebarOpen ? '85%' : '95%';
//     return isSidebarOpen ? '82%' : '92%';
//   };

//   const getMarginLeft = () => {
//     if (isMobile) return '0';
//     if (isTablet) return isSidebarOpen ? '15%' : '5%';
//     return isSidebarOpen ? '18%' : '8%';
//   };

//   const pageStyle = {
//     minHeight: 'calc(100vh - 40px)',
//     width: getWidth(),
//     marginLeft: getMarginLeft(),
//     marginTop: '100px',
//     marginBottom: '20px',
//     backgroundColor: '#f8f9fa',
//     padding: isMobile ? '10px' : '20px',
//     transition: 'all 0.3s ease-in-out',
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
//         <CircularProgress size={60} sx={{ color: '#23CCEF' }} />
//       </Box>
//     );
//   }

//   if (!visitor) {
//     return (
//       <Box sx={pageStyle}>
//         <Typography variant="h5" color="error" align="center" mt={10}>
//           अभ्यागत सापडला नाही
//         </Typography>
//       </Box>
//     );
//   }

//   const visits = visitor.visits || []; // ← ही ओळ क्रॅश प्रिव्हेंट करते


//   const meetingPersonMarathi = {
//   "Superintendent of Police": "पोलीस अधीक्षक",
//   "Additional Superintendent of Police": "अपर पोलीस अधीक्षक",
//   "Sub-Divisional Officer, Ganeshpuri": "उप विभागीय अधिकारी गणेशपुरी",
//   "Sub-Divisional Officer, Shahapur": "उप विभागीय अधिकारी शहापूर",
//   "Sub-Divisional Officer, Murbad": "उप विभागीय अधिकारी मुरबाड",
//   "Sub-Divisional Officer, Home Department": "उप विभागीय अधिकारी गृह",
//   "In-Charge Officer": "प्रभारी अधिकारी",
//   "पोलीस निरीक्षक": "पोलीस निरीक्षक"
// };


//   return (
//     <div style={pageStyle}>
//       <Container maxWidth={false} sx={{ p: 0 }}>
//         <Paper elevation={0} sx={{
//           p: isMobile ? '20px 15px' : '40px 35px',
//           borderRadius: '16px',
//           bgcolor: 'white',
//           boxShadow: '0 4px 25px rgba(0,0,0,0.1)',
//           border: '1px solid #e9ecef'
//         }}>
//           {/* Back Button */}
//           <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3, color: '#1976d2' }}>
//             मागे जा
//           </Button>

//           {/* Profile Header */}
//           <Grid container spacing={4} alignItems="center">
//             <Grid item>
//               <Avatar
//                 src={visits.length > 0 ? visits[visits.length - 1].visitorPhoto : ''}
//                 sx={{ width: 110, height: 110, border: '5px solid #0040B9' }}
//               >
//                 {visitor.fullName[0]}
//               </Avatar>
//             </Grid>
//             <Grid item xs>
//               <Typography variant="h3" fontWeight={700} color="#0d2136">
//                 {visitor.fullName}
//               </Typography>
//               <Typography variant="h6" color="text.secondary">
//                 {visitor.mobileNumber} | {visitor.policeStation}, {visitor.district}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 {visitor.fullAddress} - {visitor.pincode}
//               </Typography>
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 5 }} />

//           <Typography variant="h4" fontWeight={600} mb={4}>
//             भेटीचा इतिहास ({visits.length} भेटी)
//           </Typography>

//           {visits.length === 0 ? (
//             <Paper sx={{ p: 8, textAlign: 'center', bgcolor: '#fafafa' }}>
//               <Typography variant="h6" color="text.secondary">
//                 या अभ्यागताची एकही भेट नोंदवलेली नाही
//               </Typography>
//             </Paper>
//           ) : (
//             <Stack spacing={3}>
//               {visits.slice().reverse().map((visit) => (
                
//                 <Paper
//                   key={visit.applicationId}
//                   elevation={4}
//                   sx={{
//                     p: 3,
//                     borderRadius: 3,
//                     borderLeft: `7px solid ${visit.feedbackGiven ? '#28a745' : '#ff9800'}`,
//                     bgcolor: visit.feedbackGiven ? '#f8fff9' : '#fff8e1',
//                   }}
//                 >
//                   <Grid container spacing={3}>
//                     <Grid item xs={12} md={8}>
//                       <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
//                         <Chip label={`भेट ${visit.visitNumber}`} color="primary" />
//                         <Chip label={visit.applicationId} variant="outlined" />
//                         <Chip
//                           icon={visit.feedbackGiven ? <CheckCircleIcon /> : <PendingIcon />}
//                           label={visit.feedbackGiven ? "फीडबॅक दिला" : "फीडबॅक बाकी"}
//                           color={visit.feedbackGiven ? "success" : "warning"}
//                         />
//                       </Stack>

//                       <Typography><strong>कारण:</strong> {visit.reasonToVisit}</Typography>
//                       <Typography><strong>अधिकारी:</strong> {meetingPersonMarathi[visit.contactPerson] || visit.contactPerson || "N/A"}</Typography>
//                       <Typography><strong>सहप्रवासी:</strong> {visit.numberOfVisitors} व्यक्ती</Typography>
//                       <Typography color="text.secondary" mt={1}>
//                         <EventIcon fontSize="small" sx={{ mr: 1 }} />
//                         {new Date(visit.entryAt).toLocaleString('mr-IN')}
//                       </Typography>

//                       {visit.feedback && (
//                         <Box mt={2} p={2} bgcolor="#e8f5e9" borderRadius={2}>
//                           <Typography fontWeight="bold" color="#2e7d32">
//                             अभिप्राय: {visit.feedback}
//                           </Typography>

//                            <Typography color="text.secondary" mt={1}>
//                         <EventIcon fontSize="small" sx={{ mr: 1 }} />
//                         {new Date(visit.feedbackSubmittedAt).toLocaleString('mr-IN')}
//                       </Typography>
//                         </Box>
//                       )}
//                     </Grid>

//                     <Grid item xs={12} md={4} sx={{ textAlign: isMobile ? 'left' : 'right' }}>
//                       <Avatar src={visit.visitorPhoto} variant="rounded" sx={{ width: 140, height: 180, mb: 2 }} />
//                       {visit.uploadDocument?.length > 0 && (
//                         <Button
//                           variant="contained"
//                           size="small"
//                           startIcon={<DescriptionIcon />}
//                           href={visit.uploadDocument[0].url}
//                           target="_blank"
//                           sx={{ bgcolor: '#20B2AA', '&:hover': { bgcolor: '#1a8b85' } }}
//                         >
//                           दस्तऐवज ({visit.uploadDocument.length})
//                         </Button>
//                       )}
//                     </Grid>
//                   </Grid>
//                 </Paper>
//               ))}
//             </Stack>
//           )}
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default VisitorHistory;


// ===============================================

// import React, { useEffect, useState } from 'react';
// import {
//   Box, Container, Paper, Typography, Avatar, Chip, Grid, Divider,
//   CircularProgress, Button, useTheme, useMediaQuery, Stack
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import PendingIcon from '@mui/icons-material/Pending';
// import DescriptionIcon from '@mui/icons-material/Description';
// import EventIcon from '@mui/icons-material/Event';
// import PersonIcon from '@mui/icons-material/Person';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

// const VisitorHistory = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

//   const [visitor, setVisitor] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVisitor = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${baseUrl}/visitor/${id}`);
//         if (res.data.success) {
//           setVisitor(res.data.data);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchVisitor();
//   }, [id]);

//   const getWidth = () => {
//     if (isMobile) return '100%';
//     if (isTablet) return isSidebarOpen ? '85%' : '95%';
//     return isSidebarOpen ? '82%' : '92%';
//   };

//   const getMarginLeft = () => {
//     if (isMobile) return '0';
//     if (isTablet) return isSidebarOpen ? '15%' : '5%';
//     return isSidebarOpen ? '18%' : '8%';
//   };

//   const pageStyle = {
//     minHeight: 'calc(100vh - 40px)',
//     width: getWidth(),
//     marginLeft: getMarginLeft(),
//     marginTop: '100px',
//     marginBottom: '20px',
//     backgroundColor: '#f8f9fa',
//     padding: isMobile ? '10px' : '20px',
//     transition: 'all 0.3s ease-in-out',
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
//         <CircularProgress size={60} sx={{ color: '#23CCEF' }} />
//       </Box>
//     );
//   }

//   if (!visitor) {
//     return (
//       <Box sx={pageStyle}>
//         <Typography variant="h5" color="error" align="center" mt={10}>
//           अभ्यागत सापडला नाही
//         </Typography>
//       </Box>
//     );
//   }

//   const visits = visitor.visits || [];

//   const meetingPersonMarathi = {
//     "Superintendent of Police": "पोलीस अधीक्षक",
//     "Additional Superintendent of Police": "अपर पोलीस अधीक्षक",
//     "Sub-Divisional Officer, Ganeshpuri": "उप विभागीय अधिकारी गणेशपुरी",
//     "Sub-Divisional Officer, Shahapur": "उप विभागीय अधिकारी शहापूर",
//     "Sub-Divisional Officer, Murbad": "उप विभागीय अधिकारी मुरबाड",
//     "Sub-Divisional Officer, Home Department": "उप विभागीय अधिकारी गृह",
//     "In-Charge Officer": "प्रभारी अधिकारी",
//     "पोलीस निरीक्षक": "पोलीस निरीक्षक"
//   };

//   const InfoRow = ({ icon, label, value }) => (
//     <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2.5, gap: 2 }}>
//       <Box sx={{
//         bgcolor: '#E3F2FD',
//         borderRadius: '50%',
//         width: 42,
//         height: 42,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexShrink: 0
//       }}>
//         {icon}
//       </Box>
//       <Box sx={{ flex: 1 }}>
//         <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
//           {label}
//         </Typography>
//         <Typography variant="body1" sx={{ fontWeight: 500, color: '#1a1a1a', mt: 0.5, wordBreak: 'break-word' }}>
//           {value}
//         </Typography>
//       </Box>
//     </Box>
//   );

//   return (
//     <div style={pageStyle}>
//       <Container maxWidth={false} sx={{ p: 0 }}>
//         <Paper elevation={0} sx={{
//           p: isMobile ? '20px 15px' : '40px 35px',
//           borderRadius: '16px',
//           bgcolor: 'white',
//           boxShadow: '0 4px 25px rgba(0,0,0,0.1)',
//           border: '1px solid #e9ecef'
//         }}>
//           <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3, color: '#1976d2' }}>
//             मागे जा
//           </Button>

//           <Grid container spacing={4} alignItems="center">
//             <Grid item>
//               <Avatar
//                 src={visits.length > 0 ? visits[visits.length - 1].visitorPhoto : ''}
//                 sx={{ width: 110, height: 110, border: '5px solid #0040B9' }}
//               >
//                 {visitor.fullName[0]}
//               </Avatar>
//             </Grid>
//             <Grid item xs>
//               <Typography variant="h3" fontWeight={700} color="#0d2136">
//                 {visitor.fullName}
//               </Typography>
//               <Typography variant="h6" color="text.secondary">
//                 {visitor.mobileNumber} | {visitor.policeStation}, {visitor.district}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 {visitor.fullAddress} - {visitor.pincode}
//               </Typography>
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 5 }} />

//           <Typography variant="h4" fontWeight={600} mb={4}>
//             Visitor History ({visits.length} visits)
//           </Typography>

//           {visits.length === 0 ? (
//             <Paper sx={{ p: 8, textAlign: 'center', bgcolor: '#fafafa' }}>
//               <Typography variant="h6" color="text.secondary">
//                 या अभ्यागताची एकही भेट नोंदवलेली नाही
//               </Typography>
//             </Paper>
//           ) : (
//             <Stack spacing={3}>
//               {visits.slice().reverse().map((visit) => {
//                 const marathiMeetingPerson = visit.contactPerson
//                   ? (meetingPersonMarathi[visit.contactPerson] || visit.contactPerson)
//                   : '-';

//                 return (
//                   <Paper
//                     key={visit.applicationId}
//                     elevation={4}
//                     sx={{
//                       borderRadius: 4,
//                       border: '5px solid #0040B9',
//                       background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
//                       overflow: 'hidden'
//                     }}
//                   >
//                     <Box sx={{
//                       background: 'linear-gradient(135deg, #0040B9 0%, #0056D6 100%)',
//                       height: '120px',
//                       position: 'relative'
//                     }}>
//                       <Box sx={{
//                         position: 'absolute',
//                         bottom: -50,
//                         left: '50%',
//                         transform: 'translateX(-50%)',
//                       }}>
//                         {visit.visitorPhoto ? (
//                           <img
//                             src={visit.visitorPhoto}
//                             alt="Visitor"
//                             style={{
//                               width: 120,
//                               height: 120,
//                               objectFit: 'cover',
//                               borderRadius: '50%',
//                               border: '6px solid white',
//                               boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
//                             }}
//                           />
//                         ) : (
//                           <Avatar sx={{
//                             width: 120,
//                             height: 120,
//                             bgcolor: '#0040B9',
//                             fontSize: '3rem',
//                             border: '6px solid white',
//                             boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
//                           }}>
//                             {visitor.fullName.charAt(0)}
//                           </Avatar>
//                         )}
//                       </Box>
//                     </Box>

//                     <Box sx={{ pt: 8, px: 4, pb: 4 }}>
//                       <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3, flexWrap: 'wrap' }}>
//                         <Chip
//                           label={`भेट ${visit.visitNumber}`}
//                           sx={{ bgcolor: '#E3F2FD', color: '#0040B9', fontWeight: 600 }}
//                         />
//                         {visit.applicationId && (
//                           <Chip
//                             label={`Application Id - ${visit.applicationId}`}
              
//                             sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 600 }}
//                           />
//                         )}
//                         <Chip
//                           icon={visit.feedbackGiven ? <CheckCircleIcon /> : <PendingIcon />}
//                           label={visit.feedbackGiven ? "फीडबॅक दिला" : "फीडबॅक बाकी"}
//                           color={visit.feedbackGiven ? "success" : "warning"}
//                         />
//                       </Box>

//                       <Divider sx={{ my: 3 }} />

//                       <Grid container spacing={3}>
//                         <Grid item xs={12} md={visit.uploadDocument?.length > 0 ? 8 : 12}>
//                           <InfoRow
//                             icon={<DescriptionIcon sx={{ color: '#0040B9' }} />}
//                             label="कारण"
//                             value={visit.reasonToVisit || '-'}
//                           />

//                           <InfoRow
//                             icon={<PersonIcon sx={{ color: '#0040B9' }} />}
//                             label="अधिकारी"
//                             value={marathiMeetingPerson}
//                           />

//                           <InfoRow
//                             icon={<LocationOnIcon sx={{ color: '#0040B9' }} />}
//                             label="सहप्रवासी"
//                             value={`${visit.numberOfVisitors} व्यक्ती`}
//                           />

//                           <InfoRow
//                             icon={<EventIcon sx={{ color: '#0040B9' }} />}
//                             label="एंट्री वेळ"
//                             value={new Date(visit.entryAt).toLocaleString('mr-IN', {
//                               day: '2-digit',
//                               month: '2-digit',
//                               year: 'numeric',
//                               hour: '2-digit',
//                               minute: '2-digit',
//                               second: '2-digit',
//                               hour12: true
//                             })}
//                           />

//                           {visit.feedbackGiven && visit.feedback && (
//                             <>
//                               <Divider sx={{ my: 2 }} />
//                               <Box sx={{
//                                 bgcolor: '#e8f5e9',
//                                 borderRadius: 2,
//                                 p: 2,
//                                 border: '2px solid #4caf50'
//                               }}>
//                                 <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#2e7d32' }}>
//                                   अभिप्राय: {visit.feedback}
//                                 </Typography>
//                                 {visit.feedbackSubmittedAt && (
//                                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                     <EventIcon fontSize="small" sx={{ color: '#2e7d32' }} />
//                                     <Typography variant="caption" color="text.secondary">
//                                       फीडबॅक वेळ: {new Date(visit.feedbackSubmittedAt).toLocaleString('mr-IN', {
//                                         day: '2-digit',
//                                         month: '2-digit',
//                                         year: 'numeric',
//                                         hour: '2-digit',
//                                         minute: '2-digit',
//                                         second: '2-digit',
//                                         hour12: true
//                                       })}
//                                     </Typography>
//                                   </Box>
//                                 )}
//                               </Box>
//                             </>
//                           )}
//                         </Grid>

//                         {visit.uploadDocument?.length > 0 && (
//                           <Grid item xs={12} md={4} sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             gap: 2
//                           }}>
//                             <Button
//                               variant="contained"
//                               size="large"
//                               startIcon={<DescriptionIcon />}
//                               href={visit.uploadDocument[0].url}
//                               target="_blank"
//                               sx={{
//                                 bgcolor: '#20B2AA',
//                                 '&:hover': { bgcolor: '#1a8b85' },
//                                 py: 1.5,
//                                 px: 3,
//                                 fontWeight: 600
//                               }}
//                             >
//                               दस्तऐवज ({visit.uploadDocument.length})
//                             </Button>
//                           </Grid>
//                         )}
//                       </Grid>
//                     </Box>
//                   </Paper>
//                 );
//               })}
//             </Stack>
//           )}
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default VisitorHistory;

// ================================================

// import React, { useEffect, useState } from 'react';
// import {
//   Box, Container, Paper, Typography, Avatar, Chip, Grid, Divider,
//   CircularProgress, Button, useTheme, useMediaQuery, Stack, AlertTitle, Alert
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import PendingIcon from '@mui/icons-material/Pending';
// import DescriptionIcon from '@mui/icons-material/Description';
// import EventIcon from '@mui/icons-material/Event';
// import PersonIcon from '@mui/icons-material/Person';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import PrintIcon from '@mui/icons-material/Print';

// const VisitorHistory = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

//   const [visitor, setVisitor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [downloading, setDownloading] = useState(false);

//   useEffect(() => {
//     const fetchVisitor = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${baseUrl}/visitor/${id}`);
//         if (res.data.success) {
//           setVisitor(res.data.data);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchVisitor();
//   }, [id]);

//   const getWidth = () => {
//     if (isMobile) return '100%';
//     if (isTablet) return isSidebarOpen ? '85%' : '95%';
//     return isSidebarOpen ? '82%' : '92%';
//   };

//   const getMarginLeft = () => {
//     if (isMobile) return '0';
//     if (isTablet) return isSidebarOpen ? '15%' : '5%';
//     return isSidebarOpen ? '18%' : '8%';
//   };

//   const pageStyle = {
//     minHeight: 'calc(100vh - 40px)',
//     width: getWidth(),
//     marginLeft: getMarginLeft(),
//     marginTop: '100px',
//     marginBottom: '20px',
//     backgroundColor: '#f8f9fa',
//     padding: isMobile ? '10px' : '20px',
//     transition: 'all 0.3s ease-in-out',
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
//         <CircularProgress size={60} sx={{ color: '#23CCEF' }} />
//       </Box>
//     );
//   }

//   if (!visitor) {
//     return (
//       <Box sx={pageStyle}>
//         <Typography variant="h5" color="error" align="center" mt={10}>
//           अभ्यागत सापडला नाही
//         </Typography>
//       </Box>
//     );
//   }

//   const visits = visitor.visits || [];

//   const meetingPersonMarathi = {
//     "Superintendent of Police": "पोलीस अधीक्षक",
//     "Additional Superintendent of Police": "अपर पोलीस अधीक्षक",
//     "Sub-Divisional Officer, Ganeshpuri": "उप विभागीय अधिकारी गणेशपुरी",
//     "Sub-Divisional Officer, Shahapur": "उप विभागीय अधिकारी शहापूर",
//     "Sub-Divisional Officer, Murbad": "उप विभागीय अधिकारी मुरबाड",
//     "Sub-Divisional Officer, Home Department": "उप विभागीय अधिकारी गृह",
//     "In-Charge Officer": "प्रभारी अधिकारी",
//     "पोलीस निरीक्षक": "पोलीस निरीक्षक"
//   };

//   const InfoRow = ({ icon, label, value }) => (
//     <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2.5, gap: 2 }}>
//       <Box sx={{
//         bgcolor: '#E3F2FD',
//         borderRadius: '50%',
//         width: 42,
//         height: 42,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexShrink: 0
//       }}>
//         {icon}
//       </Box>
//       <Box sx={{ flex: 1 }}>
//         <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
//           {label}
//         </Typography>
//         <Typography variant="body1" sx={{ fontWeight: 500, color: '#1a1a1a', mt: 0.5, wordBreak: 'break-word' }}>
//           {value}
//         </Typography>
//       </Box>
//     </Box>
//   );

//   const downloadAllHistory = () => {
//     setDownloading(true);
//     try {
//       const csvContent = generateCSVContent();
//       const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//       const link = document.createElement('a');
//       const url = URL.createObjectURL(blob);
//       const fileName = `visitor_history_${visitor.fullName.replace(/\s+/g, '_')}_${new Date().getTime()}.csv`;
//       link.setAttribute('href', url);
//       link.setAttribute('download', fileName);
//       link.style.visibility = 'hidden';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error('Download error:', error);
//     } finally {
//       setDownloading(false);
//     }
//   };

//   const generateCSVContent = () => {
//     const headers = [
//       'भेट क्रमांक',
//       'अर्ज क्रमांक',
//       'कारण',
//       'अधिकारी',
//       'सहप्रवासी',
//       'एंट्री वेळ',
//       'फीडबॅक दिली',
//       'अभिप्राय',
//       'फीडबॅक वेळ'
//     ];

//     const rows = visits.map(visit => {
//       const marathiMeetingPerson = visit.contactPerson
//         ? (meetingPersonMarathi[visit.contactPerson] || visit.contactPerson)
//         : '-';

//       return [
//         visit.visitNumber || '',
//         visit.applicationId || '',
//         visit.reasonToVisit || '',
//         marathiMeetingPerson,
//         visit.numberOfVisitors || '',
//         new Date(visit.entryAt).toLocaleString('mr-IN', {
//           day: '2-digit',
//           month: '2-digit',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit',
//           second: '2-digit',
//           hour12: true
//         }),
//         visit.feedbackGiven ? 'होय' : 'नाही',
//         visit.feedback || '',
//         visit.feedbackSubmittedAt ? new Date(visit.feedbackSubmittedAt).toLocaleString('mr-IN', {
//           day: '2-digit',
//           month: '2-digit',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit',
//           second: '2-digit',
//           hour12: true
//         }) : ''
//       ];
//     });

//     const csvRows = [
//       `नाव,${visitor.fullName}`,
//       `मोबाईल,${visitor.mobileNumber}`,
//       `पोलीस स्टेशन,${visitor.policeStation}`,
//       `जिल्हा,${visitor.district}`,
//       `पिनकोड,${visitor.pincode}`,
//       '',
//       headers.map(h => `"${h}"`).join(','),
//       ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
//     ];

//     return csvRows.join('\n');
//   };

//   return (
//     <div style={pageStyle}>
//       <Container maxWidth={false} sx={{ p: 0 }}>
//         <Paper elevation={0} sx={{
//           p: isMobile ? '20px 15px' : '40px 35px',
//           borderRadius: '16px',
//           bgcolor: 'white',
//           boxShadow: '0 4px 25px rgba(0,0,0,0.1)',
//           border: '1px solid #e9ecef'
//         }}>
//           <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3, color: '#1976d2' }}>
//             मागे जा
//           </Button>

//           <Grid container spacing={4} alignItems="center">
//             <Grid item>
//               <Avatar
//                 src={visits.length > 0 ? visits[visits.length - 1].visitorPhoto : ''}
//                 sx={{ width: 110, height: 110, border: '5px solid #0040B9' }}
//               >
//                 {visitor.fullName[0]}
//               </Avatar>
//             </Grid>
//             <Grid item xs>
//               <Typography variant="h3" fontWeight={700} color="#0d2136">
//                 {visitor.fullName}
//               </Typography>
//               <Typography variant="h6" color="text.secondary">
//                 {visitor.mobileNumber} | {visitor.policeStation}, {visitor.district}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 {visitor.fullAddress} - {visitor.pincode}
//               </Typography>
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 5 }} />

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
//             <Typography variant="h4" fontWeight={600}>
//               Visitor History ({visits.length} visits)
//             </Typography>
//             {visits.length > 0 && (
//               <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
//                 <Button
//                   variant="contained"
//                   startIcon={<FileDownloadIcon />}
//                   onClick={downloadAllHistory}
//                   disabled={downloading}
//                   sx={{
//                     bgcolor: '#20B2AA',
//                     '&:hover': { bgcolor: '#1a8b85' },
//                     fontWeight: 600
//                   }}
//                 >
//                   {downloading ? 'डाउनलोड करत आहे...' : 'सर्व डाउनलोड करा'}
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   startIcon={<PrintIcon />}
//                   onClick={() => window.print()}
//                   sx={{
//                     borderColor: '#0040B9',
//                     color: '#0040B9',
//                     fontWeight: 600,
//                     '&:hover': { borderColor: '#0040B9', bgcolor: '#E3F2FD' }
//                   }}
//                 >
//                   प्रिंट करा
//                 </Button>
//               </Box>
//             )}
//           </Box>

//           {visits.length === 0 ? (
//             <Paper sx={{ p: 8, textAlign: 'center', bgcolor: '#fafafa' }}>
//               <Typography variant="h6" color="text.secondary">
//                 या अभ्यागताची एकही भेट नोंदवलेली नाही
//               </Typography>
//             </Paper>
//           ) : (
//             <Stack spacing={3}>
//               {visits.slice().reverse().map((visit) => {
//                 const marathiMeetingPerson = visit.contactPerson
//                   ? (meetingPersonMarathi[visit.contactPerson] || visit.contactPerson)
//                   : '-';

//                 return (
//                   <Paper
//                     key={visit.applicationId}
//                     elevation={4}
//                     sx={{
//                       borderRadius: 4,
//                       border: '5px solid #0040B9',
//                       background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
//                       overflow: 'hidden'
//                     }}
//                   >
//                     <Box sx={{
//                       background: 'linear-gradient(135deg, #0040B9 0%, #0056D6 100%)',
//                       height: '120px',
//                       position: 'relative'
//                     }}>
//                       <Box sx={{
//                         position: 'absolute',
//                         bottom: -50,
//                         left: '50%',
//                         transform: 'translateX(-50%)',
//                       }}>
//                         {visit.visitorPhoto ? (
//                           <img
//                             src={visit.visitorPhoto}
//                             alt="Visitor"
//                             style={{
//                               width: 120,
//                               height: 120,
//                               objectFit: 'cover',
//                               borderRadius: '50%',
//                               border: '6px solid white',
//                               boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
//                             }}
//                           />
//                         ) : (
//                           <Avatar sx={{
//                             width: 120,
//                             height: 120,
//                             bgcolor: '#0040B9',
//                             fontSize: '3rem',
//                             border: '6px solid white',
//                             boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
//                           }}>
//                             {visitor.fullName.charAt(0)}
//                           </Avatar>
//                         )}
//                       </Box>
//                     </Box>

//                     <Box sx={{ pt: 8, px: 4, pb: 4 }}>
//                       <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3, flexWrap: 'wrap' }}>
//                         <Chip
//                           label={`भेट ${visit.visitNumber}`}
//                           sx={{ bgcolor: '#E3F2FD', color: '#0040B9', fontWeight: 600 }}
//                         />
//                         {visit.applicationId && (
//                           <Chip
//                           label={`Application Id - ${visit.visitNumber}`}
//                             sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 600 }}
//                           />
//                         )}
//                         <Chip
//                           icon={visit.feedbackGiven ? <CheckCircleIcon /> : <PendingIcon />}
//                           label={visit.feedbackGiven ? "फीडबॅक दिला" : "फीडबॅक बाकी"}
//                           color={visit.feedbackGiven ? "success" : "warning"}
//                         />
//                       </Box>

//                       <Divider sx={{ my: 3 }} />

//                       <Grid container spacing={3}>
//                         <Grid item xs={12} md={visit.uploadDocument?.length > 0 ? 8 : 12}>
//                           <InfoRow
//                             icon={<DescriptionIcon sx={{ color: '#0040B9' }} />}
//                             label="कारण"
//                             value={visit.reasonToVisit || '-'}
//                           />

//                           <InfoRow
//                             icon={<PersonIcon sx={{ color: '#0040B9' }} />}
//                             label="अधिकारी"
//                             value={marathiMeetingPerson}
//                           />

//                           <InfoRow
//                             icon={<LocationOnIcon sx={{ color: '#0040B9' }} />}
//                             label="सहप्रवासी"
//                             value={`${visit.numberOfVisitors} व्यक्ती`}
//                           />

//                           <InfoRow
//                             icon={<EventIcon sx={{ color: '#0040B9' }} />}
//                             label="एंट्री वेळ"
//                             value={new Date(visit.entryAt).toLocaleString('mr-IN', {
//                               day: '2-digit',
//                               month: '2-digit',
//                               year: 'numeric',
//                               hour: '2-digit',
//                               minute: '2-digit',
//                               second: '2-digit',
//                               hour12: true
//                             })}
//                           />

//                           {visit.feedbackGiven && visit.feedback && (
//                             <>
//                               <Divider sx={{ my: 2 }} />
//                               <Box sx={{
//                                 bgcolor: '#e8f5e9',
//                                 borderRadius: 2,
//                                 p: 2,
//                                 border: '2px solid #4caf50'
//                               }}>
//                                 <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#2e7d32' }}>
//                                   अभिप्राय: {visit.feedback}
//                                 </Typography>
//                                 {visit.feedbackSubmittedAt && (
//                                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                     <EventIcon fontSize="small" sx={{ color: '#2e7d32' }} />
//                                     <Typography variant="caption" color="text.secondary">
//                                       फीडबॅक वेळ: {new Date(visit.feedbackSubmittedAt).toLocaleString('mr-IN', {
//                                         day: '2-digit',
//                                         month: '2-digit',
//                                         year: 'numeric',
//                                         hour: '2-digit',
//                                         minute: '2-digit',
//                                         second: '2-digit',
//                                         hour12: true
//                                       })}
//                                     </Typography>
//                                   </Box>
//                                 )}
//                               </Box>
//                             </>
//                           )}
//                         </Grid>

//                         {visit.uploadDocument?.length > 0 && (
//                           <Grid item xs={12} md={4} sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             gap: 2
//                           }}>
//                             <Button
//                               variant="contained"
//                               size="large"
//                               startIcon={<DescriptionIcon />}
//                               href={visit.uploadDocument[0].url}
//                               target="_blank"
//                               sx={{
//                                 bgcolor: '#20B2AA',
//                                 '&:hover': { bgcolor: '#1a8b85' },
//                                 py: 1.5,
//                                 px: 3,
//                                 fontWeight: 600
//                               }}
//                             >
//                               दस्तऐवज ({visit.uploadDocument.length})
//                             </Button>
//                           </Grid>
//                         )}
//                       </Grid>
//                     </Box>
//                   </Paper>
//                 );
//               })}
//             </Stack>
//           )}
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default VisitorHistory;

// =======================================================

import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Container, Paper, Typography, Avatar, Chip, Grid, Divider,
  CircularProgress, Button, useTheme, useMediaQuery, Stack
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import thanegramin from '../Images/thanegramin.jpeg'; // तुझ्या प्रोजेक्टमध्ये आहे ना?
import thanegramin from '../Images/thanegramin.jpeg'
import { baseUrl } from '../config/config';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import html2pdf from 'html2pdf.js';
import PrintIcon from '@mui/icons-material/Print'; // नवीन आयकॉन

import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const VisitorHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const pdfRef = useRef();

  const [visitor, setVisitor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitor = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/visitor/${id}`);


        if (res.data.success) {
          setVisitor(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchVisitor();
  }, [id]);

  const visits = visitor?.visits || [];
  

  const meetingPersonMarathi = {
    "Superintendent of Police": "पोलीस अधीक्षक",
    "Additional Superintendent of Police": "अपर पोलीस अधीक्षक",
    "Sub-Divisional Officer, Ganeshpuri": "उप विभागीय अधिकारी गणेशपुरी",
    "Sub-Divisional Officer, Shahapur": "उप विभागीय अधिकारी शहापूर",
    "Sub-Divisional Officer, Murbad": "उप विभागीय अधिकारी मुरबाड",
    "Sub-Divisional Officer, Home Department": "उप विभागीय अधिकारी गृह",
    "In-Charge Officer": "प्रभारी अधिकारी",
    "पोलीस निरीक्षक": "पोलीस निरीक्षक"
  };


   const printVisitorPass = (visit) => {
    const entryDateTime = dayjs(visit.entryAt).format('DD/MM/YYYY | hh:mm A');
    const marathiPerson = meetingPersonMarathi[visit.contactPerson] || visit.contactPerson || "N/A";

    const printWindow = window.open('', '', 'width=650,height=900');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Visitor Pass</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;700&display=swap');
          * { margin:0; padding:0; box-sizing:border-box; }
          body { font-family: 'Mukta', sans-serif; background:white; padding:20px; }
          .card { max-width:620px; margin:auto; border:8px solid #1e3a8a; border-radius:16px; overflow:hidden; background:white; box-shadow:0 10px 30px rgba(0,0,0,0.2); }
          .header { background:linear-gradient(135deg,#1e3a8a,#1e40af); color:white; text-align:center; padding:20px; border-bottom:5px solid #fbbf24; }
          .logo { width:80px; height:80px; border-radius:50%; border:4px solid white; object-fit:contain; background:white; }
          .title { font-size:32px; font-weight:700; margin:10px 0 5px; text-shadow:2px 2px 6px rgba(0,0,0,0.4); }
          .subtitle { font-size:18px; opacity:0.95; }
          .pass { background:#fbbf24; color:#1e3a8a; font-size:24px; font-weight:700; padding:10px 30px; border-radius:30px; display:inline-block; margin-top:10px; }
          .content { display:flex; padding:30px; gap:30px; align-items:flex-start; }
          .photo { width:140px; height:140px; border-radius:12px; object-fit:cover; border:6px solid #1e3a8a; box-shadow:0 10px 25px rgba(0,0,0,0.3); }
          .details { flex:1; }
          .row { display:flex; margin-bottom:14px; font-size:17px; align-items:center; }
          .label { font-weight:700; color:#1e3a8a; min-width:140px; }
          .value { font-weight:500; color:#1f2937; }
          .appid { background:#ffebee; color:#d32f2f; padding:8px 15px; border-radius:8px; font-weight:700; font-size:19px; }
          .signatures { display:flex; justify-content:space-around; padding:20px 40px; border-top:3px dashed #94a3b8; margin-top:20px; }
          .sign-box { text-align:center; }
          .sign-line { border-bottom:3px solid #1e3a8a; width:180px; margin:10px auto; }
          .sign-label { font-size:13px; color:#1e3a8a; font-weight:600; }
          @media print { body { padding:0; } @page { margin:0; } }
        </style>
      </head>
      <body onload="window.print(); setTimeout(()=>window.close(),1500)">
        <div class="card">
          <div class="header">
            <img src="${thanegramin}" class="logo" alt="Logo" />
            <div class="title">ठाणे ग्रामीण पोलीस</div>
            <div class="subtitle">Thane Rural Police</div>
            <div class="pass">अभ्यागत पावती</div>
          </div>
          <div class="content">
            <img src="${visit.visitorPhoto || ''}" class="photo" alt="Visitor" />
            <div class="details">
              <div class="row"><span class="label">अर्ज क्रमांक :</span><span class="value"><span class="appid">${visit.applicationId || 'N/A'}</span></span></div>
              <div class="row"><span class="label">नाव :</span><span class="value">${visitor.fullName}</span></div>
              <div class="row"><span class="label">मोबाईल :</span><span class="value">${visitor.mobileNumber}</span></div>
              <div class="row"><span class="label">दिनांक-वेळ :</span><span class="value">${entryDateTime}</span></div>
              <div class="row"><span class="label">पत्ता :</span><span class="value">${visitor.fullAddress}, ${visitor.pincode}</span></div>
              <div class="row"><span class="label">कोणास भेटायचे? :</span><span class="value">${marathiPerson}</span></div>
              <div class="row"><span class="label">भेटीचे कारण :</span><span class="value">${visit.reasonToVisit || '-'}</span></div>
              <div class="row"><span class="label">पोलीस स्टेशन :</span><span class="value">${visitor.policeStation}</span></div>
            </div>
          </div>
          <div class="signatures">
            <div class="sign-box"><div class="sign-line"></div><div class="sign-label">अभ्यागत स्वाक्षरी</div></div>
            <div class="sign-box"><div class="sign-line"></div><div class="sign-label">स्वागतकर्ता स्वाक्षरी व शिक्का</div></div>
            <div class="sign-box"><div class="sign-line"></div><div class="sign-label">भेट देणारे अधिकारी</div></div>
          </div>
        </div>
      </body>
      </html>
    `);
    
    printWindow.document.close();
  };


  const InfoRow = ({ icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2.5, gap: 2 }}>
      <Box sx={{
        bgcolor: '#E3F2FD',
        borderRadius: '50%',
        width: 42,
        height: 42,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500, color: '#1a1a1a', mt: 0.5, wordBreak: 'break-word' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );

  // Excel Download (VisitorsMaster सारखाच)
  const handleDownloadExcel = () => {
    const data = visits.map(visit => ({
      'भेट क्रमांक': visit.visitNumber || '-',
       'पूर्ण नाव': visitor.fullName || '-',
       'मोबाईल': visitor.mobileNumber || '-',
       'पोलीस स्टेशन': visitor.policeStation || '-',
      'पिनकोड': visitor.pincode || '-',
      'जिल्हा': visitor.district || '-',
      'अर्ज क्रमांक': visit.applicationId || '-',
      'भेटीचे कारण': visit.reasonToVisit || '-',
      'कोणास भेटायचे': meetingPersonMarathi[visit.contactPerson] || visit.contactPerson || '-',
      'भेट देणाऱ्यांची संख्या': visit.numberOfVisitors || '-',
      'एंट्री वेळ': dayjs(visit.entryAt).format('DD/MM/YYYY hh:mm A'),
      'फीडबॅक': visit.feedbackGiven ? 'होय' : 'नाही',
      'अभिप्राय': visit.feedback || '-',
      'फीडबॅक वेळ': visit.feedbackSubmittedAt ? dayjs(visit.feedbackSubmittedAt).format('DD/MM/YYYY hh:mm A') : '-'
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "भेट इतिहास");
    XLSX.writeFile(wb, `${visitor.fullName}_भेट_इतिहास_${dayjs().format('DD-MMM-YYYY')}.xlsx`);
    toast.success("Excel डाउनलोड झाला!");
  };

  // PDF Download (तुझंच डिझायन तसंच राहील)
  const handleDownloadPDF = () => {
    const content = pdfRef.current;
    html2pdf()
      .set({
        margin: [10, 15, 10, 15],
        filename: `${visitor.fullName}_Visitor_History_${dayjs().format('DD-MMM-YYYY')}.pdf`,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      })
      .from(content)
      .save()
      .then(() => toast.success("PDF तयार झाला!"));
  };

  const pageStyle = {
    minHeight: 'calc(100vh - 40px)',
    width: isMobile ? '100%' : isSidebarOpen ? '82%' : '92%',
    marginLeft: isMobile ? '0' : isSidebarOpen ? '18%' : '8%',
    marginTop: '100px',
    padding: isMobile ? '10px' : '20px',
    backgroundColor: '#f8f9fa',
    transition: 'all 0.3s ease-in-out',
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
        <CircularProgress size={70} sx={{ color: '#0040B9' }} />
      </Box>
    );
  }

  if (!visitor) {
    return (
      <Box sx={pageStyle}>
        <Typography variant="h5" color="error" align="center" mt={10}>
          अभ्यागत सापडला नाही
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Hidden PDF Content - तुझं पूर्ण डिझायन येथे आहे */}
      <div style={{ display: 'none' }}>
        <div ref={pdfRef} style={{ padding: '40px', fontFamily: 'Noto Sans Devanagari, Mangal, sans-serif' }}>
          <h1 style={{ textAlign: 'center', color: '#d32f2f' }}>ठाणे ग्रामीण पोलीस</h1>
          <h2 style={{ textAlign: 'center', color: '#0d47a1', margin: '20px 0' }}>अभ्यागत भेट इतिहास</h2>
          <h3 style={{ textAlign: 'center' }}>
            नाव: <strong>{visitor.fullName}</strong> | मोबाईल: {visitor.mobileNumber}
          </h3>
          <h4 style={{ textAlign: 'center', marginBottom: '30px' }}>
            एकूण भेटी: {visits.length} | दिनांक: {dayjs().format('DD/MM/YYYY')}
          </h4>

          {visits.slice().reverse().map(visit => {
            const marathiPerson = meetingPersonMarathi[visit.contactPerson] || visit.contactPerson || '-';
            return (
              <div key={visit.applicationId} style={{ border: '4px solid #0040B9', borderRadius: '16px', margin: '25px 0', padding: '20px', background: '#f8fbff' }}>
                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                  <strong>भेट {visit.visitNumber}</strong> | फीडबॅक: {visit.feedbackGiven ? 'दिला' : 'बाकी'}
                </div>
                <table style={{ width: '100%', fontSize: '13px' }}>
       
     
        <tr><td><strong>पूर्ण नाव:</strong> {visitor.fullName || '-'}</td></tr>
          <tr><td><strong>मोबाईल:</strong> {visitor.mobileNumber || '-'}</td></tr>
            <tr><td><strong>पोलीस स्टेशन:</strong> {visitor.policeStation || '-'}</td></tr>
              <tr><td><strong>पिनकोड:</strong> {visitor.pincode  || '-'}</td></tr>
                <tr><td><strong>जिल्हा:</strong> {visitor.district || '-'}</td></tr>
                  <tr><td><strong>भेटीचे कारण:</strong> {visit.reasonToVisit || '-'}</td></tr>
                  <tr><td><strong>कोणास भेटायचे:</strong> {marathiPerson}</td></tr>
                  <tr><td><strong>भेट देणाऱ्यांची संख्या:</strong> {visit.numberOfVisitors} व्यक्ती</td></tr>
                  <tr><td><strong>एंट्री वेळ:</strong> {dayjs(visit.entryAt).format('DD/MM/YYYY hh:mm A')}</td></tr>
                  {visit.feedbackGiven && <tr><td><strong>अभिप्राय:</strong> {visit.feedback}</td></tr>}
                  <tr><td><strong>फीडबॅक वेळ:</strong> {dayjs(visit.feedbackSubmittedAt).format('DD/MM/YYYY hh:mm A')}</td></tr>
                </table>
              </div>
            );
          })}
          <div style={{ marginTop: '60px', textAlign: 'right' }}>
            <p>स्वाक्षरी: ____________________</p>
            <p>दिनांक: {dayjs().format('DD/MM/YYYY')}</p>
          </div>
        </div>
      </div>

      {/* तुझं सध्याचं पूर्ण UI - काहीही बदललं नाही! */}
      <div style={pageStyle}>
        <Container maxWidth={false} sx={{ p: 0 }}>
          <Paper elevation={0} sx={{
            p: isMobile ? '20px 15px' : '40px 35px',
            borderRadius: '16px',
            bgcolor: 'white',
            boxShadow: '0 4px 25px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef'
          }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3, color: '#1976d2' }}>
              मागे जा
            </Button>

            <Grid container spacing={4} alignItems="center">
              <Grid item>
                <Avatar
                  src={visits.length > 0 ? visits[visits.length - 1].visitorPhoto : ''}
                  sx={{ width: 110, height: 110, border: '5px solid #0040B9' }}
                >
                  {visitor.fullName[0]}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h3" fontWeight={700} color="#0d2136">
                  {visitor.fullName}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {visitor.mobileNumber} | {visitor.policeStation}, {visitor.district}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {visitor.fullAddress} - {visitor.pincode}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 5 }} />

            {/* VisitorsMaster सारखी बटणं */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
              <Typography variant="h4" fontWeight={600}>
                Visitor History({visits.length} visits)
              </Typography>

              {visits.length > 0 && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownloadExcel}
                    sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' }, fontWeight: 600 }}
                  >
                    Excel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={handleDownloadPDF}
                    sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' }, fontWeight: 600 }}
                  >
                    PDF
                  </Button>
                </Box>
              )}
            </Box>

            {/* तुझं पूर्ण Card UI - १००% तसंच */}
            {visits.length === 0 ? (
              <Paper sx={{ p: 8, textAlign: 'center', bgcolor: '#fafafa' }}>
                <Typography variant="h6" color="text.secondary">
                  या अभ्यागताची एकही भेट नोंदवलेली नाही
                </Typography>
              </Paper>
            ) : (
              <Stack spacing={3}>
                {visits.slice().reverse().map((visit) => {
                  const marathiMeetingPerson = meetingPersonMarathi[visit.contactPerson] || visit.contactPerson || '-';

                  return (
                    <Paper key={visit.applicationId} elevation={4} sx={{
                      borderRadius: 4,
                      border: '5px solid #0040B9',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
                      overflow: 'hidden'
                    }}>
                      {/* तुझं पूर्ण कार्ड डिझायन येथे तसंच आहे */}
                      <Box sx={{ background: 'linear-gradient(135deg, #0040B9 0%, #0056D6 100%)', height: '120px', position: 'relative' }}>
                        <Box sx={{ position: 'absolute', bottom: -50, left: '50%', transform: 'translateX(-50%)' }}>
                          {visit.visitorPhoto ? (
                            <img src={visit.visitorPhoto} alt="Visitor" style={{
                              width: 120, height: 120, objectFit: 'cover', borderRadius: '50%',
                              border: '6px solid white', boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                            }} />
                          ) : (
                            <Avatar sx={{ width: 120, height: 120, bgcolor: '#0040B9', fontSize: '3rem', border: '6px solid white' }}>
                              {visitor.fullName.charAt(0)}
                            </Avatar>
                          )}
                        </Box>
                      </Box>

                      <Box sx={{ pt: 8, px: 4, pb: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                          <Chip label={`भेट ${visit.visitNumber}`} sx={{ bgcolor: '#E3F2FD', color: '#0040B9', fontWeight: 600 }} />
                          {visit.applicationId && <Chip label={`Application Id - ${visit.applicationId}`} sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 600 }} />}
                          <Chip icon={visit.feedbackGiven ? <CheckCircleIcon /> : <PendingIcon />}
                            label={visit.feedbackGiven ? "फीडबॅक दिला" : "फीडबॅक बाकी"}
                            color={visit.feedbackGiven ? "success" : "warning"} />
                        </Box>
  <Button
                variant="contained"
                size="small"
                startIcon={<PrintIcon />}
                onClick={() => printVisitorPass(visit)}
                sx={{ bgcolor: '#8B4513', '&:hover': { bgcolor: '#6B3A0D' }, fontWeight: 600, fontSize: '0.85rem' }}
              >
                पावती प्रिंट
              </Button>
                        <Divider sx={{ my: 3 }} />

                        <Grid container spacing={3}>
                          <Grid item xs={12} md={visit.uploadDocument?.length > 0 ? 8 : 12}>
                            <InfoRow icon={<DescriptionIcon sx={{ color: '#0040B9' }} />} label="भेटीचे कारण" value={visit.reasonToVisit || '-'} />
                            <InfoRow icon={<PersonIcon sx={{ color: '#0040B9' }} />} label="कोणास भेटायचे" value={marathiMeetingPerson} />
                            <InfoRow icon={<LocationOnIcon sx={{ color: '#0040B9' }} />} label="भेट देणाऱ्यांची संख्या" value={`${visit.numberOfVisitors} व्यक्ती`} />
                            <InfoRow icon={<EventIcon sx={{ color: '#0040B9' }} />} label="एंट्री वेळ"
                              value={new Date(visit.entryAt).toLocaleString('mr-IN', {
                                day: '2-digit', month: '2-digit', year: 'numeric',
                                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
                              })} />

                            {visit.feedbackGiven && visit.feedback && (
                              <>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ bgcolor: '#e8f5e9', borderRadius: 2, p: 2, border: '2px solid #4caf50' }}>
                                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#2e7d32' }}>
                                    अभिप्राय: {visit.feedback}
                                  </Typography>
                                  {visit.feedbackSubmittedAt && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <EventIcon fontSize="small" sx={{ color: '#2e7d32' }} />
                                      <Typography variant="caption" color="text.secondary">
                                        फीडबॅक वेळ: {new Date(visit.feedbackSubmittedAt).toLocaleString('mr-IN', {
                                          day: '2-digit', month: '2-digit', year: 'numeric',
                                          hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
                                        })}
                                      </Typography>
                                    </Box>
                                  )}
                                </Box>
                              </>
                            )}
                          </Grid>

                          {visit.uploadDocument?.length > 0 && (
                            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                              <Button variant="contained" size="large" startIcon={<DescriptionIcon />}
                                href={visit.uploadDocument[0].url} target="_blank"
                                sx={{ bgcolor: '#20B2AA', '&:hover': { bgcolor: '#1a8b85' }, py: 1.5, px: 3, fontWeight: 600 }}>
                                दस्तऐवज ({visit.uploadDocument.length})
                              </Button>
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    </Paper>
                  );
                })}
              </Stack>
            )}
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default VisitorHistory;

// ===========================================

