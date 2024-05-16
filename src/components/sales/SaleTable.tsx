import { useQuery } from "@tanstack/react-query";
import { PaginationState, Table } from "@tanstack/react-table";
import { useState } from "react";

import { columns } from "@/components/sales/Columns";
import SaleTableHeader from "@/components/sales/SaleTableHeader";
import { DataTable } from "@/components/shared/DataTable";
import { DataTablePagination } from "@/components/shared/DataTablePagination";
import { fetchSales } from "@/lib/mock";
import { Sale } from "@/types";

export default function SaleTable() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const { data, status, error } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_SALES],
    queryFn: fetchSales,
  });
  // console.log("data:", data, "\nstatus:", status, "\nerror:", error);

  return (
    <DataTable
      data={data ?? []}
      columns={columns}
      state={{ pagination }}
      status={status}
      error={error}
      onPaginationChange={setPagination}
      header={(table) => <SaleTableHeader table={table as Table<Sale>} />}
      footer={(table) => <DataTablePagination table={table} />}
    />
  );
}
