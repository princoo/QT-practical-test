import UsersTable from "@/components/allUsers/users-table";
import WeeklyChartSection from "@/components/chartData/user-chart-section";

export default function Home() {
  return <div className="m-20">
    <h1 className="text-3xl font-bold mb-8">Users</h1>
    <WeeklyChartSection />
    <UsersTable />
  </div>;
}
