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

  const user = useSelector((state) => state.auth.user || { username: "Admin", role: "Super Admin", username: "Administrative Officer", });
  const sidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  const isAdministrative=user?.role==='Administratoive Officer'
  const isUser = user?.role === 'Data Entry Operatr';
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

      <AppBar position="fixed" open={sidebarOpen} isUser={isUser}  isAdministrative={isAdministrative}>
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
  {isUser || isAdministrative && (
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