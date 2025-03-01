import { apiService } from "../services/bank-service.instance";

export const createLink = async (
  institution: string,
  username: string,
  password: string
) => {
  try {
    const data = {
      institution,
      username,
      password,
    };
    const link = await apiService.post("/link/", data);
    return link.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(
      new Error(
        "An unexpected error occurred when registering with the institution"
      )
    );
  }
};

export const getLinkBanks = async () => {
  try {
    const link_banks = await apiService.get("/banks/link/");
    return link_banks.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(
      new Error(
        "An unexpected error occurred when obtaining the enrolled banks"
      )
    );
  }
};
