import { fetchWeeklyUsers } from "@/lib/services/server/users";
import { WeeklyChart } from "./user-chart";

export default async function WeeklyChartSection() {
  const response = await fetchWeeklyUsers();
  return <WeeklyChart response={response} />;
}
