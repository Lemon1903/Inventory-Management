/**
 * Program Title: CategoryTableHeader.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file is a component that renders the header of the category table.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide a header for the category table.
 * 
 * Data Structures used:
 * - Table<Category>: Manages rows, columns, global filters, and row selection.
 * - queryClient: Handles React Query caching and invalidation.
 * - toDelete: Array of selected category IDs (table.getSelectedRowModel().rows.map).
 * 
 * Algorithms used:
 * - Global Filtering: Updates globalFilter via table.setState and DebouncedInput.
 * - Row Selection: Toggles all rows via table.toggleAllRowsSelected.
 * - Delete Categories: Deletes selected categories with deleteCategories, invalidates cache, and resets selection.
 * 
 * Control:
 * - Search: Filters rows based on input.
 * - Add: Opens FormDialog with CategoryForm to add categories.
 * - Delete: Opens DeleteDialog and triggers deleteAllMutation.
 */


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table } from "@tanstack/react-table";
import { CopyCheck, Plus, Search, Trash2 } from "lucide-react";

import CategoryForm from "@/components/category/CategoryForm";
import DebouncedInput from "@/components/shared/DebouncedInput";
import DeleteDialog from "@/components/shared/DeleteDialog";
import FormDialog from "@/components/shared/FormDialog";
import { Button } from "@/components/ui/button";
import { deleteCategories } from "@/lib/categories-db";
import { cn } from "@/lib/utils";
import { Category } from "@/types";

/** Props for the CategoryTableHeader component. */
export interface CategoryTableHeaderProps {
  /** The table instance for the category. */
  table: Table<Category>;
}

/**
 * Renders the header of the category table.
 *
 * @param {CategoryTableHeaderProps} props - The component props.
 */
export default function CategoryTableHeader({ table }: CategoryTableHeaderProps) {
  const queryClient = useQueryClient();
  const deleteAllMutation = useMutation({
    mutationFn: deleteCategories,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [import.meta.env.VITE_QKEY_CATEGORY] });
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
          title="Add a new category"
          form={<CategoryForm />}
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
