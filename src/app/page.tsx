"use client";
import React from "react";
import Header from "./components/header";
import { TODOAPI } from "./apis/todoAPI";
import { Spin } from "antd";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export default function Home() {
  const [mounted, setMounted] = React.useState<boolean>(false)
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const [todoById, setTodoById] = React.useState<ITodo | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false)
  const fetchData = async () => {
    const data = await TODOAPI.getTodos();
    setTodos(data);
    setLoading(false)
  };
  const handleTodo = async (id: number) => {
    try {
      const data = await TODOAPI.getTodoById({ id });
      console.log(data)
      const todo = todos.find((task)=>task.id === id)
      if(todo)
      setTodoById(todo);
    } catch (error) {
      console.log(error);
    }
  };
  const handleComplete = async (todo:ITodo) => {
    try {
      const data = await TODOAPI.updateTodo(todo );
      console.log(data)
      const updatedTodos = todos.map(task => {
        if (task.id === todo.id) {
          console.log(task)
          return { ...task, completed: true };
        }
        return task;
      });
      setTodos(updatedTodos);
      if (todoById && todoById.id === todo.id) {
        setTodoById({ ...todoById, completed: true });
      }
      toast.success("Task Completed Successfully",{
        position:"top-right",
        theme:"light"
      })
    } catch (error) {    
      console.log(error);
    }
  };
  const handleDelete = async(id:number) => {
    try {
      const data = await TODOAPI.delete({id});
      console.log(data)
      toast.success("Task Deleted Successfully",{
        position:"top-right",
        theme:"light"
      })
      const newTodos = todos.filter((todo)=>todo.id !== id);
      setTodos(newTodos)
      setTodoById(null)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    if(!mounted){
      setLoading(true)
      fetchData();
    }
    setMounted(true)
  }, []);
  return (
    <div className="min-h-screen bg-primary flex flex-col w-full">
      <Header />
      <div className="flex items-center justify-center py-20 h-[90vh]">
        <div className="w-[70%] grid grid-cols-2 rounded-xl bg-secondary shadow-primary h-full">
          <div className="overflow-y-scroll flex flex-col h-full">
            {!loading ? todos.map((todo: ITodo) => (
              <div
                key={todo.id}
                className="border-[2px] border-solid border-[#d7d7d7] border-x-0 border-t-0 p-4 cursor-pointer hover:bg-gray font-bold"
                onClick={() => handleTodo(todo.id)}
              >
                {todo.title}
              </div>
            ))
          :(
            <div className="flex w-full h-full justify-center items-center">
              <Spin size={"large"}/>
            </div>
          )}
          </div>
          <div className="flex items-center px-16 text-xl w-full">
            {todoById ? (
              <div className="flex flex-col space-y-4 w-full">
                <div className="flex gap-x-3 ">
                  <span className="font-semibold flex">Title :</span>
                  <span className="flex-1">{todoById.title}</span>
                </div>
                <div className="flex gap-x-3">
                  <span className="font-semibold">User ID :</span>
                  <span>{todoById.userId}</span>
                </div>
                <div className="flex gap-x-6 text-white text-lg justify-center items-center">
                  <button className="px-4 py-2 bg-red rounded-lg" onClick={()=>handleDelete(todoById.id)}>
                    Delete
                  </button>
                  <button
                    className={`px-4 py-2 bg-green rounded-lg ${todoById.completed ? "cursor-not-allowed opacity-40" :""}`}
                    disabled={todoById.completed}
                    onClick={() => handleComplete(todoById)}
                  >
                    Completed
                  </button>
                </div>
              </div>
            ) : (
              <div className="font-semibold w-full flex justify-center items-center">Please select a todo</div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
