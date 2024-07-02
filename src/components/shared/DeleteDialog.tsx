import { UseMutationResult } from "@tanstack/react-query";
import React, { Fragment, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

/**
 * Represents the props for the CustomAlertDialog component.
 *
 * @interface
 */
interface CustomAlertDialogProps {
  /** An array of numbers representing the items to be deleted. */
  toDelete: number[];

  /** The delete mutation function from the `useMutation` hook. */
  deleteMutation: UseMutationResult<void, Error, number[], unknown>;

  /** The trigger component that opens the delete dialog. */
  trigger?: React.ReactNode;

  /** A boolean value indicating whether the delete dialog is open. */
  open?: boolean;

  /**
   * A callback function that is called when the open state of the delete dialog changes.
   * @param isOpen - A boolean value indicating whether the delete dialog is open.
   */
  onOpenChange?: (isOpen: boolean) => void;
}

/**
 * A dialog component for deleting data.
 *
 * @component
 * @param {CustomAlertDialogProps} props - The component props.
 */
export default function DeleteDialog({
  trigger,
  toDelete,
  deleteMutation,
  open,
  onOpenChange,
}: CustomAlertDialogProps) {
  const { mutate, isPending } = deleteMutation;
  const [isOpen, setIsOpen] = useState(open ?? false);

  useEffect(() => {
    document.querySelectorAll("tr").forEach((row) => {
      row.setAttribute("data-disabled", String(open ?? isOpen));
    });
  }, [open, isOpen]);

  function handleDelete() {
    mutate(toDelete, { onSuccess: () => (onOpenChange ?? setIsOpen)(false) });
  }

  return (
    <Dialog open={open ?? isOpen} onOpenChange={onOpenChange ?? setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="mx-4 [&[data-close=hidden]>:last-child]:hidden" data-close="hidden">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete and remove the data from our servers
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {!isPending && (
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          )}
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? (
              <Fragment>
                Deleting... <Loader2 size={20} className="ml-2 animate-spin" />
              </Fragment>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
