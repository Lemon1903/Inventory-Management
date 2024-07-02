import CategoryTable from "@/components/category/CategoryTable";
import { createLazyFileRoute } from "@tanstack/react-router";

/** Represents a lazy-loaded route for the "/category" path. */
export const Route = createLazyFileRoute("/category")({
  component: CategoryTable,
});
