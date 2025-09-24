export type Todo = {
  id: string;
  title: string;
};

const SingleTodo = ({ id, title }: Todo) => {
  return (
    <div>
      {" "}
      <div
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          margin: "15px",
        }}
      >
        <h4 className="m-1">{id}</h4>
        <h2 className="my-3">{title}</h2>
      </div>
    </div>
  );
};

export default SingleTodo;
