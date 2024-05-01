import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApiFetch from "../../api/apiConfig";

const initialState = {
  userInfo: null,
  isLoading: false,
  isError: false,
  error: null,
  isLoggedIn: false,
  loginError: null,
  registrationMessage: null,
  registrationErrorMessage: null,
  resetFormData: false
};

export const verifyUserIsExist = createAsyncThunk(
  "verifyUser/verifyUserIsExist",
  async () => {
    await axiosApiFetch.get("/auth/refresh-token");
    const userInfo = await axiosApiFetch.get("/auth/protected");
    return userInfo?.data?.payload?.user;
  }
);

const register = async (userInfo) => {
  try {
    const response = await axiosApiFetch.post("/users/process-register", {
      ...userInfo
    });
    if (response.data.message) {
      return response.data.message;
    }
  } catch (error) {
    console.log(error.response.data.message);
    throw Error(error.response.data.message);
  }
};

const login = async (data) => {
  try {
    const response = await axiosApiFetch.post("/auth/login", {
      ...data
    });
    if (response.data.payload.loggedInUserInfo) {
      return response.data.payload.loggedInUserInfo;
    }
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (userInfo) => {
    const response = await register(userInfo);
    return response;
  }
);

export const loginUser = createAsyncThunk("login/loginUser", async (data) => {
  const response = await login(data);
  return response;
});

export const logOutUser = createAsyncThunk("logOut/logOutUser", async () => {
  await axiosApiFetch.post("/auth/logout");
});

const authSlice = createSlice({
  name: "Home",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(verifyUserIsExist.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(verifyUserIsExist.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(verifyUserIsExist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.userInfo = null;
      });

    builder
      .addCase(logOutUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userInfo = null;
        state.isLoggedIn = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userInfo = action.payload;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.loginError = action.error?.message;
        state.userInfo = null;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.resetFormData = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.registrationMessage = action.payload;
        state.registrationErrorMessage = null;
        state.resetFormData = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.registrationMessage = null;
        state.registrationErrorMessage = action.error?.message;
        state.resetFormData = false;
      });
  }
});

export default authSlice.reducer;
// export const { logOut } = verifyUserSlice.actions;
