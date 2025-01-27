/**
 * Program Title: Sold.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file is a component that renders the sold analytics for the dashboard.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide a chart for displaying sold analytics.
 * 
 * Data Structures:
 * - Query Data: soldByProd and soldByCat contain data for sold items by product and category.
 * - ChartData: Includes labels (item names) and datasets (quantities sold with colors).
 * - ChartOptions: Configuration for the bar chart (e.g., hiding the legend).
 * 
 * Algorithms:
 * - Sold Data Selection: Chooses between product and category data using selectedSoldBy.
 * - Data Mapping: Extracts itemName and quantitySold for the chart.
 * - Color Generation: Uses generateRandomRGBColors for dynamic chart colors.
 * 
 * Control:
 * - Sold Data Switch: Select component lets users toggle between product and category views.
 * - Chart Rendering: Displays a BarChart based on selected sold data.
 * - Loading State: Manages loading state for both product and category queries.
 */


import { useQuery } from "@tanstack/react-query";
import { ChartData, ChartOptions } from "chart.js";
import { useMemo, useState } from "react";

import BarChart from "@/components/shared/BarChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchSoldByCategory, fetchSoldByProduct } from "@/lib/analytics-db";
import { generateRandomRGBColors } from "@/lib/utils";

/** Renders the sold analytics component for the dashboard. */
export default function Sold() {
  const [selectedSoldBy, setSelectedSoldBy] = useState("Product");

  const { data: soldByProd, isLoading: loadingProd } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_SOLD_BY_PRODUCT],
    queryFn: fetchSoldByProduct,
  });

  const { data: soldByCat, isLoading: loadingCat } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_SOLD_BY_CATEGORY],
    queryFn: fetchSoldByCategory,
  });

  const sold = {
    Product: soldByProd,
    Category: soldByCat,
  }[selectedSoldBy];

  const randomRGBColors = useMemo(() => generateRandomRGBColors(sold?.length ?? 0), [soldByProd, soldByCat]);

  const chartData: ChartData<"bar"> = {
    labels: sold?.map((item) => item.itemName) ?? [],
    datasets: [
      {
        label: "Sold",
        data: sold?.map((item) => item.quantitySold) ?? [],
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
        <h3 className="min-w-max text-xl font-semibold tracking-tight">Sold by:</h3>
        <Select onValueChange={setSelectedSoldBy} defaultValue={selectedSoldBy}>
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
