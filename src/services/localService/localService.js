export const CAMPAIGN_INFO_LOCAL = "CAMPAIGN_INFO_LOCAL";
export const USER_DATA_LOCAL = "USER_DATA_LOCAL";
export const PROVINCE_DATA_LOCAL = "USER_DATA_LOCAL";
export const SET_CHECK_CAM = "SET_CHECK_CAM";
export const LOGIN_TYPE = "LOGIN_TYPE";
export const GIFT_DATA_LOCAL = "GIFT_DATA_LOCAL";
// export let appCode = window.location.pathname.split("/")[1];

export const login_type = localStorage.getItem("LOGIN_TYPE");
export const campaignInfoLocal = {
  set: (campaignInfo) => {
    let campaignInfoJson = JSON.stringify(campaignInfo);
    localStorage.setItem(CAMPAIGN_INFO_LOCAL, campaignInfoJson);
  },
  get: () => {
    let campaignInfoJson = localStorage.getItem(CAMPAIGN_INFO_LOCAL);
    if (campaignInfoJson) {
      return JSON.parse(campaignInfoJson);
    } else {
      return {};
    }
  },
};

export const userDataLocal = {
  set: (userData) => {
    let userDataJson = JSON.stringify(userData);
    localStorage.setItem(USER_DATA_LOCAL, userDataJson);
  },
  get: () => {
    let userDataJson = localStorage.getItem(USER_DATA_LOCAL);
    if (userDataJson) {
      return JSON.parse(userDataJson);
    } else {
      return {};
    }
  },
};
export const provinceLocal = {
  set: (province) => {
    let provinceJson = JSON.stringify(province);
    localStorage.setItem(USER_DATA_LOCAL, provinceJson);
  },
  get: () => {
    let provinceJson = localStorage.getItem(USER_DATA_LOCAL);
    if (provinceJson) {
      return JSON.parse(provinceJson);
    } else {
      return {};
    }
  },
};

export const giftDataLocal = {
  set: (giftData) => {
    let giftDataJson = JSON.stringify(giftData);
    localStorage.setItem(GIFT_DATA_LOCAL, giftDataJson);
  },
  get: () => {
    let giftDataJson = localStorage.getItem(GIFT_DATA_LOCAL);
    if (giftDataJson) {
      return JSON.parse(giftDataJson);
    } else {
      return {};
    }
  },
};
