import { useState } from "react";
import { Header } from "@/components/balanceiq/Header";
import { useNavigate } from "react-router-dom";

interface NotifSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function Notifications() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<NotifSetting[]>([
    { id: "bill-reminders", label: "Bill Reminders", description: "Get notified 3 days before bills are due", enabled: true },
    { id: "payment-confirm", label: "Payment Confirmations", description: "Confirm when bills are paid", enabled: true },
    { id: "savings-milestones", label: "Savings Milestones", description: "Celebrate when you hit savings goals", enabled: true },
    { id: "smart-tips", label: "Smart Tips", description: "AI-powered money-saving suggestions", enabled: true },
    { id: "weekly-summary", label: "Weekly Summary", description: "Your spending and savings recap", enabled: false },
    { id: "budget-alerts", label: "Budget Alerts", description: "Alert when spending exceeds limits", enabled: true },
    { id: "promo", label: "Promotions", description: "New features and special offers", enabled: false },
  ]);

  const toggle = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Notifications" variant="back" onBack={() => navigate("/settings")} />

      <main className="px-5 pt-[calc(theme(spacing.safe-top)+theme(spacing.14)+0.5rem)] pb-8">
        <div className="rounded-xl bg-card shadow-card overflow-hidden">
          {settings.map((s, index) => (
            <div
              key={s.id}
              className={`flex items-center gap-4 px-4 py-4 ${
                index < settings.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex-1">
                <p className="text-body font-medium text-foreground">{s.label}</p>
                <p className="text-caption text-muted-foreground">{s.description}</p>
              </div>
              <button
                onClick={() => toggle(s.id)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                  s.enabled ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    s.enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
