import { Action, Payload, State } from "../../interface/interface";

// 개별 state 관리 reducer 선언
const initialState = {
  list: [],
  // nextID : count
};

// ID값도 전역적으로 관리 하기 위함
// const count = initialState.list.length; //3
// initialState["nextID"] = count;

// action type에 대한 상수 설정
const CREATE = "todo/CREATE";
const DONE = "todo/DONE";
const INIT = "todo/INIT";
const NOTDONE = "todo/NOTDONE";
const DELETE = "todo/DELETE";
const UPDATE = "todo/UPDATE";

// components에서 사용될 action 반환 함수
export const create = (payload: Payload) => {
  return {
    type: CREATE,
    payload: payload, // { id: 4, text : Str, done: false },
  };
};
export const done = (id: number) => {
  return { type: DONE, id }; // id: Num
};

export const notDone = (id: number) => {
  return { type: NOTDONE, id };
};

export const deleteTodo = (id: number) => {
  return { type: DELETE, id };
};

export const updateTodo = (payload: Payload) => {
  return { type: UPDATE, payload };
};

// data:[ {id,text,done} ]
export const init = (data: Payload[]) => {
  return { type: INIT, data };
};

export const todoReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        list: action.data,
        // nextID: action.data~~~
      };
    case CREATE:
      if (action.payload?.text?.trim() === "") return state;
      console.log("CREATE 호출");
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: action.payload?.id,
            text: action.payload?.text,
            done: false,
          },
        ],
        // list: state.list.concat({
        //   id: action.payload.id,
        //   text: action.payload?.text,
        //   done: false,
        // }),
        // nextID: action.payload.id + 1,
      };
    //   return (state.list = [...state, action.payload]);
    case DONE:
      console.log("DONE 호출");
      return {
        ...state,
        list: state.list.map((todo) => {
          //   console.log("in map", todo);
          //   return todo;
          if (todo.id == action.id) {
            return {
              ...todo,
              done: true,
            };
          } else return todo;
        }),
      };

    //   return state.list.map((todo) => {
    //     if (todo.id == action.payload) {
    //       return !state.list[action.payload].done;
    //     }
    //   });
    case NOTDONE:
      return {
        ...state,
        list: state.list.map((todo) => {
          if (todo.id == action.id) {
            return {
              ...todo,
              done: false,
            };
          } else return todo;
        }),
      };
    case DELETE:
      return {
        ...state,
        list: state.list.filter((todo) => {
          return todo.id != action.id;
        }),
      };
    case UPDATE:
      console.log("update 요청", action.payload);
      return {
        ...state,
        list: state.list.map((todo) => {
          if (todo.id == action.payload?.id) {
            return { ...todo, text: action.payload?.text };
          } else return todo;
        }),
      };
    default:
      return state;
  }
};
