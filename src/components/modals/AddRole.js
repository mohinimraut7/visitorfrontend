// import React from 'react';
// import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
// import wardData from '../../data/warddata';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import './AddRole.css';
// import rolesdata from '../../data/rolesdata';
// import FormHelperText from '@mui/material/FormHelperText'; 
// const validationSchema = Yup.object({
//     name: Yup.string().required('Role name is required'),
//     email: Yup.string().required('Email is required'),
// });
// const AddRole = ({ open, handleClose, handleAddRole, currentRole, editRole }) => {
//     const formik = useFormik({
//         initialValues: {
//             name: currentRole ? currentRole.name : '',
//             email: currentRole ? currentRole.email : '',
//             // ward: currentRole ? currentRole.ward : '',
//         },
//         validationSchema: validationSchema,
//         enableReinitialize: true,
//         onSubmit: (values) => {
//             if (currentRole) {
//                 editRole(currentRole._id, values);
//             } else {
//                 handleAddRole(values);
//             }
//             handleClose();
//         },
//     });
//     return (
//         <Modal open={open} onClose={handleClose}>
//             <Box
//                 sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     width: { xs: '95%', sm: '75%', md: '50%', lg: '53%',xl: '55%' }, 
//                     maxWidth: 600,
//                     bgcolor: 'background.paper',
//                     boxShadow: 24,
//                     p: 4,
//                     borderRadius: '4px',
//                     maxHeight: '90vh',
//                     overflowY: 'auto',
//                     '&::-webkit-scrollbar': {
//                         width: '8px',
//                     },
//                     '&::-webkit-scrollbar-track': {
//                         background: '#f1f1f1',
//                         borderRadius: '5px',
//                     },
//                     '&::-webkit-scrollbar-thumb': {
//                         background: '#23CCEF',
//                         borderRadius: '5px',
//                     },
//                     '&::-webkit-scrollbar-thumb:hover': {
//                         background: '#1EA2C1',
//                     },
//                 }}
//             >
//                 <Box
//                     sx={{
//                         width: '100%',
//                         padding: '30px',
//                         margin: 'auto',
//                         borderRadius: '4px',
//                     }}
//                     component='form'
//                     onSubmit={formik.handleSubmit}
//                 >
// <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
//     ROLE NAME
// </Typography>
// <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input'>
//     <InputLabel id="role-label">Role</InputLabel>
//     <Select
//         labelId="role-label"
//         id="name"
//         name="name"
//         value={formik.values.name}
//         onChange={formik.handleChange}
//         label="Role Name"
//         error={formik.touched.name && Boolean(formik.errors.name)}
//     >
//         {rolesdata.map((role, index) => (
//             <MenuItem key={role.id} value={role.rolename}>{role.rolename}</MenuItem>
//         ))}
//     </Select>
//     {formik.touched.name && formik.errors.name ? (
//         <FormHelperText error>{formik.errors.name}</FormHelperText>
//     ) : null}
// </FormControl>

//                     <Typography className='A-R-Label' variant="subtitle1" gutterBottom>
//                         EMAIL
//                     </Typography>
//                     <TextField
//                         fullWidth
//                         id="email"
//                         name="email"
//                         label="Email"
//                         value={formik.values.email}
//                         onChange={formik.handleChange}
//                         error={formik.touched.email && Boolean(formik.errors.email)}
//                         helperText={formik.touched.email && formik.errors.email}
//                         margin="normal"
//                         variant="outlined"
//                         InputLabelProps={{
//                             sx: {
//                                 color: '#DDDDDD',
//                             },
//                         }}
//                     />

//                     <Typography className='A-R-Label' variant="subtitle1" gutterBottom>
//                         Office Type
//                     </Typography>
//                     <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input'>
//                         <InputLabel id="ward-label">Office Type</InputLabel>
//                         <Select
//                             labelId="ward-label"
//                             id="officeType"
//                             name="officeType"
//                             value={formik.values.officeType}
//                             onChange={formik.handleChange}
//                             label="Office Type"
//                         >
//                             {wardData.map((ward, index) => (
//                                 <MenuItem key={index} value={ward.ward}>{ward.ward}</MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>

//                     <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
//                         <Button
//                             type="button"
//                             onClick={handleClose}
//                             variant="contained"
//                              size="small"
//                             sx={{
//                                 mr: 2,
//                                 backgroundColor: '#FB404B',
//                                 width: '100px',
//                                 '&:hover': {
//                                     backgroundColor: '#FB404B',
//                                     opacity: '0.8',
//                                     transform: 'translateY(-1px)',
//                                    boxShadow: '0 4px 12px #FB404B',
                                  
//                                 }
//                             }}
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             type="submit"
                          
//                              size="small"
//                              variant="outlined"
//                             sx={{
//                               backgroundColor:'#20B2AA',
//                               color: '#fff',
//                               borderColor: '#20B2AA',
//                               cursor: 'pointer',
//                               textTransform: 'uppercase',
//                                 '&:hover': {
//                                    backgroundColor: '#20B2AA',
//                                    borderColor: '#20B2AA',
//                                    transform: 'translateY(-1px)',
//                                    boxShadow: '0 4px 12px #20B2AA',
//                                    opacity:'0.8'
//                                 }
//                             }}
//                         >
//                             {currentRole ? 'Update Role' : 'Add Role'}
//                         </Button>
//                     </Box>
//                 </Box>
//             </Box>
//         </Modal>
//     );
// };
// export default AddRole;



// ==================================================


import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddRole.css';
import rolesdata from '../../data/rolesdata';
import { baseUrl } from '../../config/config';

const validationSchema = Yup.object({
    name: Yup.string().required('Role name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    officeType: Yup.string().required('Office Type is required'),
    officeName: Yup.string().required('Office Name is required'),
});

const AddRole = ({ open, handleClose, handleAddRole, currentRole, editRole }) => {
    const [officeTypes, setOfficeTypes] = useState([]);
    const [officeNames, setOfficeNames] = useState([]);
    const [loadingOffices, setLoadingOffices] = useState(false);
    const [loadingNames, setLoadingNames] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: currentRole?.name || '',
            email: currentRole?.email || '',
            officeType: currentRole?.officeType || '',
            officeName: currentRole?.officeName || '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (currentRole) {
                editRole(currentRole._id, values);
            } else {
                handleAddRole(values);
            }
            handleClose();
        },
    });

    // Fetch Office Types on mount
    useEffect(() => {
        const fetchOfficeTypes = async () => {
            setLoadingOffices(true);
            try {
                const res = await fetch(`${baseUrl}/getOffices`);
                const data = await res.json();
                if (data.offices) {
                    setOfficeTypes(data.offices);
                }
            } catch (err) {
                console.error("Error fetching office types:", err);
            } finally {
                setLoadingOffices(false);
            }
        };
        if (open) fetchOfficeTypes();
    }, [open]);

    // Fetch Office Names based on selected officeType
    useEffect(() => {
        const fetchOfficeNames = async () => {
            if (!formik.values.officeType) {
                setOfficeNames([]);
                formik.setFieldValue('officeName', '');
                return;
            }

            setLoadingNames(true);
            try {
                let url = '';
                if (formik.values.officeType === 'Head Office') {
                    url = `${baseUrl}/getAllHeadoffice`;
                } else if (formik.values.officeType === 'Sub Office') {
                    url = `${baseUrl}/getAllSuboffices`;
                }

                if (!url) {
                    setOfficeNames([]);
                    return;
                }

                const res = await fetch(url);
                const data = await res.json();

                let names = [];
                if (formik.values.officeType === 'Head Office' && data.data) {
                    names = data.data.map(item => ({
                        id: item._id,
                        name: item.headOfficeName || item.officeName
                    }));
                } else if (formik.values.officeType === 'Sub Office' && data.suboffices) {
                    names = data.suboffices.map(item => ({
                        id: item._id,
                        name: item.subofficeName
                    }));
                }

                setOfficeNames(names);

                // Auto-select if editing and value matches
                if (currentRole?.officeName) {
                    const matched = names.find(n => n.name === currentRole.officeName);
                    if (matched) formik.setFieldValue('officeName', matched.name);
                }

            } catch (err) {
                console.error("Error fetching office names:", err);
                setOfficeNames([]);
            } finally {
                setLoadingNames(false);
            }
        };

        fetchOfficeNames();
    }, [formik.values.officeType, currentRole]);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '95%', sm: '75%', md: '50%', lg: '53%', xl: '55%' },
                    maxWidth: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
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
                        background: '#23CCEF',
                        borderRadius: '5px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#1EA2C1',
                    },
                }}
            >
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
                    {/* Role Name */}
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        ROLE NAME
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input'>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="Role Name"
                            error={formik.touched.name && Boolean(formik.errors.name)}
                        >
                            {rolesdata.map((role) => (
                                <MenuItem key={role.id} value={role.rolename}>
                                    {role.rolename}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.name && formik.errors.name && (
                            <FormHelperText error>{formik.errors.name}</FormHelperText>
                        )}
                    </FormControl>

                    {/* Email */}
                    <Typography className='A-R-Label' variant="subtitle1" gutterBottom>
                        EMAIL
                    </Typography>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        margin="normal"
                        variant="outlined"
                    />

                    {/* Office Type */}
                    <Typography className='A-R-Label' variant="subtitle1" gutterBottom>
                        OFFICE TYPE
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input'>
                        <InputLabel id="officeType-label">Office Type</InputLabel>
                        <Select
                            labelId="officeType-label"
                            id="officeType"
                            name="officeType"
                            value={formik.values.officeType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="Office Type"
                            disabled={loadingOffices}
                            error={formik.touched.officeType && Boolean(formik.errors.officeType)}
                        >
                            {loadingOffices ? (
                                <MenuItem disabled><CircularProgress size={20} /></MenuItem>
                            ) : (
                                officeTypes.map((office) => (
                                    <MenuItem key={office._id} value={office.officeType}>
                                        {office.officeType}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                        {formik.touched.officeType && formik.errors.officeType && (
                            <FormHelperText error>{formik.errors.officeType}</FormHelperText>
                        )}
                    </FormControl>

                    {/* Office Name (Dynamic) */}
                    <Typography className='A-R-Label' variant="subtitle1" gutterBottom>
                        OFFICE NAME
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input'>
                        <InputLabel id="officeName-label">Office Name</InputLabel>
                        <Select
                            labelId="officeName-label"
                            id="officeName"
                            name="officeName"
                            value={formik.values.officeName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="Office Name"
                            disabled={!formik.values.officeType || loadingNames}
                            error={formik.touched.officeName && Boolean(formik.errors.officeName)}
                        >
                            {loadingNames ? (
                                <MenuItem disabled><CircularProgress size={20} /></MenuItem>
                            ) : officeNames.length > 0 ? (
                                officeNames.map((office) => (
                                    <MenuItem key={office.id} value={office.name}>
                                        {office.name}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>No offices available</MenuItem>
                            )}
                        </Select>
                        {formik.touched.officeName && formik.errors.officeName && (
                            <FormHelperText error>{formik.errors.officeName}</FormHelperText>
                        )}
                    </FormControl>

                    {/* Buttons */}
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                            type="button"
                            onClick={handleClose}
                            variant="contained"
                            size="medium"
                            sx={{
                                backgroundColor: '#FB404B',
                                '&:hover': {
                                    backgroundColor: '#FB404B',
                                    opacity: '0.9',
                                    boxShadow: '0 4px 12px rgba(251,64,75,0.4)',
                                }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            size="medium"
                            sx={{
                                backgroundColor: '#20B2AA',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#1EA2C1',
                                    boxShadow: '0 4px 12px rgba(32,178,170,0.4)',
                                }
                            }}
                        >
                            {currentRole ? 'Update Role' : 'Add Role'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddRole;