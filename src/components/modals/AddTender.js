import React, { useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddRole.css';
import tendertype from '../../data/tendertype';
import tenderStatus from '../../data/tenderStatus';
import tenderCategory from '../../data/tenderCategory';
import formofcontract from '../../data/formofcontract';
import noOfCovers from '../../data/noOfCovers';
import coverType from '../../data/coverType';
import productCategory from '../../data/productCategory';
import documentType from '../../data/documentType';
import { baseUrl } from '../../config/config';
const validationSchema = Yup.object({
    // cn: Yup.string().required('Consumer Number is required'),
    // meterNumber: Yup.string().required('meterNumber is required'),
});
const AddTender = ({ open, handleClose, handleAddTender, currentTender, editTender }) => {
    const [tarifftype, setTariffType] = React.useState([]);
    useEffect(() => {
        fetch(`${baseUrl}/getTarriffs`)
        
            .then(response => response.json())
            .then(data => setTariffType(data))
            .catch(error => console.error('Error fetching tariff types:', error));
    }, []);
    const formik = useFormik({
        initialValues: {
           tenderId: currentTender ? currentTender.tenderId : '',
           tenderType: currentTender ? currentTender.tenderType : '',
           tenderCategory: currentTender ? currentTender.tenderCategory : '',
           formOfContract: currentTender ? currentTender.formOfContract : '',
           noOfCovers: currentTender ? currentTender.noOfCovers : '',
            coverType: currentTender ? currentTender.coverType : '',
            tenderFee: currentTender ? currentTender.tenderFee : '',
            emdAmount: currentTender ? currentTender.emdAmount : '',
            tenderTitle: currentTender ? currentTender.tenderTitle : '',
            workDescription: currentTender ? currentTender.workDescription : '',
            tenderValueInRs: currentTender ? currentTender.tenderValueInRs : '',
            productCategory: currentTender ? currentTender.productCategory : '',
            bidValidityDays: currentTender ? currentTender.bidValidityDays : '',    
            periodOfWorkDays: currentTender ? currentTender.periodOfWorkDays : '', 
            preBidMeetingPlace: currentTender ? currentTender.preBidMeetingPlace : '', 
            preBidMeetingAddress: currentTender ? currentTender.preBidMeetingAddress : '', 
            preBidMeetingDate: currentTender ? currentTender.preBidMeetingDate : '', 
            criticalDates: currentTender ? currentTender.criticalDates : '', 
            publishedDate: currentTender ? currentTender.publishedDate : '', 
            documentDownloadSaleEndDate: currentTender ? currentTender.documentDownloadSaleEndDate : '', 
            bidSubmissionStartDate: currentTender ? currentTender.bidSubmissionStartDate : '', 
            bidSubmissionEndDate: currentTender ? currentTender.bidSubmissionEndDate : '', 
            tendersDocuments: currentTender ? currentTender.tendersDocuments : '', 
            technicalDocumentOfBidder: currentTender ? currentTender.technicalDocumentOfBidder : '',
            financialDocumentOfBidder: currentTender ? currentTender.financialDocumentOfBidder : '',
              AOC: currentTender ? currentTender.AOC : '', 
             documentType: currentTender ? currentTender.documentType : '',
             tenderInvitingAuthority:currentTender ? currentTender.tenderInvitingAuthority : '',
              tname:currentTender ? currentTender.tname : '',
               address:currentTender ? currentTender.address : '',
             estimateCost:currentTender ? currentTender.estimateCost : '',
                nameOfBidder: currentTender ? currentTender.nameOfBidder : '', 
              subCategory:currentTender ? currentTender.subCategory : '',
            organisationChain: currentTender ? currentTender.organisationChain : '', 
            tenderRefNo: currentTender ? currentTender.tenderRefNo : '', 
            tenderStatus: currentTender ? currentTender.tenderStatus : '', 
            bidNumber: currentTender ? currentTender.bidNumber : '', 
            awardedCurrency: currentTender ? currentTender.awardedCurrency : '', 
            awardedValue:currentTender ? currentTender. awardedValue : '', 
            documentLink: currentTender ? currentTender.documentLink : '', 
          
        },
         validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      if (currentTender) {
        editTender(currentTender._id, formData);
      } else {
        handleAddTender(formData);
      }
      handleClose();
    },


    });
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '100%', sm: '100%', md: '100%', lg: '60%', xl: '60%' },
                    // maxWidth: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: {
                     xs: 2, 
                     lg: 4,
                   },
                    borderRadius: '4px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '5px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#20B2AA',
                        borderRadius: '5px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#1EA2C1',
                    },
                }}
            >

                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}><Typography sx={{textTransform:'uppercase'}}>Add Tender</Typography></Box>
                <Box
                    sx={{
                        width: '100%',
                        padding: '30px',
                        margin: 'auto',
                        borderRadius: '4px',
                    }}
                    component='form'
                    onSubmit={formik.handleSubmit}
                >
                    

<Box display="flex" alignItems="center" gap={2} mb={1.5} sx={{}}>


                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom  sx={{ flex: '0 0 20%' }}>
                        Tender Id
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="tenderId"
                        name="tenderId"
                        label="Tender Id"
                        value={formik.values.tenderId}
                        onChange={formik.handleChange}
                        error={formik.touched.tenderId && Boolean(formik.errors.tenderId)}
                        helperText={formik.touched.tenderId && formik.errors.tenderId}
                        // margin="normal"
                        variant="outlined"
                        sx={{
                           flex: '0 0 80%'
                        }}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>
<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}
>
                       Tender Type
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input' size="small" sx={{flex: '0 0 80%'}}>
                        <InputLabel id="ward-label">Tender Type</InputLabel>
                        <Select
                            labelId="tenderType"
                            id="tenderType"
                            name="tenderType"
                            value={formik.values.tenderType}
                            onChange={formik.handleChange}
                            label="Ward"
                        >
                            {tendertype.map((data, index) => (
                                <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                       Tender Category
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input' size="small" sx={{flex: '0 0 80%'}}>
                        <InputLabel id="ward-label">Tender Category</InputLabel>
                        <Select
                            labelId="tenderCategory"
                            id="tenderCategory"
                            name="tenderCategory"
                            value={formik.values.tenderCategory}
                            onChange={formik.handleChange}
                            label="tenderCategory"
                        >
                            {tenderCategory.map((data, index) => (
                                <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
  <Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                       Form Of Contract
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input' size="small" sx={{flex: '0 0 80%' }}>
                        <InputLabel id="ward-label">Form Of Contract</InputLabel>
                        <Select
                            labelId="formOfContract"
                            id="formOfContract"
                            name="formOfContract"
                            value={formik.values.formOfContract}
                            onChange={formik.handleChange}
                            label="formOfContract"
                        >
                            {formofcontract.map((data, index) => (
                                <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}> 
                        No.Of Covers
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input' size="small" sx={{flex: '0 0 80%' }}>
                        <InputLabel id="noOfCovers">  No.Of Covers</InputLabel>
                        <Select
                            labelId="noOfCovers"
                            id="noOfCovers"
                            name="noOfCovers"
                            value={formik.values.noOfCovers}
                            onChange={formik.handleChange}
                            label="noOfCovers"
                        >
                            {noOfCovers.map((data, index) => (
                                <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
</Box>


<Box display="flex" alignItems="center" gap={2} mb={1.5}>


<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                    Cover Type
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input' size="small" sx={{flex: '0 0 80%'}}>
                        <InputLabel id="coverType">Cover Type</InputLabel>
                        <Select
                            labelId="coverType"
                            id="coverType"
                            name="coverType"
                            value={formik.values.coverType}
                            onChange={formik.handleChange}
                            label="coverType"
                        >
                            {coverType.map((data, index) => (
                                <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
</Box>


<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                    Tender Fee
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="tenderFee"
                        name="tenderFee"
                        label="Tender Fee"
                        value={formik.values.tenderFee}
                        onChange={formik.handleChange}
                        error={formik.touched.tenderFee && Boolean(formik.errors.tenderFee)}
                        helperText={formik.touched.tenderFee && formik.errors.tenderFee}
                        // margin="normal"
                        variant="outlined"
                         sx={{
                            flex: '0 0 80%'
                          
                        }}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />

    </Box> 


    <Box display="flex" alignItems="center" gap={2} mb={1.5}>
                    <Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                    Emd Amount
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="emdAmount"
                        name="emdAmount"
                        label="Emd Amount"
                        value={formik.values.emdAmount}
                        onChange={formik.handleChange}
                        error={formik.touched.emdAmount && Boolean(formik.errors.emdAmount)}
                        helperText={formik.touched.emdAmount && formik.errors.emdAmount}
                        // margin="normal"
                        variant="outlined"
                         sx={{
                            flex: '0 0 80%'
                        }}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
      </Box> 


<Box display="flex" alignItems="center" gap={2} mb={1.5}>
                    <Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
             Tender Title
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="tenderTitle"
                        name="tenderTitle"
                        label="Tender Title"
                        value={formik.values.tenderTitle}
                        onChange={formik.handleChange}
                        error={formik.touched.tenderTitle && Boolean(formik.errors.tenderTitle)}
                        helperText={formik.touched.tenderTitle && formik.errors.tenderTitle}
                        variant="outlined"
                         sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>
<Box display="flex" alignItems="center" gap={2} mb={1.5} >
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                    Work Description
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="workDescription"
                        name="workDescription"
                        label="Work Description"
                        value={formik.values.workDescription}
                        onChange={formik.handleChange}
                        error={formik.touched.workDescription && Boolean(formik.errors.workDescription)}
                        helperText={formik.touched.workDescription && formik.errors.workDescription}
                        // margin="normal"
                        variant="outlined"
                         sx={{
                            flex: '0 0 80%'
                        }}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                    Tender Value In Rs
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="tenderValueInRs"
                        name="tenderValueInRs"
                        label="Tender Value In Rs"
                        value={formik.values.tenderValueInRs}
                        onChange={formik.handleChange}
                        error={formik.touched.tenderValueInRs && Boolean(formik.errors.tenderValueInRs)}
                        helperText={formik.touched.tenderValueInRs && formik.errors.tenderValueInRs}
                        variant="outlined"
                         sx={{
                          flex: '0 0 80%'
                        }}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />

</Box>

 <Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                   Product Category
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input' size="small" sx={{flex: '0 0 80%'}}>
                        <InputLabel id="coverType">Product Category</InputLabel>
                        <Select
                            labelId="productCategory"
                            id="productCategory"
                            name="productCategory"
                            value={formik.values.productCategory}
                            onChange={formik.handleChange}
                            label="Product Category"
                        >
                            {productCategory.map((data, index) => (
                                <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
</Box>
<Box display="flex" alignItems="center" gap={2} mb={1.5}>
                    <Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}> 
                Bid Validity Days
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="bidValidityDays"
                        name="bidValidityDays"
                        label="Bid Validity Days"
                        value={formik.values.bidValidityDays}
                        onChange={formik.handleChange}
                        error={formik.touched.bidValidityDays && Boolean(formik.errors.bidValidityDays)}
                        helperText={formik.touched.bidValidityDays && formik.errors.bidValidityDays}
                        // margin="normal"
                        variant="outlined"
                         sx={{
                            flex: '0 0 80%'
                        }}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
 <Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                Period Of Work Days
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="periodOfWorkDays"
                        name="periodOfWorkDays"
                        label="Period Of Work Days"
                        value={formik.values.periodOfWorkDays}
                        onChange={formik.handleChange}
                        error={formik.touched.periodOfWorkDays && Boolean(formik.errors.periodOfWorkDays)}
                        helperText={formik.touched.periodOfWorkDays && formik.errors.periodOfWorkDays}
                        // margin="normal"
                        variant="outlined"
                         sx={{
                            flex: '0 0 80%'
                        }}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
  </Box>  
  <Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                Pre Bid Meeting Place
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="preBidMeetingPlace"
                        name="preBidMeetingPlace"
                        label="Pre Bid Meeting Place"
                        value={formik.values.preBidMeetingPlace}
                        onChange={formik.handleChange}
                        error={formik.touched.preBidMeetingPlace && Boolean(formik.errors.preBidMeetingPlace)}
                        helperText={formik.touched.preBidMeetingPlace && formik.errors.preBidMeetingPlace}
                        // margin="normal"
                        variant="outlined"
                         sx={{
                            flex: '0 0 80%'
                        }}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
    Pre Bid Meeting Address
</Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="preBidMeetingAddress"
                        name="preBidMeetingAddress"
                        label="Pre Bid Meeting Address"
                        value={formik.values.preBidMeetingAddress}
                        onChange={formik.handleChange}
                        error={formik.touched.preBidMeetingAddress && Boolean(formik.errors.preBidMeetingAddress)}
                        helperText={formik.touched.preBidMeetingAddress && formik.errors.preBidMeetingAddress}
                        // margin="normal"
                        variant="outlined"
                         sx={{
                       flex: '0 0 80%'
                        }}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
                        <Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                            Pre Bid Meeting Date
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="preBidMeetingDate"
                            name="preBidMeetingDate"
                            type="date"
                            value={formik.values.preBidMeetingDate}
                            onChange={formik.handleChange}
                            error={formik.touched.preBidMeetingDate && Boolean(formik.errors.preBidMeetingDate)}
                            helperText={formik.touched.preBidMeetingDate && formik.errors.preBidMeetingDate}
                            variant="outlined"
                            sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        />
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
                        <Typography className='Auth-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                         Critical Dates
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="criticalDates"
                            name="criticalDates"
                            type="date"
                            value={formik.values.criticalDates}
                            onChange={formik.handleChange}
                            error={formik.touched.criticalDates && Boolean(formik.errors.criticalDates)}
                            helperText={formik.touched.criticalDates && formik.errors.criticalDates}
                            variant="outlined"
                            sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        />
                    </Box>

                    <Box display="flex" alignItems="center" gap={2} mb={1.5}>
                        <Typography className='Auth-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                        Published Date
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="publishedDate"
                            name="publishedDate"
                            type="date"
                            value={formik.values.publishedDate}
                            onChange={formik.handleChange}
                            error={formik.touched.publishedDate && Boolean(formik.errors.publishedDate)}
                            helperText={formik.touched.publishedDate && formik.errors.publishedDate}
                            variant="outlined"
                            sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        />
                    </Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
                        <Typography className='Auth-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                        Document Download Sale End Date
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="documentDownloadSaleEndDate"
                            name="documentDownloadSaleEndDate"
                            type="date"
                            value={formik.values.documentDownloadSaleEndDate}
                            onChange={formik.handleChange}
                            error={formik.touched.documentDownloadSaleEndDate && Boolean(formik.errors.documentDownloadSaleEndDate)}
                            helperText={formik.touched.documentDownloadSaleEndDate && formik.errors.documentDownloadSaleEndDate}
                            variant="outlined"
                           sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        />
                    </Box>
                    <Box display="flex" alignItems="center" gap={2} mb={1.5}>
                        <Typography className='Auth-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                        Bid Submission Start Date
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="bidSubmissionStartDate"
                            name="bidSubmissionStartDate"
                            type="date"
                            value={formik.values.bidSubmissionStartDate}
                            onChange={formik.handleChange}
                            error={formik.touched.bidSubmissionStartDate && Boolean(formik.errors.bidSubmissionStartDate)}
                            helperText={formik.touched.bidSubmissionStartDate && formik.errors.bidSubmissionStartDate}
                            variant="outlined"
                            sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        />
 </Box>
 <Box display="flex" alignItems="center" gap={2} mb={1.5}>
                        <Typography className='Auth-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                        Bid Submission End Date
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="bidSubmissionEndDate"
                            name="bidSubmissionEndDate"
                            type="date"
                            value={formik.values.bidSubmissionEndDate}
                            onChange={formik.handleChange}
                            error={formik.touched.bidSubmissionEndDate && Boolean(formik.errors.bidSubmissionEndDate)}
                            helperText={formik.touched.bidSubmissionEndDate && formik.errors.bidSubmissionEndDate}
                            variant="outlined"
                            sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        />
                    </Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
  <Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
    Tenders Documents
  </Typography>

  <Box sx={{ flex: '0 0 80%' }}>
    <input
      id="tendersDocuments"
      name="tendersDocuments"
      type="file"
      onChange={(event) => {
        formik.setFieldValue("tendersDocuments", event.currentTarget.files[0]);
      }}
      style={{ width: '100%' }}
    />
    {formik.touched.tendersDocuments && formik.errors.tendersDocuments && (
      <Typography variant="caption" color="error">
        {formik.errors.tendersDocuments}
      </Typography>
    )}
  </Box>
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
  <Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
    Technical Document Of Bidder
  </Typography>

  <Box sx={{ flex: '0 0 80%' }}>
    <input
      id="technicalDocumentOfBidder"
      name="technicalDocumentOfBidder"
      type="file"
      onChange={(event) => {
        formik.setFieldValue("technicalDocumentOfBidder", event.currentTarget.files[0]);
      }}
      style={{ width: '100%' }}
    />
    {formik.touched.technicalDocumentOfBidder && formik.errors.technicalDocumentOfBidder && (
      <Typography variant="caption" color="error">
        {formik.errors.technicalDocumentOfBidder}
      </Typography>
    )}
  </Box>
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
  <Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
   Financial Document Of Bidder
  </Typography>

  <Box sx={{ flex: '0 0 80%' }}>
    <input
      id="financialDocumentOfBidder"
      name="financialDocumentOfBidder"
      type="file"
      onChange={(event) => {
        formik.setFieldValue("financialDocumentOfBidder", event.currentTarget.files[0]);
      }}
      style={{ width: '100%' }}
    />
    {formik.touched.financialDocumentOfBidder && formik.errors.financialDocumentOfBidder && (
      <Typography variant="caption" color="error">
        {formik.errors.financialDocumentOfBidder}
      </Typography>
    )}
  </Box>
</Box>


<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
           AOC
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="AOC"
                        name="AOC"
                        label="AOC"
                        value={formik.values.AOC}
                        onChange={formik.handleChange}
                        error={formik.touched.AOC && Boolean(formik.errors.AOC)}
                        helperText={formik.touched.AOC && formik.errors.AOC}
                        variant="outlined"
                         sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
                 Document Type
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input' size="small" sx={{flex: '0 0 80%'}}>
                        <InputLabel id="documentType">Document Type</InputLabel>
                        <Select
                            labelId="documentType"
                            id="documentType"
                            name="documentType"
                            value={formik.values.documentType}
                            onChange={formik.handleChange}
                            label="Document Type"
                        >
                            {documentType.map((data, index) => (
                                <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
             Tender Inviting Authority
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="tenderInvitingAuthority"
                        name="tenderInvitingAuthority"
                        label="tenderInvitingAuthority"
                        value={formik.values.tenderInvitingAuthority}
                        onChange={formik.handleChange}
                        error={formik.touched.tenderInvitingAuthority && Boolean(formik.errors.tenderInvitingAuthority)}
                        helperText={formik.touched.tenderInvitingAuthority && formik.errors.tenderInvitingAuthority}
                        variant="outlined"
                         sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
           Name
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="tname"
                        name="tname"
                        label="tname"
                        value={formik.values.tname}
                        onChange={formik.handleChange}
                        error={formik.touched.tname && Boolean(formik.errors.tname)}
                        helperText={formik.touched.tname && formik.errors.tname}
                        variant="outlined"
                         sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
           Address
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="address"
                        name="address"
                        label="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        variant="outlined"
                         sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
           Estimate Cost
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="estimateCost"
                        name="estimateCost"
                        label="estimateCost"
                        value={formik.values.estimateCost}
                        onChange={formik.handleChange}
                        error={formik.touched.estimateCost && Boolean(formik.errors.estimateCost)}
                        helperText={formik.touched.estimateCost && formik.errors.estimateCost}
                        variant="outlined"
                         sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
                    <Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}> 
             Bidder Name
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="nameOfBidder"
                        name="nameOfBidder"
                        label="Bidder Name"
                        value={formik.values.nameOfBidder}
                        onChange={formik.handleChange}
                        error={formik.touched.nameOfBidder && Boolean(formik.errors.nameOfBidder)}
                        helperText={formik.touched.nameOfBidder && formik.errors.nameOfBidder}
                        // margin="normal"
                        variant="outlined"
                          sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
           Sub Category
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="subCategory"
                        name="subCategory"
                        label="Sub Category"
                        value={formik.values.subCategory}
                        onChange={formik.handleChange}
                        error={formik.touched.subCategory && Boolean(formik.errors.subCategory)}
                        helperText={formik.touched.subCategory && formik.errors.subCategory}
                        variant="outlined"
                         sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
             Organization Chain
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="organisationChain"
                        name="organisationChain"
                        label="Organization Chain"
                        value={formik.values.organisationChain}
                        onChange={formik.handleChange}
                        error={formik.touched.organisationChain && Boolean(formik.errors.organisationChain)}
                        helperText={formik.touched.organisationChain && formik.errors.organisationChain}
                        variant="outlined"
                         sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
             Tender Ref. No.
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="tenderRefNo"
                        name="tenderRefNo"
                        label="Tender Ref No"
                        value={formik.values.tenderRefNo}
                        onChange={formik.handleChange}
                        error={formik.touched.tenderRefNo && Boolean(formik.errors.tenderRefNo)}
                        helperText={formik.touched.tenderRefNo && formik.errors.tenderRefNo}
                        // margin="normal"
                        variant="outlined"
                        sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
 </Box>

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}
>
                       Tender Status
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input' size="small" sx={{flex: '0 0 80%'}}>
                        <InputLabel id="ward-label">Tender Status</InputLabel>
                        <Select
                            labelId="tenderStatus"
                            id="tenderStatus"
                            name="tenderStatus"
                            value={formik.values.tenderStatus}
                            onChange={formik.handleChange}
                            label="Tender Status"
                        >
                            {tenderStatus.map((data, index) => (
                                <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

</Box>

  

<Box display="flex" alignItems="center" gap={2} mb={1.5}>
                    <Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
             Bid Number
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="bidNumber"
                        name="bidNumber"
                        label="Bid Number"
                        value={formik.values.bidNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.bidNumber && Boolean(formik.errors.bidNumber)}
                        helperText={formik.touched.bidNumber && formik.errors.bidNumber}
                        // margin="normal"
                        variant="outlined"
                         sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>




  <Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
             Awarded Currency
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="awardedCurrency"
                        name="awardedCurrency"
                        label="Awarded Currency"
                        value={formik.values.awardedCurrency}
                        onChange={formik.handleChange}
                        error={formik.touched.awardedCurrency && Boolean(formik.errors.awardedCurrency)}
                        helperText={formik.touched.awardedCurrency && formik.errors.awardedCurrency}
                        // margin="normal"
                        variant="outlined"
                         sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
                    </Box>
                     <Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
             Awarded Value
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="awardedValue"
                        name="awardedValue"
                        label="Awarded Value"
                        value={formik.values.awardedValue}
                        onChange={formik.handleChange}
                        error={formik.touched.awardedValue && Boolean(formik.errors.awardedValue)}
                        helperText={formik.touched.awardedValue && formik.errors.awardedValue}
                        // margin="normal"
                        variant="outlined"
                        sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>
<Box display="flex" alignItems="center" gap={2} mb={1.5}>
<Typography className='A-R-Label' variant="subtitle1" gutterBottom sx={{ flex: '0 0 20%' }}>
             Document Link
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        id="documentLink"
                        name="documentLink"
                        label="Document Link"
                        value={formik.values.documentLink}
                        onChange={formik.handleChange}
                        error={formik.touched.documentLink && Boolean(formik.errors.documentLink)}
                        helperText={formik.touched.documentLink && formik.errors.documentLink}
                        // margin="normal"
                        variant="outlined"
                       sx={{color:'#1C1C1C',flex: '0 0 80%'}}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="button"
                            onClick={handleClose}
                            variant="contained"
                            sx={{
                                mr: 2,
                                backgroundColor: '#20B2AA',
                                width: '100px',
                                '&:hover': {
                                    backgroundColor: '#20B2AA',
                                    opacity: '0.8'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#FB404B',
                                '&:hover': {
                                    backgroundColor: '#FB404B',
                                    opacity: '0.8'
                                }
                            }}
                        >
                            {currentTender ? 'Update Tender' : 'Add Tender'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddTender;
