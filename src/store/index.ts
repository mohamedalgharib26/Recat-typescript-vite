import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import ProductsReducer from "./productsSlice";
import UiReducer from "./ui/UiSlice";
import TodoReducer from "./Thunks/TodoThunk";
import { ProductsApi, TodoApi } from "./Api";
const store = configureStore({
  reducer: {
    products: ProductsReducer,
    todos: TodoReducer,
    ui: UiReducer,
    [ProductsApi.reducerPath]: ProductsApi.reducer,
    [TodoApi.reducerPath]: TodoApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      ProductsApi.middleware,
      TodoApi.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
