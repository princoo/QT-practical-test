import { baseApi } from "@/lib/base-api";
import { ApiResponse } from "@/lib/types/response";
import { WeeklyUser } from "@/lib/types/user";
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWeeklyUsers: builder.query<ApiResponse<WeeklyUser[]>, void>({
      query: () => "/users/weekly",
    }),
  }),

  overrideExisting: false,
});

export const { useGetWeeklyUsersQuery } = userApi;
