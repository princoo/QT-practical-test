// import { useState, useCallback, useEffect } from "react";
// import { TableState, UseTableLogicProps, UseTableLogicReturn } from "../types/app-table";

import { useGetAllusersQuery } from "../services/client/user";

// export function useTableLogic<T>({
//   fetchFunction,
//   decodeFunction,
//   autoFetch = true,
// }: UseTableLogicProps<T>): UseTableLogicReturn<T> {
//   const [state, setState] = useState<TableState<T>>({
//     data: [],
//     loading: autoFetch,
//     error: null,
//   });

//   // Fetch and decode data
//   const fetchData = useCallback(async () => {
//     setState((prev) => ({ ...prev, loading: true, error: null }));

//     try {
//       // 1. Fetch protobuf binary data
//       const buffer = await fetchFunction();

//       // 2. Decode protobuf to array of objects
//       const items = await decodeFunction(buffer);

//       setState({
//         data: items,
//         loading: false,
//         error: null,
//       });
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error
//           ? err.message
//           : "An error occurred while fetching data";

//       setState((prev) => ({
//         ...prev,
//         loading: false,
//         error: errorMessage,
//       }));
//     }
//   }, [fetchFunction, decodeFunction]);

//   // Auto-fetch on mount if enabled
//   useEffect(() => {
//     if (autoFetch) {
//       fetchData();
//     }
//   }, [autoFetch, fetchData]);

//   // Retry function (same as refetch for this use case)
//   const retry = useCallback(() => {
//     fetchData();
//   }, [fetchData]);

//   // Manually set data (useful for optimistic updates or filtering)
//   const setData = useCallback((newData: T[]) => {
//     setState((prev) => ({ ...prev, data: newData }));
//   }, []);

//   // Clear error
//   const clearError = useCallback(() => {
//     setState((prev) => ({ ...prev, error: null }));
//   }, []);

//   // Check if data is empty
//   const isEmpty = state.data.length === 0 && !state.loading;

//   return {
//     data: state.data,
//     loading: state.loading,
//     error: state.error,
//     retry,
//     setData,
//     clearError,
//     isEmpty,
//   };
// }

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
