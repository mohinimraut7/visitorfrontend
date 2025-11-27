// import React,{useEffect,useState} from 'react';
// import { Box, Typography, TextField, Button, Container,Divider } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { toast } from "react-toastify";

// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../store/actions/loginActions';
// import MathCaptcha from "./MathCapcha"; 

// import { useNavigate } from 'react-router-dom';
// import './Auth.css';
// import '../../Images/vasaivirarmahangarpalika.jpg';
// import vvcmclogo from '../../Images/vvcmclogo.jpg';
// const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: Yup.string().required('Password is required'),
// });

// const Login = () => {
//     const [captchaValid, setCaptchaValid] = useState(false); 

//     const dispatch = useDispatch();
//     const navigate=useNavigate();
//     const authError = useSelector((state) => state.auth.error);
//     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//     useEffect(() => {
   
//         document.body.classList.add('auth-body');
//         return () => {
//           document.body.classList.remove('auth-body');
//         };
    
//       }, [dispatch]);

   

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//         },
//         validationSchema: validationSchema,
//         onSubmit: (values,{resetForm,setSubmitting}) => {
//              if (!captchaValid) {
//         toast.error("Incorrect CAPTCHA. Please try again.", { position: "top-center" });
//         return;
//       }
//             dispatch(login(values, navigate))
            
//             .then(()=>{
//                 resetForm();
//             }).catch(()=>{
//                setSubmitting(false);
//             })
//         },
//     });

//     return (
//         <Container className="Auth-Container" maxWidth="sm">
//             <Box
//                 sx={{
//                     width: '80%',
//                     margin: 'auto',
//                     padding: '10px 30px 30px 30px',
//                     border: '1px solid #d3d3d3',
//                     borderRadius: '8px',
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                     bgcolor: 'background.paper'
//                 }}
//                 component='form'
//                 onSubmit={formik.handleSubmit}
                
//             >


// <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
// <Box sx={{ width: '30%', height: '30%',}}>
//     <img src={vvcmclogo} height='100%' width='100%' /></Box>
// </Box>


             
//                 <Box className="Auth-LIB" >
             
//                 <TextField
//                     fullWidth
//                     id="email"
//                     name="email"
//                     label="Enter email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     error={formik.touched.email && Boolean(formik.errors.email)}
//                     helperText={formik.touched.email && formik.errors.email}
//                     margin="normal"
//                     variant="outlined"
//                     className="Auth-Input"
//                    size="small"
//                     InputLabelProps={{
//                         sx: {
//                             color: 'gray', 
//                         },
//                     }}
//                 />
//                 </Box>

//                 <Box className="Auth-LIB" >
               
//                 <TextField
//                     fullWidth
//                     id="password"
//                     name="password"
//                     label="Password"
//                     type="password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     error={formik.touched.password && Boolean(formik.errors.password)}
//                     helperText={formik.touched.password && formik.errors.password}
//                     margin="normal"
//                     variant="outlined"
//                     className="Auth-Input"
//                    size="small"
//                     InputLabelProps={{
//                         sx: {
//                             color: 'gray',
//                         },

//                     }}
//                 />
//                 </Box>

//                 <MathCaptcha onValidate={setCaptchaValid} />

                
//                 {authError && (
//                     <Typography variant="body2" color="error" align="center" paragraph>
//                         {authError}
//                     </Typography>
//                 )}
//                 <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         className='Auth-Button'
//                         sx={{
                            
//                             '&:hover': {
//                                 bgcolor: '#81c784',
//                             }
//                         }}
//                     >
//                         Login
//                     </Button>
                    
//                 </Box>

//                 <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       mt:3
//       }}
//     >
//       <Divider
//         sx={{
//           width: '20%', 
//           borderColor: '#c3c3c3', 
//           borderWidth: '0.5px', 
//           mr:1
//         }}
//       />
//       <Typography sx={{fontSize:'10px',color:'gray',fontWeight:'bold'}}>Or</Typography>
//       <Divider
//         sx={{
//           width: '20%',
//           borderColor: '#c3c3c3', 
//           borderWidth: '0.5px', 
//           ml:1
//         }}
//       />
//     </Box>


//                 <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         className='Auth-Button-Signup'
//                         sx={{
                            
//                             '&:hover': {
//                                 bgcolor: '#81c784',
//                             }
//                         }}
//                     >
//                         <Typography
//         component={Link}
//         to="/register"
//         sx={{
//             fontSize:{
//              xl:'12px',
//              lg:'12px',
//              md:'10px',
//              sm:'9px',
//              xs:'9px'
//             },
//           textDecoration: 'none', 
//           color: 'inherit',       
//           '&:hover': {
//             color: '#1976d2',     
//           }
//         }}
//       >
//         Create new account
//       </Typography>

//                     </Button>
                    
//                 </Box>
                
                
//             </Box>
            
//         </Container>
//     );
// };

// export default Login;

// ======================================================

// import React, { useEffect, useState } from 'react';
// import { Box, Typography, TextField, Button, Container, Divider,InputAdornment,IconButton } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import { toast } from "react-toastify";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../store/actions/loginActions';
// import MathCaptcha from "./MathCapcha"; // Import Captcha
// import { useNavigate } from 'react-router-dom';
// import vvcmclogo from '../../Images/vvcmclogo.jpg';
// import { baseUrl } from '../../config/config';
// import LoaderLottie from '../../components/LoaderLottie'; // Import Loader

// import './Auth.css';
// const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: Yup.string().required('Password is required'),
// });

// const Login = () => {
//     const [captchaValid, setCaptchaValid] = useState(false);
//     const [showResend, setShowResend] = useState(false); // State to show resend button
//     const [userEmail, setUserEmail] = useState(""); // Store email for resend
//     const [loading, setLoading] = useState(false);
//      const [showPassword, setShowPassword] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const authError = useSelector((state) => state.auth.error);
//     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//     useEffect(() => {
//         document.body.classList.add('auth-body');
//         return () => {
//             document.body.classList.remove('auth-body');
//         };
//     }, [dispatch]);

//     useEffect(() => {
//         if (authError === "Email is not verified. Please verify your email to login.") {
//             setShowResend(true);
//         } else {
//             setShowResend(false);
//         }
//     }, [authError]);

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//         },
//         validationSchema: validationSchema,
//         onSubmit:async (values, { resetForm, setSubmitting }) => {
//             if (!captchaValid) {
//                 toast.error("Incorrect CAPTCHA. Please try again.", { position: "top-center" });
//                 return;
//             }
//             setUserEmail(values.email); // Store email for resend verification
//             setLoading(true); 

//             // dispatch(login(values, navigate))
//             //     .then(() => {
//             //         resetForm();
//             //     })
//             //     .catch(() => {
//             //         setSubmitting(false);
//             //     });
//             try {
//                 await dispatch(login(values, navigate));
//                 resetForm();
//             } catch (error) {
//                 setSubmitting(false);
//             } finally {
//                 setLoading(false); // ✅ Hide Loader
//             }
//         },
//     });

//     // **Function to Resend Verification Email**
//     const handleResendVerification = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch(`${baseUrl}/resend-verification`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email: userEmail }),
//             });

//             const data = await response.json();
//             setLoading(false); 
//             toast.success(data.message || "Verification link sent!", { position: "top-center" });
//         } catch (error) {
//             setLoading(false); 
//             toast.error("Something went wrong. Please try again.", { position: "top-center" });
//         }
//     };
//     const handleTogglePassword = () => {
//         setShowPassword((prev) => !prev);
//     };

//     return (
//         <Container className="Auth-Container" maxWidth="sm">
           
//             <Box
//                 sx={{
//                     width: '80%',
//                     margin: 'auto',
//                     padding: '10px 30px 30px 30px',
//                     border: '1px solid #d3d3d3',
//                     borderRadius: '8px',
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                     bgcolor: 'background.paper'
//                 }}
//                 component='form'
//                 onSubmit={formik.handleSubmit}
//             >
//                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                     <Box sx={{ width: '30%', height: '30%' }}>
//                         <img src={vvcmclogo} height='100%' width='100%' alt="Logo" />
//                     </Box>
//                 </Box>

//                 <TextField
//                     fullWidth
//                     id="email"
//                     name="email"
//                     label="Enter email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     error={formik.touched.email && Boolean(formik.errors.email)}
//                     helperText={formik.touched.email && formik.errors.email}
//                     margin="normal"
//                     variant="outlined"
//                     size="small"
//                     InputLabelProps={{
//                         sx: { color: 'gray' },
//                     }}
//                 />

//                 <TextField
//                     fullWidth
//                     id="password"
//                     name="password"
//                     label="Password"
//                     type={showPassword ?'password':'text'}  
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     error={formik.touched.password && Boolean(formik.errors.password)}
//                     helperText={formik.touched.password && formik.errors.password}
//                     margin="normal"
//                     variant="outlined"
//                     size="small"
//                     InputLabelProps={{
//                         sx: { color: 'gray' },
//                     }}
//                     InputProps={{
//                         endAdornment: (
//                             <InputAdornment position="end">
//                                 <IconButton onClick={handleTogglePassword} edge="end">
//                                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>
//                         ),
//                     }}
//                 />

//                 <MathCaptcha onValidate={setCaptchaValid} />

//                 {authError && (
//                     <Typography variant="body2" color="error" align="center" paragraph>
//                         {authError}
//                     </Typography>
//                 )}

//                 {/* Show Resend Verification Button if User is not verified */}
//                 {showResend && (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//                         <Link
//                           className="anchorverificationlink"
//                             onClick={handleResendVerification}
//                         >
//                             Resend Verification Link
//                         </Link>

                       
//                     </Box>
//                 )}
// <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>{loading && <LoaderLottie />}</Box>

                

//                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                        className='Auth-Button'
//                         size="small"
//                         sx={{
//                              width:'80%',
//                             '&:hover': {
//                                 bgcolor: '#81c784',
                               
//                             }
//                         }}
//                     >
//                         Login
//                     </Button>
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
//                     <Divider sx={{ width: '20%', borderColor: '#c3c3c3', borderWidth: '0.5px', mr: 1 }} />
//                     <Typography sx={{ fontSize: '10px', color: 'gray', fontWeight: 'bold' }}>Or</Typography>
//                     <Divider sx={{ width: '20%', borderColor: '#c3c3c3', borderWidth: '0.5px', ml: 1 }} />
//                 </Box>

//                 <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                     <Button
//                         type="submit"
//                         variant="contained"
                      
//                         className='Auth-Button-Signup'
//                         sx={{
//                             backgroundColor:'#rgb(49,162,76)',
//                             '&:hover': {
//                                 bgcolor: '#81c784',
//                             }
//                         }}
//                     >
//                         <Typography
//                             component={Link}
//                             to="/register"
//                             sx={{
//                                 fontSize: { xl: '12px', lg: '12px', md: '10px', sm: '9px', xs: '9px' },
//                                 textDecoration: 'none',
//                                 color: 'inherit',
//                                 '&:hover': { fontWeight:'bold'},
//                             }}
//                         >
//                             Create new account
//                         </Typography>
//                     </Button>
//                 </Box>
                
//             </Box>
//         </Container>
//     );
// };

// export default Login;

// ===========================================


// import React, { useEffect, useState } from 'react';
// import { Box, Typography, TextField, Button, Container, Divider, InputAdornment, IconButton, Paper, Fade } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import { toast } from "react-toastify";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../store/actions/loginActions';
// import MathCaptcha from "./MathCapcha"; // Import Captcha
// import { useNavigate } from 'react-router-dom';
// import vvcmclogo from '../../Images/vvcmclogo.jpg';
// import { baseUrl } from '../../config/config';
// import LoaderLottie from '../../components/LoaderLottie'; // Import Loader

// import './Auth.css';

// const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: Yup.string().required('Password is required'),
// });

// const Login = () => {
//     const [captchaValid, setCaptchaValid] = useState(false);
//     const [showResend, setShowResend] = useState(false); // State to show resend button
//     const [userEmail, setUserEmail] = useState(""); // Store email for resend
//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const authError = useSelector((state) => state.auth.error);
//     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//     useEffect(() => {
//         document.body.classList.add('auth-body');
//         // document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
//         document.body.style.minHeight = '100vh';
//         document.body.style.margin = '0';
//         return () => {
//             document.body.classList.remove('auth-body');
//             document.body.style.background = '';
//             document.body.style.minHeight = '';
//         };
//     }, [dispatch]);

//     useEffect(() => {
//         if (authError === "Email is not verified. Please verify your email to login.") {
//             setShowResend(true);
//         } else {
//             setShowResend(false);
//         }
//     }, [authError]);

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//         },
//         validationSchema: validationSchema,
//         onSubmit: async (values, { resetForm, setSubmitting }) => {
//             if (!captchaValid) {
//                 toast.error("Incorrect CAPTCHA. Please try again.", { position: "top-center" });
//                 return;
//             }
//             setUserEmail(values.email); // Store email for resend verification
//             setLoading(true);

//             try {
//                 await dispatch(login(values, navigate));
//                 resetForm();
//             } catch (error) {
//                 setSubmitting(false);
//             } finally {
//                 setLoading(false); // ✅ Hide Loader
//             }
//         },
//     });

//     // **Function to Resend Verification Email**
//     const handleResendVerification = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch(`${baseUrl}/resend-verification`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email: userEmail }),
//             });

//             const data = await response.json();
//             setLoading(false);
//             toast.success(data.message || "Verification link sent!", { position: "top-center" });
//         } catch (error) {
//             setLoading(false);
//             toast.error("Something went wrong. Please try again.", { position: "top-center" });
//         }
//     };

//     const handleTogglePassword = () => {
//         setShowPassword((prev) => !prev);
//     };

//     return (
//         <Box 
//             sx={{ 
              
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 justifyContent: 'center',
//                 // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 // padding: { xs: 2, sm: 3, md: 4 }
//             }}
//         >
//             <Container className="Auth-Container" maxWidth="sm">
//                 <Fade in={true} timeout={800}>
//                     <Paper
//                         elevation={24}
//                         sx={{
//                             // width: { xs: '100%', sm: '90%', md: '85%' },
//                             // margin: 'auto',
//                             padding: { xs: '20px', sm: '30px', md: '20px' },
//                             borderRadius: { xs: '16px', sm: '20px' },
//                             boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
//                             bgcolor: 'background.paper',
//                             backdropFilter: 'blur(10px)',
//                             background: 'rgba(255, 255, 255, 0.98)',
//                             border: '1px solid rgba(255, 255, 255, 0.2)'
//                         }}
//                         component='form'
//                         onSubmit={formik.handleSubmit}
//                     >
//                         {/* Logo Section */}
//                         <Box sx={{ 
//                             display: 'flex', 
//                             justifyContent: 'center', 
//                             alignItems: 'center',
//                             mb: { xs: 3, sm: 4 }
//                         }}>
//                             <Box sx={{ 
//                                 width: { xs: '120px', sm: '140px', md: '100px' }, 
//                                 height: { xs: '120px', sm: '140px', md: '100px' },
//                                 borderRadius: '50%',
//                                 overflow: 'hidden',
//                                 boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
//                                 border: '4px solid rgba(255, 255, 255, 0.3)',
//                                 transition: 'transform 0.3s ease',
//                                 '&:hover': {
//                                     transform: 'scale(1.05)'
//                                 }
//                             }}>
//                                 <img 
//                                     src={vvcmclogo} 
//                                     height='100%' 
//                                     width='100%' 
//                                     alt="Logo"
//                                     style={{ objectFit: 'cover' }}
//                                 />
//                             </Box>
//                         </Box>

//                         {/* Welcome Text */}
//                         <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
//                             {/* <Typography 
//                                 variant="h4" 
//                                 sx={{ 
//                                     fontWeight: 'bold', 
//                                     color: '#333',
//                                     mb: 1,
//                                     fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
//                                     background: 'linear-gradient(135deg, #4caf50, #45a049)',
//                                     backgroundClip: 'text',
//                                     WebkitBackgroundClip: 'text',
//                                     WebkitTextFillColor: 'transparent'
//                                 }}
//                             >
//                                 Welcome Back
//                             </Typography> */}
//                             <Typography 
//                                  variant="h4" 
//                                 sx={{ 
//                                     fontWeight: 'bold', 
//                                     color: '#333',
//                                     mb: 1,
//                                     fontSize: '25px',
//                                     background: 'linear-gradient(135deg, #4caf50, #45a049)',
//                                     backgroundClip: 'text',
//                                     WebkitBackgroundClip: 'text',
//                                     WebkitTextFillColor: 'transparent'
//                                 }}
//                             >
//                                 Sign in to your account
//                             </Typography>
//                         </Box>

//                         <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>

//                                {/* Email Field */}
//                         <TextField
//                         size="small"
//                             fullWidth
//                             id="email"
//                             name="email"
//                             label="Enter email"
//                             value={formik.values.email}
//                             onChange={formik.handleChange}
//                             error={formik.touched.email && Boolean(formik.errors.email)}
//                             helperText={formik.touched.email && formik.errors.email}
//                             margin="normal"
//                             variant="outlined"
//                             InputLabelProps={{
//                                 sx: { 
//                                     color: 'gray',
//                                     fontSize: { xs: '14px', sm: '16px' }
//                                 },
//                             }}
//                             sx={{
//                                   width: '80%',
//                                 '& .MuiOutlinedInput-root': {
//                                     borderRadius: '12px',
//                                     backgroundColor: '#f8f9fa',
//                                     transition: 'all 0.3s ease',
//                                     '&:hover': {
//                                         backgroundColor: '#fff',
//                                         transform: 'translateY(-2px)',
//                                         boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//                                     },
//                                     '&.Mui-focused': {
//                                         backgroundColor: '#fff',
//                                         transform: 'translateY(-2px)',
//                                         boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
//                                     },
//                                     '& fieldset': {
//                                         borderColor: '#e0e0e0',
//                                         borderWidth: '2px'
//                                     },
//                                     '&:hover fieldset': {
//                                         borderColor: '#4caf50',
//                                     },
//                                     '&.Mui-focused fieldset': {
//                                         borderColor: '#4caf50',
//                                         borderWidth: '2px',
//                                     },
//                                 },
//                                 mb: { xs: 1, sm: 2 }
//                             }}
//                         />

//                         {/* Password Field */}
//                         <TextField
//                         size="small"
//                             fullWidth
//                             id="password"
//                             name="password"
//                             label="Password"
//                             type={showPassword ? 'text' : 'password'}
//                             value={formik.values.password}
//                             onChange={formik.handleChange}
//                             error={formik.touched.password && Boolean(formik.errors.password)}
//                             helperText={formik.touched.password && formik.errors.password}
//                             margin="normal"
//                             variant="outlined"
//                             InputLabelProps={{
//                                 sx: { 
//                                     color: 'gray',
//                                     fontSize: { xs: '14px', sm: '16px' }
//                                 },
//                             }}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton 
//                                             onClick={handleTogglePassword} 
//                                             edge="end"
//                                             sx={{
//                                                 color: '#4caf50',
//                                                 '&:hover': {
//                                                     backgroundColor: 'rgba(76, 175, 80, 0.1)',
//                                                     transform: 'scale(1.1)'
//                                                 }
//                                             }}
//                                         >
//                                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 ),
//                             }}
//                             sx={{
//                                 width: '80%',
//                                 '& .MuiOutlinedInput-root': {
//                                     borderRadius: '12px',
//                                     backgroundColor: '#f8f9fa',
//                                     transition: 'all 0.3s ease',
//                                     '&:hover': {
//                                         backgroundColor: '#fff',
//                                         transform: 'translateY(-2px)',
//                                         boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//                                     },
//                                     '&.Mui-focused': {
//                                         backgroundColor: '#fff',
//                                         transform: 'translateY(-2px)',
//                                         boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
//                                     },
//                                     '& fieldset': {
//                                         borderColor: '#e0e0e0',
//                                         borderWidth: '2px'
//                                     },
//                                     '&:hover fieldset': {
//                                         borderColor: '#4caf50',
//                                     },
//                                     '&.Mui-focused fieldset': {
//                                         borderColor: '#4caf50',
//                                         borderWidth: '2px',
//                                     },
//                                 },
//                                 mb: { xs: 2, sm: 3 }
//                             }}
//                         />
//                         </Box>

                     

//                         {/* CAPTCHA */}
//                         <Box 
//                         // sx={{ mb: { xs: 2, sm: 3 } }}
//                         >
//                             <MathCaptcha onValidate={setCaptchaValid} />
//                         </Box>

//                         {/* Error Message */}
//                         {authError && (
//                             <Fade in={Boolean(authError)}>
//                                 <Paper 
//                                     elevation={2}
//                                     sx={{ 
//                                         mb: 2,
//                                         p: 2,
//                                         backgroundColor: '#ffebee',
//                                         borderRadius: '12px',
//                                         border: '1px solid #ffcdd2'
//                                     }}
//                                 >
//                                     <Typography 
//                                         variant="body2" 
//                                         color="error" 
//                                         align="center" 
//                                         sx={{ 
//                                             fontSize: { xs: '12px', sm: '14px' },
//                                             fontWeight: 500
//                                         }}
//                                     >
//                                         {authError}
//                                     </Typography>
//                                 </Paper>
//                             </Fade>
//                         )}

//                         {/* Show Resend Verification Button if User is not verified */}
//                         {showResend && (
//                             <Fade in={showResend}>
//                                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
//                                     <Typography
//                                         component="button"
//                                         type="button"
//                                         className="anchorverificationlink"
//                                         onClick={handleResendVerification}
//                                         sx={{
//                                             background: 'none',
//                                             border: 'none',
//                                             color: '#4caf50',
//                                             textDecoration: 'underline',
//                                             cursor: 'pointer',
//                                             fontSize: { xs: '12px', sm: '14px' },
//                                             fontWeight: 500,
//                                             padding: '8px 16px',
//                                             borderRadius: '8px',
//                                             transition: 'all 0.3s ease',
//                                             '&:hover': {
//                                                 color: '#45a049',
//                                                 fontWeight: 'bold',
//                                                 backgroundColor: 'rgba(76, 175, 80, 0.1)',
//                                                 transform: 'translateY(-1px)'
//                                             }
//                                         }}
//                                     >
//                                         Resend Verification Link
//                                     </Typography>
//                                 </Box>
//                             </Fade>
//                         )}

//                         {/* Loading Animation */}
//                         {loading && (
//                             <Fade in={loading}>
//                                 <Box sx={{ 
//                                     display: 'flex', 
//                                     justifyContent: 'center', 
//                                     alignItems: 'center', 
//                                     width: '100%',
//                                     // mb: 2,
//                                     // p: 2
//                                 }}>
//                                     <LoaderLottie />
//                                 </Box>
//                             </Fade>
//                         )}

//                         {/* Login Button */}
//                         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}>
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 color="primary"
//                                 className='Auth-Button'
//                                 size="small"
//                                 sx={{
//                                     width: { xs: '100%', sm: '80%' },
//                                     // py: { xs: 1.5, sm: 2 },
//                                     borderRadius: '12px',
//                                     fontSize: { xs: '14px', sm: '16px' },
//                                     fontWeight: 'bold',
//                                     background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
//                                     boxShadow: '0 6px 20px rgba(76, 175, 80, 0.3)',
//                                     textTransform: 'none',
//                                     '&:hover': {
//                                         background: 'linear-gradient(135deg, #45a049 0%, #388e3c 100%)',
//                                         boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)',
//                                         transform: 'translateY(-2px)',
//                                     },
//                                     transition: 'all 0.3s ease'
//                                 }}
//                             >
//                                 Login
//                             </Button>
//                         </Box>

//                         {/* Divider */}
//                         <Box sx={{ 
//                             display: 'flex', 
//                             alignItems: 'center', 
//                             justifyContent: 'center', 
//                             mt: { xs: 3, sm: 1.5 },
//                             mb: { xs: 2, sm: 1.5 }
//                         }}>
//                             <Divider 
//                                 sx={{ 
//                                     width: '30%', 
//                                     borderColor: '#e0e0e0', 
//                                     borderWidth: '1px',
//                                     '&::before, &::after': {
//                                         borderColor: '#e0e0e0',
//                                         borderWidth: '1px'
//                                     }
//                                 }} 
//                             />
//                             <Typography sx={{ 
//                                 fontSize: { xs: '12px', sm: '14px' }, 
//                                 color: 'gray', 
//                                 fontWeight: 'bold',
//                                 // mx: 2,
//                                 // px: 2,
//                                 // py: 1,
//                                 backgroundColor: '#f5f5f5',
//                                 borderRadius: '20px'
//                             }}>
//                                 Or
//                             </Typography>
//                             <Divider 
//                                 sx={{ 
//                                     width: '30%', 
//                                     borderColor: '#e0e0e0', 
//                                     borderWidth: '1px',
//                                     '&::before, &::after': {
//                                         borderColor: '#e0e0e0',
//                                         borderWidth: '1px'
//                                     }
//                                 }} 
//                             />
//                         </Box>

//                         {/* Create Account Button */}
//                         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                             <Button
//                                 variant="outlined"
//                                 // className='Auth-Button-Signup'
//                                 size="small"
//                                 sx={{
//                                     width: { xs: '100%', sm: '80%' },
//                                     // py: { xs: 1.5, sm: 2 },
//                                     borderRadius: '12px',
//                                     fontSize: { xs: '12px', sm: '14px' },
//                                     fontWeight: 'bold',
//                                     borderColor: '#4caf50',
//                                     color: '#fff',
//                                     backgroundColor: '#4caf50',
//                                     borderWidth: '2px',
//                                     textTransform: 'none',
//                                     '&:hover': {
//                                         backgroundColor: '#4caf50',
//                                         color: 'white',
//                                         borderColor: '#4caf50',
//                                         transform: 'translateY(-2px)',
//                                         boxShadow: '0 6px 20px rgba(76, 175, 80, 0.3)',
//                                         borderWidth: '2px'
//                                     },
//                                     transition: 'all 0.3s ease'
//                                 }}
//                             >
//                                 <Typography
//                                     component={Link}
//                                     to="/register"
//                                     sx={{
//                                         fontSize: 'inherit',
//                                         textDecoration: 'none',
//                                         color: 'inherit',
//                                         fontWeight: 'inherit',
//                                         '&:hover': { 
//                                             textDecoration: 'none'
//                                         },
//                                     }}
//                                 >
//                                     Create new account
//                                 </Typography>
//                             </Button>
//                         </Box>
//                     </Paper>
//                 </Fade>
//             </Container>
//         </Box>
//     );
// };

// export default Login;

// ==============================================
// import React, { useEffect, useState } from 'react';
// import { Box, Typography, TextField, Button, Container, Divider, InputAdornment, IconButton, Paper, Fade } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import { toast } from "react-toastify";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../store/actions/loginActions';
// import MathCaptcha from "./MathCapcha";
// import { useNavigate } from 'react-router-dom';
// import vvcmclogo from '../../Images/thanegramin.jpeg';
// import { baseUrl } from '../../config/config';
// import LoaderLottie from '../../components/LoaderLottie';
// import './Auth.css';

// const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: Yup.string().required('Password is required'),
// });

// const Login = () => {
//     const [captchaValid, setCaptchaValid] = useState(false);
//     const [showResend, setShowResend] = useState(false);
//     const [userEmail, setUserEmail] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const authError = useSelector((state) => state.auth.error);

//     useEffect(() => {
//         document.body.classList.add('auth-body');
//         return () => {
//             document.body.classList.remove('auth-body');
//             document.body.style.background = '';
//         };
//     }, []);

//     useEffect(() => {
//         authError === "Email is not verified. Please verify your email to login." 
//             ? setShowResend(true) 
//             : setShowResend(false);
//     }, [authError]);

//     const formik = useFormik({
//         initialValues: { email: '', password: '' },
//         validationSchema,
//         onSubmit: async (values, { resetForm }) => {
//             if (!captchaValid) {
//                 toast.error("Incorrect CAPTCHA. Please try again.", { position: "top-center" });
//                 return;
//             }
//             setUserEmail(values.email);
//             setLoading(true);

//             try {
//                 await dispatch(login(values, navigate));
//                 resetForm();
//             } finally {
//                 setLoading(false);
//             }
//         },
//     });

//     const handleResendVerification = async () => {
//         setLoading(true);
//         try {
//             const res = await fetch(`${baseUrl}/resend-verification`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email: userEmail }),
//             });
//             const data = await res.json();
//             toast.success(data.message || "Verification link sent!");
//         } catch (err) {
//             toast.error("Failed to resend. Try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Box sx={{
//             minHeight: '100vh',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             background: 'linear-gradient(135deg, #e6e8eb 0%, #f2e6e7 50%, #e6e9f5 100%)', // Light shades of your 3 colors
//         }}>
//             <Container maxWidth="sm">
//                 <Fade in timeout={800}>
//                     <Paper elevation={20}
//                         sx={{
//                             p: { xs: 3, sm: 5 },
//                             borderRadius: 3,
//                             background: 'rgba(255, 255, 255, 0.97)',
//                             backdropFilter: 'blur(12px)',
//                             border: '1px solid rgba(0, 64, 185, 0.15)',
//                             boxShadow: '0 20px 50px rgba(0, 64, 185, 0.15)',
//                         }}
//                         component="form"
//                         onSubmit={formik.handleSubmit}
//                     >
//                         {/* Logo */}
//                         <Box textAlign="center" mb={4}>
//                             <Box sx={{
//                                 width: { xs: 110, sm: 130 },
//                                 height: { xs: 110, sm: 130 },
//                                 mx: 'auto',
//                                 borderRadius: '50%',
//                                 overflow: 'hidden',
//                                 border: '5px solid #0040B9',
//                                 boxShadow: '0 8px 25px rgba(0,64,185,0.3)',
//                             }}>
//                                 <img src={vvcmclogo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                             </Box>
//                         </Box>

//                         {/* Title */}
//                         <Typography variant="h4" align="center" sx={{
//                             fontWeight: 700,
//                             mb: 4,
//                             background: 'linear-gradient(90deg, #0040B9, #6C0204)',
//                             backgroundClip: 'text',
//                             WebkitBackgroundClip: 'text',
//                             WebkitTextFillColor: 'transparent',
//                             fontSize: { xs: '1.8rem', sm: '2.2rem' }
//                         }}>
//                             Sign In
//                         </Typography>

//                         {/* Form Fields */}
//                         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                             <TextField
//                                 fullWidth
//                                 size="small"
//                                 margin="normal"
//                                 label="Email Address"
//                                 name="email"
//                                 value={formik.values.email}
//                                 onChange={formik.handleChange}
//                                 error={formik.touched.email && Boolean(formik.errors.email)}
//                                 helperText={formik.touched.email && formik.errors.email}
//                                 sx={{
//                                     width: '85%',
//                                     mb: 2,
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 2,
//                                         backgroundColor: '#f8f9fa',
//                                         '&.Mui-focused fieldset': { borderColor: '#0040B9', borderWidth: 2 },
//                                         '&:hover fieldset': { borderColor: '#0040B9' }
//                                     },
//                                     '& .MuiInputLabel-root.Mui-focused': { color: '#0040B9' }
//                                 }}
//                             />

//                             <TextField
//                                 fullWidth
//                                 size="small"
//                                 margin="normal"
//                                 label="Password"
//                                 name="password"
//                                 type={showPassword ? 'text' : 'password'}
//                                 value={formik.values.password}
//                                 onChange={formik.handleChange}
//                                 error={formik.touched.password && Boolean(formik.errors.password)}
//                                 helperText={formik.touched.password && formik.errors.password}
//                                 InputProps={{
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: '#0040B9' }}>
//                                                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     )
//                                 }}
//                                 sx={{
//                                     width: '85%',
//                                     mb: 2,
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 2,
//                                         backgroundColor: '#f8f9fa',
//                                         '&.Mui-focused fieldset': { borderColor: '#0040B9', borderWidth: 2 },
//                                         '&:hover fieldset': { borderColor: '#0040B9' }
//                                     },
//                                     '& .MuiInputLabel-root.Mui-focused': { color: '#0040B9' }
//                                 }}
//                             />

//                             {/* CAPTCHA */}
//                             <Box my={3}>
//                                 <MathCaptcha onValidate={setCaptchaValid} />
//                             </Box>

//                             {/* Error / Resend */}
//                             {authError && (
//                                 <Paper sx={{ p: 2, backgroundColor: '#ffebee', border: '1px solid #ffcdd2', borderRadius: 2, mb: 2 }}>
//                                     <Typography color="error" align="center">{authError}</Typography>
//                                 </Paper>
//                             )}

//                             {showResend && (
//                                 <Button onClick={handleResendVerification} variant="text" sx={{ color: '#6C0204', textDecoration: 'underline', mb: 2 }}>
//                                     Resend Verification Link
//                                 </Button>
//                             )}

//                             {loading && <LoaderLottie />}

//                             {/* Login Button */}
//                             <Button
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 sx={{
//                                     width: '85%',
//                                     py: 1.5,
//                                     borderRadius: 2,
//                                     fontWeight: 'bold',
//                                     fontSize: '1.1rem',
//                                     background: 'linear-gradient(90deg, #0040B9, #002D80)',
//                                     boxShadow: '0 6px 20px rgba(0,64,185,0.4)',
//                                     '&:hover': { background: '#002D80', transform: 'translateY(-2px)' }
//                                 }}
//                             >
//                                 LOGIN
//                             </Button>
//                         </Box>

//                         <Divider sx={{ my: 4, color: '#626973' }}>OR</Divider>

//                         {/* Register Button */}
//                         <Box textAlign="center">
//                             <Button
//                                 component={Link}
//                                 to="/register"
//                                 variant="outlined"
//                                 sx={{
//                                     width: '85%',
//                                     py: 1.5,
//                                     borderRadius: 2,
//                                     borderColor: '#6C0204',
//                                     color: '#6C0204',
//                                     fontWeight: 'bold',
//                                     '&:hover': {
//                                         backgroundColor: '#6C0204',
//                                         color: '#fff',
//                                         borderColor: '#6C0204'
//                                     }
//                                 }}
//                             >
//                                 CREATE NEW ACCOUNT
//                             </Button>
//                         </Box>
//                     </Paper>
//                 </Fade>
//             </Container>
//         </Box>
//     );
// };

// export default Login;


// ===============================================

import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Container, Divider, InputAdornment, IconButton, Paper, Fade } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/loginActions';
import { useNavigate } from 'react-router-dom';
import vvcmclogo from '../../Images/thanegramin.jpeg';
import { baseUrl } from '../../config/config';
import LoaderLottie from '../../components/LoaderLottie';
import './Auth.css';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const [showResend, setShowResend] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authError = useSelector((state) => state.auth.error);

    useEffect(() => {
        document.body.classList.add('auth-body');
        return () => {
            document.body.classList.remove('auth-body');
            document.body.style.background = '';
        };
    }, []);

    useEffect(() => {
        authError === "Email is not verified. Please verify your email to login." 
            ? setShowResend(true) 
            : setShowResend(false);
    }, [authError]);

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setUserEmail(values.email);
            setLoading(true);

            try {
                await dispatch(login(values, navigate));
                resetForm();
            } finally {
                setLoading(false);
            }
        },
    });

    const handleResendVerification = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/resend-verification`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail }),
            });
            const data = await res.json();
            toast.success(data.message || "Verification link sent!", { position: "top-center" });
        } catch (err) {
            toast.error("Failed to resend. Try again.", { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #e6e8eb 0%, #f2e6e7 50%, #e6e9f5 100%)',
        }}>
            <Container maxWidth="xs">   {/* sm → xs केलं = 20% पेक्षा जास्त कमी width */}
                <Fade in timeout={800}>
                    <Paper elevation={20}
                        sx={{
                            p: { xs: 2.5, sm: 3.5 },        // padding कमी केलं
                            borderRadius: 3,
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(12px)',
                            border: '2px solid #0040B9',
                            boxShadow: '0 15px 40px rgba(0,64,185,0.2)',
                            maxWidth: 420,                   // फॉर्मची maximum width कमी केली
                            mx: 'auto',
                        }}
                        component="form"
                        onSubmit={formik.handleSubmit}
                    >
                        {/* Logo - थोडं कमी केलं */}
                        <Box textAlign="center" mb={2}>
                            <Box sx={{
                                width: { xs: 90, sm: 110 },
                                height: { xs: 90, sm: 110 },
                                mx: 'auto',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '4px solid #0040B9',
                                boxShadow: '0 6px 20px rgba(0,64,185,0.3)',
                            }}>
                                <img src={vvcmclogo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Box>
                        </Box>

                        {/* Title */}
                        <Typography variant="h5" align="center" sx={{
                            fontWeight: 700,
                            mb: 3,
                            background: 'linear-gradient(90deg, #0040B9, #6C0204)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: { xs: '1.6rem', sm: '1.9rem' }
                        }}>
                            Sign In
                        </Typography>

                        {/* Form Fields - आता compact */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <TextField
                                fullWidth
                                size="small"
                                margin="normal"
                                label="Email Address"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                sx={{
                                    width: '90%',
                                    mb: 1.5,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#f8f9fa',
                                        '&.Mui-focused fieldset': { borderColor: '#0040B9', borderWidth: 2 },
                                        '&:hover fieldset': { borderColor: '#0040B9' }
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': { color: '#0040B9' }
                                }}
                            />

                            <TextField
                                fullWidth
                                size="small"
                                margin="normal"
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: '#0040B9' }}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    width: '90%',
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#f8f9fa',
                                        '&.Mui-focused fieldset': { borderColor: '#0040B9', borderWidth: 2 },
                                        '&:hover fieldset': { borderColor: '#0040B9' }
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': { color: '#0040B9' }
                                }}
                            />

                            {/* Error */}
                            {authError && (
                                <Paper sx={{ p: 1.5, backgroundColor: '#ffebee', border: '1px solid #ffcdd2', borderRadius: 2, mb: 2 }}>
                                    <Typography color="error" align="center" fontSize="0.9rem">
                                        {authError}
                                    </Typography>
                                </Paper>
                            )}

                            {/* Resend Link */}
                            {showResend && (
                                <Button onClick={handleResendVerification} variant="text" sx={{ color: '#6C0204', fontSize: '0.9rem', mb: 2 }}>
                                    Resend Verification Link
                                </Button>
                            )}

                            {/* Loader */}
                            {loading && <Box my={2}><LoaderLottie /></Box>}

                            {/* Login Button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    width: '90%',
                                    py: 1.4,
                                    borderRadius: 2,
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    background: 'linear-gradient(90deg, #0040B9, #6C0204)',
                                    boxShadow: '0 6px 20px rgba(108,2,4,0.3)',
                                    '&:hover': { background: '#002D80', transform: 'translateY(-2px)' }
                                }}
                            >
                                LOGIN
                            </Button>
                        </Box>

                        <Divider sx={{ my: 3, color: '#626973' }}>OR</Divider>

                        {/* Register Button */}
                        <Box textAlign="center">
                            <Button
                                component={Link}
                                to="/register"
                                variant="outlined"
                                sx={{
                                    width: '90%',
                                    py: 1.3,
                                    borderRadius: 2,
                                    border: '2px solid #6C0204',
                                    color: '#6C0204',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#6C0204',
                                        color: '#fff',
                                    }
                                }}
                            >
                                CREATE NEW ACCOUNT
                            </Button>
                        </Box>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
};

export default Login;