// import { FETCH_TENDERS_REQUEST,
//     FETCH_TENDERS_SUCCESS,
//     FETCH_TENDERS_ERROR,
//     ADD_TENDER_REQUEST,
//     ADD_TENDER_SUCCESS,
//     ADD_TENDER_ERROR,
//     EDIT_TENDER_REQUEST,
//   EDIT_TENDER_SUCCESS,
//   EDIT_TENDER_ERROR,
//     DELETE_TENDER_REQUEST,
//     DELETE_TENDER_SUCCESS,
//     DELETE_TENDER_ERROR
//  } from "../actions/tenderActions";
// const initialState={
//     tenders:[],
//     loading:false,
//     error:null
// }
// const tenderReducer=(state=initialState,action)=>{
// switch(action.type){
//     case FETCH_TENDERS_REQUEST:
//     case ADD_TENDER_REQUEST:
//         case EDIT_TENDER_REQUEST:
//     case DELETE_TENDER_REQUEST:
//     return {
//         ...state,
//         loading:true,
//         error:null
//     }

//     case FETCH_TENDERS_SUCCESS:
//         return {
//             ...state,
//             loading:false,
//             tenders:action.payload
//         }
//         case ADD_TENDER_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 tenders: [...state.tenders, action.payload],
//             };

//             case EDIT_TENDER_SUCCESS:
//                 return {
                    
//                   ...state,
//                   loading: false,
//                   tenders: state.tenders.map(tender =>
//                     tender._id === action.payload._id ? action.payload : tender
//                   ),
//                 };
//             case DELETE_TENDER_SUCCESS:
//                 return {
//                     ...state,
//                     loading: false,
//                     tenders: state.tenders.filter(tender => tender._id !== action.payload),
//                 };
//         case FETCH_TENDERS_ERROR:
//         case ADD_TENDER_ERROR:
//         case EDIT_TENDER_ERROR:
//         case DELETE_TENDER_ERROR:
//             return{
//                 ...state,
//                 loading:false,
//                 error:action.payload
//             };
//             default:
//                 return state;
// }
// }

// export default tenderReducer;

// -------------------------------------------------------------


import { FETCH_TENDERS_REQUEST,
    FETCH_TENDERS_SUCCESS,
    FETCH_TENDERS_ERROR,
    ADD_TENDER_REQUEST,
    ADD_TENDER_SUCCESS,
    ADD_TENDER_ERROR,
    EDIT_TENDER_REQUEST,
    EDIT_TENDER_SUCCESS,
    EDIT_TENDER_ERROR,
    DELETE_TENDER_REQUEST,
    DELETE_TENDER_SUCCESS,
    DELETE_TENDER_ERROR
 } from "../actions/tenderActions";

const initialState = {
    tenders: [],
    pagination: {
        currentPage: 1,
        totalPages: 0,
        totalTenders: 0,
        hasNextPage: false,
        hasPrevPage: false,
        limit: 50
    },
    loading: false,
    error: null
}

const tenderReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_TENDERS_REQUEST:
        case ADD_TENDER_REQUEST:
        case EDIT_TENDER_REQUEST:
        case DELETE_TENDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case FETCH_TENDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                tenders: action.payload.tenders,
                pagination: action.payload.pagination
            }

        case ADD_TENDER_SUCCESS:
            return {
                ...state,
                loading: false,
                tenders: [...state.tenders, action.payload],
            };

        case EDIT_TENDER_SUCCESS:
            return {
                ...state,
                loading: false,
                tenders: state.tenders.map(tender =>
                    tender._id === action.payload._id ? action.payload : tender
                ),
            };

        case DELETE_TENDER_SUCCESS:
            return {
                ...state,
                loading: false,
                tenders: state.tenders.filter(tender => tender._id !== action.payload),
            };

        case FETCH_TENDERS_ERROR:
        case ADD_TENDER_ERROR:
        case EDIT_TENDER_ERROR:
        case DELETE_TENDER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
}

export default tenderReducer;