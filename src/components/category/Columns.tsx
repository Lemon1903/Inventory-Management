/**
 * Array of column definitions for the category table.
 * Each column definition specifies the properties of a column in the table.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";

import CategoryForm from "@/components/category/CategoryForm";
import ActionsMenu from "@/components/shared/ActionsMenu";
import DataTableColumnHeader from "@/components/shared/DataTableColumnHeader";
import DeleteDialog from "@/components/shared/DeleteDialog";
import FormDialog from "@/components/shared/FormDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteCategories } from "@/lib/categories-db";
import { Category } from "@/types";

export const columns: ColumnDef<Category>[] = [
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
    header: "ID",
  },
  {
    accessorKey: "name",
    size: 1000,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
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
                title="Edit a category"
                form={<CategoryForm defaultValues={row.original} />}
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
                mutationFn: deleteCategories,
                onSuccess: async () => {
                  await queryClient.invalidateQueries({ queryKey: [import.meta.env.VITE_QKEY_CATEGORY] });
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
