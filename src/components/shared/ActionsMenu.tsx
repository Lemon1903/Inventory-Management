import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionMenuItemProps {
  name: string;
  icon: React.ReactNode;
  action?: () => void;
  dialog?: (open: boolean, onOpenChange: (isOpen: boolean) => void) => React.ReactElement;
}

interface ActionsMenuProps {
  items: ActionMenuItemProps[];
}

export default function ActionsMenu({ items }: ActionsMenuProps) {
  const [state, setState] = useState(() => {
    const initialState = items.reduce(
      (acc, item) => {
        if (item.dialog) {
          acc[item.name] = false;
        }
        return acc;
      },
      {} as { [key: string]: boolean },
    );
    return initialState;
  });

  function handleStateChange(name: string) {
    return (value: React.MouseEvent | boolean) => {
      setState((prev) => ({ ...prev, [name]: typeof value === "boolean" ? value : true }));
    };
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontal className="text-muted-foreground" size={18} />
        </Button>
      </DropdownMenuTrigger>

      {/* dropdown items */}
      <DropdownMenuContent align="end">
        {items.map(({ name, icon, action }) => (
          <DropdownMenuItem key={name} onClick={action ?? handleStateChange(name)}>
            {icon} <span>{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>

      {/* all the dialogs */}
      {items.map(
        ({ name, dialog }) => dialog && React.cloneElement(dialog(state[name], handleStateChange(name)), { key: name }),
      )}
    </DropdownMenu>
  );
}
