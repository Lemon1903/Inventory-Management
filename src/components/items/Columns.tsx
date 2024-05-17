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
import { deleteItems } from "@/lib/items-db";
import { cn } from "@/lib/utils";
import { Item } from "@/types";

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
    accessorKey: "imgData",
    size: 100,
    header: "Image",
    cell: ({ row }) => {
      const [isImageLoaded, setIsImageLoaded] = useState(false);
      const url = row.getValue("imgData") as string;

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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" centered />,
    cell: ({ row }) => <div className="text-center">{row.original.quantity}</div>,
  },
  {
    accessorKey: "unitPrice",
    size: 100,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => {
      // Format the unitPrice as a philippine peso currency
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(row.original.unitPrice);

      return formatted;
    },
  },
  {
    accessorKey: "dateAdded",
    size: 100,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date-Added" />,
    cell: ({ row }) => {
      // Format the date as a short date
      const formatted = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(new Date(row.original.dateAdded));

      return formatted;
    },
  },
  {
    accessorKey: "category",
    size: 100,
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
                mutationFn: deleteItems,
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
