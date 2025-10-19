import { dashboardCards } from "@/lib/constant/dashboard-cards";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="m-20">
      <h1 className="text-3xl font-bold mb-8">Users</h1>
      {dashboardCards.map(({ id, component: Card, loader: Loader }) => (
        <Suspense key={id} fallback={<Loader />}>
          <Card key={id} />
        </Suspense>
      ))}
    </div>
  );
}
