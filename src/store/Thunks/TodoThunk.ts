/* eslint-disable @typescript-eslint/no-unused-vars */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setError, setLoading } from "../ui/UiSlice";
import type { Todo } from "../../features/todos/Todo";

export const fetchTodos = createAsyncThunk<Todo[]>(
  "Todos/fetchTodos",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const res = await fetch("http://localhost:3000/todos");
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

interface TodoState {
  items: Todo[];
}
const initialState: TodoState = {
  items: [],
};
export const TodoSlice = createSlice({
  initialState,
  name: "todos",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTodos.fulfilled, (s, a) => {
      s.items = a.payload;
    });
  },
});

export default TodoSlice.reducer;
