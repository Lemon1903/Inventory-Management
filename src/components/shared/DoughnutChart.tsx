/**
 * Program Title: DoughnutChart.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file is a component that renders a doughnut chart.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide a doughnut chart for displaying data.
 * 
 * Data Structures used:
 * - data (ChartData<"doughnut">) - Stores the data for the doughnut chart
 * - options (ChartOptions<"doughnut">) - Stores the customization options for the chart
 * - isResizing (boolean) - State variable to track whether the window is resizing
 * 
 * Algorithms used:
 * - Window resize event listener to detect resizing, toggling isResizing state with a delay using setTimeout
 * 
 * Control:
 * - Event handling (resize event), state management (isResizing), conditional rendering (loading spinner or chart)
 */


import { ChartData, ChartOptions } from "chart.js";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";

/** Represents the properties for the doughnut chart component. */
export interface IDoughnutChartProps {
  /** The title of the chart. */
  title?: string;

  /** The data for the chart. */
  data: ChartData<"doughnut">;

  /** The options for the chart. */
  options?: ChartOptions<"doughnut">;

  /** Indicates whether the chart is currently loading. */
  isLoading: boolean;
}

/**
 * Renders a doughnut chart component.
 *
 * @param {IDoughnutChartProps} props - The component props.
 */
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
