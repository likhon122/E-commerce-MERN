import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApiFetch from "../../api/apiConfig";

const initialState = {
  userInfo: {},
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
  updateLoading: false,
  updateSuccess: false,
  updateError: null
};

const updateUser = async ({ id, ...userInfo }) => {
  try {
    console.log(userInfo);
    const response = await axiosApiFetch.put(`/users/${id}`, userInfo);
    return response.data.payload.updatedUser;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const getUserDetails = createAsyncThunk(
  "getUser/getUserDetails",
  async (id) => {
    const userInfo = await axiosApiFetch.get(`/users/${id}`);
    if (userInfo.data.payload.userWithoutPassword) {
      return userInfo.data.payload.userWithoutPassword;
    }
  }
);
export const updateUserDetails = createAsyncThunk(
  "updateUser/updateUserDetails",
  async (userInfo) => {
    const updatedUser = await updateUser(userInfo);
    return updatedUser;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.error.message;
        state.userInfo = {};
      });

    builder
      .addCase(updateUserDetails.pending, (state) => {
        state.updateLoading = true;
        state.updateError = false;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateError = null;
        state.updateSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.error.message;
        state.updateSuccess = false;
      });
  },
  reducers: {
    showMessage: (state, action) => {
      state.updateSuccess = false;
      state.updateError = null;
    }
  }
});

export default profileSlice.reducer;

export const { showMessage } = profileSlice.actions;
