import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const register = (name, email, password) => {
  return axios
    .post(API_URL + "users", {
        name,
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

const login = (email, password) => {

  return axios
    .post(API_URL + "auth", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("session", JSON.stringify(response.data.session));
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