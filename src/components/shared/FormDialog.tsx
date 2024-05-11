import { createContext, useContext, useEffect, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ItemFormDialogProps {
  title: string;
  form: React.ReactNode;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const DialogContext = createContext<null | (() => void)>(null);

export function useCloseDialog() {
  const closeDialog = useContext(DialogContext);
  if (closeDialog === null) {
    throw new Error("useCloseForm must be used within a FormDialogProvider");
  }
  return closeDialog;
}

export default function FormDialog({ title, form, trigger, open, onOpenChange }: ItemFormDialogProps) {
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
