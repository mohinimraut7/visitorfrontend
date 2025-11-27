// import axios from 'axios';
// import {baseUrl} from '../../config/config';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export const FETCH_TENDERS_REQUEST='FETCH_TENDERS_REQUEST';
// export const FETCH_TENDERS_SUCCESS='FETCH_TENDERS_SUCCESS';
// export const FETCH_TENDERS_ERROR='FETCH__ERROR';

// export const ADD_TENDER_REQUEST='ADD_TENDER_REQUEST';
// export const ADD_TENDER_SUCCESS='ADD_TENDER_SUCCESS';
// export const ADD_TENDER_ERROR='ADD_TENDER_ERROR';

// export const EDIT_TENDER_REQUEST='EDIT_TENDER_REQUEST';
// export const EDIT_TENDER_SUCCESS='EDIT_TENDER_SUCCESS';
// export const EDIT_TENDER_ERROR='EDIT_TENDER_ERROR';

// export const DELETE_TENDER_REQUEST='DELETE_TENDER_REQUEST';
// export const DELETE_TENDER_SUCCESS='DELETE_TENDER_SUCCESS';
// export const DELETE_TENDER_ERROR='DELETE_TENDER_ERROR';

//   const getToken = () => {
//     const resdata = JSON.parse(localStorage.getItem('resdata'));
//     return resdata ? resdata.token : null;
//   };

// export const fetchTendersRequest=()=>({
//     type:FETCH_TENDERS_REQUEST,
// })

// export const fetchTendersSuccess=(tenders)=>({
//     type:FETCH_TENDERS_SUCCESS,
//     payload:tenders
// })

// export const fetchTendersFailure=(error)=>({
//     type:FETCH_TENDERS_ERROR,
//     payload:error.message
// })

// export const fetchTenders=()=>{
//     return async (dispatch)=>{
//     dispatch(fetchTendersRequest());
//     try{
//         const response=await axios.get(`${baseUrl}/getTenders`);
//         dispatch(fetchTendersSuccess(response.data));
//     }catch(error){
//         dispatch(fetchTendersFailure(error.message));
//     }
//     }
// }

// export const addTenderRequest=()=>({
//     type:ADD_TENDER_REQUEST,
// })

// export const addTenderSuccess=(tender)=>({
//     type:ADD_TENDER_SUCCESS,
//     payload:tender
// })
// export const addTenderFailure=(error)=>({
// type:ADD_TENDER_ERROR,
// payload:error.message
// })

// export const addTender = (tenderData) => {
//     return async (dispatch) => {
//         dispatch(addTenderRequest());
//         try {

//             const token = getToken();
//             const response = await axios.post(`${baseUrl}/addTender`, tenderData, {
//               headers: {
//                 Authorization: `Bearer ${token}`
//               }
//             });
    
//             dispatch(addTenderSuccess(response.data.Tender));
//             toast.dismiss(); 
//             toast.success("Tender added successfully", { position: "top-center" });
//             dispatch(fetchTenders());
//         } catch (error) {
//             dispatch(addTenderFailure(error.message));
//             toast.dismiss(); 
//             if (error.response?.status === 400 && error.response?.data?.message === 'Tender already exists') {
//                 toast.error("Tender already exists. Please choose a different name.", { position: "top-center" });
//             } else {
//                 toast.error(error.response?.data?.message || "Error adding tender", { position: "top-center" });
//             }
//         }
//     };
// };

// export const editTenderRequest = () => ({
//     type: EDIT_TENDER_REQUEST,
//   });
  
//   export const editTenderSuccess = (tender) => ({
//     type: EDIT_TENDER_SUCCESS,
//     payload:tender,
//   });
  
//   export const editTenderFailure = (error) => ({
//     type: EDIT_TENDER_ERROR,
//     payload: error.message,
//   });
  

// export const editTender = (tenderId, tenderData) => {
  
//     return async (dispatch) => {
//       dispatch(editTenderRequest());
//       try {
//         const token = getToken();
//             const response = await axios.post(`${baseUrl}/editTender/${tenderId}`,tenderData,{
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

        
//         const updatedTender = response.data.tender;
//         dispatch(editTenderSuccess(updatedTender));
//         toast.success("Tender Updated Successfully", { position: "top-center" });
//       } catch (error) {
//         dispatch(editTenderFailure(error.message));
//       }
//     };
//   };

// export const deleteTenderRequest = () => ({
    
//     type: DELETE_TENDER_REQUEST,
// });

// export const deleteTenderSuccess = (tender_id) => ({
//     type: DELETE_TENDER_SUCCESS,
//     payload: tender_id,
// });

// export const deleteTenderFailure = (error) => ({
//     type: DELETE_TENDER_ERROR,
//     payload: error.message,
// });

// export const deleteTender = (tender_id) => {
//     return async (dispatch) => {
//         dispatch(deleteTenderRequest());
//         try {
//             await axios.delete(`${baseUrl}/deleteTender/${tender_id}`);
//             dispatch(deleteTenderSuccess(tender_id));
//             toast.success("Tender deleted successfully", { position: "top-center" });
//         } catch (error) {
//             dispatch(deleteTenderFailure(error.message));
//         }
//     };
// };

// -----------------------------------------------------

import axios from 'axios';
import {baseUrl} from '../../config/config';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FETCH_TENDERS_REQUEST='FETCH_TENDERS_REQUEST';
export const FETCH_TENDERS_SUCCESS='FETCH_TENDERS_SUCCESS';
export const FETCH_TENDERS_ERROR='FETCH_TENDERS_ERROR';

export const ADD_TENDER_REQUEST='ADD_TENDER_REQUEST';
export const ADD_TENDER_SUCCESS='ADD_TENDER_SUCCESS';
export const ADD_TENDER_ERROR='ADD_TENDER_ERROR';

export const EDIT_TENDER_REQUEST='EDIT_TENDER_REQUEST';
export const EDIT_TENDER_SUCCESS='EDIT_TENDER_SUCCESS';
export const EDIT_TENDER_ERROR='EDIT_TENDER_ERROR';

export const DELETE_TENDER_REQUEST='DELETE_TENDER_REQUEST';
export const DELETE_TENDER_SUCCESS='DELETE_TENDER_SUCCESS';
export const DELETE_TENDER_ERROR='DELETE_TENDER_ERROR';

const getToken = () => {
    const resdata = JSON.parse(localStorage.getItem('resdata'));
    return resdata ? resdata.token : null;
};

export const fetchTendersRequest=()=>({
    type:FETCH_TENDERS_REQUEST,
})

export const fetchTendersSuccess=(data)=>({
    type:FETCH_TENDERS_SUCCESS,
    payload:data
})

export const fetchTendersFailure=(error)=>({
    type:FETCH_TENDERS_ERROR,
    payload:error.message
})

// Updated fetchTenders with pagination support
export const fetchTenders = (page = 1, limit = 50, tenderId = '') => {
    return async (dispatch) => {
        dispatch(fetchTendersRequest());
        try {
            let url = `${baseUrl}/getTenders?page=${page}&limit=${limit}`;
            if (tenderId) {
                url += `&tenderId=${tenderId}`;
            }
            
            const response = await axios.get(url);
            dispatch(fetchTendersSuccess(response.data));
        } catch (error) {
            dispatch(fetchTendersFailure(error.message));
        }
    }
}

export const addTenderRequest=()=>({
    type:ADD_TENDER_REQUEST,
})

export const addTenderSuccess=(tender)=>({
    type:ADD_TENDER_SUCCESS,
    payload:tender
})

export const addTenderFailure=(error)=>({
    type:ADD_TENDER_ERROR,
    payload:error.message
})

export const addTender = (tenderData) => {
    return async (dispatch) => {
        dispatch(addTenderRequest());
        try {
            const token = getToken();
            const response = await axios.post(`${baseUrl}/addTender`, tenderData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
    
            dispatch(addTenderSuccess(response.data.tender));
            toast.dismiss(); 
            toast.success("Tender added successfully", { position: "top-center" });
        } catch (error) {
            dispatch(addTenderFailure(error.message));
            toast.dismiss(); 
            if (error.response?.status === 400 && error.response?.data?.message === 'Tender already exists') {
                toast.error("Tender already exists. Please choose a different name.", { position: "top-center" });
            } else {
                toast.error(error.response?.data?.message || "Error adding tender", { position: "top-center" });
            }
        }
    };
};

export const editTenderRequest = () => ({
    type: EDIT_TENDER_REQUEST,
});

export const editTenderSuccess = (tender) => ({
    type: EDIT_TENDER_SUCCESS,
    payload:tender,
});

export const editTenderFailure = (error) => ({
    type: EDIT_TENDER_ERROR,
    payload: error.message,
});

export const editTender = (tenderId, tenderData) => {
    return async (dispatch) => {
      dispatch(editTenderRequest());
      try {
        const token = getToken();
        const response = await axios.post(`${baseUrl}/editTender/${tenderId}`, tenderData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const updatedTender = response.data.tender;
        dispatch(editTenderSuccess(updatedTender));
        toast.success("Tender Updated Successfully", { position: "top-center" });
      } catch (error) {
        dispatch(editTenderFailure(error.message));
      }
    };
};

export const deleteTenderRequest = () => ({
    type: DELETE_TENDER_REQUEST,
});

export const deleteTenderSuccess = (tender_id) => ({
    type: DELETE_TENDER_SUCCESS,
    payload: tender_id,
});

export const deleteTenderFailure = (error) => ({
    type: DELETE_TENDER_ERROR,
    payload: error.message,
});

export const deleteTender = (tender_id) => {
    return async (dispatch) => {
        dispatch(deleteTenderRequest());
        try {
            await axios.delete(`${baseUrl}/deleteTender/${tender_id}`);
            dispatch(deleteTenderSuccess(tender_id));
            toast.success("Tender deleted successfully", { position: "top-center" });
        } catch (error) {
            dispatch(deleteTenderFailure(error.message));
        }
    };
};