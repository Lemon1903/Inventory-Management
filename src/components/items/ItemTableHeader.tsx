import { Table } from "@tanstack/react-table";
import { FilePlus2, Search, SquarePen, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Item } from "@/lib/mock";
import DebouncedInput from "./DebouncedInput";

interface ItemTableHeaderProps {
  table: Table<Item>;
}

export default function ItemTableHeader({ table }: ItemTableHeaderProps) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <Button variant="outline" size="icon">
          <FilePlus2 className="text-muted-foreground" size={24} />
        </Button>
        <Button variant="outline" size="icon">
          <SquarePen className="text-muted-foreground" size={24} />
        </Button>
        <Button variant="outline" size="icon">
          <Trash2 className="text-muted-foreground" size={24} />
        </Button>
      </div>
      <div className="relative w-1/3">
        <Search className="absolute inset-y-0 my-auto ml-3 text-muted-foreground" size={18} />
        <DebouncedInput
          initialValue={table.getState().globalFilter ?? ""}
          onChange={(value) => table.setState((prev) => ({ ...prev, globalFilter: String(value) }))}
        />
      </div>
    </div>
  );
}
