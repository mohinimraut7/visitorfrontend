// import React, { useEffect,useState } from 'react';
// import { useTheme } from '@mui/material/styles';
// import { useMediaQuery } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers } from '../store/actions/userActions';

// import { fetchRoles } from '../store/actions/roleActions';
// import { fetchTenders } from '../store/actions/tenderActions';
// import { fetchConsumers } from '../store/actions/consumerActions';

// import InfoCard from '../components/cards/InfoCard';
// import { CircularProgress, Box } from '@mui/material';
// import './Home.css';
// import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
// import AverageTendersCurrentMonth from '../components/table/AverageMetersCurrentMonth';
// import FaultyTendersCurrentMonth from '../components/table/FaultyMetersCurrentMonth';
// import UpcomingDueBillCurrentMonth from '../components/table/UpcomingDueBillCurrenthMonth';
// import PaidBillpreviousTwoMonthBefore from '../components/table/PaidBillpreviousTwoMonthBefore';
// import FaultyTendersBeforeTwoMonth from '../components/table/FaultyMetersBeforeTwoMonth';
// import OverdueBillsTable from '../components/table/OverdueBillsTable';

// const Home = () => {
//   const dispatch = useDispatch();
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector(state => state.auth.user);
//   const { tenders, pagination, loading: loadingtenders, error: errorUsers } = useSelector((state) => state.tenders);
//   const { loading: loadingRoles, error: errorRoles } = useSelector((state) => state.roles);
//   const [showCMonthAvgTable, setShowCMonthAvgTable] = useState(false);
//   const [showCMonthUDueBill, setshowCMonthUDueBill] = useState(false);
//   const [showOverdueBill, setShowOverdueBill] = useState(false);
//   const [showPTwoMonthBeforePaidTable,setShowPTwoMonthBeforePaidTable]=useState(false);
//   const [showCMonthFaultyTable, setShowCMonthFaultyTable] = useState(false);
//   const [showBeforeTwoMonthFaultyTable, setShowBeforeTwoMonthFaultyTable] = useState(false);

//   const currentDate = new Date();
//   const prevDate = new Date(currentDate);
//   prevDate.setMonth(prevDate.getMonth() - 1);
//   const prevDateTwo = new Date(currentDate);
//   prevDateTwo.setMonth(prevDateTwo.getMonth() - 2);

//   const theme = useTheme();
//   const isXs = useMediaQuery(theme.breakpoints.down('xs'));
//   const isSm = useMediaQuery(theme.breakpoints.down('sm'));
//   const isMd = useMediaQuery(theme.breakpoints.down('md'));
//   const isLg = useMediaQuery(theme.breakpoints.down('lg'));
//   const isXl = useMediaQuery(theme.breakpoints.down('xl'));

//   useEffect(() => {
//     dispatch(fetchUsers());
   
   
//     dispatch(fetchRoles());
//     dispatch(fetchTenders(1, 50, '')); // Fetch first page to get total count
//     dispatch(fetchConsumers());
//     document.body.classList.add('home-body');
//     return () => {
//       document.body.classList.remove('home-body');
//     };
//   }, [dispatch]);

//   if (loadingRoles) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (errorUsers) {
//     return <p>Error loading users: {errorUsers}</p>;
//   }

//   if (errorRoles) {
//     return <p>Error loading roles: {errorRoles}</p>;
//   }

//   const gridStyle = {
//     width: '100%',
//     width: isSm || isXs ? '80%' : isSidebarOpen ? '80%' : '95%',
//     marginLeft: isSm || isXs ? '60px' : isSidebarOpen ? '20%' : '6%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems:'center'
//   };

//   // Get total tender count from pagination data, fallback to tenders length if pagination not available
//   const totalTenderCount = pagination?.totalTenders || tenders?.length || 0;
  
//   return (
//     <div style={gridStyle} className="containerhome">
//       <div className="info-card-container" sx={{width: isSm || isXs? '100%' : '30%'}}>

        
// {/* 
//         {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'|| (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//           <Box sx={{width:'100%',mt:{
//             lg:isSidebarOpen?0:2,
//             md:isSidebarOpen?0:0,
//             xs:isSidebarOpen?5:5,
//              sm:isSidebarOpen?2:2 ,
//           }
//           ,ml:{
//             lg:isSidebarOpen?0:2,
//             md:isSidebarOpen?0:0,
//             xs:isSidebarOpen?0:0,
//              sm:isSidebarOpen?0:0,
//           }
//           }}>
// <InfoCard
//             IconComponent={Person2OutlinedIcon}
//             backgroundColor="#fff"
//             className="container-infocard"
//             avatarColor="#FB404B"
//             avatarIcon="PersonIcon"
//             title="Total Tenders"
//             count={totalTenderCount} 
//           />
//           </Box>
          
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default Home;


// ============================


// // src/pages/Home.js  ← हा फाइल पूर्ण replace करा
// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { PeopleAlt, AssignmentTurnedIn, AccessTime, CheckCircle } from '@mui/icons-material';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement,
//   LineElement, Title, Tooltip, Legend, Filler
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// const StyledDataGrid = styled(DataGrid)({
//   border: 'none',
//   borderRadius: '16px',
//   backgroundColor: 'white',
//   boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '4px solid #0040B9',
//     borderRadius: '16px 16px 0 0',
//     fontWeight: 700,
//   },
//   '& .MuiDataGrid-row:hover': {
//     backgroundColor: '#e3f2fd',
//     transform: 'translateY(-3px)',
//     transition: 'all 0.3s ease',
//   },
// });

// const StatsCard = ({ title, value, icon: Icon, color, bgColor }) => (
//   <Paper sx={{
//     p: 4, borderRadius: 5, background: 'white',
//     boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
//     borderLeft: `6px solid ${color}`,
//     transition: 'all 0.4s',
//     '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 25px 60px rgba(0,0,0,0.22)' }
//   }}>
//     <Box display="flex" justifyContent="space-between" alignItems="center">
//       <Box>
//         <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
//         <Typography variant="h3" fontWeight="bold" color={color} mt={1}>
//           {title.includes('Rate') ? `${value}%` : value.toLocaleString()}
//         </Typography>
//       </Box>
//       <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <Icon sx={{ fontSize: 40, color }} />
//       </Box>
//     </Box>
//   </Paper>
// );

// const Home = () => {
//   const isMobile = window.innerWidth < 768;
//   const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

//   const [filter, setFilter] = useState('daily');
//   const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, successRate: 0 });
//   const [chartData, setChartData] = useState({ labels: [], total: [], done: [] });
//   const [latestVisitors, setLatestVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchAllFromSingleAPI = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`);
      
//       if (res.data.success && res.data.data?.visitors) {
//         const visitors = res.data.data.visitors;
//         const now = new Date();
//         const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//         const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
//         const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

//         // Filter by time
//         const filtered = visitors.filter(v => {
//           const entryDate = new Date(v.entryAt || v.createdAt);
//           if (filter === 'daily') return entryDate >= today;
//           if (filter === 'weekly') return entryDate >= weekAgo;
//           return entryDate >= monthAgo;
//         });

//         const total = filtered.length;
//         const completed = filtered.filter(v => v.feedbackGiven || v.entryDone).length;
//         const pending = total - completed;
//         const successRate = total > 0 ? Math.round((completed / total) * 100) : 0;

//         setStats({ total, completed, pending, successRate });

//         // Prepare chart data
//         const hourlyData = {};
//         filtered.forEach(v => {
//           const date = new Date(v.entryAt || v.createdAt);
//           const key = filter === 'daily' 
//             ? date.getHours() + ':00'
//             : filter === 'weekly'
//             ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
//             : `Week ${Math.ceil(date.getDate() / 7)}`;

//           hourlyData[key] = hourlyData[key] || { total: 0, done: 0 };
//           hourlyData[key].total++;
//           if (v.feedbackGiven || v.entryDone) hourlyData[key].done++;
//         });

//         const sortedKeys = Object.keys(hourlyData).sort((a, b) => {
//           if (filter === 'daily') return parseInt(a) - parseInt(b);
//           if (filter === 'weekly') return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(a) - ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(b);
//           return a.localeCompare(b);
//         });

//         setChartData({
//           labels: sortedKeys,
//           total: sortedKeys.map(k => hourlyData[k].total),
//           done: sortedKeys.map(k => hourlyData[k].done)
//         });

//         // Latest 10 visitors
//         const latest = visitors.slice(0, 10).map((v, i) => ({
//           id: i + 1,
//           fullName: v.fullName,
//           mobileNumber: v.mobileNumber,
//           policeStation: v.policeStation || 'N/A',
//           entryTime: new Date(v.entryAt || v.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//         }));
//         setLatestVisitors(latest);
//       }
//     } catch (err) {
//       console.log("Using fallback data");
//     } finally {
//       setLoading(false);
//     }
//   }, [filter]);

//   useEffect(() => {
//     fetchAllFromSingleAPI();
//     const interval = setInterval(fetchAllFromSingleAPI, 10000); // हर 10 सेकंदात लाइव्ह अपडेट
//     return () => clearInterval(interval);
//   }, [fetchAllFromSingleAPI]);

//   const chartConfig = {
//     labels: chartData.labels.length ? chartData.labels : ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
//     datasets: [
//       { label: 'Total Visitors', data: chartData.total, borderColor: '#0040B9', backgroundColor: 'rgba(0,64,185,0.1)', tension: 0.4, fill: true },
//       { label: 'Entry Completed', data: chartData.done, borderColor: '#00A86B', backgroundColor: 'rgba(0,168,107,0.1)', tension: 0.4, fill: true }
//     ]
//   };

//   const getMargin = () => isMobile ? 0 : isSidebarOpen ? '18%' : '8%';

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
//         <CircularProgress size={80} sx={{ color: '#0040B9' }} />
//         <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Live Dashboard...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <div style={{
//       marginLeft: getMargin(),
//       marginTop: '80px',
//       backgroundColor: '#f0f4f8',
//       minHeight: '100vh',
//       padding: '24px',
//       transition: 'all 0.3s ease'
//     }}>
//       <Container maxWidth={false}>
//         <Typography variant="h3" fontWeight={900} color="#0d2136" mb={2} mt={5}>
//           Thane Rural Police
//         </Typography>
//         <Typography variant="h6" color="primary" mb={4}>
//           Real-time Visitor Management System 
//         </Typography>

//         <Tabs value={filter} onChange={(_, v) => setFilter(v)} centered sx={{ mb: 5 }}>
//           <Tab label="Today" value="daily" />
//           <Tab label="This Week" value="weekly" />
//           <Tab label="This Month" value="monthly" />
//         </Tabs>

//         <Grid container spacing={4} mb={6}>
//           <Grid item xs={12} sm={6} md={3}><StatsCard title="Total Visitors" value={stats.total} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" /></Grid>
//           <Grid item xs={12} sm={6} md={3}><StatsCard title="Entry Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" /></Grid>
//           <Grid item xs={12} sm={6} md={3}><StatsCard title="Pending" value={stats.pending} icon={AccessTime} color="#DC3545" bgColor="#fce7e7" /></Grid>
//           <Grid item xs={12} sm={6} md={3}><StatsCard title="Success Rate" value={stats.successRate} icon={CheckCircle} color="#28a745" bgColor="#d4edda" /></Grid>
//         </Grid>

//         <Paper sx={{ p: 4, borderRadius: 5, boxShadow: '0 15px 50px rgba(0,0,0,0.18)', mb: 6 }}>
//           <Typography variant="h5" fontWeight={800} mb={3}>
//             Visitor Trend ({filter === 'daily' ? 'Hourly' : filter === 'weekly' ? 'Daily' : 'Weekly'})
//           </Typography>
//           <Box sx={{ height: 400 }}>
//             <Line data={chartConfig} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
//           </Box>
//         </Paper>

//         <Paper sx={{ p: 4, borderRadius: 5, boxShadow: '0 15px 50px rgba(0,0,0,0.18)' }}>
//           <Typography variant="h5" fontWeight={800} mb={3}>Latest Visitors (Live)</Typography>
//           <Box sx={{ height: 520 }}>
//             <StyledDataGrid
//               rows={latestVisitors}
//               columns={[
//                 { field: 'id', headerName: 'No.', width: 80 },
//                 { field: 'fullName', headerName: 'Name', flex: 1 },
//                 { field: 'mobileNumber', headerName: 'Mobile', width: 140 },
//                 { field: 'policeStation', headerName: 'Station', width: 200 },
//                 { field: 'entryTime', headerName: 'Time', width: 120 },
//               ]}
//               pageSizeOptions={[10]}
//             />
//           </Box>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default Home;


// =======================================================

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab, Button
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { PeopleAlt, AssignmentTurnedIn, AccessTime, CheckCircle, CalendarToday } from '@mui/icons-material';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement,
//   LineElement, Title, Tooltip, Legend, Filler
// } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { motion } from 'framer-motion';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// const StyledDataGrid = styled(DataGrid)({
//   border: 'none',
//   borderRadius: '16px',
//   backgroundColor: 'white',
//   boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '4px solid #0040B9',
//     borderRadius: '16px 16px 0 0',
//     fontWeight: 700,
//   },
//   '& .MuiDataGrid-row:hover': {
//     backgroundColor: '#e3f2fd',
//     transform: 'translateY(-3px)',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   },
// });

// const AnimatedStatsCard = ({ title, value, icon: Icon, color, bgColor, delay }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 30, scale: 0.9 }}
//     animate={{ opacity: 1, y: 0, scale: 1 }}
//     transition={{ duration: 0.6, delay, type: 'spring', stiffness: 100 }}
//     whileHover={{ scale: 1.05, y: -10 }}
//   >
//     <Paper sx={{
//       p: 4, borderRadius: 5, background: 'white',
//       boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
//       borderLeft: `6px solid ${color}`,
//       transition: 'all 0.4s',
//       position: 'relative',
//       overflow: 'hidden',
//       '&:hover': {
//         boxShadow: '0 25px 60px rgba(0,0,0,0.22)',
//         '&::before': {
//           transform: 'translateX(100%)'
//         }
//       },
//       '&::before': {
//         content: '""',
//         position: 'absolute',
//         top: 0,
//         left: '-100%',
//         width: '100%',
//         height: '100%',
//         background: `linear-gradient(90deg, transparent, ${bgColor}, transparent)`,
//         transition: 'transform 0.6s',
//       }
//     }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: delay + 0.3, type: 'spring' }}
//           >
//             <Typography variant="h3" fontWeight="bold" color={color} mt={1}>
//               {title.includes('Rate') ? `${value}%` : value.toLocaleString()}
//             </Typography>
//           </motion.div>
//         </Box>
//         <motion.div
//           animate={{ rotate: [0, 10, -10, 0] }}
//           transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//         >
//           <Box sx={{
//             width: 70, height: 70, borderRadius: '50%',
//             bgcolor: bgColor, display: 'flex',
//             alignItems: 'center', justifyContent: 'center',
//             boxShadow: `0 8px 20px ${bgColor}`
//           }}>
//             <Icon sx={{ fontSize: 40, color }} />
//           </Box>
//         </motion.div>
//       </Box>
//     </Paper>
//   </motion.div>
// );

// const Home = () => {
//   const isMobile = window.innerWidth < 768;
//   const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

//   const [filter, setFilter] = useState('daily');
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, successRate: 0 });
//   const [chartData, setChartData] = useState({ labels: [], total: [], done: [] });
//   const [latestVisitors, setLatestVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchAllFromSingleAPI = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`);

//       if (res.data.success && res.data.data?.visitors) {
//         const visitors = res.data.data.visitors;
//         const now = new Date();
//         const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//         const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
//         const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

//         let filtered = visitors.filter(v => {
//           const entryDate = new Date(v.entryAt || v.createdAt);

//           if (startDate && endDate) {
//             const start = new Date(startDate); start.setHours(0, 0, 0, 0);
//             const end = new Date(endDate); end.setHours(23, 59, 59, 999);
//             return entryDate >= start && entryDate <= end;
//           }

//           if (filter === 'daily') return entryDate >= today;
//           if (filter === 'weekly') return entryDate >= weekAgo;
//           return entryDate >= monthAgo;
//         });

//         const total = filtered.length;
//         const completed = filtered.filter(v => v.feedbackGiven || v.entryDone).length;
//         const pending = total - completed;
//         const successRate = total > 0 ? Math.round((completed / total) * 100) : 0;

//         setStats({ total, completed, pending, successRate });

//         const hourlyData = {};
//         filtered.forEach(v => {
//           const date = new Date(v.entryAt || v.createdAt);
//           let key;

//           if (startDate && endDate) {
//             key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//           } else if (filter === 'daily') {
//             key = date.getHours() + ':00';
//           } else if (filter === 'weekly') {
//             key = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
//           } else {
//             key = `Week ${Math.ceil(date.getDate() / 7)}`;
//           }

//           hourlyData[key] = hourlyData[key] || { total: 0, done: 0 };
//           hourlyData[key].total++;
//           if (v.feedbackGiven || v.entryDone) hourlyData[key].done++;
//         });

//         const sortedKeys = Object.keys(hourlyData).sort((a, b) => {
//           if (filter === 'daily') return parseInt(a) - parseInt(b);
//           if (filter === 'weekly') return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(a) - ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(b);
//           return a.localeCompare(b);
//         });

//         setChartData({
//           labels: sortedKeys,
//           total: sortedKeys.map(k => hourlyData[k].total),
//           done: sortedKeys.map(k => hourlyData[k].done)
//         });

//         const latest = visitors.slice(0, 10).map((v, i) => ({
//           id: i + 1,
//           fullName: v.fullName,
//           mobileNumber: v.mobileNumber,
//           policeStation: v.policeStation || 'N/A',
//           entryTime: new Date(v.entryAt || v.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//         }));
//         setLatestVisitors(latest);
//       }
//     } catch (err) {
//       console.log("Using fallback data");
//     } finally {
//       setLoading(false);
//     }
//   }, [filter, startDate, endDate]);

//   useEffect(() => {
//     fetchAllFromSingleAPI();
//     const interval = setInterval(fetchAllFromSingleAPI, 10000);
//     return () => clearInterval(interval);
//   }, [fetchAllFromSingleAPI]);

//   const chartConfig = {
//     labels: chartData.labels.length ? chartData.labels : ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
//     datasets: [
//       {
//         label: 'Total Visitors',
//         data: chartData.total,
//         borderColor: '#0040B9',
//         backgroundColor: 'rgba(0,64,185,0.2)',
//         tension: 0.4,
//         fill: true,
//         borderWidth: 3,
//         pointRadius: 5,
//         pointHoverRadius: 8,
//         pointBackgroundColor: '#0040B9',
//         pointBorderColor: '#fff',
//         pointBorderWidth: 2
//       },
//       {
//         label: 'Entry Completed',
//         data: chartData.done,
//         borderColor: '#00A86B',
//         backgroundColor: 'rgba(0,168,107,0.2)',
//         tension: 0.4,
//         fill: true,
//         borderWidth: 3,
//         pointRadius: 5,
//         pointHoverRadius: 8,
//         pointBackgroundColor: '#00A86B',
//         pointBorderColor: '#fff',
//         pointBorderWidth: 2
//       }
//     ]
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           font: { size: 14, weight: 'bold' },
//           padding: 20,
//           usePointStyle: true
//         }
//       },
//       tooltip: {
//         backgroundColor: 'rgba(0,0,0,0.8)',
//         padding: 12,
//         titleFont: { size: 14, weight: 'bold' },
//         bodyFont: { size: 13 },
//         cornerRadius: 8
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: 'rgba(0,0,0,0.05)'
//         }
//       },
//       x: {
//         grid: {
//           display: false
//         }
//       }
//     }
//   };

//   const getMargin = () => isMobile ? 0 : isSidebarOpen ? '18%' : '8%';

//   const handleDateRangeChange = (dates) => {
//     setDateRange(dates);
//     if (dates[0] && dates[1]) {
//       setShowDatePicker(false);
//     }
//   };

//   const clearDateRange = () => {
//     setDateRange([null, null]);
//     setShowDatePicker(false);
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//         >
//           <CircularProgress size={80} sx={{ color: '#0040B9' }} />
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Live Dashboard...</Typography>
//         </motion.div>
//       </Box>
//     );
//   }

//   return (
//     <div style={{
//       marginLeft: getMargin(),
//       marginTop: '80px',
//       backgroundColor: '#f0f4f8',
//       minHeight: '100vh',
//       padding: '24px',
//       transition: 'all 0.3s ease'
//     }}>
//       <Container maxWidth={false}>
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.7 }}
//         >
//           <Typography variant="h3" fontWeight={900} color="#0d2136" mb={2} mt={5}>
//             Thane Rural Police
//           </Typography>
//           <Typography variant="h6" color="primary" mb={4}>
//             Real-time Visitor Management System
//           </Typography>
//         </motion.div>

//         <Box display="flex" justifyContent="center" alignItems="center" gap={3} mb={5}>
//           <Tabs value={filter} onChange={(_, v) => { setFilter(v); setDateRange([null, null]); }} centered>
//             <Tab label="Today" value="daily" />
//             <Tab label="This Week" value="weekly" />
//             <Tab label="This Month" value="monthly" />
//           </Tabs>

//           <Button
//             variant={showDatePicker || (startDate && endDate) ? "contained" : "outlined"}
//             startIcon={<CalendarToday />}
//             onClick={() => setShowDatePicker(!showDatePicker)}
//             sx={{
//               borderRadius: 3,
//               px: 3,
//               fontWeight: 'bold',
//               boxShadow: showDatePicker ? '0 8px 20px rgba(0,64,185,0.3)' : 'none',
//               transition: 'all 0.3s'
//             }}
//           >
//             {startDate && endDate
//               ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
//               : 'Date Range'}
//           </Button>
//         </Box>

//         {showDatePicker && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Box display="flex" justifyContent="center" mb={4}>
//               <Paper sx={{ p: 3, borderRadius: 4, boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}>
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={handleDateRangeChange}
//                   inline
//                   maxDate={new Date()}
//                 />
//                 <Box display="flex" gap={2} mt={2}>
//                   <Button
//                     variant="contained"
//                     fullWidth
//                     onClick={() => setShowDatePicker(false)}
//                     sx={{ borderRadius: 2 }}
//                   >
//                     Apply
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     fullWidth
//                     onClick={clearDateRange}
//                     sx={{ borderRadius: 2 }}
//                   >
//                     Clear
//                   </Button>
//                 </Box>
//               </Paper>
//             </Box>
//           </motion.div>
//         )}

//         <Grid container spacing={4} mb={6}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visitors" value={stats.total} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" delay={0} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Entry Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" delay={0.1} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Pending" value={stats.pending} icon={AccessTime} color="#DC3545" bgColor="#fce7e7" delay={0.2} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Success Rate" value={stats.successRate} icon={CheckCircle} color="#28a745" bgColor="#d4edda" delay={0.3} />
//           </Grid>
//         </Grid>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//         >
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: '0 15px 50px rgba(0,0,0,0.18)', mb: 6 }}>
//             <Typography variant="h5" fontWeight={800} mb={3}>
//               Visitor Trend {startDate && endDate ? '(Custom Range)' : `(${filter === 'daily' ? 'Hourly' : filter === 'weekly' ? 'Daily' : 'Weekly'})`}
//             </Typography>
//             <Box sx={{ height: 400 }}>
//               <Line data={chartConfig} options={chartOptions} />
//             </Box>
//           </Paper>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//         >
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: '0 15px 50px rgba(0,0,0,0.18)' }}>
//             <Typography variant="h5" fontWeight={800} mb={3}>Latest Visitors (Live)</Typography>
//             <Box sx={{ height: 520 }}>
//               <StyledDataGrid
//                 rows={latestVisitors}
//                 columns={[
//                   { field: 'id', headerName: 'No.', width: 80 },
//                   { field: 'fullName', headerName: 'Name', flex: 1 },
//                   { field: 'mobileNumber', headerName: 'Mobile', width: 140 },
//                   { field: 'policeStation', headerName: 'Station', width: 200 },
//                   { field: 'entryTime', headerName: 'Time', width: 120 },
//                 ]}
//                 pageSizeOptions={[10]}
//               />
//             </Box>
//           </Paper>
//         </motion.div>
//       </Container>
//     </div>
//   );
// };

// export default Home;


// =============================================================================


// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab, Button
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { PeopleAlt, AssignmentTurnedIn, AccessTime, CheckCircle, CalendarToday } from '@mui/icons-material';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement,
//   LineElement, Title, Tooltip, Legend, Filler
// } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { motion } from 'framer-motion';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// const StyledDataGrid = styled(DataGrid)({
//   border: 'none',
//   borderRadius: '16px',
//   backgroundColor: 'white',
//   boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '4px solid #0040B9',
//     borderRadius: '16px 16px 0 0',
//     fontWeight: 700,
//   },
//   '& .MuiDataGrid-row:hover': {
//     backgroundColor: '#e3f2fd',
//     transform: 'translateY(-3px)',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   },
// });

// const AnimatedStatsCard = ({ title, value, icon: Icon, color, bgColor, delay }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 30, scale: 0.9 }}
//     animate={{ opacity: 1, y: 0, scale: 1 }}
//     transition={{ duration: 0.6, delay, type: 'spring', stiffness: 100 }}
//     whileHover={{ scale: 1.05, y: -10 }}
//   >
//     <Paper sx={{
//       p: 4, borderRadius: 5, background: 'white',
//       boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
//       borderLeft: `6px solid ${color}`,
//       transition: 'all 0.4s',
//       position: 'relative',
//       overflow: 'hidden',
//       '&:hover': {
//         boxShadow: '0 25px 60px rgba(0,0,0,0.22)',
//         '&::before': {
//           transform: 'translateX(100%)'
//         }
//       },
//       '&::before': {
//         content: '""',
//         position: 'absolute',
//         top: 0,
//         left: '-100%',
//         width: '100%',
//         height: '100%',
//         background: `linear-gradient(90deg, transparent, ${bgColor}, transparent)`,
//         transition: 'transform 0.6s',
//       }
//     }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: delay + 0.3, type: 'spring' }}
//           >
//             <Typography variant="h3" fontWeight="bold" color={color} mt={1}>
//               {title.includes('Rate') ? `${value}%` : value.toLocaleString()}
//             </Typography>
//           </motion.div>
//         </Box>
//         <motion.div
//           animate={{ rotate: [0, 10, -10, 0] }}
//           transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//         >
//           <Box sx={{
//             width: 70, height: 70, borderRadius: '50%',
//             bgcolor: bgColor, display: 'flex',
//             alignItems: 'center', justifyContent: 'center',
//             boxShadow: `0 8px 20px ${bgColor}`
//           }}>
//             <Icon sx={{ fontSize: 40, color }} />
//           </Box>
//         </motion.div>
//       </Box>
//     </Paper>
//   </motion.div>
// );

// const Home = () => {
//   const isMobile = window.innerWidth < 768;
//   const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

//   const [filter, setFilter] = useState('daily');
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, successRate: 0 });
//   const [chartData, setChartData] = useState({ labels: [], total: [], done: [] });
//   const [latestVisitors, setLatestVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchAllFromSingleAPI = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`);

//       if (res.data.success && res.data.data?.visitors) {
//         const visitors = res.data.data.visitors;
//         const now = new Date();
//         const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//         const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
//         const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

//         let filtered = [];

//         if (startDate && endDate) {
//           filtered = visitors.filter(v => {
//             if (!v.visits || v.visits.length === 0) return false;

//             const start = new Date(startDate);
//             start.setHours(0, 0, 0, 0);
//             const end = new Date(endDate);
//             end.setHours(23, 59, 59, 999);

//             const hasVisitInRange = v.visits.some(visit => {
//               const entryDate = new Date(visit.entryAt);
//               return entryDate >= start && entryDate <= end;
//             });

//             return hasVisitInRange;
//           });
//         } else {
//           filtered = visitors.filter(v => {
//             if (!v.visits || v.visits.length === 0) return false;

//             const latestVisit = v.visits[v.visits.length - 1];
//             const entryDate = new Date(latestVisit.entryAt || v.createdAt);

//             if (filter === 'daily') return entryDate >= today;
//             if (filter === 'weekly') return entryDate >= weekAgo;
//             return entryDate >= monthAgo;
//           });
//         }

//         const total = filtered.length;
//         const completed = filtered.filter(v => {
//           if (!v.visits || v.visits.length === 0) return false;
//           const latestVisit = v.visits[v.visits.length - 1];
//           return latestVisit.feedbackGiven || false;
//         }).length;
//         const pending = total - completed;
//         const successRate = total > 0 ? Math.round((completed / total) * 100) : 0;

//         setStats({ total, completed, pending, successRate });

//         const hourlyData = {};
//         filtered.forEach(v => {
//           if (!v.visits || v.visits.length === 0) return;

//           const latestVisit = v.visits[v.visits.length - 1];
//           const date = new Date(latestVisit.entryAt || v.createdAt);
//           let key;

//           if (startDate && endDate) {
//             key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//           } else if (filter === 'daily') {
//             key = date.getHours() + ':00';
//           } else if (filter === 'weekly') {
//             key = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
//           } else {
//             key = `Week ${Math.ceil(date.getDate() / 7)}`;
//           }

//           hourlyData[key] = hourlyData[key] || { total: 0, done: 0 };
//           hourlyData[key].total++;
//           if (latestVisit.feedbackGiven) hourlyData[key].done++;
//         });

//         const sortedKeys = Object.keys(hourlyData).sort((a, b) => {
//           if (filter === 'daily') return parseInt(a) - parseInt(b);
//           if (filter === 'weekly') return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(a) - ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(b);
//           return a.localeCompare(b);
//         });

//         setChartData({
//           labels: sortedKeys,
//           total: sortedKeys.map(k => hourlyData[k].total),
//           done: sortedKeys.map(k => hourlyData[k].done)
//         });

//         const latest = filtered.slice(0, 10).map((v, i) => {
//           if (!v.visits || v.visits.length === 0) return null;
//           const latestVisit = v.visits[v.visits.length - 1];
//           return {
//             id: i + 1,
//             fullName: v.fullName,
//             mobileNumber: v.mobileNumber,
//             policeStation: v.policeStation || 'N/A',
//             addedByRole: v.addedByRole || 'N/A',
//               officeName: v.officeName || 'N/A',
//                 officeType: v.officeType || 'N/A',
//                 addedByEmail: v.addedByEmail || 'N/A',


         
//             entryTime: new Date(latestVisit.entryAt || v.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//           };
//         }).filter(Boolean);

//         setLatestVisitors(latest);
//       }
//     } catch (err) {
//       console.log("Using fallback data");
//     } finally {
//       setLoading(false);
//     }
//   }, [filter, startDate, endDate]);

//   useEffect(() => {
//     fetchAllFromSingleAPI();
//     const interval = setInterval(fetchAllFromSingleAPI, 10000);
//     return () => clearInterval(interval);
//   }, [fetchAllFromSingleAPI]);

//   const chartConfig = {
//     labels: chartData.labels.length ? chartData.labels : ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
//     datasets: [
//       {
//         label: 'Total Visitors',
//         data: chartData.total,
//         borderColor: '#0040B9',
//         backgroundColor: 'rgba(0,64,185,0.2)',
//         tension: 0.4,
//         fill: true,
//         borderWidth: 3,
//         pointRadius: 5,
//         pointHoverRadius: 8,
//         pointBackgroundColor: '#0040B9',
//         pointBorderColor: '#fff',
//         pointBorderWidth: 2
//       },
//       {
//         label: 'Entry Completed',
//         data: chartData.done,
//         borderColor: '#00A86B',
//         backgroundColor: 'rgba(0,168,107,0.2)',
//         tension: 0.4,
//         fill: true,
//         borderWidth: 3,
//         pointRadius: 5,
//         pointHoverRadius: 8,
//         pointBackgroundColor: '#00A86B',
//         pointBorderColor: '#fff',
//         pointBorderWidth: 2
//       }
//     ]
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           font: { size: 14, weight: 'bold' },
//           padding: 20,
//           usePointStyle: true
//         }
//       },
//       tooltip: {
//         backgroundColor: 'rgba(0,0,0,0.8)',
//         padding: 12,
//         titleFont: { size: 14, weight: 'bold' },
//         bodyFont: { size: 13 },
//         cornerRadius: 8
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: 'rgba(0,0,0,0.05)'
//         }
//       },
//       x: {
//         grid: {
//           display: false
//         }
//       }
//     }
//   };

//   const getMargin = () => isMobile ? 0 : isSidebarOpen ? '12%' : '2%';

//   const handleDateRangeChange = (dates) => {
//     setDateRange(dates);
//     if (dates[0] && dates[1]) {
//       setShowDatePicker(false);
//     }
//   };

//   const clearDateRange = () => {
//     setDateRange([null, null]);
//     setShowDatePicker(false);
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//         >
//           <CircularProgress size={80} sx={{ color: '#0040B9' }} />
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Live Dashboard...</Typography>
//         </motion.div>
//       </Box>
//     );
//   }

//   return (
//     <div style={{
//       marginLeft: getMargin(),
//       marginTop: '80px',
//       backgroundColor: '#f0f4f8',
//       minHeight: '100vh',
//       padding: '24px',
//       transition: 'all 0.3s ease'
//     }}>
//       <Container maxWidth={false}>
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.7 }}
//         >
//           <Typography variant="h3" fontWeight={900} color="#0d2136" mb={2} mt={5}>
//             Thane Rural Police
//           </Typography>
//           <Typography variant="h6" color="primary" mb={4}>
//             Real-time Visitor Management System
//           </Typography>
//         </motion.div>

//         <Box display="flex" justifyContent="center" alignItems="center" gap={3} mb={5}>
//           <Tabs value={filter} onChange={(_, v) => { setFilter(v); setDateRange([null, null]); }} centered>
//             <Tab label="Today" value="daily" />
//             <Tab label="This Week" value="weekly" />
//             <Tab label="This Month" value="monthly" />
//           </Tabs>

//           <Button
//             variant={showDatePicker || (startDate && endDate) ? "contained" : "outlined"}
//             startIcon={<CalendarToday />}
//             onClick={() => setShowDatePicker(!showDatePicker)}
//             sx={{
//               borderRadius: 3,
//               px: 3,
//               fontWeight: 'bold',
//               boxShadow: showDatePicker ? '0 8px 20px rgba(0,64,185,0.3)' : 'none',
//               transition: 'all 0.3s'
//             }}
//           >
//             {startDate && endDate
//               ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
//               : 'Date Range'}
//           </Button>
//         </Box>

//         {showDatePicker && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Box display="flex" justifyContent="center" mb={4}>
//               <Paper sx={{ p: 3, borderRadius: 4, boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}>
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={handleDateRangeChange}
//                   inline
//                   maxDate={new Date()}
//                 />
//                 <Box display="flex" gap={2} mt={2}>
//                   <Button
//                     variant="contained"
//                     fullWidth
//                     onClick={() => setShowDatePicker(false)}
//                     sx={{ borderRadius: 2 }}
//                   >
//                     Apply
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     fullWidth
//                     onClick={clearDateRange}
//                     sx={{ borderRadius: 2 }}
//                   >
//                     Clear
//                   </Button>
//                 </Box>
//               </Paper>
//             </Box>
//           </motion.div>
//         )}

//         <Grid container spacing={4} mb={6}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visitors" value={stats.total} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" delay={0} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Entry Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" delay={0.1} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Pending" value={stats.pending} icon={AccessTime} color="#DC3545" bgColor="#fce7e7" delay={0.2} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Success Rate" value={stats.successRate} icon={CheckCircle} color="#28a745" bgColor="#d4edda" delay={0.3} />
//           </Grid>
//         </Grid>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//         >
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: '0 15px 50px rgba(0,0,0,0.18)', mb: 6 }}>
//             <Typography variant="h5" fontWeight={800} mb={3}>
//               Visitor Trend {startDate && endDate ? '(Custom Range)' : `(${filter === 'daily' ? 'Hourly' : filter === 'weekly' ? 'Daily' : 'Weekly'})`}
//             </Typography>
//             <Box sx={{ height: 400 }}>
//               <Line data={chartConfig} options={chartOptions} />
//             </Box>
//           </Paper>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//         >
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: '0 15px 50px rgba(0,0,0,0.18)' }}>
//             <Typography variant="h5" fontWeight={800} mb={3}>
//               Latest Visitors (Live) {startDate && endDate && `(${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()})`}
//             </Typography>
//             <Box sx={{ height: 520 }}>
//               <StyledDataGrid
//                 rows={latestVisitors}
//                 columns={[
//                   { field: 'id', headerName: 'No.', width: 80 },
//                   { field: 'fullName', headerName: 'Name', flex: 1 },
//                   { field: 'mobileNumber', headerName: 'Mobile', width: 140 },
//                   { field: 'policeStation', headerName: 'Station', width: 200 },
//                    { field: 'addedByRole', headerName: 'addedByRole', width: 120 },
//                     { field: 'officeName', headerName: 'officeName', width: 120 },
//                      { field: 'officeType', headerName: 'officeType', width: 120 },
//                       { field: 'addedByEmail', headerName: 'addedByEmail', width: 120 },
//                   { field: 'entryTime', headerName: 'Time', width: 120 },
//                 ]}
//                 pageSizeOptions={[10]}
//               />
//             </Box>
//           </Paper>
//         </motion.div>
//       </Container>
//     </div>
//   );
// };

// export default Home;


// ===========================================================

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab, Button, Chip
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import {
//   PeopleAlt, AssignmentTurnedIn, AccessTime, CheckCircle,DoNotDisturbOnTotalSilenceOutlined,Summarize,SummarizeOutlined,
//   CalendarToday, LocationOn, Business
// } from '@mui/icons-material';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement,
//   LineElement, Title, Tooltip, Legend, Filler
// } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { motion } from 'framer-motion';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// const StyledDataGrid = styled(DataGrid)({
//   border: 'none',
//   borderRadius: '16px',
//   backgroundColor: 'white',
//   boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '4px solid #0040B9',
//     borderRadius: '16px 16px 0 0',
//     fontWeight: 700,
//   },
//   '& .MuiDataGrid-row:hover': {
//     backgroundColor: '#e3f2fd',
//     transform: 'translateY(-3px)',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   },
// });

// const AnimatedStatsCard = ({ title, value, icon: Icon, color, bgColor, delay }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 30, scale: 0.9 }}
//     animate={{ opacity: 1, y: 0, scale: 1 }}
//     transition={{ duration: 0.6, delay, type: 'spring', stiffness: 100 }}
//     whileHover={{ scale: 1.05, y: -10 }}
//   >
//     <Paper sx={{
//       p: 4, borderRadius: 5, background: 'white',
//       boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
//       borderLeft: `6px solid ${color}`,
//       transition: 'all 0.4s',
//       position: 'relative',
//       overflow: 'hidden',
//       '&:hover': {
//         boxShadow: '0 25px 60px rgba(0,0,0,0.22)',
//       }
//     }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
//           <Typography variant="h3" fontWeight="bold" color={color} mt={1}>
//             {title.includes('Rate') ? `${value}%` : value.toLocaleString()}
//           </Typography>
//         </Box>
//         <Box sx={{
//           width: 70, height: 70, borderRadius: '50%',
//           bgcolor: bgColor, display: 'flex',
//           alignItems: 'center', justifyContent: 'center',
//           boxShadow: `0 8px 20px ${bgColor}`
//         }}>
//           <Icon sx={{ fontSize: 40, color }} />
//         </Box>
//       </Box>
//     </Paper>
//   </motion.div>
// );

// const Home = () => {
//   const { officeid } = useParams(); // अगर /subofficedashboard/:officeid हो तो यहाँ मिलेगा
//   const isMobile = window.innerWidth < 768;
//   const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

//   const [filter, setFilter] = useState('daily');
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, successRate: 0,
//  totalVisitors: 0,     // कितने अलग-अलग लोग आए
//     totalVisits: 0,       // कुल कितनी बार visits हुईं (main thing!)


//    });
//   const [chartData, setChartData] = useState({ labels: [], total: [], done: [] });
//   const [latestVisitors, setLatestVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [suboffice, setSuboffice] = useState(null);

//   // Fetch Suboffice Info when officeid present
//   useEffect(() => {
//     if (officeid) {
//       axios.get(`${baseUrl}/getSubOfficesBySubofficeId/${officeid}`)
//         .then(res => {
//           if (res.data.success) setSuboffice(res.data.suboffice);
//         })
//         .catch(err => console.log("Suboffice fetch failed", err));
//     }
//   }, [officeid]);

//   const fetchVisitors = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`);
//       if (!res.data.success || !res.data.data?.visitors) {
//         setLoading(false);
//         return;
//       }

//       let visitors = res.data.data.visitors;

//       // Filter by Suboffice if officeid exists
//       if (officeid && suboffice) {
//         visitors = visitors.filter(v =>
//           v.officeName === suboffice.subofficeName ||
//           (v.addedByEmail && v.addedByEmail.includes(suboffice.email?.split('@')[0]))
//         );
//       }

//       const now = new Date();
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//       const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
//       const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

//       let filtered = [];

//       if (startDate && endDate) {
//         filtered = visitors.filter(v => {
//           if (!v.visits?.length) return false;
//           const s = new Date(startDate); s.setHours(0,0,0,0);
//           const e = new Date(endDate); e.setHours(23,59,59,999);
//           return v.visits.some(visit => new Date(visit.entryAt) >= s && new Date(visit.entryAt) <= e);
//         });
//       } else {
//         filtered = visitors.filter(v => {
//           if (!v.visits?.length) return false;
//           const d = new Date(v.visits[v.visits.length - 1].entryAt);
//           if (filter === 'daily') return d >= today;
//           if (filter === 'weekly') return d >= weekAgo;
//           return d >= monthAgo;
//         });
//       }

//       // Stats
//       const total = filtered.length;
//       const completed = filtered.filter(v => v.visits[v.visits.length - 1].feedbackGiven).length;
//       const pending = total - completed;
//       const successRate = total > 0 ? Math.round((completed / total) * 100) : 0;
//       setStats({ total, completed, pending, successRate});

//       // Chart Data
//       const hourlyData = {};
//       filtered.forEach(v => {
//         const d = new Date(v.visits[v.visits.length - 1].entryAt);
//         let key = filter === 'daily'
//           ? `${d.getHours()}:00`
//           : filter === 'weekly'
//             ? ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]
//             : `Week ${Math.ceil(d.getDate()/7)}`;

//         if (startDate && endDate) {
//           key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//         }

//         hourlyData[key] = hourlyData[key] || { total: 0, done: 0 };
//         hourlyData[key].total++;
//         if (v.visits[v.visits.length - 1].feedbackGiven) hourlyData[key].done++;
//       });

//       const labels = Object.keys(hourlyData).sort((a,b) => {
//         if (filter === 'daily') return parseInt(a) - parseInt(b);
//         if (filter === 'weekly') return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(a) - ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(b);
//         return a.localeCompare(b);
//       });

//       setChartData({
//         labels: labels.length ? labels : ['No Data'],
//         total: labels.map(k => hourlyData[k]?.total || 0),
//         done: labels.map(k => hourlyData[k]?.done || 0)
//       });

//       // Latest Visitors Table
//       const latest = filtered.slice(0, 10).map((v, i) => ({
//         id: i + 1,
//         fullName: v.fullName,
//         mobileNumber: v.mobileNumber,
//         policeStation: v.policeStation || 'N/A',
//         officeName: v.officeName || 'N/A',
//         entryTime: new Date(v.visits[v.visits.length - 1].entryAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//       }));
//       setLatestVisitors(latest);

//     } catch (err) {
//       console.error("Fetch visitors error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filter, startDate, endDate, officeid, suboffice]);

//   useEffect(() => {
//     fetchVisitors();
//     const interval = setInterval(fetchVisitors, 10000); // Live update every 10 sec
//     return () => clearInterval(interval);
//   }, [fetchVisitors]);

//   const chartConfig = {
//     labels: chartData.labels,
//     datasets: [
//       {
//         label: 'Total Visitors',
//         data: chartData.total,
//         borderColor: '#0040B9',
//         backgroundColor: 'rgba(0,64,185,0.2)',
//         tension: 0.4,
//         fill: true,
//         borderWidth: 3
//       },
//       {
//         label: 'Completed',
//         data: chartData.done,
//         borderColor: '#00A86B',
//         backgroundColor: 'rgba(0,168,107,0.2)',
//         tension: 0.4,
//         fill: true,
//         borderWidth: 3
//       }
//     ]
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: { legend: { position: 'top' } },
//     scales: { y: { beginAtZero: true } }
//   };

//   const getMargin = () => isMobile ? 0 : isSidebarOpen ? '12%' : '2%';

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
//         <CircularProgress size={80} sx={{ color: '#0040B9' }} />
//         <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Dashboard...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <div style={{
//       marginLeft: getMargin(),
//       marginTop: '80px',
//       backgroundColor: '#f0f4f8',
//       minHeight: '100vh',
//       padding: '24px',
//       transition: 'all 0.3s ease'
//     }}>
//       <Container maxWidth={false}>

//         {/* Dynamic Header */}
//         {suboffice ? (
//           <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
//             <Typography variant="h3" fontWeight={900} color="#0d2136" mb={1}>
//               {suboffice.subofficeName}
//             </Typography>
//             <Box display="flex" alignItems="center" gap={2} mb={3}>
//               <Chip icon={<Business />} label={suboffice.officeType || "Sub Office"} color="primary" />
//               <Chip icon={<LocationOn />} label={suboffice.address?.split(',')[0]} color="secondary" variant="outlined" />
//             </Box>
//             <Typography variant="h6" color="primary" mb={4}>
//               {suboffice.headOfficeId?.officeName || "Thane Rural Police"} • Live Visitor Dashboard
//             </Typography>
//           </motion.div>
//         ) : (
//           <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
//             <Typography variant="h3" fontWeight={900} color="#0d2136" mb={4}>
//               Thane Rural Police - Central Dashboard
//             </Typography>
//           </motion.div>
//         )}

//         {/* Tabs + Date Picker */}
//         <Box display="flex" justifyContent="center" alignItems="center" gap={3} mb={5}>
//           <Tabs value={filter} onChange={(_, v) => { setFilter(v); setDateRange([null, null]); }} centered>
//             <Tab label="Today" value="daily" />
//             <Tab label="This Week" value="weekly" />
//             <Tab label="This Month" value="monthly" />
//           </Tabs>

//           <Button
//             variant={showDatePicker || (startDate && endDate) ? "contained" : "outlined"}
//             startIcon={<CalendarToday />}
//             onClick={() => setShowDatePicker(!showDatePicker)}
//           >
//             {startDate && endDate
//               ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
//               : 'Date Range'}
//           </Button>
//         </Box>

//         {showDatePicker && (
//           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//             <Box display="flex" justifyContent="center" mb={4}>
//               <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={(dates) => {
//                     setDateRange(dates);
//                     if (dates[0] && dates[1]) setShowDatePicker(false);
//                   }}
//                   inline
//                   maxDate={new Date()}
//                 />
//                 <Button variant="outlined" fullWidth onClick={() => { setDateRange([null,null]); setShowDatePicker(false); }} sx={{ mt: 2 }}>
//                   Clear
//                 </Button>
//               </Paper>
//             </Box>
//           </motion.div>
//         )}

//         {/* Stats Cards */}
//         <Grid container spacing={4} mb={6}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visitors" value={stats.total} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" delay={0} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" delay={0.1} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Pending" value={stats.pending} icon={AccessTime} color="#DC3545" bgColor="#fce7e7" delay={0.2} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visits" value={stats.successRate} icon={SummarizeOutlined} color="#28a745" bgColor="#d4edda" delay={0.3} />
//           </Grid>
//         </Grid>

//         {/* Chart */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Typography variant="h5" fontWeight={800} mb={3}>
//               Visitor Trend {startDate && endDate ? '(Custom Range)' : `(${filter === 'daily' ? 'Hourly' : 'Daily/Weekly'})`}
//             </Typography>
//             <Box sx={{ height: 400 }}>
//               <Line data={chartConfig} options={chartOptions} />
//             </Box>
//           </Paper>
//         </motion.div>

//         {/* Latest Visitors Table */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5 }}>
//             <Typography variant="h5" fontWeight={800} mb={3}>
//               Latest Visitors (Live)
//             </Typography>
//             <Box sx={{ height: 520 }}>
//               <StyledDataGrid
//                 rows={latestVisitors}
//                 columns={[
//                   { field: 'id', headerName: 'No.', width: 80 },
//                   { field: 'fullName', headerName: 'Name', flex: 1 },
//                   { field: 'mobileNumber', headerName: 'Mobile', width: 140 },
//                   { field: 'policeStation', headerName: 'Station', width: 200 },
//                   { field: 'officeName', headerName: 'Office', width: 180 },
//                   { field: 'entryTime', headerName: 'Time', width: 120 },
//                 ]}
//                 pageSizeOptions={[10]}
//                 disableSelectionOnClick
//               />
//             </Box>
//           </Paper>
//         </motion.div>

//       </Container>
//     </div>
//   );
// };

// export default Home;

// ==============================================================

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab, Button, Chip
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import {
//   PeopleAlt, AssignmentTurnedIn, AccessTime, CheckCircle,
//   CalendarToday, LocationOn, Business, SummarizeOutlined
// } from '@mui/icons-material';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement,
//   LineElement, Title, Tooltip, Legend, Filler
// } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { motion } from 'framer-motion';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// const StyledDataGrid = styled(DataGrid)({
//   border: 'none',
//   borderRadius: '16px',
//   backgroundColor: 'white',
//   boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '4px solid #0040B9',
//     borderRadius: '16px 16px 0 0',
//     fontWeight: 700,
//   },
//   '& .MuiDataGrid-row:hover': {
//     backgroundColor: '#e3f2fd',
//     transform: 'translateY(-3px)',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   },
// });

// const AnimatedStatsCard = ({ title, value, icon: Icon, color, bgColor, delay }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 30, scale: 0.9 }}
//     animate={{ opacity: 1, y: 0, scale: 1 }}
//     transition={{ duration: 0.6, delay, type: 'spring', stiffness: 100 }}
//     whileHover={{ scale: 1.05, y: -10 }}
//   >
//     <Paper sx={{
//       p: 4, borderRadius: 5, background: 'white',
//       boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
//       borderLeft: `6px solid ${color}`,
//       transition: 'all 0.4s',
//       position: 'relative',
//       overflow: 'hidden',
//       '&:hover': {
//         boxShadow: '0 25px 60px rgba(0,0,0,0.22)',
//       }
//     }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
//           <Typography variant="h3" fontWeight="bold" color={color} mt={1}>
//             {title.includes('Rate') ? `${value}%` : value.toLocaleString()}
//           </Typography>
//         </Box>
//         <Box sx={{
//           width: 70, height: 70, borderRadius: '50%',
//           bgcolor: bgColor, display: 'flex',
//           alignItems: 'center', justifyContent: 'center',
//           boxShadow: `0 8px 20px ${bgColor}`
//         }}>
//           <Icon sx={{ fontSize: 40, color }} />
//         </Box>
//       </Box>
//     </Paper>
//   </motion.div>
// );

// const Home = () => {
//   const { officeid } = useParams();
//   const isMobile = window.innerWidth < 768;
//   const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

//   const [filter, setFilter] = useState('daily');
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   // सही stats structure
//   const [stats, setStats] = useState({
//     totalVisitors: 0,     // कितने अलग लोग आए
//     totalVisits: 0,       // कुल कितनी बार visits हुईं
//     completed: 0,
//     pending: 0,
//     successRate: 0
//   });

//   const [chartData, setChartData] = useState({ labels: [], total: [], done: [] });
//   const [latestVisitors, setLatestVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [suboffice, setSuboffice] = useState(null);

//   // Fetch Suboffice info
//   useEffect(() => {
//     if (officeid) {
//       axios.get(`${baseUrl}/getSubOfficesBySubofficeId/${officeid}`)
//         .then(res => {
//           if (res.data.success) setSuboffice(res.data.suboffice);
//         })
//         .catch(() => {});
//     }
//   }, [officeid]);

//   const fetchVisitors = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`);
//       if (!res.data.success || !res.data.data?.visitors) {
//         setLoading(false);
//         return;
//       }

//       let visitors = res.data.data.visitors;

//       // Suboffice filter
//       if (officeid && suboffice) {
//         visitors = visitors.filter(v =>
//           v.officeName === suboffice.subofficeName ||
//           (v.addedByEmail && v.addedByEmail.includes(suboffice.email?.split('@')[0]))
//         );
//       }

//       const now = new Date();
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//       const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
//       const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

//       let filtered = [];

//       if (startDate && endDate) {
//         filtered = visitors.filter(v => {
//           if (!v.visits?.length) return false;
//           const s = new Date(startDate); s.setHours(0,0,0,0);
//           const e = new Date(endDate); e.setHours(23,59,59,999);
//           return v.visits.some(visit => new Date(visit.entryAt) >= s && new Date(visit.entryAt) <= e);
//         });
//       } else {
//         filtered = visitors.filter(v => {
//           if (!v.visits?.length) return false;
//           const lastVisitDate = new Date(v.visits[v.visits.length - 1].entryAt);
//           if (filter === 'daily') return lastVisitDate >= today;
//           if (filter === 'weekly') return lastVisitDate >= weekAgo;
//           return lastVisitDate >= monthAgo;
//         });
//       }

//       // सही calculation यहाँ है!
//       const totalVisitorsCount = filtered.length;

//       const totalVisitsCount = filtered.reduce((sum, visitor) => {
//         return sum + (visitor.visits?.length || 0);
//       }, 0);

//       const completedCount = filtered.filter(v =>
//         v.visits?.length > 0 && v.visits[v.visits.length - 1].feedbackGiven
//       ).length;

//       const pendingCount = totalVisitorsCount - completedCount;
//       const successRate = totalVisitorsCount > 0 ? Math.round((completedCount / totalVisitorsCount) * 100) : 0;

//       setStats({
//         totalVisitors: totalVisitorsCount,
//         totalVisits: totalVisitsCount,
//         completed: completedCount,
//         pending: pendingCount,
//         successRate
//       });

//       // Chart Data (हर visit count करो)
//       const hourlyData = {};
//       filtered.forEach(visitor => {
//         visitor.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999)
//             : filter === 'daily' ? d >= today
//             : filter === 'weekly' ? d >= weekAgo
//             : d >= monthAgo;

//           if (!inRange) return;

//           let key = filter === 'daily'
//             ? `${d.getHours()}:00`
//             : filter === 'weekly'
//               ? ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]
//               : `Week ${Math.ceil(d.getDate()/7)}`;

//           if (startDate && endDate) {
//             key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//           }

//           hourlyData[key] = hourlyData[key] || { total: 0, done: 0 };
//           hourlyData[key].total++;
//           if (visit.feedbackGiven) hourlyData[key].done++;
//         });
//       });

//       const labels = Object.keys(hourlyData).sort((a,b) => {
//         if (filter === 'daily') return parseInt(a) - parseInt(b);
//         if (filter === 'weekly') return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(a) - ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(b);
//         return a.localeCompare(b);
//       });

//       setChartData({
//         labels: labels.length ? labels : ['No Data'],
//         total: labels.map(k => hourlyData[k]?.total || 0),
//         done: labels.map(k => hourlyData[k]?.done || 0)
//       });

//       // Latest 10 visits
//       const allVisits = [];
//       filtered.forEach(v => {
//         v.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate) && d <= new Date(endDate)
//             : filter === 'daily' ? d >= today : filter === 'weekly' ? d >= weekAgo : d >= monthAgo;
//           if (inRange) {
//             allVisits.push({ ...visit, fullName: v.fullName, mobileNumber: v.mobileNumber, officeName: v.officeName || 'N/A' });
//           }
//         });
//       });

//       const latest10 = allVisits
//         .sort((a,b) => new Date(b.entryAt) - new Date(a.entryAt))
//         .slice(0, 10)
//         .map((v, i) => ({
//           id: i + 1,
//           fullName: v.fullName,
//           mobileNumber: v.mobileNumber,
//           policeStation: v.contactPerson || 'N/A',
//           officeName: v.officeName,
//           entryTime: new Date(v.entryAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//         }));

//       setLatestVisitors(latest10);

//     } catch (err) {
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filter, startDate, endDate, officeid, suboffice]);

//   useEffect(() => {
//     fetchVisitors();
//     const interval = setInterval(fetchVisitors, 10000);
//     return () => clearInterval(interval);
//   }, [fetchVisitors]);

//   const chartConfig = {
//     labels: chartData.labels,
//     datasets: [
//       { label: 'Total Visits', data: chartData.total, borderColor: '#0040B9', backgroundColor: 'rgba(0,64,185,0.2)', tension: 0.4, fill: true },
//       { label: 'Completed', data: chartData.done, borderColor: '#00A86B', backgroundColor: 'rgba(0,168,107,0.2)', tension: 0.4, fill: true }
//     ]
//   };

//   const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } };

//   const getMargin = () => isMobile ? 0 : isSidebarOpen ? '12%' : '2%';

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
//         <CircularProgress size={80} sx={{ color: '#0040B9' }} />
//         <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Live Dashboard...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <div style={{ marginLeft: getMargin(), marginTop: '80px', backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '24px' }}>
//       <Container maxWidth={false}>

//         {/* Header */}
//         {suboffice ? (
//           <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
//             <Typography variant="h3" fontWeight={900} color="#0d2136" mb={1}>
//               {suboffice.subofficeName}
//             </Typography>
//             <Box display="flex" gap={2} mb={3}>
//               <Chip icon={<Business />} label={suboffice.officeType || "Sub Office"} color="primary" />
//               <Chip icon={<LocationOn />} label={suboffice.address?.split(',')[0]} color="secondary" variant="outlined" />
//             </Box>
//             <Typography variant="h6" color="primary" mb={4}>
//               {suboffice.headOfficeId?.officeName || "Thane Rural Police"} • Live Dashboard
//             </Typography>
//           </motion.div>
//         ) : (
//           <Typography variant="h3" fontWeight={900} color="#0d2136" mb={4}>
//             Thane Rural Police - Central Dashboard
//           </Typography>
//         )}

//         {/* Tabs + Date Picker */}
//         <Box display="flex" justifyContent="center" gap={3} mb={5}>
//           <Tabs value={filter} onChange={(_,v) => { setFilter(v); setDateRange([null,null]); }} centered>
//             <Tab label="Today" value="daily" />
//             <Tab label="This Week" value="weekly" />
//             <Tab label="This Month" value="monthly" />
//           </Tabs>
//           <Button variant={showDatePicker ? "contained" : "outlined"} startIcon={<CalendarToday />} onClick={() => setShowDatePicker(!showDatePicker)}>
//             {startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Date Range'}
//           </Button>
//         </Box>

//         {/* Date Picker */}
//         {showDatePicker && (
//           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//             <Box display="flex" justifyContent="center" mb={4}>
//               <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={(dates) => {
//                     setDateRange(dates);
//                     if (dates[0] && dates[1]) setShowDatePicker(false);
//                   }}
//                   inline
//                   maxDate={new Date()}
//                 />
//                 <Button variant="outlined" fullWidth onClick={() => { setDateRange([null,null]); setShowDatePicker(false); }} sx={{ mt: 2 }}>
//                   Clear
//                 </Button>
//               </Paper>
//             </Box>
//           </motion.div>
//         )}

//         {/* Stats Cards – अब Total Visits बिल्कुल सही! */}
//         <Grid container spacing={4} mb={6}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visitors" value={stats.totalVisitors} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" delay={0} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard 
//               title="Total Visits" 
//               value={stats.totalVisits} 
//               icon={SummarizeOutlined} 
//               color="#9C27B0" 
//               bgColor="#f3e5f5" 
//               delay={0.1} 
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" delay={0.2} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Success Rate" value={stats.successRate} icon={CheckCircle} color="#28a745" bgColor="#d4edda" delay={0.3} />
//           </Grid>
//         </Grid>

//         {/* Chart */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Typography variant="h5" fontWeight={800} mb={3}>
//               Visitor Trend {startDate && endDate ? '(Custom Range)' : `(${filter === 'daily' ? 'Hourly' : 'Daily/Weekly'})`}
//             </Typography>
//             <Box sx={{ height: 400 }}>
//               <Line data={chartConfig} options={chartOptions} />
//             </Box>
//           </Paper>
//         </motion.div>

//         {/* Latest Visitors */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5 }}>
//             <Typography variant="h5" fontWeight={800} mb={3}>
//               Latest Visitors (Live)
//             </Typography>
//             <Box sx={{ height: 520 }}>
//               <StyledDataGrid
//                 rows={latestVisitors}
//                 columns={[
//                   { field: 'id', headerName: 'No.', width: 80 },
//                   { field: 'fullName', headerName: 'Name', flex: 1 },
//                   { field: 'mobileNumber', headerName: 'Mobile', width: 140 },
//                   { field: 'policeStation', headerName: 'Station', width: 200 },
//                   { field: 'officeName', headerName: 'Office', width: 180 },
//                   { field: 'entryTime', headerName: 'Time', width: 120 },
//                 ]}
//                 pageSizeOptions={[10]}
//                 disableSelectionOnClick
//               />
//             </Box>
//           </Paper>
//         </motion.div>

//       </Container>
//     </div>
//   );
// };

// export default Home;

// =====================================================================

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab, Button, Chip,TextField,InputAdornment
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import {
//   PeopleAlt, AssignmentTurnedIn, AccessTime,
//   CalendarToday, LocationOn, Business, SummarizeOutlined,Search as SearchIcon
// } from '@mui/icons-material';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement,
//   LineElement, Title, Tooltip, Legend, Filler
// } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { motion } from 'framer-motion';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// const StyledDataGrid = styled(DataGrid)({
//   border: 'none',
//   borderRadius: '16px',
//   backgroundColor: 'white',
//   boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '4px solid #0040B9',
//     borderRadius: '16px 16px 0 0',
//     fontWeight: 700,
//   },
//   '& .MuiDataGrid-row:hover': {
//     backgroundColor: '#e3f2fd',
//     transform: 'translateY(-3px)',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   },
// });

// const AnimatedStatsCard = ({ title, value, icon: Icon, color, bgColor, delay }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 30, scale: 0.9 }}
//     animate={{ opacity: 1, y: 0, scale: 1 }}
//     transition={{ duration: 0.6, delay, type: 'spring', stiffness: 100 }}
//     whileHover={{ scale: 1.05, y: -10 }}
//   >
//     <Paper sx={{
//       p: 4, borderRadius: 5, background: 'white',
//       boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
//       borderLeft: `6px solid ${color}`,
//       '&:hover': { boxShadow: '0 25px 60px rgba(0,0,0,0.22)' }
//     }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
//           <Typography variant="h3" fontWeight="bold" color={color} mt={1}>
//             {value.toLocaleString()}
//           </Typography>
//         </Box>
//         <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 20px ${bgColor}` }}>
//           <Icon sx={{ fontSize: 40, color }} />
//         </Box>
//       </Box>
//     </Paper>
//   </motion.div>
// );

// const Home = () => {
//   const { officeid } = useParams();
//   const isMobile = window.innerWidth < 768;
//   const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

//   const [filter, setFilter] = useState('daily');
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [showDatePicker, setShowDatePicker] = useState(false);
//     const [tableSearch, setTableSearch] = useState('');


//   const [stats, setStats] = useState({
//     totalVisitors: 0,
//     totalVisits: 0,
//     completed: 0,
//     pending: 0
//   });

//   const [chartData, setChartData] = useState({ labels: [], total: [], done: [] });
//   const [latestVisitors, setLatestVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [suboffice, setSuboffice] = useState(null);

//   // Fetch suboffice info
//   useEffect(() => {
//     if (officeid) {
//       axios.get(`${baseUrl}/getSubOfficesBySubofficeId/${officeid}`)
//         .then(res => {
//           if (res.data.success) setSuboffice(res.data.suboffice);
//         })
//         .catch(() => {});
//     }
//   }, [officeid]);

//   const fetchVisitors = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`);
//       if (!res.data.success || !res.data.data?.visitors) return;

//       let visitors = res.data.data.visitors;

//       if (officeid && suboffice) {
//         visitors = visitors.filter(v =>
//           v.officeName === suboffice.subofficeName ||
//           (v.addedByEmail && v.addedByEmail.includes(suboffice.email?.split('@')[0]))
//         );
//       }

//       const now = new Date();
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//       const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
//       const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

//       let filtered = [];

//       if (startDate && endDate) {
//         filtered = visitors.filter(v => {
//           if (!v.visits?.length) return false;
//           const s = new Date(startDate); s.setHours(0,0,0,0);
//           const e = new Date(endDate); e.setHours(23,59,59,999);
//           return v.visits.some(visit => new Date(visit.entryAt) >= s && new Date(visit.entryAt) <= e);
//         });
//       } else {
//         filtered = visitors.filter(v => {
//           if (!v.visits?.length) return false;
//           const lastVisitDate = new Date(v.visits[v.visits.length - 1].entryAt);
//           if (filter === 'daily') return lastVisitDate >= today;
//           if (filter === 'weekly') return lastVisitDate >= weekAgo;
//           return lastVisitDate >= monthAgo;
//         });
//       }

//       // सही गणना
//       const totalVisitorsCount = filtered.length;
//       const totalVisitsCount = filtered.reduce((sum, v) => sum + (v.visits?.length || 0), 0);
//       const completedCount = filtered.filter(v => v.visits?.length > 0 && v.visits[v.visits.length - 1].feedbackGiven).length;
//       const pendingCount = totalVisitorsCount - completedCount;

//       setStats({
//         totalVisitors: totalVisitorsCount,
//         totalVisits: totalVisitsCount,
//         completed: completedCount,
//         pending: pendingCount
//       });

//       // Chart - हर visit count होगी
//       const hourlyData = {};
//       filtered.forEach(visitor => {
//         visitor.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999)
//             : filter === 'daily' ? d >= today
//             : filter === 'weekly' ? d >= weekAgo
//             : d >= monthAgo;

//           if (!inRange) return;

//           let key = filter === 'daily'
//             ? `${d.getHours()}:00`
//             : filter === 'weekly'
//               ? ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]
//             : `Week ${Math.ceil(d.getDate()/7)}`;

//           if (startDate && endDate) key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

//           hourlyData[key] = hourlyData[key] || { total: 0, done: 0 };
//           hourlyData[key].total++;
//           if (visit.feedbackGiven) hourlyData[key].done++;
//         });
//       });

//       const labels = Object.keys(hourlyData).sort((a,b) => {
//         if (filter === 'daily') return parseInt(a) - parseInt(b);
//         if (filter === 'weekly') return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(a) - ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(b);
//         return a.localeCompare(b);
//       });

//       setChartData({
//         labels: labels.length ? labels : ['No Data'],
//         total: labels.map(k => hourlyData[k]?.total || 0),
//         done: labels.map(k => hourlyData[k]?.done || 0)
//       });

//       // Latest 10 visits
//       const allVisits = [];
//       filtered.forEach(v => {
//         v.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate) && d <= new Date(endDate)
//             : filter === 'daily' ? d >= today : filter === 'weekly' ? d >= weekAgo : d >= monthAgo;
//           if (inRange) {




//             allVisits.push({ ...visit, fullName: v.fullName, mobileNumber: v.mobileNumber,addedByRole: v.addedByRole || 'N/A',officeType: v.officeType || 'N/A',officeName: v.officeName || 'N/A' });
//           }
//         });
//       });

//       const latest10 = allVisits
//         .sort((a,b) => new Date(b.entryAt) - new Date(a.entryAt))
//         .slice(0, 10)
//         .map((v, i) => ({
//           id: i + 1,
//           fullName: v.fullName,
//           mobileNumber: v.mobileNumber,

// addedByRole:v.addedByRole,

// officeType:v.officeType,
//           officeName: v.officeName,
       
//           entryTime: new Date(v.entryAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//         }));

//       setLatestVisitors(latest10);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filter, startDate, endDate, officeid, suboffice]);

//   useEffect(() => {
//     fetchVisitors();
//     const interval = setInterval(fetchVisitors, 10000);
//     return () => clearInterval(interval);
//   }, [fetchVisitors]);

//   const chartConfig = {
//     labels: chartData.labels,
//     datasets: [
//       { label: 'Total Visits', data: chartData.total, borderColor: '#0040B9', backgroundColor: 'rgba(0,64,185,0.2)', tension: 0.4, fill: true },
//       { label: 'Completed', data: chartData.done, borderColor: '#00A86B', backgroundColor: 'rgba(0,168,107,0.2)', tension: 0.4, fill: true }
//     ]
//   };

//   const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } };

//   const getMargin = () => isMobile ? 0 : isSidebarOpen ? '12%' : '2%';

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
//         <CircularProgress size={80} sx={{ color: '#0040B9' }} />
//         <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Live Dashboard...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <div style={{ marginLeft: getMargin(), marginTop: '80px', backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '24px' }}>
//       <Container maxWidth={false}>

//         {/* Header */}
//         {suboffice ? (
//           <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
//             <Typography variant="h3" fontWeight={900} color="#0d2136" mb={1}>
//               {suboffice.subofficeName}
//             </Typography>
//             <Box display="flex" gap={2} mb={3}>
//               <Chip icon={<Business />} label={suboffice.officeType || "Sub Office"} color="primary" />
//               <Chip icon={<LocationOn />} label={suboffice.address?.split(',')[0]} color="secondary" variant="outlined" />
//             </Box>
//             <Typography variant="h6" color="primary" mb={4}>
//               {suboffice.headOfficeId?.officeName || "Thane Rural Police"} • Live Dashboard
//             </Typography>
//           </motion.div>
//         ) : (
//           <Typography variant="h3" fontWeight={900} color="#0d2136" mb={4}>
//             Thane Rural Police - Central Dashboard
//           </Typography>
//         )}

//         {/* Tabs + Date Picker */}
//         <Box display="flex" justifyContent="center" gap={3} mb={5}>
//           <Tabs value={filter} onChange={(_,v) => { setFilter(v); setDateRange([null,null]); }} centered>
//             <Tab label="Today" value="daily" />
//             <Tab label="This Week" value="weekly" />
//             <Tab label="This Month" value="monthly" />
//           </Tabs>
//           <Button variant={showDatePicker ? "contained" : "outlined"} startIcon={<CalendarToday />} onClick={() => setShowDatePicker(!showDatePicker)}>
//             {startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Date Range'}
//           </Button>
//         </Box>

//         {/* Date Picker */}
//         {showDatePicker && (
//           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//             <Box display="flex" justifyContent="center" mb={4}>
//               <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={(dates) => {
//                     setDateRange(dates);
//                     if (dates[0] && dates[1]) setShowDatePicker(false);
//                   }}
//                   inline
//                   maxDate={new Date()}
//                 />
//                 <Button variant="outlined" fullWidth onClick={() => { setDateRange([null,null]); setShowDatePicker(false); }} sx={{ mt: 2 }}>
//                   Clear
//                 </Button>
//               </Paper>
//             </Box>
//           </motion.div>
//         )}

//         {/* Stats Cards - Success Rate हटाया, Pending वापस डाला */}
//         <Grid container spacing={4} mb={6}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visitors" value={stats.totalVisitors} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" delay={0} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard 
//               title="Total Visits" 
//               value={stats.totalVisits} 
//               icon={SummarizeOutlined} 
//               color="#9C27B0" 
//               bgColor="#f3e5f5" 
//               delay={0.1} 
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" delay={0.2} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Pending" value={stats.pending} icon={AccessTime} color="#DC3545" bgColor="#fce7e7" delay={0.3} />
//           </Grid>
//         </Grid>

//         {/* Chart */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Typography variant="h5" fontWeight={800} mb={3}>
//               Visitor Trend {startDate && endDate ? '(Custom Range)' : `(${filter === 'daily' ? 'Hourly' : 'Daily/Weekly'})`}
//             </Typography>
//             <Box sx={{ height: 400 }}>
//               <Line data={chartConfig} options={chartOptions} />
//             </Box>
//           </Paper>
//         </motion.div>

//         {/* Latest Visitors */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5 }}>
//             {/* <Typography variant="h5" fontWeight={800} mb={3}>
//               Latest Visitors (Live)
//             </Typography>


        
//       <TextField
//         size="small"
//         placeholder="Search by name or mobile..."
//         value={tableSearch}
//         onChange={(e) => setTableSearch(e.target.value)}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon sx={{ color: '#0040B9' }} />
//             </InputAdornment>
//           ),
//         }}
//         sx={{
//           width: { xs: '100%', sm: 320, md: 360 },
//           '& .MuiOutlinedInput-root': {
//             borderRadius: '30px',
//             backgroundColor: '#fff',
//             boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//             fontSize: '0.95rem'
//           },
//           '& .MuiOutlinedInput-input': {
//             py: 1.2
//           }
//         }}
//       /> */}


//       <Box 
//       display="flex" 
//       justifyContent="space-between" 
//       alignItems="center" 
//       mb={3}
//       flexWrap="wrap"
//       gap={2}
//     >
//       <Typography variant="h5" fontWeight={800} sx={{ color: '#0d2136' }}>
//         Latest Visitors (Live)
//       </Typography>

//       <TextField
//         size="small"
//         placeholder="Search by name or mobile..."
//         value={tableSearch}
//         onChange={(e) => setTableSearch(e.target.value)}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon sx={{ color: '#0040B9' }} />
//             </InputAdornment>
//           ),
//         }}
//         sx={{
//           width: { xs: '100%', sm: 320, md: 380 },
//           '& .MuiOutlinedInput-root': {
//             borderRadius: '30px',
//             backgroundColor: '#fff',
//             boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//             fontSize: '0.95rem'
//           },
//           '& .MuiOutlinedInput-input': {
//             py: 1.2
//           }
//         }}
//       />
//     </Box>
//             <Box sx={{ height: 520 }}>
//               <StyledDataGrid
//                 rows={latestVisitors}
//                 columns={[
//                   { field: 'id', headerName: 'No.', width: 80 },
//                   { field: 'fullName', headerName: 'Name', flex: 1 },
//                   { field: 'mobileNumber', headerName: 'Mobile', width: 140 },
//                       { field: 'addedByRole', headerName: 'addedByRole', width: 180 },
                
//                           { field: 'officeType', headerName: '', width: 180 },
                
//                   { field: 'officeName', headerName: 'Office', width: 180 },
                


                  
//                   { field: 'entryTime', headerName: 'Time', width: 120 },
//                 ]}
//                 pageSizeOptions={[10]}
//                 disableSelectionOnClick
//               />
//             </Box>
//           </Paper>
//         </motion.div>

//       </Container>
//     </div>
//   );
// };

// export default Home;


// =================================================

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab, Button, Chip,
//   TextField, InputAdornment
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import {
//   PeopleAlt, AssignmentTurnedIn, AccessTime,
//   CalendarToday, LocationOn, Business, SummarizeOutlined, Search as SearchIcon
// } from '@mui/icons-material';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement,
//   LineElement, Title, Tooltip, Legend, Filler
// } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { motion } from 'framer-motion';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// // हायलाईट फंक्शन - नाव आणि मोबाईलमध्ये टाकलेला शब्द पिवळा होईल
// const HighlightText = ({ text = '', highlight = '' }) => {
//   if (!highlight.trim()) return <span>{text}</span>;

//   const regex = new RegExp(`(${highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi');
//   const parts = text.split(regex);

//   return (
//     <span>
//       {parts.map((part, i) =>
//         regex.test(part) ? (
//           <mark key={i} style={{ backgroundColor: '#ffeb3b', padding: '0 4px', borderRadius: '4px', fontWeight: 'bold' }}>
//             {part}
//           </mark>
//         ) : (
//           part
//         )
//       )}
//     </span>
//   );
// };

// const StyledDataGrid = styled(DataGrid)({
//   border: 'none',
//   borderRadius: '16px',
//   backgroundColor: 'white',
//   boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '4px solid #0040B9',
//     borderRadius: '16px 16px 0 0',
//     fontWeight: 700,
//   },
//   '& .MuiDataGrid-row:hover': {
//     backgroundColor: '#e3f2fd',
//     transform: 'translateY(-3px)',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   },
// });

// const AnimatedStatsCard = ({ title, value, icon: Icon, color, bgColor, delay }) => (
//   <motion.div whileHover={{ scale: 1.05, y: -10 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
//     <Paper sx={{ p: 4, borderRadius: 5, background: 'white', boxShadow: 5, borderLeft: `6px solid ${color}` }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
//           <Typography variant="h3" fontWeight="bold" color={color} mt={1}>{value.toLocaleString()}</Typography>
//         </Box>
//         <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <Icon sx={{ fontSize: 40, color }} />
//         </Box>
//       </Box>
//     </Paper>
//   </motion.div>
// );

// const Home = () => {
//   const { officeid } = useParams();
//   const isMobile = window.innerWidth < 768;
//   const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

//   const [filter, setFilter] = useState('daily');
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [tableSearch, setTableSearch] = useState(''); // सर्च स्टेट

//   const [stats, setStats] = useState({ totalVisitors: 0, totalVisits: 0, completed: 0, pending: 0 });
//   const [chartData, setChartData] = useState({ labels: [], total: [], done: [] });
//   const [latestVisitors, setLatestVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [suboffice, setSuboffice] = useState(null);

//   // Suboffice fetch
//   useEffect(() => {
//     if (officeid) {
//       axios.get(`${baseUrl}/getSubOfficesBySubofficeId/${officeid}`)
//         .then(res => {
//           if (res.data.success) setSuboffice(res.data.suboffice);
//         })
//         .catch(() => {});
//     }
//   }, [officeid]);

//   const fetchVisitors = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`);
//       if (!res.data.success || !res.data.data?.visitors) return;

//       let visitors = res.data.data.visitors;

//       if (officeid && suboffice) {
//         visitors = visitors.filter(v =>
//           v.officeName === suboffice.subofficeName ||
//           (v.addedByEmail && v.addedByEmail.includes(suboffice.email?.split('@')[0]))
//         );
//       }

//       const now = new Date();
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//       const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
//       const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

//       let filtered = [];

//       if (startDate && endDate) {
//         filtered = visitors.filter(v => v.visits?.some(visit => {
//           const d = new Date(visit.entryAt);
//           return d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999);
//         }));
//       } else {
//         filtered = visitors.filter(v => {
//           if (!v.visits?.length) return false;
//           const lastVisitDate = new Date(v.visits[v.visits.length - 1].entryAt);
//           if (filter === 'daily') return lastVisitDate >= today;
//           if (filter === 'weekly') return lastVisitDate >= weekAgo;
//           return lastVisitDate >= monthAgo;
//         });
//       }

//       // Stats
//       const totalVisitorsCount = filtered.length;
//       const totalVisitsCount = filtered.reduce((sum, v) => sum + (v.visits?.length || 0), 0);
//       const completedCount = filtered.filter(v => v.visits?.length > 0 && v.visits[v.visits.length - 1].feedbackGiven).length;
//       const pendingCount = totalVisitorsCount - completedCount;

//       setStats({ totalVisitors: totalVisitorsCount, totalVisits: totalVisitsCount, completed: completedCount, pending: pendingCount });

//       // Latest Visitors
//       const allVisits = [];
//       filtered.forEach(v => {
//         v.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate) && d <= new Date(endDate)
//             : filter === 'daily' ? d >= today : filter === 'weekly' ? d >= weekAgo : d >= monthAgo;
//           if (inRange) {
//             allVisits.push({
//               ...visit,
//               fullName: v.fullName,
//               mobileNumber: v.mobileNumber,
//               addedByRole: v.addedByRole || 'N/A',
//               officeType: v.officeType || 'N/A',
//               officeName: v.officeName || 'N/A'
//             });
//           }
//         });
//       });

//       allVisits.sort((a, b) => new Date(b.entryAt) - new Date(a.entryAt));

//       // सर्च फंक्शन
//       let displayedVisits = allVisits;
//       if (tableSearch.trim()) {
//         const query = tableSearch.toLowerCase().trim();
//         displayedVisits = allVisits.filter(v =>
//           v.fullName?.toLowerCase().includes(query) ||
//           v.mobileNumber?.includes(tableSearch)
//         );
//       }

//       const finalList = displayedVisits.slice(0, 10).map((v, i) => ({
//         id: i + 1,
//         fullName: v.fullName,
//         mobileNumber: v.mobileNumber,
//         addedByRole: v.addedByRole,
//         officeType: v.officeType,
//         officeName: v.officeName,
//         entryTime: new Date(v.entryAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
//       }));

//       setLatestVisitors(finalList);

//       // Chart Data
//       const hourlyData = {};
//       filtered.forEach(visitor => {
//         visitor.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999)
//             : filter === 'daily' ? d >= today
//             : filter === 'weekly' ? d >= weekAgo
//             : d >= monthAgo;

//           if (!inRange) return;

//           let key = filter === 'daily'
//             ? `${d.getHours()}:00`
//             : filter === 'weekly'
//               ? ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]
//               : `Week ${Math.ceil(d.getDate()/7)}`;

//           if (startDate && endDate) key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

//           hourlyData[key] = hourlyData[key] || { total: 0, done: 0 };
//           hourlyData[key].total++;
//           if (visit.feedbackGiven) hourlyData[key].done++;
//         });
//       });

//       const labels = Object.keys(hourlyData).sort((a,b) => {
//         if (filter === 'daily') return parseInt(a) - parseInt(b);
//         if (filter === 'weekly') return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(a) - ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(b);
//         return a.localeCompare(b);
//       });

//       setChartData({
//         labels: labels.length ? labels : ['No Data'],
//         total: labels.map(k => hourlyData[k]?.total || 0),
//         done: labels.map(k => hourlyData[k]?.done || 0)
//       });

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filter, startDate, endDate, officeid, suboffice, tableSearch]); // tableSearch जोडलं

//   useEffect(() => {
//     fetchVisitors();
//     const interval = setInterval(fetchVisitors, 10000);
//     return () => clearInterval(interval);
//   }, [fetchVisitors]);

//   const chartConfig = {
//     labels: chartData.labels,
//     datasets: [
//       { label: 'Total Visits', data: chartData.total, borderColor: '#0040B9', backgroundColor: 'rgba(0,64,185,0.2)', tension: 0.4, fill: true },
//       { label: 'Completed', data: chartData.done, borderColor: '#00A86B', backgroundColor: 'rgba(0,168,107,0.2)', tension: 0.4, fill: true }
//     ]
//   };

//   const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } };

//   const getMargin = () => isMobile ? 0 : isSidebarOpen ? '12%' : '2%';

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
//         <CircularProgress size={80} sx={{ color: '#0040B9' }} />
//         <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Live Dashboard...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <div style={{ marginLeft: getMargin(), marginTop: '80px', backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '24px' }}>
//       <Container maxWidth={false}>

//         {/* Header */}
//         {suboffice ? (
//           <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
//             <Typography variant="h3" fontWeight={900} color="#0d2136" mb={1}>
//               {suboffice.subofficeName}
//             </Typography>
//             <Box display="flex" gap={2} mb={3}>
//               <Chip icon={<Business />} label={suboffice.officeType || "Sub Office"} color="primary" />
//               <Chip icon={<LocationOn />} label={suboffice.address?.split(',')[0]} color="secondary" variant="outlined" />
//             </Box>
//             <Typography variant="h6" color="primary" mb={4}>
//               {suboffice.headOfficeId?.officeName || "Thane Rural Police"} Live Dashboard
//             </Typography>
//           </motion.div>
//         ) : (
//           <Typography variant="h3" fontWeight={900} color="#0d2136" mb={4}>
//             Thane Rural Police - Central Dashboard
//           </Typography>
//         )}

//         {/* Tabs + Date Picker */}
//         <Box display="flex" justifyContent="center" gap={3} mb={5}>
//           <Tabs value={filter} onChange={(_,v) => { setFilter(v); setDateRange([null,null]); }} centered>
//             <Tab label="Today" value="daily" />
//             <Tab label="This Week" value="weekly" />
//             <Tab label="This Month" value="monthly" />
//           </Tabs>
//           <Button variant={showDatePicker ? "contained" : "outlined"} startIcon={<CalendarToday />} onClick={() => setShowDatePicker(!showDatePicker)}>
//             {startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Date Range'}
//           </Button>
//         </Box>

//         {/* Date Picker */}
//         {showDatePicker && (
//           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//             <Box display="flex" justifyContent="center" mb={4}>
//               <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={(dates) => {
//                     setDateRange(dates);
//                     if (dates[0] && dates[1]) setShowDatePicker(false);
//                   }}
//                   inline
//                   maxDate={new Date()}
//                 />
//                 <Button variant="outlined" fullWidth onClick={() => { setDateRange([null,null]); setShowDatePicker(false); }} sx={{ mt: 2 }}>
//                   Clear
//                 </Button>
//               </Paper>
//             </Box>
//           </motion.div>
//         )}

//         {/* Stats Cards */}
//         <Grid container spacing={4} mb={6}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visitors" value={stats.totalVisitors} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" delay={0} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visits" value={stats.totalVisits} icon={SummarizeOutlined} color="#9C27B0" bgColor="#f3e5f5" delay={0.1} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" delay={0.2} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Pending" value={stats.pending} icon={AccessTime} color="#DC3545" bgColor="#fce7e7" delay={0.3} />
//           </Grid>
//         </Grid>

//         {/* Chart */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Typography variant="h5" fontWeight={800} mb={3}>
//               Visitor Trend {startDate && endDate ? '(Custom Range)' : `(${filter === 'daily' ? 'Hourly' : 'Daily/Weekly'})`}
//             </Typography>
//             <Box sx={{ height: 400 }}>
//               <Line data={chartConfig} options={chartOptions} />
//             </Box>
//           </Paper>
//         </motion.div>

//         {/* Latest Visitors - सर्च + हायलाईट + स्क्रोल फिक्स */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5 }}>
            
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
//               <Typography variant="h5" fontWeight={800} sx={{ color: '#0d2136' }}>
//                 Latest Visitors (Live)
//               </Typography>

//               <TextField
//                 size="small"
//                 placeholder="Search by name or mobile..."
//                 value={tableSearch}
//                 onChange={(e) => setTableSearch(e.target.value)}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#0040B9' }} /></InputAdornment>,
//                 }}
//                 sx={{
//                   width: { xs: '100%', sm: 320, md: 380 },
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '30px',
//                     backgroundColor: '#fff',
//                     boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//                   },
//                   '& .MuiOutlinedInput-input': { py: 1.2 }
//                 }}
//               />
//             </Box>

//             <Box sx={{ height: 580 }}>
//               <StyledDataGrid
//                 rows={latestVisitors}
//                 columns={[
//                   { field: 'id', headerName: 'No.', width: 80 },
//                   { field: 'fullName', headerName: 'Name', flex: 1, minWidth: 180, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'mobileNumber', headerName: 'Mobile', width: 150, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'addedByRole', headerName: 'Added By Role', width: 180 },
//                   { field: 'officeType', headerName: 'Office Type', width: 150 },
//                   { field: 'officeName', headerName: 'Office', width: 200 },
//                   { field: 'entryTime', headerName: 'Time', width: 120 },
//                 ]}
//                 getRowId={(row) => `${row.id}-${row.entryTime}`}
//                 keepNonExistentRowsSelected
//                 autoHeight={false}
//                 pageSizeOptions={[10]}
//                 disableSelectionOnClick
//                 localeText={{ noRowsLabel: tableSearch ? 'No visitor found' : 'Loading data...' }}
//               />
//             </Box>
//           </Paper>
//         </motion.div>

//       </Container>
//     </div>
//   );
// };

// export default Home;

// =======================================
// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab, Button, Chip,
//   TextField, InputAdornment
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import {
//   PeopleAlt, AssignmentTurnedIn, AccessTime,
//   CalendarToday, LocationOn, Business, SummarizeOutlined, Search as SearchIcon
// } from '@mui/icons-material';
// import { Line, Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement,
//   LineElement, Title, Tooltip, Legend, Filler, BarElement
// } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { motion } from 'framer-motion';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarElement);

// // हायलाईट फंक्शन - नाव आणि मोबाईलमध्ये टाकलेला शब्द पिवळा होईल
// const HighlightText = ({ text = '', highlight = '' }) => {
//   if (!highlight.trim()) return <span>{text}</span>;

//   const regex = new RegExp(`(${highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi');
//   const parts = text.split(regex);

//   return (
//     <span>
//       {parts.map((part, i) =>
//         regex.test(part) ? (
//           <mark key={i} style={{ backgroundColor: '#ffeb3b', padding: '0 4px', borderRadius: '4px', fontWeight: 'bold' }}>
//             {part}
//           </mark>
//         ) : (
//           part
//         )
//       )}
//     </span>
//   );
// };

// const StyledDataGrid = styled(DataGrid)({
//   border: 'none',
//   borderRadius: '16px',
//   backgroundColor: 'white',
//   boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '4px solid #0040B9',
//     borderRadius: '16px 16px 0 0',
//     fontWeight: 700,
//   },
//   '& .MuiDataGrid-row:hover': {
//     backgroundColor: '#e3f2fd',
//     transform: 'translateY(-3px)',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   },
// });

// const AnimatedStatsCard = ({ title, value, icon: Icon, color, bgColor, delay }) => (
//   <motion.div whileHover={{ scale: 1.05, y: -10 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
//     <Paper sx={{ p: 4, borderRadius: 5, background: 'white', boxShadow: 5, borderLeft: `6px solid ${color}` }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
//           <Typography variant="h3" fontWeight="bold" color={color} mt={1}>{value.toLocaleString()}</Typography>
//         </Box>
//         <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <Icon sx={{ fontSize: 40, color }} />
//         </Box>
//       </Box>
//     </Paper>
//   </motion.div>
// );

// const Home = () => {
//   const { officeid } = useParams();
//   const isMobile = window.innerWidth < 768;
//   const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

//   const [filter, setFilter] = useState('daily');
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [tableSearch, setTableSearch] = useState(''); // सर्च स्टेट

//   const [stats, setStats] = useState({ totalVisitors: 0, totalVisits: 0, completed: 0, pending: 0 });
//   const [chartData, setChartData] = useState({ labels: [], total: [], done: [] });
//   const [subofficeChartData, setSubofficeChartData] = useState({ labels: [], visitors: [] });
//   const [latestVisitors, setLatestVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [suboffice, setSuboffice] = useState(null);

//   // Suboffice fetch
//   useEffect(() => {
//     if (officeid) {
//       axios.get(`${baseUrl}/getSubOfficesBySubofficeId/${officeid}`)
//         .then(res => {
//           if (res.data.success) setSuboffice(res.data.suboffice);
//         })
//         .catch(() => {});
//     }
//   }, [officeid]);

//   const fetchVisitors = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`);
//       if (!res.data.success || !res.data.data?.visitors) return;

//       let visitors = res.data.data.visitors;

//       if (officeid && suboffice) {
//         visitors = visitors.filter(v =>
//           v.officeName === suboffice.subofficeName ||
//           (v.addedByEmail && v.addedByEmail.includes(suboffice.email?.split('@')[0]))
//         );
//       }

//       const now = new Date();
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//       const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
//       const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

//       let filtered = [];

//       if (startDate && endDate) {
//         filtered = visitors.filter(v => v.visits?.some(visit => {
//           const d = new Date(visit.entryAt);
//           return d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999);
//         }));
//       } else {
//         filtered = visitors.filter(v => {
//           if (!v.visits?.length) return false;
//           const lastVisitDate = new Date(v.visits[v.visits.length - 1].entryAt);
//           if (filter === 'daily') return lastVisitDate >= today;
//           if (filter === 'weekly') return lastVisitDate >= weekAgo;
//           return lastVisitDate >= monthAgo;
//         });
//       }

//       // Stats
//       const totalVisitorsCount = filtered.length;
//       const totalVisitsCount = filtered.reduce((sum, v) => sum + (v.visits?.length || 0), 0);
//       const completedCount = filtered.filter(v => v.visits?.length > 0 && v.visits[v.visits.length - 1].feedbackGiven).length;
//       const pendingCount = totalVisitorsCount - completedCount;

//       setStats({ totalVisitors: totalVisitorsCount, totalVisits: totalVisitsCount, completed: completedCount, pending: pendingCount });

//       // Latest Visitors
//       const allVisits = [];
//       filtered.forEach(v => {
//         v.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate) && d <= new Date(endDate)
//             : filter === 'daily' ? d >= today : filter === 'weekly' ? d >= weekAgo : d >= monthAgo;
//           if (inRange) {
//             allVisits.push({
//               ...visit,
//               fullName: v.fullName,
//               mobileNumber: v.mobileNumber,
//               addedByRole: v.addedByRole || 'N/A',
//               officeType: v.officeType || 'N/A',
//               officeName: v.officeName || 'N/A'
//             });
//           }
//         });
//       });

//       allVisits.sort((a, b) => new Date(b.entryAt) - new Date(a.entryAt));

//       // सर्च फंक्शन
//       let displayedVisits = allVisits;
//       if (tableSearch.trim()) {
//         const query = tableSearch.toLowerCase().trim();
//         displayedVisits = allVisits.filter(v =>
//           v.fullName?.toLowerCase().includes(query) ||
//           v.mobileNumber?.includes(tableSearch)
//         );
//       }

//       const finalList = displayedVisits.slice(0, 10).map((v, i) => ({
//         id: i + 1,
//         fullName: v.fullName,
//         mobileNumber: v.mobileNumber,
//         addedByRole: v.addedByRole,
//         officeType: v.officeType,
//         officeName: v.officeName,
//         entryTime: new Date(v.entryAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
//       }));

//       setLatestVisitors(finalList);

//       // Chart Data
//       const hourlyData = {};
//       filtered.forEach(visitor => {
//         visitor.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999)
//             : filter === 'daily' ? d >= today
//             : filter === 'weekly' ? d >= weekAgo
//             : d >= monthAgo;

//           if (!inRange) return;

//           let key = filter === 'daily'
//             ? `${d.getHours()}:00`
//             : filter === 'weekly'
//               ? ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]
//               : `Week ${Math.ceil(d.getDate()/7)}`;

//           if (startDate && endDate) key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

//           hourlyData[key] = hourlyData[key] || { total: 0, done: 0 };
//           hourlyData[key].total++;
//           if (visit.feedbackGiven) hourlyData[key].done++;
//         });
//       });

//       const labels = Object.keys(hourlyData).sort((a,b) => {
//         if (filter === 'daily') return parseInt(a) - parseInt(b);
//         if (filter === 'weekly') return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(a) - ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(b);
//         return a.localeCompare(b);
//       });

//       setChartData({
//         labels: labels.length ? labels : ['No Data'],
//         total: labels.map(k => hourlyData[k]?.total || 0),
//         done: labels.map(k => hourlyData[k]?.done || 0)
//       });

//       // Suboffice wise visitors for bar chart
//       const officeVisitorCount = filtered.reduce((acc, v) => {
//         const office = v.officeName || 'Unknown';
//         acc[office] = (acc[office] || 0) + 1;
//         return acc;
//       }, {});

//       const subofficeLabels = Object.keys(officeVisitorCount);
//       const subofficeVisitors = Object.values(officeVisitorCount);

//       setSubofficeChartData({
//         labels: subofficeLabels.length ? subofficeLabels : ['No Data'],
//         visitors: subofficeVisitors
//       });

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filter, startDate, endDate, officeid, suboffice, tableSearch]); // tableSearch जोडलं

//   useEffect(() => {
//     fetchVisitors();
//     const interval = setInterval(fetchVisitors, 10000);
//     return () => clearInterval(interval);
//   }, [fetchVisitors]);

//   const chartConfig = {
//     labels: chartData.labels,
//     datasets: [
//       { label: 'Total Visits', data: chartData.total, borderColor: '#0040B9', backgroundColor: 'rgba(0,64,185,0.2)', tension: 0.4, fill: true },
//       { label: 'Completed', data: chartData.done, borderColor: '#00A86B', backgroundColor: 'rgba(0,168,107,0.2)', tension: 0.4, fill: true }
//     ]
//   };

//   const barConfig = {
//     labels: subofficeChartData.labels,
//     datasets: [
//       {
//         label: 'Visitors',
//         data: subofficeChartData.visitors,
//         backgroundColor: 'rgba(0,64,185,0.6)',
//         borderColor: '#0040B9',
//         borderWidth: 1
//       }
//     ]
//   };

//   const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } };

//   const getMargin = () => isMobile ? 0 : isSidebarOpen ? '12%' : '2%';

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
//         <CircularProgress size={80} sx={{ color: '#0040B9' }} />
//         <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Live Dashboard...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <div style={{ marginLeft: getMargin(), marginTop: '80px', backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '24px' }}>
//       <Container maxWidth={false}>

//         {/* Header */}
//         {suboffice ? (
//           <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
//             <Typography variant="h3" fontWeight={900} color="#0d2136" mb={1}>
//               {suboffice.subofficeName}
//             </Typography>
//             <Box display="flex" gap={2} mb={3}>
//               <Chip icon={<Business />} label={suboffice.officeType || "Sub Office"} color="primary" />
//               <Chip icon={<LocationOn />} label={suboffice.address?.split(',')[0]} color="secondary" variant="outlined" />
//             </Box>
//             <Typography variant="h6" color="primary" mb={4}>
//               {suboffice.headOfficeId?.officeName || "Thane Rural Police"} Live Dashboard
//             </Typography>
//           </motion.div>
//         ) : (
//           <Typography variant="h3" fontWeight={900} color="#0d2136" mb={4}>
//             Thane Rural Police - Central Dashboard
//           </Typography>
//         )}

//         {/* Tabs + Date Picker */}
//         <Box display="flex" justifyContent="center" gap={3} mb={5}>
//           <Tabs value={filter} onChange={(_,v) => { setFilter(v); setDateRange([null,null]); }} centered>
//             <Tab label="Today" value="daily" />
//             <Tab label="This Week" value="weekly" />
//             <Tab label="This Month" value="monthly" />
//           </Tabs>
//           <Button variant={showDatePicker ? "contained" : "outlined"} startIcon={<CalendarToday />} onClick={() => setShowDatePicker(!showDatePicker)}>
//             {startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Date Range'}
//           </Button>
//         </Box>

//         {/* Date Picker */}
//         {showDatePicker && (
//           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//             <Box display="flex" justifyContent="center" mb={4}>
//               <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={(dates) => {
//                     setDateRange(dates);
//                     if (dates[0] && dates[1]) setShowDatePicker(false);
//                   }}
//                   inline
//                   maxDate={new Date()}
//                 />
//                 <Button variant="outlined" fullWidth onClick={() => { setDateRange([null,null]); setShowDatePicker(false); }} sx={{ mt: 2 }}>
//                   Clear
//                 </Button>
//               </Paper>
//             </Box>
//           </motion.div>
//         )}

//         {/* Stats Cards */}
//         <Grid container spacing={4} mb={6}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visitors" value={stats.totalVisitors} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" delay={0} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visits" value={stats.totalVisits} icon={SummarizeOutlined} color="#9C27B0" bgColor="#f3e5f5" delay={0.1} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" delay={0.2} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Pending" value={stats.pending} icon={AccessTime} color="#DC3545" bgColor="#fce7e7" delay={0.3} />
//           </Grid>
//         </Grid>

//         {/* Chart */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Typography variant="h5" fontWeight={800} mb={3}>
//               Visitor Trend {startDate && endDate ? '(Custom Range)' : `(${filter === 'daily' ? 'Hourly' : 'Daily/Weekly'})`}
//             </Typography>
//             <Box sx={{ height: 300 }}>
//               <Line data={chartConfig} options={chartOptions} />
//             </Box>
//           </Paper>
//         </motion.div>

//         {/* Suboffice Wise Bar Chart */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Typography variant="h5" fontWeight={800} mb={3}>
//               Suboffice Wise Visitors
//             </Typography>
//             <Box sx={{ height: 300 }}>
//               <Bar data={barConfig} options={chartOptions} />
//             </Box>
//           </Paper>
//         </motion.div>

//         {/* Latest Visitors - सर्च + हायलाईट + स्क्रोल फिक्स */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5 }}>
            
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
//               <Typography variant="h5" fontWeight={800} sx={{ color: '#0d2136' }}>
//                 Latest Visitors (Live)
//               </Typography>

//               <TextField
//                 size="small"
//                 placeholder="Search by name or mobile..."
//                 value={tableSearch}
//                 onChange={(e) => setTableSearch(e.target.value)}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#0040B9' }} /></InputAdornment>,
//                 }}
//                 sx={{
//                   width: { xs: '100%', sm: 320, md: 380 },
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '30px',
//                     backgroundColor: '#fff',
//                     boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//                   },
//                   '& .MuiOutlinedInput-input': { py: 1.2 }
//                 }}
//               />
//             </Box>

//             <Box sx={{ height: 580 }}>
//               <StyledDataGrid
//                 rows={latestVisitors}
//                 columns={[
//                   { field: 'id', headerName: 'No.', width: 80 },
//                   { field: 'fullName', headerName: 'Name', flex: 1, minWidth: 180, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'mobileNumber', headerName: 'Mobile', width: 150, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'addedByRole', headerName: 'Added By Role', width: 180 },
//                   { field: 'officeType', headerName: 'Office Type', width: 150 },
//                   { field: 'officeName', headerName: 'Office', width: 200 },
//                   { field: 'entryTime', headerName: 'Time', width: 120 },
//                 ]}
//                 getRowId={(row) => `${row.id}-${row.entryTime}`}
//                 keepNonExistentRowsSelected
//                 autoHeight={false}
//                 pageSizeOptions={[10]}
//                 disableSelectionOnClick
//                 localeText={{ noRowsLabel: tableSearch ? 'No visitor found' : 'Loading data...' }}
//               />
//             </Box>
//           </Paper>
//         </motion.div>

//       </Container>
//     </div>
//   );
// };

// export default Home;

// ====================================================================

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab, Button, Chip,
//   TextField, InputAdornment
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import {
//   PeopleAlt, AssignmentTurnedIn, AccessTime,
//   CalendarToday, LocationOn, Business, SummarizeOutlined, Search as SearchIcon
// } from '@mui/icons-material';
// import { Line, Bar, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement,
//   LineElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement
// } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { motion } from 'framer-motion';

// ChartJS.register(
//   CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement
// );

// // हायलाईट फंक्शन
// const HighlightText = ({ text = '', highlight = '' }) => {
//   if (!highlight.trim()) return <span>{text}</span>;

//   const regex = new RegExp(`(${highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi');
//   const parts = text.split(regex);

//   return (
//     <span>
//       {parts.map((part, i) =>
//         regex.test(part) ? (
//           <mark key={i} style={{ backgroundColor: '#ffeb3b', padding: '0 4px', borderRadius: '4px', fontWeight: 'bold' }}>
//             {part}
//           </mark>
//         ) : (
//           part
//         )
//       )}
//     </span>
//   );
// };

// const StyledDataGrid = styled(DataGrid)({
//   border: 'none',
//   borderRadius: '16px',
//   backgroundColor: 'white',
//   boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '4px solid #0040B9',
//     borderRadius: '16px 16px 0 0',
//     fontWeight: 700,
//   },
//   '& .MuiDataGrid-row:hover': {
//     backgroundColor: '#e3f2fd',
//     transform: 'translateY(-3px)',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   },
// });

// const AnimatedStatsCard = ({ title, value, icon: Icon, color, bgColor, delay }) => (
//   <motion.div whileHover={{ scale: 1.05, y: -10 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
//     <Paper sx={{ p: 4, borderRadius: 5, background: 'white', boxShadow: 5, borderLeft: `6px solid ${color}` }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
//           <Typography variant="h3" fontWeight="bold" color={color} mt={1}>{value.toLocaleString()}</Typography>
//         </Box>
//         <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <Icon sx={{ fontSize: 40, color }} />
//         </Box>
//       </Box>
//     </Paper>
//   </motion.div>
// );

// const Home = () => {
//   const { officeid } = useParams();
//   const isMobile = window.innerWidth < 768;
//   const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

//   const [filter, setFilter] = useState('daily');
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [tableSearch, setTableSearch] = useState('');

//   const [stats, setStats] = useState({ totalVisitors: 0, totalVisits: 0, completed: 0, pending: 0 });
//   const [chartData, setChartData] = useState({ labels: [], total: [], done: [] });
//   const [subofficeChartData, setSubofficeChartData] = useState({ labels: [], visitors: [] });
//   const [officerChartData, setOfficerChartData] = useState({ labels: [], visitors: [], colors: [] });
//   const [latestVisitors, setLatestVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [suboffice, setSuboffice] = useState(null);

//   // Suboffice fetch
//   useEffect(() => {
//     if (officeid) {
//       axios.get(`${baseUrl}/getSubOfficesBySubofficeId/${officeid}`)
//         .then(res => {
//           if (res.data.success) setSuboffice(res.data.suboffice);
//         })
//         .catch(() => {});
//     }
//   }, [officeid]);

//   const fetchVisitors = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`);
//       if (!res.data.success || !res.data.data?.visitors) return;

//       let visitors = res.data.data.visitors;

//       if (officeid && suboffice) {
//         visitors = visitors.filter(v =>
//           v.officeName === suboffice.subofficeName ||
//           (v.addedByEmail && v.addedByEmail.includes(suboffice.email?.split('@')[0]))
//         );
//       }

//       const now = new Date();
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//       const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
//       const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

//       let filtered = [];

//       if (startDate && endDate) {
//         filtered = visitors.filter(v => v.visits?.some(visit => {
//           const d = new Date(visit.entryAt);
//           return d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999);
//         }));
//       } else {
//         filtered = visitors.filter(v => {
//           if (!v.visits?.length) return false;
//           const lastVisitDate = new Date(v.visits[v.visits.length - 1].entryAt);
//           if (filter === 'daily') return lastVisitDate >= today;
//           if (filter === 'weekly') return lastVisitDate >= weekAgo;
//           return lastVisitDate >= monthAgo;
//         });
//       }

//       // Stats
//       const totalVisitorsCount = filtered.length;
//       const totalVisitsCount = filtered.reduce((sum, v) => sum + (v.visits?.length || 0), 0);
//       const completedCount = filtered.filter(v => v.visits?.length > 0 && v.visits[v.visits.length - 1].feedbackGiven).length;
//       const pendingCount = totalVisitorsCount - completedCount;

//       setStats({ totalVisitors: totalVisitorsCount, totalVisits: totalVisitsCount, completed: completedCount, pending: pendingCount });

//       // Latest Visitors
//       const allVisits = [];
//       filtered.forEach(v => {
//         v.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate) && d <= new Date(endDate)
//             : filter === 'daily' ? d >= today : filter === 'weekly' ? d >= weekAgo : d >= monthAgo;
//           if (inRange) {
//             allVisits.push({
//               ...visit,
//               fullName: v.fullName,
//               mobileNumber: v.mobileNumber,
//               addedByRole: v.addedByRole || 'N/A',
//               officeType: v.officeType || 'N/A',
//               officeName: v.officeName || 'N/A'
//             });
//           }
//         });
//       });

//       allVisits.sort((a, b) => new Date(b.entryAt) - new Date(a.entryAt));

//       let displayedVisits = allVisits;
//       if (tableSearch.trim()) {
//         const query = tableSearch.toLowerCase().trim();
//         displayedVisits = allVisits.filter(v =>
//           v.fullName?.toLowerCase().includes(query) ||
//           v.mobileNumber?.includes(tableSearch)
//         );
//       }

//       const finalList = displayedVisits.slice(0, 10).map((v, i) => ({
//         id: i + 1,
//         fullName: v.fullName,
//         mobileNumber: v.mobileNumber,
//         addedByRole: v.addedByRole,
//         officeType: v.officeType,
//         officeName: v.officeName,
//         entryTime: new Date(v.entryAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
//       }));

//       setLatestVisitors(finalList);

//       // Line Chart Data
//       const hourlyData = {};
//       filtered.forEach(visitor => {
//         visitor.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999)
//             : filter === 'daily' ? d >= today
//             : filter === 'weekly' ? d >= weekAgo
//             : d >= monthAgo;

//           if (!inRange) return;

//           let key = filter === 'daily'
//             ? `${d.getHours()}:00`
//             : filter === 'weekly'
//               ? ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]
//               : `Week ${Math.ceil(d.getDate()/7)}`;

//           if (startDate && endDate) key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

//           hourlyData[key] = hourlyData[key] || { total: 0, done: 0 };
//           hourlyData[key].total++;
//           if (visit.feedbackGiven) hourlyData[key].done++;
//         });
//       });

//       const labels = Object.keys(hourlyData).sort((a,b) => {
//         if (filter === 'daily') return parseInt(a) - parseInt(b);
//         if (filter === 'weekly') return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(a) - ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(b);
//         return a.localeCompare(b);
//       });

//       setChartData({
//         labels: labels.length ? labels : ['No Data'],
//         total: labels.map(k => hourlyData[k]?.total || 0),
//         done: labels.map(k => hourlyData[k]?.done || 0)
//       });

//       // Suboffice wise Bar Chart
//       const officeVisitorCount = filtered.reduce((acc, v) => {
//         const office = v.officeName || 'Unknown';
//         acc[office] = (acc[office] || 0) + 1;
//         return acc;
//       }, {});

//       setSubofficeChartData({
//         labels: Object.keys(officeVisitorCount).length ? Object.keys(officeVisitorCount) : ['No Data'],
//         visitors: Object.values(officeVisitorCount)
//       });

//       // Officer-wise Pie Chart
//       const officerCount = {};
//       filtered.forEach(visitor => {
//         visitor.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate) && d <= new Date(endDate)
//             : filter === 'daily' ? d >= today : filter === 'weekly' ? d >= weekAgo : d >= monthAgo;
//           if (!inRange) return;

//           const officer = visit.contactPerson?.trim() || 'अज्ञात अधिकारी';
//           officerCount[officer] = (officerCount[officer] || 0) + 1;
//         });
//       });

//       const officerLabels = Object.keys(officerCount);
//       const pieColors = officerLabels.map((_, i) => `rgba(0, ${64 + i*25}, 185, ${0.7 + i*0.03})`);

//       setOfficerChartData({
//         labels: officerLabels.length ? officerLabels : ['No Data'],
//         visitors: Object.values(officerCount),
//         colors: pieColors
//       });

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filter, startDate, endDate, officeid, suboffice, tableSearch]);

//   useEffect(() => {
//     fetchVisitors();
//     const interval = setInterval(fetchVisitors, 10000);
//     return () => clearInterval(interval);
//   }, [fetchVisitors]);

//   const chartConfig = {
//     labels: chartData.labels,
//     datasets: [
//       { label: 'Total Visits', data: chartData.total, borderColor: '#0040B9', backgroundColor: 'rgba(0,64,185,0.2)', tension: 0.4, fill: true },
//       { label: 'Completed', data: chartData.done, borderColor: '#00A86B', backgroundColor: 'rgba(0,168,107,0.2)', tension: 0.4, fill: true }
//     ]
//   };

//   const barConfig = {
//     labels: subofficeChartData.labels,
//     datasets: [{
//       label: 'Visitors',
//       data: subofficeChartData.visitors,
//       backgroundColor: 'rgba(0,64,185,0.6)',
//       borderColor: '#0040B9',
//       borderWidth: 1
//     }]
//   };

//   const pieConfig = {
//     labels: officerChartData.labels,
//     datasets: [{
//       data: officerChartData.visitors,
//       backgroundColor: officerChartData.colors.length ? officerChartData.colors : ['#cccccc'],
//       borderColor: '#0040B9',
//       borderWidth: 2,
//     }]
//   };

//   const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } };

//   const getMargin = () => isMobile ? 0 : isSidebarOpen ? '12%' : '2%';

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
//         <CircularProgress size={80} sx={{ color: '#0040B9' }} />
//         <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Live Dashboard...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <div style={{ marginLeft: getMargin(), marginTop: '80px', backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '24px' }}>
//       <Container maxWidth={false}>

//         {/* Header */}
//         {suboffice ? (
//           <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
//             <Typography variant="h3" fontWeight={900} color="#0d2136" mb={1}>
//               {suboffice.subofficeName}
//             </Typography>
//             <Box display="flex" gap={2} mb={3}>
//               <Chip icon={<Business />} label={suboffice.officeType || "Sub Office"} color="primary" />
//               <Chip icon={<LocationOn />} label={suboffice.address?.split(',')[0]} color="secondary" variant="outlined" />
//             </Box>
//             <Typography variant="h6" color="primary" mb={4}>
//               {suboffice.headOfficeId?.officeName || "Thane Rural Police"} Live Dashboard
//             </Typography>
//           </motion.div>
//         ) : (
//           <Typography variant="h3" fontWeight={900} color="#0d2136" mb={4}>
//             Thane Rural Police - Central Dashboard
//           </Typography>
//         )}

//         {/* Tabs + Date Picker */}
//         <Box display="flex" justifyContent="center" gap={3} mb={5}>
//           <Tabs value={filter} onChange={(_,v) => { setFilter(v); setDateRange([null,null]); }} centered>
//             <Tab label="Today" value="daily" />
//             <Tab label="This Week" value="weekly" />
//             <Tab label="This Month" value="monthly" />
//           </Tabs>
//           <Button variant={showDatePicker ? "contained" : "outlined"} startIcon={<CalendarToday />} onClick={() => setShowDatePicker(!showDatePicker)}>
//             {startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Date Range'}
//           </Button>
//         </Box>

//         {/* Date Picker */}
//         {showDatePicker && (
//           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//             <Box display="flex" justifyContent="center" mb={4}>
//               <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={(dates) => {
//                     setDateRange(dates);
//                     if (dates[0] && dates[1]) setShowDatePicker(false);
//                   }}
//                   inline
//                   maxDate={new Date()}
//                 />
//                 <Button variant="outlined" fullWidth onClick={() => { setDateRange([null,null]); setShowDatePicker(false); }} sx={{ mt: 2 }}>
//                   Clear
//                 </Button>
//               </Paper>
//             </Box>
//           </motion.div>
//         )}

//         {/* Stats Cards */}
//         <Grid container spacing={4} mb={6}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visitors" value={stats.totalVisitors} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" delay={0} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visits" value={stats.totalVisits} icon={SummarizeOutlined} color="#9C27B0" bgColor="#f3e5f5" delay={0.1} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" delay={0.2} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Pending" value={stats.pending} icon={AccessTime} color="#DC3545" bgColor="#fce7e7" delay={0.3} />
//           </Grid>
//         </Grid>

//         {/* Line Chart + Officer-wise Pie Chart (एकाच सेक्शनमध्ये) */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={7}>
//                 <Typography variant="h5" fontWeight={800} mb={3}>
//                   Visitor Trend {startDate && endDate ? '(Custom Range)' : `(${filter === 'daily' ? 'Hourly' : 'Daily/Weekly'})`}
//                 </Typography>
//                 <Box sx={{ height: 300 }}>
//                   <Line data={chartConfig} options={chartOptions} />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={5}>
//                 <Typography variant="h5" fontWeight={800} mb={3} color="#0040B9">
//                   Officer-wise Distribution
//                 </Typography>
//                 <Box sx={{ height: 300, position: 'relative' }}>
//                   <Pie 
//                     data={pieConfig} 
//                     options={{
//                       ...chartOptions,
//                       plugins: { 
//                         ...chartOptions.plugins, 
//                         legend: { position: 'bottom', labels: { font: { size: 12 } } } 
//                       }
//                     }} 
//                   />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </motion.div>

//         {/* Suboffice Wise Bar Chart */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Typography variant="h5" fontWeight={800} mb={3}>
//               Suboffice Wise Visitors
//             </Typography>
//             <Box sx={{ height: 300 }}>
//               <Bar data={barConfig} options={chartOptions} />
//             </Box>
//           </Paper>
//         </motion.div>

//         {/* Latest Visitors Table */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
//               <Typography variant="h5" fontWeight={800} sx={{ color: '#0d2136' }}>
//                 Latest Visitors (Live)
//               </Typography>
//               <TextField
//                 size="small"
//                 placeholder="Search by name or mobile..."
//                 value={tableSearch}
//                 onChange={(e) => setTableSearch(e.target.value)}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#0040B9' }} /></InputAdornment>,
//                 }}
//                 sx={{
//                   width: { xs: '100%', sm: 320, md: 380 },
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '30px',
//                     backgroundColor: '#fff',
//                     boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//                   },
//                   '& .MuiOutlinedInput-input': { py: 1.2 }
//                 }}
//               />
//             </Box>

//             <Box sx={{ height: 580 }}>
//               <StyledDataGrid
//                 rows={latestVisitors}
//                 columns={[
//                   { field: 'id', headerName: 'No.', width: 80 },
//                   { field: 'fullName', headerName: 'Name', flex: 1, minWidth: 180, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'mobileNumber', headerName: 'Mobile', width: 150, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'addedByRole', headerName: 'Added By Role', width: 180 },
//                   { field: 'officeType', headerName: 'Office Type', width: 150 },
//                   { field: 'officeName', headerName: 'Office', width: 200 },
//                   { field: 'entryTime', headerName: 'Time', width: 120 },
//                 ]}
//                 getRowId={(row) => `${row.id}-${row.entryTime}`}
//                 keepNonExistentRowsSelected
//                 autoHeight={false}
//                 pageSizeOptions={[10]}
//                 disableSelectionOnClick
//                 localeText={{ noRowsLabel: tableSearch ? 'No visitor found' : 'Loading data...' }}
//               />
//             </Box>
//           </Paper>
//         </motion.div>

//       </Container>
//     </div>
//   );
// };

// export default Home;

// ===========================================
// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab, Button, Chip,
//   TextField, InputAdornment
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import {
//   PeopleAlt, AssignmentTurnedIn, AccessTime,
//   CalendarToday, LocationOn, Business, SummarizeOutlined, Search as SearchIcon
// } from '@mui/icons-material';
// import { Line, Bar, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement,
//   LineElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement
// } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { motion } from 'framer-motion';

// ChartJS.register(
//   CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement
// );

// // हायलाईट फंक्शन
// const HighlightText = ({ text = '', highlight = '' }) => {
//   if (!highlight.trim()) return <span>{text}</span>;

//   const regex = new RegExp(`(${highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi');
//   const parts = text.split(regex);

//   return (
//     <span>
//       {parts.map((part, i) =>
//         regex.test(part) ? (
//           <mark key={i} style={{ backgroundColor: '#ffeb3b', padding: '0 4px', borderRadius: '4px', fontWeight: 'bold' }}>
//             {part}
//           </mark>
//         ) : (
//           part
//         )
//       )}
//     </span>
//   );
// };

// const StyledDataGrid = styled(DataGrid)({
//   border: 'none',
//   borderRadius: '16px',
//   backgroundColor: 'white',
//   boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '4px solid #0040B9',
//     borderRadius: '16px 16px 0 0',
//     fontWeight: 700,
//   },
//   '& .MuiDataGrid-row:hover': {
//     backgroundColor: '#e3f2fd',
//     transform: 'translateY(-3px)',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   },
// });

// const AnimatedStatsCard = ({ title, value, icon: Icon, color, bgColor, delay }) => (
//   <motion.div whileHover={{ scale: 1.05, y: -10 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
//     <Paper sx={{ p: 4, borderRadius: 5, background: 'white', boxShadow: 5, borderLeft: `6px solid ${color}` }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
//           <Typography variant="h3" fontWeight="bold" color={color} mt={1}>{value.toLocaleString()}</Typography>
//         </Box>
//         <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <Icon sx={{ fontSize: 40, color }} />
//         </Box>
//       </Box>
//     </Paper>
//   </motion.div>
// );

// const Home = () => {
//   const { officeid } = useParams();
//   const isMobile = window.innerWidth < 768;
//   const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

//   const [filter, setFilter] = useState('daily');
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [tableSearch, setTableSearch] = useState('');

//   const [stats, setStats] = useState({ totalVisitors: 0, totalVisits: 0, completed: 0, pending: 0 });
//   const [chartData, setChartData] = useState({ labels: [], total: [], done: [] });
//   const [subofficeChartData, setSubofficeChartData] = useState({ labels: [], visitors: [] });
//   const [officerChartData, setOfficerChartData] = useState({ labels: [], visitors: [], colors: [] });
//   const [visitTypeData, setVisitTypeData] = useState({ single: 0, repeat: 0 });
//   const [latestVisitors, setLatestVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [suboffice, setSuboffice] = useState(null);

//   useEffect(() => {
//     if (officeid) {
//       axios.get(`${baseUrl}/getSubOfficesBySubofficeId/${officeid}`)
//         .then(res => {
//           if (res.data.success) setSuboffice(res.data.suboffice);
//         })
//         .catch(() => {});
//     }
//   }, [officeid]);

//   const fetchVisitors = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`);
//       if (!res.data.success || !res.data.data?.visitors) return;

//       let visitors = res.data.data.visitors;

//       if (officeid && suboffice) {
//         visitors = visitors.filter(v =>
//           v.officeName === suboffice.subofficeName ||
//           (v.addedByEmail && v.addedByEmail.includes(suboffice.email?.split('@')[0]))
//         );
//       }

//       const now = new Date();
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//       const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
//       const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

//       let filtered = [];

//       if (startDate && endDate) {
//         filtered = visitors.filter(v => v.visits?.some(visit => {
//           const d = new Date(visit.entryAt);
//           return d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999);
//         }));
//       } else {
//         filtered = visitors.filter(v => {
//           if (!v.visits?.length) return false;
//           const lastVisitDate = new Date(v.visits[v.visits.length - 1].entryAt);
//           if (filter === 'daily') return lastVisitDate >= today;
//           if (filter === 'weekly') return lastVisitDate >= weekAgo;
//           return lastVisitDate >= monthAgo;
//         });
//       }

//       const totalVisitorsCount = filtered.length;
//       const totalVisitsCount = filtered.reduce((sum, v) => sum + (v.visits?.length || 0), 0);
//       const completedCount = filtered.filter(v => v.visits?.length > 0 && v.visits[v.visits.length - 1].feedbackGiven).length;
//       const pendingCount = totalVisitorsCount - completedCount;

//       setStats({ totalVisitors: totalVisitorsCount, totalVisits: totalVisitsCount, completed: completedCount, pending: pendingCount });

//       // Visit Type Breakdown
//       const singleCount = filtered.filter(v => (v.visits?.length || 0) === 1).length;
//       const repeatCount = totalVisitorsCount - singleCount;
//       setVisitTypeData({ single: singleCount, repeat: repeatCount });

//       // Line Chart Data
//       const hourlyData = {};
//       filtered.forEach(visitor => {
//         visitor.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999)
//             : filter === 'daily' ? d >= today
//             : filter === 'weekly' ? d >= weekAgo
//             : d >= monthAgo;

//           if (!inRange) return;

//           let key = filter === 'daily'
//             ? `${d.getHours()}:00`
//             : filter === 'weekly'
//               ? ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]
//               : `Week ${Math.ceil(d.getDate()/7)}`;

//           if (startDate && endDate) key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

//           hourlyData[key] = hourlyData[key] || { total: 0, done: 0 };
//           hourlyData[key].total++;
//           if (visit.feedbackGiven) hourlyData[key].done++;
//         });
//       });

//       const labels = Object.keys(hourlyData).sort((a,b) => {
//         if (filter === 'daily') return parseInt(a) - parseInt(b);
//         if (filter === 'weekly') return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(a) - ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(b);
//         return a.localeCompare(b);
//       });

//       setChartData({
//         labels: labels.length ? labels : ['No Data'],
//         total: labels.map(k => hourlyData[k]?.total || 0),
//         done: labels.map(k => hourlyData[k]?.done || 0)
//       });

//       // Suboffice wise
//       const officeCount = filtered.reduce((acc, v) => {
//         const office = v.officeName || 'Unknown';
//         acc[office] = (acc[office] || 0) + 1;
//         return acc;
//       }, {});

//       setSubofficeChartData({
//         labels: Object.keys(officeCount).length ? Object.keys(officeCount) : ['No Data'],
//         visitors: Object.values(officeCount)
//       });

//       // Officer-wise
//       const officerCount = {};
//       filtered.forEach(visitor => {
//         visitor.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate) && d <= new Date(endDate)
//             : filter === 'daily' ? d >= today : filter === 'weekly' ? d >= weekAgo : d >= monthAgo;
//           if (!inRange) return;
//           const officer = visit.contactPerson?.trim() || 'अज्ञात अधिकारी';
//           officerCount[officer] = (officerCount[officer] || 0) + 1;
//         });
//       });

//       const officerLabels = Object.keys(officerCount);
//       const pieColors = officerLabels.map((_, i) => `rgba(0, ${64 + i*25}, 185, ${0.7 + i*0.03})`);

//       setOfficerChartData({
//         labels: officerLabels.length ? officerLabels : ['No Data'],
//         visitors: Object.values(officerCount),
//         colors: pieColors
//       });

//       // Latest Visitors
//       const allVisits = [];
//       filtered.forEach(v => {
//         v.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate) && d <= new Date(endDate)
//             : filter === 'daily' ? d >= today : filter === 'weekly' ? d >= weekAgo : d >= monthAgo;
//           if (inRange) {
//             allVisits.push({
//               ...visit,
//               fullName: v.fullName,
//               mobileNumber: v.mobileNumber,
//               addedByRole: v.addedByRole || 'N/A',
//               officeType: v.officeType || 'N/A',
//               officeName: v.officeName || 'N/A'
//             });
//           }
//         });
//       });

//       allVisits.sort((a, b) => new Date(b.entryAt) - new Date(a.entryAt));

//       let displayedVisits = allVisits;
//       if (tableSearch.trim()) {
//         const query = tableSearch.toLowerCase().trim();
//         displayedVisits = allVisits.filter(v =>
//           v.fullName?.toLowerCase().includes(query) ||
//           v.mobileNumber?.includes(tableSearch)
//         );
//       }

//       const finalList = displayedVisits.slice(0, 10).map((v, i) => ({
//         id: i + 1,
//         fullName: v.fullName,
//         mobileNumber: v.mobileNumber,
//         addedByRole: v.addedByRole,
//         officeType: v.officeType,
//         officeName: v.officeName,
//         entryTime: new Date(v.entryAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
//       }));

//       setLatestVisitors(finalList);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filter, startDate, endDate, officeid, suboffice, tableSearch]);

//   useEffect(() => {
//     fetchVisitors();
//     const interval = setInterval(fetchVisitors, 10000);
//     return () => clearInterval(interval);
//   }, [fetchVisitors]);

//   const chartConfig = {
//     labels: chartData.labels,
//     datasets: [
//       { label: 'Total Visits', data: chartData.total, borderColor: '#0040B9', backgroundColor: 'rgba(0,64,185,0.2)', tension: 0.4, fill: true },
//       { label: 'Completed', data: chartData.done, borderColor: '#00A86B', backgroundColor: 'rgba(0,168,107,0.2)', tension: 0.4, fill: true }
//     ]
//   };

//   const barConfig = {
//     labels: subofficeChartData.labels,
//     datasets: [{
//       label: 'Visitors',
//       data: subofficeChartData.visitors,
//       backgroundColor: 'rgba(0,64,185,0.7)',
//       borderColor: '#0040B9',
//       borderWidth: 2,
//       borderRadius: 6
//     }]
//   };

//   const officerPieConfig = {
//     labels: officerChartData.labels,
//     datasets: [{
//       data: officerChartData.visitors,
//       backgroundColor: officerChartData.colors.length ? officerChartData.colors : ['#cccccc'],
//       borderColor: '#0040B9',
//       borderWidth: 2,
//     }]
//   };

//   const visitTypePieConfig = {
//     labels: ['Single Visit', 'Repeat Visit'],
//     datasets: [{
//       data: [visitTypeData.single, visitTypeData.repeat],
//       backgroundColor: ['#0040B9', '#00A86B'],
//       borderColor: '#fff',
//       borderWidth: 4,
//     }]
//   };

//   const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } };

//   const getMargin = () => isMobile ? 0 : isSidebarOpen ? '12%' : '2%';

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
//         <CircularProgress size={80} sx={{ color: '#0040B9' }} />
//         <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Live Dashboard...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <div style={{ marginLeft: getMargin(), marginTop: '80px', backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '24px' }}>
//       <Container maxWidth={false}>

//         {/* Header */}
//         {suboffice ? (
//           <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
//             <Typography variant="h3" fontWeight={900} color="#0d2136" mb={1}>
//               {suboffice.subofficeName}
//             </Typography>
//             <Box display="flex" gap={2} mb={3}>
//               <Chip icon={<Business />} label={suboffice.officeType || "Sub Office"} color="primary" />
//               <Chip icon={<LocationOn />} label={suboffice.address?.split(',')[0]} color="secondary" variant="outlined" />
//             </Box>
//             <Typography variant="h6" color="primary" mb={4}>
//               {suboffice.headOfficeId?.officeName || "Thane Rural Police"} Live Dashboard
//             </Typography>
//           </motion.div>
//         ) : (
//           <Typography variant="h3" fontWeight={900} color="#0d2136" mb={4}>
//             Thane Rural Police - Central Dashboard
//           </Typography>
//         )}

//         {/* Tabs + Date Picker */}
//         <Box display="flex" justifyContent="center" gap={3} mb={5}>
//           <Tabs value={filter} onChange={(_,v) => { setFilter(v); setDateRange([null,null]); }} centered>
//             <Tab label="Today" value="daily" />
//             <Tab label="This Week" value="weekly" />
//             <Tab label="This Month" value="monthly" />
//           </Tabs>
//           <Button variant={showDatePicker ? "contained" : "outlined"} startIcon={<CalendarToday />} onClick={() => setShowDatePicker(!showDatePicker)}>
//             {startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Date Range'}
//           </Button>
//         </Box>

//         {showDatePicker && (
//           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//             <Box display="flex" justifyContent="center" mb={4}>
//               <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={(dates) => {
//                     setDateRange(dates);
//                     if (dates[0] && dates[1]) setShowDatePicker(false);
//                   }}
//                   inline
//                   maxDate={new Date()}
//                 />
//                 <Button variant="outlined" fullWidth onClick={() => { setDateRange([null,null]); setShowDatePicker(false); }} sx={{ mt: 2 }}>
//                   Clear
//                 </Button>
//               </Paper>
//             </Box>
//           </motion.div>
//         )}

//         {/* Stats Cards */}
//         <Grid container spacing={4} mb={6}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visitors" value={stats.totalVisitors} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" delay={0} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visits" value={stats.totalVisits} icon={SummarizeOutlined} color="#9C27B0" bgColor="#f3e5f5" delay={0.1} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" delay={0.2} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Pending" value={stats.pending} icon={AccessTime} color="#DC3545" bgColor="#fce7e7" delay={0.3} />
//           </Grid>
//         </Grid>

//         {/* पहिला सेक्शन: Line Chart + Visit Type Pie Chart */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={7}>
//                 <Typography variant="h5" fontWeight={800} mb={3}>
//                   Visitor Trend {startDate && endDate ? '(Custom Range)' : `(${filter === 'daily' ? 'Hourly' : 'Daily/Weekly'})`}
//                 </Typography>
//                 <Box sx={{ height: 300 }}>
//                   <Line data={chartConfig} options={chartOptions} />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={5}>
//                 <Typography variant="h5" fontWeight={800} mb={3} color="#0040B9">
//                   Visit Type Breakdown
//                 </Typography>
//                 <Box sx={{ height: 300, position: 'relative' }}>
//                   <Pie data={visitTypePieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </motion.div>

//         {/* दुसरा सेक्शन: Officer-wise + Suboffice-wise */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="h5" fontWeight={800} mb={3} color="#0040B9">
//                   Officer-wise Distribution
//                 </Typography>
//                 <Box sx={{ height: 300, position: 'relative' }}>
//                   <Pie data={officerPieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="h5" fontWeight={800} mb={3}>
//                   Suboffice Wise Visitors
//                 </Typography>
//                 <Box sx={{ height: 300 }}>
//                   <Bar data={barConfig} options={chartOptions} />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </motion.div>

//         {/* Latest Visitors Table */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
//               <Typography variant="h5" fontWeight={800} sx={{ color: '#0d2136' }}>
//                 Latest Visitors (Live)
//               </Typography>
//               <TextField
//                 size="small"
//                 placeholder="Search by name or mobile..."
//                 value={tableSearch}
//                 onChange={(e) => setTableSearch(e.target.value)}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#0040B9' }} /></InputAdornment>,
//                 }}
//                 sx={{
//                   width: { xs: '100%', sm: 320, md: 380 },
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '30px',
//                     backgroundColor: '#fff',
//                     boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//                   },
//                   '& .MuiOutlinedInput-input': { py: 1.2 }
//                 }}
//               />
//             </Box>

//             <Box sx={{ height: 580 }}>
//               <StyledDataGrid
//                 rows={latestVisitors}
//                 columns={[
//                   { field: 'id', headerName: 'No.', width: 80 },
//                   { field: 'fullName', headerName: 'Name', flex: 1, minWidth: 180, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'mobileNumber', headerName: 'Mobile', width: 150, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'addedByRole', headerName: 'Added By Role', width: 180 },
//                   { field: 'officeType', headerName: 'Office Type', width: 150 },
//                   { field: 'officeName', headerName: 'Office', width: 200 },
//                   { field: 'entryTime', headerName: 'Time', width: 120 },
//                 ]}
//                 getRowId={(row) => `${row.id}-${row.entryTime}`}
//                 keepNonExistentRowsSelected
//                 autoHeight={false}
//                 pageSizeOptions={[10]}
//                 disableSelectionOnClick
//                 localeText={{ noRowsLabel: tableSearch ? 'No visitor found' : 'Loading data...' }}
//               />
//             </Box>
//           </Paper>
//         </motion.div>

//       </Container>
//     </div>
//   );
// };

// export default Home;

// ==================================================
// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab, Button, Chip,
//   TextField, InputAdornment
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import {
//   PeopleAlt, AssignmentTurnedIn, AccessTime,
//   CalendarToday, LocationOn, Business, SummarizeOutlined, Search as SearchIcon
// } from '@mui/icons-material';
// import { Line, Bar, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement,
//   LineElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement
// } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { motion } from 'framer-motion';

// ChartJS.register(
//   CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement
// );

// // हायलाईट फंक्शन
// const HighlightText = ({ text = '', highlight = '' }) => {
//   if (!highlight.trim()) return <span>{text}</span>;

//   const regex = new RegExp(`(${highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi');
//   const parts = text.split(regex);

//   return (
//     <span>
//       {parts.map((part, i) =>
//         regex.test(part) ? (
//           <mark key={i} style={{ backgroundColor: '#ffeb3b', padding: '0 4px', borderRadius: '4px', fontWeight: 'bold' }}>
//             {part}
//           </mark>
//         ) : (
//           part
//         )
//       )}
//     </span>
//   );
// };

// const StyledDataGrid = styled(DataGrid)({
//   border: 'none',
//   borderRadius: '16px',
//   backgroundColor: 'white',
//   boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '4px solid #0040B9',
//     borderRadius: '16px 16px 0 0',
//     fontWeight: 700,
//   },
//   '& .MuiDataGrid-row:hover': {
//     backgroundColor: '#e3f2fd',
//     transform: 'translateY(-3px)',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   },
// });

// const AnimatedStatsCard = ({ title, value, icon: Icon, color, bgColor, delay }) => (
//   <motion.div whileHover={{ scale: 1.05, y: -10 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
//     <Paper sx={{ p: 4, borderRadius: 5, background: 'white', boxShadow: 5, borderLeft: `6px solid ${color}` }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
//           <Typography variant="h3" fontWeight="bold" color={color} mt={1}>{value.toLocaleString()}</Typography>
//         </Box>
//         <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <Icon sx={{ fontSize: 40, color }} />
//         </Box>
//       </Box>
//     </Paper>
//   </motion.div>
// );

// const Home = () => {
//   const { officeid } = useParams();
//   const isMobile = window.innerWidth < 768;
//   const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

//   const [filter, setFilter] = useState('daily');
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [tableSearch, setTableSearch] = useState('');

//   const [stats, setStats] = useState({ totalVisitors: 0, totalVisits: 0, completed: 0, pending: 0 });
//   const [dayWiseChartData, setDayWiseChartData] = useState([]); // Monday to Sunday
//   const [subofficeChartData, setSubofficeChartData] = useState({ labels: [], visitors: [] });
//   const [officerChartData, setOfficerChartData] = useState({ labels: [], visitors: [], colors: [] });
//   const [visitTypeData, setVisitTypeData] = useState({ single: 0, repeat: 0 });
//   const [latestVisitors, setLatestVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [suboffice, setSuboffice] = useState(null);

//   useEffect(() => {
//     if (officeid) {
//       axios.get(`${baseUrl}/getSubOfficesBySubofficeId/${officeid}`)
//         .then(res => {
//           if (res.data.success) setSuboffice(res.data.suboffice);
//         })
//         .catch(() => {});
//     }
//   }, [officeid]);

//   const fetchVisitors = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`);
//       if (!res.data.success || !res.data.data?.visitors) return;

//       let visitors = res.data.data.visitors;

//       if (officeid && suboffice) {
//         visitors = visitors.filter(v =>
//           v.officeName === suboffice.subofficeName ||
//           (v.addedByEmail && v.addedByEmail.includes(suboffice.email?.split('@')[0]))
//         );
//       }

//       const now = new Date();
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//       const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
//       const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

//       let filtered = [];

//       if (startDate && endDate) {
//         filtered = visitors.filter(v => v.visits?.some(visit => {
//           const d = new Date(visit.entryAt);
//           return d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999);
//         }));
//       } else {
//         filtered = visitors.filter(v => {
//           if (!v.visits?.length) return false;
//           const lastVisitDate = new Date(v.visits[v.visits.length - 1].entryAt);
//           if (filter === 'daily') return lastVisitDate >= today;
//           if (filter === 'weekly') return lastVisitDate >= weekAgo;
//           return lastVisitDate >= monthAgo;
//         });
//       }

//       const totalVisitorsCount = filtered.length;
//       const totalVisitsCount = filtered.reduce((sum, v) => sum + (v.visits?.length || 0), 0);
//       const completedCount = filtered.filter(v => v.visits?.length > 0 && v.visits[v.visits.length - 1].feedbackGiven).length;
//       const pendingCount = totalVisitorsCount - completedCount;

//       setStats({ totalVisitors: totalVisitorsCount, totalVisits: totalVisitsCount, completed: completedCount, pending: pendingCount });

//       // Visit Type Breakdown
//       const singleCount = filtered.filter(v => (v.visits?.length || 0) === 1).length;
//       const repeatCount = totalVisitorsCount - singleCount;
//       setVisitTypeData({ single: singleCount, repeat: repeatCount });

//       // Day-wise Visitor Count (Monday to Sunday)
//       const dayCount = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
//       filtered.forEach(visitor => {
//         visitor.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999)
//             : filter === 'daily' ? d.toDateString() === today.toDateString()
//             : filter === 'weekly' ? d >= weekAgo
//             : d >= monthAgo;

//           if (inRange) {
//             const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
//             if (dayCount.hasOwnProperty(dayName)) {
//               dayCount[dayName]++;
//             }
//           }
//         });
//       });

//       const orderedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//       const dayWiseValues = orderedDays.map(day => dayCount[day]);
//       setDayWiseChartData(dayWiseValues);

//       // Suboffice wise
//       const officeCount = filtered.reduce((acc, v) => {
//         const office = v.officeName || 'Unknown';
//         acc[office] = (acc[office] || 0) + 1;
//         return acc;
//       }, {});

//       setSubofficeChartData({
//         labels: Object.keys(officeCount).length ? Object.keys(officeCount) : ['No Data'],
//         visitors: Object.values(officeCount)
//       });

//       // Officer-wise
//       const officerCount = {};
//       filtered.forEach(visitor => {
//         visitor.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate) && d <= new Date(endDate)
//             : filter === 'daily' ? d >= today : filter === 'weekly' ? d >= weekAgo : d >= monthAgo;
//           if (!inRange) return;
//           const officer = visit.contactPerson?.trim() || 'अज्ञात अधिकारी';
//           officerCount[officer] = (officerCount[officer] || 0) + 1;
//         });
//       });

//       const officerLabels = Object.keys(officerCount);
//       const pieColors = officerLabels.map((_, i) => `rgba(0, ${64 + i*25}, 185, ${0.7 + i*0.03})`);

//       setOfficerChartData({
//         labels: officerLabels.length ? officerLabels : ['No Data'],
//         visitors: Object.values(officerCount),
//         colors: pieColors
//       });

//       // Latest Visitors Table
//       const allVisits = [];
//       filtered.forEach(v => {
//         v.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate) && d <= new Date(endDate)
//             : filter === 'daily' ? d >= today : filter === 'weekly' ? d >= weekAgo : d >= monthAgo;
//           if (inRange) {
//             allVisits.push({
//               ...visit,
//               fullName: v.fullName,
//               mobileNumber: v.mobileNumber,
//               addedByRole: v.addedByRole || 'N/A',
//               officeType: v.officeType || 'N/A',
//               officeName: v.officeName || 'N/A'
//             });
//           }
//         });
//       });

//       allVisits.sort((a, b) => new Date(b.entryAt) - new Date(a.entryAt));

//       let displayedVisits = allVisits;
//       if (tableSearch.trim()) {
//         const query = tableSearch.toLowerCase().trim();
//         displayedVisits = allVisits.filter(v =>
//           v.fullName?.toLowerCase().includes(query) ||
//           v.mobileNumber?.includes(tableSearch)
//         );
//       }

//       const finalList = displayedVisits.slice(0, 10).map((v, i) => ({
//         id: i + 1,
//         fullName: v.fullName,
//         mobileNumber: v.mobileNumber,
//         addedByRole: v.addedByRole,
//         officeType: v.officeType,
//         officeName: v.officeName,
//         entryTime: new Date(v.entryAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
//       }));

//       setLatestVisitors(finalList);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filter, startDate, endDate, officeid, suboffice, tableSearch]);

//   useEffect(() => {
//     fetchVisitors();
//     const interval = setInterval(fetchVisitors, 10000);
//     return () => clearInterval(interval);
//   }, [fetchVisitors]);

//   // Day-wise Bar Chart Config
//   const dayBarConfig = {
//     labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//     datasets: [{
//       label: 'Visitors',
//       data: dayWiseChartData,
//       backgroundColor: 'rgba(0,64,185,0.8)',
//       borderColor: '#0040B9',
//       borderWidth: 2,
//       borderRadius: 8,
//     }]
//   };

//   const barConfig = {
//     labels: subofficeChartData.labels,
//     datasets: [{
//       label: 'Visitors',
//       data: subofficeChartData.visitors,
//       backgroundColor: 'rgba(0,64,185,0.7)',
//       borderColor: '#0040B9',
//       borderWidth: 2,
//       borderRadius: 6
//     }]
//   };

//   const officerPieConfig = {
//     labels: officerChartData.labels,
//     datasets: [{
//       data: officerChartData.visitors,
//       backgroundColor: officerChartData.colors.length ? officerChartData.colors : ['#cccccc'],
//       borderColor: '#0040B9',
//       borderWidth: 2,
//     }]
//   };

//   const visitTypePieConfig = {
//     labels: ['Single Visit', 'Repeat Visit'],
//     datasets: [{
//       data: [visitTypeData.single, visitTypeData.repeat],
//       backgroundColor: ['#0040B9', '#00A86B'],
//       borderColor: '#fff',
//       borderWidth: 4,
//     }]
//   };

//   const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } };

//   const getMargin = () => isMobile ? 0 : isSidebarOpen ? '12%' : '2%';

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
//         <CircularProgress size={80} sx={{ color: '#0040B9' }} />
//         <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Live Dashboard...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <div style={{ marginLeft: getMargin(), marginTop: '80px', backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '24px' }}>
//       <Container maxWidth={false}>

//         {/* Header */}
//         {suboffice ? (
//           <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
//             <Typography variant="h3" fontWeight={900} color="#0d2136" mb={1}>
//               {suboffice.subofficeName}
//             </Typography>
//             <Box display="flex" gap={2} mb={3}>
//               <Chip icon={<Business />} label={suboffice.officeType || "Sub Office"} color="primary" />
//               <Chip icon={<LocationOn />} label={suboffice.address?.split(',')[0]} color="secondary" variant="outlined" />
//             </Box>
//             <Typography variant="h6" color="primary" mb={4}>
//               {suboffice.headOfficeId?.officeName || "Thane Rural Police"} Live Dashboard
//             </Typography>
//           </motion.div>
//         ) : (
//           <Typography variant="h3" fontWeight={900} color="#0d2136" mb={4}>
//             Thane Rural Police - Central Dashboard
//           </Typography>
//         )}

//         {/* Tabs + Date Picker */}
//         <Box display="flex" justifyContent="center" gap={3} mb={5}>
//           <Tabs value={filter} onChange={(_,v) => { setFilter(v); setDateRange([null,null]); }} centered>
//             <Tab label="Today" value="daily" />
//             <Tab label="This Week" value="weekly" />
//             <Tab label="This Month" value="monthly" />
//           </Tabs>
//           <Button variant={showDatePicker ? "contained" : "outlined"} startIcon={<CalendarToday />} onClick={() => setShowDatePicker(!showDatePicker)}>
//             {startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Date Range'}
//           </Button>
//         </Box>

//         {showDatePicker && (
//           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//             <Box display="flex" justifyContent="center" mb={4}>
//               <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={(dates) => {
//                     setDateRange(dates);
//                     if (dates[0] && dates[1]) setShowDatePicker(false);
//                   }}
//                   inline
//                   maxDate={new Date()}
//                 />
//                 <Button variant="outlined" fullWidth onClick={() => { setDateRange([null,null]); setShowDatePicker(false); }} sx={{ mt: 2 }}>
//                   Clear
//                 </Button>
//               </Paper>
//             </Box>
//           </motion.div>
//         )}

//         {/* Stats Cards */}
//         <Grid container spacing={4} mb={6}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visitors" value={stats.totalVisitors} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" delay={0} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visits" value={stats.totalVisits} icon={SummarizeOutlined} color="#9C27B0" bgColor="#f3e5f5" delay={0.1} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" delay={0.2} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Pending" value={stats.pending} icon={AccessTime} color="#DC3545" bgColor="#fce7e7" delay={0.3} />
//           </Grid>
//         </Grid>

//         {/* पहिला सेक्शन: Day-wise Bar + Visit Type Pie */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={7}>
//                 <Typography variant="h5" fontWeight={800} mb={3}>
//                   Visitor Trend (Day-wise)
//                 </Typography>
//                 <Box sx={{ height: 300 }}>
//                   <Bar data={dayBarConfig} options={chartOptions} />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={5}>
//                 <Typography variant="h5" fontWeight={800} mb={3} color="#0040B9">
//                   Visit Type Breakdown
//                 </Typography>
//                 <Box sx={{ height: 300, position: 'relative' }}>
//                   <Pie data={visitTypePieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </motion.div>

//         {/* दुसरा सेक्शन: Officer + Suboffice */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="h5" fontWeight={800} mb={3} color="#0040B9">
//                   Officer-wise Distribution
//                 </Typography>
//                 <Box sx={{ height: 300, position: 'relative' }}>
//                   <Pie data={officerPieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="h5" fontWeight={800} mb={3}>
//                   Suboffice Wise Visitors
//                 </Typography>
//                 <Box sx={{ height: 300 }}>
//                   <Bar data={barConfig} options={chartOptions} />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </motion.div>

//         {/* Latest Visitors Table */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
//               <Typography variant="h5" fontWeight={800} sx={{ color: '#0d2136' }}>
//                 Latest Visitors (Live)
//               </Typography>
//               <TextField
//                 size="small"
//                 placeholder="Search by name or mobile..."
//                 value={tableSearch}
//                 onChange={(e) => setTableSearch(e.target.value)}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#0040B9' }} /></InputAdornment>,
//                 }}
//                 sx={{
//                   width: { xs: '100%', sm: 320, md: 380 },
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '30px',
//                     backgroundColor: '#fff',
//                     boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//                   },
//                   '& .MuiOutlinedInput-input': { py: 1.2 }
//                 }}
//               />
//             </Box>

//             <Box sx={{ height: 580 }}>
//               <StyledDataGrid
//                 rows={latestVisitors}
//                 columns={[
//                   { field: 'id', headerName: 'No.', width: 80 },
//                   { field: 'fullName', headerName: 'Name', flex: 1, minWidth: 180, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'mobileNumber', headerName: 'Mobile', width: 150, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'addedByRole', headerName: 'Added By Role', width: 180 },
//                   { field: 'officeType', headerName: 'Office Type', width: 150 },
//                   { field: 'officeName', headerName: 'Office', width: 200 },
//                   { field: 'entryTime', headerName: 'Time', width: 120 },
//                 ]}
//                 getRowId={(row) => `${row.id}-${row.entryTime}`}
//                 keepNonExistentRowsSelected
//                 autoHeight={false}
//                 pageSizeOptions={[10]}
//                 disableSelectionOnClick
//                 localeText={{ noRowsLabel: tableSearch ? 'No visitor found' : 'Loading data...' }}
//               />
//             </Box>
//           </Paper>
//         </motion.div>

//       </Container>
//     </div>
//   );
// };

// export default Home;


// =====================================================

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab, Button, Chip,
//   TextField, InputAdornment
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import {
//   PeopleAlt, AssignmentTurnedIn, AccessTime,
//   CalendarToday, LocationOn, Business, SummarizeOutlined, Search as SearchIcon
// } from '@mui/icons-material';
// import { Line, Bar, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement,
//   LineElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement
// } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { motion } from 'framer-motion';

// ChartJS.register(
//   CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement
// );

// // हायलाईट फंक्शन
// const HighlightText = ({ text = '', highlight = '' }) => {
//   if (!highlight.trim()) return <span>{text}</span>;

//   const regex = new RegExp(`(${highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi');
//   const parts = text.split(regex);

//   return (
//     <span>
//       {parts.map((part, i) =>
//         regex.test(part) ? (
//           <mark key={i} style={{ backgroundColor: '#ffeb3b', padding: '0 4px', borderRadius: '4px', fontWeight: 'bold' }}>
//             {part}
//           </mark>
//         ) : (
//           part
//         )
//       )}
//     </span>
//   );
// };

// const StyledDataGrid = styled(DataGrid)({
//   border: 'none',
//   borderRadius: '16px',
//   backgroundColor: 'white',
//   boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '4px solid #0040B9',
//     borderRadius: '16px 16px 0 0',
//     fontWeight: 700,
//   },
//   '& .MuiDataGrid-row:hover': {
//     backgroundColor: '#e3f2fd',
//     transform: 'translateY(-3px)',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   },
// });

// const AnimatedStatsCard = ({ title, value, icon: Icon, color, bgColor, delay }) => (
//   <motion.div whileHover={{ scale: 1.05, y: -10 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
//     <Paper sx={{ p: 4, borderRadius: 5, background: 'white', boxShadow: 5, borderLeft: `6px solid ${color}` }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
//           <Typography variant="h3" fontWeight="bold" color={color} mt={1}>{value.toLocaleString()}</Typography>
//         </Box>
//         <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <Icon sx={{ fontSize: 40, color }} />
//         </Box>
//       </Box>
//     </Paper>
//   </motion.div>
// );

// const Home = () => {
//   const { officeid } = useParams();
//   const isMobile = window.innerWidth < 768;
//   const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

//   const [filter, setFilter] = useState('daily');
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [tableSearch, setTableSearch] = useState('');

//   const [stats, setStats] = useState({ totalVisitors: 0, totalVisits: 0, completed: 0, pending: 0 });
//   const [dayWiseChartData, setDayWiseChartData] = useState([]);
//   const [subofficeChartData, setSubofficeChartData] = useState({ labels: [], visitors: [] });
//   const [officerChartData, setOfficerChartData] = useState({ labels: [], visitors: [], colors: [] });
//   const [visitTypeData, setVisitTypeData] = useState({ single: 0, repeat: 0 });
//   const [latestVisitors, setLatestVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [suboffice, setSuboffice] = useState(null);

//   useEffect(() => {
//     if (officeid) {
//       axios.get(`${baseUrl}/getSubOfficesBySubofficeId/${officeid}`)
//         .then(res => {
//           if (res.data.success) setSuboffice(res.data.suboffice);
//         })
//         .catch(() => {});
//     }
//   }, [officeid]);

//   const fetchVisitors = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`);
//       if (!res.data.success || !res.data.data?.visitors) return;

//       let visitors = res.data.data.visitors;

//       if (officeid && suboffice) {
//         visitors = visitors.filter(v =>
//           v.officeName === suboffice.subofficeName ||
//           (v.addedByEmail && v.addedByEmail.includes(suboffice.email?.split('@')[0]))
//         );
//       }

//       const now = new Date();
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//       const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
//       const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

//       let filtered = [];

//       if (startDate && endDate) {
//         filtered = visitors.filter(v => v.visits?.some(visit => {
//           const d = new Date(visit.entryAt);
//           return d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999);
//         }));
//       } else {
//         filtered = visitors.filter(v => {
//           if (!v.visits?.length) return false;
//           const lastVisitDate = new Date(v.visits[v.visits.length - 1].entryAt);
//           if (filter === 'daily') return lastVisitDate >= today;
//           if (filter === 'weekly') return lastVisitDate >= weekAgo;
//           return lastVisitDate >= monthAgo;
//         });
//       }

//       const totalVisitorsCount = filtered.length;
//       const totalVisitsCount = filtered.reduce((sum, v) => sum + (v.visits?.length || 0), 0);
//       const completedCount = filtered.filter(v => v.visits?.length > 0 && v.visits[v.visits.length - 1].feedbackGiven).length;
//       const pendingCount = totalVisitorsCount - completedCount;

//       setStats({ totalVisitors: totalVisitorsCount, totalVisits: totalVisitsCount, completed: completedCount, pending: pendingCount });

//       // Visit Type Breakdown
//       const singleCount = filtered.filter(v => (v.visits?.length || 0) === 1).length;
//       const repeatCount = totalVisitorsCount - singleCount;
//       setVisitTypeData({ single: singleCount, repeat: repeatCount });

//       // Day-wise Visitor Count
//       const dayCount = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
//       filtered.forEach(visitor => {
//         visitor.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999)
//             : filter === 'daily' ? d.toDateString() === today.toDateString()
//             : filter === 'weekly' ? d >= weekAgo
//             : d >= monthAgo;

//           if (inRange) {
//             const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
//             if (dayCount.hasOwnProperty(dayName)) dayCount[dayName]++;
//           }
//         });
//       });

//       const orderedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//       const dayWiseValues = orderedDays.map(day => dayCount[day]);
//       setDayWiseChartData(dayWiseValues);

//       // Suboffice wise
//       const officeCount = filtered.reduce((acc, v) => {
//         const office = v.officeName || 'Unknown';
//         acc[office] = (acc[office] || 0) + 1;
//         return acc;
//       }, {});

//       setSubofficeChartData({
//         labels: Object.keys(officeCount).length ? Object.keys(officeCount) : ['No Data'],
//         visitors: Object.values(officeCount)
//       });

//       // Officer-wise
//       const officerCount = {};
//       filtered.forEach(visitor => {
//         visitor.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate) && d <= new Date(endDate)
//             : filter === 'daily' ? d >= today : filter === 'weekly' ? d >= weekAgo : d >= monthAgo;
//           if (!inRange) return;
//           const officer = visit.contactPerson?.trim() || 'अज्ञात अधिकारी';
//           officerCount[officer] = (officerCount[officer] || 0) + 1;
//         });
//       });

//       const officerLabels = Object.keys(officerCount);
//       const pieColors = officerLabels.map((_, i) => `rgba(0, ${64 + i*25}, 185, ${0.7 + i*0.03})`);

//       setOfficerChartData({
//         labels: officerLabels.length ? officerLabels : ['No Data'],
//         visitors: Object.values(officerCount),
//         colors: pieColors
//       });

//       // Latest Visitors Table
//       const allVisits = [];
//       filtered.forEach(v => {
//         v.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate) && d <= new Date(endDate)
//             : filter === 'daily' ? d >= today : filter === 'weekly' ? d >= weekAgo : d >= monthAgo;
//           if (inRange) {
//             allVisits.push({
//               ...visit,
//               fullName: v.fullName,
//               mobileNumber: v.mobileNumber,
//               addedByRole: v.addedByRole || 'N/A',
//               officeType: v.officeType || 'N/A',
//               officeName: v.officeName || 'N/A'
//             });
//           }
//         });
//       });

//       allVisits.sort((a, b) => new Date(b.entryAt) - new Date(a.entryAt));

//       let displayedVisits = allVisits;
//       if (tableSearch.trim()) {
//         const query = tableSearch.toLowerCase().trim();
//         displayedVisits = allVisits.filter(v =>
//           v.fullName?.toLowerCase().includes(query) ||
//           v.mobileNumber?.includes(tableSearch)
//         );
//       }

//       const finalList = displayedVisits.slice(0, 10).map((v, i) => ({
//         id: i + 1,
//         fullName: v.fullName,
//         mobileNumber: v.mobileNumber,
//         addedByRole: v.addedByRole,
//         officeType: v.officeType,
//         officeName: v.officeName,
//         entryTime: new Date(v.entryAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
//       }));

//       setLatestVisitors(finalList);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filter, startDate, endDate, officeid, suboffice, tableSearch]);

//   useEffect(() => {
//     fetchVisitors();
//     const interval = setInterval(fetchVisitors, 10000);
//     return () => clearInterval(interval);
//   }, [fetchVisitors]);

//   // Charts Config
//   const dayBarConfig = {
//     labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//     datasets: [{
//       label: 'Visitors',
//       data: dayWiseChartData,
//       backgroundColor: 'rgba(0,64,185,0.8)',
//       borderColor: '#0040B9',
//       borderWidth: 2,
//       borderRadius: 8,
//     }]
//   };

//   const barConfig = {
//     labels: subofficeChartData.labels,
//     datasets: [{
//       label: 'Visitors',
//       data: subofficeChartData.visitors,
//       backgroundColor: 'rgba(0,64,185,0.7)',
//       borderColor: '#0040B9',
//       borderWidth: 2,
//       borderRadius: 6
//     }]
//   };

//   const officerPieConfig = {
//     labels: officerChartData.labels,
//     datasets: [{
//       data: officerChartData.visitors,
//       backgroundColor: officerChartData.colors.length ? officerChartData.colors : ['#cccccc'],
//       borderColor: '#0040B9',
//       borderWidth: 2,
//     }]
//   };

//   const visitTypePieConfig = {
//     labels: ['Single Visit', 'Repeat Visit'],
//     datasets: [{
//       data: [visitTypeData.single, visitTypeData.repeat],
//       backgroundColor: ['#0040B9', '#00A86B'],
//       borderColor: '#fff',
//       borderWidth: 4,
//     }]
//   };

//   const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } };

//   const getMargin = () => isMobile ? 0 : isSidebarOpen ? '12%' : '2%';

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
//         <CircularProgress size={80} sx={{ color: '#0040B9' }} />
//         <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Live Dashboard...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <div style={{ marginLeft: getMargin(), marginTop: '80px', backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '24px' }}>
//       <Container maxWidth={false}>

//         {/* Header */}
//         {suboffice ? (
//           <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
//             <Typography variant="h3" fontWeight={900} color="#0d2136" mb={1}>
//               {suboffice.subofficeName}
//             </Typography>
//             <Box display="flex" gap={2} mb={3}>
//               <Chip icon={<Business />} label={suboffice.officeType || "Sub Office"} color="primary" />
//               <Chip icon={<LocationOn />} label={suboffice.address?.split(',')[0]} color="secondary" variant="outlined" />
//             </Box>
//             <Typography variant="h6" color="primary" mb={4}>
//               {suboffice.headOfficeId?.officeName || "Thane Rural Police"} Live Dashboard
//             </Typography>
//           </motion.div>
//         ) : (
//           <Typography variant="h3" fontWeight={900} color="#0d2136" mb={4}>
//             Thane Rural Police - Central Dashboard
//           </Typography>
//         )}

//         {/* Tabs + Date Picker */}
//         <Box display="flex" justifyContent="center" gap={3} mb={5}>
//           <Tabs value={filter} onChange={(_,v) => { setFilter(v); setDateRange([null,null]); }} centered>
//             <Tab label="Today" value="daily" />
//             <Tab label="This Week" value="weekly" />
//             <Tab label="This Month" value="monthly" />
//           </Tabs>
//           <Button variant={showDatePicker ? "contained" : "outlined"} startIcon={<CalendarToday />} onClick={() => setShowDatePicker(!showDatePicker)}>
//             {startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Date Range'}
//           </Button>
//         </Box>

//         {showDatePicker && (
//           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//             <Box display="flex" justifyContent="center" mb={4}>
//               <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={(dates) => {
//                     setDateRange(dates);
//                     if (dates[0] && dates[1]) setShowDatePicker(false);
//                   }}
//                   inline
//                   maxDate={new Date()}
//                 />
//                 <Button variant="outlined" fullWidth onClick={() => { setDateRange([null,null]); setShowDatePicker(false); }} sx={{ mt: 2 }}>
//                   Clear
//                 </Button>
//               </Paper>
//             </Box>
//           </motion.div>
//         )}

//         {/* Stats Cards */}
//         <Grid container spacing={4} mb={6}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visitors" value={stats.totalVisitors} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" delay={0} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visits" value={stats.totalVisits} icon={SummarizeOutlined} color="#9C27B0" bgColor="#f3e5f5" delay={0.1} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" delay={0.2} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Pending" value={stats.pending} icon={AccessTime} color="#DC3545" bgColor="#fce7e7" delay={0.3} />
//           </Grid>
//         </Grid>

//         {/* पहिला सेक्शन: Day-wise + Visit Type (छोटा) */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={7}>
//                 <Typography variant="h5" fontWeight={800} mb={3}>
//                   Visitor Trend (Day-wise)
//                 </Typography>
//                 <Box sx={{ height: 260 }}>
//                   <Bar data={dayBarConfig} options={chartOptions} />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={5}>
//                 <Typography variant="h5" fontWeight={800} mb={3} color="#0040B9">
//                   Visit Type Breakdown
//                 </Typography>
//                 <Box sx={{ height: 260, position: 'relative' }}>
//                   <Pie data={visitTypePieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </motion.div>

//         {/* दुसरा सेक्शन: Officer-wise + Suboffice-wise (एकाच पेपरमध्ये) */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="h5" fontWeight={800} mb={3} color="#0040B9">
//                   Officer-wise Distribution
//                 </Typography>
//                 <Box sx={{ height: 300, position: 'relative' }}>
//                   <Pie data={officerPieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="h5" fontWeight={800} mb={3}>
//                   Suboffice Wise Visitors
//                 </Typography>
//                 <Box sx={{ height: 300 }}>
//                   <Bar data={barConfig} options={chartOptions} />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </motion.div>

//         {/* Latest Visitors Table */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
//               <Typography variant="h5" fontWeight={800} sx={{ color: '#0d2136' }}>
//                 Latest Visitors (Live)
//               </Typography>
//               <TextField
//                 size="small"
//                 placeholder="Search by name or mobile..."
//                 value={tableSearch}
//                 onChange={(e) => setTableSearch(e.target.value)}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#0040B9' }} /></InputAdornment>,
//                 }}
//                 sx={{
//                   width: { xs: '100%', sm: 320, md: 380 },
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '30px',
//                     backgroundColor: '#fff',
//                     boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//                   },
//                   '& .MuiOutlinedInput-input': { py: 1.2 }
//                 }}
//               />
//             </Box>

//             <Box sx={{ height: 580 }}>
//               <StyledDataGrid
//                 rows={latestVisitors}
//                 columns={[
//                   { field: 'id', headerName: 'No.', width: 80 },
//                   { field: 'fullName', headerName: 'Name', flex: 1, minWidth: 180, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'mobileNumber', headerName: 'Mobile', width: 150, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'addedByRole', headerName: 'Added By Role', width: 180 },
//                   { field: 'officeType', headerName: 'Office Type', width: 150 },
//                   { field: 'officeName', headerName: 'Office', width: 200 },
//                   { field: 'entryTime', headerName: 'Time', width: 120 },
//                 ]}
//                 getRowId={(row) => `${row.id}-${row.entryTime}`}
//                 keepNonExistentRowsSelected
//                 autoHeight={false}
//                 pageSizeOptions={[10]}
//                 disableSelectionOnClick
//                 localeText={{ noRowsLabel: tableSearch ? 'No visitor found' : 'Loading data...' }}
//               />
//             </Box>
//           </Paper>
//         </motion.div>

//       </Container>
//     </div>
//   );
// };

// export default Home;


// ======================================================================

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab, Button, Chip,
//   TextField, InputAdornment
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import {
//   PeopleAlt, AssignmentTurnedIn, AccessTime,
//   CalendarToday, LocationOn, Business, SummarizeOutlined, Search as SearchIcon
// } from '@mui/icons-material';
// import { Line, Bar, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement,
//   LineElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement
// } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { motion } from 'framer-motion';

// ChartJS.register(
//   CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement
// );

// // हायलाईट फंक्शन
// const HighlightText = ({ text = '', highlight = '' }) => {
//   if (!highlight.trim()) return <span>{text}</span>;

//   const regex = new RegExp(`(${highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi');
//   const parts = text.split(regex);

//   return (
//     <span>
//       {parts.map((part, i) =>
//         regex.test(part) ? (
//           <mark key={i} style={{ backgroundColor: '#ffeb3b', padding: '0 4px', borderRadius: '4px', fontWeight: 'bold' }}>
//             {part}
//           </mark>
//         ) : (
//           part
//         )
//       )}
//     </span>
//   );
// };

// const StyledDataGrid = styled(DataGrid)({
//   border: 'none',
//   borderRadius: '16px',
//   backgroundColor: 'white',
//   boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '4px solid #0040B9',
//     borderRadius: '16px 16px 0 0',
//     fontWeight: 700,
//   },
//   '& .MuiDataGrid-row:hover': {
//     backgroundColor: '#e3f2fd',
//     transform: 'translateY(-3px)',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   },
// });

// const AnimatedStatsCard = ({ title, value, icon: Icon, color, bgColor, delay }) => (
//   <motion.div whileHover={{ scale: 1.05, y: -10 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
//     <Paper sx={{ p: 4, borderRadius: 5, background: 'white', boxShadow: 5, borderLeft: `6px solid ${color}` }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
//           <Typography variant="h3" fontWeight="bold" color={color} mt={1}>{value.toLocaleString()}</Typography>
//         </Box>
//         <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <Icon sx={{ fontSize: 40, color }} />
//         </Box>
//       </Box>
//     </Paper>
//   </motion.div>
// );

// const Home = () => {
//   const { officeid } = useParams();
//   const isMobile = window.innerWidth < 768;
//   const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

//   const [filter, setFilter] = useState('daily');
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [tableSearch, setTableSearch] = useState('');

//   const [stats, setStats] = useState({ totalVisitors: 0, totalVisits: 0, completed: 0, pending: 0 });
//   const [dayWiseChartData, setDayWiseChartData] = useState([]);
//   const [subofficeChartData, setSubofficeChartData] = useState({ labels: [], visitors: [] });
//   const [adminOfficerChartData, setAdminOfficerChartData] = useState({ labels: [], visitors: [], colors: [] }); // नवीन: Administrative Officer wise
//   const [visitTypeData, setVisitTypeData] = useState({ single: 0, repeat: 0 });
//   const [latestVisitors, setLatestVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [suboffice, setSuboffice] = useState(null);

//   useEffect(() => {
//     if (officeid) {
//       axios.get(`${baseUrl}/getSubOfficesBySubofficeId/${officeid}`)
//         .then(res => {
//           if (res.data.success) setSuboffice(res.data.suboffice);
//         })
//         .catch(() => {});
//     }
//   }, [officeid]);

//   const fetchVisitors = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`);
//       if (!res.data.success || !res.data.data?.visitors) return;

//       let visitors = res.data.data.visitors;

//       if (officeid && suboffice) {
//         visitors = visitors.filter(v =>
//           v.officeName === suboffice.subofficeName ||
//           (v.addedByEmail && v.addedByEmail.includes(suboffice.email?.split('@')[0]))
//         );
//       }

//       const now = new Date();
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//       const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
//       const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

//       let filtered = [];

//       if (startDate && endDate) {
//         filtered = visitors.filter(v => v.visits?.some(visit => {
//           const d = new Date(visit.entryAt);
//           return d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999);
//         }));
//       } else {
//         filtered = visitors.filter(v => {
//           if (!v.visits?.length) return false;
//           const lastVisitDate = new Date(v.visits[v.visits.length - 1].entryAt);
//           if (filter === 'daily') return lastVisitDate >= today;
//           if (filter === 'weekly') return lastVisitDate >= weekAgo;
//           return lastVisitDate >= monthAgo;
//         });
//       }

//       const totalVisitorsCount = filtered.length;
//       const totalVisitsCount = filtered.reduce((sum, v) => sum + (v.visits?.length || 0), 0);
//       const completedCount = filtered.filter(v => v.visits?.length > 0 && v.visits[v.visits.length - 1].feedbackGiven).length;
//       const pendingCount = totalVisitorsCount - completedCount;

//       setStats({ totalVisitors: totalVisitorsCount, totalVisits: totalVisitsCount, completed: completedCount, pending: pendingCount });

//       // Visit Type Breakdown
//       const singleCount = filtered.filter(v => (v.visits?.length || 0) === 1).length;
//       const repeatCount = totalVisitorsCount - singleCount;
//       setVisitTypeData({ single: singleCount, repeat: repeatCount });

//       // Day-wise Visitor Count
//       const dayCount = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
//       filtered.forEach(visitor => {
//         visitor.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999)
//             : filter === 'daily' ? d.toDateString() === today.toDateString()
//             : filter === 'weekly' ? d >= weekAgo
//             : d >= monthAgo;

//           if (inRange) {
//             const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
//             if (dayCount.hasOwnProperty(dayName)) dayCount[dayName]++;
//           }
//         });
//       });

//       const orderedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//       const dayWiseValues = orderedDays.map(day => dayCount[day]);
//       setDayWiseChartData(dayWiseValues);

//       // Suboffice wise
//       const officeCount = filtered.reduce((acc, v) => {
//         const office = v.officeName || 'Unknown';
//         acc[office] = (acc[office] || 0) + 1;
//         return acc;
//       }, {});

//       setSubofficeChartData({
//         labels: Object.keys(officeCount).length ? Object.keys(officeCount) : ['No Data'],
//         visitors: Object.values(officeCount)
//       });

//       // नवीन: Administrative Officer wise (ज्याने फॉर्म भरला)
//       const adminOfficerCount = {};
//       filtered.forEach(v => {
//         if (v.addedByRole === "Administrative Officer" && v.officeName) {
//           const key = `${v.officeName}`;
//           adminOfficerCount[key] = (adminOfficerCount[key] || 0) + 1;
//         }
//       });

//       const adminLabels = Object.keys(adminOfficerCount);
//       const adminColors = adminLabels.map((_, i) => `rgba(0, ${64 + i*30}, 185, ${0.7 + i*0.05})`);

//       setAdminOfficerChartData({
//         labels: adminLabels.length ? adminLabels : ['No Data'],
//         visitors: Object.values(adminOfficerCount),
//         colors: adminColors
//       });

//       // Latest Visitors Table
//       const allVisits = [];
//       filtered.forEach(v => {
//         v.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate) && d <= new Date(endDate)
//             : filter === 'daily' ? d >= today : filter === 'weekly' ? d >= weekAgo : d >= monthAgo;
//           if (inRange) {
//             allVisits.push({
//               ...visit,
//               fullName: v.fullName,
//               mobileNumber: v.mobileNumber,
//               addedByRole: v.addedByRole || 'N/A',
//               officeType: v.officeType || 'N/A',
//               officeName: v.officeName || 'N/A'
//             });
//           }
//         });
//       });

//       allVisits.sort((a, b) => new Date(b.entryAt) - new Date(a.entryAt));

//       let displayedVisits = allVisits;
//       if (tableSearch.trim()) {
//         const query = tableSearch.toLowerCase().trim();
//         displayedVisits = allVisits.filter(v =>
//           v.fullName?.toLowerCase().includes(query) ||
//           v.mobileNumber?.includes(tableSearch)
//         );
//       }

//       const finalList = displayedVisits.slice(0, 10).map((v, i) => ({
//         id: i + 1,
//         fullName: v.fullName,
//         mobileNumber: v.mobileNumber,
//         addedByRole: v.addedByRole,
//         officeType: v.officeType,
//         officeName: v.officeName,
//         entryTime: new Date(v.entryAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
//       }));

//       setLatestVisitors(finalList);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filter, startDate, endDate, officeid, suboffice, tableSearch]);

//   useEffect(() => {
//     fetchVisitors();
//     const interval = setInterval(fetchVisitors, 10000);
//     return () => clearInterval(interval);
//   }, [fetchVisitors]);

//   // Charts Config
//   const dayBarConfig = {
//     labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//     datasets: [{
//       label: 'Visitors',
//       data: dayWiseChartData,
//       backgroundColor: 'rgba(0,64,185,0.8)',
//       borderColor: '#0040B9',
//       borderWidth: 2,
//       borderRadius: 8,
//     }]
//   };

//   const barConfig = {
//     labels: subofficeChartData.labels,
//     datasets: [{
//       label: 'Visitors',
//       data: subofficeChartData.visitors,
//       backgroundColor: 'rgba(0,64,185,0.7)',
//       borderColor: '#0040B9',
//       borderWidth: 2,
//       borderRadius: 6
//     }]
//   };

//   // नवीन: Administrative Officer wise Pie Chart
//   const adminOfficerPieConfig = {
//     labels: adminOfficerChartData.labels,
//     datasets: [{
//       data: adminOfficerChartData.visitors,
//       backgroundColor: adminOfficerChartData.colors.length ? adminOfficerChartData.colors : ['#cccccc'],
//       borderColor: '#0040B9',
//       borderWidth: 2,
//     }]
//   };

//   const visitTypePieConfig = {
//     labels: ['Single Visit', 'Repeat Visit'],
//     datasets: [{
//       data: [visitTypeData.single, visitTypeData.repeat],
//       backgroundColor: ['#0040B9', '#00A86B'],
//       borderColor: '#fff',
//       borderWidth: 4,
//     }]
//   };

//   const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } };

//   const getMargin = () => isMobile ? 0 : isSidebarOpen ? '12%' : '2%';

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
//         <CircularProgress size={80} sx={{ color: '#0040B9' }} />
//         <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Live Dashboard...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <div style={{ marginLeft: getMargin(), marginTop: '80px', backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '24px' }}>
//       <Container maxWidth={false}>

//         {/* Header */}
//         {suboffice ? (
//           <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
//             <Typography variant="h3" fontWeight={900} color="#0d2136" mb={1}>
//               {suboffice.subofficeName}
//             </Typography>
//             <Box display="flex" gap={2} mb={3}>
//               <Chip icon={<Business />} label={suboffice.officeType || "Sub Office"} color="primary" />
//               <Chip icon={<LocationOn />} label={suboffice.address?.split(',')[0]} color="secondary" variant="outlined" />
//             </Box>
//             <Typography variant="h6" color="primary" mb={4}>
//               {suboffice.headOfficeId?.officeName || "Thane Rural Police"} Live Dashboard
//             </Typography>
//           </motion.div>
//         ) : (
//           <Typography  sx={{ 
//     textAlign: 'center', 
//     fontWeight: 700,
//     letterSpacing: '0.5px'
//   }} variant="h3" fontWeight={900} color="#0d2136" mb={4}>
//             Thane Rural Police
//           </Typography>
//         )}

//         {/* Tabs + Date Picker */}
//         <Box display="flex" justifyContent="center" gap={3} mb={5}>
//           <Tabs value={filter} onChange={(_,v) => { setFilter(v); setDateRange([null,null]); }} centered>
//             <Tab label="Today" value="daily" />
//             <Tab label="This Week" value="weekly" />
//             <Tab label="This Month" value="monthly" />
//           </Tabs>
//           <Button variant={showDatePicker ? "contained" : "outlined"} startIcon={<CalendarToday />} onClick={() => setShowDatePicker(!showDatePicker)}>
//             {startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Date Range'}
//           </Button>
//         </Box>

//         {showDatePicker && (
//           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//             <Box display="flex" justifyContent="center" mb={4}>
//               <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={(dates) => {
//                     setDateRange(dates);
//                     if (dates[0] && dates[1]) setShowDatePicker(false);
//                   }}
//                   inline
//                   maxDate={new Date()}
//                 />
//                 <Button variant="outlined" fullWidth onClick={() => { setDateRange([null,null]); setShowDatePicker(false); }} sx={{ mt: 2 }}>
//                   Clear
//                 </Button>
//               </Paper>
//             </Box>
//           </motion.div>
//         )}

//         {/* Stats Cards */}
//         <Grid container spacing={4} mb={6}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visitors" value={stats.totalVisitors} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" delay={0} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visits" value={stats.totalVisits} icon={SummarizeOutlined} color="#9C27B0" bgColor="#f3e5f5" delay={0.1} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" delay={0.2} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Pending" value={stats.pending} icon={AccessTime} color="#DC3545" bgColor="#fce7e7" delay={0.3} />
//           </Grid>
//         </Grid>

//         {/* पहिला सेक्शन: Day-wise + Visit Type */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={7}>
//                 <Typography variant="h5" fontWeight={800} mb={3}>
//                   Visitor Trend (Day-wise)
//                 </Typography>
//                 <Box sx={{ height: 260 }}>
//                   <Bar data={dayBarConfig} options={chartOptions} />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={5}>
//                 <Typography variant="h5" fontWeight={800} mb={3} color="#0040B9">
//                   Visit Type Breakdown
//                 </Typography>
//                 <Box sx={{ height: 260, position: 'relative' }}>
//                   <Pie data={visitTypePieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </motion.div>

//         {/* दुसरा सेक्शन: Administrative Officer-wise + Suboffice-wise (एकाच पेपरमध्ये) */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="h5" fontWeight={800} mb={3} color="#0040B9">
//                   Officer-wise Distribution
//                 </Typography>
//                 <Box sx={{ height: 300, position: 'relative' }}>
//                   <Pie data={adminOfficerPieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="h5" fontWeight={800} mb={3}>
//                   Suboffice Wise Visitors
//                 </Typography>
//                 <Box sx={{ height: 300 }}>
//                   <Bar data={barConfig} options={chartOptions} />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </motion.div>

//         {/* Latest Visitors Table */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
//               <Typography variant="h5" fontWeight={800} sx={{ color: '#0d2136' }}>
//                 Latest Visitors (Live)
//               </Typography>
//               <TextField
//                 size="small"
//                 placeholder="Search by name or mobile..."
//                 value={tableSearch}
//                 onChange={(e) => setTableSearch(e.target.value)}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#0040B9' }} /></InputAdornment>,
//                 }}
//                 sx={{
//                   width: { xs: '100%', sm: 320, md: 380 },
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '30px',
//                     backgroundColor: '#fff',
//                     boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//                   },
//                   '& .MuiOutlinedInput-input': { py: 1.2 }
//                 }}
//               />
//             </Box>

//             <Box sx={{ height: 580 }}>
//               <StyledDataGrid
//                 rows={latestVisitors}
//                 columns={[
//                   { field: 'id', headerName: 'No.', width: 80 },
//                   { field: 'fullName', headerName: 'Name', flex: 1, minWidth: 180, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'mobileNumber', headerName: 'Mobile', width: 150, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'addedByRole', headerName: 'Added By Role', width: 180 },
//                   { field: 'officeType', headerName: 'Office Type', width: 150 },
//                   { field: 'officeName', headerName: 'Office', width: 200 },
//                   { field: 'entryTime', headerName: 'Time', width: 120 },
//                 ]}
//                 getRowId={(row) => `${row.id}-${row.entryTime}`}
//                 keepNonExistentRowsSelected
//                 autoHeight={false}
//                 pageSizeOptions={[10]}
//                 disableSelectionOnClick
//                 localeText={{ noRowsLabel: tableSearch ? 'No visitor found' : 'Loading data...' }}
//               />
//             </Box>
//           </Paper>
//         </motion.div>

//       </Container>
//     </div>
//   );
// };

// export default Home;


// ===========================================================


// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import {
//   Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab, Button, Chip,
//   TextField, InputAdornment
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import {
//   PeopleAlt, AssignmentTurnedIn, AccessTime,
//   CalendarToday, LocationOn, Business, SummarizeOutlined, Search as SearchIcon
// } from '@mui/icons-material';
// import { Bar, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement,
//   LineElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement
// } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { motion } from 'framer-motion';

// ChartJS.register(
//   CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement
// );

// // हायलाईट फंक्शन
// const HighlightText = ({ text = '', highlight = '' }) => {
//   if (!highlight.trim()) return <span>{text}</span>;

//   const regex = new RegExp(`(${highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi');
//   const parts = text.split(regex);

//   return (
//     <span>
//       {parts.map((part, i) =>
//         regex.test(part) ? (
//           <mark key={i} style={{ backgroundColor: '#ffeb3b', padding: '0 4px', borderRadius: '4px', fontWeight: 'bold' }}>
//             {part}
//           </mark>
//         ) : (
//           part
//         )
//       )}
//     </span>
//   );
// };

// const StyledDataGrid = styled(DataGrid)({
//   border: 'none',
//   borderRadius: '16px',
//   backgroundColor: 'white',
//   boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '4px solid #0040B9',
//     borderRadius: '16px 16px 0 0',
//     fontWeight: 700,
//   },
//   '& .MuiDataGrid-row:hover': {
//     backgroundColor: '#e3f2fd',
//     transform: 'translateY(-3px)',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   },
// });

// const AnimatedStatsCard = ({ title, value, icon: Icon, color, bgColor, delay }) => (
//   <motion.div whileHover={{ scale: 1.05, y: -10 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
//     <Paper sx={{ p: 4, borderRadius: 5, background: 'white', boxShadow: 5, borderLeft: `6px solid ${color}` }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
//           <Typography variant="h3" fontWeight="bold" color={color} mt={1}>{value.toLocaleString()}</Typography>
//         </Box>
//         <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <Icon sx={{ fontSize: 40, color }} />
//         </Box>
//       </Box>
//     </Paper>
//   </motion.div>
// );

// const Home = () => {
//   const { officeid } = useParams();
//   const isMobile = window.innerWidth < 768;
//   const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

//   const [filter, setFilter] = useState('daily');
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [tableSearch, setTableSearch] = useState('');

//   const [stats, setStats] = useState({ totalVisitors: 0, totalVisits: 0, completed: 0, pending: 0 });
//   const [dayWiseChartData, setDayWiseChartData] = useState([]);
//   const [subofficeChartData, setSubofficeChartData] = useState({ labels: [], visitors: [] });
//   const [adminOfficerChartData, setAdminOfficerChartData] = useState({ labels: [], visitors: [], colors: [] });
//   const [visitTypeData, setVisitTypeData] = useState({ single: 0, repeat: 0 });
//   const [latestVisitors, setLatestVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [suboffice, setSuboffice] = useState(null);

//   const isFirstLoad = useRef(true);

//   useEffect(() => {
//     if (officeid) {
//       axios.get(`${baseUrl}/getSubOfficesBySubofficeId/${officeid}`)
//         .then(res => {
//           if (res.data.success) setSuboffice(res.data.suboffice);
//         })
//         .catch(() => {});
//     }
//   }, [officeid]);

//   const fetchVisitors = useCallback(async () => {
//     if (isFirstLoad.current) {
//       setLoading(true);
//     }

//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`);
//       if (!res.data.success || !res.data.data?.visitors) return;

//       let visitors = res.data.data.visitors;

//       if (officeid && suboffice) {
//         visitors = visitors.filter(v =>
//           v.officeName === suboffice.subofficeName ||
//           (v.addedByEmail && v.addedByEmail.includes(suboffice.email?.split('@')[0]))
//         );
//       }

//       const now = new Date();
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//       const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
//       const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

//       let filtered = [];

//       if (startDate && endDate) {
//         filtered = visitors.filter(v => v.visits?.some(visit => {
//           const d = new Date(visit.entryAt);
//           return d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999);
//         }));
//       } else {
//         filtered = visitors.filter(v => {
//           if (!v.visits?.length) return false;
//           const lastVisitDate = new Date(v.visits[v.visits.length - 1].entryAt);
//           if (filter === 'daily') return lastVisitDate >= today;
//           if (filter === 'weekly') return lastVisitDate >= weekAgo;
//           return lastVisitDate >= monthAgo;
//         });
//       }

//       const totalVisitorsCount = filtered.length;
//       const totalVisitsCount = filtered.reduce((sum, v) => sum + (v.visits?.length || 0), 0);
//       const completedCount = filtered.filter(v => v.visits?.length > 0 && v.visits[v.visits.length - 1].feedbackGiven).length;
//       const pendingCount = totalVisitorsCount - completedCount;

//       setStats({ totalVisitors: totalVisitorsCount, totalVisits: totalVisitsCount, completed: completedCount, pending: pendingCount });

//       const singleCount = filtered.filter(v => (v.visits?.length || 0) === 1).length;
//       const repeatCount = totalVisitorsCount - singleCount;
//       setVisitTypeData({ single: singleCount, repeat: repeatCount });

//       const dayCount = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
//       filtered.forEach(visitor => {
//         visitor.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999)
//             : filter === 'daily' ? d.toDateString() === today.toDateString()
//             : filter === 'weekly' ? d >= weekAgo
//             : d >= monthAgo;

//           if (inRange) {
//             const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
//             if (dayCount.hasOwnProperty(dayName)) dayCount[dayName]++;
//           }
//         });
//       });

//       const orderedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//       const dayWiseValues = orderedDays.map(day => dayCount[day]);
//       setDayWiseChartData(dayWiseValues);

//       const officeCount = filtered.reduce((acc, v) => {
//         const office = v.officeName || 'Unknown';
//         acc[office] = (acc[office] || 0) + 1;
//         return acc;
//       }, {});

//       setSubofficeChartData({
//         labels: Object.keys(officeCount).length ? Object.keys(officeCount) : ['No Data'],
//         visitors: Object.values(officeCount)
//       });

//       const adminOfficerCount = {};
//       filtered.forEach(v => {
//         if (v.addedByRole === "Administrative Officer" && v.officeName) {
//           const key = `${v.officeName}`;
//           adminOfficerCount[key] = (adminOfficerCount[key] || 0) + 1;
//         }
//       });

//       const adminLabels = Object.keys(adminOfficerCount);
//       const adminColors = adminLabels.map((_, i) => `rgba(0, ${64 + i*30}, 185, ${0.7 + i*0.05})`);

//       setAdminOfficerChartData({
//         labels: adminLabels.length ? adminLabels : ['No Data'],
//         visitors: Object.values(adminOfficerCount),
//         colors: adminColors
//       });

//       const allVisits = [];
//       filtered.forEach(v => {
//         v.visits.forEach(visit => {
//           const d = new Date(visit.entryAt);
//           const inRange = (startDate && endDate)
//             ? d >= new Date(startDate) && d <= new Date(endDate)
//             : filter === 'daily' ? d >= today : filter === 'weekly' ? d >= weekAgo : d >= monthAgo;
//           if (inRange) {
//             allVisits.push({
//               ...visit,
//               fullName: v.fullName,
//               mobileNumber: v.mobileNumber,
//               addedByRole: v.addedByRole || 'N/A',
//               officeType: v.officeType || 'N/A',
//               officeName: v.officeName || 'N/A'
//             });
//           }
//         });
//       });

//       allVisits.sort((a, b) => new Date(b.entryAt) - new Date(a.entryAt));

//       let displayedVisits = allVisits;
//       if (tableSearch.trim()) {
//         const query = tableSearch.toLowerCase().trim();
//         displayedVisits = allVisits.filter(v =>
//           v.fullName?.toLowerCase().includes(query) ||
//           v.mobileNumber?.includes(tableSearch)
//         );
//       }

//       const finalList = displayedVisits.slice(0, 10).map((v, i) => ({
//         id: i + 1,
//         fullName: v.fullName,
//         mobileNumber: v.mobileNumber,
//         addedByRole: v.addedByRole,
//         officeType: v.officeType,
//         officeName: v.officeName,
//         entryTime: new Date(v.entryAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
//       }));

//       setLatestVisitors(finalList);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       if (isFirstLoad.current) {
//         setLoading(false);
//         isFirstLoad.current = false;
//       }
//     }
//   }, [filter, startDate, endDate, officeid, suboffice]); // tableSearch काढली

//   useEffect(() => {
//     fetchVisitors();
//     const interval = setInterval(fetchVisitors, 30000); // 30 सेकंद (overload टाळण्यासाठी)
//     return () => clearInterval(interval);
//   }, [fetchVisitors]);

//   // Charts Config
//   const dayBarConfig = {
//     labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//     datasets: [{
//       label: 'Visitors',
//       data: dayWiseChartData,
//       backgroundColor: 'rgba(0,64,185,0.8)',
//       borderColor: '#0040B9',
//       borderWidth: 2,
//       borderRadius: 8,
//     }]
//   };

//   const barConfig = {
//     labels: subofficeChartData.labels,
//     datasets: [{
//       label: 'Visitors',
//       data: subofficeChartData.visitors,
//       backgroundColor: 'rgba(0,64,185,0.7)',
//       borderColor: '#0040B9',
//       borderWidth: 2,
//       borderRadius: 6
//     }]
//   };

//   const adminOfficerPieConfig = {
//     labels: adminOfficerChartData.labels,
//     datasets: [{
//       data: adminOfficerChartData.visitors,
//       backgroundColor: adminOfficerChartData.colors.length ? adminOfficerChartData.colors : ['#cccccc'],
//       borderColor: '#0040B9',
//       borderWidth: 2,
//     }]
//   };

//   const visitTypePieConfig = {
//     labels: ['Single Visit', 'Repeat Visit'],
//     datasets: [{
//       data: [visitTypeData.single, visitTypeData.repeat],
//       backgroundColor: ['#0040B9', '#00A86B'],
//       borderColor: '#fff',
//       borderWidth: 4,
//     }]
//   };

//   const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } };

//   const getMargin = () => isMobile ? 0 : isSidebarOpen ? '14%' : '2%';

//   if (loading && isFirstLoad.current) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
//         <CircularProgress size={80} sx={{ color: '#0040B9' }} />
//         <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Live Dashboard...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <div style={{ marginLeft: getMargin(), marginTop: '30px', backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '24px' }}>
//       <Container maxWidth={false}>

//         {/* Header */}
//         {suboffice ? (
//           <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
//             <Typography variant="h3" fontWeight={900} color="#0d2136" mb={1}>
//               {suboffice.subofficeName}
//             </Typography>
//             <Box display="flex" gap={2} mb={3}>
//               <Chip icon={<Business />} label={suboffice.officeType || "Sub Office"} color="primary" />
//               <Chip icon={<LocationOn />} label={suboffice.address?.split(',')[0]} color="secondary" variant="outlined" />
//             </Box>
//             <Typography variant="h6" color="primary" mb={4}>
//               {suboffice.headOfficeId?.officeName || "Thane Rural Police"} Live Dashboard
//             </Typography>
//           </motion.div>
//         ) : (
//           <Typography sx={{ 
//             textAlign: 'center', 
//             fontWeight: 700,
//             letterSpacing: '0.5px'
//           }} variant="h3" fontWeight={900} color="#0d2136" mb={4}>
//             Thane Rural Police
//           </Typography>
//         )}

//         {/* Tabs + Date Picker */}
//         {/* <Box display="flex" justifyContent="center" gap={3} mb={5}>
//           <Tabs value={filter} onChange={(_,v) => { setFilter(v); setDateRange([null,null]); }} centered>
//             <Tab label="Today" value="daily" />
//             <Tab label="This Week" value="weekly" />
//             <Tab label="This Month" value="monthly" />
//           </Tabs>
//           <Button variant={showDatePicker ? "contained" : "outlined"} startIcon={<CalendarToday />} onClick={() => setShowDatePicker(!showDatePicker)}>
//             {startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Date Range'}
//           </Button>
//         </Box> */}

//         <Box 
//   display="flex" 
//   justifyContent="center" 
//   alignItems="center" 
//   gap={{ xs: 2, sm: 3 }} 
//   mb={5}
//   sx={{
//     overflowX: { xs: 'auto', sm: 'visible' },     // mobile वर scroll
//     flexWrap: 'nowrap',                           // एक लाइनमध्ये राहील
//     pb: { xs: '10px', sm: 0 },                    // scroll बार साठी जागा (indicator साठी)
//     scrollbarWidth: 'thin',                       // Firefox साठी thin scroll
//     '&::-webkit-scrollbar': {
//       height: '6px',
//     },
//     '&::-webkit-scrollbar-thumb': {
//       backgroundColor: '#0040B9',
//       borderRadius: '10px',
//     },
//     '& .MuiTabs-flexContainer': {
//       justifyContent: { xs: 'flex-start', sm: 'center' }, // mobile वर left align → scroll natural
//     },
//   }}
// >
//   <Tabs 
//     value={filter} 
//     onChange={(_, v) => { setFilter(v); setDateRange([null, null]); }} 
//     variant="scrollable"
//     scrollButtons={false}                 // arrows बंद (clean look साठी, swipe ने चालेल)
//     aria-label="visitor filter tabs"
//     sx={{
//       minHeight: '48px',
//       '& .MuiTabs-indicator': {
//         height: '4px',
//         borderRadius: '2px',
//         backgroundColor: '#0040B9',
//       },
//       '& .MuiTab-root': {
//         minWidth: { xs: '100px', sm: '120px' },     // minimum width → text cut होणार नाही
//         maxWidth: 'none',
//         padding: { xs: '12px 16px', sm: '12px 24px' },
//         fontSize: { xs: '0.875rem', sm: '1rem' },   // मोठा फॉन्ट → neat दिसेल
//         fontWeight: 600,
//         textTransform: 'none',
//         color: '#333',
//         opacity: 0.7,
//         whiteSpace: 'nowrap',
//         '&.Mui-selected': {
//           color: '#0040B9',
//           opacity: 1,
//           fontWeight: 700,
//         },
//       },
//     }}
//   >
//     <Tab label="Today" value="daily" />
//     <Tab label="This Week" value="weekly" />
//     <Tab label="This Month" value="monthly" />
//   </Tabs>

//   {/* Date Range Button */}
//   <Button 
//     variant={showDatePicker ? "contained" : "outlined"} 
//     startIcon={<CalendarToday />}
//     onClick={() => setShowDatePicker(!showDatePicker)}
//     sx={{
//       whiteSpace: 'nowrap',
//       minWidth: { xs: '130px', sm: 'auto' },
//       ml: { xs: 2, sm: 3 },                  // Tabs आणि button मध्ये gap
//       fontSize: { xs: '0.875rem', sm: '1rem' },
//       py: 1.2,
//     }}
//   >
//     {startDate && endDate 
//       ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
//       : 'Date Range'
//     }
//   </Button>
// </Box>

//         {showDatePicker && (
//           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//             <Box display="flex" justifyContent="center" mb={4}>
//               <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={(dates) => {
//                     setDateRange(dates);
//                     if (dates[0] && dates[1]) setShowDatePicker(false);
//                   }}
//                   inline
//                   maxDate={new Date()}
//                 />
//                 <Button variant="outlined" fullWidth onClick={() => { setDateRange([null,null]); setShowDatePicker(false); }} sx={{ mt: 2 }}>
//                   Clear
//                 </Button>
//               </Paper>
//             </Box>
//           </motion.div>
//         )}

//         {/* Stats Cards */}
//         <Grid container spacing={4} mb={6}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visitors" value={stats.totalVisitors} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" delay={0} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Total Visits" value={stats.totalVisits} icon={SummarizeOutlined} color="#9C27B0" bgColor="#f3e5f5" delay={0.1} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" delay={0.2} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AnimatedStatsCard title="Pending" value={stats.pending} icon={AccessTime} color="#DC3545" bgColor="#fce7e7" delay={0.3} />
//           </Grid>
//         </Grid>

//         {/* पहिला सेक्शन: Day-wise + Visit Type */}
//         {/* <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={7}>
//                 <Typography variant="h5" fontWeight={800} mb={3}>
//                   Visitor Trend (Day-wise)
//                 </Typography>
//                 <Box sx={{ height: 260 }}>
//                   <Bar data={dayBarConfig} options={chartOptions} />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={5}>
//                 <Typography variant="h5" fontWeight={800} mb={3} color="#0040B9">
//                   Visit Type Breakdown
//                 </Typography>
//                 <Box sx={{ height: 260, position: 'relative' }}>
//                   <Pie data={visitTypePieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </motion.div> */}

//         {/* दुसरा सेक्शन: Administrative Officer-wise + Suboffice-wise */}
//         {/* <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5, mb: 6 }}>
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="h5" fontWeight={800} mb={3} color="#0040B9">
//                   Officer-wise Distribution
//                 </Typography>
//                 <Box sx={{ height: 300, position: 'relative' }}>
//                   <Pie data={adminOfficerPieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="h5" fontWeight={800} mb={3}>
//                   Suboffice Wise Visitors
//                 </Typography>
//                 <Box sx={{ height: 300 }}>
//                   <Bar data={barConfig} options={chartOptions} />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </motion.div> */}



// {/* 4 Charts in 2 Rows - Each in Separate Box with Gap */}

// {/* ------------------------------------------------------ */}

// {/* <Grid container spacing={4} mb={6}>

//   <Grid item xs={12} md={6}>
//     <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//       <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, bgcolor: '#F0F4F8', height: '100%' }}>
//         <Typography variant="h5" fontWeight={800} mb={2} color="#0d2136">
//           Visitor Trend (Day-wise)
//         </Typography>
//         <Box sx={{ height: { xs: 260, md: 300 }, bgcolor: 'white', borderRadius: 3, p: 2 }}>
//           <Bar data={dayBarConfig} options={chartOptions} />
//         </Box>
//       </Paper>
//     </motion.div>
//   </Grid>

//   <Grid item xs={12} md={6}>
//     <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
//       <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, bgcolor: '#F0F4F8', height: '100%' }}>
//         <Typography variant="h5" fontWeight={800} mb={2} color="#0040B9">
//           Visit Type Breakdown
//         </Typography>
//         <Box sx={{ height: { xs: 260, md: 300 }, bgcolor: 'white', borderRadius: 3, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <Pie data={visitTypePieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
//         </Box>
//       </Paper>
//     </motion.div>
//   </Grid>

  
//   <Grid item xs={12} md={6}>
//     <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
//       <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, bgcolor: '#F0F4F8', height: '100%' }}>
//         <Typography variant="h5" fontWeight={800} mb={2} color="#0040B9">
//           Officer-wise Distribution
//         </Typography>
//         <Box sx={{ height: { xs: 280, md: 320 }, bgcolor: 'white', borderRadius: 3, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <Pie data={adminOfficerPieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
//         </Box>
//       </Paper>
//     </motion.div>
//   </Grid>

//   <Grid item xs={12} md={6}>
//     <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
//       <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, bgcolor: '#F0F4F8', height: '100%' }}>
//         <Typography variant="h5" fontWeight={800} mb={2} color="#0d2136">
//           Suboffice Wise Visitors
//         </Typography>
//         <Box sx={{ height: { xs: 280, md: 320 }, bgcolor: 'white', borderRadius: 3, p: 2 }}>
//           <Bar data={barConfig} options={chartOptions} />
//         </Box>
//       </Paper>
//     </motion.div>
//   </Grid>
// </Grid> */}

// {/* ---------------------------------------------------- */}

// {/* 4 Charts in 2 Rows - Each in Separate Box with Multi-Color Bars */}
// <Grid container spacing={4} mb={6}>
//   {/* First Row: Day-wise + Visit Type */}
//   <Grid item xs={12} md={6}>
//     <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//       <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, bgcolor: '#F0F4F8', height: '100%' }}>
//         <Typography variant="h5" fontWeight={800} mb={2} color="#0d2136">
//           Visitor Trend (Day-wise)
//         </Typography>
//         <Box sx={{ height: { xs: 260, md: 300 }, bgcolor: 'white', borderRadius: 3, p: 2 }}>
//           <Bar 
//             data={{
//               labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//               datasets: [{
//                 label: 'Visitors',
//                 data: dayWiseChartData,
//                 backgroundColor: [
//                   '#0040B9',  // Monday
//                   '#9C27B0',  // Tuesday
//                   '#FFE8E9',  // Wednesday
//                   '#90CAF9',  // Thursday
//                   '#0040B9',  // Friday
//                   '#00A86B',  // Saturday - Green
//                   '#FF8F00',  // Sunday - Orange
//                 ],
//                 borderColor: '#0040B9',
//                 borderWidth: 2,
//                 borderRadius: 8,
//               }]
//             }} 
//             options={chartOptions} 
//           />
//         </Box>
//       </Paper>
//     </motion.div>
//   </Grid>

//   <Grid item xs={12} md={6}>
//     <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
//       <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, bgcolor: '#F0F4F8', height: '100%' }}>
//         <Typography variant="h5" fontWeight={800} mb={2} color="#0040B9">
//           Visit Type Breakdown
//         </Typography>
//         <Box sx={{ height: { xs: 260, md: 300 }, bgcolor: 'white', borderRadius: 3, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <Pie data={visitTypePieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
//         </Box>
//       </Paper>
//     </motion.div>
//   </Grid>

//   {/* Second Row: Officer-wise + Suboffice-wise */}
//   <Grid item xs={12} md={6}>
//     <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
//       <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, bgcolor: '#F0F4F8', height: '100%' }}>
//         <Typography variant="h5" fontWeight={800} mb={2} color="#0040B9">
//           Officer-wise Distribution
//         </Typography>
//         <Box sx={{ height: { xs: 280, md: 320 }, bgcolor: 'white', borderRadius: 3, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <Pie data={adminOfficerPieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
//         </Box>
//       </Paper>
//     </motion.div>
//   </Grid>

//   <Grid item xs={12} md={6}>
//     <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
//       <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, bgcolor: '#F0F4F8', height: '100%' }}>
//         <Typography variant="h5" fontWeight={800} mb={2} color="#0d2136">
//           Suboffice Wise Visitors
//         </Typography>
//         <Box sx={{ height: { xs: 280, md: 320 }, bgcolor: 'white', borderRadius: 3, p: 2 }}>
//           <Bar 
//             data={{
//               labels: subofficeChartData.labels,
//               datasets: [{
//                 label: 'Visitors',
//                 data: subofficeChartData.visitors,
//                 backgroundColor: subofficeChartData.labels.length 
//                   ? subofficeChartData.labels.map((_, i) => {
//                       const colors = ['#0040B9', '#9C27B0', '#FFE8E9', '#90CAF9', '#00A86B', '#FF8F00', '#7B1FA2', '#E91E63', '#26A69A'];
//                       return colors[i % colors.length];
//                     })
//                   : ['#cccccc'],
//                 borderColor: '#0040B9',
//                 borderWidth: 2,
//                 borderRadius: 6,
//               }]
//             }} 
//             options={chartOptions} 
//           />
//         </Box>
//       </Paper>
//     </motion.div>
//   </Grid>
// </Grid>


//         {/* Latest Visitors Table */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
//           <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
//               <Typography variant="h5" fontWeight={800} sx={{ color: '#0d2136' }}>
//                 Latest Visitors (Live)
//               </Typography>
//               <TextField
//                 size="small"
//                 placeholder="Search by name or mobile..."
//                 value={tableSearch}
//                 onChange={(e) => setTableSearch(e.target.value)}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#0040B9' }} /></InputAdornment>,
//                 }}
//                 sx={{
//                   width: { xs: '100%', sm: 320, md: 380 },
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '30px',
//                     backgroundColor: '#fff',
//                     boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//                   },
//                   '& .MuiOutlinedInput-input': { py: 1.2 }
//                 }}
//               />
//             </Box>

//             <Box sx={{ height: 580 }}>
//               <StyledDataGrid
//                 rows={latestVisitors}
//                 columns={[
//                   { field: 'id', headerName: 'No.', width: 80 },
//                   { field: 'fullName', headerName: 'Name', flex: 1, minWidth: 180, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'mobileNumber', headerName: 'Mobile', width: 150, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
//                   { field: 'addedByRole', headerName: 'Added By Role', width: 180 },
//                   { field: 'officeType', headerName: 'Office Type', width: 150 },
//                   { field: 'officeName', headerName: 'Office', width: 200 },
//                   { field: 'entryTime', headerName: 'Time', width: 120 },
//                 ]}
//                 getRowId={(row) => `${row.id}-${row.entryTime}`}
//                 keepNonExistentRowsSelected
//                 autoHeight={false}
//                 pageSizeOptions={[10]}
//                 disableSelectionOnClick
//                 localeText={{ noRowsLabel: tableSearch ? 'No visitor found' : 'Loading data...' }}
//               />
//             </Box>
//           </Paper>
//         </motion.div>

//       </Container>
//     </div>
//   );
// };

// export default Home;

// ====================================


import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab, Button, Chip,
  TextField, InputAdornment
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { baseUrl } from '../config/config';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  PeopleAlt, AssignmentTurnedIn, AccessTime,
  CalendarToday, LocationOn, Business, SummarizeOutlined, Search as SearchIcon
} from '@mui/icons-material';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement
} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement
);

// हायलाईट फंक्शन
const HighlightText = ({ text = '', highlight = '' }) => {
  if (!highlight.trim()) return <span>{text}</span>;

  const regex = new RegExp(`(${highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} style={{ backgroundColor: '#ffeb3b', padding: '0 4px', borderRadius: '4px', fontWeight: 'bold' }}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

const StyledDataGrid = styled(DataGrid)({
  border: 'none',
  borderRadius: '16px',
  backgroundColor: 'white',
  boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#f8f9fa',
    borderBottom: '4px solid #0040B9',
    borderRadius: '16px 16px 0 0',
    fontWeight: 700,
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#e3f2fd',
    transform: 'translateY(-3px)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
});

const AnimatedStatsCard = ({ title, value, icon: Icon, color, bgColor, delay }) => (
  <motion.div whileHover={{ scale: 1.05, y: -10 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
    <Paper sx={{ p: 4, borderRadius: 5, background: 'white', boxShadow: 5, borderLeft: `6px solid ${color}` }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
          <Typography variant="h3" fontWeight="bold" color={color} mt={1}>{value.toLocaleString()}</Typography>
        </Box>
        <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon sx={{ fontSize: 40, color }} />
        </Box>
      </Box>
    </Paper>
  </motion.div>
);

const Home = () => {
  const { officeid } = useParams();
  const isMobile = window.innerWidth < 768;
  const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

  const [filter, setFilter] = useState('daily');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tableSearch, setTableSearch] = useState('');

  const [stats, setStats] = useState({ totalVisitors: 0, totalVisits: 0, completed: 0, pending: 0 });
  const [dayWiseChartData, setDayWiseChartData] = useState([]);
  const [subofficeChartData, setSubofficeChartData] = useState({ labels: [], visitors: [] });
  const [adminOfficerChartData, setAdminOfficerChartData] = useState({ labels: [], visitors: [], colors: [] });
  const [visitTypeData, setVisitTypeData] = useState({ single: 0, repeat: 0 });
  const [latestVisitors, setLatestVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suboffice, setSuboffice] = useState(null);

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (officeid) {
      axios.get(`${baseUrl}/getSubOfficesBySubofficeId/${officeid}`)
        .then(res => {
          if (res.data.success) setSuboffice(res.data.suboffice);
        })
        .catch(() => {});
    }
  }, [officeid]);

  const fetchVisitors = useCallback(async () => {
    if (isFirstLoad.current) {
      setLoading(true);
    }

    try {
      const res = await axios.get(`${baseUrl}/allVisitors`);
      if (!res.data.success || !res.data.data?.visitors) return;

      let visitors = res.data.data.visitors;

      if (officeid && suboffice) {
        visitors = visitors.filter(v =>
          v.officeName === suboffice.subofficeName ||
          (v.addedByEmail && v.addedByEmail.includes(suboffice.email?.split('@')[0]))
        );
      }

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
      const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

      let filtered = [];

      if (startDate && endDate) {
        filtered = visitors.filter(v => v.visits?.some(visit => {
          const d = new Date(visit.entryAt);
          return d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999);
        }));
      } else {
        filtered = visitors.filter(v => {
          if (!v.visits?.length) return false;
          const lastVisitDate = new Date(v.visits[v.visits.length - 1].entryAt);
          if (filter === 'daily') return lastVisitDate >= today;
          if (filter === 'weekly') return lastVisitDate >= weekAgo;
          return lastVisitDate >= monthAgo;
        });
      }

      const totalVisitorsCount = filtered.length;
      const totalVisitsCount = filtered.reduce((sum, v) => sum + (v.visits?.length || 0), 0);
      const completedCount = filtered.filter(v => v.visits?.length > 0 && v.visits[v.visits.length - 1].feedbackGiven).length;
      const pendingCount = totalVisitorsCount - completedCount;

      setStats({ totalVisitors: totalVisitorsCount, totalVisits: totalVisitsCount, completed: completedCount, pending: pendingCount });

      const singleCount = filtered.filter(v => (v.visits?.length || 0) === 1).length;
      const repeatCount = totalVisitorsCount - singleCount;
      setVisitTypeData({ single: singleCount, repeat: repeatCount });

      const dayCount = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
      filtered.forEach(visitor => {
        visitor.visits.forEach(visit => {
          const d = new Date(visit.entryAt);
          const inRange = (startDate && endDate)
            ? d >= new Date(startDate).setHours(0,0,0,0) && d <= new Date(endDate).setHours(23,59,59,999)
            : filter === 'daily' ? d.toDateString() === today.toDateString()
            : filter === 'weekly' ? d >= weekAgo
            : d >= monthAgo;

          if (inRange) {
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
            if (dayCount.hasOwnProperty(dayName)) dayCount[dayName]++;
          }
        });
      });

      const orderedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const dayWiseValues = orderedDays.map(day => dayCount[day]);
      setDayWiseChartData(dayWiseValues);

      const officeCount = filtered.reduce((acc, v) => {
        const office = v.officeName || 'Unknown';
        acc[office] = (acc[office] || 0) + 1;
        return acc;
      }, {});

      setSubofficeChartData({
        labels: Object.keys(officeCount).length ? Object.keys(officeCount) : ['No Data'],
        visitors: Object.values(officeCount)
      });

      const adminOfficerCount = {};
      filtered.forEach(v => {
        if (v.addedByRole === "Administrative Officer" && v.officeName) {
          const key = `${v.officeName}`;
          adminOfficerCount[key] = (adminOfficerCount[key] || 0) + 1;
        }
      });

      const adminLabels = Object.keys(adminOfficerCount);
      const adminColors = adminLabels.map((_, i) => `rgba(0, ${64 + i*30}, 185, ${0.7 + i*0.05})`);

      setAdminOfficerChartData({
        labels: adminLabels.length ? adminLabels : ['No Data'],
        visitors: Object.values(adminOfficerCount),
        colors: adminColors
      });

      const allVisits = [];
      filtered.forEach(v => {
        v.visits.forEach(visit => {
          const d = new Date(visit.entryAt);
          const inRange = (startDate && endDate)
            ? d >= new Date(startDate) && d <= new Date(endDate)
            : filter === 'daily' ? d >= today : filter === 'weekly' ? d >= weekAgo : d >= monthAgo;
          if (inRange) {
            allVisits.push({
              ...visit,
              fullName: v.fullName,
              mobileNumber: v.mobileNumber,
              addedByRole: v.addedByRole || 'N/A',
              officeType: v.officeType || 'N/A',
              officeName: v.officeName || 'N/A'
            });
          }
        });
      });

      allVisits.sort((a, b) => new Date(b.entryAt) - new Date(a.entryAt));

      let displayedVisits = allVisits;
      if (tableSearch.trim()) {
        const query = tableSearch.toLowerCase().trim();
        displayedVisits = allVisits.filter(v =>
          v.fullName?.toLowerCase().includes(query) ||
          v.mobileNumber?.includes(tableSearch)
        );
      }

      const finalList = displayedVisits.slice(0, 10).map((v, i) => ({
        id: i + 1,
        fullName: v.fullName,
        mobileNumber: v.mobileNumber,
        addedByRole: v.addedByRole,
        officeType: v.officeType,
        officeName: v.officeName,
        entryTime: new Date(v.entryAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      }));

      setLatestVisitors(finalList);

    } catch (err) {
      console.error(err);
    } finally {
      if (isFirstLoad.current) {
        setLoading(false);
        isFirstLoad.current = false;
      }
    }
  }, [filter, startDate, endDate, officeid, suboffice]);

  useEffect(() => {
    fetchVisitors();
    const interval = setInterval(fetchVisitors, 30000);
    return () => clearInterval(interval);
  }, [fetchVisitors]);

  // Charts Config
  const dayBarConfig = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [{
      label: 'Visitors',
      data: dayWiseChartData,
      backgroundColor: [
        '#0040B9', '#9C27B0', '#FFE8E9', '#90CAF9', '#0040B9', '#00A86B', '#FF8F00'
      ],
      borderColor: '#0040B9',
      borderWidth: 2,
      borderRadius: 8,
    }]
  };

  const barConfig = {
    labels: subofficeChartData.labels,
    datasets: [{
      label: 'Visitors',
      data: subofficeChartData.visitors,
      backgroundColor: subofficeChartData.labels.length 
        ? subofficeChartData.labels.map((_, i) => {
            const colors = ['#0040B9', '#9C27B0', '#FFE8E9', '#90CAF9', '#00A86B', '#FF8F00', '#7B1FA2', '#E91E63', '#26A69A'];
            return colors[i % colors.length];
          })
        : ['#cccccc'],
      borderColor: '#0040B9',
      borderWidth: 2,
      borderRadius: 6
    }]
  };

  const adminOfficerPieConfig = {
    labels: adminOfficerChartData.labels,
    datasets: [{
      data: adminOfficerChartData.visitors,
      backgroundColor: adminOfficerChartData.colors.length ? adminOfficerChartData.colors : ['#cccccc'],
      borderColor: '#0040B9',
      borderWidth: 2,
    }]
  };

  const visitTypePieConfig = {
    labels: ['Single Visit', 'Repeat Visit'],
    datasets: [{
      data: [visitTypeData.single, visitTypeData.repeat],
      backgroundColor: ['#0040B9', '#00A86B'],
      borderColor: '#fff',
      borderWidth: 4,
    }]
  };

  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } };

  if (loading && isFirstLoad.current) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
        <CircularProgress size={80} sx={{ color: '#0040B9' }} />
        <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Live Dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: '#f0f4f8',
        minHeight: '100vh',
        ml: { xs: 0, sm: isSidebarOpen ? '280px' : '72px' }, // matches your drawer width
        transition: 'margin-left 0.3s ease',
        pt: { xs: 10, sm: 12 }, // space for AppBar
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        {suboffice ? (
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
            <Typography variant="h3" fontWeight={900} color="#0d2136" mb={1} textAlign={{ xs: 'center', md: 'left' }}>
              {suboffice.subofficeName}
            </Typography>
            <Box display="flex" gap={2} mb={3} justifyContent={{ xs: 'center', md: 'flex-start' }} flexWrap="wrap">
              <Chip icon={<Business />} label={suboffice.officeType || "Sub Office"} color="primary" />
              <Chip icon={<LocationOn />} label={suboffice.address?.split(',')[0]} color="secondary" variant="outlined" />
            </Box>
            <Typography variant="h6" color="primary" mb={4} textAlign={{ xs: 'center', md: 'left' }}>
              {suboffice.headOfficeId?.officeName || "Thane Rural Police"} Live Dashboard
            </Typography>
          </motion.div>
        ) : (
          <Typography sx={{ 
            textAlign: 'center', 
            fontWeight: 700,
            letterSpacing: '0.5px'
          }} variant="h3" fontWeight={900} color="#0d2136" mb={4}>
            Thane Rural Police
          </Typography>
        )}

        {/* Tabs + Date Picker */}
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          gap={{ xs: 2, sm: 3 }} 
          mb={5}
          sx={{
            overflowX: { xs: 'auto', sm: 'visible' },
            flexWrap: 'nowrap',
            pb: { xs: '10px', sm: 0 },
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#0040B9',
              borderRadius: '10px',
            },
            '& .MuiTabs-flexContainer': {
              justifyContent: { xs: 'flex-start', sm: 'center' },
            },
          }}
        >
          <Tabs 
            value={filter} 
            onChange={(_, v) => { setFilter(v); setDateRange([null, null]); }} 
            variant="scrollable"
            scrollButtons={false}
            aria-label="visitor filter tabs"
            sx={{
              minHeight: '48px',
              '& .MuiTabs-indicator': {
                height: '4px',
                borderRadius: '2px',
                backgroundColor: '#0040B9',
              },
              '& .MuiTab-root': {
                minWidth: { xs: '100px', sm: '120px' },
                maxWidth: 'none',
                padding: { xs: '12px 16px', sm: '12px 24px' },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                fontWeight: 600,
                textTransform: 'none',
                color: '#333',
                opacity: 0.7,
                whiteSpace: 'nowrap',
                '&.Mui-selected': {
                  color: '#0040B9',
                  opacity: 1,
                  fontWeight: 700,
                },
              },
            }}
          >
            <Tab label="Today" value="daily" />
            <Tab label="This Week" value="weekly" />
            <Tab label="This Month" value="monthly" />
          </Tabs>

          <Button 
            variant={showDatePicker ? "contained" : "outlined"} 
            startIcon={<CalendarToday />}
            onClick={() => setShowDatePicker(!showDatePicker)}
            sx={{
              whiteSpace: 'nowrap',
              minWidth: { xs: '130px', sm: 'auto' },
              ml: { xs: 2, sm: 3 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              py: 1.2,
            }}
          >
            {startDate && endDate 
              ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
              : 'Date Range'
            }
          </Button>
        </Box>

        {showDatePicker && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <Box display="flex" justifyContent="center" mb={4}>
              <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(dates) => {
                    setDateRange(dates);
                    if (dates[0] && dates[1]) setShowDatePicker(false);
                  }}
                  inline
                  maxDate={new Date()}
                />
                <Button variant="outlined" fullWidth onClick={() => { setDateRange([null,null]); setShowDatePicker(false); }} sx={{ mt: 2 }}>
                  Clear
                </Button>
              </Paper>
            </Box>
          </motion.div>
        )}

        {/* Stats Cards */}
        <Grid container spacing={4} mb={6} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <AnimatedStatsCard title="Total Visitors" value={stats.totalVisitors} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" delay={0} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnimatedStatsCard title="Total Visits" value={stats.totalVisits} icon={SummarizeOutlined} color="#9C27B0" bgColor="#f3e5f5" delay={0.1} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnimatedStatsCard title="Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" delay={0.2} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnimatedStatsCard title="Pending" value={stats.pending} icon={AccessTime} color="#DC3545" bgColor="#fce7e7" delay={0.3} />
          </Grid>
        </Grid>

        {/* 4 Charts in 2 Rows */}
        <Grid container spacing={4} mb={6}>
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, bgcolor: '#F0F4F8', height: '100%' }}>
                <Typography variant="h5" fontWeight={800} mb={2} color="#0d2136">
                  Visitor Trend (Day-wise)
                </Typography>
                <Box sx={{ height: { xs: 260, md: 300 }, bgcolor: 'white', borderRadius: 3, p: 2 }}>
                  <Bar data={dayBarConfig} options={chartOptions} />
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
              <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, bgcolor: '#F0F4F8', height: '100%' }}>
                <Typography variant="h5" fontWeight={800} mb={2} color="#0040B9">
                  Visit Type Breakdown
                </Typography>
                <Box sx={{ height: { xs: 260, md: 300 }, bgcolor: 'white', borderRadius: 3, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Pie data={visitTypePieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, bgcolor: '#F0F4F8', height: '100%' }}>
                <Typography variant="h5" fontWeight={800} mb={2} color="#0040B9">
                  Officer-wise Distribution
                </Typography>
                <Box sx={{ height: { xs: 280, md: 320 }, bgcolor: 'white', borderRadius: 3, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Pie data={adminOfficerPieConfig} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
              <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, bgcolor: '#F0F4F8', height: '100%' }}>
                <Typography variant="h5" fontWeight={800} mb={2} color="#0d2136">
                  Suboffice Wise Visitors
                </Typography>
                <Box sx={{ height: { xs: 280, md: 320 }, bgcolor: 'white', borderRadius: 3, p: 2 }}>
                  <Bar data={barConfig} options={chartOptions} />
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Latest Visitors Table */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 5 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
              <Typography variant="h5" fontWeight={800} sx={{ color: '#0d2136' }}>
                Latest Visitors (Live)
              </Typography>
              <TextField
                size="small"
                placeholder="Search by name or mobile..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#0040B9' }} /></InputAdornment>,
                }}
                sx={{
                  width: { xs: '100%', sm: 320, md: 380 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '30px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  },
                  '& .MuiOutlinedInput-input': { py: 1.2 }
                }}
              />
            </Box>

            <Box sx={{ height: 580 }}>
              <StyledDataGrid
                rows={latestVisitors}
                columns={[
                  { field: 'id', headerName: 'No.', width: 80 },
                  { field: 'fullName', headerName: 'Name', flex: 1, minWidth: 180, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
                  { field: 'mobileNumber', headerName: 'Mobile', width: 150, renderCell: (p) => <HighlightText text={p.value} highlight={tableSearch} /> },
                  { field: 'addedByRole', headerName: 'Added By Role', width: 180 },
                  { field: 'officeType', headerName: 'Office Type', width: 150 },
                  { field: 'officeName', headerName: 'Office', width: 200 },
                  { field: 'entryTime', headerName: 'Time', width: 120 },
                ]}
                getRowId={(row) => `${row.id}-${row.entryTime}`}
                keepNonExistentRowsSelected
                autoHeight={false}
                pageSizeOptions={[10]}
                disableSelectionOnClick
                localeText={{ noRowsLabel: tableSearch ? 'No visitor found' : 'Loading data...' }}
              />
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;