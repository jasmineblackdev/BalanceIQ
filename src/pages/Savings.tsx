import { useState } from "react";
import { Header } from "@/components/balanceiq/Header";
import { TabBar, TabId } from "@/components/balanceiq/TabBar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { AddGoalModal } from "@/components/balanceiq/AddGoalModal";
import { Plus, Target, TrendingUp, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SavingsGoal {
  id: number;
  name: string;
  target: number;
  current: number;
  icon: string;
  color: string;
}

const mockGoals: SavingsGoal[] = [
  { id: 1, name: "Emergency Fund", target: 10000, current: 4500, icon: "🛡️", color: "primary" },
  { id: 2, name: "Vacation", target: 3000, current: 1200, icon: "✈️", color: "primary" },
  { id: 3, name: "New Laptop", target: 1500, current: 800, icon: "💻", color: "primary" },
  { id: 4, name: "Car Down Payment", target: 5000, current: 750, icon: "🚗", color: "primary" },
];

function GoalCard({ goal }: { goal: SavingsGoal }) {
  const progress = (goal.current / goal.target) * 100;
  const remaining = goal.target - goal.current;

  return (
    <div className="rounded-xl bg-card p-5 shadow-card card-interactive cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-2xl">
          {goal.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-body font-semibold text-foreground">{goal.name}</h3>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-number-md text-primary money-display">
              ${goal.current.toLocaleString()}
            </span>
            <span className="text-body-sm text-muted-foreground">
              / ${goal.target.toLocaleString()}
            </span>
          </div>
          <div className="mt-3">
            <ProgressBar value={goal.current} max={goal.target} />
          </div>
          <p className="mt-2 text-caption text-muted-foreground">
            ${remaining.toLocaleString()} to go
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Savings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("savings");
  const [showAddGoal, setShowAddGoal] = useState(false);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    if (tab === "home") navigate("/dashboard");
    if (tab === "bills") navigate("/bills");
    if (tab === "advisor") navigate("/advisor");
    if (tab === "more") navigate("/settings");
  };

  const totalSaved = mockGoals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTarget = mockGoals.reduce((sum, goal) => sum + goal.target, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Savings"
        variant="standard"
        rightAction={
          <button
            onClick={() => setShowAddGoal(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary-dark transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        }
      />

      <main className="px-5 pt-[calc(theme(spacing.safe-top)+theme(spacing.14)+0.5rem)] pb-[calc(theme(spacing.20)+theme(spacing.safe-bottom)+theme(spacing.4))]">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
            </div>
            <p className="text-caption text-muted-foreground">Total Saved</p>
            <p className="text-number-md text-primary money-display mt-1">
              ${totalSaved.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <Target className="h-4 w-4 text-primary" />
              </div>
            </div>
            <p className="text-caption text-muted-foreground">Total Goals</p>
            <p className="text-number-md text-foreground money-display mt-1">
              ${totalTarget.toLocaleString()}
            </p>
          </div>
        </div>

        {/* AI Suggestion */}
        <div className="rounded-xl bg-secondary p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-body-sm font-medium text-secondary-foreground">
                You can reach your Emergency Fund goal 2 months faster!
              </p>
              <p className="mt-1 text-caption text-secondary-foreground/70">
                Save an extra $50/paycheck to hit your target by March.
              </p>
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-h2 text-foreground">Your Goals</h2>
          <span className="text-body-sm text-muted-foreground">{mockGoals.length} active</span>
        </div>

        <div className="space-y-3">
          {mockGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>

        {/* Add Goal Button */}
        <button
          onClick={() => setShowAddGoal(true)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/30 bg-accent py-4 text-body font-medium text-primary hover:border-primary hover:bg-accent/80 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Create New Goal
        </button>
      </main>

      <AddGoalModal open={showAddGoal} onClose={() => setShowAddGoal(false)} />
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
