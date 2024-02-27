import { configureStore } from "@reduxjs/toolkit";
import { provinceReducer } from "../Reducer/provinceReducer";
import customerReducer from "../Reducer/customerReducer";
import testRedux from "../../services/apiService/testRedux";

export default configureStore({
  reducer: {
    counter: customerReducer,
    campaign: testRedux,
  },
});
