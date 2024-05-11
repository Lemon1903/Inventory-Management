import { useQuery } from "@tanstack/react-query";
import { PaginationState, Table } from "@tanstack/react-table";
import { useState } from "react";

import { columns } from "@/components/items/Columns";
import ItemPreviewSheet from "@/components/items/ItemPreviewSheet";
import ItemTableHeader from "@/components/items/ItemTableHeader";
import { DataTable } from "@/components/shared/DataTable";
import { DataTablePagination } from "@/components/shared/DataTablePagination";
import { Item, fetchData } from "@/lib/mock";

const pageSize = 10;

export default function ItemTable() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize });
  const { data, status, error } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_ITEMS],
    queryFn: fetchData,
  });
  // console.log("data:", data, "\nstatus:", status, "\nerror:", error);

  return (
    <div className="container grid gap-4 py-10 sm:max-h-dvh sm:grid-rows-[auto_1fr_auto]">
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
    </div>
  );
}
