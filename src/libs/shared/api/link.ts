import { apiService } from "../services/bank-service.instance";

export const createLink = async (institution: string, username: string) => {
  try {
    const data = {
      institution,
      username,
      password: process.env.NEXT_PUBLIC_BANK_PASS as string,
    };
    const link = await apiService.post("/banks/link", data);
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

export const getLinkBanks = async (page_size?: number, page?: number) => {
  try {
    const link_banks = await apiService.get(
      `/banks/link?page_size=${page_size ?? 10}&page=${page ?? 1}`
    );
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

export const deletLink = async (link_id: string) => {
  try {
    const link_banks = await apiService.delete(`/banks/link/${link_id}`);
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
