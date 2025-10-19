import { baseApi } from "@/lib/base-api";
import { UserFormData } from "@/lib/schemas/user-schema";
import { ApiResponse } from "@/lib/types/response";
import { User, WeeklyUser } from "@/lib/types/user";
import { decodeUsers } from "@/utils/proto";
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWeeklyUsers: builder.query<ApiResponse<WeeklyUser[]>, void>({
      query: () => "/users/weekly",
      providesTags: ["WeeklyUser"],
    }),
    getAllusers: builder.query<ApiResponse<User[]>, void>({
      query: () => ({
        url: "/users/export",
        responseHandler: async (response) => {
          return response.arrayBuffer();
        },
      }),
      transformResponse: async (buffer: ArrayBuffer) => {
        const users = await decodeUsers(buffer);
        return {
          success: true,
          message: "Users fetched successfully",
          data: users,
        };
      },
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<
      ApiResponse<User>,
      { id: string; data: UserFormData }
    >({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    addUser: builder.mutation<ApiResponse<User>, UserFormData>({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "WeeklyUser"],
    }),
    deleteUser: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "WeeklyUser"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetWeeklyUsersQuery,
  useGetAllusersQuery,
  useUpdateUserMutation,
  useAddUserMutation,
  useDeleteUserMutation,
} = userApi;
