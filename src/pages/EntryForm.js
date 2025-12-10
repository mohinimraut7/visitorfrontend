// import React, { useState, useRef, useEffect } from 'react';
// import {
//   Box, Typography, TextField, Button, Container, Paper, Fade, Grid,
//   FormControl, InputLabel, Select, MenuItem, FormHelperText, IconButton
// } from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import Webcam from 'react-webcam';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import logobrand from '../Images/thanegraminpolicebrand.jpeg';

// const policeStations = [
//   "आंबर्नाथ", "बदलापूर", "कल्याण तालुका", "कल्याण शहर", "उल्हासनगर", "डोंबिवली",
//   "भिवंडी तालुका", "भिवंडी शहर", "वज्रेश्वरी", "मुरबाड", "शहापूर", "किन्हवली",
//   "टिटवाळा", "पडघा", "कोळी", "खालापूर", "पनवेल तालुका", "पनवेल शहर", "खांदेश्वर",
//   "नवी मुंबई", "नेरळ", "कर्जत", "विक्रमी गढ", "उरण", "पेण", "अलिबाग"
// ];

// const validationSchema = Yup.object({
//   name: Yup.string().required('नाव आवश्यक आहे'),
//   mobile: Yup.string()
//     .matches(/^[6-9]\d{9}$/, 'कृपया वैध 10 अंकी मोबाईल नंबर टाका')
//     .required('मोबाईल नंबर आवश्यक आहे'),
//   address: Yup.string().required('पत्ता आवश्यक आहे'),
//   policeStation: Yup.string().required('पोलीस स्टेशन निवडा'),
//   contactPerson: Yup.string().required('संपर्क व्यक्तीचे नाव आवश्यक आहे'),
//   reason: Yup.string().required('कारण लिहा'),
//   photo: Yup.string().required('फोटो आवश्यक आहे (वेबकॅम किंवा अपलोड)'),
// });

// const EntryForm = () => {
//   const [showWebcam, setShowWebcam] = useState(false);
//   const [capturedPhoto, setCapturedPhoto] = useState('');
//   const webcamRef = useRef(null);

//   const capture = () => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (imageSrc) {
//       setCapturedPhoto(imageSrc);
//       setShowWebcam(false);
//       formik.setFieldValue('photo', imageSrc);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedPhoto(reader.result);
//         formik.setFieldValue('photo', reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       mobile: '',
//       address: '',
//       policeStation: '',
//       contactPerson: '',
//       reason: '',
//       photo: '',
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       console.log('Entry Submitted:', values);
//       alert('एंट्री यशस्वी झाली! पोलीस स्टेशनला माहिती पाठवली आहे.');
//       // येथे API call करशील
//     },
//   });

//   return (
//     <Box sx={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #f0f4f8 0%, #e1e8f0 50%, #d6e0f0 100%)',
//         pt: 0,   // ← मुख्य बदल

//       py: { xs: 2, sm: 4 },
//     }}>
//       <Container maxWidth="md">
//         <Fade in timeout={1000}>
//           <Paper elevation={24}
//             sx={{
//               borderRadius: 4,
//               overflow: 'hidden',
//               background: 'rgba(255,255,255,0.98)',
//               border: '3px solid #0040B9',
//               boxShadow: '0 20px 60px rgba(0,64,185,0.25)',
//             }}
//           >
//             {/* Header */}
//             <Box sx={{
//               bgcolor: '#0040B9',
//               color: 'white',
//               p: 3,
//               textAlign: 'center',
//               position: 'relative',
//             }}>
//               {/* <img src={logobrand} alt="ठाणे ग्रामीण पोलीस" style={{ height: 90, marginBottom: 12 }} />
//               <Typography variant="h4" fontWeight="bold" sx={{ letterSpacing: 2 }}>
//                 पोलीस स्टेशन एंट्री फॉर्म
//               </Typography>
//               <Typography variant="h6" sx={{ opacity: 0.9, mt: 1 }}>
//                 Police Station Entry Registration
//               </Typography> */}
//             </Box>

//             <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: { xs: 3, sm: 5 } }}>
//               <Grid container spacing={3}>
//                 {/* Name */}
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     label="पूर्ण नाव (Full Name)"
//                     name="name"
//                     value={formik.values.name}
//                     onChange={formik.handleChange}
//                     error={formik.touched.name && Boolean(formik.errors.name)}
//                     helperText={formik.touched.name && formik.errors.name}
//                     required
//                   />
//                 </Grid>

//                 {/* Mobile */}
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     label="मोबाईल नंबर (Mobile Number)"
//                     name="mobile"
//                     value={formik.values.mobile}
//                     onChange={formik.handleChange}
//                     error={formik.touched.mobile && Boolean(formik.errors.mobile)}
//                     helperText={formik.touched.mobile && formik.errors.mobile}
//                     required
//                   />
//                 </Grid>

//                 {/* Address */}
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="पूर्ण पत्ता (Full Address)"
//                     name="address"
//                     multiline
//                     rows={3}
//                     value={formik.values.address}
//                     onChange={formik.handleChange}
//                     error={formik.touched.address && Boolean(formik.errors.address)}
//                     helperText={formik.touched.address && formik.errors.address}
//                     required
//                   />
//                 </Grid>

//                 {/* Police Station */}
//                 <Grid item xs={12} md={6}>
//                   <FormControl fullWidth error={formik.touched.policeStation && Boolean(formik.errors.policeStation)}>
//                     <InputLabel>पोलीस स्टेशन निवडा *</InputLabel>
//                     <Select
//                       name="policeStation"
//                       value={formik.values.policeStation}
//                       onChange={formik.handleChange}
//                       required
//                     >
//                       <MenuItem value="" disabled><em>निवडा...</em></MenuItem>
//                       {policeStations.map(station => (
//                         <MenuItem key={station} value={station}>{station} पोलीस स्टेशन</MenuItem>
//                       ))}
//                     </Select>
//                     {formik.touched.policeStation && formik.errors.policeStation && (
//                       <FormHelperText>{formik.errors.policeStation}</FormHelperText>
//                     )}
//                   </FormControl>
//                 </Grid>

//                 {/* Contact Person */}
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     label="संपर्क व्यक्ती / अधिकारी (Contact Person / Officer)"
//                     name="contactPerson"
//                     value={formik.values.contactPerson}
//                     onChange={formik.handleChange}
//                     error={formik.touched.contactPerson && Boolean(formik.errors.contactPerson)}
//                     helperText={formik.touched.contactPerson && formik.errors.contactPerson}
//                     required
//                   />
//                 </Grid>

//                 {/* Reason */}
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="भेटीचे कारण (Purpose of Visit)"
//                     name="reason"
//                     multiline
//                     rows={3}
//                     value={formik.values.reason}
//                     onChange={formik.handleChange}
//                     error={formik.touched.reason && Boolean(formik.errors.reason)}
//                     helperText={formik.touched.reason && formik.errors.reason || "उदा. तक्रार नोंद, चौकशी, पास, इत्यादी"}
//                     required
//                   />
//                 </Grid>

//                 {/* Photo Capture / Upload */}
//                 <Grid item xs={12}>
//                   <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
//                     फोटो (कंपल्सरी) - Photo (Compulsory)
//                   </Typography>

//                   {!capturedPhoto ? (
//                     <Box sx={{ textAlign: 'center', mt: 2 }}>
//                       <Button
//                         variant="contained"
//                         startIcon={<PhotoCamera />}
//                         onClick={() => setShowWebcam(true)}
//                         sx={{ mr: 2, bgcolor: '#0040B9' }}
//                       >
//                         वेबकॅम ने फोटो काढा
//                       </Button>
//                       <Button variant="outlined" component="label">
//                         फोटो अपलोड करा
//                         <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
//                       </Button>
//                     </Box>
//                   ) : (
//                     <Box sx={{ textAlign: 'center' }}>
//                       <img src={capturedPhoto} alt="Captured" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '12px', border: '4px solid #0040B9' }} />
//                       <br />
//                       <Button variant="text" color="error" onClick={() => { setCapturedPhoto(''); formik.setFieldValue('photo', ''); }}>
//                         फोटो बदलायचा?
//                       </Button>
//                     </Box>
//                   )}

//                   {showWebcam && (
//                     <Box sx={{ mt: 3, textAlign: 'center' }}>
//                       <Webcam
//                         audio={false}
//                         ref={webcamRef}
//                         screenshotFormat="image/jpeg"
//                         width={400}
//                         height={300}
//                         videoConstraints={{ facingMode: "user" }}
//                         style={{ borderRadius: 12, border: '4px solid #0040B9' }}
//                       />
//                       <Box mt={2}>
//                         <Button variant="contained" color="success" onClick={capture} sx={{ mr: 2 }}>
//                           फोटो कॅप्चर करा
//                         </Button>
//                         <Button variant="outlined" onClick={() => setShowWebcam(false)}>
//                           रद्द करा
//                         </Button>
//                       </Box>
//                     </Box>
//                   )}

//                   {formik.touched.photo && formik.errors.photo && (
//                     <Typography color="error" variant="body2" sx={{ mt: 1 }}>{formik.errors.photo}</Typography>
//                   )}
//                 </Grid>

//                 {/* Submit Button */}
//                 <Grid item xs={12}>
//                   <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     size="large"
//                     sx={{
//                       py: 2,
//                       fontSize: '1.2rem',
//                       fontWeight: 'bold',
//                       background: 'linear-gradient(90deg, #0040B9, #6C0204)',
//                       boxShadow: '0 8px 25px rgba(108,2,4,0.4)',
//                       '&:hover': { background: '#002D80', transform: 'translateY(-3px)' }
//                     }}
//                   >
//                     एंट्री सबमिट करा - Submit Entry
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Paper>
//         </Fade>
//       </Container>
//     </Box>
//   );
// };

// export default EntryForm;


// ============================================


// import React, { useState, useRef } from 'react';
// import {
//   Box, Typography, TextField, Button, Container, Paper, Grid, FormControl,
//   InputLabel, Select, MenuItem, IconButton, Card, CardContent, Avatar
// } from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import Webcam from 'react-webcam';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import logobrand from '../Images/thanegraminpolicebrand.jpeg';

// const talukas = ["भिवंडी", "कल्याण", "मुरबाड", "शहापूर", "उल्हासनगर", "अंबरनाथ", "कर्जत"];
// const visitReasons = [
//   "तक्रार नोंदवणे", "FIR दाखल करणे", "चौकशीसाठी", "दस्तऐवज घेणे", 
//   "पास मिळवणे", "भेटणे", "इतर"
// ];

// const validationSchema = Yup.object({
//   name: Yup.string().required('नाव आवश्यक आहे'),
//   mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'वैध 10 अंकी नंबर टाका').required('मोबाईल आवश्यक'),
//   address: Yup.string().required('पत्ता आवश्यक'),
//   pincode: Yup.string().matches(/^\d{6}$/, '6 अंकी पिनकोड').required('पिनकोड आवश्यक'),
//   taluka: Yup.string().required('तालुका निवडा'),
//   policeStation: Yup.string().required('पोलीस स्टेशन निवडा'),
//   meetingPerson: Yup.string().required('भेटीची व्यक्ती आवश्यक'),
//   visitReason: Yup.string().required('कारण निवडा'),
//   photo: Yup.string().required('फोटो आवश्यक'),
// });

// const EntryForm = () => {
//   const [showWebcam, setShowWebcam] = useState(false);
//   const [capturedPhoto, setCapturedPhoto] = useState('');
//   const webcamRef = useRef(null);

//   const now = new Date();
//   const dateTime = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) 
//     + ' | ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

//   const capture = () => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (imageSrc) {
//       setCapturedPhoto(imageSrc);
//       setShowWebcam(false);
//       formik.setFieldValue('photo', imageSrc);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedPhoto(reader.result);
//         formik.setFieldValue('photo', reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       name: '', mobile: '', address: '', pincode: '', taluka: '', policeStation: '',
//       meetingPerson: '', visitReason: '', photo: ''
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       alert('एंट्री यशस्वी! धन्यवाद.');
//       console.log(values);
//     },
//   });

//   return (
//     <Box sx={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #f0f4f8 0%, #d6e0f0 100%)',
//       pt: 0,
//       pb: 6
//     }}>
//       {/* Top Logo Bar */}
//       <Box sx={{
//         bgcolor: '#0040B9',
//         color: 'white',
//         py: 2,
//         textAlign: 'center',
//         boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
//       }}>
//         <img src={logobrand} alt="ठाणे ग्रामीण पोलीस" style={{ height: 80 }} />
//         <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
//           पोलीस स्टेशन एंट्री फॉर्म
//         </Typography>
//         <Typography variant="h6" sx={{ opacity: 0.9 }}>
//           Police Station Entry Registration
//         </Typography>
//       </Box>

//       <Container maxWidth="lg" sx={{ mt: 4 }}>
//         <Grid container spacing={4}>
//           {/* Left Side - Form */}
//           <Grid item xs={12} md={6}>
//             <Paper elevation={12} sx={{ borderRadius: 4, p: { xs: 3, md: 4 }, border: '2px solid #0040B9' }}>
//               <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>
//                 Visitor Details | अभ्यागत तपशील
//               </Typography>

//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="Full Name | पूर्ण नाव *" name="name"
//                     value={formik.values.name} onChange={formik.handleChange}
//                     error={formik.touched.name && Boolean(formik.errors.name)}
//                     helperText={formik.touched.name && formik.errors.name} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="Mobile Number | मोबाईल नंबर *" name="mobile"
//                     value={formik.values.mobile} onChange={formik.handleChange}
//                     error={formik.touched.mobile && Boolean(formik.errors.mobile)}
//                     helperText={formik.touched.mobile && formik.errors.mobile} />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField fullWidth label="Address | पत्ता *" name="address"
//                     multiline rows={2} value={formik.values.address} onChange={formik.handleChange}
//                     error={formik.touched.address && Boolean(formik.errors.address)}
//                     helperText={formik.touched.address && formik.errors.address} />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="Pin Code | पिनकोड *" name="pincode"
//                     value={formik.values.pincode} onChange={formik.handleChange}
//                     error={formik.touched.pincode && Boolean(formik.errors.pincode)}
//                     helperText={formik.touched.pincode && formik.errors.pincode} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth>
//                     <InputLabel>Taluka | तालुका *</InputLabel>
//                     <Select name="taluka" value={formik.values.taluka} onChange={formik.handleChange}>
//                       {talukas.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="District | जिल्हा" value="ठाणे / Thane" disabled />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="Police Station | पोलीस स्टेशन *" name="policeStation"
//                     value={formik.values.policeStation} onChange={formik.handleChange} />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="Meeting Person | भेटीची व्यक्ती *" name="meetingPerson"
//                     value={formik.values.meetingPerson} onChange={formik.handleChange} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth>
//                     <InputLabel>Visit Reason | भेटीचे कारण *</InputLabel>
//                     <Select name="visitReason" value={formik.values.visitReason} onChange={formik.handleChange}>
//                       {visitReasons.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Button fullWidth variant="contained" type="submit" size="large"
//                     sx={{ py: 2, bgcolor: '#0040B9', fontSize: '1.2rem', fontWeight: 'bold' }}>
//                     Submit Entry | एंट्री सबमिट करा
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Paper>
//           </Grid>

//           {/* Right Side - Photo + Summary Card */}
//           <Grid item xs={12} md={6}>
//             <Card elevation={16} sx={{ borderRadius: 4, textAlign: 'center', bgcolor: '#f8fbff', border: '3px solid #0040B9' }}>
//               <CardContent sx={{ pt: 4 }}>
//                 <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>
//                   Visitor Photo | अभ्यागत फोटो
//                 </Typography>

//                 {/* Photo Capture Area */}
//                 {!capturedPhoto ? (
//                   <Box sx={{ my: 3 }}>
//                     <Avatar sx={{ width: 220, height: 220, mx: 'auto', bgcolor: '#e3e8f5', border: '6px dashed #0040B9' }}>
//                       <PhotoCamera sx={{ fontSize: 80, color: '#0040B9' }} />
//                     </Avatar>
//                     <Box sx={{ mt: 3 }}>
//                       <Button variant="contained" startIcon={<PhotoCamera />} onClick={() => setShowWebcam(true)}
//                         sx={{ mr: 2, bgcolor: '#0040B9' }}>वेबकॅम</Button>
//                       <Button variant="outlined" component="label">
//                         अपलोड
//                         <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
//                       </Button>
//                     </Box>
//                   </Box>
//                 ) : (
//                   <Box sx={{ my: 3 }}>
//                     <img src={capturedPhoto} alt="Visitor" style={{ width: 240, height: 240, objectFit: 'cover', borderRadius: '50%', border: '8px solid #0040B9' }} />
//                     <br />
//                     <Button variant="text" color="error" onClick={() => { setCapturedPhoto(''); formik.setFieldValue('photo', ''); }}>
//                       Change Photo | फोटो बदला
//                     </Button>
//                   </Box>
//                 )}

//                 {showWebcam && (
//                   <Box sx={{ mt: 3 }}>
//                     <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={300} height={300}
//                       style={{ borderRadius: '50%', border: '6px solid #0040B9' }} />
//                     <Box sx={{ mt: 2 }}>
//                       <Button variant="contained" color="success" onClick={capture} sx={{ mr: 2 }}>Capture</Button>
//                       <Button variant="outlined" onClick={() => setShowWebcam(false)}>Cancel</Button>
//                     </Box>
//                   </Box>
//                 )}

//                 {/* Live Summary */}
//                 {formik.values.name && (
//                   <Paper elevation={6} sx={{ mt: 4, p: 3, bgcolor: '#e8f0fe', borderRadius: 3 }}>
//                     <Typography variant="h6" fontWeight="bold" color="#0040B9">Live Entry Preview</Typography>
//                     <Typography><strong>Name:</strong> {formik.values.name}</Typography>
//                     <Typography><strong>Mobile:</strong> {formik.values.mobile}</Typography>
//                     <Typography><strong>Taluka:</strong> {formik.values.taluka || '-'}</Typography>
//                     <Typography><strong>Police Station:</strong> {formik.values.policeStation || '-'}</Typography>
//                     <Typography><strong>Meeting:</strong> {formik.values.meetingPerson || '-'}</Typography>
//                     <Typography><strong>Reason:</strong> {formik.values.visitReason || '-'}</Typography>
//                     <Typography><strong>Date & Time:</strong> {dateTime}</Typography>
//                   </Paper>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default EntryForm;

// =============================================
// import React, { useState, useRef } from 'react';
// import {
//   Box, Typography, TextField, Button, Container, Paper, Grid, FormControl,
//   InputLabel, Select, MenuItem, Card, CardContent, Avatar, ToggleButton, ToggleButtonGroup
// } from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import Webcam from 'react-webcam';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import logobrand from '../Images/thanegraminpolicebrand.jpeg';
// import { baseUrl } from '../config/config';



// const talukas = ["Thane", "Ulhasnagar", "Kalyan", "Bhiwandi", "Ambarnath", "Murbad", "Shahapur"];
// const visitReasonsMr = ["तक्रार नोंद", "FIR", "चौकशी", "दस्तऐवज", "पास", "भेट", "इतर"];
// const visitReasonsEn = ["Complaint", "FIR", "Inquiry", "Documents", "Pass", "Meeting", "Other"];
// // फक्त हे 11 स्टेशन – तुझ्या screenshot प्रमाणे
// const policeStations = [
//   "भिवंडी तालुका",
//   "गणेशपुरी",
//   "कल्याण तालुका",
//   "कसारा",
//   "किन्हवली",
//   "कुलगाव",
//   "मुरबाड",
//   "पडघा",
//   "शहापूर",
//   "टोकावडे",
//   "वसिंद"
// ];

// // भाषेनुसार टेक्स्ट
// const texts = {
//   mr: {
//     // title: "पोलीस स्टेशन एंट्री फॉर्म",
//     subtitle: "नोंदणी फॉर्म",
//     visitorDetails: "अभ्यागत तपशील",
//     name: "पूर्ण नाव *",
//     mobile: "मोबाईल नंबर *",
//     address: "पूर्ण पत्ता *",
//     pincode: "पिनकोड *",
//     taluka: "तालुका *",
//     district: "जिल्हा",
//     policeStation: "पोलीस स्टेशन *",
//     meetingPerson: "भेटीची व्यक्ती *",
//     visitReason: "भेटीचे कारण *",
//     photoTitle: "अभ्यागत फोटो",
//     webcamBtn: "वेबकॅम",
//     uploadBtn: "अपलोड",
//     changePhoto: "फोटो बदला",
//     captureBtn: "कॅप्चर",
//     cancelBtn: "रद्द",
//     submitBtn: "एंट्री सबमिट करा | Submit Entry",
//     livePreview: "लाइव्ह एंट्री प्रीव्ह्यू",
//     timeLabel: "वेळ :"
//   },
//   en: {
//     // title: "Police Station Entry Form",
//     subtitle: "Visitor Entry Registration",
//     visitorDetails: "Visitor Details",
//     name: "Full Name *",
//     mobile: "Mobile Number *",
//     address: "Full Address *",
//     pincode: "Pincode *",
//     taluka: "Taluka *",
//     district: "District",
//     policeStation: "Police Station *",
//     meetingPerson: "Person to Meet *",
//     visitReason: "Purpose of Visit *",
//     photoTitle: "Visitor Photo",
//     webcamBtn: "Webcam",
//     uploadBtn: "Upload",
//     changePhoto: "Change Photo",
//     captureBtn: "Capture",
//     cancelBtn: "Cancel",
//     submitBtn: "Submit Entry | एंट्री सबमिट करा",
//     livePreview: "Live Entry Preview",
//     timeLabel: "Time :"
//   }
// };

// const validationSchema = Yup.object({
//   name: Yup.string().required(),
//   mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'Invalid mobile').required(),
//   address: Yup.string().required(),
//   pincode: Yup.string().matches(/^\d{6}$/, '6 digits').required(),
//   taluka: Yup.string().required(),
//   policeStation: Yup.string().required(),
//   meetingPerson: Yup.string().required(),
//   visitReason: Yup.string().required(),
//   photo: Yup.string().required(),
// });

// const EntryForm = () => {
//   const [lang, setLang] = useState('mr'); // mr = मराठी, en = English
//   const [showWebcam, setShowWebcam] = useState(false);
//   const [capturedPhoto, setCapturedPhoto] = useState('');
//   const webcamRef = useRef(null);

//   const t = texts[lang];
//   const reasons = lang === 'mr' ? visitReasonsMr : visitReasonsEn;

//   const now = new Date();
//   const dateTime = now.toLocaleString('en-IN', {
//     day: '2-digit', month: '2-digit', year: 'numeric',
//     hour: '2-digit', minute: '2-digit'
//   }).replace(',', ' |');

//   const capture = () => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (imageSrc) {
//       setCapturedPhoto(imageSrc);
//       setShowWebcam(false);
//       formik.setFieldValue('photo', imageSrc);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedPhoto(reader.result);
//         formik.setFieldValue('photo', reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const formik = useFormik({
//     initialValues: { name: '', mobile: '', address: '', pincode: '', taluka: '', policeStation: '', meetingPerson: '', visitReason: '', photo: '' },
//     validationSchema,
//     onSubmit: () => alert(lang === 'mr' ? 'एंट्री यशस्वी!' : 'Entry Submitted Successfully!'),
//   });

//   return (
//     <Box sx={{ bgcolor: '#f0f4f8', mt: 15 }}>
//       {/* Header with Language Switch */}
//       <Box sx={{ bgcolor: '#0040B9', color: 'white', py: 2.5, textAlign: 'center', position: 'relative' }}>
//         {/* <img src={logobrand} alt="ठाणे ग्रामीण पोलीस" style={{ height: 78 }} /> */}
//         <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>{t.title}</Typography>
//         <Typography variant="h6" sx={{ opacity: 0.9 }}>{t.subtitle}</Typography>

//         {/* Language Toggle Button - Top Right */}
//         <ToggleButtonGroup
//           value={lang}
//           exclusive
//           onChange={(_, newLang) => newLang && setLang(newLang)}
//           sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'white', borderRadius: 3 }}
//         >
//           <ToggleButton value="mr" sx={{ color: lang === 'mr' ? '#0040B9' : '#666', fontWeight: 'bold' }}>
//             मराठी
//           </ToggleButton>
//           <ToggleButton value="en" sx={{ color: lang === 'en' ? '#0040B9' : '#666', fontWeight: 'bold' }}>
//             English
//           </ToggleButton>
//         </ToggleButtonGroup>
//       </Box>

//       <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
//         <Grid container spacing={4}>
//           {/* Left Form */}
//           <Grid item xs={12} md={6}>
//             <Paper elevation={12} sx={{ borderRadius: 4, p: 4, border: '3px solid #0040B9' }}>
//               <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>{t.visitorDetails}</Typography>
//               <Grid container spacing={2.5}>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label={t.name} name="name" value={formik.values.name} onChange={formik.handleChange} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label={t.mobile} name="mobile" value={formik.values.mobile} onChange={formik.handleChange} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label={t.address} multiline rows={2} name="address" value={formik.values.address} onChange={formik.handleChange} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label={t.pincode} name="pincode" value={formik.values.pincode} onChange={formik.handleChange} /></Grid>
//                <Grid item xs={12} sm={6}><TextField fullWidth label={t.district} value="ठाणे / Thane" disabled /></Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth><InputLabel>{t.taluka}</InputLabel>
//                     <Select name="taluka" value={formik.values.taluka} onChange={formik.handleChange}>
//                       {talukas.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 {/* <Grid item xs={12} sm={6}>

//                   <TextField fullWidth label={t.policeStation} name="policeStation" value={formik.values.policeStation} onChange={formik.handleChange} />
                  
//                   </Grid> */}


// {/* Police Station – आता Dropdown आहे (TextField नव्हे) */}
// <Grid item xs={12} sm={6}>
//   <FormControl fullWidth>
//     <InputLabel sx={{ fontWeight: 'bold' }}>
//       {t.policeStation}
//     </InputLabel>
//     <Select
//       name="policeStation"
//       value={formik.values.policeStation}
//       onChange={formik.handleChange}
//       label={t.policeStation}
//       required
//       sx={{
//         '& .MuiOutlinedInput-notchedOutline': {
//           borderColor: '#0040B9',
//           borderWidth: 2
//         },
//         '&:hover .MuiOutlinedInput-notchedOutline': {
//           borderColor: '#002D80'
//         }
//       }}
//     >
//       <MenuItem value="" disabled>
//         <em>— पोलीस स्टेशन निवडा —</em>
//       </MenuItem>
//       {[
//         "Bhiwandi Taluka",
//         "Ganeshpuri",
//         "Kalyan Taluka",
//         "Kasara",
//         "Kinhavali",
//         "Kulgaon",
//         "Murbaad",
//         "Padagha",
//         "Shahapur",
//         "Tokawade",
//         "Vasind"
//       ].map((station) => (
//         <MenuItem key={station} value={station}>
//           {station}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>
// </Grid>

//                 <Grid item xs={12} sm={6}><TextField fullWidth label={t.meetingPerson} name="meetingPerson" value={formik.values.meetingPerson} onChange={formik.handleChange} /></Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth><InputLabel>{t.visitReason}</InputLabel>
//                     <Select name="visitReason" value={formik.values.visitReason} onChange={formik.handleChange}>
//                       {reasons.map((r, i) => <MenuItem key={i} value={r}>{r}</MenuItem>)}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button fullWidth variant="contained" type="submit" size="large"
//                     sx={{ py: 2.2, fontSize: '1.25rem', fontWeight: 'bold', bgcolor: '#0040B9' }}>
//                     {t.submitBtn}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Paper>
//           </Grid>

//           {/* Right Photo + Preview */}
//           <Grid item xs={12} md={6}>
//             <Card elevation={16} sx={{ borderRadius: 4, textAlign: 'center', bgcolor: '#f8fbff', border: '4px solid #0040B9' }}>
//               <CardContent sx={{ pt: 5 }}>
//                 <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>{t.photoTitle}</Typography>

//                 {!capturedPhoto ? (
//                   <Box sx={{ my: 4 }}>
//                     <Avatar sx={{ width: 240, height: 240, mx: 'auto', bgcolor: '#e3e8f5', border: '8px dashed #0040B9' }}>
//                       <PhotoCamera sx={{ fontSize: 90, color: '#0040B9' }} />
//                     </Avatar>
//                     <Box sx={{ mt: 3 }}>
//                       <Button variant="contained" startIcon={<PhotoCamera />} onClick={() => setShowWebcam(true)}
//                         sx={{ mr: 2, bgcolor: '#0040B9', px: 4 }}>{t.webcamBtn}</Button>
//                       <Button variant="outlined" component="label" sx={{ px: 4 }}>
//                         {t.uploadBtn} <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
//                       </Button>
//                     </Box>
//                   </Box>
//                 ) : (
//                   <Box sx={{ my: 3 }}>
//                     <img src={capturedPhoto} alt="Visitor" style={{ width: 260, height: 260, objectFit: 'cover', borderRadius: '50%', border: '10px solid #0040B9' }} />
//                     <br /><br />
//                     <Button variant="text" color="error" onClick={() => { setCapturedPhoto(''); formik.setFieldValue('photo', ''); }}>
//                       {t.changePhoto}
//                     </Button>
//                   </Box>
//                 )}

//                 {showWebcam && (
//                   <Box sx={{ mt: 4 }}>
//                     <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={320} height={320}
//                       style={{ borderRadius: '50%', border: '8px solid #0040B9' }} />
//                     <Box mt={3}>
//                       <Button variant="contained" color="success" onClick={capture} sx={{ mr: 2 }}>{t.captureBtn}</Button>
//                       <Button variant="outlined" onClick={() => setShowWebcam(false)}>{t.cancelBtn}</Button>
//                     </Box>
//                   </Box>
//                 )}

//                 {formik.values.name && (
//                   <Paper elevation={8} sx={{ mt: 5, p: 3, bgcolor: '#e3edff', borderRadius: 3 }}>
//                     <Typography fontWeight="bold" color="#0040B9">{t.livePreview}</Typography>
//                     <Typography><strong>{lang === 'mr' ? 'नाव :' : 'Name :'}</strong> {formik.values.name}</Typography>
//                     <Typography><strong>{lang === 'mr' ? 'मोबाईल :' : 'Mobile :'}</strong> {formik.values.mobile}</Typography>
//                     <Typography><strong>{lang === 'mr' ? 'तालुका :' : 'Taluka :'}</strong> {formik.values.taluka || '-'}</Typography>
//                     <Typography><strong>{lang === 'mr' ? 'पोलीस स्टेशन :' : 'Station :'}</strong> {formik.values.policeStation || '-'}</Typography>
//                     <Typography><strong>{lang === 'mr' ? 'भेट :' : 'Meeting :'}</strong> {formik.values.meetingPerson || '-'}</Typography>
//                     <Typography><strong>{lang === 'mr' ? 'कारण :' : 'Reason :'}</strong> {formik.values.visitReason || '-'}</Typography>
//                     <Typography><strong>{t.timeLabel}</strong> {dateTime}</Typography>
//                   </Paper>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default EntryForm;

// ====================================

// src/components/EntryForm.js   (या जहाँ भी है)

// import React, { useState, useRef } from 'react';
// import {
//   Box, Typography, TextField, Button, Container, Paper, Grid, FormControl,
//   InputLabel, Select, MenuItem, Card, CardContent, Avatar, ToggleButton, ToggleButtonGroup,
//   CircularProgress, Alert
// } from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import Webcam from 'react-webcam';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { baseUrl } from '../config/config';   // ← अपना config file
// import logobrand from '../Images/thanegraminpolicebrand.jpeg';

// const talukas = ["Thane", "Ulhasnagar", "Kalyan", "Bhiwandi", "Ambarnath", "Murbad", "Shahapur"];

// const visitReasonsMr = ["तक्रार नोंद", "FIR", "चौकशी", "दस्तऐवज", "पास", "भेट", "इतर"];
// const visitReasonsEn = ["Complaint", "FIR", "Inquiry", "Documents", "Pass", "Meeting", "Other"];

// const policeStations = [
//   "भिवंडी तालुका", "गणेशपुरी", "कल्याण तालुका", "कसारा", "किन्हवली",
//   "कुलगाव", "मुरबाड", "पडघा", "शहापूर", "टोकावडे", "वसिंद"
// ];

// const texts = {
//   mr: {
//     subtitle: "नोंदणी फॉर्म",
//     visitorDetails: "अभ्यागत तपशील",
//     name: "पूर्ण नाव *",
//     mobile: "मोबाईल नंबर *",
//     address: "पूर्ण पत्ता *",
//     pincode: "पिनकोड *",
//     taluka: "तालुका *",
//     district: "जिल्हा",
//     policeStation: "पोलीस स्टेशन *",
//     meetingPerson: "भेटीची व्यक्ती *",
//     visitReason: "भेटीचे कारण *",
//     photoTitle: "अभ्यागत फोटो",
//     webcamBtn: "वेबकॅम",
//     uploadBtn: "अपलोड",
//     changePhoto: "फोटो बदला",
//     captureBtn: "कॅप्चर",
//     cancelBtn: "रद्द",
//     submitBtn: "एंट्री सबमिट करा | Submit Entry",
//     livePreview: "लाइव्ह एंट्री प्रीव्ह्यू",
//     timeLabel: "वेळ :"
//   },
//   en: {
//     subtitle: "Visitor Entry Registration",
//     visitorDetails: "Visitor Details",
//     name: "Full Name *",
//     mobile: "Mobile Number *",
//     address: "Full Address *",
//     pincode: "Pincode *",
//     taluka: "Taluka *",
//     district: "District",
//     policeStation: "Police Station *",
//     meetingPerson: "Person to Meet *",
//     visitReason: "Purpose of Visit *",
//     photoTitle: "Visitor Photo",
//     webcamBtn: "Webcam",
//     uploadBtn: "Upload",
//     changePhoto: "Change Photo",
//     captureBtn: "Capture",
//     cancelBtn: "Cancel",
//     submitBtn: "Submit Entry | एंट्री सबमिट करा",
//     livePreview: "Live Entry Preview",
//     timeLabel: "Time :"
//   }
// };

// const validationSchema = Yup.object({
//   name: Yup.string().required('नाव आवश्यक आहे'),
//   mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'अवैध मोबाईल').required('आवश्यक'),
//   address: Yup.string().required('पत्ता आवश्यक आहे'),
//   pincode: Yup.string().matches(/^\d{6}$/, '६ अंक').required('आवश्यक'),
//   taluka: Yup.string().required('तालुका निवडा'),
//   policeStation: Yup.string().required('पोलीस स्टेशन निवडा'),
//   meetingPerson: Yup.string().required('भेटीची व्यक्ती लिहा'),
//   visitReason: Yup.string().required('कारण निवडा'),
//   photo: Yup.string().required('फोटो आवश्यक आहे'),
// });

// const EntryForm = () => {
//   const [lang, setLang] = useState('mr');
//   const [showWebcam, setShowWebcam] = useState(false);
//   const [capturedPhoto, setCapturedPhoto] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const webcamRef = useRef(null);
//   const t = texts[lang];
//   const reasons = lang === 'mr' ? visitReasonsMr : visitReasonsEn;

//   const now = new Date();
//   const dateTime = now.toLocaleString('en-IN', {
//     day: '2-digit', month: '2-digit', year: 'numeric',
//     hour: '2-digit', minute: '2-digit'
//   }).replace(',', ' |');

//   const capture = () => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (imageSrc) {
//       setCapturedPhoto(imageSrc);
//       setShowWebcam(false);
//       formik.setFieldValue('photo', imageSrc);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedPhoto(reader.result);
//         formik.setFieldValue('photo', reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       name: '', mobile: '', address: '', pincode: '', taluka: '',
//       policeStation: '', meetingPerson: '', visitReason: '', photo: ''
//     },
//     validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       setLoading(true);
//       setSuccess(false);
//       setError('');

//       try {
//         const response = await fetch(values.photo);
//         const blob = await response.blob();
//         const file = new File([blob], "visitor_photo.jpg", { type: "image/jpeg" });

//         const formData = new FormData();
//         formData.append('fullName', values.name);
//         formData.append('mobileNumber', values.mobile);
//         formData.append('fullAddress', values.address);
//         formData.append('pincode', values.pincode);
//         formData.append('district', 'ठाणे');
//         formData.append('taluka', values.taluka);
//         formData.append('policeStation', values.policeStation);
//         formData.append('contactPerson', values.meetingPerson);
//         formData.append('reasonToVisit', values.visitReason);
//         formData.append('visitorPhoto', file);
//         formData.append('feedbackGiven', 'false');

//         await axios.post(`${baseUrl}/addVisitor`, formData);

//         setSuccess(true);
//         resetForm();
//         setCapturedPhoto('');
//         setTimeout(() => setSuccess(false), 6000);

//       } catch (err) {
//         const msg = err.response?.data?.message || 'काहीतरी चुकले!';
//         setError(lang === 'mr' ? `त्रुटी: ${msg}` : `Error: ${msg}`);
//         setTimeout(() => setError(''), 8000);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh', pt: 8 }}>
//       <Box sx={{ bgcolor: '#0040B9', color: 'white', py: 3, textAlign: 'center', position: 'relative' }}>
//         <Typography variant="h4" fontWeight="bold">ठाणे ग्रामीण पोलीस</Typography>
//         <Typography variant="h6" sx={{ opacity: 0.9 }}>{t.subtitle}</Typography>

//         <ToggleButtonGroup value={lang} exclusive onChange={(_, v) => v && setLang(v)}
//           sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'white', borderRadius: 3 }}>
//           <ToggleButton value="mr" sx={{ color: lang === 'mr' ? '#0040B9' : '#666', fontWeight: 'bold' }}>मराठी</ToggleButton>
//           <ToggleButton value="en" sx={{ color: lang === 'en' ? '#0040B9' : '#666', fontWeight: 'bold' }}>English</ToggleButton>
//         </ToggleButtonGroup>
//       </Box>

//       <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
//         {success && <Alert severity="success" sx={{ mb: 3 }}>अभ्यागताची नोंद यशस्वी झाली!</Alert>}
//         {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

//         <form onSubmit={formik.handleSubmit}>
//           <Grid container spacing={4}>
//             {/* Left Form */}
//             <Grid item xs={12} md={6}>
//               <Paper elevation={12} sx={{ borderRadius: 4, p: 4, border: '3px solid #0040B9' }}>
//                 <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>{t.visitorDetails}</Typography>
//                 <Grid container spacing={2.5}>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label={t.name} name="name" value={formik.values.name} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label={t.mobile} name="mobile" value={formik.values.mobile} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12}><TextField fullWidth label={t.address} multiline rows={2} name="address" value={formik.values.address} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label={t.pincode} name="pincode" value={formik.values.pincode} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label={t.district} value="ठाणे / Thane" disabled /></Grid>

//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth><InputLabel>{t.taluka}</InputLabel>
//                       <Select name="taluka" value={formik.values.taluka} onChange={formik.handleChange} required>
//                         {talukas.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
//                       </Select>
//                     </FormControl>
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth>
//                       <InputLabel>{t.policeStation}</InputLabel>
//                       <Select name="policeStation" value={formik.values.policeStation} onChange={formik.handleChange} required>
//                         <MenuItem value="" disabled><em>— स्टेशन निवडा —</em></MenuItem>
//                         {policeStations.map(st => <MenuItem key={st} value={st}>{st}</MenuItem>)}
//                       </Select>
//                     </FormControl>
//                   </Grid>

//                   <Grid item xs={12} sm={6}><TextField fullWidth label={t.meetingPerson} name="meetingPerson" value={formik.values.meetingPerson} onChange={formik.handleChange} required /></Grid>
                 
//                   <Grid item xs={12} sm={6}><TextField fullWidth label={t.visitReason} name="visitReason" value={formik.values.visitReason} onChange={formik.handleChange} required /></Grid>

//                   {/* <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth><InputLabel>{t.visitReason}</InputLabel>
//                       <Select name="visitReason" value={formik.values.visitReason} onChange={formik.handleChange} required>
//                         {reasons.map((r, i) => <MenuItem key={i} value={r}>{r}</MenuItem>)}
//                       </Select>
//                     </FormControl>
//                   </Grid> */}

//                   <Grid item xs={12}>
//                     <Button fullWidth variant="contained" type="submit" size="large"
//                       disabled={loading || !capturedPhoto}
//                       sx={{ py: 2.5, fontSize: '1.4rem', fontWeight: 'bold', bgcolor: '#0040B9' }}>
//                       {loading ? <CircularProgress size={28} color="inherit" /> : t.submitBtn}
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* Right Photo Section */}
//             <Grid item xs={12} md={6}>
//               <Card elevation={16} sx={{ borderRadius: 4, textAlign: 'center', bgcolor: '#f8fbff', border: '4px solid #0040B9' }}>
//                 <CardContent sx={{ pt: 5 }}>
//                   <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>{t.photoTitle}</Typography>

//                   {!capturedPhoto ? (
//                     <Box sx={{ my: 4 }}>
//                       <Avatar sx={{ width: 240, height: 240, mx: 'auto', bgcolor: '#e3e8f5', border: '8px dashed #0040B9' }}>
//                         <PhotoCamera sx={{ fontSize: 90, color: '#0040B9' }} />
//                       </Avatar>
//                       <Box sx={{ mt: 3 }}>
//                         <Button variant="contained" startIcon={<PhotoCamera />} onClick={() => setShowWebcam(true)} sx={{ mr: 2, bgcolor: '#0040B9', px: 4 }}>{t.webcamBtn}</Button>
//                         <Button variant="outlined" component="label" sx={{ px: 4 }}>
//                           {t.uploadBtn} <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
//                         </Button>
//                       </Box>
//                     </Box>
//                   ) : (
//                     <Box sx={{ my: 3 }}>
//                       <img src={capturedPhoto} alt="Visitor" style={{ width: 260, height: 260, objectFit: 'cover', borderRadius: '50%', border: '10px solid #0040B9' }} />
//                       <br /><br />
//                       <Button variant="text" color="error" onClick={() => { setCapturedPhoto(''); formik.setFieldValue('photo', ''); }}>
//                         {t.changePhoto}
//                       </Button>
//                     </Box>
//                   )}

//                   {showWebcam && (
//                     <Box sx={{ mt: 4 }}>
//                       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={320} height={320}
//                         style={{ borderRadius: '50%', border: '8px solid #0040B9' }} />
//                       <Box mt={3}>
//                         <Button variant="contained" color="success" onClick={capture} sx={{ mr: 2 }}>{t.captureBtn}</Button>
//                         <Button variant="outlined" onClick={() => setShowWebcam(false)}>{t.cancelBtn}</Button>
//                       </Box>
//                     </Box>
//                   )}

//                   {formik.values.name && (
//                     <Paper elevation={8} sx={{ mt: 5, p: 3, bgcolor: '#e3edff', borderRadius: 3 }}>
//                       <Typography fontWeight="bold" color="#0040B9">{t.livePreview}</Typography>
//                       <Typography><strong>नाव :</strong> {formik.values.name}</Typography>
//                       <Typography><strong>मोबाईल :</strong> {formik.values.mobile}</Typography>
//                       <Typography><strong>तालुका :</strong> {formik.values.taluka || '-'}</Typography>
//                       <Typography><strong>पोलीस स्टेशन :</strong> {formik.values.policeStation || '-'}</Typography>
//                       <Typography><strong>भेट :</strong> {formik.values.meetingPerson || '-'}</Typography>
//                       <Typography><strong>कारण :</strong> {formik.values.visitReason || '-'}</Typography>
//                       <Typography><strong>{t.timeLabel}</strong> {dateTime}</Typography>
//                     </Paper>
//                   )}
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </form>
//       </Container>
//     </Box>
//   );
// };

// export default EntryForm;

// =============================================




// import React, { useState, useRef } from 'react';
// import {
//   Box, Typography, TextField, Button, Container, Paper, Grid, FormControl,
//   InputLabel, Select, MenuItem, Card, CardContent, Avatar, ToggleButton, ToggleButtonGroup,
//   CircularProgress, Alert
// } from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import Webcam from 'react-webcam';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import thanegramin from '../Images/thanegramin.jpeg'

// // const talukas = ["Thane", "Ulhasnagar", "Kalyan", "Bhiwandi", "Ambarnath", "Murbad", "Shahapur"];

// // const visitReasonsMr = ["तक्रार नोंद", "FIR", "चौकशी", "दस्तऐवज", "पास", "भेट", "इतर"];
// // const visitReasonsEn = ["Complaint", "FIR", "Inquiry", "Documents", "Pass", "Meeting", "Other"];


// const visitReasonsEn = ["तक्रार नोंद", "पहिली तक्रार", "चौकशी", "दस्तऐवज", "पास", "भेट", "इतर"];
// const visitReasonsMr = ["तक्रार नोंद", "पहिली तक्रार", "चौकशी", "दस्तऐवज", "पास", "भेट", "इतर"];

// const policeStations = [
//   "भिवंडी तालुका", "गणेशपुरी", "कल्याण तालुका", "कसारा", "किन्हवली",
//   "कुलगाव", "मुरबाड", "पडघा", "शहापूर", "टोकावडे", "वासिंद"
// ];



// const spofficebr = [
//   "Home Department", "Crime", "Local Crime Branch (LCB)", "Economic Offences Wing (EOW)", "District Special Branch (DSB)",
//   "Police Communication & Information Technology", "Passport", "Police Verification"
// ];

// const texts = {
//   mr: {
//     subtitle: "नोंदणी फॉर्म",
//     visitorDetails: "अभ्यागत तपशील",
//     name: "पूर्ण नाव *",
//     mobile: "मोबाईल नंबर *",
//     address: "पूर्ण पत्ता *",
//     pincode: "पिनकोड *",
//     // taluka: "तालुका *",
//     district: "जिल्हा",
//     policeStation: "पोलीस स्टेशन *",
//     meetingPerson: "भेटीची व्यक्ती *",
//     visitReason: "भेटीचे कारण *",
//     spOfficeBranch:"पोलीस अधीक्षक कार्यालय विभाग",
//     photoTitle: "अभ्यागत फोटो",
//     webcamBtn: "वेबकॅम",
//     uploadBtn: "अपलोड",
//     changePhoto: "फोटो बदला",
//     captureBtn: "कॅप्चर",
//     cancelBtn: "रद्द",
//     submitBtn: "एंट्री सबमिट करा | Submit Entry",
//     livePreview: "लाइव्ह एंट्री प्रीव्ह्यू",
//     timeLabel: "वेळ :"
//   },
//   en: {
//     subtitle: "Visitor Entry Registration",
//     visitorDetails: "Visitor Details",
//     name: "Full Name *",
//     mobile: "Mobile Number *",
//     address: "Full Address *",
//     pincode: "Pincode *",
//     // taluka: "Taluka *",
//     district: "District",
//     policeStation: "Police Station *",
//     meetingPerson: "Person to Meet *",
//     visitReason: "Purpose of Visit *",
//     spOfficeBranch:"SP office branch",
//     photoTitle: "Visitor Photo",
//     webcamBtn: "Webcam",
//     uploadBtn: "Upload",
//     changePhoto: "Change Photo",
//     captureBtn: "Capture",
//     cancelBtn: "Cancel",
//     submitBtn: "Submit Entry | एंट्री सबमिट करा",
//     livePreview: "Live Entry Preview",
//     timeLabel: "Time :"
//   }
// };

// const validationSchema = Yup.object({
//   name: Yup.string().required('नाव आवश्यक आहे'),
//   mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'अवैध मोबाईल').required('आवश्यक'),
//   address: Yup.string().required('पत्ता आवश्यक आहे'),
//   pincode: Yup.string().matches(/^\d{6}$/, '६ अंक').required('आवश्यक'),
//   // taluka: Yup.string().required('तालुका निवडा'),
//   policeStation: Yup.string().required('पोलीस स्टेशन निवडा'),
//   meetingPerson: Yup.string().required('भेटीची व्यक्ती लिहा'),
//   visitReason: Yup.string().required('कारण निवडा'),
//   photo: Yup.string().required('फोटो आवश्यक आहे'),
// });






// const printVisitorPass = (data) => {
//   // Generate current date and time
//   const now = new Date();
//   const date = now.toLocaleDateString('en-IN'); // 28/11/2025
//   const time = now.toLocaleTimeString('en-IN', { 
//     hour: '2-digit', 
//     minute: '2-digit',
//     hour12: true 
//   }); // 11:48 am
//   const dateTime = `${date} | ${time}`;

//   const printWindow = window.open('', '', 'width=620,height=1020');

//   printWindow.document.write(`
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <title>Visitor Pass</title>
//       <style>
//         @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700&display=swap');
        
//         * { margin: 0; padding: 0; box-sizing: border-box; }
        
//         body { 
//           margin: 0; 
//           padding: 0; 
//           background: white; 
//           font-family: 'Mukta', sans-serif;
//         }
        
//         .page {
//           width: 100%;
//           height: 100vh;
//           position: relative;
//         }
        
//         .card {
//           width: 100%;
//           height: 50vh;
//           background: white;
//           border: 8px solid #1e3a8a;
//           border-radius: 0;
//         }
        
//         .header {
//           background: linear-gradient(135deg, #1e3a8a, #1e40af);
//           color: white;
//           text-align: center;
//           padding: 15px 20px;
//           border-bottom: 4px solid #fbbf24;
//         }
        
//         .header-top {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 20px;
//           margin-bottom: 8px;
//         }

//                 .logo {
//           width: 70px;
//           height: 70px;
//           border-radius: 50%;
//           border: 4px solid white;
//           object-fit: contain;
//           background: white;
//         }
        
        
//         .header-text {
//           text-align: left;
//         }
        
//         .title {
//           font-size: 28px;
//           font-weight: 700;
//           margin-bottom: 2px;
//           text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
//         }
        
//         .subtitle {
//           font-size: 16px;
//           opacity: 0.95;
//           font-weight: 500;
//         }
        
//         .pass-type {
//           background: #fbbf24;
//           color: #1e3a8a;
//           font-size: 22px;
//           font-weight: 700;
//           padding: 8px 20px;
//           margin: 8px auto 0;
//           display: inline-block;
//           border-radius: 25px;
//           text-transform: uppercase;
//         }
        
//         .content {
//           display: flex;
//           padding: 20px 30px;
//           gap: 25px;
//           align-items: flex-start;
//         }
        
//         .photo-section {
//           flex-shrink: 0;
//         }
        
//         .photo {
//           width: 130px;
//           height: 130px;
//           border-radius: 12px;
//           object-fit: cover;
//           border: 5px solid #1e3a8a;
//           box-shadow: 0 8px 20px rgba(0,0,0,0.2);
//           background: #f3f4f6;
//         }
        
//         .details {
//           flex: 1;
//           padding-top: 5px;
//         }
        
//         .row {
//           display: flex;
//           margin-bottom: 12px;
//           font-size: 16px;
//           line-height: 1.4;
//         }
        
//         .label {
//           font-weight: 700;
//           color: #1e3a8a;
//           min-width: 90px;
//           flex-shrink: 0;
//         }
        
//         .value {
//           color: #1f2937;
//           font-weight: 500;
//         }
        
//         .footer {
//           background: #1e3a8a;
//           color: white;
//           padding: 12px 30px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           position: absolute;
//           bottom: 0;
//           width: 100%;
//           border-top: 4px solid #fbbf24;
//         }
        
//         .entry-time {
//           font-size: 16px;
//           font-weight: 600;
//         }
        
//         .signatures {
//           display: flex;
//           gap: 25px;
//           padding: 0 30px 15px;
//           border-top: 2px dashed #cbd5e1;
//           margin-top: 15px;
//           padding-top: 15px;
//         }
        
//         .sign-box {
//           flex: 1;
//           text-align: center;
//         }
        
//         .sign-line {
//           border-bottom: 2px solid #1e3a8a;
//           height: 35px;
//           margin-bottom: 5px;
//         }
        
//         .sign-label {
//           font-size: 12px;
//           color: #1e3a8a;
//           font-weight: 600;
//         }
        
//         @media print {
//           body { background: white; }
//           .card { border: 6px solid #1e3a8a; }
//           @page { margin: 0; size: portrait; }
//         }
//       </style>
//     </head>
//     <body onload="window.print(); setTimeout(()=>window.close(),1200)">
//       <div class="page">
//         <div class="card">
//           <div class="header">
//             <div class="header-top">
//              <img src="${thanegramin}" class="logo" alt="Logo" />
//               <div class="header-text">
//                 <div class="title">ठाणे ग्रामीण पोलीस</div>
//                 <div class="subtitle">Thane Rural Police</div>
//               </div>
//             </div>
//             <div class="pass-type">अभ्यागत पावती</div>
//           </div>
          
//           <div class="content">
//             <div class="photo-section">
//               <img src="${data.photo}" class="photo" alt="Visitor" />
//             </div>
            
//             <div class="details">
//               <div class="row">
//                 <span class="label">नाव :</span>
//                 <span class="value">${data.name}</span>
//               </div>
//               <div class="row">
//                 <span class="label">मोबाईल :</span>
//                 <span class="value">${data.mobile}</span>
//               </div>
//               <div class="row">
//                 <span class="label">दिनांक - वेळ :</span>
//                 <span class="value">${dateTime}</span>
//               </div>
//               <div class="row">
//                 <span class="label">पत्ता :</span>
//                 <span class="value">${data.address}</span>
//               </div>
//               <div class="row">
//                 <span class="label">कोणास भेटायचे? :</span>
//                 <span class="value">${data.meetingPerson}</span>
//               </div>
//               <div class="row">
//                 <span class="label">भेटण्याचे कारण? :</span>
//                 <span class="value">${data.visitReason}</span>
//               </div>
//               <div class="row">
//                 <span class="label">पोलीस स्टेशन हद्द :</span>
//                 <span class="value">${data.policeStation}</span>
//               </div>
//             </div>
//           </div>
          
//           <div class="signatures">
//             <div class="sign-box">
//               <div class="sign-line"></div>
//               <div class="sign-label">अभ्यागत स्वाक्षरी</div>
//             </div>
//             <div class="sign-box">
//               <div class="sign-line"></div>
//               <div class="sign-label">स्वागतकर्ता स्वाक्षरी व शिक्का</div>
//             </div>
//             <div class="sign-box">
//               <div class="sign-line"></div>
//               <div class="sign-label">भेट देणारे अधिकारी ची स्वाक्षरी</div>
//             </div>
//           </div>
          
//           <div class="footer">
           
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>
//   `);

//   printWindow.document.close();
// };



// const EntryForm = () => {
//   const [lang, setLang] = useState('mr'); // मराठी डिफॉल्ट
//   const [showWebcam, setShowWebcam] = useState(false);
//   const [capturedPhoto, setCapturedPhoto] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const webcamRef = useRef(null);
//   const t = texts[lang];
//   const reasons = lang === 'mr' ? visitReasonsMr : visitReasonsEn;
// // ++++

//   const now = new Date();
//   const dateTime = now.toLocaleString('en-IN', {
//     day: '2-digit', month: '2-digit', year: 'numeric',
//     hour: '2-digit', minute: '2-digit'
//   }).replace(',', ' |');

//   const capture = () => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (imageSrc) {
//       setCapturedPhoto(imageSrc);
//       setShowWebcam(false);
//       formik.setFieldValue('photo', imageSrc);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedPhoto(reader.result);
//         formik.setFieldValue('photo', reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       name: '', mobile: '', address: '', pincode: '', 
//       policeStation: '', meetingPerson: '', visitReason: '',spOfficeBranch:'', photo: ''
//     },
//     validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       setLoading(true);
//       setSuccess(false);
//       setError('');

//       try {
//         const response = await fetch(values.photo);
//         const blob = await response.blob();
//         const file = new File([blob], "visitor_photo.jpg", { type: "image/jpeg" });

//         const formData = new FormData();
//         formData.append('fullName', values.name);
//         formData.append('mobileNumber', values.mobile);
//         formData.append('fullAddress', values.address);
//         formData.append('pincode', values.pincode);
//         formData.append('district', 'ठाणे');
//         // formData.append('taluka', values.taluka);
//         formData.append('policeStation', values.policeStation);
//         formData.append('contactPerson', values.meetingPerson);
//         formData.append('reasonToVisit', values.visitReason);
//         formData.append('visitorPhoto', file);
//         formData.append('feedbackGiven', 'false');

//         await axios.post(`${baseUrl}/addVisitor`, formData);

//         setSuccess(true);
//         resetForm();
//         setCapturedPhoto('');
//         setTimeout(() => setSuccess(false), 6000);

//         printVisitorPass(values, dateTime);




//       } catch (err) {
//         const msg = err.response?.data?.message || 'काहीतरी चुकले!';
//         setError(lang === 'mr' ? `त्रुटी: ${msg}` : `Error: ${msg}`);
//         setTimeout(() => setError(''), 8000);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <Box sx={{ bgcolor: '#f0f4f8',mt:15 }}>
//       {/* Header with Language Toggle */}
//       <Box sx={{ bgcolor: '#0040B9', color: 'white', py: 3, textAlign: 'center', position: 'relative' }}>
//         {/* <Typography variant="h4" fontWeight="bold">ठाणे ग्रामीण पोलीस</Typography> */}
//         <Typography variant="h6" sx={{ opacity: 0.9 }}>{t.subtitle}</Typography>

//         {/* Language Toggle - Top Right */}
//         <ToggleButtonGroup
//           value={lang}
//           exclusive
//           onChange={(_, newLang) => newLang && setLang(newLang)}
//           sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'white', borderRadius: 3 }}
//         >
//           <ToggleButton value="mr" sx={{ color: lang === 'mr' ? '#0040B9' : '#666', fontWeight: 'bold' }}>
//             मराठी
//           </ToggleButton>
//           <ToggleButton value="en" sx={{ color: lang === 'en' ? '#0040B9' : '#666', fontWeight: 'bold' }}>
//             English
//           </ToggleButton>
//         </ToggleButtonGroup>
//       </Box>

//       <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
//         {success && <Alert severity="success" sx={{ mb: 3 }}>अभ्यागताची नोंद यशस्वी झाली!</Alert>}
//         {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

//         <form onSubmit={formik.handleSubmit}>
//           <Grid container spacing={4}>
//             {/* Left Form */}
//             <Grid item xs={12} md={6}>
//               <Paper elevation={12} sx={{ borderRadius: 4, p: 4, border: '3px solid #0040B9' }}>
//                 <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>{t.visitorDetails}</Typography>
//                 <Grid container spacing={2.5}>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label={t.name} name="name" value={formik.values.name} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label={t.mobile} name="mobile" value={formik.values.mobile} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12}><TextField fullWidth label={t.address} multiline rows={2} name="address" value={formik.values.address} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label={t.pincode} name="pincode" value={formik.values.pincode} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label={t.district} value="ठाणे / Thane" disabled /></Grid>

//                   {/* <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth>
//                       <InputLabel>{t.taluka}</InputLabel>
//                       <Select name="taluka" value={formik.values.taluka} onChange={formik.handleChange} required>
//                         {talukas.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
//                       </Select>
//                     </FormControl>
//                   </Grid> */}

//                   {/* तालुका - आता Pincode सारखंच दिसेल */}
// {/* <Grid item xs={12} sm={6}>
//   <TextField
//     select
//     fullWidth
//     label={t.taluka}
//     name="taluka"
//     value={formik.values.taluka}
//     onChange={formik.handleChange}
//     required
//     SelectProps={{ native: false }}
//     InputLabelProps={{ shrink: true }}
//   >
//     <MenuItem value="" disabled>
//       <em>— तालुका निवडा —</em>
//     </MenuItem>
//     {talukas.map((taluka) => (
//       <MenuItem key={taluka} value={taluka}>
//         {taluka}
//       </MenuItem>
//     ))}
//   </TextField>
// </Grid> */}

// {/* पोलीस स्टेशन - आता Pincode सारखंच दिसेल */}
// <Grid item xs={12} sm={6}>
//   <TextField
//     select
//     fullWidth
//     label={t.policeStation}
//     name="policeStation"
//     value={formik.values.policeStation}
//     onChange={formik.handleChange}
//     required
//     SelectProps={{ native: false }}
//     InputLabelProps={{ shrink: true }}
//   >
//     <MenuItem value="" disabled>
//       <em>—पोलीस स्टेशन निवडा —</em>
//     </MenuItem>
//     {policeStations.map((station) => (
//       <MenuItem key={station} value={station}>
//         {station}
//       </MenuItem>
//     ))}
//   </TextField>
// </Grid>

//                   {/* <Grid item xs={12} sm={6}><TextField fullWidth label={t.meetingPerson} name="meetingPerson" value={formik.values.meetingPerson} onChange={formik.handleChange} required /></Grid> */}


// <Grid item xs={12} sm={6}>
//   <TextField
//     select
//     fullWidth
//     label="कोणास भेटायचे"
//     name="meetingPerson"
//     value={formik.values.meetingPerson}
//     onChange={formik.handleChange}
//     required
//     SelectProps={{
//       native: false,
//       // Optional: Add MenuProps for better styling if needed
//       MenuProps: {
//         PaperProps: {
//           style: {
//             maxHeight: 300,
//           },
//         },
//       },
//     }}
//     InputLabelProps={{ shrink: true }}
//   >
//     <MenuItem value="" disabled>
//       <em>—अधिकारी निवडा—</em>
//     </MenuItem>
    
//     <MenuItem value="Superintendent of Police">पोलीस अधीक्षक</MenuItem>
//     <MenuItem value="Additional Superintendent of Police">अपर पोलीस अधीक्षक </MenuItem>
//     <MenuItem value="Sub-Divisional Officer, Ganeshpuri">उप विभागीय अधिकारी गणेशपुरी</MenuItem>
//     <MenuItem value="Sub-Divisional Officer, Shahapur">उप विभागीय अधिकारी शहापूर </MenuItem>
//     <MenuItem value="Sub-Divisional Officer, Murbad">उप विभागीय अधिकारी मुरबाड </MenuItem>
//     <MenuItem value="Sub-Divisional Officer, Home Department">उप विभागीय अधिकारी गृह </MenuItem>
//     <MenuItem value="In-Charge Officer">प्रभारी अधिकारी</MenuItem>
//     <MenuItem value="पोलीस निरीक्षक">पोलीस निरीक्षक</MenuItem>
//   </TextField>
// </Grid>




//                   {/* <Grid item xs={12} sm={6}><TextField fullWidth label={t.visitReason} name="visitReason" value={formik.values.visitReason} onChange={formik.handleChange} required /></Grid> */}


//                                     {/* <Grid item xs={12} sm={6}><TextField fullWidth label={t.meetingPerson} name="meetingPerson" value={formik.values.meetingPerson} onChange={formik.handleChange} /></Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth><InputLabel>{t.visitReason}</InputLabel>
//                     <Select name="visitReason" value={formik.values.visitReason} onChange={formik.handleChange}>
//                       {reasons.map((r, i) => <MenuItem key={i} value={r}>{r}</MenuItem>)}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button fullWidth variant="contained" type="submit" size="large"
//                     sx={{ py: 2.2, fontSize: '1.25rem', fontWeight: 'bold', bgcolor: '#0040B9' }}>
//                     {t.submitBtn}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Paper>
//           </Grid> */}

//                   {/* <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth>
//                       <InputLabel>{t.visitReason}</InputLabel>
//                       <Select name="visitReason" value={formik.values.visitReason} onChange={formik.handleChange} required>
//                         {reasons.map((r, i) => <MenuItem key={i} value={r}>{r}</MenuItem>)}
//                       </Select>
//                     </FormControl>
//                   </Grid> */}




// <Grid item xs={12} sm={6}>
//   <TextField
//     select
//     fullWidth
//     label={t.visitReason}
//     name="visitReason"
//     value={formik.values.visitReason}
//     onChange={formik.handleChange}
//     required
//     SelectProps={{
//       native: false,
//       // Optional: Add MenuProps for better styling if needed
//       MenuProps: {
//         PaperProps: {
//           style: {
//             maxHeight: 300,
//           },
//         },
//       },
//     }}
//     InputLabelProps={{ shrink: true }}
//   >
//     <MenuItem value="" disabled>
//       <em>—भेटीचे कारण निवडा—</em>
//     </MenuItem>
//     <MenuItem value="Complaint">तक्रार नोंद</MenuItem>
//     <MenuItem value="FIR">पहिली तक्रार</MenuItem>
//     <MenuItem value="Inquiry">चौकशी</MenuItem>
//     <MenuItem value="Documents">दस्तऐवज</MenuItem>
//     <MenuItem value="Pass">पास</MenuItem>
//     <MenuItem value="Meeting">भेट</MenuItem>
//     <MenuItem value="Other">इतर</MenuItem>
//   </TextField>
// </Grid>


// <Grid item xs={12} sm={6}>
//   <TextField
//     select
//     fullWidth
//     label="पोलीस अधीक्षक कार्यालय शाखा"
//     name="spOfficeBranch"
//     value={formik.values.spOfficeBranch}
//     onChange={formik.handleChange}
//     required
//     SelectProps={{
//       native: false,
//       // Optional: Add MenuProps for better styling if needed
//       MenuProps: {
//         PaperProps: {
//           style: {
//             maxHeight: 300,
//           },
//         },
//       },
//     }}
//     InputLabelProps={{ shrink: true }}
//   >
//     <MenuItem value="" disabled>
//       <em>—पोलीस अधीक्षक कार्यालय शाखा निवडा—</em>
//     </MenuItem>


//     <MenuItem value="Home Department">गृह विभाग</MenuItem>
//     <MenuItem value="Crime">गुन्हे</MenuItem>
//     <MenuItem value="Local Crime Branch (LCB)">स्थानिक गुन्हे शाखा</MenuItem>
//     <MenuItem value="Economic Offences Wing (EOW)">आर्थिक गुन्हे शाखा </MenuItem>
//     <MenuItem value="District Special Branch (DSB)">जिल्हा विशेष शाखा </MenuItem>
//     <MenuItem value="Police Communication & Information Technology">पोलीस दळणवळण व माहिती तंत्रज्ञान </MenuItem>
//     <MenuItem value="Passport">पासपोर्ट </MenuItem>
//      <MenuItem value="Passport">पोलीस तपासणी</MenuItem>
//   </TextField>
// </Grid>



//                   <Grid item xs={12}>
//                     <Button
//                       fullWidth variant="contained" type="submit" size="large"
//                       disabled={loading || !capturedPhoto}
//                       sx={{ py: 2.5, fontSize: '1.4rem', fontWeight: 'bold', bgcolor: '#0040B9' }}
//                     >
//                       {loading ? <CircularProgress size={28} color="inherit" /> : t.submitBtn}
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* Right Photo + Live Preview */}
//             <Grid item xs={12} md={6}>
//               <Card elevation={16} sx={{ borderRadius: 4, textAlign: 'center', bgcolor: '#f8fbff', border: '4px solid #0040B9' }}>
//                 <CardContent sx={{ pt: 5 }}>
//                   <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>{t.photoTitle}</Typography>

//                   {!capturedPhoto ? (
//                     <Box sx={{ my: 4 }}>
//                       <Avatar sx={{ width: 240, height: 240, mx: 'auto', bgcolor: '#e3e8f5', border: '8px dashed #0040B9' }}>
//                         <PhotoCamera sx={{ fontSize: 90, color: '#0040B9' }} />
//                       </Avatar>
//                       <Box sx={{ mt: 3 }}>
//                         <Button variant="contained" startIcon={<PhotoCamera />} onClick={() => setShowWebcam(true)}
//                           sx={{ mr: 2, bgcolor: '#0040B9', px: 4 }}>{t.webcamBtn}</Button>
//                         <Button variant="outlined" component="label" sx={{ px: 4 }}>
//                           {t.uploadBtn} <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
//                         </Button>
//                       </Box>
//                     </Box>
//                   ) : (
//                     <Box sx={{ my: 3 }}>
//                       <img src={capturedPhoto} alt="Visitor" style={{ width: 260, height: 260, objectFit: 'cover', borderRadius: '50%', border: '10px solid #0040B9' }} />
//                       <br /><br />
//                       <Button variant="text" color="error" onClick={() => { setCapturedPhoto(''); formik.setFieldValue('photo', ''); }}>
//                         {t.changePhoto}
//                       </Button>
//                     </Box>
//                   )}

//                   {showWebcam && (
//                     <Box sx={{ mt: 4 }}>
//                       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={320} height={320}
//                         style={{ borderRadius: '50%', border: '8px solid #0040B9' }} />
//                       <Box mt={3}>
//                         <Button variant="contained" color="success" onClick={capture} sx={{ mr: 2 }}>{t.captureBtn}</Button>
//                         <Button variant="outlined" onClick={() => setShowWebcam(false)}>{t.cancelBtn}</Button>
//                       </Box>
//                     </Box>
//                   )}

//                   {/* Live Preview */}
//                   {formik.values.name && (
//                     <Paper elevation={8} sx={{ mt: 5, p: 3, bgcolor: '#e3edff', borderRadius: 3 }}>
//                       <Typography fontWeight="bold" color="#0040B9">{t.livePreview}</Typography>
//                       <Typography><strong>नाव :</strong> {formik.values.name}</Typography>
//                       <Typography><strong>मोबाईल :</strong> {formik.values.mobile}</Typography>
//                       {/* <Typography><strong>तालुका :</strong> {formik.values.taluka || '-'}</Typography> */}
//                       <Typography><strong>पोलीस स्टेशन :</strong> {formik.values.policeStation || '-'}</Typography>
//                       <Typography><strong>भेट :</strong> {formik.values.meetingPerson || '-'}</Typography>
//                       <Typography><strong>कारण :</strong> {formik.values.visitReason || '-'}</Typography>
//                        <Typography><strong>पोलीस अधीक्षक कार्यालय विभाग :</strong> {formik.values.spOfficeBranch || '-'}</Typography>
//                       <Typography><strong>{t.timeLabel}</strong> {dateTime}</Typography>
//                     </Paper>
//                   )}
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </form>
//       </Container>
//     </Box>
//   );
// };

// export default EntryForm;





// =============================================================

// New updated code

// import React, { useState, useRef } from 'react';
// import {
//   Box, Typography, TextField, Button, Container, Paper, Grid, FormControl,
//   InputLabel, Select, MenuItem, Card, CardContent, Avatar, ToggleButton, ToggleButtonGroup,
//   CircularProgress, Alert, IconButton
// } from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import Webcam from 'react-webcam';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import thanegramin from '../Images/thanegramin.jpeg';

// const visitReasonsEn = ["तक्रार नोंद", "पहिली तक्रार", "चौकशी", "दस्तऐवज", "पास", "भेट", "इतर"];
// const visitReasonsMr = ["तक्रार नोंद", "पहिली तक्रार", "चौकशी", "दस्तऐवज", "पास", "भेट", "इतर"];

// const policeStations = [
//   "भिवंडी तालुका", "गणेशपुरी", "कल्याण तालुका", "कसारा", "किन्हवली",
//   "कुलगाव", "मुरबाड", "पडघा", "शहापूर", "टोकावडे", "वासिंद"
// ];

// const texts = {
//   mr: {
//     subtitle: "नोंदणी फॉर्म",
//     visitorDetails: "अभ्यागत तपशील",
//     name: "पूर्ण नाव *",
//     mobile: "मोबाईल नंबर *",
//     address: "पूर्ण पत्ता *",
//     pincode: "पिनकोड *",
//     district: "जिल्हा",
//     policeStation: "पोलीस स्टेशन *",
//     meetingPerson: "भेटीची व्यक्ती *",
//     visitReason: "भेटीचे कारण *",
//     numberOfVisitors: "सोबत किती जण?",
//     uploadDoc: "दस्तऐवज अपलोड (PDF/Image)",
//     photoTitle: "अभ्यागत फोटो",
//     webcamBtn: "वेबकॅम",
//     uploadBtn: "अपलोड",
//     changePhoto: "फोटो बदला",
//     captureBtn: "कॅप्चर",
//     cancelBtn: "रद्द",
//     submitBtn: "एंट्री सबमिट करा | Submit Entry",
//     livePreview: "लाइव्ह एंट्री प्रीव्ह्यू",
//     timeLabel: "वेळ :",
//     appId: "अर्ज क्रमांक :"
//   },
//   en: { /* English version same as before */ }
// };

// const validationSchema = Yup.object({
//   name: Yup.string().required('नाव आवश्यक आहे'),
//   mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'अवैध मोबाईल').required('आवश्यक'),
//   address: Yup.string().required('पत्ता आवश्यक आहे'),
//   pincode: Yup.string().matches(/^\d{6}$/, '६ अंक').required('आवश्यक'),
//   policeStation: Yup.string().required('पोलीस स्टेशन निवडा'),
//   meetingPerson: Yup.string().required('भेटीची व्यक्ती लिहा'),
//   visitReason: Yup.string().required('कारण निवडा'),
//   photo: Yup.string().required('फोटो आवश्यक आहे'),
// });



// // old
// // const printVisitorPass = (data) => {
// //   const now = new Date();
// //   const date = now.toLocaleDateString('en-IN');
// //   const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
// //   const dateTime = `${date} | ${time}`;

// //   const printWindow = window.open('', '', 'width=620,height=1020');
// //   printWindow.document.write(`
// //     <!DOCTYPE html>
// //     <html>
// //     <head>
// //       <meta charset="utf-8">
// //       <title>Visitor Pass</title>
// //       <style>
// //         @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700&display=swap');
// //         * { margin: 0; padding: 0; box-sizing: border-box; }
// //         body { margin: 0; padding: 0; background: white; font-family: 'Mukta', sans-serif; }
// //         .page { width: 100%; height: 100vh; position: relative; }
// //         .card { width: 100%; height: 50vh; background: white; border: 8px solid #1e3a8a; }
// //         .header { background: linear-gradient(135deg, #1e3a8a, #1e40af); color: white; text-align: center; padding: 15px 20px; border-bottom: 4px solid #fbbf24; }
// //         .header-top { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 8px; }
// //         .logo { width: 70px; height: 70px; border-radius: 50%; border: 4px solid white; object-fit: contain; background: white; }
// //         .title { font-size: 28px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
// //         .subtitle { font-size: 16px; opacity: 0.95; font-weight: 500; }
// //         .pass-type { background: #fbbf24; color: #1e3a8a; font-size: 22px; font-weight: 700; padding: 8px 20px; margin: 8px auto 0; display: inline-block; border-radius: 25px; }
// //         .content { display: flex; padding: 20px 30px; gap: 25px; align-items: flex-start; }
// //         .photo { width: 130px; height: 130px; border-radius: 12px; object-fit: cover; border: 5px solid #1e3a8a; box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
// //         .details { flex: 1; padding-top: 5px; }
// //         .row { display: flex; margin-bottom: 12px; font-size: 16px; line-height: 1.4; }
// //         .label { font-weight: 700; color: #1e3a8a; min-width: 120px; }
// //         .value { color: #1f2937; font-weight: 500; }
// //         .appid { font-size: 24px; font-weight: bold; color: #d32f2f; background: #ffebee; padding: 8px 15px; border-radius: 10px; margin: 15px 0; display: inline-block; }
// //         .signatures { display: flex; gap: 25px; padding: 0 30px 15px; border-top: 2px dashed #cbd5e1; margin-top: 15px; padding-top: 15px; }
// //         .sign-box { flex: 1; text-align: center; }
// //         .sign-line { border-bottom: 2px solid #1e3a8a; height: 35px; margin-bottom: 5px; }
// //         .sign-label { font-size: 12px; color: #1e3a8a; font-weight: 600; }
// //         @media print { body { background: white; } .card { border: 6px solid #1e3a8a; } @page { margin: 0; } }
// //       </style>
// //     </head>
// //     <body onload="window.print(); setTimeout(()=>window.close(),1200)">
// //       <div class="page">
// //         <div class="card">
// //           <div class="header">
// //             <div class="header-top">
// //               <img src="${thanegramin}" class="logo" alt="Logo" />
// //               <div style="text-align:left">
// //                 <div class="title">ठाणे ग्रामीण पोलीस</div>
// //                 <div class="subtitle">Thane Rural Police</div>
// //               </div>
// //             </div>
// //             <div class="pass-type">अभ्यागत पावती</div>
// //           </div>
          
// //           <div class="content">
// //             <div><img src="${data.photo}" class="photo" alt="Visitor" /></div>
// //             <div class="details">
// //               <div class="row"><span class="label">अर्ज क्रमांक :</span><span class="appid">${data.applicationId || 'N/A'}</span></div>
// //               <div class="row"><span class="label">नाव :</span><span class="value">${data.name}</span></div>
// //               <div class="row"><span class="label">मोबाईल :</span><span class="value">${data.mobile}</span></div>
// //               <div class="row"><span class="label">दिनांक-वेळ :</span><span class="value">${dateTime}</span></div>
// //               <div class="row"><span class="label">पत्ता :</span><span class="value">${data.address}</span></div>
// //               <div class="row"><span class="label">कोणास भेटायचे? :</span><span class="value">${data.meetingPerson}</span></div>
// //               <div class="row"><span class="label">भेटीचे कारण :</span><span class="value">${data.visitReason}</span></div>
// //               <div class="row"><span class="label">स्टेशन हद्द :</span><span class="value">${data.policeStation}</span></div>
// //             </div>
// //           </div>
          
// //           <div class="signatures">
// //             <div class="sign-box"><div class="sign-line"></div><div class="sign-label">अभ्यागत स्वाक्षरी</div></div>
// //             <div class="sign-box"><div class="sign-line"></div><div class="sign-label">स्वागतकर्ता स्वाक्षरी व शिक्का</div></div>
// //             <div class="sign-box"><div class="sign-line"></div><div class="sign-label">भेट देणारे अधिकारी</div></div>
// //           </div>
// //         </div>
// //       </div>
// //     </body>
// //     </html>
// //   `);
// //   printWindow.document.close();
// // };


// const printVisitorPass = (data) => {
//   const now = new Date();
//   const date = now.toLocaleDateString('en-IN');
//   const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
//   const dateTime = `${date} | ${time}`;

//   const printWindow = window.open('', '', 'width=620,height=1020');
//   printWindow.document.write(`
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <title>Visitor Pass</title>
//       <style>
//         @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700&display=swap');
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body { margin: 0; padding: 0; background: white; font-family: 'Mukta', sans-serif; }
//         .page { width: 100%; height: 100vh; position: relative; }
//         .card { width: 100%; height: 50vh; background: white; border: 8px solid #1e3a8a; }
//         .header { background: linear-gradient(135deg, #1e3a8a, #1e40af); color: white; text-align: center; padding: 15px 20px; border-bottom: 4px solid #fbbf24; }
//         .header-top { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 8px; }
//         .logo { width: 70px; height: 70px; border-radius: 50%; border: 4px solid white; object-fit: contain; background: white; }
//         .title { font-size: 28px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
//         .subtitle { font-size: 16px; opacity: 0.95; font-weight: 500; }
//         .pass-type { background: #fbbf24; color: #1e3a8a; font-size: 22px; font-weight: 700; padding: 8px 20px; margin: 8px auto 0; display: inline-block; border-radius: 25px; }
//         .content { display: flex; padding: 20px 30px; gap: 25px; align-items: flex-start; }
//         .photo { width: 130px; height: 130px; border-radius: 12px; object-fit: cover; border: 5px solid #1e3a8a; box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
//         .details { flex: 1; padding-top: 5px; }
//         .row { display: flex; margin-bottom: 12px; font-size: 16px; line-height: 1.4; align-items: center; }
//         .label { font-weight: 700; color: #1e3a8a; min-width: 120px; flex-shrink: 0; }
//         .value { color: #1f2937; font-weight: 500; flex: 1; }
//         .appid { font-size: 20px; font-weight: 700; color: #d32f2f; background: #ffebee; padding: 6px 12px; border-radius: 8px; display: inline-block; }
//         .signatures { display: flex; gap: 25px; padding: 0 30px 15px; border-top: 2px dashed #cbd5e1; margin-top: 15px; padding-top: 15px; }
//         .sign-box { flex: 1; text-align: center; }
//         .sign-line { border-bottom: 2px solid #1e3a8a; height: 35px; margin-bottom: 5px; }
//         .sign-label { font-size: 12px; color: #1e3a8a; font-weight: 600; }
//         @media print { body { background: white; } .card { border: 6px solid #1e3a8a; } @page { margin: 0; } }
//       </style>
//     </head>
//     <body onload="window.print(); setTimeout(()=>window.close(),1200)">
//       <div class="page">
//         <div class="card">
//           <div class="header">
//             <div class="header-top">
//               <img src="${thanegramin}" class="logo" alt="Logo" />
//               <div style="text-align:left">
//                 <div class="title">ठाणे ग्रामीण पोलीस</div>
//                 <div class="subtitle">Thane Rural Police</div>
//               </div>
//             </div>
//             <div class="pass-type">अभ्यागत पावती</div>
//           </div>
          
//           <div class="content">
//             <div><img src="${data.photo}" class="photo" alt="Visitor" /></div>
//             <div class="details">
//               <div class="row"><span class="label">अर्ज क्रमांक :</span><span class="value"><span class="appid">${data.applicationId || 'N/A'}</span></span></div>
//               <div class="row"><span class="label">नाव :</span><span class="value">${data.name}</span></div>
//               <div class="row"><span class="label">मोबाईल :</span><span class="value">${data.mobile}</span></div>
//               <div class="row"><span class="label">दिनांक-वेळ :</span><span class="value">${dateTime}</span></div>
//               <div class="row"><span class="label">पत्ता :</span><span class="value">${data.address}</span></div>
//               <div class="row"><span class="label">कोणास भेटायचे? :</span><span class="value">${data.meetingPerson}</span></div>
//               <div class="row"><span class="label">भेटीचे कारण :</span><span class="value">${data.visitReason}</span></div>
//               <div class="row"><span class="label">पोलीस स्टेशन हद्द :</span><span class="value">${data.policeStation}</span></div>
//             </div>
//           </div>
          
//           <div class="signatures">
//             <div class="sign-box"><div class="sign-line"></div><div class="sign-label">अभ्यागत स्वाक्षरी</div></div>
//             <div class="sign-box"><div class="sign-line"></div><div class="sign-label">स्वागतकर्ता स्वाक्षरी व शिक्का</div></div>
//             <div class="sign-box"><div class="sign-line"></div><div class="sign-label">भेट देणारे अधिकारी</div></div>
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>
//   `);
//   printWindow.document.close();
// };




// const EntryForm = () => {
//   const [lang] = useState('mr');
//   const [showWebcam, setShowWebcam] = useState(false);
//   const [capturedPhoto, setCapturedPhoto] = useState('');
//   const [uploadedDoc, setUploadedDoc] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');
//   const webcamRef = useRef(null);

//   const now = new Date();
//   const dateTime = now.toLocaleString('en-IN', {
//     day: '2-digit', month: '2-digit', year: 'numeric',
//     hour: '2-digit', minute: '2-digit'
//   }).replace(',', ' |');

//   const capture = () => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (imageSrc) {
//       setCapturedPhoto(imageSrc);
//       setShowWebcam(false);
//       formik.setFieldValue('photo', imageSrc);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       name: '', mobile: '', address: '', pincode: '', policeStation: '',
//       meetingPerson: '', visitReason: '', numberOfVisitors: '1', uploadDocument: '', photo: ''
//     },
//     validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       setLoading(true);
//       setError('');

//       try {
//         // Photo (mandatory)
//         if (!values.photo) throw new Error("फोटो आवश्यक आहे");
//         const photoRes = await fetch(values.photo);
//         const photoBlob = await photoRes.blob();
//         const photoFile = new File([photoBlob], "visitor.jpg", { type: "image/jpeg" });

//         // Document (optional)
//         let docFile = null;
//         if (values.uploadDocument) {
//           const docRes = await fetch(values.uploadDocument);
//           const docBlob = await docRes.blob();
//           docFile = new File([docBlob], "document", { type: docBlob.type });
//         }

//         const formData = new FormData();
//         formData.append('fullName', values.name);
//         formData.append('mobileNumber', values.mobile);
//         formData.append('fullAddress', values.address);
//         formData.append('pincode', values.pincode);
//         formData.append('district', 'ठाणे');
//         formData.append('policeStation', values.policeStation);
//         formData.append('contactPerson', values.meetingPerson);
//         formData.append('reasonToVisit', values.visitReason);
//         formData.append('numberOfVisitors', values.numberOfVisitors);
//         formData.append('visitorPhoto', photoFile);
//         if (docFile) formData.append('uploadDocument', docFile);

//         const res = await axios.post(`${baseUrl}/addVisitor`, formData);
//         const applicationId = res.data.applicationId || res.data.newVisit?.applicationId || 'N/A';

//         setSuccess(true);
//         resetForm();
//         setCapturedPhoto('');
//         setUploadedDoc('');
//         setTimeout(() => setSuccess(false), 5000);

//         // Print with applicationId
//         printVisitorPass({ ...values, photo: values.photo, applicationId });

//       } catch (err) {
//         setError(err.response?.data?.message || 'काहीतरी चुकले!');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <Box sx={{ bgcolor: '#f0f4f8', mt: 15 }}>
//       <Box sx={{ bgcolor: '#0040B9', color: 'white', py: 3, textAlign: 'center' }}>
//         <Typography variant="h6">नोंदणी फॉर्म</Typography>
//       </Box>

//       <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
//         {success && <Alert severity="success" sx={{ mb: 3 }}>नोंद यशस्वी! अर्ज क्रमांक जनरेट झाला.</Alert>}
//         {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

//         <form onSubmit={formik.handleSubmit}>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <Paper elevation={12} sx={{ borderRadius: 4, p: 4, border: '3px solid #0040B9' }}>
//                 <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>अभ्यागत तपशील</Typography>
//                 <Grid container spacing={2.5}>
//                   {/* All your existing fields... (same as before) */}
//                   <Grid item xs={12} sm={6}><TextField fullWidth label="पूर्ण नाव *" name="name" value={formik.values.name} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label="मोबाईल नंबर *" name="mobile" value={formik.values.mobile} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12}><TextField fullWidth label="पूर्ण पत्ता *" multiline rows={2} name="address" value={formik.values.address} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label="पिनकोड *" name="pincode" value={formik.values.pincode} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label="जिल्हा" value="ठाणे" disabled /></Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField select fullWidth label="पोलीस स्टेशन *" name="policeStation" value={formik.values.policeStation} onChange={formik.handleChange} required>
//                       <MenuItem value="" disabled>— स्टेशन निवडा —</MenuItem>
//                       {policeStations.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField select fullWidth label="कोणास भेटायचे *" name="meetingPerson" value={formik.values.meetingPerson} onChange={formik.handleChange} required>
//                       <MenuItem value="" disabled>— अधिकारी निवडा —</MenuItem>
//                       <MenuItem value="पोलीस अधीक्षक">पोलीस अधीक्षक</MenuItem>
//                       <MenuItem value="अपर पोलीस अधीक्षक">अपर पोलीस अधीक्षक</MenuItem>
//                       {/* Add more as needed */}
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField select fullWidth label="भेटीचे कारण *" name="visitReason" value={formik.values.visitReason} onChange={formik.handleChange} required>
//                       <MenuItem value="" disabled>— कारण निवडा —</MenuItem>
//                       {visitReasonsMr.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="सोबत किती जण?" name="numberOfVisitors" value={formik.values.numberOfVisitors} onChange={formik.handleChange} />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button variant="outlined" startIcon={<AttachFileIcon />} component="label" fullWidth sx={{ py: 1.5 }}>
//                       दस्तऐवज अपलोड (Optional)
//                       <input type="file" hidden accept="image/*,application/pdf" onChange={(e) => {
//                         const file = e.target.files[0];
//                         if (file) {
//                           const reader = new FileReader();
//                           reader.onloadend = () => {
//                             setUploadedDoc(reader.result);
//                             formik.setFieldValue('uploadDocument', reader.result);
//                           };
//                           reader.readAsDataURL(file);
//                         }
//                       }} />
//                     </Button>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button type="submit" fullWidth variant="contained" disabled={loading || !capturedPhoto} sx={{ py: 2.5, fontSize: '1.4rem', bgcolor: '#0040B9' }}>
//                       {loading ? <CircularProgress size={28} color="inherit" /> : "एंट्री सबमिट करा"}
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* Right Side - Photo */}
//             <Grid item xs={12} md={6}>
//               <Card elevation={16} sx={{ borderRadius: 4, textAlign: 'center', bgcolor: '#f8fbff', border: '4px solid #0040B9' }}>
//                 <CardContent sx={{ pt: 5 }}>
//                   <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>अभ्यागत फोटो</Typography>
//                   {/* Your existing photo capture logic - unchanged */}
//                   {!capturedPhoto ? (
//                     <Box sx={{ my: 4 }}>
//                       <Avatar sx={{ width: 240, height: 240, mx: 'auto', bgcolor: '#e3e8f5', border: '8px dashed #0040B9' }}>
//                         <PhotoCamera sx={{ fontSize: 90, color: '#0040B9' }} />
//                       </Avatar>
//                       <Box sx={{ mt: 3 }}>
//                         <Button variant="contained" startIcon={<PhotoCamera />} onClick={() => setShowWebcam(true)} sx={{ mr: 2, bgcolor: '#0040B9' }}>वेबकॅम</Button>
//                         <Button variant="outlined" component="label">
//                           अपलोड <input type="file" hidden accept="image/*" onChange={(e) => {
//                             const file = e.target.files[0];
//                             if (file) {
//                               const reader = new FileReader();
//                               reader.onloadend = () => {
//                                 setCapturedPhoto(reader.result);
//                                 formik.setFieldValue('photo', reader.result);
//                               };
//                               reader.readAsDataURL(file);
//                             }
//                           }} />
//                         </Button>
//                       </Box>
//                     </Box>
//                   ) : (
//                     <Box>
//                       <img src={capturedPhoto} alt="Visitor" style={{ width: 260, height: 260, objectFit: 'cover', borderRadius: '50%', border: '10px solid #0040B9' }} />
//                       <br /><br />
//                       <Button variant="text" color="error" onClick={() => { setCapturedPhoto(''); formik.setFieldValue('photo', ''); }}>
//                         फोटो बदला
//                       </Button>
//                     </Box>
//                   )}

//                   {showWebcam && (
//                     <Box sx={{ mt: 4 }}>
//                       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={320} height={320} style={{ borderRadius: '50%', border: '8px solid #0040B9' }} />
//                       <Box mt={3}>
//                         <Button variant="contained" color="success" onClick={capture}>कॅप्चर</Button>{' '}
//                         <Button variant="outlined" onClick={() => setShowWebcam(false)}>रद्द</Button>
//                       </Box>
//                     </Box>
//                   )}
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </form>
//       </Container>
//     </Box>
//   );
// };

// export default EntryForm;




// ============================

// import React, { useState, useRef } from 'react';
// import {
//   Box, Typography, TextField, Button, Container, Paper, Grid,
//   Card, CardContent, Avatar, CircularProgress, Alert,MenuItem
// } from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import Webcam from 'react-webcam';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import thanegramin from '../Images/thanegramin.jpeg';

// // ============ OLD CODE चे DROPDOWNS तसेच्या तसे ============
// const policeStations = [
//   "भिवंडी तालुका", "गणेशपुरी", "कल्याण तालुका", "कसारा", "किन्हवली",
//   "कुलगाव", "मुरबाड", "पडघा", "शहापूर", "टोकावडे", "वासिंद"
// ];

// const visitReasonsMr = ["तक्रार नोंद", "पहिली तक्रार", "चौकशी", "दस्तऐवज", "पास", "भेट", "इतर"];

// // SP Office Branch - OLD CODE मधलाच!
// const spOfficeBranches = [
//   "Home Department", "Crime", "Local Crime Branch (LCB)", "Economic Offences Wing (EOW)",
//   "District Special Branch (DSB)", "Police Communication & Information Technology",
//   "Passport", "Police Verification"
// ];

// const texts = {
//   mr: {
//     subtitle: "नोंदणी फॉर्म",
//     visitorDetails: "अभ्यागत तपशील",
//     name: "पूर्ण नाव *",
//     mobile: "मोबाईल नंबर *",
//     address: "पूर्ण पत्ता *",
//     pincode: "पिनकोड *",
//     district: "जिल्हा",
//     policeStation: "पोलीस स्टेशन *",
//     meetingPerson: "भेटीची व्यक्ती *",
//     visitReason: "भेटीचे कारण *",
//     spOfficeBranch: "पोलीस अधीक्षक कार्यालय विभाग",
//     numberOfVisitors: "सोबत किती जण?",
//     photoTitle: "अभ्यागत फोटो",
//     webcamBtn: "वेबकॅम",
//     uploadBtn: "अपलोड",
//     changePhoto: "फोटो बदला",
//     captureBtn: "कॅप्चर",
//     cancelBtn: "रद्द",
//     submitBtn: "एंट्री सबमिट करा"
//   }
// };

// const validationSchema = Yup.object({
//   name: Yup.string().required('नाव आवश्यक आहे'),
//   mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'अवैध मोबाईल').required('आवश्यक'),
//   address: Yup.string().required('पत्ता आवश्यक आहे'),
//   pincode: Yup.string().matches(/^\d{6}$/, '६ अंक').required('आवश्यक'),
//   policeStation: Yup.string().required('पोलीस स्टेशन निवडा'),
//   meetingPerson: Yup.string().required('भेटीची व्यक्ती निवडा'),
//   visitReason: Yup.string().required('कारण निवडा'),
//   photo: Yup.string().required('फोटो आवश्यक आहे'),
// });

// // const printVisitorPass = (data) => {
// //   const now = new Date();
// //   const date = now.toLocaleDateString('en-IN');
// //   const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
// //   const dateTime = `${date} | ${time}`;

// //   const printWindow = window.open('', '', 'width=650,height=1020');
// //   printWindow.document.write(`
// //     <!DOCTYPE html>
// //     <html><head><meta charset="utf-8"><title>Visitor Pass</title>
// //     <style>
// //       @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700&display=swap');
// //       *{margin:0;padding:0;box-sizing:border-box;}
// //       body{font-family:'Mukta',sans-serif;background:white;padding:15px 10px;}
// //       .card{max-width:600px;margin:0 auto;border:10px solid #1e3a8a;border-radius:12px;overflow:hidden;background:white;}
// //       .header{background:linear-gradient(135deg,#1e3a8a,#1e40af);color:white;text-align:center;padding:20px;}
// //       .header::after{content:'';position:absolute;bottom:0;left:0;right:0;height:6px;background:#fbbf24;}
// //       .header-top{display:flex;align-items:center;justify-content:center;gap:18px;margin-bottom:10px;position:relative;}
// //       .logo{width:80px;height:80px;border-radius:50%;border:5px solid white;background:white;}
// //       .title{font-size:32px;font-weight:700;}
// //       .subtitle{font-size:18px;opacity:0.95;}
// //       .pass-type{background:#fbbf24;color:#1e3a8a;font-size:24px;font-weight:700;padding:10px 30px;border-radius:30px;margin-top:10px;}
// //       .content{padding:25px 35px;display:flex;gap:30px;background:#f8fafc;}
// //       .photo{width:140px;height:140px;border-radius:16px;object-fit:cover;border:6px solid #1e3a8a;}
// //       .details{flex:1;}
// //       .row{display:flex;margin-bottom:16px;font-size:17px;}
// //       .label{font-weight:700;color:#1e3a8a;min-width:135px;}
// //       .value{font-weight:500;color:#1f2937;}
// //       .appid{font-size:28px!important;font-weight:800!important;color:#d32f2f!important;background:#ffebee;padding:10px 20px;border-radius:12px;border:2px solid #ef5350;}
// //       .blue-line{height:4px;background:linear-gradient(90deg,#1e3a8a,#3b82f6);margin:20px 35px;}
// //       .signatures{padding:20px 35px;display:flex;justify-content:space-between;background:white;border-top:3px dashed #cbd5e1;}
// //       .sign-box{text-align:center;flex:1;}
// //       .sign-line{border-bottom:3px solid #1e3a8a;width:80%;margin:0 auto 8px;}
// //       .sign-label{font-size:13px;color:#1e3a8a;font-weight:600;}
// //       @media print{@page{margin:5mm;}body{padding:0!important;}}
// //     </style>
// //     </head>
// //     <body onload="window.print();setTimeout(()=>window.close(),1500)">
// //       <div class="card">
// //         <div class="header">
// //           <div class="header-top">
// //             <img src="${thanegramin}" class="logo" alt="Logo" />
// //             <div><div class="title">ठाणे ग्रामीण पोलीस</div><div class="subtitle">Thane Rural Police</div></div>
// //           </div>
// //           <div class="pass-type">अभ्यागत पावती</div>
// //         </div>
// //         <div class="content">
// //           <div><img src="${data.photo}" class="photo" alt="Visitor" /></div>
// //           <div class="details">
// //             <div class="row"><span class="label">अर्ज क्रमांक :</span><span class="appid">${data.applicationId || 'N/A'}</span></div>
// //             <div class="row"><span class="label">नाव :</span><span class="value">${data.name}</span></div>
// //             <div class="row"><span class="label">मोबाईल :</span><span class="value">${data.mobile}</span></div>
// //             <div class="row"><span class="label">दिनांक-वेळ :</span><span class="value">${dateTime}</span></div>
// //             <div class="row"><span class="label">पत्ता :</span><span class="value">${data.address}</span></div>
// //             <div class="row"><span class="label">कोणास भेटायचे? :</span><span class="value">${data.meetingPerson}</span></div>
// //             <div class="row"><span class="label">भेटीचे कारण :</span><span class="value">${data.visitReason}</span></div>
// //             <div class="row"><span class="label">स्टेशन हद्द :</span><span class="value">${data.policeStation}</span></div>
// //           </div>
// //         </div>
// //         <div class="blue-line"></div>
// //         <div class="signatures">
// //           <div class="sign-box"><div class="sign-line"></div><div class="sign-label">अभ्यागत स्वाक्षरी</div></div>
// //           <div class="sign-box"><div class="sign-line"></div><div class="sign-label">स्वागतकर्ता स्वाक्षरी व शिक्का</div></div>
// //           <div class="sign-box"><div class="sign-line"></div><div class="sign-label">भेट देणारे अधिकारी</div></div>
// //         </div>
// //       </div>
// //     </body></html>
// //   `);
// //   printWindow.document.close();
// // };

// const meetingPersonMarathi = {
//   "Superintendent of Police": "पोलीस अधीक्षक",
//   "Additional Superintendent of Police": "अपर पोलीस अधीक्षक",
//   "Sub-Divisional Officer, Ganeshpuri": "उप विभागीय अधिकारी गणेशपुरी",
//   "Sub-Divisional Officer, Shahapur": "उप विभागीय अधिकारी शहापूर",
//   "Sub-Divisional Officer, Murbad": "उप विभागीय अधिकारी मुरबाड",
//   "Sub-Divisional Officer, Home Department": "उप विभागीय अधिकारी गृह",
//   "In-Charge Officer": "प्रभारी अधिकारी",
//   "पोलीस निरीक्षक": "पोलीस निरीक्षक"
// };


// const printVisitorPass = (data) => {
//   const now = new Date();
//   const date = now.toLocaleDateString('en-IN');
//   const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
//   const dateTime = `${date} | ${time}`;

//   const marathiMeetingPerson = meetingPersonMarathi[data.meetingPerson] || data.meetingPerson || "N/A";



//   const printWindow = window.open('', '', 'width=620,height=1020');
//   printWindow.document.write(`
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <title>Visitor Pass</title>
//       <style>
//         @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700&display=swap');
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body { margin: 0; padding: 0; background: white; font-family: 'Mukta', sans-serif; }
//         .page { width: 100%; height: 100vh; position: relative; }
//         .card { width: 100%; height: 50vh; background: white; border: 8px solid #1e3a8a; }
//         .header { background: linear-gradient(135deg, #1e3a8a, #1e40af); color: white; text-align: center; padding: 15px 20px; border-bottom: 4px solid #fbbf24; }
//         .header-top { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 8px; }
//         .logo { width: 70px; height: 70px; border-radius: 50%; border: 4px solid white; object-fit: contain; background: white; }
//         .title { font-size: 28px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
//         .subtitle { font-size: 16px; opacity: 0.95; font-weight: 500; }
//         .pass-type { background: #fbbf24; color: #1e3a8a; font-size: 22px; font-weight: 700; padding: 8px 20px; margin: 8px auto 0; display: inline-block; border-radius: 25px; }
//         .content { display: flex; padding: 20px 30px; gap: 25px; align-items: flex-start; }
//         .photo { width: 130px; height: 130px; border-radius: 12px; object-fit: cover; border: 5px solid #1e3a8a; box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
//         .details { flex: 1; padding-top: 5px; }
//         .row { display: flex; margin-bottom: 12px; font-size: 16px; line-height: 1.4; align-items: center; }
//         .label { font-weight: 700; color: #1e3a8a; min-width: 120px; flex-shrink: 0; }
//         .value { color: #1f2937; font-weight: 500; flex: 1; }
//         .appid { font-size: 20px; font-weight: 700; color: #d32f2f; background: #ffebee; padding: 6px 12px; border-radius: 8px; display: inline-block; }
//         .signatures { display: flex; gap: 25px; padding: 0 30px 15px; border-top: 2px dashed #cbd5e1; margin-top: 15px; padding-top: 15px; }
//         .sign-box { flex: 1; text-align: center; }
//         .sign-line { border-bottom: 2px solid #1e3a8a; height: 35px; margin-bottom: 5px; }
//         .sign-label { font-size: 12px; color: #1e3a8a; font-weight: 600; }
//         @media print { body { background: white; } .card { border: 6px solid #1e3a8a; } @page { margin: 0; } }
//       </style>
//     </head>
//     <body onload="window.print(); setTimeout(()=>window.close(),1200)">
//       <div class="page">
//         <div class="card">
//           <div class="header">
//             <div class="header-top">
//               <img src="${thanegramin}" class="logo" alt="Logo" />
//               <div style="text-align:left">
//                 <div class="title">ठाणे ग्रामीण पोलीस</div>
//                 <div class="subtitle">Thane Rural Police</div>
//               </div>
//             </div>
//             <div class="pass-type">अभ्यागत पावती</div>
//           </div>
          
//           <div class="content">
//             <div><img src="${data.photo}" class="photo" alt="Visitor" /></div>
//             <div class="details">
//               <div class="row"><span class="label">अर्ज क्रमांक :</span><span class="value"><span class="appid">${data.applicationId || 'N/A'}</span></span></div>
//               <div class="row"><span class="label">नाव :</span><span class="value">${data.name}</span></div>
//               <div class="row"><span class="label">मोबाईल :</span><span class="value">${data.mobile}</span></div>
//               <div class="row"><span class="label">दिनांक-वेळ :</span><span class="value">${dateTime}</span></div>
//               <div class="row"><span class="label">पत्ता :</span><span class="value">${data.address}</span></div>
//               <div class="row"><span class="label">कोणास भेटायचे? :</span><span class="value">${marathiMeetingPerson}</span></div>
//               <div class="row"><span class="label">भेटीचे कारण :</span><span class="value">${data.visitReason}</span></div>
//               <div class="row"><span class="label">पोलीस स्टेशन हद्द :</span><span class="value">${data.policeStation}</span></div>
//             </div>
//           </div>
          
//           <div class="signatures">
//             <div class="sign-box"><div class="sign-line"></div><div class="sign-label">अभ्यागत स्वाक्षरी</div></div>
//             <div class="sign-box"><div class="sign-line"></div><div class="sign-label">स्वागतकर्ता स्वाक्षरी व शिक्का</div></div>
//             <div class="sign-box"><div class="sign-line"></div><div class="sign-label">भेट देणारे अधिकारी</div></div>
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>
//   `);
//   printWindow.document.close();
// };


// const EntryForm = () => {
//   const [showWebcam, setShowWebcam] = useState(false);
//   const [capturedPhoto, setCapturedPhoto] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');
//   const webcamRef = useRef(null);

//   const formik = useFormik({
//     initialValues: {
//       name: '', mobile: '', address: '', pincode: '', policeStation: '',
//       meetingPerson: '', visitReason: '', spOfficeBranch: '', numberOfVisitors: '1', uploadDocument: '', photo: ''
//     },
//     validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       setLoading(true); setError(''); setSuccess(false);

//       try {
//         const photoRes = await fetch(values.photo);
//         const photoBlob = await photoRes.blob();
//         const photoFile = new File([photoBlob], "visitor_photo.jpg", { type: "image/jpeg" });

//         let docFile = null;
//         if (values.uploadDocument) {
//           const docRes = await fetch(values.uploadDocument);
//           const docBlob = await docRes.blob();
//           docFile = new File([docBlob], "document", { type: docBlob.type });
//         }

//         const formData = new FormData();
//         formData.append('fullName', values.name);
//         formData.append('mobileNumber', values.mobile);
//         formData.append('fullAddress', values.address);
//         formData.append('pincode', values.pincode);
//         formData.append('district', 'ठाणे');
//         formData.append('policeStation', values.policeStation);
//         formData.append('contactPerson', values.meetingPerson);
//         formData.append('reasonToVisit', values.visitReason);
//         formData.append('spOfficeBranch', values.spOfficeBranch);           // ADDED
//         formData.append('numberOfVisitors', values.numberOfVisitors);       // ADDED
//         formData.append('visitorPhoto', photoFile);
//         if (docFile) formData.append('uploadDocument', docFile);           // ADDED

//         const res = await axios.post(`${baseUrl}/addVisitor`, formData);
//         const applicationId = res.data.applicationId || res.data.newVisit?.applicationId || 'N/A';

//         setSuccess(true);
//         resetForm();
//         setCapturedPhoto('');
//         setTimeout(() => setSuccess(false), 6000);

//         printVisitorPass({ ...values, photo: values.photo, applicationId });

//       } catch (err) {
//         setError(err.response?.data?.message || 'काहीतरी चुकले!');
//         setTimeout(() => setError(''), 8000);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <Box sx={{ bgcolor: '#f0f4f8', mt: 15 }}>
//       <Box sx={{ bgcolor: '#0040B9', color: 'white', py: 3, textAlign: 'center' }}>
//         <Typography variant="h6">नोंदणी फॉर्म</Typography>
//       </Box>

//       <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
//         {success && <Alert severity="success" sx={{ mb: 3 }}>नोंद यशस्वी झाली!</Alert>}
//         {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

//         <form onSubmit={formik.handleSubmit}>
//           <Grid container spacing={4}>

//             {/* LEFT FORM */}
//             <Grid item xs={12} md={6}>
//               <Paper elevation={12} sx={{ borderRadius: 4, p: 4, border: '3px solid #0040B9' }}>
//                 <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>अभ्यागत तपशील</Typography>
//                 <Grid container spacing={2.5}>

//                   <Grid item xs={12} sm={6}><TextField fullWidth label="पूर्ण नाव *" name="name" value={formik.values.name} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label="मोबाईल नंबर *" name="mobile" value={formik.values.mobile} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12}><TextField fullWidth label="पूर्ण पत्ता *" multiline rows={2} name="address" value={formik.values.address} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label="पिनकोड *" name="pincode" value={formik.values.pincode} onChange={formik.handleChange} required /></Grid>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label="जिल्हा" value="ठाणे / Thane" disabled /></Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField select fullWidth label="पोलीस स्टेशन *" name="policeStation" value={formik.values.policeStation} onChange={formik.handleChange} required>
//                       <MenuItem value="" disabled>— स्टेशन निवडा —</MenuItem>
//                       {policeStations.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
//                     </TextField>
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField select fullWidth label="कोणास भेटायचे *" name="meetingPerson" value={formik.values.meetingPerson} onChange={formik.handleChange} required>
//                       <MenuItem value="" disabled>— अधिकारी निवडा —</MenuItem>
//                       <MenuItem value="Superintendent of Police">पोलीस अधीक्षक</MenuItem>
//                       <MenuItem value="Additional Superintendent of Police">अपर पोलीस अधीक्षक</MenuItem>
//                       <MenuItem value="Sub-Divisional Officer, Ganeshpuri">उप विभागीय अधिकारी गणेशपुरी</MenuItem>
//                       <MenuItem value="Sub-Divisional Officer, Shahapur">उप विभागीय अधिकारी शहापूर</MenuItem>
//                       <MenuItem value="Sub-Divisional Officer, Murbad">उप विभागीय अधिकारी मुरबाड</MenuItem>
//                       <MenuItem value="Sub-Divisional Officer, Home Department">उप विभागीय अधिकारी गृह</MenuItem>
//                       <MenuItem value="In-Charge Officer">प्रभारी अधिकारी</MenuItem>
//                       <MenuItem value="पोलीस निरीक्षक">पोलीस निरीक्षक</MenuItem>
//                     </TextField>
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField select fullWidth label="भेटीचे कारण *" name="visitReason" value={formik.values.visitReason} onChange={formik.handleChange} required>
//                       <MenuItem value="" disabled>— कारण निवडा —</MenuItem>
//                       {visitReasonsMr.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
//                     </TextField>
//                   </Grid>

//                   {/* SP OFFICE BRANCH - परत आलं! */}
//                   <Grid item xs={12} sm={6}>
//                     <TextField select fullWidth label="पोलीस अधीक्षक कार्यालय विभाग" name="spOfficeBranch" value={formik.values.spOfficeBranch} onChange={formik.handleChange}>
//                       <MenuItem value="" disabled>— शाखा निवडा —</MenuItem>
//                       <MenuItem value="Home Department">गृह विभाग</MenuItem>
//                       <MenuItem value="Crime">गुन्हे</MenuItem>
//                       <MenuItem value="Local Crime Branch (LCB)">स्थानिक गुन्हे शाखा</MenuItem>
//                       <MenuItem value="Economic Offences Wing (EOW)">आर्थिक गुन्हे शाखा</MenuItem>
//                       <MenuItem value="District Special Branch (DSB)">जिल्हा विशेष शाखा</MenuItem>
//                       <MenuItem value="Police Communication & Information Technology">पोलीस दळणवळण व माहिती तंत्रज्ञान</MenuItem>
//                       <MenuItem value="Passport">पासपोर्ट</MenuItem>
//                       <MenuItem value="Police Verification">पोलीस तपासणी</MenuItem>
//                     </TextField>
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="सोबत किती जण?" name="numberOfVisitors" value={formik.values.numberOfVisitors} onChange={formik.handleChange} />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Button variant="outlined" startIcon={<AttachFileIcon />} component="label" fullWidth sx={{ py: 1.5 }}>
//                       दस्तऐवज अपलोड (ऐच्छिक)
//                       <input type="file" hidden accept="image/*,application/pdf" onChange={(e) => {
//                         const file = e.target.files[0];
//                         if (file) {
//                           const reader = new FileReader();
//                           reader.onloadend = () => {
//                             formik.setFieldValue('uploadDocument', reader.result);
//                           };
//                           reader.readAsDataURL(file);
//                         }
//                       }} />
//                     </Button>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Button type="submit" fullWidth variant="contained" disabled={loading || !capturedPhoto}
//                       sx={{ py: 2.5, fontSize: '1.4rem', fontWeight: 'bold', bgcolor: '#0040B9' }}>
//                       {loading ? <CircularProgress size={28} color="inherit" /> : "एंट्री सबमिट करा"}
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* RIGHT PHOTO */}
//             <Grid item xs={12} md={6}>
//               <Card elevation={16} sx={{ borderRadius: 4, textAlign: 'center', bgcolor: '#f8fbff', border: '4px solid #0040B9' }}>
//                 <CardContent sx={{ pt: 5 }}>
//                   <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>अभ्यागत फोटो</Typography>

//                   {!capturedPhoto ? (
//                     <Box sx={{ my: 4 }}>
//                       <Avatar sx={{ width: 240, height: 240, mx: 'auto', bgcolor: '#e3e8f5', border: '8px dashed #0040B9' }}>
//                         <PhotoCamera sx={{ fontSize: 90, color: '#0040B9' }} />
//                       </Avatar>
//                       <Box sx={{ mt: 3 }}>
//                         <Button variant="contained" startIcon={<PhotoCamera />} onClick={() => setShowWebcam(true)} sx={{ mr: 2, bgcolor: '#0040B9' }}>वेबकॅम</Button>
//                         <Button variant="outlined" component="label">
//                           अपलोड <input type="file" hidden accept="image/*" onChange={(e) => {
//                             const file = e.target.files[0];
//                             if (file) {
//                               const reader = new FileReader();
//                               reader.onloadend = () => {
//                                 setCapturedPhoto(reader.result);
//                                 formik.setFieldValue('photo', reader.result);
//                               };
//                               reader.readAsDataURL(file);
//                             }
//                           }} />
//                         </Button>
//                       </Box>
//                     </Box>
//                   ) : (
//                     <Box>
//                       <img src={capturedPhoto} alt="Visitor" style={{ width: 260, height: 260, objectFit: 'cover', borderRadius: '50%', border: '10px solid #0040B9' }} />
//                       <br /><br />
//                       <Button variant="text" color="error" onClick={() => { setCapturedPhoto(''); formik.setFieldValue('photo', ''); }}>
//                         फोटो बदला
//                       </Button>
//                     </Box>
//                   )}

//                   {showWebcam && (
//                     <Box sx={{ mt: 4 }}>
//                       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={320} height={320} style={{ borderRadius: '50%', border: '8px solid #0040B9' }} />
//                       <Box mt={3}>
//                         <Button variant="contained" color="success" onClick={() => {
//                           const imageSrc = webcamRef.current?.getScreenshot();
//                           if (imageSrc) {
//                             setCapturedPhoto(imageSrc);
//                             setShowWebcam(false);
//                             formik.setFieldValue('photo', imageSrc);
//                           }
//                         }}>कॅप्चर</Button>{' '}
//                         <Button variant="outlined" onClick={() => setShowWebcam(false)}>रद्द</Button>
//                       </Box>
//                     </Box>
//                   )}

//                   {/* Live Preview */}
//                   {formik.values.name && (
//                     <Paper elevation={8} sx={{ mt: 5, p: 3, bgcolor: '#e3edff', borderRadius: 3 }}>
//                       <Typography fontWeight="bold" color="#0040B9">लाइव्ह प्रीव्ह्यू</Typography>
//                       <Typography><strong>नाव :</strong> {formik.values.name}</Typography>
//                       <Typography><strong>मोबाईल :</strong> {formik.values.mobile}</Typography>
//                       <Typography><strong>पोलीस स्टेशन :</strong> {formik.values.policeStation || '-'}</Typography>
//                       <Typography><strong>भेट :</strong> {formik.values.meetingPerson || '-'}</Typography>
//                       <Typography><strong>कारण :</strong> {formik.values.visitReason || '-'}</Typography>
//                       <Typography><strong>पोलीस अधीक्षक कार्यालय विभाग :</strong> {formik.values.spOfficeBranch || '-'}</Typography>
//                     </Paper>
//                   )}
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </form>
//       </Container>
//     </Box>
//   );
// };

// export default EntryForm;




// ================================================================================================

// import React, { useState, useRef, useEffect } from 'react';
// import {
//   Box, Typography, TextField, Button, Container, Paper, Grid,
//   Card, CardContent, Avatar, CircularProgress, Alert, MenuItem
// } from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import Webcam from 'react-webcam';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { baseUrl } from '../config/config';
// import thanegramin from '../Images/thanegramin.jpeg';

// const policeStations = [
//   "भिवंडी तालुका", "गणेशपुरी", "कल्याण तालुका", "कसारा", "किन्हवली",
//   "कुलगाव", "मुरबाड", "पडघा", "शहापूर", "टोकावडे", "वासिंद"
// ];

// const visitReasonsMr = ["तक्रार नोंद", "पहिली तक्रार", "चौकशी", "दस्तऐवज", "पास", "भेट", "इतर"];

// const spOfficeBranches = [
//   "Home Department", "Crime", "Local Crime Branch (LCB)", "Economic Offences Wing (EOW)",
//   "District Special Branch (DSB)", "Police Communication & Information Technology",
//   "Passport", "Police Verification"
// ];

// const texts = {
//   mr: {
//     subtitle: "नोंदणी फॉर्म",
//     visitorDetails: "अभ्यागत तपशील",
//     name: "पूर्ण नाव *",
//     mobile: "मोबाईल नंबर *",
//     address: "पूर्ण पत्ता *",
//     pincode: "पिनकोड *",
//     district: "जिल्हा",
//     policeStation: "पोलीस स्टेशन *",
//     meetingPerson: "भेटीची व्यक्ती *",
//     visitReason: "भेटीचे कारण *",
//     spOfficeBranch: "पोलीस अधीक्षक कार्यालय विभाग",
//     numberOfVisitors: "सोबत किती जण?",
//     photoTitle: "अभ्यागत फोटो",
//     webcamBtn: "वेबकॅम",
//     uploadBtn: "अपलोड",
//     changePhoto: "फोटो बदला",
//     captureBtn: "कॅप्चर",
//     cancelBtn: "रद्द",
//     submitBtn: "एंट्री सबमिट करा"
//   }
// };

// const validationSchema = Yup.object({
//   name: Yup.string().required('नाव आवश्यक आहे'),
//   mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'अवैध मोबाईल').required('आवश्यक'),
//   address: Yup.string().required('पत्ता आवश्यक आहे'),
//   pincode: Yup.string().matches(/^\d{6}$/, '६ अंक').required('आवश्यक'),
//   policeStation: Yup.string().required('पोलीस स्टेशन निवडा'),
//   meetingPerson: Yup.string().required('भेटीची व्यक्ती निवडा'),
//   visitReason: Yup.string().required('कारण निवडा'),
//   photo: Yup.string().required('फोटो आवश्यक आहे'),
// });

// const meetingPersonMarathi = {
//   "Superintendent of Police": "पोलीस अधीक्षक",
//   "Additional Superintendent of Police": "अपर पोलीस अधीक्षक",
//   "Sub-Divisional Officer, Ganeshpuri": "उप विभागीय अधिकारी गणेशपुरी",
//   "Sub-Divisional Officer, Shahapur": "उप विभागीय अधिकारी शहापूर",
//   "Sub-Divisional Officer, Murbad": "उप विभागीय अधिकारी मुरबाड",
//   "Sub-Divisional Officer, Home Department": "उप विभागीय अधिकारी गृह",
//   "In-Charge Officer": "प्रभारी अधिकारी",
//   "पोलीस निरीक्षक": "पोलीस निरीक्षक"
// };

// const printVisitorPass = (data) => {
//   const now = new Date();
//   const date = now.toLocaleDateString('en-IN');
//   const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
//   const dateTime = `${date} | ${time}`;

//   const marathiMeetingPerson = meetingPersonMarathi[data.meetingPerson] || data.meetingPerson || "N/A";

//   const printWindow = window.open('', '', 'width=620,height=1020');
//   printWindow.document.write(`
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <title>Visitor Pass</title>
//       <style>
//         @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700&display=swap');
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body { margin: 0; padding: 0; background: white; font-family: 'Mukta', sans-serif; }
//         .page { width: 100%; height: 100vh; position: relative; }
//         .card { width: 100%; height: 50vh; background: white; border: 8px solid #1e3a8a; }
//         .header { background: linear-gradient(135deg, #1e3a8a, #1e40af); color: white; text-align: center; padding: 15px 20px; border-bottom: 4px solid #fbbf24; }
//         .header-top { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 8px; }
//         .logo { width: 70px; height: 70px; border-radius: 50%; border: 4px solid white; object-fit: contain; background: white; }
//         .title { font-size: 28px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
//         .subtitle { font-size: 16px; opacity: 0.95; font-weight: 500; }
//         .pass-type { background: #fbbf24; color: #1e3a8a; font-size: 22px; font-weight: 700; padding: 8px 20px; margin: 8px auto 0; display: inline-block; border-radius: 25px; }
//         .content { display: flex; padding: 20px 30px; gap: 25px; align-items: flex-start; }
//         .photo { width: 130px; height: 130px; border-radius: 12px; object-fit: cover; border: 5px solid #1e3a8a; box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
//         .details { flex: 1; padding-top: 5px; }
//         .row { display: flex; margin-bottom: 12px; font-size: 16px; line-height: 1.4; align-items: center; }
//         .label { font-weight: 700; color: #1e3a8a; min-width: 120px; flex-shrink: 0; }
//         .value { color: #1f2937; font-weight: 500; flex: 1; }
//         .appid { font-size: 20px; font-weight: 700; color: #d32f2f; background: #ffebee; padding: 6px 12px; border-radius: 8px; display: inline-block; }
//         .signatures { display: flex; gap: 25px; padding: 0 30px 15px; border-top: 2px dashed #cbd5e1; margin-top: 15px; padding-top: 15px; }
//         .sign-box { flex: 1; text-align: center; }
//         .sign-line { border-bottom: 2px solid #1e3a8a; height: 35px; margin-bottom: 5px; }
//         .sign-label { font-size: 12px; color: #1e3a8a; font-weight: 600; }
//         @media print { body { background: white; } .card { border: 6px solid #1e3a8a; } @page { margin: 0; } }
//       </style>
//     </head>
//     <body onload="window.print(); setTimeout(()=>window.close(),1200)">
//       <div class="page">
//         <div class="card">
//           <div class="header">
//             <div class="header-top">
//               <img src="${thanegramin}" class="logo" alt="Logo" />
//               <div style="text-align:left">
//                 <div class="title">ठाणे ग्रामीण पोलीस</div>
//                 <div class="subtitle">Thane Rural Police</div>
//               </div>
//             </div>
//             <div class="pass-type">अभ्यागत पावती</div>
//           </div>

//           <div class="content">
//             <div><img src="${data.photo}" class="photo" alt="Visitor" /></div>
//             <div class="details">
//               <div class="row"><span class="label">अर्ज क्रमांक :</span><span class="value"><span class="appid">${data.applicationId || 'N/A'}</span></span></div>
//               <div class="row"><span class="label">नाव :</span><span class="value">${data.name}</span></div>
//               <div class="row"><span class="label">मोबाईल :</span><span class="value">${data.mobile}</span></div>
//               <div class="row"><span class="label">दिनांक-वेळ :</span><span class="value">${dateTime}</span></div>
//               <div class="row"><span class="label">पत्ता :</span><span class="value">${data.address}</span></div>
//               <div class="row"><span class="label">कोणास भेटायचे? :</span><span class="value">${marathiMeetingPerson}</span></div>
//               <div class="row"><span class="label">भेटीचे कारण :</span><span class="value">${data.visitReason}</span></div>
//               <div class="row"><span class="label">पोलीस स्टेशन हद्द :</span><span class="value">${data.policeStation}</span></div>
//             </div>
//           </div>

//           <div class="signatures">
//             <div class="sign-box"><div class="sign-line"></div><div class="sign-label">अभ्यागत स्वाक्षरी</div></div>
//             <div class="sign-box"><div class="sign-line"></div><div class="sign-label">स्वागतकर्ता स्वाक्षरी व शिक्का</div></div>
//             <div class="sign-box"><div class="sign-line"></div><div class="sign-label">भेट देणारे अधिकारी</div></div>
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>
//   `);
//   printWindow.document.close();
// };

// const EntryForm = () => {
//   const [showWebcam, setShowWebcam] = useState(false);
//   const [capturedPhoto, setCapturedPhoto] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [fetchingVisitor, setFetchingVisitor] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');
//   const webcamRef = useRef(null);

//   const formik = useFormik({
//     initialValues: {
//       name: '', mobile: '', address: '', pincode: '', policeStation: '',
//       meetingPerson: '', visitReason: '', spOfficeBranch: '', numberOfVisitors: '1', uploadDocument: '', photo: ''
//     },
//     validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       setLoading(true); setError(''); setSuccess(false);

//       try {
//         const photoRes = await fetch(values.photo);
//         const photoBlob = await photoRes.blob();
//         const photoFile = new File([photoBlob], "visitor_photo.jpg", { type: "image/jpeg" });

//         let docFile = null;
//         if (values.uploadDocument) {
//           const docRes = await fetch(values.uploadDocument);
//           const docBlob = await docRes.blob();
//           docFile = new File([docBlob], "document", { type: docBlob.type });
//         }

//         const formData = new FormData();
//         formData.append('fullName', values.name);
//         formData.append('mobileNumber', values.mobile);
//         formData.append('fullAddress', values.address);
//         formData.append('pincode', values.pincode);
//         formData.append('district', 'ठाणे');
//         formData.append('policeStation', values.policeStation);
//         formData.append('contactPerson', values.meetingPerson);
//         formData.append('reasonToVisit', values.visitReason);
//         formData.append('spOfficeBranch', values.spOfficeBranch);
//         formData.append('numberOfVisitors', values.numberOfVisitors);
//         formData.append('visitorPhoto', photoFile);
//         if (docFile) formData.append('uploadDocument', docFile);

//         const res = await axios.post(`${baseUrl}/addVisitor`, formData);
//         const applicationId = res.data.applicationId || res.data.newVisit?.applicationId || 'N/A';

//         setSuccess(true);
//         toast.success('नोंद यशस्वी झाली!', {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         resetForm();
//         setCapturedPhoto('');
//         setTimeout(() => setSuccess(false), 6000);

//         printVisitorPass({ ...values, photo: values.photo, applicationId });

//       } catch (err) {
//         const errorMessage = err.response?.data?.message || 'काहीतरी चुकले!';
//         setError(errorMessage);
//         toast.error(errorMessage, {
//           position: "top-right",
//           autoClose: 4000,
//         });
//         setTimeout(() => setError(''), 8000);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (formik.values.mobile.length === 10) {
//         fetchVisitorData(formik.values.mobile);
//       }
//     }, 600);
//     return () => clearTimeout(timer);
//   }, [formik.values.mobile]);

//   const fetchVisitorData = async (mobileNumber) => {
//     setFetchingVisitor(true);
//     try {
//       const res = await axios.get(
//         `${baseUrl}/getVisitorByMobileNumber?mobileNumber=${mobileNumber}`
//       );

//       if (res.data.success && res.data.visitor) {
//         const visitorData = res.data.visitor;

//         formik.setFieldValue('name', visitorData.fullName || '');
//         formik.setFieldValue('address', visitorData.fullAddress || '');
//         formik.setFieldValue('pincode', visitorData.pincode || '');
//         formik.setFieldValue('policeStation', visitorData.policeStation || '');

//         toast.info('माहिती आढळली! तपशील भरले आहेत.', {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     } catch (err) {
//       console.log('Visitor not found or error fetching data');
//     } finally {
//       setFetchingVisitor(false);
//     }
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box sx={{ bgcolor: '#f0f4f8', mt: 15 }}>
//         <ToastContainer />
//         <Box sx={{ bgcolor: '#0040B9', color: 'white', py: 3, textAlign: 'center' }}>
//           <Typography variant="h6">नोंदणी फॉर्म</Typography>
//         </Box>

//         <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
//           {success && <Alert severity="success" sx={{ mb: 3 }}>नोंद यशस्वी झाली!</Alert>}
//           {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

//           <form onSubmit={formik.handleSubmit}>
//             <Grid container spacing={4}>

//               <Grid item xs={12} md={6}>
//                 <Paper elevation={12} sx={{ borderRadius: 4, p: 4, border: '3px solid #0040B9' }}>
//                   <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>अभ्यागत तपशील</Typography>
//                   <Grid container spacing={2.5}>

//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="मोबाईल नंबर *"
//                         name="mobile"
//                         value={formik.values.mobile}
//                         onChange={(e) => {
//                           const value = e.target.value.replace(/\D/g, '').slice(0, 10);
//                           formik.setFieldValue('mobile', value);
//                         }}
//                         inputProps={{ maxLength: 10 }}
//                         required
//                         InputProps={{
//                           endAdornment: fetchingVisitor && <CircularProgress size={20} />
//                         }}
//                       />
//                     </Grid>

//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="पूर्ण नाव *"
//                         name="name"
//                         value={formik.values.name}
//                         onChange={formik.handleChange}
//                         required
//                       />
//                     </Grid>

//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         label="पूर्ण पत्ता *"
//                         multiline
//                         rows={2}
//                         name="address"
//                         value={formik.values.address}
//                         onChange={formik.handleChange}
//                         required
//                       />
//                     </Grid>

//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="पिनकोड *"
//                         name="pincode"
//                         value={formik.values.pincode}
//                         onChange={formik.handleChange}
//                         required
//                       />
//                     </Grid>

//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="जिल्हा"
//                         value="ठाणे / Thane"
//                         disabled
//                       />
//                     </Grid>

//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         select
//                         fullWidth
//                         label="पोलीस स्टेशन *"
//                         name="policeStation"
//                         value={formik.values.policeStation}
//                         onChange={formik.handleChange}
//                         required
//                       >
//                         <MenuItem value="" disabled>— स्टेशन निवडा —</MenuItem>
//                         {policeStations.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
//                       </TextField>
//                     </Grid>

//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         select
//                         fullWidth
//                         label="कोणास भेटायचे *"
//                         name="meetingPerson"
//                         value={formik.values.meetingPerson}
//                         onChange={formik.handleChange}
//                         required
//                       >
//                         <MenuItem value="" disabled>— अधिकारी निवडा —</MenuItem>
//                         <MenuItem value="Superintendent of Police">पोलीस अधीक्षक</MenuItem>
//                         <MenuItem value="Additional Superintendent of Police">अपर पोलीस अधीक्षक</MenuItem>
//                         <MenuItem value="Sub-Divisional Officer, Ganeshpuri">उप विभागीय अधिकारी गणेशपुरी</MenuItem>
//                         <MenuItem value="Sub-Divisional Officer, Shahapur">उप विभागीय अधिकारी शहापूर</MenuItem>
//                         <MenuItem value="Sub-Divisional Officer, Murbad">उप विभागीय अधिकारी मुरबाड</MenuItem>
//                         <MenuItem value="Sub-Divisional Officer, Home Department">उप विभागीय अधिकारी गृह</MenuItem>
//                         <MenuItem value="In-Charge Officer">प्रभारी अधिकारी</MenuItem>
//                         <MenuItem value="पोलीस निरीक्षक">पोलीस निरीक्षक</MenuItem>
//                       </TextField>
//                     </Grid>

//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         select
//                         fullWidth
//                         label="भेटीचे कारण *"
//                         name="visitReason"
//                         value={formik.values.visitReason}
//                         onChange={formik.handleChange}
//                         required
//                       >
//                         <MenuItem value="" disabled>— कारण निवडा —</MenuItem>
//                         {visitReasonsMr.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
//                       </TextField>
//                     </Grid>

//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         select
//                         fullWidth
//                         label="पोलीस अधीक्षक कार्यालय विभाग"
//                         name="spOfficeBranch"
//                         value={formik.values.spOfficeBranch}
//                         onChange={formik.handleChange}
//                       >
//                         <MenuItem value="" disabled>— शाखा निवडा —</MenuItem>
//                         <MenuItem value="Home Department">गृह विभाग</MenuItem>
//                         <MenuItem value="Crime">गुन्हे</MenuItem>
//                         <MenuItem value="Local Crime Branch (LCB)">स्थानिक गुन्हे शाखा</MenuItem>
//                         <MenuItem value="Economic Offences Wing (EOW)">आर्थिक गुन्हे शाखा</MenuItem>
//                         <MenuItem value="District Special Branch (DSB)">जिल्हा विशेष शाखा</MenuItem>
//                         <MenuItem value="Police Communication & Information Technology">पोलीस दळणवळण व माहिती तंत्रज्ञान</MenuItem>
//                         <MenuItem value="Passport">पासपोर्ट</MenuItem>
//                         <MenuItem value="Police Verification">पोलीस तपासणी</MenuItem>
//                       </TextField>
//                     </Grid>

//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="सोबत किती जण?"
//                         name="numberOfVisitors"
//                         value={formik.values.numberOfVisitors}
//                         onChange={formik.handleChange}
//                       />
//                     </Grid>

//                     <Grid item xs={12}>
//                       <Button
//                         variant="outlined"
//                         startIcon={<AttachFileIcon />}
//                         component="label"
//                         fullWidth
//                         sx={{ py: 1.5 }}
//                       >
//                         दस्तऐवज अपलोड (ऐच्छिक)
//                         <input
//                           type="file"
//                           hidden
//                           accept="image/*,application/pdf"
//                           onChange={(e) => {
//                             const file = e.target.files[0];
//                             if (file) {
//                               const reader = new FileReader();
//                               reader.onloadend = () => {
//                                 formik.setFieldValue('uploadDocument', reader.result);
//                               };
//                               reader.readAsDataURL(file);
//                             }
//                           }}
//                         />
//                       </Button>
//                     </Grid>

//                     <Grid item xs={12}>
//                       <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         disabled={loading || !capturedPhoto}
//                         sx={{ py: 2.5, fontSize: '1.4rem', fontWeight: 'bold', bgcolor: '#0040B9' }}
//                       >
//                         {loading ? <CircularProgress size={28} color="inherit" /> : "एंट्री सबमिट करा"}
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Paper>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Card elevation={16} sx={{ borderRadius: 4, textAlign: 'center', bgcolor: '#f8fbff', border: '4px solid #0040B9' }}>
//                   <CardContent sx={{ pt: 5 }}>
//                     <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>अभ्यागत फोटो</Typography>

//                     {!capturedPhoto ? (
//                       <Box sx={{ my: 4 }}>
//                         <Avatar sx={{ width: 240, height: 240, mx: 'auto', bgcolor: '#e3e8f5', border: '8px dashed #0040B9' }}>
//                           <PhotoCamera sx={{ fontSize: 90, color: '#0040B9' }} />
//                         </Avatar>
//                         <Box sx={{ mt: 3 }}>
//                           <Button
//                             variant="contained"
//                             startIcon={<PhotoCamera />}
//                             onClick={() => setShowWebcam(true)}
//                             sx={{ mr: 2, bgcolor: '#0040B9' }}
//                           >
//                             वेबकॅम
//                           </Button>
//                           <Button variant="outlined" component="label">
//                             अपलोड
//                             <input
//                               type="file"
//                               hidden
//                               accept="image/*"
//                               onChange={(e) => {
//                                 const file = e.target.files[0];
//                                 if (file) {
//                                   const reader = new FileReader();
//                                   reader.onloadend = () => {
//                                     setCapturedPhoto(reader.result);
//                                     formik.setFieldValue('photo', reader.result);
//                                   };
//                                   reader.readAsDataURL(file);
//                                 }
//                               }}
//                             />
//                           </Button>
//                         </Box>
//                       </Box>
//                     ) : (
//                       <Box>
//                         <img
//                           src={capturedPhoto}
//                           alt="Visitor"
//                           style={{ width: 260, height: 260, objectFit: 'cover', borderRadius: '50%', border: '10px solid #0040B9' }}
//                         />
//                         <br /><br />
//                         <Button
//                           variant="text"
//                           color="error"
//                           onClick={() => {
//                             setCapturedPhoto('');
//                             formik.setFieldValue('photo', '');
//                           }}
//                         >
//                           फोटो बदला
//                         </Button>
//                       </Box>
//                     )}

//                     {showWebcam && (
//                       <Box sx={{ mt: 4 }}>
//                         <Webcam
//                           audio={false}
//                           ref={webcamRef}
//                           screenshotFormat="image/jpeg"
//                           width={320}
//                           height={320}
//                           style={{ borderRadius: '50%', border: '8px solid #0040B9' }}
//                         />
//                         <Box mt={3}>
//                           <Button
//                             variant="contained"
//                             color="success"
//                             onClick={() => {
//                               const imageSrc = webcamRef.current?.getScreenshot();
//                               if (imageSrc) {
//                                 setCapturedPhoto(imageSrc);
//                                 setShowWebcam(false);
//                                 formik.setFieldValue('photo', imageSrc);
//                               }
//                             }}
//                           >
//                             कॅप्चर
//                           </Button>{' '}
//                           <Button
//                             variant="outlined"
//                             onClick={() => setShowWebcam(false)}
//                           >
//                             रद्द
//                           </Button>
//                         </Box>
//                       </Box>
//                     )}

//                     {formik.values.name && (
//                       <Paper elevation={8} sx={{ mt: 5, p: 3, bgcolor: '#e3edff', borderRadius: 3 }}>
//                         <Typography fontWeight="bold" color="#0040B9">लाइव्ह प्रीव्ह्यू</Typography>
//                         <Typography><strong>नाव :</strong> {formik.values.name}</Typography>
//                         <Typography><strong>मोबाईल :</strong> {formik.values.mobile}</Typography>
//                         <Typography><strong>पोलीस स्टेशन :</strong> {formik.values.policeStation || '-'}</Typography>
//                         <Typography><strong>भेट :</strong> {formik.values.meetingPerson || '-'}</Typography>
//                         <Typography><strong>कारण :</strong> {formik.values.visitReason || '-'}</Typography>
//                         <Typography><strong>पोलीस अधीक्षक कार्यालय विभाग :</strong> {formik.values.spOfficeBranch || '-'}</Typography>
//                       </Paper>
//                     )}
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>
//           </form>
//         </Container>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default EntryForm;


// ==============================================================================================

import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, Container, Paper, Grid,
  Card, CardContent, Avatar, CircularProgress, Alert, MenuItem, Divider, Chip
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import Webcam from 'react-webcam';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { baseUrl } from '../config/config';
import thanegramin from '../Images/thanegramin.jpeg';

const policeStations = [
  "भिवंडी तालुका", "गणेशपुरी", "कल्याण तालुका", "कसारा", "किन्हवली",
  "कुलगाव", "मुरबाड", "पडघा", "शहापूर", "टोकावडे", "वासिंद"
];

const visitReasonsMr = ["तक्रार नोंद", "पहिली तक्रार", "चौकशी", "दस्तऐवज", "पास", "भेट", "इतर"];

const spOfficeBranches = [
  "Home Department", "Crime", "Local Crime Branch (LCB)", "Economic Offences Wing (EOW)",
  "District Special Branch (DSB)", "Police Communication & Information Technology",
  "Passport", "Police Verification"
];

const texts = {
  mr: {
    subtitle: "नोंदणी फॉर्म",
    visitorDetails: "अभ्यागत तपशील",
    name: "पूर्ण नाव *",
    mobile: "मोबाईल नंबर *",
    address: "पूर्ण पत्ता *",
    pincode: "पिनकोड *",
    district: "जिल्हा",
    policeStation: "पोलीस स्टेशन *",
    meetingPerson: "भेटीची व्यक्ती *",
    visitReason: "भेटीचे कारण *",
    spOfficeBranch: "पोलीस अधीक्षक कार्यालय विभाग",
    numberOfVisitors: "सोबत किती जण?",
    photoTitle: "अभ्यागत फोटो",
    webcamBtn: "वेबकॅम",
    uploadBtn: "अपलोड",
    changePhoto: "फोटो बदला",
    captureBtn: "कॅप्चर",
    cancelBtn: "रद्द",
    submitBtn: "एंट्री सबमिट करा"
  }
};

// Marathi mapping for police stations
const marathiPoliceStationMap = {
  "Shahapur Police Station": "शहापूर",
  "Bhiwandi Police Station": "भिवंडी तालुका",
  "Ganeshpuri Police Station": "गणेशपुरी",
  "Kalyan Taluka Police Station": "कल्याण तालुका",
  "Kasara Police Station": "कसारा",
  "Kinhavali Police Station": "किन्हवली",
  "Kulgaon Police Station": "कुलगाव",
  "Murbad Police Station": "मुरबाड",
  "Padgha Police Station": "पडघा",
  "Tokavade Police Station": "टोकावडे",
  "Vasind Police Station": "वासिंद"
};


const validationSchema = Yup.object({
  name: Yup.string().required('नाव आवश्यक आहे'),
  mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'अवैध मोबाईल').required('आवश्यक'),
  address: Yup.string().required('पत्ता आवश्यक आहे'),
  pincode: Yup.string().matches(/^\d{6}$/, '६ अंक').required('आवश्यक'),
  policeStation: Yup.string().required('पोलीस स्टेशन निवडा'),
  meetingPerson: Yup.string().required('भेटीची व्यक्ती निवडा'),
  visitReason: Yup.string().required('कारण निवडा'),
  photo: Yup.string().required('फोटो आवश्यक आहे'),
});

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

const printVisitorPass = (data) => {
  const now = new Date();
  const date = now.toLocaleDateString('en-IN');
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateTime = `${date} | ${time}`;

  const marathiMeetingPerson = meetingPersonMarathi[data.meetingPerson] || data.meetingPerson || "N/A";

  const printWindow = window.open('', '', 'width=620,height=1020');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Visitor Pass</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { margin: 0; padding: 0; background: white; font-family: 'Mukta', sans-serif; }
        .page { width: 100%; height: 100vh; position: relative; }
        .card { width: 100%; height: 50vh; background: white; border: 8px solid #1e3a8a; }
        .header { background: linear-gradient(135deg, #1e3a8a, #1e40af); color: white; text-align: center; padding: 15px 20px; border-bottom: 4px solid #fbbf24; }
        .header-top { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 8px; }
        .logo { width: 70px; height: 70px; border-radius: 50%; border: 4px solid white; object-fit: contain; background: white; }
        .title { font-size: 28px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .subtitle { font-size: 16px; opacity: 0.95; font-weight: 500; }
        .pass-type { background: #fbbf24; color: #1e3a8a; font-size: 22px; font-weight: 700; padding: 8px 20px; margin: 8px auto 0; display: inline-block; border-radius: 25px; }
        .content { display: flex; padding: 20px 30px; gap: 25px; align-items: flex-start; }
        .photo { width: 130px; height: 130px; border-radius: 12px; object-fit: cover; border: 5px solid #1e3a8a; box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
        .details { flex: 1; padding-top: 5px; }
        .row { display: flex; margin-bottom: 12px; font-size: 16px; line-height: 1.4; align-items: center; }
        .label { font-weight: 700; color: #1e3a8a; min-width: 120px; flex-shrink: 0; }
        .value { color: #1f2937; font-weight: 500; flex: 1; }
        .appid { font-size: 20px; font-weight: 700; color: #d32f2f; background: #ffebee; padding: 6px 12px; border-radius: 8px; display: inline-block; }
        .signatures { display: flex; gap: 25px; padding: 0 30px 15px; border-top: 2px dashed #cbd5e1; margin-top: 15px; padding-top: 15px; }
        .sign-box { flex: 1; text-align: center; }
        .sign-line { border-bottom: 2px solid #1e3a8a; height: 35px; margin-bottom: 5px; }
        .sign-label { font-size: 12px; color: #1e3a8a; font-weight: 600; }
        @media print { body { background: white; } .card { border: 6px solid #1e3a8a; } @page { margin: 0; } }
      </style>
    </head>
    <body onload="window.print(); setTimeout(()=>window.close(),1200)">
      <div class="page">
        <div class="card">
          <div class="header">
            <div class="header-top">
              <img src="${thanegramin}" class="logo" alt="Logo" />
              <div style="text-align:left">
                <div class="title">ठाणे ग्रामीण पोलीस</div>
                <div class="subtitle">Thane Rural Police</div>
              </div>
            </div>
            <div class="pass-type">अभ्यागत पावती</div>
          </div>

          <div class="content">
            <div><img src="${data.photo}" class="photo" alt="Visitor" /></div>
            <div class="details">
              <div class="row"><span class="label">अर्ज क्रमांक :</span><span class="value"><span class="appid">${data.applicationId || 'N/A'}</span></span></div>
              <div class="row"><span class="label">नाव :</span><span class="value">${data.name}</span></div>
              <div class="row"><span class="label">मोबाईल :</span><span class="value">${data.mobile}</span></div>
              <div class="row"><span class="label">दिनांक-वेळ :</span><span class="value">${dateTime}</span></div>
              <div class="row"><span class="label">पत्ता :</span><span class="value">${data.address}</span></div>
              <div class="row"><span class="label">कोणास भेटायचे? :</span><span class="value">${marathiMeetingPerson}</span></div>
              <div class="row"><span class="label">भेटीचे कारण :</span><span class="value">${data.visitReason}</span></div>
              <div class="row"><span class="label">पोलीस स्टेशन हद्द :</span><span class="value">${data.policeStation}</span></div>
            </div>
          </div>

          <div class="signatures">
            <div class="sign-box"><div class="sign-line"></div><div class="sign-label">अभ्यागत स्वाक्षरी</div></div>
            <div class="sign-box"><div class="sign-line"></div><div class="sign-label">स्वागतकर्ता स्वाक्षरी व शिक्का</div></div>
            <div class="sign-box"><div class="sign-line"></div><div class="sign-label">भेट देणारे अधिकारी</div></div>
          </div>
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
        {value || '-'}
      </Typography>
    </Box>
  </Box>
);

const EntryForm = () => {
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingVisitor, setFetchingVisitor] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const webcamRef = useRef(null);




   
  const [policeStations, setPoliceStations] = useState([]); // Dynamic from API
  const [loadingStations, setLoadingStations] = useState(true);


   // ---------- NEW: LOGGED-IN USER INFO ----------
  const getLoggedInUser = () => {
    const resdata = localStorage.getItem('resdata');
    if (resdata) {
      try {
        const parsed = JSON.parse(resdata);
        return parsed.user || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const loggedInUser = getLoggedInUser();   // <-- येथे user object मिळतो (तुमच्या screenshot प्रमाणे)



  // Fetch Sub Offices from API
  // useEffect(() => {
  //   const fetchSubOffices = async () => {
  //     setLoadingStations(true);
  //     try {
  //       const res = await axios.get(`${baseUrl}/getAllSuboffices`);
  //       if (res.data.success && res.data.suboffices) {
  //         const offices = res.data.suboffices.map(office => ({
  //           id: office._id,
  //           englishName: office.subofficeName,
  //           marathiName: marathiPoliceStationMap[office.subofficeName] || office.subofficeName
  //         }));
  //         setPoliceStations(offices);
  //       }
  //     } catch (err) {
  //       console.error("Failed to load police stations", err);
  //       toast.error("पोलीस स्टेशन लोड करण्यात त्रुटी");
  //     } finally {
  //       setLoadingStations(false);
  //     }
  //   };
  //   fetchSubOffices();
  // }, []);


useEffect(() => {
  const fetchSubOffices = async () => {
    setLoadingStations(true);
    try {
      const res = await axios.get(`${baseUrl}/getAllSuboffices`);

      let offices = [
        {
          id: "static-sp-office",
          englishName: "Superintendent of Police Office",
          marathiName: "पोलीस अधीक्षक कार्यालय"
        }
      ];

      if (res.data.success && res.data.suboffices) {
        const apiOffices = res.data.suboffices.map(office => ({
          id: office._id,
          englishName: office.subofficeName,
          marathiName: marathiPoliceStationMap[office.subofficeName] || office.subofficeName
        }));

        offices = [...offices, ...apiOffices];
      }

      setPoliceStations(offices);

    } catch (err) {
      console.error("Failed to load police stations", err);
      toast.error("पोलीस स्टेशन लोड करण्यात त्रुटी");
    } finally {
      setLoadingStations(false);
    }
  };

  fetchSubOffices();
}, []);

  const formik = useFormik({
    initialValues: {
      name: '', mobile: '', address: '', pincode: '', policeStation: '',
      meetingPerson: '', visitReason: '', spOfficeBranch: '', numberOfVisitors: '1', uploadDocument: '', photo: ''
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true); setError(''); setSuccess(false);

      try {
        const photoRes = await fetch(values.photo);
        const photoBlob = await photoRes.blob();
        const photoFile = new File([photoBlob], "visitor_photo.jpg", { type: "image/jpeg" });

        let docFile = null;
        if (values.uploadDocument) {
          const docRes = await fetch(values.uploadDocument);
          const docBlob = await docRes.blob();
          docFile = new File([docBlob], "document", { type: docBlob.type });
        }

        const formData = new FormData();
        formData.append('fullName', values.name);
        formData.append('mobileNumber', values.mobile);
        formData.append('fullAddress', values.address);
        formData.append('pincode', values.pincode);
        formData.append('district', 'ठाणे');
        formData.append('policeStation', values.policeStation);
        formData.append('contactPerson', values.meetingPerson);
        formData.append('reasonToVisit', values.visitReason);
        formData.append('spOfficeBranch', values.spOfficeBranch);
        formData.append('numberOfVisitors', values.numberOfVisitors);
        formData.append('visitorPhoto', photoFile);
        if (docFile) formData.append('uploadDocument', docFile);

         // ---------- MAIN CHANGE: ADD LOGGED-IN USER DATA ----------
        if (loggedInUser) {
          formData.append('addedByUserId', loggedInUser._id || '');
          formData.append('addedByRole', loggedInUser.role || '');
          formData.append('officeName', loggedInUser.officeName || '');
          formData.append('officeType', loggedInUser.officeType || '');
          formData.append('addedByEmail', loggedInUser.email || '');
        }


        const res = await axios.post(`${baseUrl}/addVisitor`, formData);
        const applicationId = res.data.applicationId || res.data.newVisit?.applicationId || 'N/A';

        setSuccess(true);
        toast.success('नोंद यशस्वी झाली!', {
          position: "top-right",
          autoClose: 3000,
        });
        resetForm();
        setCapturedPhoto('');
        setTimeout(() => setSuccess(false), 6000);

        printVisitorPass({ ...values, photo: values.photo, applicationId });

      } catch (err) {
        const errorMessage = err.response?.data?.message || 'काहीतरी चुकले!';
        setError(errorMessage);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 4000,
        });
        setTimeout(() => setError(''), 8000);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formik.values.mobile.length === 10) {
        fetchVisitorData(formik.values.mobile);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [formik.values.mobile]);

  const fetchVisitorData = async (mobileNumber) => {
    setFetchingVisitor(true);
    try {
      const res = await axios.get(
        `${baseUrl}/getVisitorByMobileNumber?mobileNumber=${mobileNumber}`
      );

      if (res.data.success && res.data.visitor) {
        const visitorData = res.data.visitor;

        formik.setFieldValue('name', visitorData.fullName || '');
        formik.setFieldValue('address', visitorData.fullAddress || '');
        formik.setFieldValue('pincode', visitorData.pincode || '');
        formik.setFieldValue('policeStation', visitorData.policeStation || '');

        toast.info('माहिती आढळली! तपशील भरले आहेत.', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.log('Visitor not found or error fetching data');
    } finally {
      setFetchingVisitor(false);
    }
  };

  const marathiMeetingPerson = formik.values.meetingPerson
    ? (meetingPersonMarathi[formik.values.meetingPerson] || formik.values.meetingPerson)
    : '-';

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ bgcolor: '#f0f4f8', mt: 15 }}>
        <ToastContainer />
        <Box sx={{ bgcolor: '#0040B9', color: 'white', py: 3, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold">नोंदणी फॉर्म</Typography>
        </Box>

        <Container maxWidth="lg" sx={{ mt: 6, pb: 8 }}>
          {success && <Alert severity="success" sx={{ mb: 3 }}>नोंद यशस्वी झाली!</Alert>}
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={6}>

              <Grid item xs={12} md={6}>
                <Paper elevation={20} sx={{ borderRadius: 4, p: 5, border: '5px solid #0040B9' }}>
                  <Typography variant="h5" fontWeight="bold" color="#0040B9" mb={4}>अभ्यागत तपशील</Typography>
                  <Grid container spacing={2.5}>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="मोबाईल नंबर *"
                        name="mobile"
                        value={formik.values.mobile}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          formik.setFieldValue('mobile', value);
                        }}
                        inputProps={{ maxLength: 10 }}
                        required
                        InputProps={{
                          endAdornment: fetchingVisitor && <CircularProgress size={20} />
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="पूर्ण नाव *"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        required
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="पूर्ण पत्ता *"
                        multiline
                        rows={2}
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="पिनकोड *"
                        name="pincode"
                        value={formik.values.pincode}
                        onChange={formik.handleChange}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="जिल्हा"
                        value="ठाणे / Thane"
                        disabled
                      />
                    </Grid>

                    {/* <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="पोलीस स्टेशन *"
                        name="policeStation"
                        value={formik.values.policeStation}
                        onChange={formik.handleChange}
                        required
                      >
                        <MenuItem value="" disabled>— स्टेशन निवडा —</MenuItem>
                        {policeStations.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                      </TextField>
                    </Grid> */}


                     {/* Dynamic Police Station Dropdown */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="पोलीस स्टेशन *"
                        name="policeStation"
                        value={formik.values.policeStation}
                        onChange={formik.handleChange}
                        required
                        disabled={loadingStations}
                      >
                        <MenuItem value="" disabled>
                          {loadingStations ? "लोड होत आहे..." : "— स्टेशन निवडा —"}
                        </MenuItem>
                        {policeStations.map((station) => (
                          <MenuItem key={station.id} value={station.marathiName}>
                            {station.marathiName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="कोणास भेटायचे *"
                        name="meetingPerson"
                        value={formik.values.meetingPerson}
                        onChange={formik.handleChange}
                        required
                      >
                        <MenuItem value="" disabled>— अधिकारी निवडा —</MenuItem>
                        <MenuItem value="Superintendent of Police">पोलीस अधीक्षक</MenuItem>
                        <MenuItem value="Additional Superintendent of Police">अपर पोलीस अधीक्षक</MenuItem>
                        <MenuItem value="Sub-Divisional Officer, Ganeshpuri">उप विभागीय अधिकारी गणेशपुरी</MenuItem>
                        <MenuItem value="Sub-Divisional Officer, Shahapur">उप विभागीय अधिकारी शहापूर</MenuItem>
                        <MenuItem value="Sub-Divisional Officer, Murbad">उप विभागीय अधिकारी मुरबाड</MenuItem>
                        <MenuItem value="Sub-Divisional Officer, Home Department">उप विभागीय अधिकारी गृह</MenuItem>
                        <MenuItem value="In-Charge Officer">प्रभारी अधिकारी</MenuItem>
                        <MenuItem value="पोलीस निरीक्षक">पोलीस निरीक्षक</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="भेटीचे कारण *"
                        name="visitReason"
                        value={formik.values.visitReason}
                        onChange={formik.handleChange}
                        required
                      >
                        <MenuItem value="" disabled>— कारण निवडा —</MenuItem>
                        {visitReasonsMr.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="पोलीस अधीक्षक कार्यालय विभाग"
                        name="spOfficeBranch"
                        value={formik.values.spOfficeBranch}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value="" disabled>— शाखा निवडा —</MenuItem>
                        <MenuItem value="Home Department">गृह विभाग</MenuItem>
                        <MenuItem value="Crime">गुन्हे</MenuItem>
                        <MenuItem value="Local Crime Branch (LCB)">स्थानिक गुन्हे शाखा</MenuItem>
                        <MenuItem value="Economic Offences Wing (EOW)">आर्थिक गुन्हे शाखा</MenuItem>
                        <MenuItem value="District Special Branch (DSB)">जिल्हा विशेष शाखा</MenuItem>
                        <MenuItem value="Police Communication & Information Technology">पोलीस दळणवळण व माहिती तंत्रज्ञान</MenuItem>
                        <MenuItem value="Passport">पासपोर्ट</MenuItem>
                        <MenuItem value="Police Verification">पोलीस तपासणी</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="सोबत किती जण?"
                        name="numberOfVisitors"
                        value={formik.values.numberOfVisitors}
                        onChange={formik.handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        startIcon={<AttachFileIcon />}
                        component="label"
                        fullWidth
                        sx={{ py: 1.5 }}
                      >
                        दस्तऐवज अपलोड (ऐच्छिक)
                        <input
                          type="file"
                          hidden
                          accept="image/*,application/pdf"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                formik.setFieldValue('uploadDocument', reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </Button>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading || !capturedPhoto}
                        sx={{ py: 2.5, fontSize: '1.4rem', fontWeight: 'bold', bgcolor: '#0040B9', '&:hover': { bgcolor: '#002D80' } }}
                      >
                        {loading ? <CircularProgress size={28} color="inherit" /> : "एंट्री सबमिट करा"}
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  elevation={20}
                  sx={{
                    minHeight: '600px',
                    borderRadius: 4,
                    border: '5px solid #0040B9',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
                    overflow: 'hidden'
                  }}
                >
                  <Box sx={{
                    background: 'linear-gradient(135deg, #0040B9 0%, #0056D6 100%)',
                    height: '180px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Box sx={{
                      position: 'absolute',
                      bottom: -70,
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}>
                      {!capturedPhoto && !showWebcam && (
                        <Box sx={{
                          width: 160,
                          height: 160,
                          bgcolor: '#E3F2FD',
                          borderRadius: 3,
                          border: '6px dashed #0040B9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                          background: 'white'
                        }}>
                          <PhotoCamera sx={{ fontSize: 70, color: '#0040B9', opacity: 0.5 }} />
                        </Box>
                      )}

                      {showWebcam && (
                        <Box sx={{ textAlign: 'center' }}>
                          <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={300}
                            height={300}
                            style={{
                              borderRadius: '12px',
                              border: '6px solid white',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                            }}
                          />
                        </Box>
                      )}

                      {capturedPhoto && !showWebcam && (
                        <img
                          src={capturedPhoto}
                          alt="Visitor"
                          style={{
                            width: 160,
                            height: 160,
                            objectFit: 'cover',
                            borderRadius: '12px',
                            border: '6px solid white',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  <CardContent sx={{ pt: showWebcam ? 20 : 10, px: 4, pb: 4 }}>
                    {showWebcam && (
                      <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Button
                          variant="contained"
                          color="success"
                          size="large"
                          onClick={() => {
                            const imageSrc = webcamRef.current?.getScreenshot();
                            if (imageSrc) {
                              setCapturedPhoto(imageSrc);
                              setShowWebcam(false);
                              formik.setFieldValue('photo', imageSrc);
                            }
                          }}
                          sx={{ mr: 2 }}
                        >
                          कॅप्चर
                        </Button>
                        <Button
                          variant="outlined"
                          size="large"
                          onClick={() => setShowWebcam(false)}
                        >
                          रद्द
                        </Button>
                      </Box>
                    )}

                    {!showWebcam && !capturedPhoto && (
                      <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h6" fontWeight="bold" color="#0040B9" sx={{ mb: 2 }}>
                          अभ्यागत फोटो
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<PhotoCamera />}
                          onClick={() => setShowWebcam(true)}
                          sx={{ mr: 2, bgcolor: '#0040B9', '&:hover': { bgcolor: '#002D80' } }}
                        >
                          वेबकॅम
                        </Button>
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<AttachFileIcon />}
                        >
                          अपलोड
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setCapturedPhoto(reader.result);
                                  formik.setFieldValue('photo', reader.result);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </Button>
                      </Box>
                    )}

                    {capturedPhoto && !showWebcam && (
                      <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h6" fontWeight="bold" color="#0040B9" sx={{ mb: 2 }}>
                          {formik.values.name || 'अभ्यागत'}
                        </Typography>
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => {
                            setCapturedPhoto('');
                            formik.setFieldValue('photo', '');
                          }}
                        >
                          फोटो बदला
                        </Button>
                      </Box>
                    )}

                    {!showWebcam && (
                      <>
                        <Divider sx={{ my: 3 }} />

                        {formik.values.name || formik.values.mobile || formik.values.policeStation ? (
                          <>
                            {formik.values.mobile && (
                              <InfoRow
                                icon={<PhoneIcon sx={{ color: '#0040B9' }} />}
                                label="मोबाईल"
                                value={formik.values.mobile}
                              />
                            )}

                            {formik.values.policeStation && (
                              <InfoRow
                                icon={<LocationOnIcon sx={{ color: '#0040B9' }} />}
                                label="पोलीस स्टेशन"
                                value={formik.values.policeStation}
                              />
                            )}

                            {formik.values.meetingPerson && (
                              <InfoRow
                                icon={<PersonIcon sx={{ color: '#0040B9' }} />}
                                label="कोणास भेटायचे"
                                value={marathiMeetingPerson}
                              />
                            )}

                            {formik.values.visitReason && (
                              <InfoRow
                                icon={<DescriptionIcon sx={{ color: '#0040B9' }} />}
                                label="भेटीचे कारण"
                                value={formik.values.visitReason}
                              />
                            )}

                            {formik.values.spOfficeBranch && (
                              <Box sx={{
                                bgcolor: '#E3F2FD',
                                borderRadius: 2,
                                p: 2,
                                mt: 3
                              }}>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                  पोलीस अधीक्षक कार्यालय विभाग
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500, color: '#0040B9', mt: 0.5 }}>
                                  {formik.values.spOfficeBranch}
                                </Typography>
                              </Box>
                            )}
                          </>
                        ) : (
                          <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography
                              variant="h5"
                              fontWeight="bold"
                              color="#0040B9"
                              sx={{ mb: 1 }}
                            >
                              ठाणे ग्रामीण पोलीस
                            </Typography>
                            <Typography
                              variant="h6"
                              color="#0040B9"
                              sx={{ mb: 3 }}
                            >
                              नागरिक नोंदणी प्रणाली
                            </Typography>

                            <Divider sx={{ my: 3 }} />

                            <Box sx={{
                              bgcolor: '#E3F2FD',
                              borderRadius: 3,
                              p: 3,
                              mt: 4
                            }}>
                              <Typography
                                color="text.secondary"
                                sx={{ fontSize: '1rem', lineHeight: 1.8 }}
                              >
                                👈 डावीकडे माहिती भरा आणि तुमची माहिती येथे दिसेल
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default EntryForm;


