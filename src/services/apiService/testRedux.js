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
    // Update state on Redux
    //   build.addCase(
    //     updateUserStatusFunc.fulfilled,
    //     (state, action: PayloadAction<any>) => {
    //         const index = state.findIndex(
    //             (basicSal: UserModelResponse) => basicSal.generalUserInfoId === action.payload.id
    //         );
    //         state[index] = {
    //             ...state[index],
    //             ...action.payload,
    //         };
    //     }
    // );
    build.addCase(getPosts.fulfilled, (state, action) => {
      console.log(action.payload);
      return { ...action.payload };
    });
    // build.addCase(
    //   addNewUserFunc.fulfilled,
    //   (state, action: PayloadAction<any>) => {
    //       state.push(action.payload);
    //   }
    // )
  },
});
export const selectCampaign = (state) => state.campaign;

export default testRedux.reducer;
