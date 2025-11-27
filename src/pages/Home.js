import React, { useEffect,useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/actions/userActions';

import { fetchRoles } from '../store/actions/roleActions';
import { fetchTenders } from '../store/actions/tenderActions';
import { fetchConsumers } from '../store/actions/consumerActions';

import InfoCard from '../components/cards/InfoCard';
import { CircularProgress, Box } from '@mui/material';
import './Home.css';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AverageTendersCurrentMonth from '../components/table/AverageMetersCurrentMonth';
import FaultyTendersCurrentMonth from '../components/table/FaultyMetersCurrentMonth';
import UpcomingDueBillCurrentMonth from '../components/table/UpcomingDueBillCurrenthMonth';
import PaidBillpreviousTwoMonthBefore from '../components/table/PaidBillpreviousTwoMonthBefore';
import FaultyTendersBeforeTwoMonth from '../components/table/FaultyMetersBeforeTwoMonth';
import OverdueBillsTable from '../components/table/OverdueBillsTable';

const Home = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state.auth.user);
  const { tenders, pagination, loading: loadingtenders, error: errorUsers } = useSelector((state) => state.tenders);
  const { loading: loadingRoles, error: errorRoles } = useSelector((state) => state.roles);
  const [showCMonthAvgTable, setShowCMonthAvgTable] = useState(false);
  const [showCMonthUDueBill, setshowCMonthUDueBill] = useState(false);
  const [showOverdueBill, setShowOverdueBill] = useState(false);
  const [showPTwoMonthBeforePaidTable,setShowPTwoMonthBeforePaidTable]=useState(false);
  const [showCMonthFaultyTable, setShowCMonthFaultyTable] = useState(false);
  const [showBeforeTwoMonthFaultyTable, setShowBeforeTwoMonthFaultyTable] = useState(false);

  const currentDate = new Date();
  const prevDate = new Date(currentDate);
  prevDate.setMonth(prevDate.getMonth() - 1);
  const prevDateTwo = new Date(currentDate);
  prevDateTwo.setMonth(prevDateTwo.getMonth() - 2);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));
  const isXl = useMediaQuery(theme.breakpoints.down('xl'));

  useEffect(() => {
    dispatch(fetchUsers());
   
   
    dispatch(fetchRoles());
    dispatch(fetchTenders(1, 50, '')); // Fetch first page to get total count
    dispatch(fetchConsumers());
    document.body.classList.add('home-body');
    return () => {
      document.body.classList.remove('home-body');
    };
  }, [dispatch]);

  if (loadingRoles) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (errorUsers) {
    return <p>Error loading users: {errorUsers}</p>;
  }

  if (errorRoles) {
    return <p>Error loading roles: {errorRoles}</p>;
  }

  const gridStyle = {
    width: '100%',
    width: isSm || isXs ? '80%' : isSidebarOpen ? '80%' : '95%',
    marginLeft: isSm || isXs ? '60px' : isSidebarOpen ? '20%' : '6%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems:'center'
  };

  // Get total tender count from pagination data, fallback to tenders length if pagination not available
  const totalTenderCount = pagination?.totalTenders || tenders?.length || 0;
  
  return (
    <div style={gridStyle} className="containerhome">
      <div className="info-card-container" sx={{width: isSm || isXs? '100%' : '30%'}}>

        
{/* 
        {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'|| (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
          <Box sx={{width:'100%',mt:{
            lg:isSidebarOpen?0:2,
            md:isSidebarOpen?0:0,
            xs:isSidebarOpen?5:5,
             sm:isSidebarOpen?2:2 ,
          }
          ,ml:{
            lg:isSidebarOpen?0:2,
            md:isSidebarOpen?0:0,
            xs:isSidebarOpen?0:0,
             sm:isSidebarOpen?0:0,
          }
          }}>
<InfoCard
            IconComponent={Person2OutlinedIcon}
            backgroundColor="#fff"
            className="container-infocard"
            avatarColor="#FB404B"
            avatarIcon="PersonIcon"
            title="Total Tenders"
            count={totalTenderCount} 
          />
          </Box>
          
        )} */}
      </div>
    </div>
  );
};

export default Home;