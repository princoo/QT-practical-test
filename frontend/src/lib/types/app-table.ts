import { LucideIcon } from "lucide-react";
import { ApiResponse } from "./response";
import { ReactNode } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export type Column<T> = {
  key: keyof T;
  label: string;
  align?: "left" | "right" | "center";
  render?: (value: T[keyof T]) => React.ReactNode;
};

export type AppTableProps<T> = {
  caption?: string;
  columns: Column<T>[];
  data: T[];
  renderActions?: (row: T) => React.ReactNode;
  actionsLabel?: string;
};
export type WithId = {
  id: string | number;
};


// export interface UseTableLogicProps<T, QueryParams> {
//   initialData: ApiResponse<T>;
//   /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
//   lazyFetchQuery: any;
//   queryParams: QueryParams;
// }

export interface BaseTableData<T> {
  data: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  loading: boolean;
  error: string | null;
}

export interface TableContextType<TData, TExtended> {
  value: BaseTableData<TData> & TExtended;
  setValue: (
    val:
      | (BaseTableData<TData> & TExtended)
      | ((
          prev: BaseTableData<TData> & TExtended
        ) => BaseTableData<TData> & TExtended)
  ) => void;
}

export interface SecondaryCardProps {
  title: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  Icon: LucideIcon;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  description?: string;
  renderActions?: (row: T) => ReactNode;
  actionsLabel?: string;
  caption?: string;
  className?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  error?: string | null;
  onRowClick?: (row: T) => void;
  retry?: () => void;
}

export interface TableErrorSectionProps {
  refetch: () => void;
  isloading: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

export interface MockTableData {
  id: string;
  name: string;
  email: string;
  status: string;
}

export interface TableState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export interface UseTableLogicProps<T> {
  fetchFunction: () => Promise<ArrayBuffer>;
  decodeFunction: (buffer: ArrayBuffer) => Promise<T[]>;
  autoFetch?: boolean;
}

export interface UseTableLogicReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  retry: () => void;
  setData: (data: T[]) => void;
  clearError: () => void;
  isEmpty: boolean;
}

export interface ConfirmDeleteProps {
  onCancel: () => void;
  onDelete: () => void;
}