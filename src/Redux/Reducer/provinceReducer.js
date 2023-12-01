import { provinceLocal } from "../../services/localService/localService";
import { SET_PROVINCE } from "../Constant/reduxConstants";

const provinceInitState = {
    provinceData: provinceLocal.get(),
};


export const provinceReducer = (state = provinceInitState, { type, payload }) => {
    switch (type) {
        case SET_PROVINCE:
            return { ...state, provinceData: payload };
        default:
            return state;
    }
};