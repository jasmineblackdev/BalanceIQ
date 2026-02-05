import { useState } from "react";
import { Header } from "@/components/balanceiq/Header";
import { TabBar, TabId } from "@/components/balanceiq/TabBar";
import { ScoreCard } from "@/components/balanceiq/ScoreCard";
import { MoneyCard } from "@/components/balanceiq/MoneyCard";
import { BillCard } from "@/components/balanceiq/BillCard";
import { SmartTipCard } from "@/components/balanceiq/SmartTipCard";
import { ScoreBreakdownModal } from "@/components/balanceiq/ScoreBreakdownModal";
import { ChevronRight, Wallet } from "lucide-react";

// Mock data
const mockBills = [
  { id: 1, name: "Electric", amount: 89, dueDate: "Nov 10", category: "electric" as const },
  { id: 2, name: "Phone", amount: 65, dueDate: "Nov 12", category: "phone" as const },
  { id: 3, name: "Internet", amount: 79, dueDate: "Nov 15", category: "internet" as const },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

  const score = 68;
  const safeToSpend = 1247;
  const nextPaycheck = "Nov 15";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Scrollable Content */}
      <main className="px-5 pt-[calc(theme(spacing.safe-top)+theme(spacing.17))] pb-[calc(theme(spacing.20)+theme(spacing.safe-bottom)+theme(spacing.4))]">
        <div className="space-y-4">
          {/* Score Card */}
          <ScoreCard
            score={score}
            onClick={() => setIsScoreModalOpen(true)}
          />

          {/* Safe to Spend Card */}
          <MoneyCard
            title="Safe to Spend"
            amount={`$${safeToSpend.toLocaleString()}`}
            subtitle={`until ${nextPaycheck}`}
            variant="highlight"
            icon={<Wallet className="h-5 w-5" />}
          />

          {/* Upcoming Bills Section */}
          <div className="rounded-xl bg-card p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-h2 text-foreground">Upcoming Bills</h2>
            </div>
            <div className="space-y-2">
              {mockBills.map((bill) => (
                <BillCard
                  key={bill.id}
                  name={bill.name}
                  amount={bill.amount}
                  dueDate={bill.dueDate}
                  category={bill.category}
                />
              ))}
            </div>
            <button className="mt-4 flex items-center gap-1 text-body-sm font-medium text-primary hover:text-primary-dark transition-colors">
              View all
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Smart Tip */}
          <SmartTipCard
            tip="You could save $120/month by cutting your unused streaming subscriptions."
            action="See suggestion"
            onClick={() => {}}
          />
        </div>
      </main>

      {/* Tab Bar */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Score Breakdown Modal */}
      <ScoreBreakdownModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        totalScore={score}
        categories={[
          { name: "Budget Health", score: 20, maxScore: 25, icon: "📊" },
          { name: "Savings Rate", score: 15, maxScore: 25, icon: "💰" },
          { name: "Bill Management", score: 18, maxScore: 25, icon: "📋" },
          { name: "Investment Readiness", score: 15, maxScore: 25, icon: "📈" },
        ]}
      />
    </div>
  );
}
