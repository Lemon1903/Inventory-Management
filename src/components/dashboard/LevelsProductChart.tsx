/**
 * Program Title: LevelsProductChart.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file is a component that renders the product levels analytics for the dashboard.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide a chart for displaying product levels analytics.
 * 
 * Data Structures:
 * - Query Data: data fetched using useQuery for product inventory levels.
 * - ChartData: Contains labels (product names) and datasets (quantities and colors).
 * - ChartOptions: Configures layout and legend for the doughnut chart.
 * 
 * Algorithms:
 * - Data Mapping: Extracts name and quantity from data for chart labels and values.
 * - Color Generation: Generates random colors using generateRandomRGBColors.
 * 
 * Control:
 * - Chart Rendering: Displays a DoughnutChart with the fetched and formatted data.
 * - Loading State: Passes isLoading to manage loading indicator.
 */


import { useQuery } from "@tanstack/react-query";
import { ChartData, ChartOptions } from "chart.js";

import DoughnutChart from "@/components/shared/DoughnutChart";
import { fetchInventoryLvlProduct } from "@/lib/analytics-db";
import { generateRandomRGBColors } from "@/lib/utils";

/** Renders the products levels analytics component for the dashboard. */
export default function LevelsProductChart() {
  const { data, isLoading } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_INVENTORY_LVL_PROD],
    queryFn: fetchInventoryLvlProduct,
  });

  const chartData: ChartData<"doughnut"> = {
    labels: data?.map((item) => item.name) ?? [],
    datasets: [
      {
        label: "Stock",
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

  return <DoughnutChart title="Inventory by Product" isLoading={isLoading} data={chartData} options={chartOptions} />;
}
