import axios from "axios";

export const HOST = "http://localhost:5000";

export const BASE_URL = `${HOST}/api/v1`;

const API = axios.create({ baseURL: BASE_URL });

export default API;
