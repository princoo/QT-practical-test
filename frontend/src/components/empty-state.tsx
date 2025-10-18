import { FileChartColumnIncreasing } from "lucide-react";
import { ReactNode } from "react";
export function EmptyState({
  message = "No data available",
  icon,
}: {
  readonly message?: string;
  readonly icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon ? (
        <div className="mb-4 text-muted-foreground">{icon}</div>
      ) : (
        <FileChartColumnIncreasing
          size={30}
          className="text-muted-foreground"
        />
      )}
      <p className="text-xs text-muted-foreground max-w-sm">{message}</p>
    </div>
  );
}
