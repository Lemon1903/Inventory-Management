import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table } from "@tanstack/react-table";
import { CopyCheck, Plus, Search, Trash2 } from "lucide-react";

import SaleForm from "@/components/sales/SaleForm";
import DebouncedInput from "@/components/shared/DebouncedInput";
import DeleteDialog from "@/components/shared/DeleteDialog";
import FormDialog from "@/components/shared/FormDialog";
import { Button } from "@/components/ui/button";
import { Sale, deleteSales } from "@/lib/mock";
import { cn } from "@/lib/utils";

interface SaleTableHeaderProps {
  table: Table<Sale>;
}

export default function SaleTableHeader({ table }: SaleTableHeaderProps) {
  const queryClient = useQueryClient();
  const deleteAllMutation = useMutation({
    mutationFn: deleteSales,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [import.meta.env.VITE_QKEY_SALES] });
      table.resetRowSelection();
    },
  });

  return (
    <div className="flex justify-between">
      <div className="relative h-10 w-1/3 min-w-40">
        <Search className="absolute inset-y-0 my-auto ml-3 text-muted-foreground" size={18} />
        <DebouncedInput
          initialValue={table.getState().globalFilter ?? ""}
          onChange={(value) => table.setState((prev) => ({ ...prev, globalFilter: String(value) }))}
        />
      </div>
      <div className="flex gap-2 sm:gap-4">
        <Button
          variant="outline"
          size="icon"
          className={cn(table.getIsAllRowsSelected() && "bg-primary !text-primary-foreground hover:bg-primary/90")}
          onClick={() => table.toggleAllRowsSelected()}
        >
          <CopyCheck size={20} />
        </Button>
        <FormDialog
          key="add-item"
          title="Add a new sale"
          form={<SaleForm />}
          trigger={
            <Button variant="outline" size="icon">
              <Plus size={20} />
            </Button>
          }
        />
        <DeleteDialog
          toDelete={table.getSelectedRowModel().rows.map((row) => row.original.id)}
          deleteMutation={deleteAllMutation}
          trigger={
            <Button variant="outline" size="icon" disabled={table.getSelectedRowModel().rows.length === 0}>
              <Trash2 size={20} />
            </Button>
          }
        />
      </div>
    </div>
  );
}
