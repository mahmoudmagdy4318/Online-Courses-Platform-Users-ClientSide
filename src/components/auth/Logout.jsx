import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { removeToken } from "../../services/tokenService";

const Logout = () => {
  const history = useHistory();
  removeToken();
  history.push("/");
  return null;
};

export default Logout;
