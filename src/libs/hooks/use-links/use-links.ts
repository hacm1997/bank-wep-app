"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LinkResponse, UseLinksParams } from "./types";
import { toast } from "react-toastify";
import { getLinkBanks } from "@/libs/shared/api/link";

export const useLinks = (params?: UseLinksParams) => {
  const [links, setLinks] = useState<LinkResponse | undefined>(undefined);
  const [refresh, setRefresh] = useState(false);

  const refetch = () => {
    setRefresh((prev) => !prev);
  };

  const memoizedParams = useMemo(
    () => ({
      page_size: params?.page_size,
      page: params?.page,
    }),
    [params?.page_size, params?.page]
  );

  const fetchLinks = useCallback(async () => {
    try {
      const res = await getLinkBanks(
        memoizedParams.page_size,
        memoizedParams.page
      );

      setLinks(res);
    } catch (error) {
      console.error("Error fetching banks:", error);
      toast.error("Error fetching banks");
    }
  }, [memoizedParams]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks, refresh]);

  return { links, refetch };
};
