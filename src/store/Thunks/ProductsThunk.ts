/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError, setLoading } from "../ui/UiSlice";
import type { Product } from "../../features/products/ProductsList";

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const res = await fetch("http://localhost:3000/products");
      if (!res.ok) throw new Error("Error .... ");
      return await res.json();
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }
);
