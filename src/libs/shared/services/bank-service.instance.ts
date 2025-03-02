import Cookies from "js-cookie";
import axios from "axios";

export const apiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVICE as string,
  withCredentials: true,
});

apiService.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken"); // Leer de la cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
