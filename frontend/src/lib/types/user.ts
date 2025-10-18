import { ApiResponse } from "./response";

export interface WeeklyUser {
  date: string;
  count: number;
}
export interface WeeeklyChartProps {
  response: ApiResponse<WeeklyUser[]>;
}