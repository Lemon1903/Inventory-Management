import {
  Table as TableCore,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fuzzyFilter } from "@/lib/tableFns";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Represents the props for the DataTable component.
 *
 * @template TData - The type of data in the table.
 */
interface DataTableProps<TData> extends Omit<TableOptions<TData>, "getCoreRowModel"> {
  /** The status of the data table. Can be one of "error", "success", or "pending". */
  status?: "error" | "success" | "pending";

  /** The error object associated with the data table. */
  error?: Error | null;

  /**
   * The sheet component to render for each selected row.
   *
   * @param selectedRow - The currently selected row.
   * @param handleSelectedRow - A function to handle the selection of a row.
   * @returns The ReactNode representing the sheet component.
   */
  sheet?: (selectedRow: TData | null, handleSelectedRow: (row: TData | null) => void) => ReactNode;

  /**
   * The header component to render for the data table.
   *
   * @param table - The table core object.
   * @returns The ReactNode representing the header component.
   */
  header?: (table: TableCore<TData>) => ReactNode;

  /**
   * The footer component to render for the data table.
   *
   * @param table - The table core object.
   * @returns The ReactNode representing the footer component.
   */
  footer?: (table: TableCore<TData>) => ReactNode;
}

/**
 * Renders a data table component.
 *
 * @template TData - The type of data in the table.
 * @param {DataTableProps<TData>} props - The props for the DataTable component.
 */
export function DataTable<TData>({ columns, status, error, sheet, header, footer, ...props }: DataTableProps<TData>) {
  const queryClient = useQueryClient();
  const [selectedRow, setSelectedRow] = useState<TData | null>(null);

  const table = useReactTable({
    ...props,
    columns,
    globalFilterFn: props.globalFilterFn ?? fuzzyFilter,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: !props.manualPagination ? getPaginationRowModel() : undefined,
  });

  function handleRowClick(row: TData) {
    return (e: React.MouseEvent) => {
      const nextSelected = e.currentTarget;
      if (nextSelected.getAttribute("data-disabled") !== "true") {
        nextSelected.scrollIntoView({ behavior: "smooth", block: "center" });
        setSelectedRow(row);
      }
    };
  }

  return (
    <div className="grid max-h-[calc(100vh-4rem)] content-start gap-4 p-4">
      {header && header(table)}
      <ScrollArea className="rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background before:absolute before:bottom-0 before:h-px before:w-full before:bg-border before:content-['']">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="border-none hover:bg-transparent" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{ width: `${header.getSize()}px` }}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {status === "pending" ? (
              // Show skeleton when data is still loading
              Array.from({ length: 10 }, (_, index) => (
                <TableRow key={index}>
                  {columns.map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : status === "error" ? (
              // Show error message when data fetching failed
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="h-52">
                  <div className="grid place-items-center content-center">
                    <h3 className="text-center text-2xl font-semibold tracking-tight">Error: {error?.message}</h3>
                    <p className="mb-6 mt-2 text-center text-muted-foreground">
                      An error has occured while fetching the data.
                    </p>
                    <Button
                      size="sm"
                      className="mx-auto w-24"
                      onClick={() => queryClient.invalidateQueries({ queryKey: [import.meta.env.VITE_QKEY_ITEMS] })}
                    >
                      Retry
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              // Show data rows when data is loaded
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  tabIndex={-1}
                  className={cn("cursor-pointer", selectedRow === row.original && "bg-muted/50")}
                  data-state={row.getIsSelected() && "selected"}
                  data-row={`${JSON.stringify(row.original)}`}
                  data-disabled="false"
                  onClick={handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="h-14">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Show no results when data is empty
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="h-52 text-center">
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {sheet && sheet(selectedRow, setSelectedRow)}
      {footer && footer(table)}
    </div>
  );
}
