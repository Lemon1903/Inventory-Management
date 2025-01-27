/**
 * Program Title: __root.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file contains the root component of the application.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this file is to provide the root component of the application.
 * 
 * Data Structures used:
 * - React Context: Used in ThemeProvider for managing and providing the theme across the app.
 * - React Query QueryClient: A centralized client for managing server-state and caching.
 * - Route Tree: Created with createRootRoute, representing the hierarchical routing structure of the application.
 * 
 * Algorithms used:
 * - State Management:
 *   - React Query's QueryClient for caching and synchronizing server-side state.
 *   -Theme management logic through ThemeProvider (e.g., managing "dark" theme state).
 * - Routing Logic: React Router's hierarchical routing algorithm to determine which route components to render.
 * 
 * Control:
 * - Component Composition:Wrapper components like QueryClientProvider and ThemeProvider are used for 
 * injecting dependencies (query client and theme).
 * - Event-Driven UI Updates: Toaster component listens for toast events and renders notifications dynamically.
 * Outlet Control: React Router's <Outlet> determines which child route's UI should render based on the current route.
 */


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";

import SidebarNav from "@/components/SidebarNav";
import ThemeProvider from "@/contexts/ThemeProvider";

/**
 * Represents a route in the application.
 *
 * @remarks
 * This route is created using the `createRootRoute` function and is used to define root of every routes.
 *
 * @public
 */
export const Route = createRootRoute({
  component: Root,
});

const queryClient = new QueryClient();

/** Renders the root component of the application. */
function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
          <SidebarNav />
          <header className="flex h-16 items-center border-b px-4">
            <h1 className="text-3xl font-semibold tracking-tight">RIMS</h1>
          </header>
          <Outlet />
        </div>
        <Toaster richColors position="bottom-center" theme="dark" duration={1500} />
        {/* <TanStackRouterDevtools /> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
