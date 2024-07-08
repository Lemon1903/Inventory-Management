import { useQuery } from "@tanstack/react-query";
import { ChartData, ChartOptions } from "chart.js";
import { useMemo, useState } from "react";

import BarChart from "@/components/shared/BarChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchRevenueByCategory, fetchRevenueByProduct } from "@/lib/analytics-db";
import { generateRandomRGBColors } from "@/lib/utils";

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
