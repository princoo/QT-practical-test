import { UserRoleEnum, UserStatusEnum } from "../enums/user-enum";
import { ApiResponse } from "./response";

export interface WeeklyUser {
  date: string;
  count: number;
}
export interface WeeeklyChartProps {
  response: ApiResponse<WeeklyUser[]>;
}
export interface User {
  id: string;
  email: string;
  role: UserRoleEnum;
  status: UserStatusEnum;
  signature: string;
  createdAt: string;
}