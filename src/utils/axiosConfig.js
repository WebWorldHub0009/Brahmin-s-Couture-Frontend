
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://brahmini-couture-backend.onrender.com",
  withCredentials: true,
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ✅ fixed this line

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;


