import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

interface HeaderProps {
  title?: string;
  variant?: "dashboard" | "standard" | "back";
  onBack?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
}

export function Header({
  title = "BalanceIQ",
  variant = "dashboard",
  onBack,
  rightAction,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 pt-safe-top",
        variant === "dashboard" ? "bg-background" : "bg-card border-b border-border",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-5",
          variant === "dashboard" ? "h-17" : "h-14"
        )}
      >
        {variant === "back" && onBack ? (
          <button
            onClick={onBack}
            className="flex h-11 w-11 items-center justify-center -ml-2 rounded-full hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </button>
        ) : (
          <h1
            className={cn(
              variant === "dashboard" ? "text-h1 text-foreground" : "text-h2 text-foreground"
            )}
          >
            {title}
          </h1>
        )}

        {variant === "back" && (
          <h1 className="absolute left-1/2 -translate-x-1/2 text-h2 text-foreground">
            {title}
          </h1>
        )}

        <div className="flex items-center">
          {rightAction || (
            variant === "dashboard" && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-body-sm font-semibold">
                JD
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
}
