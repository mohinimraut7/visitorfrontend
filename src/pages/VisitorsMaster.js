// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Box, Paper, Typography, Button, Container, CircularProgress, useTheme, useMediaQuery,
//   IconButton, Avatar
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useDispatch, useSelector} from 'react-redux';
// import { useNavigate } from 'react-router-dom'; // नवीन import

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   border: 'none',
//   borderRadius: '12px',
//   backgroundColor: 'white',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//   '& .MuiDataGrid-main': { borderRadius: '12px' },
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '2px solid #e9ecef',
//     borderRadius: '12px 12px 0 0',
//     fontSize: '14px',
//     fontWeight: 600,
//     color: '#495057',
//     minHeight: '56px !important',
//   },
//   '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 600, fontSize: '14px', color: '#495057' },
//   '& .MuiDataGrid-cell': {
//     padding: theme.spacing(1.5),
//     fontSize: '14px',
//     color: '#495057',
//     borderBottom: '1px solid #f1f3f4',
//   },
//   '& .MuiDataGrid-row': {
//     '&:nth-of-type(odd)': { backgroundColor: '#fbfcfd' },
//     '&:nth-of-type(even)': { backgroundColor: 'white' },
//     '&:hover': {
//       backgroundColor: '#e3f2fd !important',
//       transform: 'translateY(-1px)',
//       boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//       transition: 'all 0.2s ease-in-out',
//     },
//   },
//   '& .MuiDataGrid-footerContainer': {
//     backgroundColor: '#f8f9fa',
//     borderTop: '2px solid #e9ecef',
//     borderRadius: '0 0 12px 12px',
//     minHeight: '56px',
//   },
// }));

// const columns = (navigate) => [
//   { field: 'id', headerName: 'SR.NO', width: 90, headerAlign: 'center', align: 'center' },
//   {
//     field: 'photo',
//     headerName: 'PHOTO',
//     width: 100,
//     headerAlign: 'center',
//     align: 'center',
//     renderCell: (params) => (
//       <Avatar
//         src={params.row.visitorPhoto}
//         alt={params.row.fullName}
//         sx={{ width: 50, height: 50, border: '3px solid #0040B9' }}
//       >
//         {params.row.fullName.charAt(0)}
//       </Avatar>
//     ),
//   },
//   // { field: 'fullName', headerName: 'FULL NAME', width: 200, flex: 1 },
//    {
//     field: 'fullName',
//     headerName: 'FULL NAME',
//     width: 200,
//     flex: 1,
//     renderCell: (params) => (
//       <Typography
//         onClick={() => navigate(`/visitorhistory/${params.row._id}`)} // ID ने पाठवतो
//         sx={{
//           color: '#1976d2',
//           fontWeight: 600,
//           cursor: 'pointer',
//           '&:hover': {
//             textDecoration: 'underline',
//             color: '#0d47a1',
//           },
//         }}
//       >
//         {params.row.fullName}
//       </Typography>
//     ),
//   },
//   { field: 'mobileNumber', headerName: 'MOBILE', width: 150, flex: 0.8 },
//   { field: 'policeStation', headerName: 'POLICE STATION', width: 220, flex: 1 },
//    { field: 'pincode', headerName: 'PINCODE', width: 180, flex: 1 },
//   { field: 'district', headerName: 'DISTRICT', width: 180, flex: 1 },

  
//   // { field: 'reasonToVisit', headerName: 'REASON', width: 180, flex: 1 },
//   // { field: 'entryTime', headerName: 'ENTRY TIME', width: 180, flex: 1 },
//   // { 
//   //   field: 'feedback', 
//   //   headerName: 'FEEDBACK', 
//   //   width: 140, 
//   //   flex: 0.8,
//   //   renderCell: (params) => (
//   //     <Typography sx={{ 
//   //       fontWeight: 'bold', 
//   //       color: params.row.feedbackGiven ? '#28a745' : '#dc3545',
//   //       backgroundColor: params.row.feedbackGiven ? '#d4edda' : '#f8d7da',
//   //       px: 1.5, py: 0.5, borderRadius: 2
//   //     }}>
//   //       {params.row.feedback || "Pending"}
//   //     </Typography>
//   //   )
//   // },
// ];

// const VisitorsMaster = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

//   const [visitors, setVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//     const navigate = useNavigate(); // नवीन

//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalVisitors: 0
//   });

//   const fetchVisitors = async (page = 1, search = '') => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, {
//         params: { page, limit: 10, search }
//       });
//       if (res.data.success) {
//         const formatted = res.data.data.visitors.map((v, i) => ({
//           id: i + 1 + (page - 1) * 10,
//           ...v,
//           entryTime: new Date(v.entryAt).toLocaleString('en-IN')
//         }));
//         setVisitors(formatted);
//         setPagination(res.data.data.pagination);
//       }
//     } catch (err) {
//       console.error("Error fetching visitors:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//   }, []);

//   const getResponsiveWidth = () => {
//     if (isMobile) return '100%';
//     if (isTablet) return '90%';
//     return '92%';
//   };

//  const getResponsiveMargin = () => {
//     if (isMobile) return '0';
//     if (isTablet) return isSidebarOpen ? '15%' : '5%';
//     return isSidebarOpen ? '18%' : '8%';
//   };

//   const gridStyle = {
//     minHeight: 'calc(100vh - 40px)',
//     width: getResponsiveWidth(),
//     marginLeft: getResponsiveMargin(),
//     marginTop: '100px',
//     marginBottom: '20px',
//     transition: 'all 0.3s ease-in-out',
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#f8f9fa',
//     padding: isMobile ? '10px' : '20px',
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
//         <CircularProgress size={60} sx={{ color: '#23CCEF' }} />
//       </Box>
//     );
//   }

//   return (
//     <div style={gridStyle}>
//       <Container maxWidth={false} sx={{ padding: '0 !important' }}>
//         <Paper elevation={0} sx={{ padding: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', backgroundColor: 'white', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', border: '1px solid #e9ecef' }}>
          
//           <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 2 : 0 }}>
//             <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#0d2136', fontWeight: 600, fontSize: isMobile ? '1.5rem' : '1.75rem', letterSpacing: '0.5px', textAlign: isMobile ? 'center' : 'left' }}>
//               VISITORS MASTER
//             </Typography>
//             {/* <Button
//               size="small"
//               variant="outlined"
//               startIcon={<AddIcon />}
//               sx={{
//                 backgroundColor: '#20B2AA',
//                 color: '#fff',
//                 borderColor: '#20B2AA',
//                 cursor: 'pointer',
//                 textTransform: 'uppercase',
//                 '&:hover': { backgroundColor: '#20B2AA', borderColor: '#20B2AA', transform: 'translateY(-1px)', boxShadow: '0 4px 12px #20B2AA', opacity: '0.9' },
//                 transition: 'all 0.2s ease-in-out',
//               }}
//             >
//               Add Visitor
//             </Button> */}
//           </Box>

//           <Box sx={{ width: '100%', height: isMobile ? '500px' : '650px' }}>
//             <StyledDataGrid
//               rows={visitors}
//               columns={columns}
//               pageSizeOptions={[5, 10, 20]}
//               paginationMode="server"
//               rowCount={pagination.totalVisitors}
//               loading={loading}
//               onPaginationModelChange={(model) => fetchVisitors(model.page + 1)}
//               initialState={{
//                 pagination: { paginationModel: { pageSize: 10 } },
//               }}
//             />
//           </Box>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default VisitorsMaster;


// ==================================================

// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Box, Paper, Typography, Container, CircularProgress, useTheme, useMediaQuery, Avatar, Typography as MuiTypography
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { baseUrl } from '../config/config';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   // तुमचा सगळा styling same राहील
//   border: 'none',
//   borderRadius: '12px',
//   backgroundColor: 'white',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//   '& .MuiDataGrid-row': {
//     cursor: 'pointer',
//     '&:hover': {
//       backgroundColor: '#e3f2fd !important',
//     },
//   },
//   // बाकी styling तुम्ही ठेवू शकता…
// }));

// const VisitorsMaster = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const navigate = useNavigate();

//   const [visitors, setVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalVisitors: 0
//   });

//   // ======== COLUMNS आता फंक्शन नाही, डायरेक्ट array आहे ========
//   const columns = [
//     { field: 'id', headerName: 'SR.NO', width: 90, headerAlign: 'center', align: 'center' },
//     {
//       field: 'photo',
//       headerName: 'PHOTO',
//       width: 100,
//       headerAlign: 'center',
//       align: 'center',
//       renderCell: (params) => (
//         <Avatar
//           src={params.row.visitorPhoto}
//           alt={params.row.fullName}
//           sx={{ width: 50, height: 50, border: '3px solid #0040B9' }}
//         >
//           {params.row.fullName?.charAt(0)}
//         </Avatar>
//       ),
//     },
//     {
//       field: 'fullName',
//       headerName: 'FULL NAME',
//       width: 200,
//       flex: 1,
//       renderCell: (params) => (
//         <MuiTypography
//           onClick={() => navigate(`/visitorhistory/${params.row._id}`)}
//           sx={{
//             color: '#1976d2',
//             fontWeight: 600,
//             cursor: 'pointer',
//             '&:hover': {
//               textDecoration: 'underline',
//               color: '#0d47a1',
//             },
//           }}
//         >
//           {params.row.fullName}
//         </MuiTypography>
//       ),
//     },
//     { field: 'mobileNumber', headerName: 'MOBILE', width: 150 },
//     { field: 'policeStation', headerName: 'POLICE STATION', width: 220, flex: 1 },
//     { field: 'pincode', headerName: 'PINCODE', width: 180 },
//     { field: 'district', headerName: 'DISTRICT', width: 180 },
//   ];
//   // ================================================================

//   const fetchVisitors = async (page = 1, search = '') => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/allVisitors`, {
//         params: { page, limit: 10, search }
//       });
//       if (res.data.success) {
//         const formatted = res.data.data.visitors.map((v, i) => ({
//           id: i + 1 + (page - 1) * 10,
//           ...v,
//           // जर तुम्हाला latest visit चा entryAt हवा असेल तर backend मध्ये change करा
//           // entryTime: new Date(v.visits?.[v.visits.length-1]?.entryAt || v.createdAt).toLocaleString('en-IN')
//         }));
//         setVisitors(formatted);
//         setPagination(res.data.data.pagination);
//       }
//     } catch (err) {
//       console.error("Error fetching visitors:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//   }, []);

//   // तुमचे responsive styles same राहतील…
//   const getResponsiveWidth = () => (isMobile ? '100%' : isTablet ? '90%' : '92%');
//   const getResponsiveMargin = () => (isMobile ? '0' : isTablet ? (isSidebarOpen ? '15%' : '5%') : (isSidebarOpen ? '18%' : '8%'));

//   const gridStyle = {
//     minHeight: 'calc(100vh - 40px)',
//     width: getResponsiveWidth(),
//     marginLeft: getResponsiveMargin(),
//     marginTop: '100px',
//     marginBottom: '20px',
//     transition: 'all 0.3s ease-in-out',
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#f8f9fa',
//     padding: isMobile ? '10px' : '20px',
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
//         <CircularProgress size={60} sx={{ color: '#23CCEF' }} />
//       </Box>
//     );
//   }

//   return (
//     <div style={gridStyle}>
//       <Container maxWidth={false} sx={{ p: '0 !important' }}>
//         <Paper elevation={0} sx={{ p: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', bgcolor: 'white', boxShadow: 3 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
//             <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#0d2136', fontWeight: 600 }}>
//               VISITORS MASTER
//             </Typography>
//           </Box>

//           <Box sx={{ width: '100%', height: isMobile ? 500 : 650 }}>
//             <StyledDataGrid
//               rows={visitors}
//               columns={columns}                  // आता columns array आहे → error जाणार
//               pageSizeOptions={[10, 20, 50]}
//               paginationMode="server"
//               rowCount={pagination.totalVisitors || 0}
//               loading={loading}
//               onPaginationModelChange={(model) => fetchVisitors(model.page + 1)}
//               initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
//             />
//           </Box>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default VisitorsMaster;

// =============================================================

import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box, Paper, Typography, Container, CircularProgress, useTheme, useMediaQuery, Avatar,
  Button, Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { baseUrl } from '../config/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

// Marathi Font (Mangal) - Google Fonts वरून
const marathiFontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Mangal:wght@400;700&display=swap');
  body { font-family: 'Mangal', Arial, sans-serif !important; }
`;

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  borderRadius: '12px',
  backgroundColor: 'white',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  '& .MuiDataGrid-row': {
    cursor: 'pointer',
    '&:hover': { backgroundColor: '#e3f2fd !important' },
  },
}));

const VisitorsMaster = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();

  const [visitors, setVisitors] = useState([]);
  const [allVisitors, setAllVisitors] = useState([]); // For download
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalVisitors: 0
  });

  const columns = [
    { field: 'id', headerName: 'अ.क्र.', width: 80, headerAlign: 'center', align: 'center' },
    // {
    //   field: 'photo',
    //   headerName: 'फोटो',
    //   width: 100,
    //   headerAlign: 'center',
    //   align: 'center',
    //   renderCell: (params) => (
    //     <Avatar
    //       src={params.row.visitorPhoto}
    //       alt={params.row.fullName}
    //       sx={{ width: 50, height: 50, border: '3px solid #0040B9' }}
    //     >
    //       {params.row.fullName?.charAt(0)}
    //     </Avatar>
    //   ),
    // },
    {
  field: 'photo',
  headerName: 'फोटो',
  width: 110,
  headerAlign: 'center',
  align: 'center',
  sortable: false,
  renderCell: (params) => {
    // जर visitorPhoto नसेल तर latest visit चा photo घ्या
    const photoUrl = params.row.visitorPhoto || 
                     (params.row.visits?.length > 0 ? params.row.visits[params.row.visits.length - 1].visitorPhoto : null);

    return (
      <Avatar
        src={photoUrl}
        alt={params.row.fullName}
        sx={{
          width: 56,
          height: 56,
          // border: '4px solid #0040B9',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontSize: '1.4rem',
          fontWeight: 'bold',
          bgcolor: '#e3f2fd'
        }}
      >
        {params.row.fullName?.charAt(0).toUpperCase()}
      </Avatar>
    );
  },
},
    {
      field: 'fullName',
      headerName: 'पूर्ण नाव',
      width: 220,
      flex: 1,
      renderCell: (params) => (
        <Typography
          onClick={() => navigate(`/visitorhistory/${params.row._id}`)}
          sx={{
            color: '#1976d2',
            fontWeight: 600,
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline', color: '#0d47a1' },
          }}
        >
          {params.row.fullName}
        </Typography>
      ),
    },
    { field: 'mobileNumber', headerName: 'मोबाईल', width: 140 },
    { field: 'policeStation', headerName: 'पोलीस स्टेशन', width: 200 },
    { field: 'fullAddress', headerName: 'पत्ता', width: 250, flex: 1 },
    { field: 'pincode', headerName: 'पिनकोड', width: 120 },
    { field: 'district', headerName: 'जिल्हा', width: 150 },
  ];

  const fetchVisitors = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/allVisitors`, {
        params: { page, limit: 10, search }
      });
      if (res.data.success) {
        const formatted = res.data.data.visitors.map((v, i) => ({
          id: i + 1 + (page - 1) * 10,
          ...v,
        }));
        setVisitors(formatted);
        setPagination(res.data.data.pagination);
      }
    } catch (err) {
      toast.error("Visitors लोड करण्यात त्रुटी!");
    } finally {
      setLoading(false);
    }
  };

  // Fetch ALL visitors for download
  const fetchAllForDownload = async () => {
    try {
      const res = await axios.get(`${baseUrl}/allVisitors`, { params: { limit: 10000 } });
      if (res.data.success) {
        const formatted = res.data.data.visitors.map((v, i) => ({
          'अ.क्र.': i + 1,
          'पूर्ण नाव': v.fullName || '-',
          'मोबाईल': v.mobileNumber || '-',
          'पोलीस स्टेशन': v.policeStation || '-',
          'पत्ता': v.fullAddress || '-',
          'पिनकोड': v.pincode || '-',
          'जिल्हा': v.district || '-',
        }));
        setAllVisitors(formatted);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVisitors();
    fetchAllForDownload();
  }, []);

  // Excel Download
  const handleDownloadExcel = () => {
    if (allVisitors.length === 0) {
      toast.warn("डाउनलोडसाठी डेटा उपलब्ध नाही!");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(allVisitors);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visitors");
    XLSX.writeFile(wb, `भेट देणाऱ्यांची यादी_${dayjs().format('DD-MMM-YYYY')}.xlsx`);
    toast.success("Excel यशस्वीरित्या डाउनलोड झाला!");
  };

  // PDF Download with Marathi Font (Mangal)
  const handleDownloadPDF = () => {
    if (allVisitors.length === 0) {
      toast.warn("PDF साठी डेटा उपलब्ध नाही!");
      return;
    }

    const content = `
      <div style="font-family: 'Mangal', sans-serif; padding: 40px; direction: ltr; font-size: 14px;">
        <h1 style="text-align:center; color:#d32f2f; margin:15px 0;">ठाणे ग्रामीण पोलीस</h1>
        <h2 style="text-align:center; color:#0d47a1; margin:10px 0;">भेट देणाऱ्यांची यादी (Visitors Master)</h2>
        <h3 style="text-align:center; margin:20px 0; color:#1976d2;">
          एकूण भेट देणारे: <strong>${allVisitors.length}</strong> | तारीख: ${dayjs().format('DD/MM/YYYY')}
        </h3>

        <table border="1" cellspacing="0" cellpadding="10" style="width:100%; border-collapse:collapse; margin-top:20px; font-size:13px;">
          <thead style="background:#1976d2; color:white;">
            <tr>
              <th>अ.क्र.</th><th>पूर्ण नाव</th><th>मोबाईल</th><th>पोलीस स्टेशन</th><th>पत्ता</th><th>पिनकोड</th><th>जिल्हा</th>
            </tr>
          </thead>
          <tbody>
            ${allVisitors.map((v, i) => `
              <tr style="text-align:center;">
                <td>${i + 1}</td>
                <td>${v['पूर्ण नाव']}</td>
                <td>${v['मोबाईल']}</td>
                <td>${v['पोलीस स्टेशन']}</td>
                <td>${v['पत्ता']}</td>
                <td>${v['पिनकोड']}</td>
                <td>${v['जिल्हा']}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="margin-top:50px; text-align:right;">
          <p>तयार केले: ____________________</p>
          <p>दिनांक: ${dayjs().format('DD/MM/YYYY')}</p>
        </div>
      </div>
    `;

    const element = document.createElement('div');
    element.innerHTML = content;

    // Add font stylesheet
    const style = document.createElement('style');
    style.innerHTML = marathiFontStyle;
    element.prepend(style);

    document.body.appendChild(element);

    html2pdf()
      .set({
        margin: [15, 20, 15, 20],
        filename: `भेट_देणाऱ्यांची_यादी_${dayjs().format('DD-MMM-YYYY')}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { format: 'a4', orientation: 'landscape' }
      })
      .from(element)
      .save()
      .then(() => {
        document.body.removeChild(element);
        toast.success("PDF यशस्वीरित्या तयार झाला!");
      });
  };

  const getResponsiveWidth = () => (isMobile ? '100%' : isTablet ? '90%' : '80%');
  const getResponsiveMargin = () => (isMobile ? '0' : isTablet ? (isSidebarOpen ? '15%' : '5%') : (isSidebarOpen ? '18%' : '8%'));

  const gridStyle = {
    minHeight: 'calc(100vh - 40px)',
    width: getResponsiveWidth(),
    marginLeft: getResponsiveMargin(),
    marginTop: '100px',
    marginBottom: '20px',
    transition: 'all 0.3s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8f9fa',
    padding: isMobile ? '10px' : '20px',
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
        <CircularProgress size={70} sx={{ color: '#23CCEF' }} />
      </Box>
    );
  }

  return (
    <div style={gridStyle}>
      <Container maxWidth={false} sx={{ p: '0 !important' }}>
        <Paper elevation={0} sx={{ p: isMobile ? '20px 15px' : '30px 25px', borderRadius: '16px', bgcolor: 'white', boxShadow: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#0d2136', fontWeight: 600 }}>
              Visitors Master
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Tooltip title="Excel डाउनलोड">
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadExcel}
                  sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
                >
                  Excel
                </Button>
              </Tooltip>

              <Tooltip title="PDF डाउनलोड (मराठी फॉन्टसह)">
                <Button
                  variant="contained"
                  startIcon={<PictureAsPdfIcon />}
                  onClick={handleDownloadPDF}
                  sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
                >
                  PDF
                </Button>
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ width: '100%', height: isMobile ? 500 : 650 }}>
            <StyledDataGrid
              rows={visitors}
              columns={columns}
              pageSizeOptions={[10, 20, 50]}
              paginationMode="server"
              rowCount={pagination.totalVisitors || 0}
              loading={loading}
              onPaginationModelChange={(model) => fetchVisitors(model.page + 1)}
              initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            />
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default VisitorsMaster;