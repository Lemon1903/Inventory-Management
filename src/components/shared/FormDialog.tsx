import { createContext, useContext, useEffect, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

/**
 * Represents the props for the FormDialog component.
 *
 * @interface
 */
interface FormDialogProps {
  /** The title of the dialog. */
  title: string;

  /** The form component to be rendered inside the dialog. */
  form: React.ReactNode;

  /** The trigger component that opens the dialog. */
  trigger?: React.ReactNode;

  /** Specifies whether the dialog is open or not. */
  open?: boolean;

  /**
   * Callback function that is called when the open state of the dialog changes.
   * @param isOpen - Indicates whether the dialog is open or not.
   */
  onOpenChange?: (isOpen: boolean) => void;
}

const DialogContext = createContext<null | (() => void)>(null);

/**
 * Custom hook that returns the closeDialog function from the DialogContext.
 * Throws an error if used outside of a FormDialogProvider.
 *
 * @returns The closeDialog function from the DialogContext.
 * @throws Error if used outside of a FormDialogProvider.
 */
export function useCloseDialog() {
  const closeDialog = useContext(DialogContext);
  if (closeDialog === null) {
    throw new Error("useCloseForm must be used within a FormDialogProvider");
  }
  return closeDialog;
}

/**
 * Renders a form dialog component.
 *
 * @component
 * @param {FormDialogProps} props - The component props.
 */
export default function FormDialog({ title, form, trigger, open, onOpenChange }: FormDialogProps) {
  const [isOpen, setIsOpen] = useState(open ?? false);

  useEffect(() => {
    document.querySelectorAll("tr").forEach((row) => {
      row.setAttribute("data-disabled", String(open ?? isOpen));
    });
  }, [open, isOpen]);

  function closeDialog() {
    (onOpenChange ?? setIsOpen)(false);
  }

  return (
    <DialogContext.Provider value={closeDialog}>
      <Dialog open={open ?? isOpen} onOpenChange={onOpenChange ?? setIsOpen}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent className="max-sm:h-full max-sm:py-10 sm:max-w-[45%]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {form}
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
}
