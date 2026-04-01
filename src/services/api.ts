// Axios configuration — prepared for future backend connection
// Currently not used (mock data mode), will be activated when VITE_API_URL is set

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — add JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle 401 + refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_URL}/refresh`, { refreshToken });
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/admin/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
