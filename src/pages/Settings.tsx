import { useState } from "react";
import { Header } from "@/components/balanceiq/Header";
import { TabBar, TabId } from "@/components/balanceiq/TabBar";
import {
  User,
  Bell,
  CreditCard,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Moon,
  Smartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SettingsItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  description?: string;
  badge?: string;
  action?: "navigate" | "toggle";
  value?: boolean;
}

interface SettingsSection {
  title: string;
  items: SettingsItem[];
}

const settingsSections: SettingsSection[] = [
  {
    title: "Account",
    items: [
      { id: "profile", icon: <User className="h-5 w-5" />, label: "Profile", description: "John Doe", action: "navigate" },
      { id: "subscription", icon: <CreditCard className="h-5 w-5" />, label: "Subscription", badge: "Pro", action: "navigate" },
      { id: "linked-accounts", icon: <Smartphone className="h-5 w-5" />, label: "Linked Accounts", description: "3 connected", action: "navigate" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { id: "notifications", icon: <Bell className="h-5 w-5" />, label: "Notifications", action: "navigate" },
      { id: "dark-mode", icon: <Moon className="h-5 w-5" />, label: "Dark Mode", action: "toggle", value: false },
    ],
  },
  {
    title: "Security",
    items: [
      { id: "security", icon: <Shield className="h-5 w-5" />, label: "Security & Privacy", action: "navigate" },
    ],
  },
  {
    title: "Support",
    items: [
      { id: "help", icon: <HelpCircle className="h-5 w-5" />, label: "Help & Support", action: "navigate" },
      { id: "terms", icon: <FileText className="h-5 w-5" />, label: "Terms & Privacy", action: "navigate" },
    ],
  },
];

export default function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("more");
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    "dark-mode": false,
  });

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    if (tab === "home") navigate("/dashboard");
    if (tab === "bills") navigate("/bills");
    if (tab === "savings") navigate("/savings");
    if (tab === "advisor") navigate("/advisor");
  };

  const handleToggle = (id: string) => {
    setToggleStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Settings" variant="standard" />

      <main className="px-5 pt-[calc(theme(spacing.safe-top)+theme(spacing.14)+0.5rem)] pb-[calc(theme(spacing.20)+theme(spacing.safe-bottom)+theme(spacing.4))]">
        {/* Profile Card */}
        <div className="rounded-xl bg-card p-5 shadow-card mb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-h1 text-primary-foreground">
              JD
            </div>
            <div className="flex-1">
              <h2 className="text-h2 text-foreground">John Doe</h2>
              <p className="text-body-sm text-muted-foreground">john.doe@email.com</p>
              <div className="mt-2 inline-flex items-center rounded-full bg-accent px-3 py-1">
                <span className="text-caption font-medium text-primary">Pro Member</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-body-sm font-medium text-muted-foreground mb-2 px-1">
              {section.title}
            </h3>
            <div className="rounded-xl bg-card shadow-card overflow-hidden">
              {section.items.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action === "toggle") {
                      handleToggle(item.id);
                    }
                  }}
                  className={`flex w-full items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors ${
                    index < section.items.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                    {item.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-body font-medium text-foreground">{item.label}</p>
                    {item.description && (
                      <p className="text-caption text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                  {item.badge && (
                    <span className="rounded-full bg-primary px-3 py-1 text-caption font-medium text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                  {item.action === "toggle" ? (
                    <div
                      className={`relative h-7 w-12 rounded-full transition-colors ${
                        toggleStates[item.id] ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          toggleStates[item.id] ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </div>
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-destructive/30 py-4 text-body font-medium text-destructive hover:bg-destructive/5 transition-colors">
          <LogOut className="h-5 w-5" />
          Log Out
        </button>

        {/* Version */}
        <p className="mt-6 text-center text-caption text-muted-foreground">
          BalanceIQ v1.0.0
        </p>
      </main>

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
