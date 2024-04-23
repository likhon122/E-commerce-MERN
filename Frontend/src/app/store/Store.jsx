import { configureStore } from "@reduxjs/toolkit";
// import verifyUserReducer from "../reducers/VerifyUserExistSlice";
import AuthReducer from "../features/AuthSlice";
import ProfileReducer from "../features/ProfileSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    // verifyUser: verifyUserReducer,
    profile: ProfileReducer
  }
});

export default store;
