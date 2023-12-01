import {
  SET_CAMPAIGN_INFO,
  SET_USER_DATA,
  SET_PROVINCE,
  LOG_OUT,
} from "../Constant/reduxConstants";

export const setCampaignInfo = (value) => {
  return {
    type: SET_CAMPAIGN_INFO,
    payload: value,
  };
};

export const setUserData = (data) => {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
};

export const setLogout = (data) => {
  return {
    type: LOG_OUT,
    // payload: data,
  };
};

export const setProvince = (data) => {
  return {
    type: SET_PROVINCE,
    payload: data,
  };
};
