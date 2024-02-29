import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

const getAllProductSlice = createSlice({
    name: "products",
    initialState: [],
    extraReducers: (builder) => {
      builder.addMatcher(
        api.endpoints.getAllProducts.matchFulfilled,
        (state, { payload }) => {
          return payload.results;
        }
      );
    },
  });

export default getAllProductSlice.reducer;