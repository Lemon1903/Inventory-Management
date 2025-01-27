/**
 * Program Title: LevelsCategoryChart.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file is a component that renders the category levels analytics for the dashboard.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide a chart for displaying category levels analytics.
 * 
 * Data Structures:
 * - Query Data: data fetched using useQuery for category inventory levels.
 * - ChartData: Contains labels (category names) and datasets (quantities and colors).
 * - ChartOptions: Configures layout and legend for the doughnut chart.
 * 
 * Algorithms:
 * - Data Mapping: Extracts name and quantity from data for chart labels and values.
 * - Color Generation: Dynamically generates colors using generateRandomRGBColors.
 * 
 * Control:
 * - Chart Rendering: Displays a DoughnutChart with fetched and formatted data.
 * - Loading State: Passes isLoading to indicate the loading state of the chart.
 */


import { useQuery } from "@tanstack/react-query";
import { ChartData, ChartOptions } from "chart.js";

import DoughnutChart from "@/components/shared/DoughnutChart";
import { fetchInventoryLvlCategory } from "@/lib/analytics-db";
import { generateRandomRGBColors } from "@/lib/utils";

/** Renders the category levels analytics component for the dashboard. */
export default function LevelsCategoryChart() {
  const { data, isLoading } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_INVENTORY_LVL_CAT],
    queryFn: fetchInventoryLvlCategory,
  });

  const chartData: ChartData<"doughnut"> = {
    labels: data?.map((item) => item.name) ?? [],
    datasets: [
      {
        label: "Products",
        data: data?.map((item) => item.quantity) ?? [],
        backgroundColor: generateRandomRGBColors(data?.length ?? 0),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        hoverOffset: 6,
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    layout: {
      padding: 10,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <DoughnutChart title="Inventory by Category" isLoading={isLoading} data={chartData} options={chartOptions} />;
}
