import { configureStore } from "@reduxjs/toolkit";
import { provinceReducer } from "../Reducer/provinceReducer";
import customerReducer from "../Reducer/customerReducer";

export default configureStore({
  reducer: {
    counter: customerReducer,
  },
});
