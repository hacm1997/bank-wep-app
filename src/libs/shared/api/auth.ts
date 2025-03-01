import { apiService } from "../services/bank-service.instance";

export const authLogin = async (username: string, password: string) => {
  try {
    const loginUser = await apiService.post("/api/auth/login/", {
      username,
      password,
    });
    return loginUser.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(new Error("An unexpected error occurred"));
  }
};
