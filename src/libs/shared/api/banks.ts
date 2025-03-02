import { apiService } from "../services/bank-service.instance";

export const getBanks = async (page_size?: number, page?: number) => {
  try {
    const banks = await apiService.get(
      `/banks?page_size=${page_size ?? 10}&page=${page ?? 1}`
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

export const bankAccounts = async (link_id: string) => {
  try {
    const accounts = await apiService.get(`/account/${link_id}`);
    return accounts.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(
      new Error(
        "An unexpected error occurred when obtaining the associated accounts"
      )
    );
  }
};

export const bankAccountDetails = async (
  link_id: string,
  account_id: string
) => {
  try {
    const account = await apiService.get(`/account/${link_id}/${account_id}`);
    return account.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(
      new Error(
        "An unexpected error occurred while obtaining the account details"
      )
    );
  }
};
