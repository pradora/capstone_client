import { configureStore } from "@reduxjs/toolkit";
import {api} from "./api.js";
import getAllProductSlice from "../features/ProductSlice.js";
// import UserSlice from "../features/UserSlice.js";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        products: getAllProductSlice,
        // user: UserSlice,
        // cart: getCartSlice,
      },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export default store;