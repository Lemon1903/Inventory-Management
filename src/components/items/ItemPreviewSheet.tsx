/**
 * Program Title: ItemPreviewSheet.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file contains the item preview sheet for showing item details.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this file is to render a preview sheet for an item.
 * 
 * Data Structures:
 * - Item: Represents an item with attributes like id, name, description, img, unitPrice, quantity, category, and dateAdded.
 * - selectedRow: Holds the selected Item object to display its preview.
 * 
 * Algorithms:
 * - Conditional Rendering: Displays a loading skeleton until the image is loaded, then shows the image and item details.
 * - Image Load Handling: Tracks image loading state with isImageLoaded and toggles visibility accordingly.
 * - Close Logic: Closes the preview sheet when clicked outside the sheet or when the close button is pressed.
 * 
 * Control:
 * - State Management: Manages the open/close state (isOpen) of the preview sheet and the image load state (isImageLoaded).
 * - Effect Hook: Uses useEffect to update the preview state (isOpen) when the selectedRow changes.
 * - Event Handling: Handles blur events to close the sheet when focus is lost to a non-row element.
 */


import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Item } from "@/types";

/** Props for the ItemPreviewSheet component. */
export interface ItemPreviewSheetProps {
  /** The selected item to preview */
  selectedRow: Item | null;
  /** Handles changing the item to preview */
  setSelectedRow: (value: Item | null) => void;
}

/**
 * Renders a preview sheet for an item.
 *
 * @param {ItemPreviewSheetProps} props - The component props.
 * @param {Item} props.selectedRow - The selected item to display in the preview sheet.
 * @param {Function} props.setSelectedRow - A function to set the selected item.
 */
export default function ItemPreviewSheet({ selectedRow, setSelectedRow }: ItemPreviewSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(!!selectedRow);
    setIsImageLoaded(false);
    if (selectedRow) sheetRef.current?.focus();
  }, [selectedRow]);

  function closeSheet() {
    setIsOpen(false);
    setTimeout(() => setSelectedRow(null), 100);
  }

  function handleSheetBlur(e: React.FocusEvent) {
    const dataName = e.relatedTarget?.tagName;
    if (dataName !== "TR") closeSheet();
    else sheetRef.current?.focus();
  }

  return (
    <ScrollArea
      ref={sheetRef}
      tabIndex={-1}
      className={cn(
        "!fixed inset-y-0 right-0 z-50 w-3/4 border-l-2 bg-background p-6 pt-14 transition ease-in-out sm:max-w-sm sm:px-6",
        isOpen ? "translate-x-0 duration-500" : "translate-x-full duration-300",
      )}
      onBlur={handleSheetBlur}
    >
      <div className="flex h-full flex-col">
        {!isImageLoaded && <Skeleton className="h-40 w-full sm:h-64" />}
        <img
          key={selectedRow?.id}
          src={selectedRow?.img}
          className={cn("rounded-md", !isImageLoaded && "hidden")}
          alt="the product imgData"
          onLoad={() => setIsImageLoaded(true)}
        />
        <h2 className="mt-4 scroll-m-4 text-3xl font-semibold tracking-tight first:mt-0">{selectedRow?.name}</h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {selectedRow?.description || "No description available."}
        </p>
        <p className="mt-6 text-lg">
          <span className="font-medium">Price:</span> ${selectedRow?.unitPrice.toFixed(2)}
        </p>
        <p className="text-lg">
          <span className="font-medium">Quantity:</span> {selectedRow?.quantity}
        </p>
        <p className="text-lg">
          <span className="font-medium">Category:</span> {selectedRow?.category.name}
        </p>
        <p className="text-lg">
          <span className="font-medium">Date Added:</span>{" "}
          {selectedRow?.dateAdded && new Date(selectedRow.dateAdded).toDateString()}
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
