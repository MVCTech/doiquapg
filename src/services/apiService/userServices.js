import { axiosInstance, campaignURL, config } from "./configURL";

const data = JSON.stringify({});
const headers = {
  accept: "application/json, text/plain, */*",
  "content-type": "application/json;charset=UTF-8",
};
export const userServices = {
  getMyPrizeList: (statusGifts) => {
    return axiosInstance.post(
      `/doiqua/list_win`,
      {
        params: {
          page: 1,
          limit: 0,
          exchange_status: statusGifts,
        },
      }
      // , {
      //   headers: {
      //     'Content-Type': 'application/json;charset=UTF-8',
      //   },
      // }
    );
  },

  getCampaignInfo: () => {
    return axiosInstance.get("/ocr/campaign_info", {
      params: {
        url: campaignURL,
      },
    });
  },
  changePassword: (data) => {
    return axiosInstance.post("/doiqua/change_pass", {
      params: data,
    });
  },
  getGiftByCampaign: (id) => {
    return axiosInstance.post("/doiqua/list_gift_by_campaign", {
      params: {
        campaign_id: id,
      },
    });
  },
  getWinByCampaign: (page, id) => {
    return axiosInstance.post("/doiqua/list_win_by_campaign", {
      params: {
        page: page,
        limit: 10,
        campaign_id: id,
      },
    });
  },

  postUserLogin: (data) => {
    return axiosInstance.post("/doiqua/login", { params: data });
  },
  postUserLogout: (data) => {
    return axiosInstance.post("/doiqua/logout", { params: data });
  },
  postUserLoginNoRegister: (data) => {
    return axiosInstance.post("/doiqua/sign_in", { params: data });
  },

  postValidateOTP: (data) => {
    return axiosInstance.post("/doiqua/validate_otp", { params: data });
  },
  postResendOTP: () => {
    return axiosInstance.post("/mvc/resend_otp", {
      params: {
        url: campaignURL,
      },
    });
  },
  getUserInfo: (id) => {
    return axiosInstance.get(`/doiqua/customer_info?pnj_customer_id=${id}`);
  },
  forgotPassword: (userInfo) => {
    return axiosInstance.post("/doiqua/send_pass", {
      params: userInfo,
    });
  },
  postRegister: (userInfo) => {
    return axiosInstance.post("/doiqua/register_account", {
      params: userInfo,
    });
  },
  postUserInfo: (userInfo) => {
    return axiosInstance.post("/doiqua/update_customer_info", {
      params: userInfo,
    });
  },
  postUpdateConsultant: (data) => {
    return axiosInstance.post("/doiqua/update_consultant", { params: data });
  },
  checkPhoneExist: (userInfo) => {
    return axiosInstance.post("/doiqua/check_phone", {
      params: userInfo,
    });
  },
};
