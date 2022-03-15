import axios from "axios";

export const baseURLHost = "http://localhost:8080"

const api = axios.create({
    baseURL: baseURLHost
});

export default api;