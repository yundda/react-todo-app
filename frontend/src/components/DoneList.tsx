import {
  faCircleMinus,
  faListCheck,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, notDone } from "../store/module/todo";
import React from "react";
import { ReducerInterface } from "../interface/interface";
import axios from "axios";

export default function DoneList() {
  const donelist = useSelector((state: ReducerInterface) => state.todo.list);
  //   let donelist = useSelector((state) => state.todo.list);
  //   donelist = donelist.filter((todo)=>todo.done)

  const toDelete = async (id: number) => {
    // state를 변경해서 화면을 바꾸는 것
    dispatch(deleteTodo(id));
    // DB 정보를 바꾸기 위한 axios 요청 /todo/:todoId
    await axios.delete(`${process.env.REACT_APP_API_SERVER}/todo/${id}`);
  };

  const toNotDone = async (id: number) => {
    dispatch(notDone(id));
    await axios.patch(`${process.env.REACT_APP_API_SERVER}/todoDone/${id}`);
  };

  const dispatch = useDispatch();
  return (
    <section>
      <h3>
        <FontAwesomeIcon icon={faListCheck} /> 완료 목록
      </h3>
      <ul>
        {donelist.map((todo) => {
          return (
            todo.done && (
              <li key={todo.id}>
                <span>{todo.text}</span>
                <button
                  className="toggle"
                  onClick={() => {
                    toNotDone(todo.id);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    style={{ fontSize: "1.2rem", color: "rgb(5, 116, 227)" }}
                  />
                </button>
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
    </section>
  );
}
