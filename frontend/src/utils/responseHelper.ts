import { ApiResponse } from "@/lib/types/response";
import { WeeklyUser } from "@/lib/types/user";

export function parseChartResponse(responseData: ApiResponse<WeeklyUser[]>) {
  const success = responseData?.success === true;
  const data = success ? responseData.data || [] : [];

  const isEmpty = success && data.length === 0;
  const total = success
    ? data.reduce((sum, item) => sum + (item.count || 0), 0)
    : 0;

  return { success, data, isEmpty, total };
}
