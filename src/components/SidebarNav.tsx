/**
 * Program Title: SidebarNav.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file is a component that renders the sidebar navigation.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide a sidebar navigation for the application.
 * 
 * Data Structures used:
 * - navs array (stores navigation items with paths, icons, and labels).
 * 
 * Algorithms used:
 * - Iteration over the navs array using map for rendering navigation links.
 * - Conditional logic (isActive check) for applying styles to active navigation items.
 * 
 * Control:
 * - Event handling for navigation (TooltipTrigger, Link).
 * - Dynamic rendering of tooltips and buttons based on active state and navigation metadata.
 */


import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Grid2X2, HandCoins, Home, Layers3 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navs = [
  { to: "/", Icon: Home, label: "Dashboard" },
  { to: "/products", Icon: Grid2X2, label: "Products" },
  { to: "/sales", Icon: HandCoins, label: "Sales" },
  { to: "/category", Icon: Layers3, label: "Category" },
];

/** Sidebar navigation component. */
export default function SidebarNav() {
  return (
    <aside className="row-span-2 min-h-dvh border-r">
      <div className="grid size-16 place-items-center border-b">
        <Avatar className="size-11">
          <AvatarImage src="https://ui-avatars.com/api/?name=Khent+Alba" alt="avatar of the user" />
          <AvatarFallback>KA</AvatarFallback>
        </Avatar>
      </div>
      <nav className="grid justify-items-center gap-4 py-5">
        {navs.map(({ to, Icon, label }) => (
          <Link key={label} to={to}>
            {({ isActive }) => (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn("size-12", isActive && "bg-primary !text-primary-foreground hover:bg-primary/90")}
                    >
                      <Icon size={24} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">{label}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
