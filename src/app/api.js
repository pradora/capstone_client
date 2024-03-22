import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000'
    }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => '/api/products'
        }),
        getSingleProduct: builder.query({
            query: (id) => `/api/products/${id}`
        }),
        getSingleUser: builder.query({ 
            query: (username) => `auth/user/${username}` 
        }),
        registerUser: builder.mutation({
            query: (userData) => ({
                url: 'auth/user/register',
                method: 'POST',
                body: userData
            })
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
              url: "/auth/user/login",
              method: "POST",
              body: userData,
            }),
        })
        
        
       
    })
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetSingleUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
} = api;



