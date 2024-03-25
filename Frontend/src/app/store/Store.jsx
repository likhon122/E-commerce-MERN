import { configureStore } from "@reduxjs/toolkit";

import RegisterReducer from "../reducers/RegisterReducer";
import { productSlice } from "../../features/FetchProductData";
// import
const store = configureStore({
  reducer: {
    // this is all reducers here
    registration: RegisterReducer,
    [productSlice.reducerPath]: productSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productSlice.middleware)
});

export default store;
