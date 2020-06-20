import React, { useState, useEffect } from "react";
import { decodeToken } from "../services/tokenService";
import axiosInstance from "../API/axiosInstance";
import { stringify } from "joi-browser";

export const UserContext = React.createContext();

const Provider = (props) => {
  const [user, setUser] = useState({});

  const getUserCourses = async () => {
    const { courses } = await axiosInstance.get(
      `user/${JSON.parse(user._id)}/courses`
    );
    setUser({ ...user, courses });
  };
  const getCompletedCourses = async () => {
    const { finishedCourses } = await axiosInstance.get(
      `user/${JSON.parse(user._id)}/finished`
    );
    setUser({ ...user, finishedCourses });
  };

  useEffect(() => {
    try {
      const payload = decodeToken();
      setUser(payload);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (user._id && !user.courses) getUserCourses();
    if (user._id && !user.finishedCourses) getCompletedCourses();
  }, [JSON.stringify(user)]);
  return (
    <UserContext.Provider value={{ data: { user }, actions: { setUser } }}>
      {props.children}
    </UserContext.Provider>
  );
};
export default Provider;
