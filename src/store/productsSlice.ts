import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./Thunks/ProductsThunk";
import type { Product } from "../features/products/ProductsList";

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        console.log("pending fired", state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log("rejected fired", action.error, state);
      });
  },
  reducers: {},
});

export default productsSlice.reducer;
