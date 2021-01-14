import axios from "axios";
const API_URL = "http://localhost:3001/api/auth/";

const login = (username, password) => {
  return axios.post(API_URL + "signin", {
    username,
    password,
  })
    .then((response) => {
      if (response.data.accessToken){
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  getCurrentUser,
};
