"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { BanksResponse, UseBanksParams } from "./types";
import { getBanks } from "@/libs/shared/api/banks";
import { toast } from "react-toastify";

export const useBanks = (params?: UseBanksParams) => {
  const [banks, setBanks] = useState<BanksResponse | undefined>(undefined);
  const [prevParams, setPrevParams] = useState<UseBanksParams | undefined>(
    undefined
  );

  const memoizedParams = useMemo(
    () => ({
      page_size: params?.page_size,
      page: params?.page,
    }),
    [params?.page_size, params?.page]
  );

  const fetchBanks = useCallback(async () => {
    if (
      prevParams &&
      prevParams.page_size === memoizedParams.page_size &&
      prevParams.page === memoizedParams.page
    ) {
      return;
    }

    try {
      const res = await getBanks(memoizedParams.page_size, memoizedParams.page);

      setBanks(res);
      setPrevParams(memoizedParams);
    } catch (error) {
      console.error("Error fetching banks:", error);
      toast.error("Failed to load bank list");
    }
  }, [memoizedParams, prevParams]);

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks]);

  return { banks };
};
