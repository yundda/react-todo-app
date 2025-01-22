import { faListCheck, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, notDone } from "../store/module/todo";

export default function DoneList() {
  const donelist = useSelector((state) => state.todo.list);
  //   let donelist = useSelector((state) => state.todo.list);
  //   donelist = donelist.filter((todo)=>todo.done)
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
                  onClick={() => {
                    dispatch(notDone(todo.id));
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    style={{ fontSize: "1.2rem" }}
                  />
                </button>
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
    </section>
  );
}
