import { createLazyFileRoute } from "@tanstack/react-router";

/** Represents a lazy-loaded route for the dashboard. */
export const Route = createLazyFileRoute("/")({
  component: () => <div>Dashboard</div>,
});
