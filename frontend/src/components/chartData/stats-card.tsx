import { StatsCardProps } from "@/lib/types/stats";
import type React from "react";

export function StatsCard({
  title,
  value,
  trend,
  trendPositive = true,
  children,
}: Readonly<StatsCardProps>) {
  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">
        {title}
      </h3>
      <div className="text-4xl font-bold text-foreground mb-1">{value}</div>
      <div
        className={`text-sm mb-4 ${
          trendPositive ? "text-blue-600" : "text-red-600"
        }`}
      >
        {trend}
      </div>
      {children}
    </div>
  );
}
