import { createLazyFileRoute } from "@tanstack/react-router";

import SaleTable from "@/components/sales/SaleTable";

/** Represents a lazy-loaded route for the "/sales" path. */
export const Route = createLazyFileRoute("/sales")({
  component: SaleTable,
});
