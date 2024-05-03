import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApiFetch from "../../api/apiConfig";

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false
};

export const fetchCategoryProductData = createAsyncThunk(
  "categoryProducts/getCategoryProducts",
  async (filter) => {
    try {
      const productsInfo = await axiosApiFetch.get(`/products`, {
        params: { ...filter }
      });
      if (productsInfo.data.payload) {
        return productsInfo.data.payload;
      }
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }
);

const findCategoryAccordingProductDataSlice = createSlice({
  name: "findCategoryAccordingProductData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryProductData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(fetchCategoryProductData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchCategoryProductData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.error?.message;
        state.products = {};
      });
  }
});

export default findCategoryAccordingProductDataSlice.reducer;
