import React from "react";
import NavBar from "./NavBar";
const Layout = (Cmp) => (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <NavBar value={props.value} />
      <Cmp {...props} />
    </div>
  );
};

export default Layout;
