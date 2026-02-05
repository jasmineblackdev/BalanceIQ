import { cn } from "@/lib/utils";
import { Home, Receipt, PiggyBank, MessageCircle, Menu } from "lucide-react";
import { ReactNode } from "react";

type TabId = "home" | "bills" | "savings" | "advisor" | "more";

interface TabItem {
  id: TabId;
  label: string;
  icon: ReactNode;
  badge?: boolean;
  badgeCount?: number;
}

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  className?: string;
}

const tabs: TabItem[] = [
  { id: "home", label: "Home", icon: <Home className="h-6 w-6" /> },
  { id: "bills", label: "Bills", icon: <Receipt className="h-6 w-6" /> },
  { id: "savings", label: "Savings", icon: <PiggyBank className="h-6 w-6" /> },
  { id: "advisor", label: "Advisor", icon: <MessageCircle className="h-6 w-6" /> },
  { id: "more", label: "More", icon: <Menu className="h-6 w-6" /> },
];

export function TabBar({ activeTab, onTabChange, className }: TabBarProps) {
  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-card shadow-tab border-t border-border",
        className
      )}
    >
      <div className="flex h-20 items-center justify-around pb-safe-bottom">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex h-full w-[75px] flex-col items-center justify-center gap-1 pt-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn("relative", isActive && "tab-bounce")}>
                {tab.icon}
                {tab.badge && (
                  <span className="absolute -right-1 -top-1 flex h-2 w-2 items-center justify-center rounded-full bg-destructive" />
                )}
              </div>
              <span
                className={cn(
                  "text-tab",
                  isActive ? "font-semibold" : "font-medium"
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export type { TabId };
