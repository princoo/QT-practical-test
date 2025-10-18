export type ErrorResponse = {
  success: false;
  message: string;
};

export type SuccessResponse<T> = {
  success: true;
  message?: string;
  data: T;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export interface ErrorBoundaryWithRefreshProps {
  error: string;
  onRetry?: () => void;
}
