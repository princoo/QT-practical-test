"use client";

import { ErrorBoundaryWithRefreshProps } from "@/lib/types/response";

export function ErrorBoundaryWithRefresh({
  onRetry,
}: Readonly<ErrorBoundaryWithRefreshProps>) {
  const handleRefresh = () => {
    if (onRetry) {
      onRetry();
    }
  };

  return (
    <div
      data-testid="error-boundary"
      className="flex flex-col items-center justify-center p-8 text-center space-y-2"
    >
      <div>
        <h3 data-testid="error-title" className="text-sm font-semibold">
          Failed to load data
        </h3>
      </div>
      <button onClick={handleRefresh} className="bg-transparent text-xs">
        Try Again
      </button>
    </div>
  );
}
