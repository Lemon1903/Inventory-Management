/**
 * Array of column definitions for the sales table.
 * Each column definition specifies the properties of a column in the table.
 */
import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "@/components/shared/DataTableColumnHeader";
import { Sale } from "@/types";

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "id",
    size: 80,
    header: "ID",
  },
  {
    accessorKey: "product",
    size: 480,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product Name" />,
    cell: ({ row }) => row.original.product.name,
  },
  {
    accessorKey: "quantitySold",
    size: 100,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantities Sold" centered />,
    cell: ({ row }) => <div className="text-center">{row.original.quantitySold}</div>,
  },
  {
    accessorKey: "totalPrice",
    size: 100,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Price" />,
    cell: ({ row }) => {
      // Format the total as a philippine peso currency
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(row.original.totalPrice);

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
];
