import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

/**
 * Represents the props for the DataTablePagination component.
 *
 * @template TData - The type of data in the table.
 */
interface DataTablePaginationProps<TData> {
  /** The table instance. */
  table: Table<TData>;
}

/**
 * Renders a pagination component for a data table.
 *
 * @template TData - The type of data in the table.
 * @param {DataTablePaginationProps<TData>} props - The component props.
 */
export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const [value, setValue] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  function onPageIndexChange(e: React.ChangeEvent<HTMLInputElement>) {
    let page = e.target.value ? Number(e.target.value) - 1 : 0;

    const maxPage = table.getPageCount() - 1;
    if (page > maxPage) {
      page = maxPage;
      setValue(maxPage + 1);
    }

    if (value === 0 && e.target.value !== "") {
      inputRef.current!.value = String(page + 1);
    }

    setValue(e.target.value ? page + 1 : 0);
    table.setPageIndex(page);
  }

  return (
    <div className="grid items-center justify-items-center gap-y-2 px-2 sm:flex sm:justify-between">
      <div className="mr-4 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center justify-center gap-2 max-sm:flex-wrap lg:gap-6">
        <div className="flex w-full items-center justify-center gap-2 text-sm font-medium">
          Go to page:
          <Input
            ref={inputRef}
            type="number"
            min={1}
            max={table.getPageCount()}
            value={value}
            className="w-24"
            onChange={onPageIndexChange}
          />
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 lg:size-10"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 lg:size-10"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft size={24} />
          </Button>
          <div className="w-32 text-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + (table.getPageCount() ? 1 : 0)} of {table.getPageCount()}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 lg:size-10"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 lg:size-10"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
}
