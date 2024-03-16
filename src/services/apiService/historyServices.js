import { axiosInstance, configHeader } from "./configURL";

export const historyService = {
  getListHistory: (status) => {
    return axiosInstance.post(
      "/doiqua/get_history",
      { params: { status: status } },
      configHeader
    );
  },
};
