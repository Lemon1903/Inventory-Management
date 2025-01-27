/**
 * Program Title: BarChart.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file is a component that renders a bar chart.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide a bar chart for displaying data.
 * 
 * Data Structures used:
 * - data (ChartData<"bar">) - Stores the data for the bar chart
 * - options (ChartOptions<"bar">) - Stores the customization options for the chart
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
import { Bar } from "react-chartjs-2";

/** Represents the properties barchart component. */
export interface IBarChartProps {
  /** The data to be displayed in the bar chart. */
  data: ChartData<"bar">;

  /** The options for customizing the appearance and behavior of the bar chart. */
  options?: ChartOptions<"bar">;

  /** Indicates whether the bar chart is currently loading. */
  isLoading: boolean;
}

/**
 * Renders a bar chart component.
 *
 * @param {IBarChartProps} props - The component props.
 */
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
