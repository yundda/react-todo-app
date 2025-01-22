import {
  faCheck,
  faPen,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { create, deleteTodo, done } from "../store/module/todo";
import { useEffect, useRef } from "react";
import styled from "styled-components";

export default function TodoList() {
  const todolist = useSelector((state) => state.todo.list);
  // let todolist = useSelector((state) => state.todo.list);
  // todolist = todolist.filter((todo) => !todo.done);
  // const nextID = useSelector((state) => state.todo.nextID);
  // console.log("nextID", nextID);
  console.log(todolist);

  const dispatch = useDispatch();
  const inputRef = useRef();

  const createTodo = () => {
    dispatch(
      create({
        id: todolist.length == 0 ? 0 : todolist[todolist.length - 1].id + 1,
        text: inputRef.current.value,
      })
    );
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const enterTodo = (e) => {
    // 한글이 두 번 추가 되는 걸 막아주는 코드
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") createTodo();
  };

  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <section>
      <h3>
        <FontAwesomeIcon icon={faPenToSquare} /> 할 일 목록
      </h3>
      <div>
        <input type="text" ref={inputRef} onKeyDown={enterTodo} />
        <button onClick={createTodo}>
          <FontAwesomeIcon icon={faPen} style={{ fontSize: "1.2rem" }} />
        </button>
        <ul>
          {todolist.map((todo) => {
            return (
              !todo.done && (
                <li key={todo.id}>
                  <span>{todo.text}</span>
                  <button
                    onClick={() => dispatch(done(todo.id))}
                    style={{
                      border: "1px solid black",
                      borderRadius: "3px",
                      padding: "0 2px",
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>{" "}
                  <button
                    className="delete"
                    onClick={() => {
                      dispatch(deleteTodo(todo.id));
                    }}
                  >
                    X
                  </button>
                </li>
              )
            );
          })}
        </ul>
      </div>
    </section>
  );
}
