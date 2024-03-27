import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  isSuccess: false,
  isFetching: false
};

export const homeSlice = createSlice({
  name: "Home",
  initialState,
  reducers: {
    verifyUserIsExist: (state, action) => {
      if (action.payload) {
        const { userInfo } = action.payload;
        state.userInfo = userInfo;
        state.isSuccess = true;
        state.isFetching = true;
      }
    },
    logOut: (state) => {
      state.userInfo = {};
      state.isSuccess = false;
      state.isFetching = false;
    }
  }
});

export const { verifyUserIsExist, logOut } = homeSlice.actions;

export default homeSlice.reducer;
