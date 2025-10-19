import { apiFetch } from "@/utils/fetch-helper";
import { WeeklyUser } from "../../types/user";

export const fetchWeeklyUsers = async () => {
  return await apiFetch<WeeklyUser[]>(`/users/weekly`, {
    next: { tags: ["WeeklyUser"] },
  });
};
