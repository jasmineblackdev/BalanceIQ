import { useState } from "react";
import { Header } from "@/components/balanceiq/Header";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LinkedAccount {
  id: number;
  name: string;
  type: string;
  lastFour: string;
  icon: string;
  connected: string;
}

const mockAccounts: LinkedAccount[] = [
  { id: 1, name: "Chase Checking", type: "Checking", lastFour: "4892", icon: "🏦", connected: "Connected Oct 12" },
  { id: 2, name: "Bank of America Savings", type: "Savings", lastFour: "7731", icon: "🏦", connected: "Connected Sep 5" },
  { id: 3, name: "Visa Credit Card", type: "Credit Card", lastFour: "3201", icon: "💳", connected: "Connected Nov 1" },
];

export default function LinkedAccounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState(mockAccounts);
  const [showConfirm, setShowConfirm] = useState<number | null>(null);

  const handleRemove = (id: number) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
    setShowConfirm(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Linked Accounts" variant="back" onBack={() => navigate("/settings")} />

      <main className="px-5 pt-[calc(theme(spacing.safe-top)+theme(spacing.14)+0.5rem)] pb-8">
        <p className="text-body-sm text-muted-foreground mb-4">
          Connect your bank accounts to automatically track income and bills.
        </p>

        <div className="space-y-3">
          {accounts.map((acc) => (
            <div key={acc.id} className="rounded-xl bg-card p-4 shadow-card">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-2xl">
                  {acc.icon}
                </div>
                <div className="flex-1">
                  <p className="text-body font-medium text-foreground">{acc.name}</p>
                  <p className="text-caption text-muted-foreground">
                    {acc.type} ••••{acc.lastFour}
                  </p>
                  <p className="text-caption text-muted-foreground">{acc.connected}</p>
                </div>
                {showConfirm === acc.id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRemove(acc.id)}
                      className="rounded-lg bg-destructive px-3 py-1.5 text-caption font-medium text-destructive-foreground"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => setShowConfirm(null)}
                      className="rounded-lg bg-muted px-3 py-1.5 text-caption font-medium text-foreground"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowConfirm(acc.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/30 bg-accent py-4 text-body font-medium text-primary hover:border-primary hover:bg-accent/80 transition-colors">
          <Plus className="h-5 w-5" />
          Link New Account
        </button>
      </main>
    </div>
  );
}
