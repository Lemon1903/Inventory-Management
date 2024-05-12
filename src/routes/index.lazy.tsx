import ItemTable from "@/components/items/ItemTable";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: ItemTable,
});
