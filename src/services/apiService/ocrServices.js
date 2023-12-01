import { axiosInstance, axiosOCRInstance, campaignURL } from "./configURL";

export const ocrServices = {
  uploadImageToOCR: (data) => {
    return axiosOCRInstance.post("/apinode/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
