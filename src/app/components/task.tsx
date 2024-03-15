import React from "react";
import { ITodo } from "../interface";

type Props = {
  todoById: ITodo | null;
  handleComplete: (todo: ITodo) => void;
  handleDelete: (id: number) => void;
};

const Task = (props: Props) => {
  return (
    <div className="flex items-center px-16 text-xl w-full">
      {props.todoById ? (
        <div className="flex flex-col space-y-4 w-full">
          <div className="flex gap-x-3 ">
            <span className="font-semibold flex">Title :</span>
            <span className="flex-1">{props.todoById.title}</span>
          </div>
          <div className="flex gap-x-3">
            <span className="font-semibold">User ID :</span>
            <span>{props.todoById.userId}</span>
          </div>
          <div className="flex gap-x-6 text-white text-lg justify-center items-center">
            <button
              className="px-4 py-2 bg-red rounded-lg"
              onClick={() => props.handleDelete(props.todoById!.id)}
            >
              Delete
            </button>
            <button
              className={`px-4 py-2 bg-green rounded-lg ${
                props.todoById.completed ? "cursor-not-allowed opacity-40" : ""
              }`}
              disabled={props.todoById.completed}
              onClick={() => props.handleComplete(props.todoById!)}
            >
              Completed
            </button>
          </div>
        </div>
      ) : (
        <div className="font-semibold w-full flex justify-center items-center">
          Please select a todo
        </div>
      )}
    </div>
  );
};

export default Task;
