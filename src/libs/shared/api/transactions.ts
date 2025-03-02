import { apiService } from "../services/bank-service.instance";

export const getTransactions = async (
  link_id: string,
  account_id: string,
  page_size?: number,
  page?: number
) => {
  try {
    const transactions = await apiService.get(
      `/transactions/${link_id}/${account_id}?page_size=${
        page_size ?? 10
      }&page=${page ?? 1}`
    );
    return transactions.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(
      new Error("Unexpected error occurred when obtaining the transactions")
    );
  }
};

export const getAccountKpi = async (link_id: string, account_id: string) => {
  try {
    const kpi = await apiService.get(`/account/kpi/${link_id}/${account_id}`);
    return kpi.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(
      new Error("Unexpected error occurred when obtaining KPI")
    );
  }
};

export const getTransactionDetail = async (transaction_id: string) => {
  try {
    const transaction = await apiService.get(
      `/transaction/details/${transaction_id}`
    );
    return transaction.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(
      new Error("Unexpected error occurred when obtaining transaction details")
    );
  }
};
