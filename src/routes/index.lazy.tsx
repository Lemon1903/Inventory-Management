import { createLazyFileRoute } from "@tanstack/react-router";

import Dashboard from "@/components/dashboard/Dashboard";

/** Represents a lazy-loaded route for the dashboard. */
export const Route = createLazyFileRoute("/")({
  component: Dashboard,
});
