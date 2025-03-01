import axios from "axios";

export const apiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVICE as string,
  withCredentials: true, // Habilitar envío de cookies
});
