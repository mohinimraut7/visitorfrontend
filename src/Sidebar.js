// import React, { useState, useEffect } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import { Box, Button, useMediaQuery } from '@mui/material';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import HomeIcon from '@mui/icons-material/Home';
// import Person from '@mui/icons-material/Person';
// import PaymentIcon from '@mui/icons-material/Payment';
// import AccessibilityIcon from '@mui/icons-material/Accessibility';
// import NotificationsIcon from '@mui/icons-material/Notifications';

// import VerifiedIcon from '@mui/icons-material/Verified';
// import UpcomingIcon from '@mui/icons-material/Upcoming';
// import ReportIcon from '@mui/icons-material/Report';

// import Badge from '@mui/material/Badge';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleSidebar } from './store/actions/toggleSidebar';
// import { upComingDueBills } from './utils/DueBillHelper';


// import './Sidebar.css';
// import drawerbg from './Images/sidebarimg.jpg'
// import logo from './Images/thanegramin.jpeg';
// import logobrand from './Images/thanegraminpolicebrand.jpeg';



// const drawerWidth = 240;
// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
  
//   backgroundImage: `url(${drawerbg})`,
//   backgroundSize: 'cover',
  
// });
// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   backgroundColor: '#FFA534',
//   overflowX: 'hidden',
//   backgroundImage: `url(${drawerbg})`,
//   backgroundSize: 'cover',
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });
// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));
// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   backgroundColor: '#FFA534',
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));
// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );
// const MenuButton = styled(IconButton)(({ theme }) => ({
//   backgroundColor: '#fff',
//   '&:hover': {
//     backgroundColor: '#fff',
//   },
// }));


// export default function Sidebar() {
//   const notificationCount = 5;
//   const theme = useTheme();
//   const isXs = useMediaQuery(theme.breakpoints.down('xs'));
//   const isSm = useMediaQuery(theme.breakpoints.down('sm'));
//   const isMd = useMediaQuery(theme.breakpoints.down('md'));
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const open = useSelector((state) => state.sidebar.isOpen);

//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//   const user = useSelector(state => state.auth.user);
//   const today = new Date(); 
  
//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleProfileMenuClose = () => {
//     setAnchorEl(null);
//   };
//   const handleProfileToggle = () => {
//     setProfileMenuOpen(!profileMenuOpen);
//   };
//   const handleDrawerToggle = () => {
//     dispatch(toggleSidebar());
//   };
//   const handleLogout = () => {
//     localStorage.removeItem('resdata');
//     dispatch({ type: 'LOGOUT' });
//     navigate('/login');
//   };


//   const BlurAppBar = styled(AppBar)({
//     backgroundColor: '#fff',
//     backdropFilter: 'blur(10px)',
//     boxShadow: 'none',
//     boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
//   });


//   const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
//   return (
//     <Box sx={{ display: 'flex', backgroundColor: isAuthPage ? 'transparent' : 'white'}} >
//       <CssBaseline />

//       {!isAuthPage && <BlurAppBar position="fixed" open={open} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: isAuthPage ? 'transparent' : 'white', height: open ? 'auto' : '16%' }} >
//         <Toolbar>
//           {location.pathname !== '/login' && location.pathname !== '/register' && (
//             <MenuButton
//               color="#757575"
//               aria-label="open drawer"
//               onClick={handleDrawerToggle}
//               edge="start"
//               sx={{
               
//                 marginRight:{
//                   // lg:5,
//                   // md:5,
//                   // sm:5,
//                   // xs:0

//                 },
//                 ...(open && { display: 'none' }),
//               }}
//             >
//               <MenuIcon sx={{ color: '#32B5AD' }} />
//             </MenuButton>
//           )}
//           {/* {!open &&
//             <Box sx={{ width: '100px', height: '100%', mr: 2, display: isSm && 'none' }}><img src={logo} height='100%' width='100%' /></Box>
            
//             } */}





//           <Box sx={{
//           //  border:'2px solid purple',
//             width: '100%',
//             display: isSm && open ? 'none' : 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexDirection: isSm ? 'column' : 'row',
             
//           }}
//           >
//             {location.pathname !== '/login' && location.pathname !== '/register' &&
//               <Box sx={{
//                 // ****
//                 // border:'2px solid green',
//                 // display: 'flex',
//                  width: {
//                   xl:'65%',
//                   lg: '65%',
//                   md: '100%',
//                   sm: '100%',
//                   xs: '100%'
//                 }
//               }}>
//                 {/* <Box sx={{
                  
//                   // border:'2px solid red',
//                   width:{
//                     lg:'100%',
//                     xl:'100%',
//                     md:'100%',
//                     sm:'100%',
//                     xs:'100%'

//                   }
//                 }}>
//                   <Typography
//                     className='logo-title'
//                     sx={{
//                       color: location.pathname === '/login' || location.pathname === '/register' ? '#F0F0F0' : 'green',
//                       display: 'flex', alignItems: 'center', justifyContent: {
//                         xs: 'flex-start',
//                         sm: 'flex-start',
//                         md:'flex-start',
//                         lg:'flex-start',
//                         xl:'flex-start'
                        
//                       },
//                       fontSize: {
//                         sm: '20px',
//                         xs: '12px',
//                         md: '15px',
//                         lg: '18px'
//                       },
//                       width:{
//                      sx:'100%',
                     
//                       },

//                       letterSpacing: location.pathname === '/login' || location.pathname === '/register' ? '1px' : '0px',
//                       textTransform: 'uppercase'
//                     }}>Vasai Virar City Municipal Corporation</Typography>
//                   <Typography 
//                   className='title-lightbill'
//                   sx={{
//                     color: location.pathname === '/login' || location.pathname === '/register' ? '#BB981A' : '#BB981A',
//                     fontSize: { xs: '11px', sm: '12px', md: '', lg: '', fontWeight: '500' },
//                     display: 'flex', alignItems: 'center', justifyContent: {
//                       xs: 'flex-start',
//                       sm: 'flex-start',
//                       md: 'flex-start',
//                       lg: 'flex-start'
//                     }
//                   }} noWrap component="div">
//                    MAHATENDER
//                   </Typography>
//                 </Box> */}
//                 {/* import logobrand from '../../Images/thanegraminpolicebrand.jpeg'; // वरच्या भागात import करा */}


// {/* Official Full Brand Logo */}


// {/* <Box textAlign="center" mb={{ xs: 2, sm: 3 }}>
//   <Box sx={{
//     width: { xs: 260, sm: 320, md: 380, lg: 420 },
//     height: { xs: 100, sm: 120, md: 140, lg: 160 },
//     mx: 'auto',
//     borderRadius: '16px',
//     overflow: 'hidden',
//     border: '4px solid #0040B9',
//     boxShadow: '0 12px 35px rgba(0,64,185,0.4)',
//     background: '#ffffff',
//     p: { xs: 1, sm: 1.5 },
//   }}>
//     <img 
//       src={logobrand}
//       alt="VVCMC MAHATENDER - Official Brand"
//       style={{ 
//         width: '100%', 
//         height: '100%', 
//         objectFit: 'contain',
//         borderRadius: '12px'
//       }} 
//     />
//   </Box>
// </Box> */}


// {location.pathname !== '/login' && location.pathname !== '/register' && (
//   <Box sx={{ 
//     display: 'flex', 
//     alignItems: 'center', 
//     justifyContent: { xs: 'center', sm: 'flex-start' },
//     width: { xl: '65%', lg: '65%', md: '100%', sm: '100%', xs: '100%' },
//     ml: { sm: 1, md: 2 }
//   }}>
//     <img 
//       src={logobrand}
//       alt="ठाणे ग्रामीण पोलीस"
//       style={{
//         height: '82px',           // परफेक्ट हाइट
//         width: 'auto',
//         maxWidth: '95%',
//         objectFit: 'contain',
//         // filter: 'drop-shadow(2px 4px 12px rgba(0,0,0,0.25))'
//       }}
//     />
//   </Box>
// )}
//               </Box>
//             }

//             <Box sx={{
//               // border:'2px solid red',
//               // width: '100%',
//               display: {
//                 xs: 'flex',
//                 md: 'flex',
//                 sm: 'flex', lg: 'flex'
//               }, alignItems: 
//               {
//                 lg:'center',
//                 md:'center',
//                 sm:'center',
//                 xs:'center'
//               },
              
              


//               justifyContent: { xs: 'space-between', sm: 'flex-end', md: 'flex-end', lg: 'flex-end',xl:'flex-end' },
             
//               width: {
//                 xs: user?.role === 'Super Admin' ? '100%' : user?.role === 'Executive Engineer' ? '280px' : user?.role === 'Admin' ? '180px' : '260px',
//                 sm: user?.role === 'Super Admin' ? '100%' : user?.role === 'Executive Engineer' ? '280px' : user?.role === 'Admin' ? '180px' : '260px',
//                 md: user?.role === 'Super Admin' ? '100%' : user?.role === 'Executive Engineer' ? '280px' : user?.role === 'Admin' ? '180px' : '260px',
//                 lg: user?.role === 'Super Admin' ? '85%' : user?.role === 'Executive Engineer' ? '280px' : user?.role === 'Admin' ? '180px' : '260px',
//               },
//             }}>



//               <Box
//                 sx={{
//                   // border:'1px solid green',
//                   color: '#FB404B',
//                   alignItems:'center',display:'flex',justifyContent:
//                   {
//                     lg:'flex-end',
//                     md:'center',
//                     sm:'center',
//                     xs:'flex-start'
//                   },
                  


//                   mr: {
//                     // lg: 2,
//                     // md: 2,

//                   },
//                   fontSize: {
//                     sm: '15px',
//                     xs: '15px',
//                     md: '15px',
//                     lg: '15px'
//                   },
//                   width:{
//                     lg:'100%',
//                     xl:'100%',
//                     md:'100%',
//                     sm:'100%',
//                     xs:'100%'
//                   }
//                 }}>
//                   <Box sx={{
//                   // border:'1px solid blue',
//                   color:'#FB404B',
//                   // backgroundColor:'#FB404B',
//                   textTransform:'uppercase',
//                   fontWeight:'bold',
//                   padding:'5px',
//                   borderRadius:'5px',
//                   fontSize:'12px',
                
//                   mr:{lg:2},}}>{user?.role}</Box>
//                    <Box
//     sx={{
//       width: '2px',
//       height: '12px',
//       backgroundColor: '#FB404B',
//       borderRadius: '2px',
//       mr: 1,
//         display: {
//       xs: 'none', // मोबाईल/छोट्या स्क्रीनसाठी दाखवा
//       sm: 'none',
//       md: 'block',  // md आणि त्यापुढे लपवा
//       lg: 'block',
//     },
//     }}
//   />


//                 {/* <Box style={{fontSize:'15px',
//                   // border:'1px solid green'
//                   }}>{user?.ward}</Box>  */}
//                 {/* {user?.ward} */}
//               </Box>
//               <Box>
//                 {isAuthenticated ? (



//                   <Box sx={{
//                     // border:"2px solid green"
//                     }}>
                  
//                       <IconButton sx={{ color: '#FB404B' }} onClick={handleLogout}>
//                         <PowerSettingsNewIcon />
                        
//                       </IconButton>
                  
//                   </Box>



//                 ) : (
//                   <>
//                     <Button sx={{ color: location.pathname === '/login' || location.pathname === '/register' ? '#F0F0F0' : '#0d2136' }} onClick={() => navigate("/login")}>Login</Button>
//                     <Button sx={{ color: location.pathname === '/login' || location.pathname === '/register' ? '#F0F0F0' : '#0d2136' }} onClick={() => navigate("/register")}>Signup</Button>
//                   </>
//                 )}
//               </Box>
              
           
//             </Box>











//           </Box>






//           <IconButton sx={{ color: '#0d2136', display: isSm && open ? 'flex' : 'none', }} onClick={handleLogout}>
//             <PowerSettingsNewIcon />
//           </IconButton>
          
//         </Toolbar>
      
//       </BlurAppBar>}
      
      
//       {location.pathname !== '/login' && location.pathname !== '/register' && (
//         <Drawer style={{ position: 'relative' }} className='drawerst' variant="permanent" open={open}>
//           {/* #FFA534 */}
//           <div style={{ position: 'absolute', backgroundColor: '#20B2AA', width: '100%', height: '100%', opacity: '0.9' }}></div>
//           <DrawerHeader>
//             {open && <Box sx={{ width: '100%', height: '185px', display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
//               <Box sx={{ zIndex: 10, height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', top: 10 }} >
//                 <img src={logo} height="65%" width="60%" className="imglogoopen" sx={{ objectFit: 'contain', borderRadius: '15px' }} />
//               </Box>
//               {/* #F4A43F */}
//               <IconButton sx={{ backgroundColor: '#20B2AA', width: '10px', height: '10px' }} onClick={handleDrawerToggle}>
//                 {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{ color: '#fff' }} />}
//               </IconButton>
//             </Box>}
//           </DrawerHeader>

//           <Box className="custom-scrollbar"
//             sx={
//               user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer'?
//               {
//               height: '80%',
//               overflowX: 'hidden',
//               zIndex: 1,
//               overflowY: 'scroll', 
//               padding: 0.4,
//               '&::-webkit-scrollbar': {
//                 width: '6px !important',
//               },
//               '&::-webkit-scrollbar-track': {
//                 background: '#20B2AA',
//                 borderRadius: '10px',
//                 width:'0px !important'
//               },
//               '&::-webkit-scrollbar-thumb': {
                
//                 backgroundColor: '#F8A63F',
//                 borderRadius: '10px',
//               },
//               '&::-webkit-scrollbar-thumb:hover': {
//                 backgroundColor: ' #FFB65A',
//               },
//             }:{}}
//           >
//             <List>
//               <ListItem disablePadding sx={{ display: open===false && 'block' }}>
//                 <ListItemText primary={`${user?.username}`} 
//                  primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                     //  color: '#000',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                 sx={{ opacity: open ? 1 : 0, color: 'white',ml:2.9 }} />
//                 <ListItemButton onClick={handleProfileToggle}>
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : 'auto',
//                       color: '#fff',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       '&:focus': {
//                         boxShadow: 'none',
//                       },
//                     }}
//                   >
//                     <ExpandMoreIcon />
//                   </ListItemIcon>
//                 </ListItemButton>
//               </ListItem>
//               {profileMenuOpen && (
//                 <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/profile")}>
//                   <ListItemButton>
//                     <ListItemIcon
//                       sx={{
//                         minWidth: 0,
//                         mr: open ? 0.2 : 'auto',
//                         justifyContent: 'center',
//                         color: '#fff'
//                       }}
//                     >
//                       <AccessibilityIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Profile" 
//                      primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                     //  color: '#000',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                     sx={{ opacity: open ? 1 : 0, color: 'white' }} />
//                   </ListItemButton>
//                 </ListItem>
//               )}


//  {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') &&(
//   <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/")}>
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? 'initial' : 'center',
                    
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 0.2 : 'auto',
//                       justifyContent: 'center',
//                       color: '#fff'
//                     }}
//                   >
//                     <HomeIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Dashboard" 
//                    primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                     //  color: '#000',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
                  
//                   sx={{ opacity: open ? 1 : 0, color: 'white' }} />
//                 </ListItemButton>
//               </ListItem>
//  )}
              

//               {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//                 <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/rolemaster")}>
//                   <ListItemButton
//                     sx={{
//                       minHeight: 48,
//                       justifyContent: open ? 'initial' : 'center',
//                     }}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         minWidth: 0,
//                         mr: open ? 0.2 : 'auto',
//                         justifyContent: 'center',
//                         color: '#fff'
//                       }}
//                     >
//                       <AccessibilityIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Role" 
//                     primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                     //  color: '#000',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                     sx={{ opacity: open ? 1 : 0, color: 'white' }} />
//                   </ListItemButton>
//                 </ListItem>
//               )}
//               {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || 
//               (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//                 <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/users")}>
//                   <ListItemButton
//                     sx={{
//                       minHeight: 48,
//                       justifyContent: open ? 'initial' : 'center',
//                       // px: 2.5,
//                     }}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         minWidth: 0,
//                         mr: open ? 0.2 : 'auto',
//                         justifyContent: 'center',
//                         color: '#fff'
//                       }}
//                     >
//                       <Person />
//                     </ListItemIcon>
//                     <ListItemText primary="User" 
//                      primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                     //  color: '#000',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                     sx={{ opacity: open ? 1 : 0, color: 'white' }} />
//                   </ListItemButton>
//                 </ListItem>
//               )}
//  {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Data Entry Operator'||
//               (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//                 <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/tendercomponent")}>
//                   <ListItemButton
//                     sx={{
//                       minHeight: 48,
//                       justifyContent: open ? 'initial' : 'center',
//                       // px: 2.5,
//                     }}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         minWidth: 0,
//                         mr: open ? 0.2 : 'auto',
//                         justifyContent: 'center',
//                         color: '#fff'
//                       }}
//                     >
//                       <Person />
//                     </ListItemIcon>
//                     <ListItemText primary="Tenders List"
//                     primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                     //  color: '#000',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                     sx={{ opacity: open ? 1 : 0, color: 'white' }} />
//                   </ListItemButton>
//                 </ListItem>
//               )}
           
//             </List>
//           </Box>
//         </Drawer>
//       )}
//       <Box component="main" >
//         <DrawerHeader />
//       </Box>
//     </Box>
//   );
// }


// ======================================================


// import React, { useState, useEffect } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import {
//   Box, Button, useMediaQuery, IconButton, Typography,
//   Drawer as MuiDrawer, AppBar as MuiAppBar, Toolbar, List,
//   CssBaseline, ListItem, ListItemButton, ListItemIcon, ListItemText,
//   Menu, MenuItem, Divider
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import HomeIcon from '@mui/icons-material/Home';
// import Person from '@mui/icons-material/Person';
// import AccessibilityIcon from '@mui/icons-material/Accessibility';

// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleSidebar } from './store/actions/toggleSidebar';

// import './Sidebar.css';
// import drawerbg from './Images/sidebarimg.jpg';
// import logo from './Images/thanegramin.jpeg';
// import logobrand from './Images/thanegraminpolicebrand.jpeg';

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   backgroundImage: `url(${drawerbg})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
//   backgroundImage: `url(${drawerbg})`,
//   backgroundSize: 'cover',
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   backgroundColor: '#ffffff',
//   backdropFilter: 'blur(12px)',
//   boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
//   color: '#000',
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

// export default function Sidebar() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const open = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector((state) => state.auth.user);
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   const [profileMenuOpen, setProfileMenuOpen] = useState(false);
//   const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);

//   const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

//   const handleDrawerToggle = () => {
//     dispatch(toggleSidebar());
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('resdata');
//     dispatch({ type: 'LOGOUT' });
//     navigate('/login');
//   };

//   const handleMoreMenuOpen = (event) => {
//     setMoreMenuAnchor(event.currentTarget);
//   };

//   const handleMoreMenuClose = () => {
//     setMoreMenuAnchor(null);
//   };

//   const handleEntryForm = () => {
//     navigate('/entryform');
//     handleMoreMenuClose();
//   };

//   const handleFeedbackForm = () => {
//     navigate('/feedback');
//     handleMoreMenuClose();
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />

//       {!isAuthPage && (
//         <AppBar position="fixed" open={open}>
//           <Toolbar sx={{ justifyContent: 'space-between', pr: 2, pl: { xs: 1, sm: 2 } }}>
            
//             {/* LEFT: Logo */}
//             <Box sx={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               justifyContent: { xs: 'center', sm: 'flex-start' },
//               flexGrow: 1 
//             }}>
//               {!isMobile && !open && (
//                 <IconButton onClick={handleDrawerToggle} sx={{ mr: 2 }}>
//                   <MenuIcon sx={{ color: '#32B5AD' }} />
//                 </IconButton>
//               )}
//               <img 
//                 src={logobrand} 
//                 alt="ठाणे ग्रामीण पोलीस" 
//                 style={{ 
//                   height: '78px', 
//                   width: 'auto', 
//                   maxWidth: '90%',
//                   objectFit: 'contain'
//                 }} 
//               />
//             </Box>

//             {/* RIGHT: User | Logout + Three Dots Menu */}
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>

//               {/* USER | LOGOUT */}
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Typography 
//                   sx={{ 
//                     color: '#FB404B', 
//                     fontWeight: 'bold', 
//                     fontSize: { xs: '14px', sm: '16px' },
//                     textTransform: 'uppercase'
//                   }}
//                 >
//                   {user?.username || 'User'}
//                 </Typography>
//                 <Divider orientation="vertical" flexItem sx={{ bgcolor: '#FB404B', width: 2 }} />
//                 <Button 
//                   onClick={handleLogout}
//                   startIcon={<PowerSettingsNewIcon />}
//                   sx={{ 
//                     color: '#FB404B', 
//                     fontWeight: 'bold',
//                     textTransform: 'uppercase',
//                     fontSize: { xs: '13px', sm: '15px' },
//                     '&:hover': { bgcolor: 'rgba(251, 64, 75, 0.1)' }
//                   }}
//                 >
//                   Logout
//                 </Button>
//               </Box>

//               {/* THREE DOTS MENU */}
//               <>
//                 <IconButton 
//                   onClick={handleMoreMenuOpen}
//                   sx={{ 
//                     color: '#FB404B',
//                     bgcolor: 'rgba(251, 64, 75, 0.08)',
//                     '&:hover': { bgcolor: 'rgba(251, 64, 75, 0.15)' },
//                     borderRadius: '12px'
//                   }}
//                 >
//                   <MoreVertIcon />
//                 </IconButton>

//                 <Menu
//                   anchorEl={moreMenuAnchor}
//                   open={Boolean(moreMenuAnchor)}
//                   onClose={handleMoreMenuClose}
//                   anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//                   PaperProps={{
//                     sx: {
//                       mt: 1,
//                       borderRadius: '16px',
//                       boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
//                       minWidth: 200,
//                     }
//                   }}
//                 >
//                   <MenuItem onClick={handleEntryForm} sx={{ py: 2, fontWeight: 600, color: '#0040B9' }}>
//                     Entry Form
//                   </MenuItem>
//                   <MenuItem onClick={handleFeedbackForm} sx={{ py: 2, fontWeight: 600, color: '#6C0204' }}>
//                     Feedback Form
//                   </MenuItem>
//                 </Menu>
//               </>
//             </Box>
//           </Toolbar>
//         </AppBar>
//       )}

//       {/* SIDEBAR - Only for Admin Roles */}
//       {location.pathname !== '/login' && location.pathname !== '/register' && 
//        (user?.role === 'Super Admin' || user?.role === 'Admin' || 
//         user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') && (
//         <Drawer variant="permanent" open={open}>
//           <div style={{ position: 'absolute', backgroundColor: '#20B2AA', width: '100%', height: '100%', opacity: '0.9' }}></div>
          
//           <DrawerHeader>
//             {open && (
//               <Box sx={{ width: '100%', height: '185px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <img src={logo} alt="Logo" style={{ height: '65%', width: '60%', objectFit: 'contain' }} />
//                 <IconButton onClick={handleDrawerToggle} sx={{ position: 'absolute', right: 8, bgcolor: '#20B2AA' }}>
//                   {theme.direction === 'rtl' ? <ChevronRightIcon sx={{ color: '#fff' }} /> : <ChevronLeftIcon sx={{ color: '#fff' }} />}
//                 </IconButton>
//               </Box>
//             )}
//           </DrawerHeader>

//           <List sx={{ mt: 2, zIndex: 1 }}>
//             {/* Sidebar Items - Only for Admin Roles */}
//             {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') && (
//               <ListItem disablePadding onClick={() => navigate("/")}>
//                 <ListItemButton>
//                   <ListItemIcon sx={{ color: '#fff' }}><HomeIcon /></ListItemIcon>
//                   <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0, color: '#fff' }} />
//                 </ListItemButton>
//               </ListItem>
//             )}
//             {/* Add more items as needed */}
//           </List>
//         </Drawer>
//       )}

//       <Box component="main" sx={{ flexGrow: 1 }}>
//         <DrawerHeader />
//       </Box>
//     </Box>
//   );
// }


// ==================================================

// import React, { useState, useEffect } from 'react';
// import {
//   Box, IconButton, Typography, Menu, MenuItem, AppBar as MuiAppBar, Toolbar,
//   CssBaseline, Drawer as MuiDrawer, List, ListItem, ListItemButton,
//   ListItemIcon, ListItemText, Divider
// } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import HomeIcon from '@mui/icons-material/Home';
// import Person from '@mui/icons-material/Person';
// import AccessibilityIcon from '@mui/icons-material/Accessibility';

// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleSidebar } from './store/actions/toggleSidebar';

// import logobrand from './Images/thanegraminpolicebrand.jpeg';
// import logo from './Images/thanegramin.jpeg';
// import drawerbg from './Images/sidebarimg.jpg';

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
//   backgroundImage: `url(${drawerbg})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: { width: `calc(${theme.spacing(8)} + 1px)` },
//   backgroundImage: `url(${drawerbg})`,
//   backgroundSize: 'cover',
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar)(({ theme }) => ({
//   backgroundColor: '#ffffff',
//   backdropFilter: 'blur(12px)',
//   boxShadow: '0 1px 0 rgba(0,0,0,0.08)',
//   color: '#000',
//   zIndex: theme.zIndex.drawer + 1,
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && { ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme) }),
//     ...(!open && { ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme) }),
//   }),
// );

// export default function Sidebar() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.auth.user);
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const sidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);

//   const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);
//   const isAuthPage = ['/login', '/register'].includes(location.pathname);
//   const isUser = user?.role === 'User';

//   // User असताना body वर class लावून Sidebar + Gap पूर्ण लपवा
//   useEffect(() => {
//     if (isUser) {
//       document.body.classList.add('user-no-sidebar');
//     } else {
//       document.body.classList.remove('user-no-sidebar');
//     }
//     return () => document.body.classList.remove('user-no-sidebar');
//   }, [isUser]);

//   const handleLogout = () => {
//     localStorage.removeItem('resdata');
//     dispatch({ type: 'LOGOUT' });
//     navigate('/login');
//   };

//   const handleMoreMenu = (e) => setMoreMenuAnchor(e.currentTarget);
//   const handleMoreClose = () => setMoreMenuAnchor(null);
//   const goTo = (path) => {
//     navigate(path);
//     handleMoreClose();
//   };

//   if (isAuthPage) return null;

//   return (
//     <>
//       <CssBaseline />

//       {/* TOOLBAR — सर्वांना दिसेल */}
//       <AppBar position="fixed" open={!isUser && sidebarOpen}>
//         <Toolbar sx={{ minHeight: '80px', justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
          
//           {/* LEFT — Logo */}
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             {!isUser && !sidebarOpen && (
//               <IconButton onClick={() => dispatch(toggleSidebar())} sx={{ mr: 2 }}>
//                 <MenuIcon sx={{ color: '#32B5AD' }} />
//               </IconButton>
//             )}
//             <img
//               src={logobrand}
//               alt="ठाणे ग्रामीण पोलीस"
//               style={{ height: '74px', width: 'auto', objectFit: 'contain' }}
//             />
//           </Box>

//           {/* RIGHT — USERNAME | LOGOUT + THREE DOTS */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2.5 } }}>

//             <Typography
//               sx={{
//                 color: '#FB404B',
//                 fontWeight: 'bold',
//                 fontSize: { xs: '15px', sm: '18px' },
//                 textTransform: 'uppercase',
//                 letterSpacing: '0.5px'
//               }}
//             >
//               {user?.username || 'User'}
//             </Typography>

//             <Divider orientation="vertical" flexItem sx={{ bgcolor: '#FB404B', width: 2, height: 20 }} />

//             <IconButton onClick={handleLogout} sx={{ color: '#FB404B' }}>
//               <PowerSettingsNewIcon fontSize="medium" />
//             </IconButton>

//             {/* THREE DOTS MENU */}
//             <>
//               <IconButton
//                 onClick={handleMoreMenu}
//                 sx={{
//                   color: '#FB404B',
//                   bgcolor: 'rgba(251,64,75,0.1)',
//                   '&:hover': { bgcolor: 'rgba(251,64,75,0.18)' },
//                   borderRadius: '14px',
//                   p: 1.2
//                 }}
//               >
//                 <MoreVertIcon />
//               </IconButton>

//               <Menu
//                 anchorEl={moreMenuAnchor}
//                 open={Boolean(moreMenuAnchor)}
//                 onClose={handleMoreClose}
//                 PaperProps={{
//                   sx: {
//                     mt: 1.5,
//                     borderRadius: '18px',
//                     boxShadow: '0 15px 40px rgba(0,0,0,0.22)',
//                     minWidth: 210,
//                     overflow: 'hidden'
//                   }
//                 }}
//               >
//                 <MenuItem onClick={() => goTo('/entryform')} sx={{ py: 2.2, fontWeight: 600, color: '#0040B9' }}>
//                   Entry Form
//                 </MenuItem>
//                 <MenuItem onClick={() => goTo('/feedback')} sx={{ py: 2.2, fontWeight: 600, color: '#6C0204' }}>
//                   Feedback Form
//                 </MenuItem>
//               </Menu>
//             </>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* SIDEBAR — फक्त Admin/Engineer साठी */}
//       {!isUser && (
//         <Drawer variant="permanent" open={sidebarOpen}>
//           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#20B2AA', opacity: 0.92 }} />
          
//           <DrawerHeader>
//             {sidebarOpen && (
//               <Box sx={{ width: '100%', height: 185, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
//                 <img src={logo} alt="Logo" style={{ height: '65%', width: '60%', objectFit: 'contain' }} />
//                 <IconButton onClick={() => dispatch(toggleSidebar())} sx={{ position: 'absolute', right: 8, bgcolor: '#20B2AA' }}>
//                   <ChevronLeftIcon sx={{ color: '#fff' }} />
//                 </IconButton>
//               </Box>
//             )}
//           </DrawerHeader>

//           <List sx={{ mt: 3, zIndex: 1 }}>
//             {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') && (
//               <ListItem disablePadding onClick={() => navigate('/')}>
//                 <ListItemButton>
//                   <ListItemIcon sx={{ color: '#fff' }}><HomeIcon /></ListItemIcon>
//                   <ListItemText primary="Dashboard" primaryTypographyProps={{ color: '#fff', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase' }} />
//                 </ListItemButton>
//               </ListItem>
//             )}
//             {/* तुम्ही इथे बाकीचे menu items add करू शकता */}
//           </List>
//         </Drawer>
//       )}

//       {/* Main Content Spacer */}
//       <Box component="main" sx={{ flexGrow: 1 }}>
//         <DrawerHeader />
//       </Box>
//     </>
//   );
// }


// ===================================


// import React, { useState, useEffect } from 'react';
// import {
//   Box, IconButton, Typography, Menu, MenuItem, AppBar as MuiAppBar, Toolbar,
//   CssBaseline, Drawer as MuiDrawer, List, ListItem, ListItemButton,
//   ListItemIcon, ListItemText
// } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import HomeIcon from '@mui/icons-material/Home';
// import Person from '@mui/icons-material/Person';
// import AccessibilityIcon from '@mui/icons-material/Accessibility';

// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleSidebar } from './store/actions/toggleSidebar';

// import logobrand from './Images/thanegraminpolicebrand.jpeg';
// import logo from './Images/thanegramin.jpeg';
// import drawerbg from './Images/sidebarimg.jpg';

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
//   backgroundImage: `url(${drawerbg})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: { width: `calc(${theme.spacing(8)} + 1px)` },
//   backgroundImage: `url(${drawerbg})`,
//   backgroundSize: 'cover',
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isUser',
// })(({ theme, open, isUser }) => ({
//   backgroundColor: '#ffffff',
//   backdropFilter: 'blur(15px)',
//   boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//   color: '#000',
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && !isUser && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && { ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme) }),
//     ...(!open && { ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme) }),
//   }),
// );

// export default function Sidebar() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.auth.user);
//   const sidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);
//   const isAuthPage = ['/login', '/register'].includes(location.pathname);
//   const isUser = user?.role === 'User';

//   const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);

//   // User असताना body class add करून gap लपवा
//   useEffect(() => {
//     if (isUser) {
//       document.body.classList.add('user-mode');
//     } else {
//       document.body.classList.remove('user-mode');
//     }
//     return () => document.body.classList.remove('user-mode');
//   }, [isUser]);

//   const handleLogout = () => {
//     localStorage.removeItem('resdata');
//     dispatch({ type: 'LOGOUT' });
//     navigate('/login');
//   };

//   const handleMenuOpen = (e) => setMoreMenuAnchor(e.currentTarget);
//   const handleMenuClose = () => setMoreMenuAnchor(null);
//   const goTo = (path) => {
//     navigate(path);
//     handleMenuClose();
//   };

//   if (isAuthPage) return null;

//   return (
//     <>
//       <CssBaseline />

//       {/* TOOLBAR */}
//       <AppBar position="fixed" open={sidebarOpen} isUser={isUser}>
//         <Toolbar sx={{ minHeight: { xs: 70, sm: 80 }, px: { xs: 2, sm: 4 } }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>

//             {/* LEFT - Logo + Menu Icon (Admin only) */}
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               {!isUser && !sidebarOpen && (
//                 <IconButton onClick={() => dispatch(toggleSidebar())}>
//                   <MenuIcon sx={{ color: '#32B5AD', fontSize: 28 }} />
//                 </IconButton>
//               )}
//               <img
//                 src={logobrand}
//                 alt="ठाणे ग्रामीण पोलीस"
//                 style={{ height: '68px', width: 'auto', objectFit: 'contain' }}
//               />
//             </Box>

//             {/* RIGHT - Username | Logout + Three Dots */}
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

//               <Typography
//                 sx={{
//                   color: '#FB404B',
//                   fontWeight: 'bold',
//                   fontSize: { xs: '16px', sm: '19px' },
//                   textTransform: 'uppercase',
//                   letterSpacing: '1px'
//                 }}
//               >
//                 {user?.username || 'User'}
//               </Typography>

//               <Box sx={{ width: 2, height: 24, bgcolor: '#FB404B', borderRadius: 1 }} />

//               <IconButton onClick={handleLogout} sx={{ color: '#FB404B' }}>
//                 <PowerSettingsNewIcon fontSize="medium" />
//               </IconButton>

//               {/* THREE DOTS MENU */}
//               <>
//                 <IconButton
//                   onClick={handleMenuOpen}
//                   sx={{
//                     color: '#FB404B',
//                     bgcolor: 'rgba(251,64,75,0.12)',
//                     '&:hover': { bgcolor: 'rgba(251,64,75,0.22)' },
//                     borderRadius: '14px',
//                     p: 1.3
//                   }}
//                 >
//                   <MoreVertIcon />
//                 </IconButton>

//                 <Menu
//                   anchorEl={moreMenuAnchor}
//                   open={Boolean(moreMenuAnchor)}
//                   onClose={handleMenuClose}
//                   PaperProps={{
//                     sx: {
//                       mt: 2,
//                       borderRadius: '18px',
//                       boxShadow: '0 15px 45px rgba(0,0,0,0.25)',
//                       minWidth: 220,
//                       bgcolor: '#fff'
//                     }
//                   }}
//                 >
//                   <MenuItem onClick={() => goTo('/entryform')} sx={{ py: 2.5, fontWeight: 600, color: '#0040B9' }}>
//                     Entry Form
//                   </MenuItem>
//                   <MenuItem onClick={() => goTo('/feedback')} sx={{ py: 2.5, fontWeight: 600, color: '#6C0204' }}>
//                     Feedback Form
//                   </MenuItem>
//                 </Menu>
//               </>
//             </Box>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* SIDEBAR - फक्त Admin/Engineer साठी */}
//       {!isUser && (
//         <Drawer variant="permanent" open={sidebarOpen}>
//           <div style={{ position: 'absolute', inset: 0, backgroundColor: '#20B2AA', opacity: 0.95 }} />
          
//           <DrawerHeader>
//             {sidebarOpen && (
//               <Box sx={{ width: '100%', height: 180, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
//                 <img src={logo} alt="Logo" style={{ height: '68%', width: '62%', objectFit: 'contain' }} />
//                 <IconButton onClick={() => dispatch(toggleSidebar())} sx={{ position: 'absolute', right: 10, top: 10, bgcolor: '#20B2AA' }}>
//                   <ChevronLeftIcon sx={{ color: '#fff' }} />
//                 </IconButton>
//               </Box>
//             )}
//           </DrawerHeader>

//           <List sx={{ mt: 4, px: 1, zIndex: 1 }}>
//             <ListItem disablePadding onClick={() => navigate('/')}>
//               <ListItemButton sx={{ borderRadius: 3, py: 1.5 }}>
//                 <ListItemIcon sx={{ color: '#fff', minWidth: 45 }}><HomeIcon /></ListItemIcon>
//                 <ListItemText 
//                   primary="Dashboard" 
//                   primaryTypographyProps={{ 
//                     color: '#fff', 
//                     fontWeight: 'bold', 
//                     fontSize: '15px', 
//                     textTransform: 'uppercase' 
//                   }} 
//                 />
//               </ListItemButton>
//             </ListItem>
//             {/* Add more menu items here */}
//           </List>
//         </Drawer>
//       )}

//       {/* Main Content Area */}
//       <Box component="main" sx={{ 
//         flexGrow: 1, 
//         pt: { xs: 10, sm: 12 },
//         pl: { xs: 2, sm: 4 },
//         pr: { xs: 2, sm: 4 }
//       }}>
//         <DrawerHeader />
//         {/* Your page content goes here */}
//       </Box>
//     </>
//   );
// }


// ===============================


// import React, { useState, useEffect } from 'react';
// import {
//   Box, IconButton, Typography, Menu, MenuItem, AppBar as MuiAppBar, Toolbar,
//   CssBaseline, Drawer as MuiDrawer, List, ListItem, ListItemButton,
//   ListItemIcon, ListItemText, Divider
// } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import HomeIcon from '@mui/icons-material/Home';
// import Person from '@mui/icons-material/Person';
// import AccessibilityIcon from '@mui/icons-material/Accessibility';

// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleSidebar } from './store/actions/toggleSidebar';

// import logobrand from './Images/thanegraminpolicebrand.jpeg';
// import logo from './Images/thanegramin.jpeg';
// import drawerbg from './Images/sidebarimg.jpg';

// const drawerWidth = 240;

// // Styled AppBar
// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isUser',
// })(({ theme, open, isUser }) => ({
//   backgroundColor: '#ffffff',
//   backdropFilter: 'blur(15px)',
//   boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
//   color: '#000',
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && !isUser && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//   }),
// }));

// // Styled Drawer
// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       width: drawerWidth,
//       '& .MuiDrawer-paper': {
//         width: drawerWidth,
//         backgroundImage: `url(${drawerbg})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       },
//     }),
//     ...(!open && {
//       width: theme.spacing(9),
//       '& .MuiDrawer-paper': {
//         width: theme.spacing(9),
//         backgroundImage: `url(${drawerbg})`,
//         backgroundSize: 'cover',
//       },
//     }),
//   }),
// );

// export default function Sidebar() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.auth.user);
//   const sidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);
//   const isAuthPage = ['/login', '/register'].includes(location.pathname);
//   const isUser = user?.role === 'User';

//   const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);

//   // User असताना body class add करून Sidebar + Gap पूर्ण गायब करा
//   useEffect(() => {
//     if (isUser) {
//       document.body.classList.add('user-mode-no-sidebar');
//     } else {
//       document.body.classList.remove('user-mode-no-sidebar');
//     }
//     return () => document.body.classList.remove('user-mode-no-sidebar');
//   }, [isUser]);

//   const handleLogout = () => {
//     localStorage.removeItem('resdata');
//     dispatch({ type: 'LOGOUT' });
//     navigate('/login');
//   };

//   const handleMoreMenu = (e) => setMoreMenuAnchor(e.currentTarget);
//   const handleClose = () => setMoreMenuAnchor(null);
//   const goTo = (path) => {
//     navigate(path);
//     handleClose();
//   };

//   if (isAuthPage) return null;

//   return (
//     <>
//       <CssBaseline />

//       {/* TOOLBAR — सर्वांना दिसेल */}
//       <AppBar position="fixed" open={sidebarOpen} isUser={isUser}>
//         <Toolbar sx={{ minHeight: 80, px: { xs: 2, sm: 4 }, justifyContent: 'space-between' }}>
          
//           {/* LEFT — Logo + Menu Icon (फक्त Admin साठी) */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             {!isUser && !sidebarOpen && (
//               <IconButton onClick={() => dispatch(toggleSidebar())}>
//                 <MenuIcon sx={{ color: '#32B5AD', fontSize: 30 }} />
//               </IconButton>
//             )}
//             <img
//               src={logobrand}
//               alt="ठाणे ग्रामीण पोलीस"
//               style={{ height: '74px', width: 'auto', objectFit: 'contain' }}
//             />
//           </Box>

//           {/* RIGHT — Username | Logout + तीन डॉट्स (User साठी) */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>

//             <Typography
//               sx={{
//                 color: '#FB404B',
//                 fontWeight: 'bold',
//                 fontSize: { xs: '17px', sm: '20px' },
//                 textTransform: 'uppercase',
//                 letterSpacing: '1.2px'
//               }}
//             >
//               {user?.username || 'User'}
//             </Typography>

//             <Divider orientation="vertical" flexItem sx={{ bgcolor: '#FB404B', width: 2.5, height: 28 }} />

//             <IconButton onClick={handleLogout} sx={{ color: '#FB404B' }}>
//               <PowerSettingsNewIcon fontSize="medium" />
//             </IconButton>

//             {/* तीन डॉट्स मेनू — फक्त User ला दिसेल */}
//             {isUser && (
//               <>
//                 <IconButton
//                   onClick={handleMoreMenu}
//                   sx={{
//                     color: '#FB404B',
//                     bgcolor: 'rgba(251,64,75,0.12)',
//                     '&:hover': { bgcolor: 'rgba(251,64,75,0.25)' },
//                     borderRadius: '16px',
//                     p: 1.4
//                   }}
//                 >
//                   <MoreVertIcon />
//                 </IconButton>

//                 <Menu
//                   anchorEl={moreMenuAnchor}
//                   open={Boolean(moreMenuAnchor)}
//                   onClose={handleClose}
//                   PaperProps={{
//                     sx: {
//                       mt: 2,
//                       borderRadius: '20px',
//                       boxShadow: '0 16px 50px rgba(0,0,0,0.3)',
//                       minWidth: 240,
//                     }
//                   }}
//                 >
//                   <MenuItem onClick={() => goTo('/entryform')} sx={{ py: 2.8, fontWeight: 600, color: '#0040B9', fontSize: '16px' }}>
//                     Entry Form
//                   </MenuItem>
//                   <MenuItem onClick={() => goTo('/feedback')} sx={{ py: 2.8, fontWeight: 600, color: '#6C0204', fontSize: '16px' }}>
//                     Feedback Form
//                   </MenuItem>
//                 </Menu>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* SIDEBAR — फक्त Admin/Engineer साठी (User असताना पूर्ण लपलेलं) */}
//       {!isUser && (
//         <Drawer variant="permanent" open={sidebarOpen}>
//           <div style={{ position: 'absolute', inset: 0, backgroundColor: '#20B2AA', opacity: 0.94 }} />

//           {sidebarOpen && (
//             <Box sx={{ width: '100%', height: 185, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
//               <img src={logo} alt="Logo" style={{ height: '68%', width: '62%', objectFit: 'contain' }} />
//               <IconButton onClick={() => dispatch(toggleSidebar())} sx={{ position: 'absolute', right: 12, top: 12, bgcolor: '#20B2AA' }}>
//                 <ChevronLeftIcon sx={{ color: '#fff' }} />
//               </IconButton>
//             </Box>
//           )}

//           <List sx={{ mt: 4, px: 1.5, zIndex: 1 }}>
//             <ListItem disablePadding onClick={() => navigate('/')}>
//               <ListItemButton sx={{ borderRadius: 3, py: 1.8, '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }}>
//                 <ListItemIcon sx={{ color: '#fff', minWidth: 48 }}><HomeIcon /></ListItemIcon>
//                 <ListItemText 
//                   primary="Dashboard" 
//                   primaryTypographyProps={{ 
//                     color: '#fff', 
//                     fontWeight: 'bold', 
//                     fontSize: '15px', 
//                     textTransform: 'uppercase'
//                   }} 
//                 />
//               </ListItemButton>
//             </ListItem>
//             {/* तुम्ही इथे तुमचे बाकीचे Menu Items टाका */}
//           </List>
//         </Drawer>
//       )}

//       {/* Main Content Spacer */}
//       <Box component="main" sx={{ flexGrow: 1, pt: { xs: 11, sm: 13 } }}>
//         <div style={{ height: 80 }} />
//       </Box>
//     </>
//   );
// }

// ======================================


// import React, { useState } from 'react';
// import {
//   Box,
//   IconButton,
//   Typography,
//   Menu,
//   MenuItem,
//   AppBar as MuiAppBar,
//   Toolbar,
//   CssBaseline,
//   Drawer as MuiDrawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
// } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import HomeIcon from '@mui/icons-material/Home';
// import Person from '@mui/icons-material/Person';
// import AccessibilityIcon from '@mui/icons-material/Accessibility';
// import ArticleIcon from '@mui/icons-material/Article';

// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleSidebar } from './store/actions/toggleSidebar';

// import drawerbg from './Images/sidebarimg.jpg';
// import logo from './Images/thanegramin.jpeg';
// import logobrand from './Images/thanegraminpolicebrand.jpeg';

// const drawerWidth = 240;

// // Styled AppBar – User असताना margin-left: 0
// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isUser',
// })(({ theme, open, isUser }) => ({
//   backgroundColor: '#ffffff',
//   backdropFilter: 'blur(15px)',
//   boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
//   color: '#000',
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && !isUser && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//   }),
//   ...(!open && !isUser && {
//     marginLeft: 72,
//     width: `calc(100% - 72px)`,
//   }),
// }));

// // Styled Drawer
// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       '& .MuiDrawer-paper': {
//         width: drawerWidth,
//         backgroundImage: `url(${drawerbg})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       },
//     }),
//     ...(!open && {
//       '& .MuiDrawer-paper': {
//         width: 72,
//         backgroundImage: `url(${drawerbg})`,
//         backgroundSize: 'cover',
//       },
//     }),
//   })
// );

// export default function Sidebar() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.auth.user);
//   const sidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);
//   const isAuthPage = ['/login', '/register'].includes(location.pathname);

//   // Role Detection
//   const isUser = user?.role === 'User';
//   const isAdminRole = ['Super Admin', 'Admin', 'Executive Engineer', 'Junior Engineer', 'Data Entry Operator'].includes(user?.role);

//   const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);

//   const handleLogout = () => {
//     localStorage.removeItem('resdata');
//     dispatch({ type: 'LOGOUT' });
//     navigate('/login');
//   };

//   if (isAuthPage) return null;

//   return (
//     <>
//       <CssBaseline />

//       {/* Top AppBar – दोघांनाही दिसेल */}
//       <AppBar position="fixed" open={sidebarOpen} isUser={isUser}>
//         <Toolbar sx={{ minHeight: 90, justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
//           {/* LEFT: Logo + Menu Icon (Admin only) */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             {isAdminRole && !sidebarOpen && (
//               <IconButton onClick={() => dispatch(toggleSidebar())}>
//                 <MenuIcon sx={{ color: '#32B5AD', fontSize: 34 }} />
//               </IconButton>
//             )}
//             <img
//               src={logobrand}
//               alt="ठाणे ग्रामीण पोलीस"
//               style={{ height: 82, width: 'auto', objectFit: 'contain' }}
//             />
//           </Box>

//           {/* RIGHT: Username + Logout + Three Dots */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//             <Typography
//               sx={{
//                 color: '#FB404B',
//                 fontWeight: 'bold',
//                 fontSize: { xs: 18, sm: 21 },
//                 textTransform: 'uppercase',
//                 letterSpacing: '1.2px',
//               }}
//             >
//               {user?.username || 'User'}
//             </Typography>

//             <Divider orientation="vertical" flexItem sx={{ bgcolor: '#FB404B', width: 3, height: 32 }} />

//             <IconButton onClick={handleLogout} sx={{ color: '#FB404B' }}>
//               <PowerSettingsNewIcon fontSize="large" />
//             </IconButton>

//             {/* Three Dots Menu – Only for User */}
//             {isUser && (
//               <>
//                 <IconButton
//                   onClick={(e) => setMoreMenuAnchor(e.currentTarget)}
//                   sx={{
//                     color: '#FB404B',
//                     bgcolor: 'rgba(251,64,75,0.12)',
//                     '&:hover': { bgcolor: 'rgba(251,64,75,0.22)' },
//                     borderRadius: '16px',
//                     p: 1.5,
//                   }}
//                 >
//                   <MoreVertIcon fontSize="large" />
//                 </IconButton>

//                 <Menu
//                   anchorEl={moreMenuAnchor}
//                   open={Boolean(moreMenuAnchor)}
//                   onClose={() => setMoreMenuAnchor(null)}
//                   PaperProps={{
//                     sx: {
//                       mt: 2,
//                       borderRadius: '20px',
//                       boxShadow: '0 16px 50px rgba(0,0,0,0.3)',
//                       minWidth: 260,
//                     },
//                   }}
//                 >
//                   <MenuItem
//                     onClick={() => {
//                       navigate('/entryform');
//                       setMoreMenuAnchor(null);
//                     }}
//                     sx={{ py: 3, fontWeight: 600, fontSize: 16, color: '#0040B9' }}
//                   >
//                     Entry Form
//                   </MenuItem>
//                   <MenuItem
//                     onClick={() => {
//                       navigate('/feedback');
//                       setMoreMenuAnchor(null);
//                     }}
//                     sx={{ py: 3, fontWeight: 600, fontSize: 16, color: '#6C0204' }}
//                   >
//                     Feedback Form
//                   </MenuItem>
//                 </Menu>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar – Only for Admin Roles */}
//       {isAdminRole && (
//         <Drawer variant="permanent" open={sidebarOpen}>
//           <div style={{ position: 'absolute', inset: 0, backgroundColor: '#20B2AA', opacity: 0.94 }} />

//           {/* Logo when sidebar open */}
//           {sidebarOpen && (
//             <Box sx={{ height: 185, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
//               <img src={logo} alt="Logo" style={{ height: '68%', width: '62%', objectFit: 'contain' }} />
//               <IconButton
//                 onClick={() => dispatch(toggleSidebar())}
//                 sx={{ position: 'absolute', right: 12, top: 12, bgcolor: '#20B2AA' }}
//               >
//                 <ChevronLeftIcon sx={{ color: '#fff', fontSize: 30 }} />
//               </IconButton>
//             </Box>
//           )}

//           {/* Menu Items */}
//           <List sx={{ mt: sidebarOpen ? 4 : 8, px: 1.5, zIndex: 1 }}>
//             <ListItem disablePadding onClick={() => navigate('/')}>
//               <ListItemButton sx={{ borderRadius: 3, py: 1.8, '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }}>
//                 <ListItemIcon sx={{ color: '#fff', minWidth: 48 }}>
//                   <HomeIcon />
//                 </ListItemIcon>
//                 <ListItemText
//                   primary="Dashboard"
//                   primaryTypographyProps={{
//                     color: '#fff',
//                     fontWeight: 'bold',
//                     fontSize: 15,
//                     textTransform: 'uppercase',
//                   }}
//                 />
//               </ListItemButton>
//             </ListItem>

//             {/* Example Admin Routes */}
//             {(user?.role === 'Super Admin' || user?.role === 'Admin') && (
//               <>
//                 <ListItem disablePadding onClick={() => navigate('/users')}>
//                   <ListItemButton sx={{ borderRadius: 3, py: 1.8 }}>
//                     <ListItemIcon sx={{ color: '#fff' }}>
//                       <Person />
//                     </ListItemIcon>
//                     <ListItemText primary="User Master" primaryTypographyProps={{ color: '#fff', fontWeight: 'bold' }} />
//                   </ListItemButton>
//                 </ListItem>

//                 <ListItem disablePadding onClick={() => navigate('/rolemaster')}>
//                   <ListItemButton sx={{ borderRadius: 3, py: 1.8 }}>
//                     <ListItemIcon sx={{ color: '#fff' }}>
//                       <AccessibilityIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Role Master" primaryTypographyProps={{ color: '#fff', fontWeight: 'bold' }} />
//                   </ListItemButton>
//                 </ListItem>
//               </>
//             )}

//             {/* Add more menu items as per your requirement */}
//           </List>
//         </Drawer>
//       )}

//       {/* Main Content Area – Full width for User, Shifted for Admin */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           pt: { xs: 12, sm: 14 },
//           pl: isUser ? 0 : sidebarOpen ? `${drawerWidth}px` : '72px',
//           transition: 'padding-left 0.3s ease',
//         }}
//       >
//         <div style={{ height: 90 }} />
//         {/* Your page content will go here (via Outlet) */}
//       </Box>
//     </>
//   );
// }


// ===========================================


// import React, { useState } from 'react';
// import {
//   Box,
//   IconButton,
//   Typography,
//   Menu,
//   MenuItem,
//   AppBar as MuiAppBar,
//   Toolbar,
//   CssBaseline,
//   Drawer as MuiDrawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
// } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import HomeIcon from '@mui/icons-material/Home';
// import Person from '@mui/icons-material/Person';
// import AccessibilityIcon from '@mui/icons-material/Accessibility';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import GroupIcon from '@mui/icons-material/Group';
// import VpnKeyIcon from '@mui/icons-material/VpnKey';

// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleSidebar } from './store/actions/toggleSidebar';

// // Images
// import drawerbg from './Images/sidebarimg.jpg';
// import logo from './Images/thanegramin.jpeg';
// import logobrand from './Images/thanegraminpolicebrand.jpeg';

// const drawerWidth = 240;

// // AppBar - Fixed at top with proper margin for Admin
// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isUser',
// })(({ theme, open, isUser }) => ({
//   backgroundColor: '#ffffff',
//   backdropFilter: 'blur(15px)',
//   boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
//   color: '#000',
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && !isUser && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//   }),
//   ...(!open && !isUser && {
//     marginLeft: 72,
//     width: `calc(100% - 72px)`,
//   }),
// }));

// // Drawer - Only left side rounded corners
// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: 'nowrap',
//   boxSizing: 'border-box',
//   '& .MuiDrawer-paper': {
//     borderTopRightRadius: '28px',
//     borderBottomRightRadius: '28px',
//     overflow: 'hidden',
//     backgroundImage: `url(${drawerbg})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     width: open ? drawerWidth : 72,
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
// }));

// export default function Sidebar() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.auth.user);
//   const sidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);
//   const isAuthPage = ['/login', '/register'].includes(location.pathname);

//   // Role Check
//   const isUser = user?.role === 'User';
//   const isAdminRole = ['Super Admin', 'Admin', 'Executive Engineer', 'Junior Engineer', 'Data Entry Operator'].includes(user?.role);

//   const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);

//   const handleLogout = () => {
//     localStorage.removeItem('resdata');
//     dispatch({ type: 'LOGOUT' });
//     navigate('/login');
//   };

//   if (isAuthPage) return null;

//   return (
//     <>
//       <CssBaseline />

//       {/* Top AppBar - Fixed */}
//       <AppBar position="fixed" open={sidebarOpen} isUser={isUser}>
//         <Toolbar sx={{ minHeight: { xs: 80, sm: 90 }, justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
//           {/* Left - Logo + Menu Button (Admin only) */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             {isAdminRole && !sidebarOpen && (
//               <IconButton onClick={() => dispatch(toggleSidebar())}>
//                 <MenuIcon sx={{ color: '#32B5AD', fontSize: 36 }} />
//               </IconButton>
//             )}
//             <img
//               src={logobrand}
//               alt="ठाणे ग्रामीण पोलीस"
//               style={{ height: 84, width: 'auto', objectFit: 'contain' }}
//             />
//           </Box>

//           {/* Right - Username + Logout + Three Dots */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//             <Typography
//               sx={{
//                 color: '#FB404B',
//                 fontWeight: 'bold',
//                 fontSize: { xs: 19, sm: 23 },
//                 textTransform: 'uppercase',
//                 letterSpacing: '1.8px',
//               }}
//             >
//               {user?.username || 'USER'}
//             </Typography>

//             <Divider orientation="vertical" flexItem sx={{ bgcolor: '#FB404B', width: 3.5, height: 36 }} />

//             <IconButton onClick={handleLogout} sx={{ color: '#FB404B' }}>
//               <PowerSettingsNewIcon fontSize="large" />
//             </IconButton>

//             {/* Three Dots Menu - Only for User */}
//             {isUser && (
//               <>
//                 <IconButton
//                   onClick={(e) => setMoreMenuAnchor(e.currentTarget)}
//                   sx={{
//                     color: '#FB404B',
//                     bgcolor: 'rgba(251,64,75,0.14)',
//                     '&:hover': { bgcolor: 'rgba(251,64,75,0.25)' },
//                     borderRadius: '18px',
//                     p: 1.6,
//                   }}
//                 >
//                   <MoreVertIcon fontSize="large" />
//                 </IconButton>

//                 <Menu
//                   anchorEl={moreMenuAnchor}
//                   open={Boolean(moreMenuAnchor)}
//                   onClose={() => setMoreMenuAnchor(null)}
//                   PaperProps={{
//                     sx: {
//                       mt: 2.5,
//                       borderRadius: '24px',
//                       boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
//                       minWidth: 280,
//                       bgcolor: '#ffffff',
//                     },
//                   }}
//                 >
//                   <MenuItem
//                     onClick={() => { navigate('/entryform'); setMoreMenuAnchor(null); }}
//                     sx={{ py: 3.2, fontWeight: 600, fontSize: 17, color: '#0040B9' }}
//                   >
//                     Entry Form
//                   </MenuItem>
//                   <MenuItem
//                     onClick={() => { navigate('/feedback'); setMoreMenuAnchor(null); }}
//                     sx={{ py: 3.2, fontWeight: 600, fontSize: 17, color: '#6C0204' }}
//                   >
//                     Feedback Form
//                   </MenuItem>
//                 </Menu>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar - Only for Admin Roles */}
//       {isAdminRole && (
//         <Drawer variant="permanent" open={sidebarOpen}>
//           <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
//             {/* Background Overlay */}
//             <div style={{ position: 'absolute', inset: 0, backgroundColor: '#20B2AA', opacity: 0.96 }} />

//             {/* Logo when sidebar is open */}
//             {sidebarOpen && (
//               <Box
//                 sx={{
//                   height: 190,
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   position: 'relative',
//                   zIndex: 2,
//                 }}
//               >
//                 <img
//                   src={logo}
//                   alt="ठाणे ग्रामीण पोलीस"
//                   style={{
//                     height: '70%',
//                     width: '65%',
//                     objectFit: 'contain',
//                     borderRadius: '24px',
//                     boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
//                   }}
//                 />
//                 <IconButton
//                   onClick={() => dispatch(toggleSidebar())}
//                   sx={{
//                     position: 'absolute',
//                     right: 14,
//                     top: 14,
//                     bgcolor: '#20B2AA',
//                     '&:hover': { bgcolor: '#1a8f8a' },
//                     boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
//                   }}
//                 >
//                   <ChevronLeftIcon sx={{ color: '#fff', fontSize: 32 }} />
//                 </IconButton>
//               </Box>
//             )}

//             {/* Menu List */}
//             <List sx={{ mt: sidebarOpen ? 5 : 12, px: 2, zIndex: 2 }}>
//               {/* Dashboard */}
//               <ListItem disablePadding onClick={() => navigate('/')}>
//                 <ListItemButton
//                   sx={{
//                     borderRadius: 4,
//                     py: 2,
//                     mb: 1,
//                     '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' },
//                   }}
//                 >
//                   <ListItemIcon sx={{ color: '#fff', minWidth: 50 }}>
//                     <DashboardIcon />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Dashboard"
//                     primaryTypographyProps={{
//                       color: '#fff',
//                       fontWeight: 'bold',
//                       fontSize: 16,
//                       textTransform: 'uppercase',
//                       letterSpacing: '0.5px',
//                     }}
//                   />
//                 </ListItemButton>
//               </ListItem>

//               {/* User Master */}
//               {(user?.role === 'Super Admin' || user?.role === 'Admin') && (
//                 <ListItem disablePadding onClick={() => navigate('/users')}>
//                   <ListItemButton sx={{ borderRadius: 4, py: 2, mb: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' } }}>
//                     <ListItemIcon sx={{ color: '#fff', minWidth: 50 }}>
//                       <GroupIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary="User Master"
//                       primaryTypographyProps={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               )}

//               {/* Role Master */}
//               {(user?.role === 'Super Admin' || user?.role === 'Admin') && (
//                 <ListItem disablePadding onClick={() => navigate('/rolemaster')}>
//                   <ListItemButton sx={{ borderRadius: 4, py: 2, mb: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' } }}>
//                     <ListItemIcon sx={{ color: '#fff', minWidth: 50 }}>
//                       <VpnKeyIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary="Role Master"
//                       primaryTypographyProps={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               )}

//               {/* Add more menu items here as needed */}
//             </List>
//           </Box>
//         </Drawer>
//       )}

//       {/* Main Content Area - Perfect Top Alignment */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           pt: { xs: '80px', sm: '90px' },   // AppBar height
//           pl: isUser ? 0 : (sidebarOpen ? `${drawerWidth}px` : '72px'),
//           transition: 'all 0.3s ease',
//           minHeight: '100vh',
//           backgroundColor: '#f5f7fa',
//         }}
//       >
//         {/* Your page content (Outlet) will render here */}
//       </Box>
//     </>
//   );
// }

// ========================

// import React, { useState } from 'react';
// import {
//   Box,
//   IconButton,
//   Typography,
//   Menu,
//   MenuItem,
//   AppBar as MuiAppBar,
//   Toolbar,
//   CssBaseline,
//   Drawer as MuiDrawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
// } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import GroupIcon from '@mui/icons-material/Group';
// import VpnKeyIcon from '@mui/icons-material/VpnKey';

// import { useNavigate, useLocation, Outlet } from 'react-router-dom';   // <<< Outlet import केलं
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleSidebar } from './store/actions/toggleSidebar';

// // Images
// import drawerbg from './Images/sidebarimg.jpg';
// import logo from './Images/thanegramin.jpeg';
// import logobrand from './Images/thanegraminpolicebrand.jpeg';

// const drawerWidth = 240;

// // AppBar styling (same as before)
// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isUser',
// })(({ theme, open, isUser }) => ({
//   backgroundColor: '#ffffff',
//   backdropFilter: 'blur(15px)',
//   boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
//   color: '#000',
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && !isUser && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//   }),
//   ...(!open && !isUser && {
//     marginLeft: 72,
//     width: `calc(100% - 72px)`,
//   }),
// }));

// // Drawer - Only left side rounded
// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: 'nowrap',
//   boxSizing: 'border-box',
//   '& .MuiDrawer-paper': {
//     borderTopRightRadius: '28px',
//     borderBottomRightRadius: '28px',
//     overflow: 'hidden',
//     backgroundImage: `url(${drawerbg})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     width: open ? drawerWidth : 72,
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
// }));

// export default function Sidebar() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.auth.user);
//   const sidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);
//   const isAuthPage = ['/login', '/register'].includes(location.pathname);

//   const isUser = user?.role === 'User';
//   const isAdminRole = ['Super Admin', 'Admin', 'Executive Engineer', 'Junior Engineer', 'Data Entry Operator'].includes(user?.role);

//   const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);

//   const handleLogout = () => {
//     localStorage.removeItem('resdata');
//     dispatch({ type: 'LOGOUT' });
//     navigate('/login');
//   };

//   if (isAuthPage) return null;

//   return (
//     <>
//       <CssBaseline />

//       {/* Top AppBar */}
//       <AppBar position="fixed" open={sidebarOpen} isUser={isUser}>
//         <Toolbar sx={{ minHeight: { xs: 80, sm: 90 }, justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             {isAdminRole && !sidebarOpen && (
//               <IconButton onClick={() => dispatch(toggleSidebar())}>
//                 <MenuIcon sx={{ color: '#32B5AD', fontSize: 36 }} />
//               </IconButton>
//             )}
//             <img
//               src={logobrand}
//               alt="ठाणे ग्रामीण पोलीस"
//               style={{ height: 84, width: 'auto', objectFit: 'contain' }}
//             />
//           </Box>

//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//             <Typography
//               sx={{
//                 color: '#FB404B',
//                 fontWeight: 'bold',
//                 fontSize: { xs: 19, sm: 23 },
//                 textTransform: 'uppercase',
//                 letterSpacing: '1.8px',
//               }}
//             >
//               {user?.username || 'USER'}
//             </Typography>
//             <Divider orientation="vertical" flexItem sx={{ bgcolor: '#FB404B', width: 3.5, height: 36 }} />
//             <IconButton onClick={handleLogout} sx={{ color: '#FB404B' }}>
//               <PowerSettingsNewIcon fontSize="large" />
//             </IconButton>

//             {/* Three Dots Menu - Only for normal User */}
//             {isUser && (
//               <>
//                 <IconButton
//                   onClick={(e) => setMoreMenuAnchor(e.currentTarget)}
//                   sx={{
//                     color: '#FB404B',
//                     bgcolor: 'rgba(251,64,75,0.14)',
//                     '&:hover': { bgcolor: 'rgba(251,64,75,0.25)' },
//                     borderRadius: '18px',
//                     p: 1.6,
//                   }}
//                 >
//                   <MoreVertIcon fontSize="large" />
//                 </IconButton>

//                 <Menu
//                   anchorEl={moreMenuAnchor}
//                   open={Boolean(moreMenuAnchor)}
//                   onClose={() => setMoreMenuAnchor(null)}
//                   PaperProps={{
//                     sx: {
//                       mt: 2.5,
//                       borderRadius: '24px',
//                       boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
//                       minWidth: 280,
//                       bgcolor: '#ffffff',
//                     },
//                   }}
//                 >
//                   <MenuItem onClick={() => { navigate('/entryform'); setMoreMenuAnchor(null); }} sx={{ py: 3.2, fontWeight: 600, fontSize: 17, color: '#0040B9' }}>
//                     Entry Form
//                   </MenuItem>
//                   <MenuItem onClick={() => { navigate('/feedback'); setMoreMenuAnchor(null); }} sx={{ py: 3.2, fontWeight: 600, fontSize: 17, color: '#6C0204' }}>
//                     Feedback Form
//                   </MenuItem>
//                 </Menu>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar - Only for Admin Roles */}
//       {isAdminRole && (
//         <Drawer variant="permanent" open={sidebarOpen}>
//           <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
//             <div style={{ position: 'absolute', inset: 0, backgroundColor: '#20B2AA', opacity: 0.96 }} />

//             {sidebarOpen && (
//               <Box sx={{ height: 190, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 2 }}>
//                 <img
//                   src={logo}
//                   alt="ठाणे ग्रामीण पोलीस"
//                   style={{
//                     height: '70%',
//                     width: '65%',
//                     objectFit: 'contain',
//                     borderRadius: '24px',
//                     boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
//                   }}
//                 />
//                 <IconButton
//                   onClick={() => dispatch(toggleSidebar())}
//                   sx={{
//                     position: 'absolute',
//                     right: 14,
//                     top: 14,
//                     bgcolor: '#20B2AA',
//                     '&:hover': { bgcolor: '#1a8f8a' },
//                     boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
//                   }}
//                 >
//                   <ChevronLeftIcon sx={{ color: '#fff', fontSize: 32 }} />
//                 </IconButton>
//               </Box>
//             )}

//             <List sx={{ mt: sidebarOpen ? 5 : 12, px: 2, zIndex: 2 }}>
//               <ListItem disablePadding onClick={() => navigate('/')}>
//                 <ListItemButton sx={{ borderRadius: 4, py: 2, mb: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' } }}>
//                   <ListItemIcon sx={{ color: '#fff', minWidth: 50 }}><DashboardIcon /></ListItemIcon>
//                   <ListItemText primary="Dashboard" primaryTypographyProps={{ color: '#fff', fontWeight: 'bold', fontSize: 16, text0700Transform: 'uppercase' }} />
//                 </ListItemButton>
//               </ListItem>

//               {(user?.role === 'Super Admin' || user?.role === 'Admin') && (
//                 <>
//                   <ListItem disablePadding onClick={() => navigate('/users')}>
//                     <ListItemButton sx={{ borderRadius: 4, py: 2, mb: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' } }}>
//                       <ListItemIcon sx={{ color: '#fff', minWidth: 50 }}><GroupIcon /></ListItemIcon>
//                       <ListItemText primary="User Master" primaryTypographyProps={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }} />
//                     </ListItemButton>
//                   </ListItem>

//                   <ListItem disablePadding onClick={() => navigate('/rolemaster')}>
//                     <ListItemButton sx={{ borderRadius: 4, py: 2, mb: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' } }}>
//                       <ListItemIcon sx={{ color: '#fff', minWidth: 50 }}><VpnKeyIcon /></ListItemIcon>
//                       <ListItemText primary="Role Master" primaryTypographyProps={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }} />
//                     </ListItemButton>
//                   </ListItem>
//                 </>
//               )}
//             </List>
//           </Box>
//         </Drawer>
//       )}

//       {/* MAIN CONTENT - इथे सगळे pages दिसतील (Dashboard, UserMaster, RoleMaster) */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           pt: { xs: '80px', sm: '90px' },      // AppBar height
//           pl: isUser ? 0 : (sidebarOpen ? `${drawerWidth}px` : '72px'),  // Sidebar space
//           transition: 'all 0.3s ease',
//           minHeight: '100vh',
//           backgroundColor: '#f5f7fa',
//         }}
//       >
//         <Outlet />   {/* <<< हा सर्वात महत्वाचा आहे! येथे तुझे pages render होतील */}
//       </Box>
//     </>
//   );
// }

// =================================


// import React, { useState } from 'react';
// import {
//   Box,
//   IconButton,
//   Typography,
//   Menu,
//   MenuItem,
//   AppBar as MuiAppBar,
//   Toolbar,
//   CssBaseline,
//   Drawer as MuiDrawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Button
// } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import GroupIcon from '@mui/icons-material/Group';
// import VpnKeyIcon from '@mui/icons-material/VpnKey';

// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleSidebar } from './store/actions/toggleSidebar';

// // Images
// import drawerbg from './Images/sidebarimg.jpg';
// import logo from './Images/thanegramin.jpeg';
// import logobrand from './Images/thanegraminpolicebrand.jpeg';

// const drawerWidth = 240;

// // AppBar
// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isUser',
// })(({ theme, open, isUser }) => ({
//   backgroundColor: '#ffffff',
//   backdropFilter: 'blur(15px)',
//   boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
//   color: '#000',
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && !isUser && { marginLeft: drawerWidth, width: `calc(100% - ${drawerWidth}px)` }),
//   ...(!open && !isUser && { marginLeft: 72, width: `calc(100% - 72px)` }),
// }));

// // Drawer
// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     '& .MuiDrawer-paper': {
//       borderTopRightRadius: '28px',
//       borderBottomRightRadius: '28px',
//       overflow: 'hidden',
//       backgroundImage: `url(${drawerbg})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       width: open ? drawerWidth : 72,
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//     },
//   })
// );

// export default function Sidebar() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.auth.user);
//   const sidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);
//   const isAuthPage = ['/login', '/register'].includes(location.pathname);

//   const isUser = user?.role === 'User';
//   const isAdminRole = ['Super Admin', 'Admin', 'Executive Engineer', 'Junior Engineer', 'Data Entry Operator'].includes(user?.role);

//   const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);

//   const handleLogout = () => {
//     localStorage.removeItem('resdata');
//     dispatch({ type: 'LOGOUT' });
//     navigate('/login');
//   };

//   if (isAuthPage) return null;

//   // Content render logic - No import errors!
//   const renderContent = () => {
//     const path = location.pathname;

//     if (path === '/' || path === '/dashboard') {
//       return (
//         <Box sx={{ p: { xs: 2, sm: 4 } }}>
//           <Typography variant="h4" fontWeight="bold" color="#0040B9" gutterBottom>
//             DASHBOARD
//           </Typography>
//           <Box sx={{ mt: 4, bgcolor: 'white', p: 6, borderRadius: 4, boxShadow: 6 }}>
//             <Typography variant="h5" color="success.main">Welcome, {user?.username}!</Typography>
//             <Typography sx={{ mt: 2, color: 'gray' }}>डॅशबोर्ड इथे येईल...</Typography>
//           </Box>
//         </Box>
//       );
//     }

//     if (path === '/users') {
//       return (
//         <Box sx={{ p: { xs: 2, sm: 4 } }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//             <Typography variant="h4" fontWeight="bold" color="#0040B9">
//               USER MASTER
//             </Typography>
//             <Button variant="contained" color="success" size="large">
//               + ADD USER
//             </Button>
//           </Box>
//           <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 3, boxShadow: 6, minHeight: '60vh' }}>
//             <Typography>User Master Table इथे येईल...</Typography>
//           </Box>
//         </Box>
//       );
//     }

//     if (path === '/rolemaster') {
//       return (
//         <Box sx={{ p: { xs: 2, sm: 4 } }}>
//           <Typography variant="h4" fontWeight="bold" color="#0040B9" gutterBottom>
//             ROLE MASTER
//           </Typography>
//           <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 3, boxShadow: 6, minHeight: '60vh' }}>
//             <Typography>Role Master Table इथे येईल...</Typography>
//           </Box>
//         </Box>
//       );
//     }

//     if (path === '/entryform') {
//       return (
//         <Box sx={{ p: { xs: 2, sm: 4 } }}>
//           <Typography variant="h4" fontWeight="bold" color="#0040B9" gutterBottom>
//             ENTRY FORM
//           </Typography>
//           <Box sx={{ bgcolor: 'white', p: 6, borderRadius: 4, boxShadow: 6 }}>
//             <Typography>Entry Form इथे येईल...</Typography>
//           </Box>
//         </Box>
//       );
//     }

//     if (path === '/feedback') {
//       return (
//         <Box sx={{ p: { xs: 2, sm: 4 } }}>
//           <Typography variant="h4" fontWeight="bold" color="#0040B9" gutterBottom>
//             FEEDBACK FORM
//           </Typography>
//           <Box sx={{ bgcolor: 'white', p: 6, borderRadius: 4, boxShadow: 6 }}>
//             <Typography>Feedback Form इथे येईल...</Typography>
//           </Box>
//         </Box>
//       );
//     }

//     return (
//       <Box sx={{ p: 8, textAlign: 'center' }}>
//         <Typography variant="h3" color="gray">Welcome to Thane Rural Police Portal</Typography>
//         <Typography sx={{ mt: 2 }}>Select an option from sidebar</Typography>
//       </Box>
//     );
//   };

//   return (
//     <>
//       <CssBaseline />

//       {/* Top AppBar */}
//       <AppBar position="fixed" open={sidebarOpen} isUser={isUser}>
//         <Toolbar sx={{ minHeight: { xs: 80, sm: 90 }, justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             {isAdminRole && !sidebarOpen && (
//               <IconButton onClick={() => dispatch(toggleSidebar())}>
//                 <MenuIcon sx={{ color: '#32B5AD', fontSize: 36 }} />
//               </IconButton>
//             )}
//             <img src={logobrand} alt="ठाणे ग्रामीण पोलीस" style={{ height: 84, objectFit: 'contain' }} />
//           </Box>

//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//             <Typography sx={{ color: '#FB404B', fontWeight: 'bold', fontSize: { xs: 19, sm: 23 }, textTransform: 'uppercase', letterSpacing: '1.8px' }}>
//               {user?.username || 'USER'}
//             </Typography>
//             <Divider orientation="vertical" flexItem sx={{ bgcolor: '#FB404B', width: 3.5, height: 36 }} />
//             <IconButton onClick={handleLogout} sx={{ color: '#FB404B' }}>
//               <PowerSettingsNewIcon fontSize="large" />
//             </IconButton>

//             {isUser && (
//               <>
//                 <IconButton onClick={(e) => setMoreMenuAnchor(e.currentTarget)} sx={{ color: '#FB404B', bgcolor: 'rgba(251,64,75,0.14)', borderRadius: '18px', p: 1.6 }}>
//                   <MoreVertIcon fontSize="large" />
//                 </IconButton>
//                 <Menu anchorEl={moreMenuAnchor} open={Boolean(moreMenuAnchor)} onClose={() => setMoreMenuAnchor(null)}
//                   PaperProps={{ sx: { mt: 2.5, borderRadius: '24px', boxShadow: 20, minWidth: 280 } }}>
//                   <MenuItem onClick={() => { navigate('/entryform'); setMoreMenuAnchor(null); }} sx={{ py: 3.2, fontWeight: 600, fontSize: 17, color: '#0040B9' }}>Entry Form</MenuItem>
//                   <MenuItem onClick={() => { navigate('/feedback'); setMoreMenuAnchor(null); }} sx={{ py: 3.2, fontWeight: 600, fontSize: 17, color: '#6C0204' }}>Feedback Form</MenuItem>
//                 </Menu>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar */}
//       {isAdminRole && (
//         <Drawer variant="permanent" open={sidebarOpen}>
//           <Box sx={{ position: 'relative', height: '100%' }}>
//             <div style={{ position: 'absolute', inset: 0, backgroundColor: '#20B2AA', opacity: 0.96 }} />

//             {sidebarOpen && (
//               <Box sx={{ height: 190, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 2 }}>
//                 <img src={logo} alt="Logo" style={{ height: '70%', width: '65%', objectFit: 'contain', borderRadius: '24px', boxShadow: '0 12px 32px rgba(0,0,0,0.5)' }} />
//                 <IconButton onClick={() => dispatch(toggleSidebar())} sx={{ position: 'absolute', right: 14, top: 14, bgcolor: '#20B2AA' }}>
//                   <ChevronLeftIcon sx={{ color: '#fff', fontSize: 32 }} />
//                 </IconButton>
//               </Box>
//             )}

//             <List sx={{ mt: sidebarOpen ? 5 : 12, px: 2, zIndex: 2 }}>
//               <ListItem disablePadding onClick={() => navigate('/')}>
//                 <ListItemButton sx={{ borderRadius: 4, py: 2, mb: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' } }}>
//                   <ListItemIcon sx={{ color: '#fff', minWidth: 50 }}><DashboardIcon /></ListItemIcon>
//                   <ListItemText primary="Dashboard" primaryTypographyProps={{ color: '#fff', fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase' }} />
//                 </ListItemButton>
//               </ListItem>

//               {(user?.role === 'Super Admin' || user?.role === 'Admin') && (
//                 <>
//                   <ListItem disablePadding onClick={() => navigate('/users')}>
//                     <ListItemButton sx={{ borderRadius: 4, py: 2, mb: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' } }}>
//                       <ListItemIcon sx={{ color: '#fff', minWidth: 50 }}><GroupIcon /></ListItemIcon>
//                       <ListItemText primary="User Master" primaryTypographyProps={{ color: '#fff', fontWeight: 'bold' }} />
//                     </ListItemButton>
//                   </ListItem>

//                   <ListItem disablePadding onClick={() => navigate('/rolemaster')}>
//                     <ListItemButton sx={{ borderRadius: 4, py: 2, mb: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' } }}>
//                       <ListItemIcon sx={{ color: '#fff', minWidth: 50 }}><VpnKeyIcon /></ListItemIcon>
//                       <ListItemText primary="Role Master" primaryTypographyProps={{ color: '#fff', fontWeight: 'bold' }} />
//                     </ListItemButton>
//                   </ListItem>
//                 </>
//               )}
//             </List>
//           </Box>
//         </Drawer>
//       )}

//       {/* Main Content - Pages render here */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           pt: { xs: '80px', sm: '90px' },
//           pl: isUser ? 0 : (sidebarOpen ? `${drawerWidth}px` : '72px'),
//           transition: 'all 0.3s ease',
//           minHeight: '100vh',
//           backgroundColor: '#f5f7fa',
//         }}
//       >
//         {renderContent()}
//       </Box>
//     </>
//   );
// }

// =======================================

import React, { useState } from 'react';
import {
  Box, IconButton, Typography, Menu, MenuItem, AppBar as MuiAppBar, Toolbar,
  CssBaseline, Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Divider, Button, Paper, Grid, Card, CardContent, Avatar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, LinearProgress
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PeopleIcon from '@mui/icons-material/People';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from './store/actions/toggleSidebar';

// Images
import drawerbg from './Images/sidebarimg.jpg';
import logo from './Images/thanegramin.jpeg';
import logobrand from './Images/thanegraminpolicebrand.jpeg';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isUser',
})(({ theme, open, isUser }) => ({
  backgroundColor: '#ffffff',
  backdropFilter: 'blur(15px)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  color: '#000',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && !isUser && { marginLeft: drawerWidth, width: `calc(100% - ${drawerWidth}px)` }),
  ...(!open && !isUser && { marginLeft: 72, width: `calc(100% - 72px)` }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      borderTopRightRadius: '28px',
      borderBottomRightRadius: '28px',
      overflow: 'hidden',
      backgroundImage: `url(${drawerbg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: open ? drawerWidth : 72,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  })
);

// Dummy Data
const usersData = [
  { id: 1, name: "राजेश पवार", role: "Super Admin", email: "rajesh@thanepolice.gov.in", status: "Active", joinDate: "2024-01-15" },
  { id: 2, name: "सुनीता जाधव", role: "Admin", email: "sunita@thanepolice.gov.in", status: "Active", joinDate: "2024-03-20" },
  { id: 3, name: "अमोल शिंदे", role: "Data Entry Operator", email: "amol@police.in", status: "Active", joinDate: "2025-01-10" },
  { id: 4, name: "प्रकाश माने", role: "Junior Engineer", email: "prakash@police.in", status: "Inactive", joinDate: "2024-06-05" },
];

const rolesData = [
  { id: 1, roleName: "Super Admin", permissions: "Full Access", users: 2 },
  { id: 2, roleName: "Admin", permissions: "All except User Delete", users: 8 },
  { id: 3, roleName: "Data Entry Operator", permissions: "Entry + View", users: 45 },
  { id: 4, roleName: "Visitor", permissions: "View Only", users: 12 },
];

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user || { username: "Admin", role: "Super Admin" });
  const sidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  const isUser = user?.role === 'Data Entry Operator';
  const isAdminRole = ['Super Admin', 'Admin'].includes(user?.role);

  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('resdata');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  if (isAuthPage) return null;

  const renderContent = () => {
    const path = location.pathname;

    // DASHBOARD
    if (path === '/' || path === '/dashboard') {
      // return (
      //   <Box sx={{ p: { xs: 2, sm: 4 } }}>
      //     <Typography variant="h4" fontWeight="bold" color="#0040B9" gutterBottom>
      //       डॅशबोर्ड - Dashboard
      //     </Typography>

      //     <Grid container spacing={3} sx={{ mt: 2 }}>
      //       <Grid item xs={12} sm={6} md={3}>
      //         <Card sx={{ background: 'linear-gradient(135deg, #0040B9, #002D80)', color: 'white' }}>
      //           <CardContent>
      //             <PeopleIcon sx={{ fontSize: 50, opacity: 0.8 }} />
      //             <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>1,248</Typography>
      //             <Typography variant="h6">आजची व्हिजिटर्स</Typography>
      //           </CardContent>
      //         </Card>
      //       </Grid>
      //       <Grid item xs={12} sm={6} md={3}>
      //         <Card sx={{ background: 'linear-gradient(135deg, #32B5AD, #20B2AA)', color: 'white' }}>
      //           <CardContent>
      //             <HowToRegIcon sx={{ fontSize: 50, opacity: 0.8 }} />
      //             <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>89</Typography>
      //             <Typography variant="h6">एंट्री पूर्ण</Typography>
      //           </CardContent>
      //         </Card>
      //       </Grid>
      //       <Grid item xs={12} sm={6} md={3}>
      //         <Card sx={{ background: 'linear-gradient(135deg, #FB404B, #E91E63)', color: 'white' }}>
      //           <CardContent>
      //             <PendingActionsIcon sx={{ fontSize: 50, opacity: 0.8 }} />
      //             <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>12</Typography>
      //             <Typography variant="h6">प्रलंबित</Typography>
      //           </CardContent>
      //         </Card>
      //       </Grid>
      //       <Grid item xs={12} sm={6} md={3}>
      //         <Card sx={{ background: 'linear-gradient(135deg, #4CAF50, #8BC34A)', color: 'white' }}>
      //           <CardContent>
      //             <CheckCircleIcon sx={{ fontSize: 50, opacity: 0.8 }} />
      //             <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>98.2%</Typography>
      //             <Typography variant="h6">सफलता दर</Typography>
      //           </CardContent>
      //         </Card>
      //       </Grid>
      //     </Grid>

      //     {/* <Paper sx={{ mt: 5, p: 4, borderRadius: 4, boxShadow: 6 }}>
      //       <Typography variant="h5" fontWeight="bold" color="#0040B9" gutterBottom>
      //         स्वागत आहे, {user?.username || "अधिकारी"} साहेब!
      //       </Typography>
      //       <Typography color="text.secondary">
      //         ठाणे ग्रामीण पोलीस डिजिटल पोर्टल - आजचे अपडेट्स पहा
      //       </Typography>
      //     </Paper> */}
      //   </Box>
      // );
    }

    // USER MASTER
    if (path === '/users') {
      // return (
      //   <Box sx={{ p: { xs: 2, sm: 4 } }}>
      //     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
      //       <Typography variant="h4" fontWeight="bold" color="#0040B9">
      //         यूजर मास्टर - User Master
      //       </Typography>
      //       <Button variant="contained" color="success" size="large" startIcon={<GroupIcon />}>
      //         + नवीन यूजर जोडा
      //       </Button>
      //     </Box>

      //     <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 6 }}>
      //       <TableContainer>
      //         <Table>
      //           <TableHead sx={{ background: '#0040B9' }}>
      //             <TableRow>
      //               <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>नाव</TableCell>
      //               <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>रोल</TableCell>
      //               <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ईमेल</TableCell>
      //               <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>स्थिती</TableCell>
      //               <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>जॉईन तारीख</TableCell>
      //               <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>कृती</TableCell>
      //             </TableRow>
      //           </TableHead>
      //           <TableBody>
      //             {usersData.map((user) => (
      //               <TableRow key={user.id} hover>
      //                 <TableCell>
      //                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      //                     <Avatar sx={{ bgcolor: '#0040B9' }}>{user.name[0]}</Avatar>
      //                     <Typography fontWeight="medium">{user.name}</Typography>
      //                   </Box>
      //                 </TableCell>
      //                 <TableCell>
      //                   <Chip label={user.role} color="primary" size="small" />
      //                 </TableCell>
      //                 <TableCell>{user.email}</TableCell>
      //                 <TableCell>
      //                   <Chip label={user.status} color={user.status === "Active" ? "success" : "error"} size="small" />
      //                 </TableCell>
      //                 <TableCell>{user.joinDate}</TableCell>
      //                 <TableCell>
      //                   <Button size="small" variant="outlined" sx={{ mr: 1 }}>Edit</Button>
      //                   <Button size="small" color="error" variant="outlined">Delete</Button>
      //                 </TableCell>
      //               </TableRow>
      //             ))}
      //           </TableBody>
      //         </Table>
      //       </TableContainer>
      //     </Paper>
      //   </Box>
      // );
    }

    // ROLE MASTER
    if (path === '/rolemaster') {
      return (
        <Box sx={{ p: { xs: 2, sm: 4 } }}>
          <Typography variant="h4" fontWeight="bold" color="#0040B9" gutterBottom mb={4}>
            रोल मास्टर - Role Master
          </Typography>

          <Grid container spacing={3}>
            {rolesData.map((role) => (
              <Grid item xs={12} md={6} key={role.id}>
                <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 6, border: '1px solid #0040B9' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h5" fontWeight="bold" color="#0040B9">
                        {role.roleName}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        परमिशन: {role.permissions}
                      </Typography>
                    </Box>
                    <Chip label={`${role.users} यूजर्स`} color="primary" />
                  </Box>
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button variant="contained" size="small">Edit Role</Button>
                    <Button variant="outlined" size="small" color="error">Delete</Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }

    // Default
    // return (
    //   <Box sx={{ p: 8, textAlign: 'center' }}>
    //     <Typography variant="h3" color="#0040B9" fontWeight="bold">
    //       ठाणे ग्रामीण पोलीस डिजिटल पोर्टल
    //     </Typography>
    //     <Typography variant="h5" color="gray" sx={{ mt: 2 }}>
    //       साइडबार मधून ऑप्शन निवडा
    //     </Typography>
    //   </Box>
    // );
  };

  return (
    <>
      <CssBaseline />

      <AppBar position="fixed" open={sidebarOpen} isUser={isUser}>
        <Toolbar sx={{ minHeight: { xs: 80, sm: 90 }, justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
          {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isAdminRole && !sidebarOpen && (
              <IconButton onClick={() => dispatch(toggleSidebar())}>
                <MenuIcon sx={{ color: '#32B5AD', fontSize: 36 }} />
              </IconButton>
            )}
            <img src={logobrand} alt="ठाणे ग्रामीण पोलीस" style={{ height: 84, objectFit: 'contain' }} />
          </Box> */}

          {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  {isAdminRole && (
    <IconButton onClick={() => dispatch(toggleSidebar())}>
      <MenuIcon sx={{ color: '#32B5AD', fontSize: 36 }} />
    </IconButton>
  )}

  <img 
    src={logobrand} 
    alt="ठाणे ग्रामीण पोलीस" 
    style={{ 
      height: 90, 
      width: 'auto', 
      maxWidth: 'none',
      objectFit: 'contain' 
    }} 
  />
</Box> */}


<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  {/* Admin साठी साइडबार टॉगल बटन – फक्त Admin ला दिसेल */}
  {isAdminRole && (
    <IconButton onClick={() => dispatch(toggleSidebar())}>
      <MenuIcon sx={{ color: '#32B5AD', fontSize: 36 }} />
    </IconButton>
  )}

  {/* लोगो – Role नुसार height बदलते */}
  <img
    src={logobrand}
    alt="ठाणे ग्रामीण पोलीस"
    style={{
      height: isAdminRole ? 90 : 130,   // Admin → 90px, Data Entry Operator → 130px
      width: 'auto',
      maxWidth: 'none',
      objectFit: 'contain',
    }}
  />
</Box>

        

<Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
  {/* Show these buttons only for Data Entry Operator (User) */}
  {isUser && (
    <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2, alignItems: 'center' }}>
      <Button
        variant="outlined"
        size="medium"
        onClick={() => navigate('/entryform')}
        sx={{
          borderColor: '#0040B9',
          color: '#0040B9',
          fontWeight: 'bold',
          borderRadius: 3,
          px: 3,
          borderWidth: 2,
          '&:hover': { borderColor: '#002D80', bgcolor: 'rgba(0,64,185,0.08)' }
        }}
      >
        Entry Form
      </Button>

      <Button
        variant="outlined"
        size="medium"
        onClick={() => navigate('/feedback')}
        sx={{
          borderColor: '#0040B9',
          color: '#0040B9',
          fontWeight: 'bold',
          borderRadius: 3,
          px: 3,
          borderWidth: 2,
          '&:hover': { borderColor: '#002D80', bgcolor: 'rgba(0,64,185,0.08)' }
        }}
      >
        Feedback Form
      </Button>
    </Box>
  )}

  {/* Username + Logout → Show for ALL ROLES (Admin, Super Admin, User, etc.) */}
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <Typography 
      sx={{ 
        color: '#FB404B', 
        fontWeight: 'bold', 
        fontSize: { xs: 18, sm: 20 }, 
        textTransform: 'uppercase', 
        letterSpacing: '1.5px',
        whiteSpace: 'nowrap'
      }}
    >
      {user?.username || 'ADMIN'}
    </Typography>

    <Divider orientation="vertical" flexItem sx={{ bgcolor: '#FB404B', width: 3, height: 24 }} />

    <IconButton 
      onClick={handleLogout} 
      sx={{ 
        color: '#FB404B',
        bgcolor: 'rgba(251,64,75,0.12)',
        '&:hover': { bgcolor: 'rgba(251,64,75,0.2)' },
        p: 1.2
      }}
    >
      <PowerSettingsNewIcon fontSize="medium" />
    </IconButton>
  </Box>

  {/* Optional: 3-dot menu for mobile (only for Data Entry users) */}
  {isUser && (
    <IconButton
      onClick={(e) => setMoreMenuAnchor(e.currentTarget)}
      sx={{
        display: { sm: 'none' }, // Only show on mobile
        color: '#FB404B',
        bgcolor: 'rgba(251,64,75,0.14)',
        borderRadius: '18px',
        p: 1.6
      }}
    >
      <MoreVertIcon fontSize="large" />
    </IconButton>
  )}
</Box>
          
        </Toolbar>
      </AppBar>

      {isAdminRole && (
        <Drawer variant="permanent" open={sidebarOpen}>
          <Box sx={{ position: 'relative', height: '100%' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundColor: '#20B2AA', opacity: 0.96 }} />

            {sidebarOpen && (
              <Box sx={{ height: 190, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                <img src={logo} alt="Logo" style={{ height: '70%', width: '65%', objectFit: 'contain', borderRadius: '24px', boxShadow: '0 12px 32px rgba(0,0,0,0.5)' }} />
                <IconButton onClick={() => dispatch(toggleSidebar())} sx={{ position: 'absolute', right: 14, top: 14, bgcolor: '#20B2AA' }}>
                  <ChevronLeftIcon sx={{ color: '#fff', fontSize: 32 }} />
                </IconButton>
              </Box>
            )}

            <List sx={{ mt: sidebarOpen ? 5 : 12, px: 2, zIndex: 2 }}>
              <ListItem disablePadding onClick={() => navigate('/')}>
                <ListItemButton sx={{ borderRadius: 4, py: 2, mb: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' } }}>
                  <ListItemIcon sx={{ color: '#fff', minWidth: 50 }}><DashboardIcon /></ListItemIcon>
                  <ListItemText primary="Dashboard" primaryTypographyProps={{ color: '#fff', fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase' }} />
                </ListItemButton>
              </ListItem>

              {(user?.role === 'Super Admin' || user?.role === 'Admin') && (
                <>
                  <ListItem disablePadding onClick={() => navigate('/users')}>
                    <ListItemButton sx={{ borderRadius: 4, py: 2, mb: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' } }}>
                      <ListItemIcon sx={{ color: '#fff', minWidth: 50 }}><GroupIcon /></ListItemIcon>
                      <ListItemText primary="User Master" primaryTypographyProps={{ color: '#fff', fontWeight: 'bold' }} />
                    </ListItemButton>
                  </ListItem>

                    <ListItem disablePadding onClick={() => navigate('/visitorsmaster')}>
                    <ListItemButton sx={{ borderRadius: 4, py: 2, mb: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' } }}>
                      <ListItemIcon sx={{ color: '#fff', minWidth: 50 }}><GroupIcon /></ListItemIcon>
                      <ListItemText primary="Visitors Master" primaryTypographyProps={{ color: '#fff', fontWeight: 'bold' }} />
                    </ListItemButton>
                  </ListItem>


                  <ListItem disablePadding onClick={() => navigate('/rolemaster')}>
                    <ListItemButton sx={{ borderRadius: 4, py: 2, mb: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' } }}>
                      <ListItemIcon sx={{ color: '#fff', minWidth: 50 }}><VpnKeyIcon /></ListItemIcon>
                      <ListItemText primary="Role Master" primaryTypographyProps={{ color: '#fff', fontWeight: 'bold' }} />
                    </ListItemButton>
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Drawer>
      )}

      {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: '80px', sm: '90px' },
          pl: isUser ? 0 : (sidebarOpen ? `${drawerWidth}px` : '72px'),
          transition: 'all 0.3s ease',
          minHeight: '100vh',
          backgroundColor: '#f5f7fa',
        }}
      >
        {renderContent()}
      </Box> */}

{/* 
            <Box
        component="main"
        sx={{
          flexGrow: 1,
          // pt पूर्ण काढला! आता फक्त role नुसार marginTop
          marginTop: user?.role === 'User' 
            ? { xs: '12px', sm: '16px' }   // User साठी फक्त 12-16px gap
            : { xs: '24px', sm: '32px' },   // Admin साठी थोडासा gap (clean look साठी)
          paddingLeft: user?.role === 'User' 
            ? 0 
            : (sidebarOpen ? `${drawerWidth}px` : '72px'),
          transition: 'all 0.3s ease-in-out',
          minHeight: '100vh',
          backgroundColor: '#f5f7fa',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {renderContent()}
      </Box> */}

            <Box
        component="main"
        sx={{
          flexGrow: 1,
          // पूर्ण pt काढला! आता फक्त role नुसार थोडासा margin
          // mt: user?.role === 'User' ? 1.5 : 3,   // User साठी फक्त 12px, Admin साठी 24px
          pl: user?.role === 'Visitor' ? 0 : (sidebarOpen ? `${drawerWidth}px` : '72px'),
          transition: 'all 0.3s ease-in-out',
          // minHeight: '100vh',
          backgroundColor: '#f5f7fa',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {renderContent()}
      </Box>
    </>
  );
}