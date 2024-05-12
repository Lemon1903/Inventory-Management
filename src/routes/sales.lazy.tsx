import { createLazyFileRoute } from "@tanstack/react-router";

import SaleTable from "@/components/sales/SaleTable";

export const Route = createLazyFileRoute("/sales")({
  component: SaleTable,
});
