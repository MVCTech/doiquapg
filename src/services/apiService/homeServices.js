import { axiosInstance, campaignURL } from "./configURL";

export const homeServices = {
  getCampaignInfo: () => {
    return axiosInstance.get("/ocr/campaign_info", {
      params: {
        url: campaignURL,
      },
    });
  },
  getRunningCampaignAll: () => {
    return axiosInstance.post(
      "/doiqua/get_all_campaign",
      {
        params: {
          url: campaignURL,
        },
      },
      {
        headers: "Content-Type: application/json",
      }
    );
  },
  getCampaignClip: () => {
    return axiosInstance.post("/doiqua/get_homepage_clip", {
      headers: "Content-Type: application/json",
    });
  },
  getRunningCampaignTopAndDown: (appCode) => {
    return axiosInstance.post(
      "/doiqua/get_homepage_banner",
      {
        params: {
          chain: appCode,
        },
      },
      {
        headers: "Content-Type: application/json",
      }
    );
  },
  getRunningCampaign: (appCode) => {
    return axiosInstance.post(
      "/doiqua/get_running_campaign",
      {
        params: {
          chain: appCode,
        },
      },
      {
        headers: "Content-Type: application/json",
      }
    );
  },
  getHomepageBannerApi: () => {
    return axiosInstance.post(
      "/doiqua/get_homepage_banner",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
};
