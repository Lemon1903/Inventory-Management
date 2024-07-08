import { ChartData, ChartOptions } from "chart.js";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

interface IBarChartProps {
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
  isLoading: boolean;
}

export default function BarChart({ data, options, isLoading }: IBarChartProps) {
  const [isResizing, setIsResizing] = useState(false);

  window.addEventListener("resize", () => {
    setIsResizing(true);
    setTimeout(() => setIsResizing(false), 500);
  });

  return (
    <div className="mt-4 flex max-md:justify-center">
      {isLoading || isResizing ? (
        <div className="grid flex-grow place-items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <Bar className="w-full" data={data} options={options} />
      )}
    </div>
  );
}
