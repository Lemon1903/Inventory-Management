import { useQuery } from "@tanstack/react-query";

import LevelsCategoryChart from "@/components/dashboard/LevelsCategoryChart";
import LevelsProductChart from "@/components/dashboard/LevelsProductChart";
import Revenue from "@/components/dashboard/Revenue";
import Sold from "@/components/dashboard/Sold";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchTotalProductsSold, fetchTotalRevenue } from "@/lib/analytics-db";

export default function Dashboard() {
  const { data: totalRevenue } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_REVENUE],
    queryFn: fetchTotalRevenue,
  });

  const { data: totalItemsSold } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_TOTAL_ITEMS_SOLD],
    queryFn: fetchTotalProductsSold,
  });

  const formattedTotalRevenue = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(totalRevenue ?? 0);

  return (
    <ScrollArea className="p-4">
      <div className="grid h-[calc(100vh-6rem)] gap-4 lg:grid-cols-2">
        <div className="grid gap-4 lg:grid-rows-[1fr_auto_1fr]">
          <h3 className="grid place-items-center content-center gap-2 rounded-md border p-4 text-center text-xl font-semibold tracking-tight">
            Total Revenue Earned
            <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">{formattedTotalRevenue}</span>
          </h3>
          <div className="grid max-w-full gap-4 sm:grid-cols-2">
            <LevelsProductChart />
            <LevelsCategoryChart />
          </div>
          <h3 className="grid place-items-center content-center gap-2 rounded-md border p-4 text-center text-xl font-semibold tracking-tight">
            Total Products Sold
            <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">{totalItemsSold}</span>
          </h3>
        </div>
        <div className="grid max-w-full gap-4 lg:grid-rows-2">
          <Revenue />
          <Sold />
        </div>
      </div>
    </ScrollArea>
  );
}
