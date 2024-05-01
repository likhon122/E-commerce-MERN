import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApiFetch from "../../api/apiConfig";

const initialState = {
  product: null,
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false
};

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/getSingleProduct",
  async (productName) => {
    try {
      const productsInfo = await axiosApiFetch.get(`/products/${productName}`);
      if (productsInfo.data.payload) {
        return productsInfo.data.payload.product;
      }
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }
);

const getSingleProductSlice = createSlice({
  name: "findCategoryAccordingProductData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.error?.message;
        state.product = null;
      });
  }
});

export default getSingleProductSlice.reducer;
