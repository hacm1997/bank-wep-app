"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { AcountResponse, UseAccountParams } from "./types";
import { toast } from "react-toastify";
import { getBankAccounts } from "@/libs/shared/api/account";

export const useAccount = (params?: UseAccountParams) => {
  const [accounts, setAccounts] = useState<AcountResponse | undefined>(
    undefined
  );
  const [prevParams, setPrevParams] = useState<UseAccountParams | undefined>(
    undefined
  );

  const memoizedParams = useMemo(
    () => ({
      link_id: params?.link_id,
      page_size: params?.page_size,
      page: params?.page,
    }),
    [params?.page_size, params?.page, params?.link_id]
  );

  const fetchAccounts = useCallback(async () => {
    if (
      prevParams &&
      prevParams.page_size === memoizedParams.page_size &&
      prevParams.page === memoizedParams.page
    ) {
      return;
    }

    try {
      if (params?.link_id) {
        const res = await getBankAccounts(
          params?.link_id,
          memoizedParams.page_size,
          memoizedParams.page
        );

        setAccounts(res);
        setPrevParams(memoizedParams);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
      toast.error("Failed to load accounts list");
    }
  }, [memoizedParams, prevParams, params?.link_id]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return { accounts };
};
