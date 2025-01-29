import { combineReducers } from "redux";
import { todoReducer } from "./module/todo";

// 개별 reducer 통합 combineReducers
export const rootReducer = combineReducers({
  todo: todoReducer,
});
