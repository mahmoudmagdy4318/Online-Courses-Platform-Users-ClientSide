import React from "react";
import "./App.css";
import Router from "./Routes/browserRouter";
import UserContext from "./context/userContext";

function App() {
  return (
    <UserContext>
      <Router />
    </UserContext>
  );
}

export default App;
