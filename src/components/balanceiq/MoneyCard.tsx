import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MoneyCardProps {
  title: string;
  amount: string;
  subtitle?: string;
  icon?: ReactNode;
  variant?: "default" | "highlight" | "score";
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export function MoneyCard({
  title,
  amount,
  subtitle,
  icon,
  variant = "default",
  className,
  onClick,
  children,
}: MoneyCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl bg-card p-5 shadow-card card-interactive",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-body-sm text-muted-foreground">{title}</p>
          <p
            className={cn(
              "mt-2 money-display",
              variant === "highlight" ? "text-number-lg text-primary" : "text-number-lg text-foreground"
            )}
          >
            {amount}
          </p>
          {subtitle && (
            <p className="mt-1 text-caption text-caption">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
            {icon}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
