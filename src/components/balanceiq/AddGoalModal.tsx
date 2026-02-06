import { useState } from "react";
import { X } from "lucide-react";

interface AddGoalModalProps {
  open: boolean;
  onClose: () => void;
}

const goalIcons = [
  { value: "🛡️", label: "Emergency" },
  { value: "✈️", label: "Travel" },
  { value: "💻", label: "Tech" },
  { value: "🚗", label: "Car" },
  { value: "🏠", label: "Home" },
  { value: "📚", label: "Education" },
  { value: "💍", label: "Wedding" },
  { value: "🎉", label: "Event" },
  { value: "💰", label: "General" },
  { value: "🏋️", label: "Health" },
];

export function AddGoalModal({ open, onClose }: AddGoalModalProps) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [icon, setIcon] = useState("💰");
  const [deadline, setDeadline] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");

  if (!open) return null;

  const targetNum = parseFloat(target) || 0;
  const monthlyNum = parseFloat(monthlyContribution) || 0;
  const monthsToGoal = monthlyNum > 0 ? Math.ceil(targetNum / monthlyNum) : 0;

  const handleSave = () => {
    setName("");
    setTarget("");
    setIcon("💰");
    setDeadline("");
    setMonthlyContribution("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-t-3xl bg-card p-6 modal-slide-up" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted" />
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-h2 text-foreground">Create Savings Goal</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Icon Picker */}
          <div>
            <label className="text-body-sm font-medium text-foreground mb-1.5 block">Choose an Icon</label>
            <div className="flex flex-wrap gap-2">
              {goalIcons.map((gi) => (
                <button
                  key={gi.value}
                  onClick={() => setIcon(gi.value)}
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-all ${
                    icon === gi.value ? "bg-primary/20 ring-2 ring-primary" : "bg-accent hover:bg-accent/80"
                  }`}
                >
                  {gi.value}
                </button>
              ))}
            </div>
          </div>

          {/* Goal Name */}
          <div>
            <label className="text-body-sm font-medium text-foreground mb-1.5 block">Goal Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Emergency Fund"
              className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Target Amount */}
          <div>
            <label className="text-body-sm font-medium text-foreground mb-1.5 block">Target Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body font-medium text-muted-foreground">$</span>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="10,000"
                className="w-full rounded-xl border border-border bg-background pl-8 pr-4 py-3.5 text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Monthly Contribution */}
          <div>
            <label className="text-body-sm font-medium text-foreground mb-1.5 block">Monthly Contribution</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body font-medium text-muted-foreground">$</span>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                placeholder="200"
                className="w-full rounded-xl border border-border bg-background pl-8 pr-4 py-3.5 text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            {monthsToGoal > 0 && (
              <p className="mt-1.5 text-caption text-primary">
                You'll reach your goal in ~{monthsToGoal} month{monthsToGoal !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Target Date */}
          <div>
            <label className="text-body-sm font-medium text-foreground mb-1.5 block">Target Date (optional)</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={!name || !target}
          className="mt-6 w-full rounded-xl bg-primary py-4 text-body font-semibold text-primary-foreground hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
        >
          Create Goal
        </button>
      </div>
    </div>
  );
}
