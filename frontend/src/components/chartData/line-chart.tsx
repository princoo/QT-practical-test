import { WeeklyUser } from "@/lib/types/user";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartTooltip } from "./chart-tooltip";
export default function UsersLineChart({
  chartData,
}: {
  readonly chartData: WeeklyUser[];
}) {
  console.log(chartData);
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
          stroke="#e5e7eb"
        />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#3b82f6", fontSize: 12 }}
        />
        <YAxis hide={true} />
        <Tooltip
          content={<ChartTooltip />}
          cursor={{ stroke: "#3b82f6", strokeWidth: 1 }}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#colorCount)"
          dot={{ fill: "#3b82f6", r: 3 }}
          activeDot={{ r: 5, fill: "#3b82f6" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
