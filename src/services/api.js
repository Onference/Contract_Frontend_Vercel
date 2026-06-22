import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_SERVER
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.headers["x-token"] = token || "";

  return config;
});