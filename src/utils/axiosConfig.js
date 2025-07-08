import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // 🔁 Change this to your backend URL when deployed
  withCredentials: true, // optional if you're using auth cookies
});

export default api;
