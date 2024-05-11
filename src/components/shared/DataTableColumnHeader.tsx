import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { MoveDown, MoveUp } from "lucide-react";
import { Button } from "../ui/button";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  centered?: boolean;
}

export default function DataTableColumnHeader<TData, TValue>({
  column,
  centered = false,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return title;
  }

  return (
    <div className={cn(centered ? "flex justify-center" : "-mx-4")}>
      <Button variant="ghost" onClick={column.getToggleSortingHandler()}>
        {title}
        {column.getIsSorted() === "asc" ? (
          <MoveUp size={16} className={cn("ml-2", !column.getIsSorted() && "hidden")} />
        ) : (
          <MoveDown size={16} className={cn("ml-2", !column.getIsSorted() && "hidden")} />
        )}
      </Button>
    </div>
  );
}
