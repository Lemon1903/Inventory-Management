import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Grid2X2, HandCoins } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navs = [
  { to: "/", Icon: Grid2X2, label: "Products" },
  { to: "/sales", Icon: HandCoins, label: "Sales" },
];

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
