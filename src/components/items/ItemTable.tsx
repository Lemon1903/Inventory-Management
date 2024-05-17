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

export default function ItemTable() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const { data, status, error } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_ITEMS],
    queryFn: fetchItems,
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
      sheet={(row, setRow) => <ItemPreviewSheet selectedRow={row} setSelectedRow={setRow} />}
      header={(table) => <ItemTableHeader table={table as Table<Item>} />}
      footer={(table) => <DataTablePagination table={table} />}
    />
  );
}
