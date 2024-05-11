import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import React, { useState } from "react";

import ItemForm from "@/components/items/ItemForm";
import ActionsMenu from "@/components/shared/ActionsMenu";
import DataTableColumnHeader from "@/components/shared/DataTableColumnHeader";
import DeleteDialog from "@/components/shared/DeleteDialog";
import FormDialog from "@/components/shared/FormDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Item, deleteData } from "@/lib/mock";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Item>[] = [
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
    accessorKey: "image",
    size: 100,
    header: "Image",
    cell: ({ row }) => {
      const [isImageLoaded, setIsImageLoaded] = useState(false);
      const url = row.getValue("image") as string;

      return (
        <React.Fragment>
          {!isImageLoaded && <Skeleton className="aspect-square w-full" />}
          <img
            src={url}
            alt="Product"
            className={cn("aspect-square w-full rounded-md object-cover", !isImageLoaded && "hidden")}
            onLoad={() => setIsImageLoaded(true)}
          />
        </React.Fragment>
      );
    },
  },
  {
    accessorKey: "name",
    size: 280,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "quantity",
    size: 100,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
  },
  {
    accessorKey: "price",
    size: 100,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      // Format the price as a philippine peso currency
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount);

      return formatted;
    },
  },
  {
    accessorKey: "dateAdded",
    size: 120,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date-Added" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("dateAdded"));

      // Format the date as a short date
      const formatted = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(date);

      return formatted;
    },
  },
  {
    accessorKey: "category",
    size: 120,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" centered />,
    cell: ({ row }) => <div className="text-center">{row.original.category}</div>,
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
                title="Edit an item product"
                form={<ItemForm defaultValues={row.original} />}
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
                mutationFn: deleteData,
                onSuccess: async () => {
                  await queryClient.invalidateQueries({ queryKey: [import.meta.env.VITE_QKEY_ITEMS] });
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
