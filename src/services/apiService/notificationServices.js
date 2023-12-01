import { axiosInstance, campaignURL } from "./configURL";

export const wheelServices = {
  getCampaignInfo: () => {
    return axiosInstance.get("/ocr/campaign_info", {
      params: {
        url: campaignURL,
      },
    });
  },
};
