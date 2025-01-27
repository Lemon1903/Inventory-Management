/**
 * Program Title: Dashboard.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file is a component that renders the dashboard for displaying analytics of products, sales, and categories.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide a dashboard for displaying analytics of products, sales, and categories.
 * 
 * Data Structures:
 * - Query Data: totalRevenue and totalItemsSold fetched using useQuery.
 * - Formatted Revenue: String formatted using Intl.NumberFormat for currency display.
 * 
 * Algorithms:
 * - Data Fetching: Retrieves totalRevenue and totalItemsSold using fetchTotalRevenue and fetchTotalProductsSold.
 * - Data Formatting: Formats revenue as currency using Intl.NumberFormat.
 * 
 * Control:
 * - Charts and Stats: Displays revenue, products sold, and charts (LevelsProductChart, LevelsCategoryChart).
 * - Layout Management: Uses a responsive grid to organize content and adjust based on screen size.
 */


import { useQuery } from "@tanstack/react-query";

import LevelsCategoryChart from "@/components/dashboard/LevelsCategoryChart";
import LevelsProductChart from "@/components/dashboard/LevelsProductChart";
import Revenue from "@/components/dashboard/Revenue";
import Sold from "@/components/dashboard/Sold";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchTotalProductsSold, fetchTotalRevenue } from "@/lib/analytics-db";

/** Renders the dashboard for displaying analytics of products, sales, and categories. */
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
