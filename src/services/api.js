import axios from "axios";

const API = axios.create({
    baseURL: "https://shimmering-friendship-production-7442.up.railway.app/api"
});

export default API;