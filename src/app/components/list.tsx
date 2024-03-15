import { Spin } from "antd";
import React from "react";
import { ITodo } from "../interface";

type Props = {
  loading: boolean;
  todos: ITodo[];
  handleTodo: (id: number) => void;
};

const List = (props: Props) => {
  return (
    <div className="overflow-y-scroll flex flex-col h-full">
      {!props.loading ? (
        props.todos.map((todo: ITodo) => (
          <div
            key={todo.id}
            className="border-[2px] border-solid border-[#d7d7d7] border-x-0 border-t-0 p-4 cursor-pointer hover:bg-gray font-bold"
            onClick={() => props.handleTodo(todo.id)}
          >
            {todo.title}
          </div>
        ))
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <Spin size={"large"} />
        </div>
      )}
    </div>
  );
};

export default List;
