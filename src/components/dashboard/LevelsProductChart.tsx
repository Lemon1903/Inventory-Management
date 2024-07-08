import { useQuery } from "@tanstack/react-query";
import { ChartData, ChartOptions } from "chart.js";

import DoughnutChart from "@/components/shared/DoughnutChart";
import { fetchInventoryLvlProduct } from "@/lib/analytics-db";
import { generateRandomRGBColors } from "@/lib/utils";

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
