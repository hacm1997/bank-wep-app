"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  KpiModel,
  TransactionModel,
  TransactionsResponse,
  UseTransactionsParams,
} from "./types";
import { toast } from "react-toastify";
import {
  getAccountKpi,
  getTransactionDetail,
  getTransactions,
} from "@/libs/shared/api/transactions";

export const useTransactions = (params?: UseTransactionsParams) => {
  const [transactions, setTransactions] = useState<
    TransactionsResponse | undefined
  >(undefined);
  const [prevParams, setPrevParams] = useState<
    UseTransactionsParams | undefined
  >(undefined);

  const [transactionDetails, setTransactionDetails] = useState<
    TransactionModel | undefined
  >(undefined);

  const [accountKpi, setAccountKpi] = useState<KpiModel | undefined>(undefined);

  const memoizedParams = useMemo(
    () => ({
      link_id: params?.link_id,
      account_id: params?.account_id,
      page_size: params?.page_size,
      page: params?.page,
    }),
    [params?.page_size, params?.page, params?.account_id, params?.link_id]
  );

  const fetchTransactions = useCallback(async () => {
    if (
      prevParams &&
      prevParams.page_size === memoizedParams.page_size &&
      prevParams.page === memoizedParams.page
    ) {
      return;
    }

    try {
      if (params?.link_id && params.account_id) {
        const res = await getTransactions(
          params?.link_id,
          params?.account_id,
          memoizedParams.page_size,
          memoizedParams.page
        );

        setTransactions(res);
        setPrevParams(memoizedParams);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
      toast.error("Failed to load accounts list");
    }
  }, [memoizedParams, prevParams, params?.link_id, params?.account_id]);

  const fetchKpi = useCallback(async () => {
    try {
      if (params?.link_id && params.account_id) {
        const res = await getAccountKpi(params?.link_id, params?.account_id);

        setAccountKpi(res);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
      toast.error("Failed to load accounts list");
    }
  }, [params?.link_id, params?.account_id]);

  const fetchTransactionDetails = useCallback(async () => {
    try {
      if (params?.transaction_id) {
        const res = await getTransactionDetail(params?.transaction_id);

        setTransactionDetails(res);
      }
    } catch (error) {
      console.error("Error fetching transacation:", error);
    }
  }, [params?.transaction_id]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    fetchKpi();
  }, [fetchKpi]);

  useEffect(() => {
    fetchTransactionDetails();
  }, [fetchTransactionDetails]);

  return { transactions, accountKpi, transactionDetails };
};
