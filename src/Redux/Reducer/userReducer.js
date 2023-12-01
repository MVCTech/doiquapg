import { userDataLocal } from "../../services/localService/localService";
import { LOG_OUT, SET_USER_DATA } from "../Constant/reduxConstants";

const initialState = {
  userData: userDataLocal.get(),
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_DATA:
      return { ...state, userData: payload };
    case LOG_OUT:
      return { ...state, userData: null };
    default:
      return state;
  }
};
