export const server = "http://localhost:2222/api/v2";
import axios from "axios";
export const myApi = axios.create({
  baseURL: server,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
