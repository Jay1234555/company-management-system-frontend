import axios from "axios";

const API = axios.create({
    baseURL: "https://impartial-connection-production-d265.up.railway.app/api"
});

export default API;