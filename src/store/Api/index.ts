import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../ProductsList";
import type { Todo } from "../../todos/Todo";

export const ProductsApi = createApi({
  reducerPath: "ProductsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["products", "todos"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => "products",
      providesTags: ["products"],
    }),

    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

type Pagination = {
  page?: number;
  limit?: number;
};
export const TodoApi = createApi({
  reducerPath: "TodosApi",
  tagTypes: ["todos"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getAllTodos: builder.query<Todo[], Pagination>({
      query: ({ page, limit }) =>
        page && limit ? `todos?_page=${page}&_limit=${limit}` : "todos",
      providesTags: ["todos"],
      // transformResponse: (res: Todo[]) => res.slice(0, 10),
    }),
    getTodoById: builder.query<Todo, string>({
      query: (id: string) => `todos/${id}`,
      providesTags: (_result, _error, id) => [{ type: "todos", id }],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = ProductsApi;

export const { useGetAllTodosQuery, useGetTodoByIdQuery } = TodoApi;
