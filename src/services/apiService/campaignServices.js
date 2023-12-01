import { axiosInstance, config, configHeader } from "./configURL";

export const campaignServices = {
  getPrizeTerm: () => {
    return axiosInstance.post(
      "/doiqua/get_prize_term",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  getCampaign: () => {
    return axiosInstance.post("/doiqua/get_all_campaign", {}, configHeader);
  },
  getCampaignDetailApi: (campaignId) => {
    return axiosInstance.post(
      "/doiqua/get_campaign_details",
      {
        params: { campaign_id: campaignId },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
};
