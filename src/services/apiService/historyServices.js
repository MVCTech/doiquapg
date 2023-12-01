import { axiosInstance, configHeader } from "./configURL";

export const historyService = {
  getListHistory: () => {
    return axiosInstance.post("/doiqua/get_history", {}, configHeader);
  },
};
