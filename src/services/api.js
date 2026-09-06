import axios from "axios";

const api = axios.create({
  baseURL: "https://impartial-connection-production-d265.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;