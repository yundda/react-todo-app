import {
  faCheck,
  faCircleMinus,
  faCircleUp,
  faPen,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { create, deleteTodo, done, updateTodo } from "../store/module/todo";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ReducerInterface } from "interface/interface";

export default function TodoList() {
  const todolist = useSelector((state: ReducerInterface) => state.todo.list);
  // let todolist = useSelector((state) => state.todo.list);
  // todolist = todolist.filter((todo) => !todo.done);
  // const nextID = useSelector((state) => state.todo.nextID);
  // console.log("nextID", nextID);
  // console.log(todolist);

  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [updateId, setUpdateId] = useState<null | number>();

  const createTodo = async () => {
    if (inputRef.current?.value.trim() == "") return;
    // state를 변경해서 화면을 바꾸는 것
    if (updateId) {
      toUpdate();
    } else if (inputRef.current) {
      dispatch(
        create({
          id: todolist.length == 0 ? 0 : todolist[todolist.length - 1].id + 1,
          text: inputRef.current?.value,
          done: false,
        })
      );
      // DB 정보를 추가하기 위한 axios 요청 POST /todo
      await axios.post(`${process.env.REACT_APP_API_SERVER}/todo`, {
        text: inputRef.current?.value,
      });

      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }
  };
  const toUpdate = async () => {
    if (inputRef.current?.value.trim() == "") return;
    if (inputRef.current && updateId) {
      dispatch(
        updateTodo({
          id: updateId,
          text: inputRef.current.value as string,
          done: true,
        })
      );

      await axios.patch(
        `${process.env.REACT_APP_API_SERVER}/todo/${updateId}`,
        {
          text: inputRef.current.value,
        }
      );
      inputRef.current.value = "";
      setUpdateId(null);
    }
  };
  const cancelUpdate = () => {
    setUpdateId(null);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };
  const toDone = async (id: number) => {
    setUpdateId(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    // state를 변경해서 화면을 바꾸는 것
    dispatch(done(id));
    // DB 정보를 바꾸기 위한 axios 요청  PATCH /todoDone/:todoId
    await axios.patch(`${process.env.REACT_APP_API_SERVER}/todoDone/${id}`);
  };

  const toDelete = async (id: number) => {
    setUpdateId(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    // state를 변경해서 화면을 바꾸는 것
    dispatch(deleteTodo(id));
    // DB 정보를 바꾸기 위한 axios 요청 /todo/:todoId
    await axios.delete(`${process.env.REACT_APP_API_SERVER}/todo/${id}`);
  };

  const toGetText = async (id: number, text: string) => {
    if (inputRef.current) {
      inputRef.current.value = text;
      inputRef.current.focus();
      setUpdateId(id);
    }
  };

  const enterTodo = (e: React.KeyboardEvent) => {
    // 한글이 두 번 추가 되는 걸 막아주는 코드
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") createTodo();
  };

  useEffect(() => {
    inputRef.current?.focus();
  });
  return (
    <section>
      <h3>
        <FontAwesomeIcon icon={faPenToSquare} /> 할 일 목록
      </h3>
      <div>
        <input type="text" ref={inputRef} onKeyDown={enterTodo} />
        <button onClick={() => createTodo()}>
          {updateId ? (
            <>
              <FontAwesomeIcon
                icon={faPen}
                style={{ color: "#243d6e", fontSize: "1.2rem" }}
              />
              <button onClick={cancelUpdate}>수정 취소</button>
            </>
          ) : (
            <FontAwesomeIcon
              icon={faCircleUp}
              style={{ color: "#272b5f", fontSize: "1.2rem" }}
            />
          )}
        </button>
        <ul>
          {todolist.map((todo) => {
            return (
              !todo.done && (
                <li key={todo.id}>
                  <span onClick={() => toGetText(todo.id, todo.text)}>
                    {todo.text}
                  </span>
                  <button
                    className="toggle"
                    onClick={() => toDone(todo.id)}
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
                      toDelete(todo.id);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCircleMinus}
                      style={{ color: "#575250" }}
                    />
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
