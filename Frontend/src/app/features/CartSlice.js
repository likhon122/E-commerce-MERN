import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApiFetch from "../../api/apiConfig";

const initialState = {
  products: null,
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
  cartState: {
    productsInfo: null,
    isLoading: false,
    productId: null,
    isError: false,
    isSuccess: false,
    error: null
  },
  deleteCartState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: null
  }
};

export const fetchCartItems = createAsyncThunk(
  "getCartItem/getCartItems",
  async (userId) => {
    try {
      const productsInfo = await axiosApiFetch.get(`/cart/${userId}`);
      if (productsInfo.data.payload.cartExist) {
        return productsInfo.data.payload.cartExist;
      }
    } catch (error) {
      throw Error(error);
    }
  }
);

export const addCartItem = createAsyncThunk(
  "addCartItem/addCartItem",
  async ({ userId, productId }) => {
    try {
      if (userId && productId) {
        const productsInfo = await axiosApiFetch.post(`/cart`, {
          userId,
          productId
        });
        if (productsInfo.data.payload.updatedCart) {
          return productsInfo.data.payload.updatedCart;
        }
      }
    } catch (error) {
      if (error.response.data.message) {
        throw error.response.data.message;
      }
      throw Error(error);
    }
  }
);

export const decreaseCartItem = createAsyncThunk(
  "decreaseCart/decreaseCartItem",
  async ({ userId, productId, cartQuantity = -1 }) => {
    try {
      if (userId && productId) {
        const productsInfo = await axiosApiFetch.post(`/cart`, {
          userId,
          productId,
          cartQuantity
        });
        if (productsInfo.data.payload.updatedCart) {
          return productsInfo.data.payload.updatedCart;
        }
      }
    } catch (error) {
      if (error.response.data.message) {
        throw error.response.data.message;
      }
      throw Error(error);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "deleteItem/deleteCartItem",
  async ({ cartId, itemId }) => {
    try {
      if (cartId && itemId) {
        const productsInfo = await axiosApiFetch.delete(
          `/cart/${cartId}/${itemId}`
        );
        if (productsInfo.data.payload.cartItemIsExist) {
          return productsInfo.data.payload.cartItemIsExist;
        }
      }
    } catch (error) {
      if (error.response.data.message) {
        throw error.response.data.message;
      }
      throw Error(error);
    }
  }
);

const getCartItemsSlice = createSlice({
  name: "findCategoryAccordingProductData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.error?.message;
        state.products = null;
      });
    builder
      .addCase(addCartItem.pending, (state, action) => {
        // console.log(action.meta.arg.productId);

        state.cartState.isLoading = true;
        state.cartState.isError = false;
        state.cartState.isSuccess = false;
        state.cartState.productId = action.meta.arg.productId;
        state.cartState.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.isError = false;
        state.cartState.isSuccess = true;
        state.cartState.productId = null;
        state.products = action.payload;
        state.cartState.error = null;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.isError = true;
        state.cartState.isSuccess = false;
        state.cartState.error = action.error?.message;
        state.cartState.productsInfo = null;
        state.cartState.productId = null;
      });
    builder
      .addCase(decreaseCartItem.pending, (state, action) => {
        state.cartState.isLoading = true;
        state.cartState.productId = action.meta.arg.productId;
        state.cartState.isError = false;
        state.cartState.isSuccess = false;
        state.cartState.error = null;
      })
      .addCase(decreaseCartItem.fulfilled, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.isError = false;
        state.cartState.isSuccess = true;
        state.cartState.productId = null;
        state.products = action.payload;
        state.cartState.error = null;
      })
      .addCase(decreaseCartItem.rejected, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.productId = null;
        state.cartState.isError = true;
        state.cartState.isSuccess = false;
        state.cartState.error = action.error?.message;
      });
    builder
      .addCase(deleteCartItem.pending, (state) => {
        state.deleteCartState.isLoading = true;
        state.deleteCartState.isError = false;
        state.deleteCartState.isSuccess = false;
        state.deleteCartState.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.deleteCartState.isLoading = false;
        state.deleteCartState.isError = false;
        state.deleteCartState.isSuccess = true;
        state.products = action.payload;
        state.deleteCartState.error = null;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.deleteCartState.isLoading = false;
        state.deleteCartState.isError = true;
        state.deleteCartState.isSuccess = false;
        state.deleteCartState.error = action.error?.message;
      });
  }
});

export default getCartItemsSlice.reducer;
