import { configureStore } from "@reduxjs/toolkit";

import HomeReducer from "../reducers/VerifyUserIsExist";

const store = configureStore({
  reducer: {
    verifyUserIsExist: HomeReducer
  }
});

export default store;
