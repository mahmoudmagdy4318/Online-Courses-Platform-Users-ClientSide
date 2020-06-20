import axiosInstance from "../API/axiosInstance";

const register = (userData) => {
  return axiosInstance.post("user/register", userData);
};
const login = (userData) => {
  console.log({ userData });
  return axiosInstance.post("user/login", userData);
};

export { register, login };
