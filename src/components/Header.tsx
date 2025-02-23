
import { cn } from "@/lib/utils";
import { UserCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";

interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className="sticky h-16 top-0 left-0 right-0 px-4 bg-background/80 backdrop-blur-md border-b border-border z-20">
      <div
        className={cn(
          "max-w-[800px] px-3 mx-auto h-full flex items-center justify-end",
          className
        )}
      >
        <UserSelect />
      </div>
    </header>
  );
};

const UserSelect = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon">
        <UserCircle />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem asChild>
        <Link to="/talent/listings">Talent</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/cc">Content Creator</Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

