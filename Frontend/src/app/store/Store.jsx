import { configureStore } from "@reduxjs/toolkit";
// import verifyUserReducer from "../reducers/VerifyUserExistSlice";
import AuthReducer from "../features/AuthSlice";
import ProfileReducer from "../features/ProfileSlice";
import FindCategoryAccordingProductDataReducer from "../features/FindCategoryAccordingData";
import GetSingleProductReducer from "../features/ProductSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    // verifyUser: verifyUserReducer,
    profile: ProfileReducer,
    findCategoryProduct: FindCategoryAccordingProductDataReducer,
    findSingleProduct: GetSingleProductReducer
  }
});

export default store;
