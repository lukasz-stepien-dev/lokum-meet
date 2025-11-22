import axios from "axios";

const BASE_URL = 'https://community-events-backend:8080';

export default axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json' }
});