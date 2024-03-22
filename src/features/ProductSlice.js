import { createSlice } from "@reduxjs/toolkit";
import { api } from "../app/api";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productList: [], 
    selectedProduct: null, 
  },
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getAllProducts.matchFulfilled,
      (state, { payload }) => {
        state.productList = payload.results;
      }
    );
  },
});

export const { selectProduct } = productsSlice.actions;
export default productsSlice.reducer;