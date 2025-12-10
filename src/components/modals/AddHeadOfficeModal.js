// // src/components/modals/AddHeadOfficeModal.jsx
// import React from 'react';
// import { Modal, Box, Typography, TextField, Button } from '@mui/material';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { toast } from 'react-toastify';
// import { baseUrl } from '../../config/config';

// const validationSchema = Yup.object({
//   officeName: Yup.string().required('Office Name आवश्यक आहे'),
//   address: Yup.string().required('Address आवश्यक आहे'),
//   contactNumber: Yup.string().required('Contact Number आवश्यक आहे'),
//   email: Yup.string().email('Invalid email').required('Email आवश्यक आहे'),
// //   spOfficeBranch: Yup.string().required('SP Office Branch आवश्यक आहे'),
// });

// const AddHeadOfficeModal = ({ open, handleClose, currentOffice, onSuccess }) => {
//   const formik = useFormik({
//     initialValues: {
//       officeName: currentOffice?.officeName || '',
//       address: currentOffice?.address || '',
//       contactNumber: currentOffice?.contactNumber || '',
//       email: currentOffice?.email || '',
//       spOfficeBranch: currentOffice?.spOfficeBranch || '',
//     },
//     validationSchema,
//     enableReinitialize: true,
//     onSubmit: async (values) => {
//       try {
//         const url = currentOffice
//           ? `${baseUrl}/editHeadoffice/${currentOffice._id}`
//           : `${baseUrl}/addHeadoffice`;

//         const res = await fetch(url, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(values),
//         });

//         const data = await res.json();
//         if (res.ok && data.success) {
//           toast.success(currentOffice ? 'Updated!' : 'Head Office जोडले!');
//           onSuccess();
//         } else {
//           toast.error(data.message || 'काहीतरी चुकले');
//         }
//       } catch (err) {
//         toast.error('Server Error');
//       }
//     },
//   });

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: { xs: '95%', sm: '70%', md: '50%' },
//         maxWidth: 600,
//         bgcolor: 'background.paper',
//         boxShadow: 24,
//         p: 4,
//         borderRadius: '12px',
//         maxHeight: '90vh',
//         overflowY: 'auto',
//       }}>
//         <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#0d2136', textAlign: 'center' }}>
//           {currentOffice ? 'Edit Head Office' : 'Add New Head Office'}
//         </Typography>

//         <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//           <TextField label="Office Name" name="officeName" value={formik.values.officeName} onChange={formik.handleChange} fullWidth required />
//           <TextField label="Address" name="address" value={formik.values.address} onChange={formik.handleChange} fullWidth required />
//           <TextField label="Contact Number" name="contactNumber" value={formik.values.contactNumber} onChange={formik.handleChange} fullWidth required />
//           <TextField label="Email" name="email" type="email" value={formik.values.email} onChange={formik.handleChange} fullWidth required />
//           {/* <TextField label="SP Office Branch" name="spOfficeBranch" value={formik.values.spOfficeBranch} onChange={formik.handleChange} fullWidth required /> */}

//           <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
//             <Button onClick={handleClose} variant="contained" sx={{ bgcolor: '#FB404B', '&:hover': { bgcolor: '#e63540' } }}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained" sx={{ bgcolor: '#20B2AA', '&:hover': { bgcolor: '#1a9a8f' } }}>
//               {currentOffice ? 'Update' : 'Add Head Office'}
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default AddHeadOfficeModal;


// ==========================================================
// src/components/modals/AddHeadOfficeModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { baseUrl } from '../../config/config';

const validationSchema = Yup.object({
  officeName: Yup.string().required('Office Name required'),
  officeType: Yup.string().required('Office Type is required'),
  address: Yup.string().required('Address required'),
  contactNumber: Yup.string().required('Contact required'),
  email: Yup.string().email('Invalid email').required('Email required'),
});

const AddHeadOfficeModal = ({ open, handleClose, currentOffice, onSuccess }) => {
  const [officeTypes, setOfficeTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  // Fetch Office Types from API
  useEffect(() => {
    const fetchOfficeTypes = async () => {
      try {
        const res = await fetch(`${baseUrl}/getOffices`);
        const data = await res.json();
        if (res.ok && data.offices) {
          setOfficeTypes(data.offices);
        } else {
          toast.error('Failed to load office types');
        }
      } catch (err) {
        toast.error('Error loading office types');
      } finally {
        setLoadingTypes(false);
      }
    };
    if (open) fetchOfficeTypes();
  }, [open]);

  const formik = useFormik({
    initialValues: {
      officeName: currentOffice?.officeName || '',
      officeType: currentOffice?.officeType || '',
      address: currentOffice?.address || '',
      contactNumber: currentOffice?.contactNumber || '',
      email: currentOffice?.email || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const url = currentOffice
          ? `${baseUrl}/editheadoffice/${currentOffice._id}`
          : `${baseUrl}/addHeadoffice`;

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          toast.success(currentOffice ? 'Updated Successfully!' : 'Head Office Added!');
          onSuccess();
        } else {
          toast.error(data.message || 'Operation failed');
        }
      } catch (err) {
        toast.error('Server Error');
      }
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '95%', sm: 550 },
        bgcolor: 'background.paper',
        boxShadow: 24, p: 4, borderRadius: 3,
        maxHeight: '90vh', overflowY: 'auto'
      }}>
        <Typography variant="h6" textAlign="center" mb={3} fontWeight={700}>
          {currentOffice ? 'Edit Head Office' : 'Add New Head Office'}
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            label="Office Name"
            name="officeName"
            value={formik.values.officeName}
            onChange={formik.handleChange}
            fullWidth required
          />

          <FormControl fullWidth required>
            <InputLabel>Office Type</InputLabel>
            <Select
              name="officeType"
              value={formik.values.officeType}
              onChange={formik.handleChange}
              label="Office Type"
              disabled={loadingTypes}
            >
              <MenuItem value="" disabled>
                {loadingTypes ? 'Loading types...' : 'Select Office Type'}
              </MenuItem>
              {officeTypes.map((type) => (
                <MenuItem key={type._id} value={type.officeType}>
                  {type.officeType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField label="Address" name="address" value={formik.values.address} onChange={formik.handleChange} fullWidth required />
          <TextField label="Contact Number" name="contactNumber" value={formik.values.contactNumber} onChange={formik.handleChange} fullWidth required />
          <TextField label="Email" name="email" type="email" value={formik.values.email} onChange={formik.handleChange} fullWidth required />

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
            <Button onClick={handleClose} variant="outlined" color="error" size="large">
              Cancel
            </Button>
            <Button type="submit" variant="contained" size="large" sx={{ bgcolor: '#20B2AA', minWidth: 120 }}>
              {currentOffice ? 'Update' : 'Add Headoffice'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddHeadOfficeModal;

