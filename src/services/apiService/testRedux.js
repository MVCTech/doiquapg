import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance, campaignURL } from "./configURL";
const initialState = [];
const homeServices = {
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
};
export const getPosts = createAsyncThunk("posts/getPosts", async (appCode) => {
  const res = await homeServices.getRunningCampaign(appCode);
  console.log(res);
  return res;
});

const testRedux = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getPosts.fulfilled, (state, action) => {
      console.log(action.payload);
      return { state, ...action.payload };
    });
  },
});
export const selectCampaign = (state) => state.campaign;

export default testRedux.reducer;
