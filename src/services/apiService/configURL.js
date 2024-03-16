import axios from "axios";
import { USER_DATA_LOCAL } from "../localService/localService";
const PHONE_STATUS_NOT_VALIDATE = "start";
const PHONE_STATUS_VALIDATED = "processing";
const data = JSON.stringify({});
const appCode = localStorage.getItem("CAMPAIGN_CODE");
const login_type = localStorage.getItem("LOGIN_TYPE");
export const axiosInstance = axios.create({
  baseURL: "https://quantri.scanbill.vn",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosOCRInstance = axios.create({
  baseURL: "https://doiquapg.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export let campaignURL = "https://hfshc.mvc.com.vn/pg";
let url = window.location.href;
console.log(url);

export const configHeader = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const setAuthorization = (token) => {
  axiosInstance.defaults.headers.common["TOKEN"] = token;
};

export const checkPhoneStatus = {
  notValidate: PHONE_STATUS_NOT_VALIDATE,
  validated: PHONE_STATUS_VALIDATED,
};

axiosInstance.interceptors.response.use(
  function (response) {
    console.log(response);
    if (response.data.result && response.data.result.meta) {
      if (!response.data.result.meta.status) {
        if (response.data.result.meta.status_code === 403) {
          window.location.assign(
            `${login_type === "password" ? "/login" : "/login"}`
          );
          localStorage.removeItem(USER_DATA_LOCAL);
        } else {
          // localStorage.removeItem("GCS_RESULT");
        }
        return Promise.reject(response.data.result.meta.message);
      }
    }
    return response.data.result.data ? response.data.result.data : response;
  },
  function (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);
