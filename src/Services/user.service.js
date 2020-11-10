import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/";

const startTimer = (time, goals) => {
  return axios.post(API_URL + 'me/spiral', {
        time,
        goals
    }, { headers: authHeader() });
};

const getTimer = (time, goals) => {
return axios.get(API_URL + 'me/spiral', { headers: authHeader() });
};

const cancelTimer = (time, goals) => {
  return axios.post(API_URL + 'me/spiral/cancel', null, { headers: authHeader() });
};


const getSpirals = () => {
  return axios.get(API_URL + "me/spirals", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
    startTimer,
    getTimer,
    cancelTimer,
    getSpirals,
  getModeratorBoard,
  getAdminBoard,
};
