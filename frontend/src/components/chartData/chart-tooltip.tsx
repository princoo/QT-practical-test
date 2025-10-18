import { ChartTooltipProps } from "@/lib/types/chart-card";


export function ChartTooltip({ active, payload }: Readonly<ChartTooltipProps>) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0];

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-sm font-medium text-gray-900">{data.payload.date}</p>
      <p className="text-sm text-blue-600">
        Count: <span className="font-semibold">{data.value}</span>
      </p>
    </div>
  );
}
