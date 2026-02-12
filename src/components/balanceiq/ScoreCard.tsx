import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/progress-bar";
import { HelpCircle } from "lucide-react";

interface ScoreCardProps {
  score: number;
  maxScore?: number;
  className?: string;
  onClick?: () => void;
}

export function ScoreCard({
  score,
  maxScore = 100,
  className,
  onClick,
}: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl bg-card p-5 shadow-card card-interactive",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-body-sm text-muted-foreground">Your Financial Health</p>
        {onClick && (
          <button className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors">
            <HelpCircle className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className={cn("text-number-lg money-display", getScoreColor(score))}>
          {score}
        </span>
        <span className="text-body-sm text-muted-foreground">/ {maxScore}</span>
        <span className={cn("ml-auto text-body-sm font-medium", getScoreColor(score))}>
          {score >= 80 ? "Looking great! 🎉" : score >= 60 ? "Getting there! 💪" : score >= 40 ? "Room to grow 🌱" : "Let's work on this 💛"}
        </span>
      </div>
      <div className="mt-3">
        <ProgressBar value={score} max={maxScore} />
      </div>
    </div>
  );
}
