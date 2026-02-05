import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/progress-bar";
import { X } from "lucide-react";

interface ScoreCategory {
  name: string;
  score: number;
  maxScore: number;
  icon: string;
}

interface ScoreBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalScore: number;
  categories: ScoreCategory[];
}

const defaultCategories: ScoreCategory[] = [
  { name: "Budget Health", score: 20, maxScore: 25, icon: "📊" },
  { name: "Savings Rate", score: 15, maxScore: 25, icon: "💰" },
  { name: "Bill Management", score: 18, maxScore: 25, icon: "📋" },
  { name: "Investment Readiness", score: 15, maxScore: 25, icon: "📈" },
];

export function ScoreBreakdownModal({
  isOpen,
  onClose,
  totalScore,
  categories = defaultCategories,
}: ScoreBreakdownModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 modal-slide-up">
        <div className="rounded-t-2xl bg-card shadow-modal">
          {/* Handle */}
          <div className="flex justify-center pt-3">
            <div className="h-1 w-10 rounded-full bg-muted" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>

          {/* Content */}
          <div className="p-5 pt-4 pb-8">
            <h2 className="text-h2 text-foreground">Your Score Breakdown</h2>
            
            <div className="mt-6 flex items-center justify-center">
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-primary">
                <span className="text-number-lg text-primary">{totalScore}</span>
                <span className="text-caption text-muted-foreground">/100</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {categories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-body text-foreground">{category.name}</span>
                    </div>
                    <span className="text-body-sm font-medium text-foreground">
                      {category.score}/{category.maxScore}
                    </span>
                  </div>
                  <ProgressBar
                    value={category.score}
                    max={category.maxScore}
                    className="h-2"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="mt-8 w-full rounded-lg bg-primary py-4 text-body font-semibold text-primary-foreground hover:bg-primary-dark active:scale-[0.98] transition-all"
            >
              Tap to see how to improve →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
