import { useEffect, useState } from "react";

import { DataTable } from "@/components/items/DataTable";
import { Item, createFakeItems } from "@/lib/mock";
import { Table } from "@tanstack/react-table";
import { columns } from "./Columns";
import { DataTablePagination } from "./DataTablePagination";
import ItemPreviewSheet from "./ItemPreviewSheet";
import ItemTableHeader from "./ItemTableHeader";

export default function ItemTable() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    function getPayments() {
      setTimeout(() => {
        const items = createFakeItems(1_000);
        // console.log(items);
        setData(items);
      }, 2000);
    }

    getPayments();
  }, []);

  return (
    <div className="container grid gap-4 py-10 sm:max-h-dvh sm:grid-rows-[auto_1fr_auto]">
      <DataTable
        columns={columns}
        data={data}
        pageSize={10}
        sheet={(row, setRow) => <ItemPreviewSheet selectedRow={row} setSelectedRow={setRow} />}
        header={(table) => <ItemTableHeader table={table as Table<Item>} />}
        footer={(table) => <DataTablePagination table={table} />}
      />
    </div>
  );
}
