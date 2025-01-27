/**
 * Program Title: Revenue.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file is a component that renders the revenue analytics for the dashboard.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide a chart for displaying revenue analytics.
 * 
 * Data Structures:
 * - Query Data: revenueByProd and revenueByCat fetched using useQuery for revenue by product and category.
 * - ChartData: Contains labels (item names) and datasets (revenues and colors).
 * - ChartOptions: Configures legend for the bar chart.
 * 
 * Algorithms:
 * - Revenue Selection: Selects between product or category revenue using selectedRevenueBy.
 * - Data Mapping: Extracts itemName and revenue for chart data.
 * - Color Generation: Generates random colors for the chart using generateRandomRGBColors.
 * 
 * Control:
 * - Revenue Switch: Select component allows toggling between product and category revenue views.
 * - Chart Rendering: Displays a BarChart with the selected revenue data.
 * - Loading State: Manages loading state for both revenue queries.
 */


import { useQuery } from "@tanstack/react-query";
import { ChartData, ChartOptions } from "chart.js";
import { useMemo, useState } from "react";

import BarChart from "@/components/shared/BarChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchRevenueByCategory, fetchRevenueByProduct } from "@/lib/analytics-db";
import { generateRandomRGBColors } from "@/lib/utils";

/** Renders the revenue analytics component for the dashboard. */
export default function Revenue() {
  const [selectedRevenueBy, setSelectedRevenueBy] = useState("Product");

  const { data: revenueByProd, isLoading: loadingProd } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_REVENUE_BY_PRODUCT],
    queryFn: fetchRevenueByProduct,
  });

  const { data: revenueByCat, isLoading: loadingCat } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_REVENUE_BY_CATEGORY],
    queryFn: fetchRevenueByCategory,
  });

  const revenue = {
    Product: revenueByProd,
    Category: revenueByCat,
  }[selectedRevenueBy];

  const randomRGBColors = useMemo(() => generateRandomRGBColors(revenue?.length ?? 0), [revenueByProd, revenueByCat]);

  const chartData: ChartData<"bar"> = {
    labels: revenue?.map((item) => item.itemName) ?? [],
    datasets: [
      {
        label: "Revenue",
        data: revenue?.map((item) => item.revenue) ?? [],
        backgroundColor: randomRGBColors,
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="max-w-full rounded-md border px-4 py-3">
      <div className="flex items-center gap-4 max-lg:justify-center">
        <h3 className="min-w-max text-xl font-semibold tracking-tight">Revenue by:</h3>
        <Select onValueChange={setSelectedRevenueBy} defaultValue={selectedRevenueBy}>
          <SelectTrigger className="w-1/2 text-xl font-medium tracking-tight">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Product" className="text-xl font-medium tracking-tight">
              Product
            </SelectItem>
            <SelectItem value="Category" className="text-xl font-medium tracking-tight">
              Category
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <BarChart data={chartData} options={chartOptions} isLoading={loadingProd || loadingCat} />
    </div>
  );
}
