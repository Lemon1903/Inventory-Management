/**
 * Program Title: App.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file renders the main application
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this file is to load all the routes and render the main application
 */


import { routeTree } from "@/routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import Chart, { CategoryScale } from "chart.js/auto";

// Register charts
Chart.register(CategoryScale);

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

/** The root component of the application. */
export default function App() {
  return <RouterProvider router={router} />;
}
