import axios from "axios";

const api = axios.create({
  baseURL: process.env.FAKE_STORE_API,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
