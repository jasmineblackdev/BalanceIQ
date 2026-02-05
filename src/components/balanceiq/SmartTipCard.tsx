import { cn } from "@/lib/utils";
import { Lightbulb, ChevronRight } from "lucide-react";

interface SmartTipCardProps {
  tip: string;
  action?: string;
  className?: string;
  onClick?: () => void;
}

export function SmartTipCard({
  tip,
  action = "Learn more",
  className,
  onClick,
}: SmartTipCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl bg-card p-5 shadow-card card-interactive",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
          <span className="text-lg">💡</span>
        </div>
        <div className="flex-1">
          <p className="text-body-sm text-muted-foreground">Smart Tip</p>
          <p className="mt-1 text-body text-foreground">{tip}</p>
          {onClick && (
            <button className="mt-2 flex items-center gap-1 text-body-sm font-medium text-primary hover:text-primary-dark transition-colors">
              {action}
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
