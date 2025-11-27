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


// src/components/EntryForm.js  ← पूरा कोड (Copy-Paste कर दो)

import React, { useState, useRef } from 'react';
import {
  Box, Typography, TextField, Button, Container, Paper, Grid, FormControl,
  InputLabel, Select, MenuItem, Card, CardContent, Avatar, ToggleButton, ToggleButtonGroup,
  CircularProgress, Alert
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Webcam from 'react-webcam';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { baseUrl } from '../config/config';

const talukas = ["Thane", "Ulhasnagar", "Kalyan", "Bhiwandi", "Ambarnath", "Murbad", "Shahapur"];

const visitReasonsMr = ["तक्रार नोंद", "FIR", "चौकशी", "दस्तऐवज", "पास", "भेट", "इतर"];
const visitReasonsEn = ["Complaint", "FIR", "Inquiry", "Documents", "Pass", "Meeting", "Other"];

const policeStations = [
  "भिवंडी तालुका", "गणेशपुरी", "कल्याण तालुका", "कसारा", "किन्हवली",
  "कुलगाव", "मुरबाड", "पडघा", "शहापूर", "टोकावडे", "वसिंद"
];

const texts = {
  mr: {
    subtitle: "नोंदणी फॉर्म",
    visitorDetails: "अभ्यागत तपशील",
    name: "पूर्ण नाव *",
    mobile: "मोबाईल नंबर *",
    address: "पूर्ण पत्ता *",
    pincode: "पिनकोड *",
    taluka: "तालुका *",
    district: "जिल्हा",
    policeStation: "पोलीस स्टेशन *",
    meetingPerson: "भेटीची व्यक्ती *",
    visitReason: "भेटीचे कारण *",
    photoTitle: "अभ्यागत फोटो",
    webcamBtn: "वेबकॅम",
    uploadBtn: "अपलोड",
    changePhoto: "फोटो बदला",
    captureBtn: "कॅप्चर",
    cancelBtn: "रद्द",
    submitBtn: "एंट्री सबमिट करा | Submit Entry",
    livePreview: "लाइव्ह एंट्री प्रीव्ह्यू",
    timeLabel: "वेळ :"
  },
  en: {
    subtitle: "Visitor Entry Registration",
    visitorDetails: "Visitor Details",
    name: "Full Name *",
    mobile: "Mobile Number *",
    address: "Full Address *",
    pincode: "Pincode *",
    taluka: "Taluka *",
    district: "District",
    policeStation: "Police Station *",
    meetingPerson: "Person to Meet *",
    visitReason: "Purpose of Visit *",
    photoTitle: "Visitor Photo",
    webcamBtn: "Webcam",
    uploadBtn: "Upload",
    changePhoto: "Change Photo",
    captureBtn: "Capture",
    cancelBtn: "Cancel",
    submitBtn: "Submit Entry | एंट्री सबमिट करा",
    livePreview: "Live Entry Preview",
    timeLabel: "Time :"
  }
};

const validationSchema = Yup.object({
  name: Yup.string().required('नाव आवश्यक आहे'),
  mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'अवैध मोबाईल').required('आवश्यक'),
  address: Yup.string().required('पत्ता आवश्यक आहे'),
  pincode: Yup.string().matches(/^\d{6}$/, '६ अंक').required('आवश्यक'),
  taluka: Yup.string().required('तालुका निवडा'),
  policeStation: Yup.string().required('पोलीस स्टेशन निवडा'),
  meetingPerson: Yup.string().required('भेटीची व्यक्ती लिहा'),
  visitReason: Yup.string().required('कारण निवडा'),
  photo: Yup.string().required('फोटो आवश्यक आहे'),
});

const EntryForm = () => {
  const [lang, setLang] = useState('mr'); // मराठी डिफॉल्ट
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const webcamRef = useRef(null);
  const t = texts[lang];
  const reasons = lang === 'mr' ? visitReasonsMr : visitReasonsEn;

  const now = new Date();
  const dateTime = now.toLocaleString('en-IN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).replace(',', ' |');

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedPhoto(imageSrc);
      setShowWebcam(false);
      formik.setFieldValue('photo', imageSrc);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedPhoto(reader.result);
        formik.setFieldValue('photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '', mobile: '', address: '', pincode: '', taluka: '',
      policeStation: '', meetingPerson: '', visitReason: '', photo: ''
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setSuccess(false);
      setError('');

      try {
        const response = await fetch(values.photo);
        const blob = await response.blob();
        const file = new File([blob], "visitor_photo.jpg", { type: "image/jpeg" });

        const formData = new FormData();
        formData.append('fullName', values.name);
        formData.append('mobileNumber', values.mobile);
        formData.append('fullAddress', values.address);
        formData.append('pincode', values.pincode);
        formData.append('district', 'ठाणे');
        formData.append('taluka', values.taluka);
        formData.append('policeStation', values.policeStation);
        formData.append('contactPerson', values.meetingPerson);
        formData.append('reasonToVisit', values.visitReason);
        formData.append('visitorPhoto', file);
        formData.append('feedbackGiven', 'false');

        await axios.post(`${baseUrl}/api/addVisitor`, formData);

        setSuccess(true);
        resetForm();
        setCapturedPhoto('');
        setTimeout(() => setSuccess(false), 6000);

      } catch (err) {
        const msg = err.response?.data?.message || 'काहीतरी चुकले!';
        setError(lang === 'mr' ? `त्रुटी: ${msg}` : `Error: ${msg}`);
        setTimeout(() => setError(''), 8000);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box sx={{ bgcolor: '#f0f4f8',mt:15 }}>
      {/* Header with Language Toggle */}
      <Box sx={{ bgcolor: '#0040B9', color: 'white', py: 3, textAlign: 'center', position: 'relative' }}>
        {/* <Typography variant="h4" fontWeight="bold">ठाणे ग्रामीण पोलीस</Typography> */}
        <Typography variant="h6" sx={{ opacity: 0.9 }}>{t.subtitle}</Typography>

        {/* Language Toggle - Top Right */}
        <ToggleButtonGroup
          value={lang}
          exclusive
          onChange={(_, newLang) => newLang && setLang(newLang)}
          sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'white', borderRadius: 3 }}
        >
          <ToggleButton value="mr" sx={{ color: lang === 'mr' ? '#0040B9' : '#666', fontWeight: 'bold' }}>
            मराठी
          </ToggleButton>
          <ToggleButton value="en" sx={{ color: lang === 'en' ? '#0040B9' : '#666', fontWeight: 'bold' }}>
            English
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
        {success && <Alert severity="success" sx={{ mb: 3 }}>अभ्यागताची नोंद यशस्वी झाली!</Alert>}
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            {/* Left Form */}
            <Grid item xs={12} md={6}>
              <Paper elevation={12} sx={{ borderRadius: 4, p: 4, border: '3px solid #0040B9' }}>
                <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>{t.visitorDetails}</Typography>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}><TextField fullWidth label={t.name} name="name" value={formik.values.name} onChange={formik.handleChange} required /></Grid>
                  <Grid item xs={12} sm={6}><TextField fullWidth label={t.mobile} name="mobile" value={formik.values.mobile} onChange={formik.handleChange} required /></Grid>
                  <Grid item xs={12}><TextField fullWidth label={t.address} multiline rows={2} name="address" value={formik.values.address} onChange={formik.handleChange} required /></Grid>
                  <Grid item xs={12} sm={6}><TextField fullWidth label={t.pincode} name="pincode" value={formik.values.pincode} onChange={formik.handleChange} required /></Grid>
                  <Grid item xs={12} sm={6}><TextField fullWidth label={t.district} value="ठाणे / Thane" disabled /></Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>{t.taluka}</InputLabel>
                      <Select name="taluka" value={formik.values.taluka} onChange={formik.handleChange} required>
                        {talukas.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>{t.policeStation}</InputLabel>
                      <Select name="policeStation" value={formik.values.policeStation} onChange={formik.handleChange} required>
                        <MenuItem value="" disabled><em>— स्टेशन निवडा —</em></MenuItem>
                        {policeStations.map(st => <MenuItem key={st} value={st}>{st}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}><TextField fullWidth label={t.meetingPerson} name="meetingPerson" value={formik.values.meetingPerson} onChange={formik.handleChange} required /></Grid>


                  <Grid item xs={12} sm={6}><TextField fullWidth label={t.visitReason} name="visitReason" value={formik.values.visitReason} onChange={formik.handleChange} required /></Grid>



                  {/* <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>{t.visitReason}</InputLabel>
                      <Select name="visitReason" value={formik.values.visitReason} onChange={formik.handleChange} required>
                        {reasons.map((r, i) => <MenuItem key={i} value={r}>{r}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid> */}

                  <Grid item xs={12}>
                    <Button
                      fullWidth variant="contained" type="submit" size="large"
                      disabled={loading || !capturedPhoto}
                      sx={{ py: 2.5, fontSize: '1.4rem', fontWeight: 'bold', bgcolor: '#0040B9' }}
                    >
                      {loading ? <CircularProgress size={28} color="inherit" /> : t.submitBtn}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Right Photo + Live Preview */}
            <Grid item xs={12} md={6}>
              <Card elevation={16} sx={{ borderRadius: 4, textAlign: 'center', bgcolor: '#f8fbff', border: '4px solid #0040B9' }}>
                <CardContent sx={{ pt: 5 }}>
                  <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>{t.photoTitle}</Typography>

                  {!capturedPhoto ? (
                    <Box sx={{ my: 4 }}>
                      <Avatar sx={{ width: 240, height: 240, mx: 'auto', bgcolor: '#e3e8f5', border: '8px dashed #0040B9' }}>
                        <PhotoCamera sx={{ fontSize: 90, color: '#0040B9' }} />
                      </Avatar>
                      <Box sx={{ mt: 3 }}>
                        <Button variant="contained" startIcon={<PhotoCamera />} onClick={() => setShowWebcam(true)}
                          sx={{ mr: 2, bgcolor: '#0040B9', px: 4 }}>{t.webcamBtn}</Button>
                        <Button variant="outlined" component="label" sx={{ px: 4 }}>
                          {t.uploadBtn} <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ my: 3 }}>
                      <img src={capturedPhoto} alt="Visitor" style={{ width: 260, height: 260, objectFit: 'cover', borderRadius: '50%', border: '10px solid #0040B9' }} />
                      <br /><br />
                      <Button variant="text" color="error" onClick={() => { setCapturedPhoto(''); formik.setFieldValue('photo', ''); }}>
                        {t.changePhoto}
                      </Button>
                    </Box>
                  )}

                  {showWebcam && (
                    <Box sx={{ mt: 4 }}>
                      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={320} height={320}
                        style={{ borderRadius: '50%', border: '8px solid #0040B9' }} />
                      <Box mt={3}>
                        <Button variant="contained" color="success" onClick={capture} sx={{ mr: 2 }}>{t.captureBtn}</Button>
                        <Button variant="outlined" onClick={() => setShowWebcam(false)}>{t.cancelBtn}</Button>
                      </Box>
                    </Box>
                  )}

                  {/* Live Preview */}
                  {formik.values.name && (
                    <Paper elevation={8} sx={{ mt: 5, p: 3, bgcolor: '#e3edff', borderRadius: 3 }}>
                      <Typography fontWeight="bold" color="#0040B9">{t.livePreview}</Typography>
                      <Typography><strong>नाव :</strong> {formik.values.name}</Typography>
                      <Typography><strong>मोबाईल :</strong> {formik.values.mobile}</Typography>
                      <Typography><strong>तालुका :</strong> {formik.values.taluka || '-'}</Typography>
                      <Typography><strong>पोलीस स्टेशन :</strong> {formik.values.policeStation || '-'}</Typography>
                      <Typography><strong>भेट :</strong> {formik.values.meetingPerson || '-'}</Typography>
                      <Typography><strong>कारण :</strong> {formik.values.visitReason || '-'}</Typography>
                      <Typography><strong>{t.timeLabel}</strong> {dateTime}</Typography>
                    </Paper>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default EntryForm;