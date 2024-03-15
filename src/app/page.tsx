"use client";
import React from "react";
import Header from "./components/header";
import { TODOAPI } from "./apis/todoAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import List from "./components/list";
import Task from "./components/task";
import { ITodo } from "./interface";

export default function Home() {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const [todoById, setTodoById] = React.useState<ITodo | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const fetchData = async () => {
    const data = await TODOAPI.getTodos();
    setTodos(data);
    setLoading(false);
  };
  const handleTodo = async (id: number) => {
    try {
      const data = await TODOAPI.getTodoById({ id });
      console.log(data);
      const todo = todos.find((task) => task.id === id);
      if (todo) setTodoById(todo);
    } catch (error) {
      console.log(error);
    }
  };
  const handleComplete = async (todo: ITodo) => {
    try {
      const data = await TODOAPI.updateTodo(todo);
      console.log(data);
      const updatedTodos = todos.map((task) => {
        if (task.id === todo.id) {
          console.log(task);
          return { ...task, completed: true };
        }
        return task;
      });
      setTodos(updatedTodos);
      if (todoById && todoById.id === todo.id) {
        setTodoById({ ...todoById, completed: true });
      }
      toast.success("Task Completed Successfully", {
        position: "top-right",
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const data = await TODOAPI.delete({ id });
      console.log(data);
      toast.success("Task Deleted Successfully", {
        position: "top-right",
        theme: "light",
      });
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
      setTodoById(null);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    if (!mounted) {
      setLoading(true);
      fetchData();
    }
    setMounted(true);
  }, []);
  return (
    <div className="min-h-screen bg-primary flex flex-col w-full">
      <Header />
      <div className="flex items-center justify-center py-20 h-[90vh]">
        <div className="w-[70%] grid grid-cols-2 rounded-xl bg-secondary shadow-primary h-full">
          <List todos={todos} loading={loading} handleTodo={handleTodo} />
          <Task
            todoById={todoById}
            handleComplete={handleComplete}
            handleDelete={handleDelete}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}