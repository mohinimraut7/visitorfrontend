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


// src/pages/Home.js  ← हा फाइल पूर्ण replace करा
import React, { useEffect, useState, useCallback } from 'react';
import {
  Box, Paper, Typography, Container, CircularProgress, Grid, Tabs, Tab
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { baseUrl } from '../config/config';
import { useSelector } from 'react-redux';
import { PeopleAlt, AssignmentTurnedIn, AccessTime, CheckCircle } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

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
  },
});

const StatsCard = ({ title, value, icon: Icon, color, bgColor }) => (
  <Paper sx={{
    p: 4, borderRadius: 5, background: 'white',
    boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
    borderLeft: `6px solid ${color}`,
    transition: 'all 0.4s',
    '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 25px 60px rgba(0,0,0,0.22)' }
  }}>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
        <Typography variant="h3" fontWeight="bold" color={color} mt={1}>
          {title.includes('Rate') ? `${value}%` : value.toLocaleString()}
        </Typography>
      </Box>
      <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon sx={{ fontSize: 40, color }} />
      </Box>
    </Box>
  </Paper>
);

const Home = () => {
  const isMobile = window.innerWidth < 768;
  const isSidebarOpen = useSelector(state => state.sidebar?.isOpen || false);

  const [filter, setFilter] = useState('daily');
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, successRate: 0 });
  const [chartData, setChartData] = useState({ labels: [], total: [], done: [] });
  const [latestVisitors, setLatestVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllFromSingleAPI = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/allVisitors`);
      
      if (res.data.success && res.data.data?.visitors) {
        const visitors = res.data.data.visitors;
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
        const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);

        // Filter by time
        const filtered = visitors.filter(v => {
          const entryDate = new Date(v.entryAt || v.createdAt);
          if (filter === 'daily') return entryDate >= today;
          if (filter === 'weekly') return entryDate >= weekAgo;
          return entryDate >= monthAgo;
        });

        const total = filtered.length;
        const completed = filtered.filter(v => v.feedbackGiven || v.entryDone).length;
        const pending = total - completed;
        const successRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        setStats({ total, completed, pending, successRate });

        // Prepare chart data
        const hourlyData = {};
        filtered.forEach(v => {
          const date = new Date(v.entryAt || v.createdAt);
          const key = filter === 'daily' 
            ? date.getHours() + ':00'
            : filter === 'weekly'
            ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
            : `Week ${Math.ceil(date.getDate() / 7)}`;

          hourlyData[key] = hourlyData[key] || { total: 0, done: 0 };
          hourlyData[key].total++;
          if (v.feedbackGiven || v.entryDone) hourlyData[key].done++;
        });

        const sortedKeys = Object.keys(hourlyData).sort((a, b) => {
          if (filter === 'daily') return parseInt(a) - parseInt(b);
          if (filter === 'weekly') return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(a) - ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(b);
          return a.localeCompare(b);
        });

        setChartData({
          labels: sortedKeys,
          total: sortedKeys.map(k => hourlyData[k].total),
          done: sortedKeys.map(k => hourlyData[k].done)
        });

        // Latest 10 visitors
        const latest = visitors.slice(0, 10).map((v, i) => ({
          id: i + 1,
          fullName: v.fullName,
          mobileNumber: v.mobileNumber,
          policeStation: v.policeStation || 'N/A',
          entryTime: new Date(v.entryAt || v.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }));
        setLatestVisitors(latest);
      }
    } catch (err) {
      console.log("Using fallback data");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchAllFromSingleAPI();
    const interval = setInterval(fetchAllFromSingleAPI, 10000); // हर 10 सेकंदात लाइव्ह अपडेट
    return () => clearInterval(interval);
  }, [fetchAllFromSingleAPI]);

  const chartConfig = {
    labels: chartData.labels.length ? chartData.labels : ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      { label: 'Total Visitors', data: chartData.total, borderColor: '#0040B9', backgroundColor: 'rgba(0,64,185,0.1)', tension: 0.4, fill: true },
      { label: 'Entry Completed', data: chartData.done, borderColor: '#00A86B', backgroundColor: 'rgba(0,168,107,0.1)', tension: 0.4, fill: true }
    ]
  };

  const getMargin = () => isMobile ? 0 : isSidebarOpen ? '18%' : '8%';

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f4f8' }}>
        <CircularProgress size={80} sx={{ color: '#0040B9' }} />
        <Typography ml={3} variant="h6" color="#0040B9" fontWeight="bold">Loading Live Dashboard...</Typography>
      </Box>
    );
  }

  return (
    <div style={{
      marginLeft: getMargin(),
      marginTop: '80px',
      backgroundColor: '#f0f4f8',
      minHeight: '100vh',
      padding: '24px',
      transition: 'all 0.3s ease'
    }}>
      <Container maxWidth={false}>
        <Typography variant="h3" fontWeight={900} color="#0d2136" mb={2}>
          Thane Rural Police
        </Typography>
        <Typography variant="h6" color="primary" mb={4}>
          Real-time Visitor Management System 
        </Typography>

        <Tabs value={filter} onChange={(_, v) => setFilter(v)} centered sx={{ mb: 5 }}>
          <Tab label="Today" value="daily" />
          <Tab label="This Week" value="weekly" />
          <Tab label="This Month" value="monthly" />
        </Tabs>

        <Grid container spacing={4} mb={6}>
          <Grid item xs={12} sm={6} md={3}><StatsCard title="Total Visitors" value={stats.total} icon={PeopleAlt} color="#0040B9" bgColor="#dbeafe" /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatsCard title="Entry Completed" value={stats.completed} icon={AssignmentTurnedIn} color="#00A86B" bgColor="#d1fae5" /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatsCard title="Pending" value={stats.pending} icon={AccessTime} color="#DC3545" bgColor="#fce7e7" /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatsCard title="Success Rate" value={stats.successRate} icon={CheckCircle} color="#28a745" bgColor="#d4edda" /></Grid>
        </Grid>

        <Paper sx={{ p: 4, borderRadius: 5, boxShadow: '0 15px 50px rgba(0,0,0,0.18)', mb: 6 }}>
          <Typography variant="h5" fontWeight={800} mb={3}>
            Visitor Trend ({filter === 'daily' ? 'Hourly' : filter === 'weekly' ? 'Daily' : 'Weekly'})
          </Typography>
          <Box sx={{ height: 400 }}>
            <Line data={chartConfig} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </Box>
        </Paper>

        <Paper sx={{ p: 4, borderRadius: 5, boxShadow: '0 15px 50px rgba(0,0,0,0.18)' }}>
          <Typography variant="h5" fontWeight={800} mb={3}>Latest Visitors (Live)</Typography>
          <Box sx={{ height: 520 }}>
            <StyledDataGrid
              rows={latestVisitors}
              columns={[
                { field: 'id', headerName: 'No.', width: 80 },
                { field: 'fullName', headerName: 'Name', flex: 1 },
                { field: 'mobileNumber', headerName: 'Mobile', width: 140 },
                { field: 'policeStation', headerName: 'Station', width: 200 },
                { field: 'entryTime', headerName: 'Time', width: 120 },
              ]}
              pageSizeOptions={[10]}
            />
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Home;