import WeeklyChartSection from "@/components/chartData/user-chart-section";
import { CardConfig } from "../types/chart-card";
import { ChartCardShimmer } from "@/components/loaders/chart-wrapper-shimmer";
import UsersTable from "@/components/allUsers/users-table";

export const dashboardCards: CardConfig[] = [
  {
    id: "user-chart",
    component: WeeklyChartSection,
    loader: () =>
      ChartCardShimmer({
        title: "Users created per day",
        withTitle: true,
        subTitle: "Last 7 days",
      }),
  },
  {
    id: "user-table",
    component: UsersTable,
    loader: () =>
      ChartCardShimmer({
        title: "All Users",
        withTitle: true,
      }),
  },
];
