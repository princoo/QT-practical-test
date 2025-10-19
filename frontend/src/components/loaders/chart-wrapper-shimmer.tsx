import { ChartCardShimmerProps } from "@/lib/types/chart-card";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function ChartCardShimmer({
  title,
  subTitle,
  className = "",
  headerClassName = "",
  contentClassName = "",
  withTitle = true,
  chartHeight = "h-64",
}: Readonly<ChartCardShimmerProps>) {
  return (
    <Card
      className={`w-full px-3 pb-0 gap-0 rounded-xl mb-6 overflow-hidden shadow-none ${className}`}
    >
      {withTitle && (
        <CardHeader className={`flex justify-between ${headerClassName}`}>
          {withTitle && (
            <CardTitle className="text-lg font-semibold leading-none tracking-tight text-black">
              {title}
            </CardTitle>
          )}
          {subTitle && (
            <span className="text-xs text-muted-foreground">{subTitle}</span>
          )}
        </CardHeader>
      )}
      <CardContent className={`p-0 pt-5 ${contentClassName}`}>
        <div className="px-6 pb-6">
          <div
            className={`${chartHeight} bg-shimmer-gray rounded animate-pulse w-full flex items-center justify-center`}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
}
