import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userServices } from "../../services/apiService/userServices";
import { userDataLocal } from "../../services/localService/localService";

export const updateUserInfor = createAsyncThunk(
  "posts/updateUser",
  async (appCode) => {
    const res = await userServices.postUserInfo(appCode);
    console.log(res);
    return res;
  }
);
let dataUser = userDataLocal.get();

export const getUserInfor = createAsyncThunk(
  "posts/getUser",
  async (appCode) => {
    const res = await userServices.getUserInfo(appCode);
    console.log(res);
    return res;
  }
);
const initialState = {
  loading: false,
  user: {},
};
const userNewReducer = createSlice({
  name: "user_campaign",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    // Update state on Redux
    build.addCase(updateUserInfor.pending, (state, action) => {
      console.log(state);
      console.log(action.payload);

      // const index = state.findIndex(
      //     (basicSal) => basicSal.generalUserInfoId === action.payload.id
      // );
    });
    build.addCase(updateUserInfor.fulfilled, (state, action) => {
      console.log(action.payload);
      //   state.push(action.payload);
      state = {
        ...state.user,
        ...action.payload,
      };
      // const index = state.findIndex(
      //     (basicSal) => basicSal.generalUserInfoId === action.payload.id
      // );
      // state[index] = {
      //     ...state[index],
      //     ...action.payload,
      // };
    });
    build.addCase(getUserInfor.fulfilled, (state, action) => {
      console.log(action.payload);
      console.log(state);
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
export const userCampaign = (state) => state.userCampaign;

export default userNewReducer.reducer;
