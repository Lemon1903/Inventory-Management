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
