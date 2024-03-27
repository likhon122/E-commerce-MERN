// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const productSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:3001/api/",
//     credentials: "include"
//   }),
//   tagTypes: ["user", "product"],
//   endpoints: (builder) => ({
//     allProducts: builder.query({
//       query: () => "/products",
//       providesTags: ["product"]
//     }),

//     // registerUser: builder.mutation({
//     //   query: (userInfo) => ({
//     //     url: "/users/process-register",
//     //     method: "POST",
//     //     body: userInfo
//     //   }),
//     //   invalidatesTags: ["user"]
//     // }),

//     verifyUser: builder.mutation({
//       query: (token) => ({
//         url: "/users/verify-user",
//         method: "POST",
//         body: token
//       }),
//       invalidatesTags: ["user"]
//     }),
//     loginUser: builder.mutation({
//       query: (userInfo) => ({
//         url: "/auth/login",
//         method: "POST",
//         body: userInfo,
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json"
//         }
//       }),
//       invalidatesTags: ["user"]
//     }),
//     userIsVerified: builder.query({
//       query: () => "/auth/protected",
//       providesTags: ["user"]
//     }),
//     logOutUser: builder.mutation({
//       query: () => ({
//         url: "auth/logout",
//         method: "POST"
//       }),
//       invalidatesTags: ["user"]
//     })
//   })
// });

// export const {
//   useAllProductsQuery,
//   useRegisterUserMutation,
//   useVerifyUserMutation,
//   useLoginUserMutation,
//   useUserIsVerifiedQuery,
//   useLogOutUserMutation
// } = productSlice;
