import { configureStore } from "@reduxjs/toolkit";
import {jewlApi} from "./jewlApi.js";
import getAllProductSlice from "../features/product/getAllProductSlice.js";


export const store = configureStore({
    reducer: {
        [jewlApi.reducerPath]: jewlApi.reducer,
        products: getAllProductSlice,
        // product: productSlice,
        // user: getUserSlice,
        // cart: getCartSlice,
      },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(jewlApi.middleware),
});

export default store;