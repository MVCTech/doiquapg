import { axiosInstance, campaignURL } from "./configURL";

export const notificationServices = {
  getCampaignInfo: () => {
    return axiosInstance.get("/ocr/campaign_info", {
      params: {
        url: campaignURL,
      },
    });
  },
};
