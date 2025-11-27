import { combineReducers } from "redux";
import postReducer from "./postReducer";
import userReducer from "./userReducer";
import sidebarReducer from "./sidebarReducer";
import roleReducer from "./roleReducer";
import tenderReducer from "./tenderReducer";
import consumerReducer from "./consumerReducer";
import loginReducer from "./loginReducer";

import masterReducer from "./masterReducer";


const rootReducer=combineReducers({
    posts:postReducer,
    users:userReducer,
    sidebar:sidebarReducer,
    roles:roleReducer,
    tenders:tenderReducer,
    consumers:consumerReducer,
    auth:loginReducer,
    masters:masterReducer,
});

export default rootReducer;
