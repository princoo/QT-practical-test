export interface StatsCardProps {
  title: string;
  value: number;
  trend: string;
  trendPositive?: boolean;
  children?: React.ReactNode;
}
export interface DailyUserCount {
  date: string
  count: number
}

export interface StatsData {
  total: number
  percentageChange: number
  data: DailyUserCount[]
}
