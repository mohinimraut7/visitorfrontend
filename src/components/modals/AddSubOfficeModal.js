// src/components/modals/AddSubOfficeModal.jsx
import React from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { baseUrl } from '../../config/config';

const validationSchema = Yup.object({
  subofficeName: Yup.string().required('Suboffice Name आवश्यक आहे'),
  address: Yup.string().required('Address आवश्यक आहे'),
  headOfficeId: Yup.string().required('Head Office निवडा'),
  contactNumber: Yup.string(),
  email: Yup.string().email('Invalid email'),
});

const AddSubOfficeModal = ({ open, handleClose, currentSuboffice, headoffices, onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      subofficeName: currentSuboffice?.subofficeName || '',
      address: currentSuboffice?.address || '',
      contactNumber: currentSuboffice?.contactNumber || '',
      email: currentSuboffice?.email || '',
      headOfficeId: currentSuboffice?.headOfficeId?._id || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const url = currentSuboffice
          ? `${baseUrl}/editSuboffice/${currentSuboffice._id}`
          : `${baseUrl}/addSuboffice`;

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          toast.success(currentSuboffice ? 'Updated!' : 'Suboffice जोडले!');
          onSuccess();
        } else {
          toast.error(data.message || 'काहीतरी चुकले');
        }
      } catch (err) {
        toast.error('Server Error');
      }
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '95%', sm: '70%', md: '50%' },
        maxWidth: 650,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '12px',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#0d2136', textAlign: 'center' }}>
          {currentSuboffice ? 'Edit Suboffice' : 'Add New Suboffice'}
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Suboffice Name" name="subofficeName" value={formik.values.subofficeName} onChange={formik.handleChange} fullWidth required />
          <TextField label="Address" name="address" value={formik.values.address} onChange={formik.handleChange} fullWidth required multiline rows={2} />

          <FormControl fullWidth required>
            <InputLabel>Head Office</InputLabel>
            <Select
              name="headOfficeId"
              value={formik.values.headOfficeId}
              onChange={formik.handleChange}
              label="Head Office"
            >
              {headoffices.map((ho) => (
                <MenuItem key={ho._id} value={ho._id}>
                  {ho.officeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField label="Contact Number" name="contactNumber" value={formik.values.contactNumber} onChange={formik.handleChange} fullWidth />
          <TextField label="Email" name="email" type="email" value={formik.values.email} onChange={formik.handleChange} fullWidth />

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button onClick={handleClose} variant="contained" sx={{ bgcolor: '#FB404B', '&:hover': { bgcolor: '#e63540' } }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#20B2AA', '&:hover': { bgcolor: '#1a9a8f' } }}>
              {currentSuboffice ? 'Update' : 'Add Suboffice'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddSubOfficeModal;