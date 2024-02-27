import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jewlApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000'
    }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => '/api/products'
        }),
        getProduct: builder.query({
            query: (id) => `/api/products/${id}`
        })
    })
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
} = jewlApi.endpoints;



// export const {
//   useGetProductsQuery,
// //   useGetProductQuery,
// //   useGetUsersQuery,
// //   useGetUserQuery,
// //   useUpdateProductMutation,
// //   useAddProductMutation,
// //   useDeleteProductMutation,
// //   useUpdateUserMutation,
// //   useAddUserMutation,
// //   useLoginUserMutation,
// //   useAddToCartMutation,
// //   useRemoveFromCartMutation,
// //   useGetCartItemsQuery,
// } = jewlApi;