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
  isWhiteBg?: boolean;
}

export const Header = ({
  children = <div />,
  className,
  isWhiteBg = false,
}: HeaderProps) => {
  return (
    <header className={cn(
      "sticky h-16 top-0 left-0 right-0 px-4 backdrop-blur-md border-b border-gray-500/20 z-20",
      isWhiteBg ? "bg-white/80" : "bg-green-50/80"
    )}>
      <div
        className={cn(
          "max-w-[800px] px-3 mx-auto h-full flex items-center justify-between",
          className
        )}
      >
        {children}
        <UserSelect />
      </div>
    </header>
  );
};

export const GenericHeaderContents = () => (
  <div className="flex h-full items-center gap-3">
    <h1 className="text-xl font-semibold">Casting Session</h1>
    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
  </div>
);

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
