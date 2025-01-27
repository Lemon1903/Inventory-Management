/**
 * Program Title: DataTableColumnHeader.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file is a component that renders a column header for a data table.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide a column header for a data table.
 * 
 * Data Structures used:
 * - column (Object representing the column configuration, includes sorting capabilities and methods like getToggleSortingHandler and getIsSorted).
 * - title (String, stores the name/title of the column).
 * - centered (Boolean, determines if the column header is centered).
 * 
 * Algorithms used:
 * - Sorting: column.getToggleSortingHandler() toggles sorting (e.g., ascending, descending) on the column.
 * - Sorting State Check: column.getIsSorted() determines whether the column is sorted and in what direction ("asc" or "desc").
 * 
 * Control:
 *  - Conditional Rendering:
 *   -Displays sorting icons (MoveUp, MoveDown) based on the column's sorting state.
 *   - Centers the header text conditionally using the centered prop.
 *  - Event Handling:
 *   -Handles sorting via onClick={column.getToggleSortingHandler()}.
 */


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
export interface DataTableColumnHeaderProps<TData, TValue> {
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
