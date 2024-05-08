import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { MoveDown, MoveUp } from "lucide-react";
import { Button } from "../ui/button";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title?: string;
}

export default function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return title;
  }

  return (
    <Button variant="ghost" className="-mx-4" onClick={column.getToggleSortingHandler()}>
      {title}
      {column.getIsSorted() &&
        (column.getIsSorted() === "asc" ? (
          <MoveUp size={16} className={cn("ml-2", !column.getIsSorted() && "opacity-0")} />
        ) : (
          <MoveDown size={16} className={cn("ml-2", !column.getIsSorted() && "opacity-0")} />
        ))}
    </Button>
  );
}
