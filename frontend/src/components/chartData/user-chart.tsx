"use client";

import { ChartWrapper } from "../custom/chart-wrapper";
import { useChartData } from "@/lib/hooks/chat-data";
import { WeeeklyChartProps, WeeklyUser } from "@/lib/types/user";
import { useGetWeeklyUsersQuery, userApi } from "@/lib/services/client/user";
import UsersLineChart from "./line-chart";
import { parseChartResponse } from "@/utils/responseHelper";
import { useMemo } from "react";

export function WeeklyChart({ response }: Readonly<WeeeklyChartProps>) {
  const { responseData, isLoading, handleRetry } = useChartData<
    WeeklyUser[],
    undefined
  >({
    response,
    queryHook: useGetWeeklyUsersQuery,
    queryName: "getWeeklyUsers",
    apiSlice: userApi,
  });
  const { success, data, isEmpty, total } = useMemo(
    () => parseChartResponse(responseData),
    [responseData]
  );
  console.log("first")
  console.log(data);
  return (
    <ChartWrapper
      title="Users created per day"
      withTitle={true}
      subTitle="Last 7 days"
      isLoading={isLoading}
      hasError={!success}
      errorMessage={responseData.message || "Failed to load weekly users."}
      onRetry={handleRetry}
      isEmpty={isEmpty}
    >
      {!isLoading && <p className="px-6 text-3xl pb-6 text-black">{total}</p>}
      <UsersLineChart chartData={data} />
    </ChartWrapper>
  );
}
