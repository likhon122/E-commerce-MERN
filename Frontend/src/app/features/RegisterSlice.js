import { createSlice } from "@reduxjs/toolkit";
import { logo } from "../..";

const initialState = {
  user: {},
  isLoading: false,
  isError: false,
  error: null
};

// const verifyUserIs

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      console.log(action.payload);
    }
  }
});

export const { registerUser } = registrationSlice.actions;

export default registrationSlice.reducer;
