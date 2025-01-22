import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
// configureStore로 store 만들기
const store = configureStore({ reducer: rootReducer });
// Provider로 감싸고 store props로 store 전달
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
