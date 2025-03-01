import { apiService } from "../services/bank-service.instance";

export const userPreferences = async () => {
  try {
    const user = await apiService.get("/user/profile/");
    return user.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(
      new Error("An unexpected error occurred when obtaining user data")
    );
  }
};
