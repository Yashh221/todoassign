import axios from "axios";

export const TODOAPI = {
  getTodos: async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const data = response.data;
    return data;
  },
  getTodoById: async (data: any) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${data.id}`
    );
    const res = response.data;
    return res;
  },
  updateTodo: async (data: any) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${data.id}`,
      {
        title: data.title,
        id: data.id,
        userId: data.userId,
        completed: true,
      }
    );
    const res = response.data;
    return res;
  },
  delete: async (data: any) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${data.id}`
    );
    const res = response.data;
    return res;
  },
};
