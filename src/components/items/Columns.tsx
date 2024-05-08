import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Item } from "@/lib/mock";
import DataTableColumnHeader from "./DataTableColumnHeader";

export const columns: ColumnDef<Item>[] = [
  {
    id: "select",
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
    size: 60,
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    // header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    size: 80,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    size: 280,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
    size: 120,
  },
  {
    accessorKey: "price",
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
    size: 120,
  },
  {
    accessorKey: "dateAdded",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date-Added" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("dateAdded"));

      // Format the date as a short date
      const formatted = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(date);

      return formatted;
    },
    size: 150,
  },
  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    size: 120,
  },
];
