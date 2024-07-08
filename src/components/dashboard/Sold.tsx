import { useQuery } from "@tanstack/react-query";
import { ChartData, ChartOptions } from "chart.js";
import { useMemo, useState } from "react";

import BarChart from "@/components/shared/BarChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchSoldByCategory, fetchSoldByProduct } from "@/lib/analytics-db";
import { generateRandomRGBColors } from "@/lib/utils";

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
