// 개별 state 관리 reducer 선언
const initialState = {
  list: [
    {
      id: 0,
      text: "리액트 공부하기",
      done: false, // TodoList
    },
    {
      id: 1,
      text: "척추의 요정이 말합니다! 척추 펴기!",
      done: true, // DoneList
    },
    {
      id: 2,
      text: "운동하기",
      done: false,
    },
  ],
  // nextID : count
};

// ID값도 전역적으로 관리 하기 위함
// const count = initialState.list.length; //3
// initialState["nextID"] = count;

// action type에 대한 상수 설정
const CREATE = "todo/CREATE";
const DONE = "todo/DONE";
const NOTDONE = "todo/NOTDONE";
const DELETE = "todo/DELETE";

// components에서 사용될 action 반환 함수
export const create = (payload) => {
  return {
    type: CREATE,
    payload: payload, // { id: 4, text : Str, done: false },
  };
};
export const done = (id) => {
  return { type: DONE, id }; // id: Num
};

export const notDone = (id) => {
  return { type: NOTDONE, id };
};

export const deleteTodo = (id) => {
  return { type: DELETE, id };
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      if (action.payload.text.trim() === "") return state;
      console.log("CREATE 호출");
      return {
        ...state,
        // list: [...state.list, {
        //   id: action.payload.id,
        //   text: action.payload.text,
        //   done: false,
        // }],
        list: state.list.concat({
          id: action.payload.id,
          text: action.payload.text,
          done: false,
        }),
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
    default:
      return state;
  }
};
