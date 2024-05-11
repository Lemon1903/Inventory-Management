import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ItemTable from "@/components/items/ItemTable";
import ThemeProvider from "@/contexts/ThemeProvider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <ItemTable />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
