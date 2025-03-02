import Cookies from "js-cookie";
import { apiService } from "../services/bank-service.instance";

export const authLogin = async (username: string, password: string) => {
  try {
    const loginUser = await apiService.post("/api/auth/login/", {
      username,
      password,
    });

    const { access_token, refresh_token } = loginUser.data;

    Cookies.set("accessToken", access_token, {
      expires: 1 / 3,
      secure: true,
      sameSite: "strict",
    });
    Cookies.set("refreshToken", refresh_token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    return loginUser.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(new Error("An unexpected error occurred"));
  }
};

export const Logout = async () => {
  try {
    await apiService.post("/api/auth/logout/");

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    return { message: "Logged out successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(new Error("An unexpected error occurred"));
  }
};

export const authSignup = async (username: string, password: string) => {
  try {
    const signupUser = await apiService.post("/api/auth/register/", {
      username,
      password,
    });
    return signupUser.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(new Error("An unexpected error occurred"));
  }
};
