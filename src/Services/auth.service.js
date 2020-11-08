import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const register = (username, email, password) => {
  return axios
    .post(API_URL + "users", {
        username,
        email,
        password,
    })
    .then((response) => {
        console.log('GOT ACCOUNT');
        console.log(response.data);
        if (response.data) {
            //localStorage.setItem("user", JSON.stringify(response.data));
        }

      return response;
    });
};

const login = (username, password) => {

  return axios
    .post(API_URL + "auth", {
      username,
      password,
    })
    .then((response) => {
        console.log('GOT LOGIN');
        console.log(response.data);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};