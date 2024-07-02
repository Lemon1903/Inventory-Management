import { useQuery } from "@tanstack/react-query";
import { PaginationState, Table } from "@tanstack/react-table";
import { useState } from "react";

import CategoryTableHeader from "@/components/category/CategoryTableHeader";
import { columns } from "@/components/category/Columns";
import { DataTable } from "@/components/shared/DataTable";
import { DataTablePagination } from "@/components/shared/DataTablePagination";
import { fetchCategories } from "@/lib/categories-db";
import { Category } from "@/types";

/**
 * Renders a table component for displaying categories.
 *
 * @component
 */
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
