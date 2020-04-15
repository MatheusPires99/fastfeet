import axios from "axios";

const api = axios.create({
  baseURL: "htpp://localhost:3333",
});

export default api;
