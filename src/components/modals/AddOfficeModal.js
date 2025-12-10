// src/components/modals/AddOfficeModal.jsx
import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { baseUrl } from '../../config/config';

// Validation – फक्त officeType required
const validationSchema = Yup.object({
  officeType: Yup.string()
    .required('Office Type is required')
    .min(2, 'Minimum 2 characters')
    .max(50, 'Maximum 50 characters')
    .trim(),
});

const AddOfficeModal = ({ open, handleClose, currentOffice, onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      officeType: currentOffice?.officeType || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const url = currentOffice
          ? `${baseUrl}/editOffice/${currentOffice._id}`
          : `${baseUrl}/addOffice`;

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ officeType: values.officeType.trim() }),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success(
            currentOffice 
              ? 'Office Type updated successfully!' 
              : 'Office Type added successfully!'
          );
          resetForm();
          onSuccess();
        } else {
          toast.error(data.message || 'Failed to save Office Type');
        }
      } catch (err) {
        console.error(err);
        toast.error('Server Error');
      } finally {
        setSubmitting(false);
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
        width: { xs: '95%', sm: '420px' },
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '16px',
        outline: 'none'
      }}>
        <Typography variant="h6" sx={{ 
          mb: 4, 
          fontWeight: 700, 
          textAlign: 'center',
          color: '#0d2136'
        }}>
          {currentOffice ? 'Edit Office Type' : 'Add New Office Type'}
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            label="Office Type"
            name="officeType"
            value={formik.values.officeType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.officeType && Boolean(formik.errors.officeType)}
            helperText={formik.touched.officeType && formik.errors.officeType}
            fullWidth
            margin="normal"
            required
            autoFocus
            placeholder="e.g. Head Office,Sub Office"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button 
              onClick={handleClose} 
              variant="outlined" 
              color="error"
              size="large"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              disabled={formik.isSubmitting}
              sx={{ 
                bgcolor: '#20B2AA',
                '&:hover': { bgcolor: '#1a9a8f' },
                minWidth: '120px'
              }}
            >
              {formik.isSubmitting ? 'Saving...' : (currentOffice ? 'Update' : 'Add Type')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddOfficeModal;