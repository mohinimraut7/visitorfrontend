import React, { useEffect, useState, useRef, useCallback } from 'react';
import AddTender from '../components/modals/AddTender';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addTender, fetchTenders, deleteTender, editTender } from '../store/actions/tenderActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, CircularProgress, TextField } from '@mui/material';
import './Rolemaster.css';
import './TenderList.css';
import { styled } from '@mui/material/styles';
import { baseUrl, fileBaseUrl } from '../config/config';
import * as XLSX from 'xlsx';
import { toast } from "react-toastify";
import DownloadIcon from '@mui/icons-material/Download';

const columns = (handleDeleteTender, handleEditTender) => [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'tenderId', headerName: 'TENDER ID', width: 120 },
  { field: 'tenderType', headerName: 'TENDER TYPE', width: 120 },
  { field: 'tenderCategory', headerName: 'CATEGORY', width: 120 },
  { field: 'formOfContract', headerName: 'CONTRACT FORM', width: 140 },
  { field: 'noOfCovers', headerName: 'NO. OF COVERS', width: 120 },
  { field: 'coverType', headerName: 'COVER TYPE', width: 120 },
  { field: 'tenderFee', headerName: 'TENDER FEE', width: 100 },
  { field: 'emdAmount', headerName: 'EMD AMOUNT', width: 120 },
  { field: 'tenderTitle', headerName: 'TENDER TITLE', width: 200 },
  { field: 'workDescription', headerName: 'WORK DESCRIPTION', width: 200 },
  { field: 'tenderValueInRs', headerName: 'TENDER VALUE IN RS.', width: 140 },
  { field: 'productCategory', headerName: 'PRODUCT CATEGORY', width: 160 },
  { field: 'bidValidityDays', headerName: 'BID VALIDITY', width: 130 },
  { field: 'periodOfWorkDays', headerName: 'WORK PERIOD (DAYS)', width: 160 },
  { field: 'preBidMeetingPlace', headerName: 'PRE BID PLACE', width: 160 },
  { field: 'preBidMeetingAddress', headerName: 'PRE BID ADDRESS', width: 200 },
  { field: 'preBidMeetingDate', headerName: 'PRE BID MEETING DATE', width: 200 },
  { field: 'criticalDates', headerName: 'CRITICAL DATES', width: 200 },
  { field: 'publishedDate', headerName: 'PUBLISHED DATE', width: 200 },
  { field: 'documentDownloadSaleEndDate', headerName: 'DOCUMENT DOWNLOAD SALE END DATE', width: 200 },
  { field: 'bidSubmissionStartDate', headerName: 'BID SUBMISSION START DATE', width: 200 },
  { field: 'bidSubmissionEndDate', headerName: 'BID SUBMISSION END DATE', width: 200 },
  {
    field: 'tendersDocuments',
    headerName: 'Tender Documents',
    width: 200,
    renderCell: (params) => {
      const docs = params.row?.tendersDocuments || [];
      if (!docs.length) return '-';

      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {docs.map((doc, index) => (
            <a
              key={index}
              href={`${fileBaseUrl}/${doc.filePath.replace(/\\/g, '/')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'blue', textDecoration: 'underline', marginBottom: '4px' }}
            >
              {doc.originalName || `Document ${index + 1}`}
            </a>
          ))}
        </div>
      );
    }
  },
  {
    field: 'technicalDocumentOfBidder',
    headerName: 'Technical Document Of Bidder',
    width: 200,
    renderCell: (params) => {
      const docs = params.row?.technicalDocumentOfBidder || [];
      if (!docs.length) return '-';

      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {docs.map((doc, index) => (
            <a
              key={index}
              href={`${fileBaseUrl}/${doc.filePath.replace(/\\/g, '/')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'blue', textDecoration: 'underline', marginBottom: '4px' }}
            >
              {doc.originalName || `Document ${index + 1}`}
            </a>
          ))}
        </div>
      );
    }
  },
  {
    field: 'financialDocumentOfBidder',
    headerName: 'Financial Document Of Bidder',
    width: 200,
    renderCell: (params) => {
      const docs = params.row?.financialDocumentOfBidder || [];
      if (!docs.length) return '-';

      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {docs.map((doc, index) => (
            <a
              key={index}
              href={`${fileBaseUrl}/${doc.filePath.replace(/\\/g, '/')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'blue', textDecoration: 'underline', marginBottom: '4px' }}
            >
              {doc.originalName || `Document ${index + 1}`}
            </a>
          ))}
        </div>
      );
    }
  },
  { field: 'AOC', headerName: 'AOC', width: 120 },
  { field: 'documentType', headerName: 'Document Type', width: 200 },
  { field: 'tenderInvitingAuthority', headerName: 'Tender Inviting Authority', width: 120 },
  { field: 'tname', headerName: 'Name', width: 120 },
  { field: 'address', headerName: 'Address', width: 120 },
  { field: 'estimateCost', headerName: 'Estimate Cost', width: 120 },
  { field: 'nameOfBidder', headerName: 'Name Of Bidder', width: 120 },
  { field: 'subCategory', headerName: 'Sub Category', width: 160 },
  { field: 'organisationChain', headerName: 'Organisation Chain', width: 120 },
  { field: 'tenderRefNo', headerName: 'Ref No.', width: 120 },
  { field: 'tenderStatus', headerName: 'Status', width: 120 },
  { field: 'bidNumber', headerName: 'Bid Number', width: 120 },
  { field: 'awardedCurrency', headerName: 'Awarded Currency', width: 100 },
  { field: 'awardedValue', headerName: 'Awarded Value', width: 140 },
  {
    field: 'documentLink',
    headerName: 'Document Link',
    width: 160,
    renderCell: (params) => (
      params.value ? (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          View
        </a>
      ) : (
        <span style={{ color: '#999' }}>No Link</span>
      )
    ),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 130,
    renderCell: (params) => (
      <>
        <IconButton sx={{ color: '#FFA534' }} onClick={() => handleDeleteTender(params.row._id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleEditTender(params.row)}>
          <EditIcon />
        </IconButton>
      </>
    ),
  },
];

const TenderComponent = () => {
  const dispatch = useDispatch();
  const { tenders, pagination, loading, error } = useSelector((state) => state.tenders);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

  const [tenderOpen, setTenderOpen] = useState(false);
  const [currentTender, setCurrentTender] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
  const [tenderIdN, setTenderIdN] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  });

  // Working scroll solution from your code
  const [shouldMaintainScroll, setShouldMaintainScroll] = useState(false);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);
  const dataGridRef = useRef(null);

  // const saveScrollPosition = useCallback(() => {
  //   if (dataGridRef.current) {
  //     const scroller = dataGridRef.current.querySelector('.MuiDataGrid-virtualScroller');
  //     if (scroller) {
  //       setSavedScrollPosition(scroller.scrollTop);
  //       setShouldMaintainScroll(true);
  //       console.log('💾 Scroll position saved:', scroller.scrollTop);
  //     }
  //   }
  // }, []);

  // const restoreScrollPosition = useCallback(() => {
  //   if (!dataGridRef.current || savedScrollPosition <= 0) return;
  //   setTimeout(() => {
  //     requestAnimationFrame(() => {
  //       const scroller = dataGridRef.current.querySelector('.MuiDataGrid-virtualScroller');
  //       if (scroller) {
  //         scroller.scrollTop = savedScrollPosition;
  //         setShouldMaintainScroll(false);
  //         setSavedScrollPosition(0);
  //         console.log('🔄 Scroll position restored to:', savedScrollPosition);
  //       }
  //     });
  //   }, 300);
  // }, [savedScrollPosition]);

  // useEffect(() => {
  //   dispatch(fetchTenders(paginationModel.page + 1, paginationModel.pageSize, tenderIdN));
  // }, [dispatch, paginationModel.page, paginationModel.pageSize, tenderIdN]);

  // useEffect(() => {
  //   if (!loading && tenders.length > 0 && shouldMaintainScroll) {
  //     restoreScrollPosition();
  //   }
  // }, [loading, tenders, restoreScrollPosition, shouldMaintainScroll]);


const saveScrollPosition = useCallback(() => {
    if (dataGridRef.current) {
      const scroller = dataGridRef.current.querySelector('.MuiDataGrid-virtualScroller');
      if (scroller) {
        setSavedScrollPosition(scroller.scrollTop);
        setShouldMaintainScroll(true);
      }
    }
  }, []);

  const restoreScrollPosition = useCallback(() => {
    if (!dataGridRef.current || savedScrollPosition <= 0) return;
    setTimeout(() => {
      requestAnimationFrame(() => {
        const scroller = dataGridRef.current.querySelector('.MuiDataGrid-virtualScroller');
        if (scroller) {
          scroller.scrollTop = savedScrollPosition;
          setShouldMaintainScroll(false);
          setSavedScrollPosition(0);
        }
      });
    }, 300);
  }, [savedScrollPosition]);

  useEffect(() => {
    dispatch(fetchTenders(paginationModel.page + 1, paginationModel.pageSize, tenderIdN));
  }, [dispatch, paginationModel.page, paginationModel.pageSize, tenderIdN]);

  useEffect(() => {
    if (!loading && tenders.length > 0 && shouldMaintainScroll) {
      restoreScrollPosition();
    }
  }, [loading, tenders, restoreScrollPosition, shouldMaintainScroll]);

  const handlePaginationModelChange = (newModel) => {
    if (newModel.pageSize !== paginationModel.pageSize) {
      saveScrollPosition();
    }
    setPaginationModel(newModel);
  };










  const handleAddTenderOpen = () => {
    setCurrentTender(null);
    setTenderOpen(true);
  };

  const handleAddTenderClose = () => {
    setTenderOpen(false);
  };

  const handleAddTender = (tenderData) => {
    saveScrollPosition();
    dispatch(addTender(tenderData)).then(() => {
      // Refresh current page after adding
      dispatch(fetchTenders(paginationModel.page + 1, paginationModel.pageSize, tenderIdN));
    });
    handleAddTenderClose();
  };

  const handleEditTender = (tender) => {
    setCurrentTender(tender);
    setTenderOpen(true);
  };

  const handleDeleteTender = (tenderId) => {
    saveScrollPosition();
    dispatch(deleteTender(tenderId)).then(() => {
      // Refresh current page after deletion
      dispatch(fetchTenders(paginationModel.page + 1, paginationModel.pageSize, tenderIdN));
    });
  };

  // Working pagination handler from your solution
  // const handlePaginationModelChange = (newModel) => {
  //   const isPageChanged = newModel.page !== paginationModel.page;
  //   const isPageSizeChanged = newModel.pageSize !== paginationModel.pageSize;
    
  //   console.log('🔄 Pagination change:', { isPageChanged, isPageSizeChanged });
    
  //   // Save scroll for ANY pagination change (page OR pageSize)
  //   if (isPageChanged || isPageSizeChanged) {
  //     saveScrollPosition();
  //     console.log('💾 Saving scroll for pagination change');
  //   }
    
  //   setPaginationModel(newModel);
  // };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setTenderIdN(value);
    // Reset scroll and pagination for search
    setShouldMaintainScroll(false);
    setSavedScrollPosition(0);
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  const deleteAllTenders = () => {
    fetch(`${baseUrl}/deleteAllTenders`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('All tenders deleted:', data);
        alert(data.message);
        // Reset everything after delete all
        setShouldMaintainScroll(false);
        setSavedScrollPosition(0);
        dispatch(fetchTenders(1, paginationModel.pageSize, tenderIdN));
        setPaginationModel({ ...paginationModel, page: 0 });
      })
      .catch((error) => {
        console.error('Error deleting tenders:', error);
        alert('Error deleting tenders');
      });
  };

  const convertExcelDate = (excelDate) => {
    if (!excelDate || isNaN(excelDate)) return 'NA';

    const date = new Date(Math.round((excelDate - 25569) * 86400 * 1000));
    const pad = (n) => (n < 10 ? '0' + n : n);

    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  const importExcel = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    saveScrollPosition();
    setIsImporting(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const cleanedData = jsonData.map(item => ({
        tenderId: item.tenderId || '',
        tenderType: item.tenderType || '',
        tenderCategory: item.tenderCategory || '',
        formOfContract: item.formOfContract || '',
        noOfCovers: item.noOfCovers || '',
        coverType: item.coverType || '',
        tenderFee: Number(item.tenderFee) || 0,
        emdAmount: Number(item.emdAmount) || 0,
        tenderTitle: item.tenderTitle || '',
        workDescription: item.workDescription || '',
        tenderValueInRs: item.tenderValueInRs || '',
        productCategory: item.productCategory || '',
        bidValidityDays: item.bidValidityDays || '',
        periodOfWorkDays: item.periodOfWorkDays || '',
        preBidMeetingPlace: item.preBidMeetingPlace || '',
        preBidMeetingAddress: item.preBidMeetingAddress || '',
        preBidMeetingDate: convertExcelDate(item.preBidMeetingDate),
        criticalDates: convertExcelDate(item.criticalDates),
        publishedDate: convertExcelDate(item.publishedDate),
        documentDownloadSaleEndDate: convertExcelDate(item.documentDownloadSaleEndDate),
        bidSubmissionStartDate: convertExcelDate(item.bidSubmissionStartDate),
        bidSubmissionEndDate: convertExcelDate(item.bidSubmissionEndDate),
        tendersDocuments: item.tendersDocuments || [],
        technicalDocumentOfBidder: item.technicalDocumentOfBidder || [],
        financialDocumentOfBidder: item.financialDocumentOfBidder || [],
        AOC: item.AOC || '',
        documentType: item.documentType || '',
        tenderInvitingAuthority: item.tenderInvitingAuthority || '',
        tname: item.tname || '',
        address: item.address || '',
        estimateCost: item.estimateCost || '',
        nameOfBidder: item.nameOfBidder || '',
        subCategory: item.subCategory || '',
        organisationChain: item.organisationChain || '',
        tenderRefNo: item.tenderRefNo || '',
        tenderStatus: item.tenderStatus || '',
        bidNumber: Number(item.bidNumber) || 0,
        awardedCurrency: item.awardedCurrency || '',
        awardedValue: item.awardedValue || '',
        documentLink: item.documentLink || '',
      }));

      const chunkSize = 100;
      for (let i = 0; i < cleanedData.length; i += chunkSize) {
        const chunk = cleanedData.slice(i, i + chunkSize);

        try {
          const response = await fetch(`${baseUrl}/import-excel`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(chunk),
          });

          const result = await response.json();
          console.log(`Batch ${i / chunkSize + 1} imported:`, result);
        } catch (error) {
          console.error(`Batch ${i / chunkSize + 1} failed:`, error);
        }
      }

      toast.success("Tender data has been successfully imported.");
      setIsImporting(false);
      // Refresh data after import
      dispatch(fetchTenders(paginationModel.page + 1, paginationModel.pageSize, tenderIdN));
    };

    reader.readAsArrayBuffer(file);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const rows = tenders.map((tender, index) => ({
    id: paginationModel.page * paginationModel.pageSize + index + 1,
    _id: tender?._id || '-',
    tenderId: tender?.tenderId || '-',
    tenderType: tender?.tenderType || '-',
    tenderCategory: tender?.tenderCategory || '-',
    formOfContract: tender?.formOfContract || '-',
    noOfCovers: tender?.noOfCovers || '-',
    coverType: tender?.coverType || '-',
    tenderFee: tender?.tenderFee || '-',
    emdAmount: tender?.emdAmount || '-',
    tenderTitle: tender?.tenderTitle || '-',
    workDescription: tender?.workDescription || '-',
    tenderValueInRs: tender?.tenderValueInRs || '-',
    productCategory: tender?.productCategory || '-',
    bidValidityDays: tender?.bidValidityDays || '-',
    periodOfWorkDays: tender?.periodOfWorkDays || '-',
    preBidMeetingPlace: tender?.preBidMeetingPlace || '-',
    preBidMeetingAddress: tender?.preBidMeetingAddress || '-',
    preBidMeetingDate: tender?.preBidMeetingDate || '-',
    criticalDates: tender?.criticalDates || '-',
    publishedDate: tender?.publishedDate || '-',
    documentDownloadSaleEndDate: tender?.documentDownloadSaleEndDate || '-',
    bidSubmissionStartDate: tender?.bidSubmissionStartDate || '-',
    bidSubmissionEndDate: tender?.bidSubmissionEndDate || '-',
    tendersDocuments: tender?.tendersDocuments || '-',
    technicalDocumentOfBidder: tender?.technicalDocumentOfBidder || '-',
    financialDocumentOfBidder: tender?.financialDocumentOfBidder || '-',
    AOC: tender?.AOC || '-',
    documentType: tender?.documentType || '-',
    tenderInvitingAuthority: tender?.tenderInvitingAuthority || '-',
    tname: tender?.tname || '-',
    address: tender?.address || '-',
    estimateCost: tender?.estimateCost || '-',
    nameOfBidder: tender?.nameOfBidder || '-',
    subCategory: tender?.subCategory || '-',
    organisationChain: tender?.organisationChain || '-',
    tenderRefNo: tender?.tenderRefNo || '-',
    tenderStatus: tender?.tenderStatus || '-',
    bidNumber: tender?.bidNumber || '-',
    awardedCurrency: tender?.awardedCurrency || '-',
    awardedValue: tender?.awardedValue || '-',
    documentLink: tender?.documentLink || '-',
  }));

  const gridStyle = {
    height: 'auto',
    width: isSidebarOpen ? '80%' : '90%',
    marginLeft: isSidebarOpen ? '19%' : '7%',
    transition: 'margin-left 0.3s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px 0px',
    paddingLeft: '10px',
  };

  const innerDivStyle = {
    border: '1px solid #F7F7F8',
    width: '99%',
    padding: '30px 10px',
  };

  const rowColors = ['#F7F9FB', 'white'];
  
  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-cell': {
      padding: theme.spacing(1),
    },
    '& .MuiDataGrid-row': {
      '&:nth-of-type(odd)': {
        backgroundColor: rowColors[0],
      },
      '&:nth-of-type(even)': {
        backgroundColor: rowColors[1],
      },
    },
  }));

  return (
    <div style={gridStyle}>
      <Box sx={innerDivStyle}>
        <Box 
          sx={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'space-between', 
            mb: 2,
            flexDirection: {
              md:'row',
              xs:'column',
              sm:'column'
            }
          }}
        >
          <Typography style={{ paddingLeft: '20px', color: '#0d2136' }} className='title-2'>
            TENDER MASTER
          </Typography>

          <Box sx={{
            display:'flex',
            flexDirection:{
              xs:'column',
              md:'row'
            },
            width:{
              lg:'60%',
              md:'70%',
              xs:'100%'
            },
            justifyContent:'space-between'
          }}>
            <TextField
              id="tenderId"
              name="tenderId"
              label="Search Tender ID"
              size="small"
              value={tenderIdN}
              onChange={handleSearchChange}
              variant="outlined"
              InputProps={{
                sx: {
                  mb:1
                },
              }}
              InputLabelProps={{
                sx: {
                  color: 'gray',
                  transform: 'translate(14px, 8px)',
                  fontSize:'17px',
                  '&.MuiInputLabel-shrink': {
                    transform: 'translate(14px, -8px) scale(0.75)', 
                  },
                },
              }}
              sx={{
                width: {
                  xl: '40%',
                  lg: '40%',
                  md: '40%',
                  xs: '100%'
                }, 
                mt:{
                  sm:1
                }
              }}
            />

            <Box sx={{
              display:'flex',
              width:{
                xs:'100%',
                md:'60%',
                lg:'60%'
              },
              flexDirection:{
                lg:'row',
                md:'row'
              },
              justifyContent:{
                lg:'flex-end',
                md:'flex-end'
              },
              alignItems:'center'
            }}>
              <Button
                component="label"
                size="small"
                sx={{
                  backgroundColor:'#fff',
                  color: '#23CCEF',
                  border: '0.1px solid #23CCEF',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  width:{
                    md:'auto',
                    xs:'auto',
                  },
                  ml:{
                    xs:0,
                    md:0,
                    lg:0,
                    xl:0
                  },
                  mt:{
                    xs:1,
                    sm:0,
                    md:0,
                    lg:0,
                    xl:0
                  },
                  '&:hover': {
                    backgroundColor: '#23CCEF',
                    color: '#fff',
                  },
                }}
              >
                <AddIcon sx={{ marginLeft: '2px' }} />
                <Typography sx={{fontSize:{md:'10px',lg:'16px'}}}>Import Excel</Typography>
                <input type="file" hidden onChange={importExcel} accept=".xlsx, .xls" />
              </Button>
              
              <Button
                size="small"
                className="tenderButton"
                sx={{
                  backgroundColor:'#fff',
                  color: '#23CCEF',
                  border: '0.1px solid #23CCEF',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontWeight:'bold',
                  width:{
                    md:'auto',
                    xs:'auto'
                  },
                  ml:{
                    xs:1,
                    md:2,
                    lg:2,
                    xl:2
                  },
                  mt:{
                    xs:1,
                    sm:0,
                    md:0,
                    lg:0,
                    xl:0
                  },
                  '&:hover': {
                    backgroundColor: '#23CCEF',
                    color: '#fff',
                  },
                }}
                onClick={handleAddTenderOpen}
              >
                <AddIcon sx={{ marginLeft: '2px' }} />
                <Typography sx={{fontSize:{md:'10px',lg:'16px'}}}>Add Tender</Typography>
              </Button>
            </Box>
          </Box>
        </Box>

        <div ref={dataGridRef}>
         
          <StyledDataGrid
  rows={rows}
  columns={columns(handleDeleteTender, handleEditTender)}
  paginationMode="server"
  rowCount={pagination?.totalTenders || 0}
  paginationModel={paginationModel}
  onPaginationModelChange={handlePaginationModelChange}
  onStateChange={() => {
    if (shouldMaintainScroll) {
      restoreScrollPosition();
    }
  }}
  pageSizeOptions={[5, 10, 50, 100]}
  checkboxSelection
  loading={loading}
  autoHeight
  disableVirtualization={false}
  rowHeight={52}
  getRowId={(row) => row.id}
/>

        </div>

        <AddTender
          open={tenderOpen}
          handleClose={handleAddTenderClose}
          handleAddTender={handleAddTender}
          currentTender={currentTender}
          editTender={(tenderId, tenderData) => {
            saveScrollPosition();
            dispatch(editTender(tenderId, tenderData)).then(() => {
              dispatch(fetchTenders(paginationModel.page + 1, paginationModel.pageSize, tenderIdN));
            });
          }}
        />
      </Box>
    </div>
  );
};

export default TenderComponent;


