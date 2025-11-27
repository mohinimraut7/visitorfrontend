import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography,Divider  } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, useMediaQuery,Avatar } from '@mui/material';
import CountUp from 'react-countup';
import './InfoCard.css';
const InfoCard = ({ title, count, avatarColor = '#1976d2', avatarIcon = 'A',
  backgroundColor,IconComponent,onClick
 }) => {
  const open = useSelector((state) => state.sidebar.isOpen);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Card
    className='container-infocard'
    sx={{
      backgroundColor:backgroundColor,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        boxShadow:4,
        minHeight:115,
        // margin: 2,
        color: 'white',
        borderRadius:2,
        width: isSm ? '100%': '25%',
        
      }}
      onClick={onClick}
     >
        {IconComponent && (
        <Box sx={{width:'100%',display:'flex',alignItems:'flex-start',pl:2}}><IconComponent sx={{ fontSize:30, color: 'dodgerblue',mr:2}} /> <Typography component="div" sx={{fontWeight:'bold',color:'black'}}>
          {title}
        </Typography></Box>
      )}
      <Divider sx={{ width: '90%', mx: 'auto', my: 1 }} />
      <Box sx={{width:'100%',display:'flex',alignItems:'flex-start'}}>
       <Typography variant="h6" sx={{pl:2}}>
          <CountUp  style={{fontSize:'20px',color:'#9A9A9A',fontWeight:'bold',color:'black'}} end={count} duration={3.5} />
        </Typography>
      </Box>
        
     
    </Card>
  );
};
export default InfoCard;
