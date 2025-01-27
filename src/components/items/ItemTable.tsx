/**
 * Program Title: ItemTable.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file is a component that renders a table for displaying items.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide a table for displaying items.
 * 
 * Data Structures used:
 * - PaginationState (local state for pageIndex, pageSize).
 * - data (fetched items array).
 * - columns (array defining table columns).
 * 
 * Algorithms used:
 * - Pagination: Tracks and updates page index/size via setPagination.
 * - Data Fetching: Uses useQuery to fetch items from fetchItems.
 * - Error Handling: Displays error message if useQuery fails.
 * 
 * Control:
 * - Renders a paginated DataTable component.
 * - CategoryTableHeader and DataTablePagination control table header/footer behavior.
 * - State management for pagination via useState.
 */


import { useQuery } from "@tanstack/react-query";
import { PaginationState, Table } from "@tanstack/react-table";
import { useState } from "react";

import { columns } from "@/components/items/Columns";
import ItemPreviewSheet from "@/components/items/ItemPreviewSheet";
import ItemTableHeader from "@/components/items/ItemTableHeader";
import { DataTable } from "@/components/shared/DataTable";
import { DataTablePagination } from "@/components/shared/DataTablePagination";
import { fetchItems } from "@/lib/items-db";
import { Item } from "@/types";

/** Renders a table component for displaying items. */
export default function ItemTable() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const { data, status, error } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_ITEMS],
    queryFn: fetchItems,
  });

  return (
    <DataTable
      data={data ?? []}
      columns={columns}
      state={{ pagination }}
      status={status}
      error={error}
      onPaginationChange={setPagination}
      sheet={(row, setRow) => <ItemPreviewSheet selectedRow={row} setSelectedRow={setRow} />}
      header={(table) => <ItemTableHeader table={table as Table<Item>} />}
      footer={(table) => <DataTablePagination table={table} />}
    />
  );
}
