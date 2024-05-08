import ItemTable from "@/components/items/ItemTable";
import ThemeProvider from "./contexts/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <ItemTable />
    </ThemeProvider>
  );
}
