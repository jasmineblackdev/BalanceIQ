import { Header } from "@/components/balanceiq/Header";
import { Check, Crown, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["Track up to 5 bills", "1 savings goal", "Basic insights", "Manual entry only"],
    current: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9.99",
    period: "/month",
    features: [
      "Unlimited bills & goals",
      "AI bill scanning",
      "Smart insights & tips",
      "AI Advisor chat",
      "Custom categories",
      "Export reports",
    ],
    current: true,
  },
  {
    id: "family",
    name: "Family",
    price: "$14.99",
    period: "/month",
    features: [
      "Everything in Pro",
      "Up to 5 family members",
      "Shared bills & goals",
      "Family spending insights",
      "Priority support",
    ],
    current: false,
  },
];

export default function Subscription() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header title="Subscription" variant="back" onBack={() => navigate("/settings")} />

      <main className="px-5 pt-[calc(theme(spacing.safe-top)+theme(spacing.14)+0.5rem)] pb-8">
        {/* Current Plan Banner */}
        <div className="rounded-xl bg-primary p-5 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Crown className="h-6 w-6 text-primary-foreground" />
            <span className="text-body font-semibold text-primary-foreground">Pro Plan</span>
          </div>
          <p className="text-body-sm text-primary-foreground/80">
            Next billing date: March 1, 2026
          </p>
        </div>

        {/* Plans */}
        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl border-2 p-5 transition-all ${
                plan.current
                  ? "border-primary bg-card shadow-card"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-h2 text-foreground flex items-center gap-2">
                    {plan.name}
                    {plan.current && (
                      <span className="rounded-full bg-primary px-2.5 py-0.5 text-caption font-medium text-primary-foreground">Current</span>
                    )}
                  </h3>
                  <p className="text-number-md text-primary mt-1">
                    {plan.price}
                    <span className="text-body-sm text-muted-foreground"> {plan.period}</span>
                  </p>
                </div>
                {plan.id === "pro" && <Zap className="h-8 w-8 text-primary" />}
              </div>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-body-sm text-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              {!plan.current && (
                <button className="mt-4 w-full rounded-xl border-2 border-primary py-3 text-body font-semibold text-primary hover:bg-accent transition-colors">
                  {plan.id === "free" ? "Downgrade" : "Upgrade"}
                </button>
              )}
            </div>
          ))}
        </div>

        <button className="mt-6 w-full text-center text-body-sm text-muted-foreground hover:text-destructive transition-colors">
          Cancel Subscription
        </button>
      </main>
    </div>
  );
}
