import { ChartCardProps, ChartWrapperProps } from "@/lib/types/chart-card";
import type React from "react";
import { Spinner } from "../loaders/Spinner";
import { ErrorBoundaryWithRefresh } from "../error-boundary-with-refetch";
import { EmptyState } from "../empty-state";

export function ChartCard({
  title,
  subTitle,
  children,
  className = "",
  headerClassName = "",
  contentClassName = "",
  withTitle = true,
}: Readonly<ChartCardProps>) {
  return (
    <div
      className={`w-full pb-0 px-3 gap-0 rounded-xl mb-6 overflow-hidden shadow-none border border-gray-200 ${className}`}
    >
      {withTitle && (
        <div className={`flex justify-between p-6 pb-0 ${headerClassName}`}>
          {withTitle && (
            <h3 className="text-xl font-semibold leading-none tracking-tight text-black">
              {title}
            </h3>
          )}
          {subTitle && (
            <span className="text-xs text-gray-500">{subTitle}</span>
          )}
        </div>
      )}
      <div className={`p-0 pt-5 ${contentClassName}`}>{children}</div>
    </div>
  );
}

export function ChartWrapper({
  title,
  subTitle,
  isLoading,
  hasError,
  errorMessage,
  onRetry,
  children,
  className,
  withTitle,
  contentClassName,
  isEmpty,
  emptyMessage,
  emptyIcon,
}: Readonly<ChartWrapperProps>) {
  if (isLoading) {
    return (
      <ChartCard
        withTitle={withTitle}
        title={title}
        subTitle={subTitle}
        className={className}
      >
        <Spinner />
      </ChartCard>
    );
  }

  if (hasError) {
    return (
      <ChartCard
        withTitle={withTitle}
        title={title}
        subTitle={subTitle}
        className={className}
      >
        <ErrorBoundaryWithRefresh
          onRetry={onRetry}
          error={errorMessage || "Failed to load data"}
        />
      </ChartCard>
    );
  }

  if (isEmpty) {
    return (
      <ChartCard
        withTitle={withTitle}
        title={title}
        subTitle={subTitle}
        className={className}
      >
        <EmptyState
          message={emptyMessage || "No data recorded for this period"}
          icon={emptyIcon}
        />
      </ChartCard>
    );
  }

  return (
    <ChartCard
      withTitle={withTitle}
      title={title}
      subTitle={subTitle}
      className={className}
      contentClassName={contentClassName}
    >
      {children}
    </ChartCard>
  );
}
