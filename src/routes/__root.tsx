import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRoute } from "@tanstack/react-router";

import SidebarNav from "@/components/SidebarNav";
import ThemeProvider from "@/contexts/ThemeProvider";

export const Route = createRootRoute({
  component: Root,
});

const queryClient = new QueryClient();

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
          <SidebarNav />
          <header className="flex h-16 items-center border-b px-4">
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          </header>
          <Outlet />
        </div>
        {/* <TanStackRouterDevtools /> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
