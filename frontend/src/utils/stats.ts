import { DailyUserCount, StatsData } from "@/lib/types/stats";

export function calculateStats(data: DailyUserCount[]): StatsData {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  // Calculate percentage change (mock calculation for demo)
  const percentageChange = 12;

  return {
    total,
    percentageChange,
    data,
  };
}

export function formatDayOfWeek(dateString: string): string {
  const date = new Date(dateString);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value}%`;
}
