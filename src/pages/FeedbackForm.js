// import React, { useEffect, useState } from 'react';
// import {
//   Box, Paper, Typography, TextField, Button, MenuItem, FormControl,
//   InputLabel, Select, Container, CircularProgress, Alert
// } from '@mui/material';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
// import axios from 'axios';

// const FeedbackForm = () => {
//   const [mobile, setMobile] = useState('');
//   const [visitor, setVisitor] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const [formData, setFormData] = useState({
//     visitReason: '',
//     satisfaction: '',
//     nextAppointment: null,
//     remark: ''
//   });

//   // Mobile Number टाकला की API ला हिट कर
//   useEffect(() => {
//     const fetchVisitorByMobile = async () => {
//       if (mobile.length === 10) {
//         setLoading(true);
//         setError('');
//         try {
//           // तुझा actual API endpoint इथे टाक
//           const res = await axios.get(`http://localhost:5000/api/entry/mobile/${mobile}`);
//           // किंवा तुझा live API: `https://yourdomain.com/api/entry/mobile/${mobile}`

//           if (res.data.success && res.data.visitor) {
//             const v = res.data.visitor;
//             setVisitor(v);
//             setFormData(prev => ({
//               ...prev,
//               visitReason: v.visitReason || ''
//             }));
//           } else {
//             setError('या मोबाईल नंबरवरून आजची एंट्री सापडली नाही');
//             setVisitor(null);
//           }
//         } catch (err) {
//           setError('Visitor शोधताना काहीतरी चुकलं');
//           setVisitor(null);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     const timeoutId = setTimeout(() => {
//       if (mobile.length === 10) fetchVisitorByMobile();
//     }, 800);

//     return () => clearTimeout(timeoutId);
//   }, [mobile]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!visitor) return alert('कृपया वैध मोबाईल नंबर टाका');

//     const payload = {
//       visitorId: visitor._id,
//       mobile: mobile,
//       name: visitor.name,
//       visitReason: formData.visitReason,
//       satisfaction: formData.satisfaction,
//       nextAppointment: formData.nextAppointment?.format('YYYY-MM-DD'),
//       remark: formData.remark,
//       submittedAt: new Date()
//     };

//     try {
//       await axios.post('http://localhost:5000/api/feedback', payload);
//       // किंवा तुझा live API

//       alert('अभिप्राय यशस्वीरीत्या सादर झाला! धन्यवाद साहेब!');

//       // Reset form
//       setMobile('');
//       setVisitor(null);
//       setFormData({
//         visitReason: '',
//         satisfaction: '',
//         nextAppointment: null,
//         remark: ''
//       });
//     } catch (err) {
//       alert('अभिप्राय सादर करताना त्रुटी');
//     }
//   };

//   return (
//     // <Container maxWidth="md" sx={{ py: 4 }}>
//     <Container maxWidth="md" sx={{ mt: { xs: 1, sm: 2 }, px: { xs: 2, sm: 3 } }}>
//       <Paper elevation={20} sx={{
//         borderRadius: 4,
//         overflow: 'hidden',
//         border: '4px solid #0040B9',
//         boxShadow: '0 20px 60px rgba(0,64,185,0.25)',
//       }}>
//         {/* Header */}
//         <Box sx={{ bgcolor: '#0040B9', color: 'white', p: 4, textAlign: 'center' }}>
//           <Typography variant="h4" fontWeight="bold" sx={{ letterSpacing: 1 }}>
//             अभिप्राय फॉर्म - Feedback Form
//           </Typography>
//           <Typography variant="h6" sx={{ opacity: 0.9, mt: 1 }}>
//             ठाणे ग्रामीण पोलीस - नागरिक सेवा मूल्यांकन
//           </Typography>
//         </Box>

//         {/* <Box sx={{ p: { xs: 3, sm: 5 } }}> */}
//         <Box sx={{ p: { xs: 2, sm: 3 } }}>   // फक्त 16-24px padding – एकदम clean
//           {/* Mobile Number Input */}
//           <TextField
//             fullWidth
//             label="मोबाईल नंबर टाका (10 अंक)"
//             value={mobile}
//             onChange={(e) => {
//               const val = e.target.value.replace(/\D/g, '').slice(0, 10);
//               setMobile(val);
//             }}
//             placeholder="9876543210"
//             inputProps={{ maxLength: 10 }}
//             sx={{ mb: 3 }}
//             required
//           />

//           {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />}

//           {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}

//           {visitor && (
//             <Alert severity="success" sx={{ mb: 3 }}>
//               सापडले: <strong>{visitor.name}</strong> | वॉर्ड: {visitor.ward || 'N/A'} | कारण: {visitor.visitReason}
//             </Alert>
//           )}

//           <form onSubmit={handleSubmit}>
//             {/* Visit Reason */}
//             <FormControl fullWidth sx={{ mb: 4 }} disabled={!visitor}>
//               <InputLabel>भेटीचे कारण</InputLabel>
//               <Select
//                 value={formData.visitReason}
//                 onChange={(e) => setFormData({ ...formData, visitReason: e.target.value })}
//                 required
//               >
//                 <MenuItem value="Officer Not Available">अधिकारी उपलब्ध नाहीत</MenuItem>
//                 <MenuItem value="Officer Busy In Meeting">अधिकारी मीटिंगमध्ये व्यस्त</MenuItem>
//                 <MenuItem value="Next Appointment">पुढील भेटीची वेळ</MenuItem>
//                 <MenuItem value="Satisfied">समाधानी</MenuItem>
//                 <MenuItem value="Not Satisfied">असमाधानी</MenuItem>
//               </Select>
//             </FormControl>

//             {/* Satisfaction */}
//             <FormControl fullWidth sx={{ mb: 4 }} disabled={!visitor}>
//               <InputLabel>सेवा समाधान</InputLabel>
//               <Select
//                 value={formData.satisfaction}
//                 onChange={(e) => setFormData({ ...formData, satisfaction: e.target.value })}
//                 required
//               >
//                 <MenuItem value="Satisfied">समाधानी (Satisfied)</MenuItem>
//                 <MenuItem value="Not Satisfied">असमाधानी (Not Satisfied)</MenuItem>
//               </Select>
//             </FormControl>

//             {/* Next Appointment Date */}
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="पुढील भेटीची तारीख (ऐच्छिक)"
//                 value={formData.nextAppointment}
//                 onChange={(newValue) => setFormData({ ...formData, nextAppointment: newValue })}
//                 minDate={dayjs().add(1, 'day')}
//                 disabled={!visitor}
//                 slots={{
//                   textField: (params) => (
//                     <TextField {...params} fullWidth sx={{ mb: 4 }} />
//                   )
//                 }}
//               />
//             </LocalizationProvider>

//             {/* Remark */}
//             <TextField
//               label="काही खास टिप्पणी (ऐच्छिक)"
//               multiline
//               rows={3}
//               fullWidth
//               value={formData.remark}
//               onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
//               disabled={!visitor}
//               sx={{ mb: 4 }}
//             />

//             {/* Submit Button */}
//             <Box sx={{ textAlign: 'center' }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 disabled={!visitor}
//                 sx={{
//                   bgcolor: '#20B2AA',
//                   color: 'white',
//                   px: 8,
//                   py: 2,
//                   fontSize: '1.2rem',
//                   fontWeight: 'bold',
//                   borderRadius: '16px',
//                   boxShadow: '0 10px 30px rgba(32,178,170,0.5)',
//                   textTransform: 'none',
//                   '&:hover': {
//                     bgcolor: '#1a8f89',
//                     transform: 'translateY(-4px)',
//                     boxShadow: '0 15px 40px rgba(32,178,170,0.6)'
//                   },
//                   transition: 'all 0.3s ease',
//                 }}
//               >
//                 अभिप्राय सादर करा
//               </Button>
//             </Box>
//           </form>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default FeedbackForm;

// ===========================================================

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Box, Paper, Typography, TextField, Button, Grid, Card, CardContent,
//   FormControl, InputLabel, Select, MenuItem, Alert, ToggleButton, ToggleButtonGroup,
//   Avatar, Container
// } from '@mui/material';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
// import axios from 'axios';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import logobrand from '../Images/thanegraminpolicebrand.jpeg';

// const texts = {
//   mr: {
//     title: "अभिप्राय फॉर्म",
//     // subtitle: "नागरिक सेवा मूल्यांकन",
//     mobileLabel: "मोबाईल नंबर टाका (10 अंक)",
//     found: "सापडले!",
//     notFound: "या मोबाईल नंबरवरून आजची एंट्री सापडली नाही",
//     visitReason: "भेटीचे कारण",
//     satisfaction: "सेवा समाधान",
//     nextDate: "पुढील भेटीची तारीख (ऐच्छिक)",
//     remark: "काही खास टिप्पणी (ऐच्छिक)",
//     submit: "अभिप्राय सादर करा",
//     thankYou: "धन्यवाद! तुमचा अभिप्राय यशस्वी झाला",
//     searching: "शोधत आहोत..."
//   },
//   en: {
//     title: "Feedback Form",
//     // subtitle: "Citizen Service Evaluation",
//     mobileLabel: "Enter Mobile Number (10 digits)",
//     found: "Found!",
//     notFound: "No entry found for this mobile number today",
//     visitReason: "Purpose of Visit",
//     satisfaction: "Service Satisfaction",
//     nextDate: "Next Appointment Date (Optional)",
//     remark: "Any Special Remark (Optional)",
//     submit: "Submit Feedback",
//     thankYou: "Thank you! Your feedback has been submitted",
//     searching: "Searching..."
//   }
// };

// const FeedbackForm = () => {
//   const [lang, setLang] = useState('mr');
//   const [mobile, setMobile] = useState('');
//   const [visitor, setVisitor] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const [formData, setFormData] = useState({
//     visitReason: '',
//     satisfaction: '',
//     nextAppointment: null,
//     remark: ''
//   });

//   const t = texts[lang];

//   useEffect(() => {
//     const fetchVisitor = async () => {
//       if (mobile.length === 10) {
//         setLoading(true);
//         setError('');
//         try {
//           const res = await axios.get(`http://localhost:5000/api/entry/mobile/${mobile}`);
//           if (res.data.success && res.data.visitor) {
//             setVisitor(res.data.visitor);
//             setFormData(prev => ({ ...prev, visitReason: res.data.visitor.visitReason || '' }));
//           } else {
//             setError(t.notFound);
//             setVisitor(null);
//           }
//         } catch (err) {
//           setError(lang === 'mr' ? 'काहीतरी चुकलं' : 'Something went wrong');
//           setVisitor(null);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     const timer = setTimeout(() => {
//       if (mobile.length === 10) fetchVisitor();
//     }, 800);

//     return () => clearTimeout(timer);
//   }, [mobile, lang]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!visitor) return;

//     const payload = {
//       visitorId: visitor._id,
//       mobile,
//       name: visitor.name,
//       visitReason: formData.visitReason,
//       satisfaction: formData.satisfaction,
//       nextAppointment: formData.nextAppointment?.format('YYYY-MM-DD'),
//       remark: formData.remark,
//       submittedAt: new Date()
//     };

//     try {
//       await axios.post('http://localhost:5000/api/feedback', payload);
//       setSuccess(true);
//       setTimeout(() => {
//         setMobile('');
//         setVisitor(null);
//         setFormData({ visitReason: '', satisfaction: '', nextAppointment: null, remark: '' });
//         setSuccess(false);
//       }, 3000);
//     } catch (err) {
//       alert(lang === 'mr' ? 'त्रुटी झाली' : 'Error occurred');
//     }
//   };

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: '#f0f4f8', mt: 15 }}>
//       {/* Header with Language Toggle */}
//       <Box sx={{ bgcolor: '#0040B9', color: 'white', py: 3, textAlign: 'center', position: 'relative' }}>
//         {/* <img src={logobrand} alt="ठाणे ग्रामीण पोलीस" style={{ height: 80 }} /> */}
//         <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>{t.title}</Typography>
//         <Typography variant="h6" sx={{ opacity: 0.9 }}>{t.subtitle}</Typography>

//         <ToggleButtonGroup
//           value={lang}
//           exclusive
//           onChange={(_, v) => v && setLang(v)}
//           sx={{ position: 'absolute', top: 20, right: 20, bgcolor: 'white', borderRadius: 3 }}
//         >
//           <ToggleButton value="mr" sx={{ fontWeight: 'bold', color: lang === 'mr' ? '#0040B9' : '#666' }}>मराठी</ToggleButton>
//           <ToggleButton value="en" sx={{ fontWeight: 'bold', color: lang === 'en' ? '#0040B9' : '#666' }}>English</ToggleButton>
//         </ToggleButtonGroup>
//       </Box>

//       <Container maxWidth="lg" sx={{ mt: 5, pb: 8 }}>
//         <Grid container spacing={5} justifyContent="center">
//           {/* Left Side - Form */}
//           <Grid item xs={12} md={6}>
//             <Paper elevation={16} sx={{ borderRadius: 4, p: 4, border: '4px solid #0040B9' }}>
//               <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>
//                 {lang === 'mr' ? 'अभिप्राय भरा' : 'Submit Feedback'}
//               </Typography>

//               <TextField
//                 fullWidth
//                 label={t.mobileLabel}
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
//                 placeholder="9876543210"
//                 inputProps={{ maxLength: 10 }}
//                 sx={{ mb: 3 }}
//               />



//               {loading && (
//                 <Alert icon={false} severity="info" sx={{ mb: 3, justifyContent: 'center' }}>
//                   {t.searching}
//                 </Alert>
//               )}

//               {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

//               {visitor && (
//                 <Alert severity="success" sx={{ mb: 3 }}>
//                   <strong>{t.found}</strong> {visitor.name} | {visitor.policeStation}
//                 </Alert>
//               )}

//               {success && (
//                 <Alert severity="success" sx={{ mb: 3 }}>
//                   <CheckCircleOutlineIcon sx={{ mr: 1 }} /> {t.thankYou}
//                 </Alert>
//               )}

//               <form onSubmit={handleSubmit}>
//                 <FormControl fullWidth sx={{ mb: 3 }} disabled={!visitor}>
//                   <InputLabel>{t.visitReason}</InputLabel>
//                   <Select value={formData.visitReason} onChange={(e) => setFormData({ ...formData, visitReason: e.target.value })}>
//                     <MenuItem value="Satisfied">{lang === 'mr' ? 'Satisfied' : 'Satisfied'}</MenuItem>
//                     <MenuItem value="notsatisfied">{lang === 'mr' ? 'Not Satisfied' : 'Not Satisfied'}</MenuItem>
//                     <MenuItem value="workcompleted">{lang === 'mr' ? 'Officer Not Available' : 'Officer Not Available'}</MenuItem>
//                     <MenuItem value="nextappointment">{lang === 'mr' ? 'Officer Busy In Meeting' : 'Officer Busy In Meeting'}</MenuItem>
//                   </Select>
//                 </FormControl>

//                 <FormControl fullWidth sx={{ mb: 3 }} disabled={!visitor}>
//                   <InputLabel>{t.satisfaction}</InputLabel>
//                   <Select value={formData.satisfaction} onChange={(e) => setFormData({ ...formData, satisfaction: e.target.value })} required>
//                     <MenuItem value="Very Satisfied">खूप समाधानी</MenuItem>
//                     <MenuItem value="Satisfied">समाधानी</MenuItem>
//                     <MenuItem value="Neutral">सामान्य</MenuItem>
//                     <MenuItem value="Not Satisfied">असमाधानी</MenuItem>
//                   </Select>
//                 </FormControl>

//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DatePicker
//                     label={t.nextDate}
//                     value={formData.nextAppointment}
//                     onChange={(v) => setFormData({ ...formData, nextAppointment: v })}
//                     minDate={dayjs().add(1, 'day')}
//                     disabled={!visitor}
//                     slotProps={{ textField: { fullWidth: true, sx: { mb: 3 } } }}
//                   />
//                 </LocalizationProvider>

//                 <TextField
//                   fullWidth
//                   label={t.remark}
//                   multiline
//                   rows={3}
//                   value={formData.remark}
//                   onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
//                   disabled={!visitor}
//                   sx={{ mb: 4 }}
//                 />

//                 <Button
//                   fullWidth
//                   type="submit"
//                   variant="contained"
//                   size="large"
//                   disabled={!visitor || success}
//                   sx={{
//                     py: 2.2,
//                     fontSize: '1.3rem',
//                     fontWeight: 'bold',
//                     bgcolor: '#0040B9',
//                     borderRadius: 4,
//                     '&:hover': { bgcolor: '#002D80' }
//                   }}
//                 >
//                   {t.submit}
//                 </Button>
//               </form>
//             </Paper>
//           </Grid>

//           {/* Right Side - Visitor Info Card */}
//           <Grid item xs={12} md={6}>
//             <Card elevation={16} sx={{ borderRadius: 4, textAlign: 'center', bgcolor: '#f8fbff', border: '4px solid #0040B9', height: '100%' }}>
//               <CardContent sx={{ pt: 6 }}>
//                 <Avatar sx={{ width: 140, height: 140, mx: 'auto', bgcolor: '#0040B9', fontSize: '3rem' }}>
//                   {visitor ? visitor.name.charAt(0) : '?'}
//                 </Avatar>
//                 <Typography variant="h5" fontWeight="bold" color="#0040B9" sx={{ mt: 3 }}>
//                   {visitor ? visitor.name : (lang === 'mr' ? 'अभ्यागत माहिती' : 'Visitor Info')}
//                 </Typography>
//                 {visitor && (
//                   <>
//                     <Typography sx={{ mt: 2 }}><strong>{lang === 'mr' ? 'मोबाईल' : 'Mobile'}:</strong> {visitor.mobile}</Typography>
//                     <Typography><strong>{lang === 'mr' ? 'पोलीस स्टेशन' : 'Station'}:</strong> {visitor.policeStation}</Typography>
//                     <Typography><strong>{lang === 'mr' ? 'कारण' : 'Reason'}:</strong> {visitor.visitReason}</Typography>
//                     <Typography><strong>{lang === 'mr' ? 'वेळ' : 'Time'}:</strong> {new Date(visitor.createdAt).toLocaleString('en-IN')}</Typography>
//                   </>
//                 )}
//                 {!visitor && !loading && !error && (
//                   <Typography color="text.secondary" sx={{ mt: 4, fontSize: '1.1rem' }}>
//                     {lang === 'mr' ? 'वर मोबाईल नंबर टाका → माहिती आपोआप येईल' : 'Enter mobile number above → Details will appear'}
//                   </Typography>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default FeedbackForm;

// =====================================
// import React, { useState } from 'react';
// import {
//   Box, Paper, Typography, TextField, Button, Grid, Card, CardContent,
//   FormControl, InputLabel, Select, MenuItem, Alert, ToggleButton, ToggleButtonGroup,
//   Avatar, Container
// } from '@mui/material';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// const texts = {
//   mr: {
//     title: "अभिप्राय फॉर्म",
//     mobileLabel: "मोबाईल नंबर टाका (10 अंक)",
//     found: "सापडले!",
//     notFound: "या मोबाईल नंबरवरून आजची एंट्री सापडली नाही",
//     visitReason: "भेटीचे कारण",
//     satisfaction: "सेवा समाधान",
//     nextDate: "पुढील भेटीची तारीख",
//     remark: "काही खास टिप्पणी (ऐच्छिक)",
//     submit: "अभिप्राय सादर करा",
//     thankYou: "धन्यवाद! तुमचा अभिप्राय यशस्वी झाला",
//   },
//   en: {
//     title: "Feedback Form",
//     mobileLabel: "Enter Mobile Number (10 digits)",
//     found: "Found!",
//     notFound: "No entry found for this mobile number today",
//     visitReason: "Purpose of Visit",
//     visitorfeedback:"Visitor Feedback",
//     satisfaction: "Service Satisfaction",
//     nextDate: "Next Appointment Date",
//     remark: "Any Special Remark (Optional)",
//     submit: "Submit Feedback",
//     thankYou: "Thank you! Your feedback has been submitted",
//   }
// };

// const FeedbackForm = () => {
//   const [lang, setLang] = useState('mr');
//   const [mobile, setMobile] = useState('');
//   const [success, setSuccess] = useState(false);

//   const [formData, setFormData] = useState({
//     visitReason: '',
//     visitorfeedback:'',
//     satisfaction: '',
//     nextAppointment: null,
//     remark: ''
//   });

//   const t = texts[lang];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitted Data:", { mobile, ...formData }); // टेस्टिंगसाठी कन्सोलमध्ये दिसेल

//     setSuccess(true);
//     setTimeout(() => {
//       setSuccess(false);
//       setMobile('');
//       setFormData({ visitReason: '', satisfaction: '', nextAppointment: null, remark: '' });
//     }, 3000);
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box sx={{ minHeight: '100vh', bgcolor: '#f0f4f8', mt: 15 }}>
//         {/* Header */}
//         <Box sx={{ bgcolor: '#0040B9', color: 'white', py: 2.5, textAlign: 'center', position: 'relative' }}>
//           <Typography variant="h4" fontWeight="bold">{t.title}</Typography>

//           <ToggleButtonGroup
//             value={lang}
//             exclusive
//             onChange={(_, v) => v && setLang(v)}
//             sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'white', borderRadius: 3 }}
//           >
//             <ToggleButton value="mr">मराठी</ToggleButton>
//             <ToggleButton value="en">English</ToggleButton>
//           </ToggleButtonGroup>
//         </Box>

//         <Container maxWidth="lg" sx={{ mt: 6 }}>
//           <Grid container spacing={6} justifyContent="center">

//             {/* Left Side - Form */}
//             <Grid item xs={12} md={6}>
//               <Paper elevation={20} sx={{ p: 5, borderRadius: 4, border: '5px solid #0040B9' }}>
//                 <Typography variant="h5" color="#0040B9" fontWeight="bold" mb={4}>
//                   {lang === 'mr' ? 'अभिप्राय भरा' : 'Submit Feedback'}
//                 </Typography>

//                 <form onSubmit={handleSubmit}>

//                   {/* Mobile Number */}
//                   <TextField
//                     fullWidth
//                     label={t.mobileLabel}
//                     value={mobile}
//                     onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
//                     placeholder="9876543210"
//                     inputProps={{ maxLength: 10 }}
//                     sx={{ mb: 3 }}
//                   />

//                   {/* Visit Reason Dropdown */}
//                   <FormControl fullWidth sx={{ mb: 3 }}>
//                     <InputLabel>{t.visitorfeedback}</InputLabel>
//                     <Select
//                       value={formData.visitorfeedback}
//                       label={t.visitorfeedback}
//                       onChange={(e) => setFormData({ ...formData, visitorfeedback: e.target.value, nextAppointment: null })}
//                     >
//                       {/* <MenuItem value="Satisfied">समाधानी / Satisfied</MenuItem>
//                       <MenuItem value="Not Satisfied">असमाधानी / Not Satisfied</MenuItem>
//                       <MenuItem value="Next Appointment">पुढील भेट / Next Appointment</MenuItem>
//                       <MenuItem value="Officer Not Available">अधिकारी उपलब्ध नाहीत / Officer Not Available</MenuItem>
//                       <MenuItem value="Officer Busy In Meeting">अधिकारी मीटिंगमध्ये व्यस्त / Officer Busy In Meeting</MenuItem> */}

//                       <MenuItem value="Satisfied">Satisfied</MenuItem>
//                       <MenuItem value="Not Satisfied">Not Satisfied</MenuItem>
//                       <MenuItem value="Next Appointment">Next Appointment</MenuItem>
//                       <MenuItem value="Officer Not Available">Officer Not Available</MenuItem>
//                       <MenuItem value="Officer Busy In Meeting">Officer Busy In Meeting</MenuItem>
//                     </Select>
//                   </FormControl>

//                   {/* Satisfaction Level */}
//                   {/* <FormControl fullWidth sx={{ mb: 3 }}>
//                     <InputLabel>{t.satisfaction}</InputLabel>
//                     <Select
//                       value={formData.satisfaction}
//                       label={t.satisfaction}
//                       onChange={(e) => setFormData({ ...formData, satisfaction: e.target.value })}
//                     >
//                       <MenuItem value="Very Satisfied">खूप समाधानी / Very Satisfied</MenuItem>
//                       <MenuItem value="Satisfied">समाधानी / Satisfied</MenuItem>
//                       <MenuItem value="Neutral">सामान्य / Neutral</MenuItem>
//                       <MenuItem value="Not Satisfied">असमाधानी / Not Satisfied</MenuItem>
//                     </Select>
//                   </FormControl> */}

//                   {/* Date Picker - Only when Next Appointment selected */}
//                   {formData.visitReason === "Next Appointment" && (
//                     <DatePicker
//                       label={t.nextDate}
//                       value={formData.nextAppointment}
//                       onChange={(date) => setFormData({ ...formData, nextAppointment: date })}
//                       minDate={dayjs().add(1, 'day')}
//                       slotProps={{ textField: { fullWidth: true, sx: { mb: 3 } } }}
//                     />
//                   )}

//                   {/* Remark */}
//                   {/* <TextField
//                     fullWidth
//                     label={t.remark}
//                     multiline
//                     rows={4}
//                     value={formData.remark}
//                     onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
//                     sx={{ mb: 4 }}
//                   /> */}

//                   {/* Submit Button */}
//                   <Button
//                     fullWidth
//                     type="submit"
//                     variant="contained"
//                     size="large"
//                     sx={{
//                       bgcolor: '#0040B9',
//                       py: 2.5,
//                       fontSize: '1.4rem',
//                       fontWeight: 'bold',
//                       '&:hover': { bgcolor: '#002D80' }
//                     }}
//                   >
//                     {t.submit}
//                   </Button>

//                   {success && (
//                     <Alert severity="success" sx={{ mt: 3 }}>
//                       <CheckCircleOutlineIcon sx={{ mr: 1 }} />
//                       {t.thankYou}
//                     </Alert>
//                   )}
//                 </form>
//               </Paper>
//             </Grid>

//             {/* Right Side - Just for Design */}
//             <Grid item xs={12} md={6}>
//               <Card elevation={20} sx={{ height: '100%', borderRadius: 4, border: '5px solid #0040B9', bgcolor: '#f8fbff' }}>
//                 <CardContent sx={{ textAlign: 'center', pt: 10 }}>
//                   <Avatar sx={{ width: 130, height: 130, mx: 'auto', bgcolor: '#0040B9', fontSize: '4rem' }}>
//                     T
//                   </Avatar>
//                   <Typography variant="h5" fontWeight="bold" color="#0040B9" sx={{ mt: 3 }}>
//                     ठाणे ग्रामीण पोलीस
//                   </Typography>
//                   <Typography variant="h6" sx={{ mt: 2, color: '#0040B9' }}>
//                     नागरिक अभिप्राय प्रणाली
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default FeedbackForm;

// ==============================================


// import React, { useState, useEffect } from 'react';
// import {
//   Box, Paper, Typography, TextField, Button, Grid, Card, CardContent,
//   FormControl, InputLabel, Select, MenuItem, Alert, ToggleButton, ToggleButtonGroup,
//   Avatar, Container, CircularProgress
// } from '@mui/material';
// import axios from 'axios';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import { baseUrl } from '../config/config';

// const texts = {
//   mr: {
//     title: "अभिप्राय फॉर्म",
//     mobileLabel: "मोबाईल नंबर टाका (10 अंक)",
//     searching: "शोधत आहोत...",
//     found: "सापडले!",
//     notFound: "या नंबरवरून आजची एंट्री सापडली नाही",
//     feedbackLabel: "अभिप्राय द्या *",
//     submit: "अभिप्राय सादर करा",
//     thankYou: "धन्यवाद! तुमचा अभिप्राय यशस्वी झाला",
//   },
//   en: {
//     title: "Feedback Form",
//     mobileLabel: "Enter Mobile Number (10 digits)",
//     searching: "Searching...",
//     found: "Found!",
//     notFound: "No entry found for today",
//     feedbackLabel: "Give Your Feedback *",
//     submit: "Submit Feedback",
//     thankYou: "Thank you! Feedback submitted successfully",
//   }
// };


// const feedbackOptions = [
//   { value: "Satisfied", mr: "समाधानी", en: "Satisfied" },
//   { value: "Not Satisfied", mr: "असमाधानी", en: "Not Satisfied" },
//   { value: "Next Appointment", mr: "पुढील भेटीची तारीख", en: "Next Appointment" },
//   { value: "Officer Not Available", mr: "अधिकारी उपलब्ध नव्हते", en: "Officer Not Available" },
//   { value: "Officer Busy In Meeting", mr: "अधिकारी व्यस्त होते", en: "Officer Busy In Meeting" },
// ];

// const FeedbackForm = () => {
//   const [lang, setLang] = useState('mr');
//   const [mobile, setMobile] = useState('');
//   const [visitor, setVisitor] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [feedback, setFeedback] = useState('');

//   const t = texts[lang];

//   // Auto search when 10 digits entered
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (mobile.length === 10) {
//         fetchVisitor();
//       } else {
//         setVisitor(null);
//         setError('');
//       }
//     }, 600);
//     return () => clearTimeout(timer);
//   }, [mobile]);

//   const fetchVisitor = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const res = await axios.get(
//         `${baseUrl}/getVisitorByMobileNumber?mobileNumber=${mobile}`
//       );
//       if (res.data.success) {
//         setVisitor(res.data.visitor);
//       } else {
//         setError(t.notFound);
//         setVisitor(null);
//       }
//     } catch (err) {
//       setError(t.notFound);
//       setVisitor(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!visitor || !feedback) return;

//     setSubmitting(true);
//     try {
//       // Update existing visitor with feedback
//       await axios.put(`${baseUrl}/visitors/${visitor._id}/feedback`, {
//         feedback: feedback,
//         feedbackGiven: true
//       });

//       setSuccess(true);
//       setFeedback('');
//       setTimeout(() => {
//         setSuccess(false);
//         setMobile('');
//         setVisitor(null);
//       }, 4000);
//     } catch (err) {
//       alert("Error submitting feedback");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Box sx={{bgcolor: '#f0f4f8',mt:15 }}>
//       {/* Header */}
//       <Box sx={{ bgcolor: '#0040B9', color: 'white', py: 3, textAlign: 'center', position: 'relative' }}>
//         <Typography variant="h4" fontWeight="bold">{t.title}</Typography>

//         <ToggleButtonGroup
//           value={lang}
//           exclusive
//           onChange={(_, v) => v && setLang(v)}
//           sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'white', borderRadius: 3 }}
//         >
//           <ToggleButton value="mr" sx={{ fontWeight: 'bold' }}>मराठी</ToggleButton>
//           <ToggleButton value="en" sx={{ fontWeight: 'bold' }}>English</ToggleButton>
//         </ToggleButtonGroup>
//       </Box>

//       <Container maxWidth="lg" sx={{ mt: 6, pb: 8 }}>
//         <Grid container spacing={6} justifyContent="center">

//           {/* Left Side - Feedback Input */}
//           <Grid item xs={12} md={6}>
//             <Paper elevation={20} sx={{ p: 5, borderRadius: 4, border: '5px solid #0040B9' }}>
//               <Typography variant="h5" color="#0040B9" fontWeight="bold" mb={4}>
//                 {lang === 'mr' ? 'अभिप्राय भरा' : 'Submit Feedback'}
//               </Typography>

//               <TextField
//                 fullWidth
//                 label={t.mobileLabel}
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
//                 placeholder="9876543210"
//                 inputProps={{ maxLength: 10 }}
//                 sx={{ mb: 3 }}
//               />

//               {loading && (
//                 <Alert icon={<CircularProgress size={20} />} severity="info" sx={{ mb: 3 }}>
//                   {t.searching}
//                 </Alert>
//               )}

//               {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

//               {visitor && (
//                 <FormControl fullWidth sx={{ mb: 4 }}>
//                   <InputLabel>{t.feedbackLabel}</InputLabel>
//                   <Select
//                     value={feedback}
//                     label={t.feedbackLabel}
//                     onChange={(e) => setFeedback(e.target.value)}
//                     required
//                   >
//                     {feedbackOptions.map(opt => (
//                       <MenuItem key={opt.value} value={opt.value}>
//                         {lang === 'mr' ? opt.mr : opt.en}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               )}

//               <Button
//                 fullWidth
//                 variant="contained"
//                 size="large"
//                 onClick={handleSubmit}
//                 disabled={!visitor || !feedback || submitting}
//                 sx={{
//                   py: 2.5,
//                   fontSize: '1.4rem',
//                   fontWeight: 'bold',
//                   bgcolor: '#0040B9',
//                   '&:hover': { bgcolor: '#002D80' }
//                 }}
//               >
//                 {submitting ? <CircularProgress size={28} color="inherit" /> : t.submit}
//               </Button>

//               {success && (
//                 <Alert severity="success" icon={<CheckCircleOutlineIcon />} sx={{ mt: 3 }}>
//                   {t.thankYou}
//                 </Alert>
//               )}
//             </Paper>
//           </Grid>

//           {/* Right Side - Visitor Details */}
//           <Grid item xs={12} md={6}>
//             <Card elevation={20} sx={{ height: '100%', borderRadius: 4, border: '5px solid #0040B9', bgcolor: '#f8fbff' }}>
//               <CardContent sx={{ textAlign: 'center', pt: 8 }}>
//                 {visitor ? (
//                   <>
//                     <Avatar sx={{ width: 130, height: 130, mx: 'auto', bgcolor: '#0040B9', fontSize: '4rem', mb: 2 }}>
//                       {visitor.fullName.charAt(0)}
//                     </Avatar>
//                     <Typography variant="h5" fontWeight="bold" color="#0040B9">
//                       {visitor.fullName}
//                     </Typography>
//                     <Typography sx={{ mt: 1 }}><strong>मोबाईल:</strong> {visitor.mobileNumber}</Typography>
//                     <Typography><strong>पोलीस स्टेशन:</strong> {visitor.policeStation}</Typography>
//                     <Typography><strong>कारण:</strong> {visitor.reasonToVisit}</Typography>
//                     <Typography><strong>वेळ:</strong> {new Date(visitor.entryAt).toLocaleString('en-IN')}</Typography>
//                     {visitor.visitorPhoto && (
//                       <img
//                         src={visitor.visitorPhoto}
//                         alt="Visitor"
//                         style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%', marginTop: 16, border: '5px solid #0040B9' }}
//                       />
//                     )}
//                   </>
//                 ) : (
//                   <>
//                     <Avatar sx={{ width: 130, height: 130, mx: 'auto', bgcolor: '#0040B9', fontSize: '4rem' }}>
//                       ?
//                     </Avatar>
//                     <Typography variant="h5" fontWeight="bold" color="#0040B9" sx={{ mt: 3 }}>
//                       ठाणे ग्रामीण पोलीस
//                     </Typography>
//                     <Typography variant="h6" color="#0040B9" sx={{ mt: 2 }}>
//                       नागरिक अभिप्राय प्रणाली
//                     </Typography>
//                     <Typography color="text.secondary" sx={{ mt: 4 }}>
//                       {lang === 'mr' ? 'वर मोबाईल नंबर टाका → माहिती दिसेल' : 'Enter mobile number → Details will appear'}
//                     </Typography>
//                   </>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default FeedbackForm;


// =======================================

import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, TextField, Button, Grid, Card, CardContent,
  FormControl, InputLabel, Select, MenuItem, Alert, ToggleButton, ToggleButtonGroup,
  Avatar, Container, CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { baseUrl } from '../config/config';

const texts = {
  mr: {
    title: "अभिप्राय फॉर्म",
    mobileLabel: "मोबाईल नंबर टाका (10 अंक)",
    searching: "शोधत आहोत...",
    found: "सापडले!",
    notFound: "या नंबरवरून आजची एंट्री सापडली नाही",
    feedbackLabel: "अभिप्राय द्या *",
    nextDateLabel: "पुढील भेटीची तारीख *",
    submit: "अभिप्राय सादर करा",
    thankYou: "धन्यवाद! तुमचा अभिप्राय यशस्वी झाला",
  },
  en: {
    title: "Feedback Form",
    mobileLabel: "Enter Mobile Number (10 digits)",
    searching: "Searching...",
    found: "Found!",
    notFound: "No entry found for today",
    feedbackLabel: "Give Your Feedback *",
    nextDateLabel: "Next Appointment Date *",
    submit: "Submit Feedback",
    thankYou: "Thank you! Feedback submitted successfully",
  }
};

const feedbackOptions = [
  { value: "Satisfied", mr: "समाधानी", en: "Satisfied" },
  { value: "Not Satisfied", mr: "असमाधानी", en: "Not Satisfied" },
  { value: "Next Appointment", mr: "पुढील भेटीची तारीख", en: "Next Appointment" },
  { value: "Officer Not Available", mr: "अधिकारी उपलब्ध नव्हते", en: "Officer Not Available" },
  { value: "Officer Busy In Meeting", mr: "अधिकारी व्यस्त होते", en: "Officer Busy In Meeting" },
];

const FeedbackForm = () => {
  const [lang, setLang] = useState('mr');
  const [mobile, setMobile] = useState('');
  const [visitor, setVisitor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [nextAppointment, setNextAppointment] = useState(null);

  const t = texts[lang];

  // Auto search when 10 digits entered
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mobile.length === 10) {
        fetchVisitor();
      } else {
        setVisitor(null);
        setError('');
        setFeedback('');
        setNextAppointment(null);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [mobile]);

  const fetchVisitor = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(
        `${baseUrl}/getVisitorByMobileNumber?mobileNumber=${mobile}`
      );
      if (res.data.success) {
        setVisitor(res.data.visitor);
      } else {
        setError(t.notFound);
        setVisitor(null);
      }
    } catch (err) {
      setError(t.notFound);
      setVisitor(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!visitor || !feedback) return;

    if (feedback === "Next Appointment" && !nextAppointment) {
      alert(lang === 'mr' ? "कृपया तारीख निवडा" : "Please select a date");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        feedback,
        feedbackGiven: true,
        nextAppointmentDate: feedback === "Next Appointment" 
          ? nextAppointment.format('YYYY-MM-DD') 
          : null
      };

      // तुम्हारा वाला PUT API – बिल्कुल वैसा ही!
 
      await axios.put(`${baseUrl}/visitor/${mobile}/feedback`, payload);

      setSuccess(true);
      setFeedback('');
      setNextAppointment(null);
      setTimeout(() => {
        setSuccess(false);
        setMobile('');
        setVisitor(null);
      }, 4000);
    } catch (err) {
      alert("Error submitting feedback");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ bgcolor: '#f0f4f8', mt: 15 }}>
        {/* Header */}
        <Box sx={{ bgcolor: '#0040B9', color: 'white', py: 3, textAlign: 'center', position: 'relative' }}>
          <Typography variant="h4" fontWeight="bold">{t.title}</Typography>

          <ToggleButtonGroup
            value={lang}
            exclusive
            onChange={(_, v) => v && setLang(v)}
            sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'white', borderRadius: 3 }}
          >
            <ToggleButton value="mr" sx={{ fontWeight: 'bold' }}>मराठी</ToggleButton>
            <ToggleButton value="en" sx={{ fontWeight: 'bold' }}>English</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Container maxWidth="lg" sx={{ mt: 6, pb: 8 }}>
          <Grid container spacing={6} justifyContent="center">

            {/* Left Side - Feedback Input */}
            <Grid item xs={12} md={6}>
              <Paper elevation={20} sx={{ p: 5, borderRadius: 4, border: '5px solid #0040B9' }}>
                <Typography variant="h5" color="#0040B9" fontWeight="bold" mb={4}>
                  {lang === 'mr' ? 'अभिप्राय भरा' : 'Submit Feedback'}
                </Typography>

                <TextField
                  fullWidth
                  label={t.mobileLabel}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9876543210"
                  inputProps={{ maxLength: 10 }}
                  sx={{ mb: 3 }}
                />

                {loading && (
                  <Alert icon={<CircularProgress size={20} />} severity="info" sx={{ mb: 3 }}>
                    {t.searching}
                  </Alert>
                )}

                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                {visitor && (
                  <>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <InputLabel>{t.feedbackLabel}</InputLabel>
                      <Select
                        value={feedback}
                        label={t.feedbackLabel}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                      >
                        {feedbackOptions.map(opt => (
                          <MenuItem key={opt.value} value={opt.value}>
                            {lang === 'mr' ? opt.mr : opt.en}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* तुम्हारी रिक्वायरमेंट – Next Appointment पर Date Picker */}
                    {feedback === "Next Appointment" && (
                      <DatePicker
                        label={t.nextDateLabel}
                        value={nextAppointment}
                        onChange={setNextAppointment}
                        minDate={dayjs().add(1, 'day')}
                        slotProps={{ textField: { fullWidth: true, sx: { mb: 4 } } }}
                      />
                    )}

                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleSubmit}
                      disabled={!visitor || !feedback || submitting || (feedback === "Next Appointment" && !nextAppointment)}
                      sx={{
                        py: 2.5,
                        fontSize: '1.4rem',
                        fontWeight: 'bold',
                        bgcolor: '#0040B9',
                        '&:hover': { bgcolor: '#002D80' }
                      }}
                    >
                      {submitting ? <CircularProgress size={28} color="inherit" /> : t.submit}
                    </Button>
                  </>
                )}

                {success && (
                  <Alert severity="success" icon={<CheckCircleOutlineIcon />} sx={{ mt: 3 }}>
                    {t.thankYou}
                  </Alert>
                )}
              </Paper>
            </Grid>

            {/* Right Side - Visitor Details (तुम्हारा डिजाइन बिल्कुल वैसा ही) */}
            <Grid item xs={12} md={6}>
              <Card elevation={20} sx={{ height: '100%', borderRadius: 4, border: '5px solid #0040B9', bgcolor: '#f8fbff' }}>
                <CardContent sx={{ textAlign: 'center', pt: 8 }}>
                  {visitor ? (
                    <>
                      <Avatar sx={{ width: 130, height: 130, mx: 'auto', bgcolor: '#0040B9', fontSize: '4rem', mb: 2 }}>
                        {visitor.fullName.charAt(0)}
                      </Avatar>
                      <Typography variant="h5" fontWeight="bold" color="#0040B9">
                        {visitor.fullName}
                      </Typography>
                      <Typography sx={{ mt: 1 }}><strong>मोबाईल:</strong> {visitor.mobileNumber}</Typography>
                      <Typography><strong>पोलीस स्टेशन:</strong> {visitor.policeStation}</Typography>
                      <Typography><strong>कोणास भेटायचे:</strong> {visitor.contactPerson}</Typography>
                      <Typography><strong>वेळ:</strong> {new Date(visitor.entryAt).toLocaleString('en-IN')}</Typography>
                      {visitor.visitorPhoto && (
                        <img
                          src={visitor.visitorPhoto}
                          alt="Visitor"
                          style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%', marginTop: 16, border: '5px solid #0040B9' }}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <Avatar sx={{ width: 130, height: 130, mx: 'auto', bgcolor: '#0040B9', fontSize: '4rem' }}>
                        ?
                      </Avatar>
                      <Typography variant="h5" fontWeight="bold" color="#0040B9" sx={{ mt: 3 }}>
                        ठाणे ग्रामीण पोलीस
                      </Typography>
                      <Typography variant="h6" color="#0040B9" sx={{ mt: 2 }}>
                        नागरिक अभिप्राय प्रणाली
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 4 }}>
                        {lang === 'mr' ? 'वर मोबाईल नंबर टाका → माहिती दिसेल' : 'Enter mobile number → Details will appear'}
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default FeedbackForm;