/**
 * Program Title: Columns.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file contains the column definitions for the sale table.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this file is to define the columns for the sale table.
 * 
 * Data Structures:
 * - Sale: Represents a sale record with attributes like id, product, quantitySold, totalPrice, and dateAdded.
 * - columns: Array of ColumnDef<Sale> used by react-table to define the table's structure and how data is displayed.
 * 
 * Algorithms:
 * - Formatting: The totalPrice is formatted as currency (PHP), and the dateAdded is formatted as a short date
 * 
 * Control:
 * - Column Definitions: Defines table columns with custom rendering logic for headers (DataTableColumnHeader) and cells
 * - React Table: Uses accessorKey to map data keys to table columns and apply specific rendering logic for each column.
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
