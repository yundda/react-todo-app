import { useEffect } from "react";
import DoneList from "./DoneList";
import TodoList from "./TodoList";
import axios from "axios";
import { useDispatch } from "react-redux";
import { init } from "../store/module/todo";
import React from "react";
export default function ListContainer() {
  const dispatch = useDispatch();
  async function getTodos() {
    const todos = await axios.get(`${process.env.REACT_APP_API_SERVER}/todos`);
    console.log(todos);

    if (todos.data) dispatch(init(todos.data));
  }

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <main>
      <TodoList />
      <DoneList />
    </main>
  );
}
