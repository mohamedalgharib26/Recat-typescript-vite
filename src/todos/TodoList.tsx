// import { useSelector } from "react-redux";
// import { useAppDispatch, type RootState } from "../store";
// import { fetchTodos } from "../store/Thunks/TodoThunk";
// import { useEffect } from "react";

import { useEffect, useState } from "react";
import { useGetAllTodosQuery } from "../store/Api";
import type { Todo } from "./Todo";
import SingleTodo from "./Todo";

const TodoList = () => {
  // const { items } = useSelector((state: RootState) => state.todos);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchTodos());
  // }, [dispatch]);
  const [pageNumber, SetPage] = useState(1);
  const [lastValidData, setLastValidData] = useState<Todo[]>([]);

  const { data: items } = useGetAllTodosQuery({
    page: pageNumber,
    limit: 40,
  });
  useEffect(() => {
    if (items && items.length > 0) {
      setLastValidData(items);
    }
  }, [items]);

  return (
    <div>
      {lastValidData &&
        lastValidData.map((item: Todo) => {
          return <SingleTodo id={item.id} title={item.title} key={item.id} />;
        })}
      {pageNumber != 1 && (
        <button
          className="bg-blue-500 text-green-300 px-3 py-1 rounded mr-2 hover:bg-blue-600"
          onClick={() => SetPage((prev) => prev - 1)}
        >
          Prev
        </button>
      )}
      {items && items.length > 0 && (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
          onClick={() => SetPage((prev) => prev + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default TodoList;
