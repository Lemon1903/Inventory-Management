import { createLazyFileRoute } from "@tanstack/react-router";

import ItemTable from "@/components/items/ItemTable";

/** Represents a lazy-loaded route for the "/products" path. */
export const Route = createLazyFileRoute("/products")({
  component: ItemTable,
});
