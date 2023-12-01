import { axiosInstance } from "./configURL";

export const receiptServices = {
  submitReceiptApi: (data) => {
    return axiosInstance.post("/doiqua/submit_receipt", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
};
