import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";

import SaleForm from "@/components/sales/SaleForm";
import ActionsMenu from "@/components/shared/ActionsMenu";
import DataTableColumnHeader from "@/components/shared/DataTableColumnHeader";
import DeleteDialog from "@/components/shared/DeleteDialog";
import FormDialog from "@/components/shared/FormDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Sale, deleteSales } from "@/lib/mock";

export const columns: ColumnDef<Sale>[] = [
  {
    id: "select",
    size: 60,
    enableSorting: false,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    size: 80,
    header: "ID",
  },
  {
    accessorKey: "name",
    size: 280,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "sold",
    size: 100,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sold" centered />,
    cell: ({ row }) => <div className="text-center">{row.original.sold}</div>,
  },
  {
    accessorKey: "total",
    size: 100,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => {
      // Format the total as a philippine peso currency
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(row.original.total);

      return formatted;
    },
  },
  {
    accessorKey: "dateAdded",
    size: 120,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date-Added" />,
    cell: ({ row }) => {
      // Format the date as a short date
      const formatted = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(row.original.dateAdded);

      return formatted;
    },
  },
  {
    id: "actions",
    size: 60,
    cell: ({ row }) => (
      <ActionsMenu
        items={[
          {
            name: "Edit",
            icon: <Edit className="mr-2 size-4" />,
            dialog: (open, onOpenChange) => (
              <FormDialog
                title="Edit a sale"
                form={<SaleForm defaultValues={row.original} />}
                open={open}
                onOpenChange={onOpenChange}
              />
            ),
          },
          {
            name: "Delete",
            icon: <Trash className="mr-2 size-4" />,
            dialog: (open, onOpenChange) => {
              const queryClient = useQueryClient();
              const deleteMutation = useMutation({
                mutationFn: deleteSales,
                onSuccess: async () => {
                  await queryClient.invalidateQueries({ queryKey: [import.meta.env.VITE_QKEY_SALES] });
                  onOpenChange(false);
                },
              });

              return (
                <DeleteDialog
                  toDelete={[row.original.id]}
                  deleteMutation={deleteMutation}
                  open={open}
                  onOpenChange={onOpenChange}
                />
              );
            },
          },
        ]}
      />
    ),
  },
];
