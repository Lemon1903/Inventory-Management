/**
 * Program Title: index.lazy.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file contains the lazy-loaded route for the landing page
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this file is to provide a lazy-loaded route for the landing page.
 * 
 * Data Structures used:
 * - React Router: Used to create a lazy-loaded route for the landing page.
 * 
 * Algorithms used:
 * - Lazy Loading: The route is lazy-loaded using React Router's createLazyFileRoute function.
 */


import { createLazyFileRoute } from "@tanstack/react-router";

import Dashboard from "@/components/dashboard/Dashboard";

/** Represents a lazy-loaded route for the dashboard. */
export const Route = createLazyFileRoute("/")({
  component: Dashboard,
});
