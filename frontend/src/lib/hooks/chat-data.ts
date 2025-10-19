/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch } from "@/lib/hooks";
import { ApiResponse } from "@/lib/types/response";
import { useState, useEffect, useCallback } from "react";
import { UseChartDataOptions } from "../types/data-hooks";
import { getErrorMessage } from "@/utils/get-error-message";

export function useChartData<T, Q>({
  response,
  queryHook,
  queryName,
  apiSlice,
}: UseChartDataOptions<T, Q>) {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [responseData, setResponseData] = useState<ApiResponse<T>>(response);
  const dispatch = useAppDispatch();

  const { data, isLoading, isFetching, error, refetch } = queryHook(undefined, {
    skip: !shouldFetch,
  });

  useEffect(() => {
    if (response) {
      setResponseData(response);
      dispatch(
        apiSlice.util.upsertQueryData(queryName as any, undefined, response as any)
      );
    }
  }, [response, dispatch, queryName, apiSlice]);

  useEffect(() => {
    if (data) {
      setResponseData(data);
    } else if (error) {
      const err = getErrorMessage(error);
      setResponseData({
        success: false,
        message: err,
      });
    }
  }, [data, error]);

  const handleRetry = useCallback(() => {
    if (shouldFetch) {
      refetch();
    } else {
      setShouldFetch(true);
    }
  }, [shouldFetch, refetch]);

  return {
    responseData,
    isLoading: isLoading || isFetching,
    handleRetry,
  };
}
