import { createSlice } from "@reduxjs/toolkit";
import { jewlApi } from "../../app/jewlApi";

const getAllProductSlice = createSlice({
    name: "products",
    initialState: [],
    extraReducers: (builder) => {
      builder.addMatcher(
        jewlApi.endpoints.getAllProducts.matchFulfilled,
        (state, { payload }) => {
          console.log(payload); // Log the payload
          return payload.results;
        }
      );
    },
  });

export default getAllProductSlice.reducer;