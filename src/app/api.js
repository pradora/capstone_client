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
        // registerUser: builder.query({
        //     query: () => '/user/register'
        // }),
        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/user/register',
                method: 'POST',
                body: userData
            })
        })
        // getSingleUser: builder.query({ query: (id) => `auth/users/${id}` }),
    })
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} = api;



