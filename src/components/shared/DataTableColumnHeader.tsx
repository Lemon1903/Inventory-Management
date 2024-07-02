import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { MoveDown, MoveUp } from "lucide-react";
import { Button } from "../ui/button";

/**
 * Represents the props for the DataTableColumnHeader component.
 *
 * @template TData - The type of data in the DataTable.
 * @template TValue - The type of value in the column.
 */
interface DataTableColumnHeaderProps<TData, TValue> {
  /** The column configuration for the DataTable. */
  column: Column<TData, TValue>;

  /** The title of the column. */
  title: string;

  /** Determines if the column header should be centered. */
  centered?: boolean;
}

/**
 * Renders a column header for a data table.
 *
 * @template TData - The type of data in the table.
 * @template TValue - The type of value in the column.
 * @param {DataTableColumnHeaderProps<TData, TValue>} props - The component props.
 */
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
