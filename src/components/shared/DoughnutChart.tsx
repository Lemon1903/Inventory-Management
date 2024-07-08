import { ChartData, ChartOptions } from "chart.js";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";

interface IDoughnutChartProps {
  title?: string;
  data: ChartData<"doughnut">;
  options?: ChartOptions<"doughnut">;
  isLoading: boolean;
}

export default function DoughnutChart({ title, data, options, isLoading }: IDoughnutChartProps) {
  const [isResizing, setIsResizing] = useState(false);

  window.addEventListener("resize", () => {
    setIsResizing(true);
    setTimeout(() => setIsResizing(false), 500);
  });

  return (
    <div className="grid gap-2 rounded-md border px-4 py-3">
      {title && <h4 className="text-xl font-semibold tracking-tight max-lg:text-center">{title}</h4>}
      {isLoading || isResizing ? (
        <div className="grid flex-grow place-items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <Doughnut className="size-full" data={data} options={options} />
      )}
    </div>
  );
}
