/**
 * Program Title: SaleTableHeader.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This component is a header for the sale table.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide a header for the sale table.
 * 
 * Data Structures used:
 * - table instance (Table<Sale>), globalFilter state, Sale type
 * 
 * Algorithms used:
 * - Debounced input handling, state update for global filter, form dialog handling
 * 
 * Control:
 * - Event handling (onChange for input, trigger for form dialog), state management, conditional rendering
 */


import { Table } from "@tanstack/react-table";
import { Plus, Search } from "lucide-react";

import SaleForm from "@/components/sales/SaleForm";
import DebouncedInput from "@/components/shared/DebouncedInput";
import FormDialog from "@/components/shared/FormDialog";
import { Button } from "@/components/ui/button";
import { Sale } from "@/types";

/** Props for the SaleTableHeader component. */
export interface SaleTableHeaderProps {
  /** The table instance for the sale. */
  table: Table<Sale>;
}

/**
 * Renders the header of the sales table.
 *
 * @param {SaleTableHeaderProps} props - The component props.
 */
export default function SaleTableHeader({ table }: SaleTableHeaderProps) {
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
        <FormDialog
          title="Add a new sale"
          form={<SaleForm />}
          trigger={
            <Button variant="outline" size="icon">
              <Plus size={20} />
            </Button>
          }
        />
      </div>
    </div>
  );
}
