import axios from "axios";
import { getDataFromCookie } from "@data-service";

const request = axios.create({
  baseURL: "https://texnoark.ilyosbekdev.uz/",
});

request.interceptors.request.use((config) => {
  const token = getDataFromCookie("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default request;
