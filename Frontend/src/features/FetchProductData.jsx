import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/",
    credentials: "include"
  }),
  endpoints: (builder) => ({
    allProducts: builder.query({
      query: () => "/products"
    }),
    registerUser: builder.mutation({
      query: (userInfo) => ({
        url: "/users/process-register",
        method: "POST",
        body: userInfo
      })
    }),
    verifyUser: builder.mutation({
      query: (token) => ({
        url: "/users/verify-user",
        method: "POST",
        body: token
      })
    }),
    loginUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
    })
  })
});

export const {
  useAllProductsQuery,
  useRegisterUserMutation,
  useVerifyUserMutation,
  useLoginUserMutation
} = productSlice;
