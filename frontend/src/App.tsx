import React from "react";
import Header from "./components/Header";
import ListContainer from "./components/ListContainer";
import "./style/common.scss";
function App() {
  console.log(process.env.REACT_APP_API_SERVER);
  return (
    <>
      <header>
        <Header />
      </header>
      <ListContainer />
    </>
  );
}

export default App;
