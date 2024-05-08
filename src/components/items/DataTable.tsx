import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ReactNode, useEffect, useState } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fuzzyFilter } from "@/lib/tableFns";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  sheet?: (selectedRow: TData | null, handleSelectedRow: (row: TData | null) => void) => ReactNode;
  header?: (table: ReturnType<typeof useReactTable>) => ReactNode;
  footer?: (table: ReturnType<typeof useReactTable>) => ReactNode;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize,
  sheet,
  header,
  footer,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: pageSize ?? 0 });
  const [selectedRow, setSelectedRow] = useState<TData | null>(null);

  useEffect(() => {
    if (!pageSize && data.length) {
      setPagination({ ...pagination, pageSize: data.length });
    }
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    globalFilterFn: fuzzyFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  function handleSelectedRow(row: TData | null) {
    setSelectedRow(row);
  }

  return (
    <>
      {header && header(table)}
      <ScrollArea className="rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 bg-background before:absolute before:bottom-0 before:h-px before:w-full before:bg-border before:content-['']">
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => setSelectedRow(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="h-14">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {sheet && sheet(selectedRow, handleSelectedRow)}
      {footer && footer(table)}
    </>
  );
}
