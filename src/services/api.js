import axios from "axios";

const api = axios.create({
    baseURL: "https://openlibrary.org",
    timeout: 10000,
});

export default api;