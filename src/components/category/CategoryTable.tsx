/**
 * Program Title: CategoryTable.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file is a component that renders a table for displaying categories.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide a table for displaying categories.
 * 
 * Data Structures used:
 * - PaginationState (local state for pageIndex, pageSize).
 * - data (fetched categories array).
 * - columns (array defining table columns).
 * 
 * Algorithms used:
 * - Pagination: Tracks and updates page index/size via setPagination.
 * - Data Fetching: Uses useQuery to fetch categories from fetchCategories.
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

import CategoryTableHeader from "@/components/category/CategoryTableHeader";
import { columns } from "@/components/category/Columns";
import { DataTable } from "@/components/shared/DataTable";
import { DataTablePagination } from "@/components/shared/DataTablePagination";
import { fetchCategories } from "@/lib/categories-db";
import { Category } from "@/types";

/** Renders a table component for displaying categories. */
export default function CategoryTable() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const { data, status, error } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_CATEGORY],
    queryFn: fetchCategories,
  });

  return (
    <DataTable
      data={data ?? []}
      columns={columns}
      state={{ pagination }}
      status={status}
      error={error}
      onPaginationChange={setPagination}
      header={(table) => <CategoryTableHeader table={table as Table<Category>} />}
      footer={(table) => <DataTablePagination table={table} />}
    />
  );
}
