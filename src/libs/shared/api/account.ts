import { apiService } from "../services/bank-service.instance";

export const getBankAccounts = async (
  link_id: string,
  page_size?: number,
  page?: number
) => {
  try {
    const banks = await apiService.get(
      `/account/${link_id}?page_size=${page_size ?? 10}&page=${page ?? 1}`
    );
    return banks.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(
      new Error("Unexpected error occurred when obtaining the institutions")
    );
  }
};
