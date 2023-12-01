import { axiosInstance } from "./configURL";

export const luckyDrawService = {
  getLuckyDrawList: () => {
    return axiosInstance.post("/doiqua/api_get_lucky_draw_list", {});
  },
  postDrawLuckyGift: (soID) => {
    return axiosInstance.post("/doiqua/api_submit_fg_lucky_gift", {
      params: { so_id: soID },
    });
  },
  postCountDraw: (soID) => {
    return axiosInstance.post("/doiqua/count_draw", {
      params: {
        so_id: soID,
        count: 1,
      },
    });
  },
};
