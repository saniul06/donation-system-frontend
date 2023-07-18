import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { donationReducer } from './donationReducer';

const reducers = combineReducers({
    auth: authReducer,
    donation: donationReducer
});

export default reducers;