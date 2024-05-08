import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Item } from "@/lib/mock";
import { cn } from "@/lib/utils";

interface ItemPreviewSheetProps {
  selectedRow: Item | null;
  setSelectedRow: (value: Item | null) => void;
}

export default function ItemPreviewSheet({ selectedRow, setSelectedRow }: ItemPreviewSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsOpen(!!selectedRow);
    setIsImageLoaded(false);
  }, [selectedRow]);

  function closeSheet() {
    setIsOpen(false);
    setSelectedRow(null);
  }

  return (
    <ScrollArea
      className={cn(
        "inset-y-0 right-0 z-50 flex w-3/4 flex-col border-l-2 bg-background p-6 pt-14 transition ease-in-out contain-content sm:max-w-sm sm:px-6",
        isOpen ? "translate-x-0 duration-500" : "translate-x-full duration-300",
      )}
      style={{ position: "fixed" }}
    >
      <div>
        {!isImageLoaded && <Skeleton className="h-64 w-full" />}
        <img
          key={selectedRow?.id}
          src={selectedRow?.image}
          className={cn("rounded-md", !isImageLoaded && "hidden")}
          alt="the product image"
          onLoad={() => setIsImageLoaded(true)}
        />
        <h2 className="mt-4 scroll-m-4 text-3xl font-semibold tracking-tight first:mt-0">{selectedRow?.name}</h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {selectedRow?.description || "No description available."}
        </p>
        <p className="mt-6 text-lg">
          <span className="font-medium">Price:</span> ${selectedRow?.price.toFixed(2)}
        </p>
        <p className="text-lg">
          <span className="font-medium">Quantity:</span> {selectedRow?.quantity}
        </p>
        <p className="text-lg">
          <span className="font-medium">Category:</span> {selectedRow?.category}
        </p>
        <p className="text-lg">
          <span className="font-medium">Date Added:</span> {selectedRow?.dateAdded.toDateString()}
        </p>
        <p className="mt-auto pt-8 text-center text-sm text-muted-foreground">ID: {selectedRow?.id}</p>
        <p className="text-center text-sm text-muted-foreground">This is a preview of the selected item.</p>
        <Button
          variant="ghost"
          className="absolute right-4 top-4 size-8 rounded-full p-0 opacity-70"
          onClick={closeSheet}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </ScrollArea>
  );
}
