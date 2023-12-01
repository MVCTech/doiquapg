import { combineReducers } from "redux";
import { provinceReducer } from "./provinceReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    userReducer: userReducer,
    provinceReducer: provinceReducer,
});
