import { configureStore } from "@reduxjs/toolkit";
import { provinceReducer } from "../Reducer/provinceReducer";
import customerReducer from "../Reducer/customerReducer";
import testRedux from "../../services/apiService/testRedux";
import userCampaign from "../Reducer/userNewReducer";

export default configureStore({
  reducer: {
    counter: customerReducer,
    campaign: testRedux,
    userCampaign: userCampaign,
  },
});
