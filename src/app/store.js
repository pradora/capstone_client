import { configureStore } from "@reduxjs/toolkit";
import {api} from "./api.js";
import getAllProductSlice from "../features/product/getAllProductSlice.js";


export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        products: getAllProductSlice,
        // product: productSlice,
        // user: getUserSlice,
        // cart: getCartSlice,
      },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export default store;