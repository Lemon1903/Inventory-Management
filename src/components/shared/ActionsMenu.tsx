/**
 * Program Title: ActionsMenu.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file is a component that renders a dropdown menu with actions.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide a dropdown menu with actions.
 * 
 * Data Structures used:
 * - items array (ActionMenuItemProps[]), state object (to track open states of dialogs)
 * 
 * Algorithms used:
 * - Initial state setup using reduce, state update on menu item click, conditional rendering of dialogs
 * 
 * Control:
 * - Event handling (onClick for menu items), state management (state updates for dialogs), 
 * conditional rendering (dialogs and menu items)
 */


import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** Represents the properties of an action menu item. */
export interface ActionMenuItemProps {
  /** The name of the action menu item. */
  name: string;

  /** The icon of the action menu item. */
  icon: React.ReactNode;

  /** The action to be performed when the action menu item is clicked. */
  action?: () => void;

  /**
   * The dialog component to be rendered when the action menu item is clicked.
   *
   * @param open - A boolean value indicating whether the dialog is open.
   * @param onOpenChange - A callback function to change the open state of the dialog.
   * @returns The React element representing the dialog component.
   */
  dialog?: (open: boolean, onOpenChange: (isOpen: boolean) => void) => React.ReactElement;
}

/** Represents the props for the ActionsMenu component. */
export interface ActionsMenuProps {
  /** An array of action menu items. */
  items: ActionMenuItemProps[];
}

/**
 * Renders a dropdown menu with actions.
 *
 * @param {ActionsMenuProps} props - The component props.
 */
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
