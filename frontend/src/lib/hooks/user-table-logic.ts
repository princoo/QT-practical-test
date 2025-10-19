import { useGetAllusersQuery } from "../services/client/user";

export function useUsersTable() {
  const { data, isLoading, error, refetch } = useGetAllusersQuery();

  const users = data?.success ? data.data : [];

  return {
    data: users,
    loading: isLoading,
    error: error ? "Failed to load users" : null,
    retry: refetch,
    isEmpty: !isLoading && users.length === 0,
  };
}
