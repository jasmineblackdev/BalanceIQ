import { useState } from "react";
import { Header } from "@/components/balanceiq/Header";
import { TabBar, TabId } from "@/components/balanceiq/TabBar";
import { Bot, Send, Lightbulb, TrendingDown, PiggyBank, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
  timestamp: string;
}

interface QuickAction {
  id: number;
  icon: React.ReactNode;
  label: string;
  prompt: string;
}

const quickActions: QuickAction[] = [
  { id: 1, icon: <TrendingDown className="h-4 w-4" />, label: "Reduce spending", prompt: "How can I reduce my monthly spending?" },
  { id: 2, icon: <PiggyBank className="h-4 w-4" />, label: "Save more", prompt: "Help me save more money each month" },
  { id: 3, icon: <CreditCard className="h-4 w-4" />, label: "Pay off debt", prompt: "What's the best strategy to pay off my debt?" },
  { id: 4, icon: <Lightbulb className="h-4 w-4" />, label: "Smart tips", prompt: "Give me personalized tips to improve my finances" },
];

const initialMessages: Message[] = [
  {
    id: 1,
    type: "bot",
    content: "Hi! I'm your BalanceIQ Advisor. I've analyzed your spending patterns and have some insights to share. What would you like help with today?",
    timestamp: "Just now",
  },
];

export default function Advisor() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("advisor");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    if (tab === "home") navigate("/dashboard");
    if (tab === "bills") navigate("/bills");
    if (tab === "savings") navigate("/savings");
    if (tab === "more") navigate("/settings");
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        "How can I reduce my monthly spending?": "Based on your spending patterns, I see you're spending $340/month on subscriptions. Here are 3 you might not be using: Netflix ($15), Gym ($45), and Adobe ($20). Canceling these could save you $80/month!",
        "Help me save more money each month": "Great goal! You currently save 8% of your income. To reach a healthy 15%, try the 50/30/20 rule: 50% needs, 30% wants, 20% savings. I can help you categorize your spending to find opportunities.",
        "What's the best strategy to pay off my debt?": "You have $2,500 in credit card debt at 19% APR. Using the avalanche method, if you pay $200/month, you'll be debt-free in 14 months and save $180 in interest!",
        "Give me personalized tips to improve my finances": "Here are 3 quick wins for you:\n1. Your electricity bill went up 15% - consider switching providers\n2. You have $200 extra this paycheck - put it toward your Emergency Fund\n3. Your car insurance renews next month - I found a plan that's $30 cheaper",
      };

      const botMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        content: botResponses[text] || "I understand you want to improve your finances. Let me analyze your recent transactions and give you personalized advice. What specific area would you like to focus on?",
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="AI Advisor" variant="standard" />

      <main className="flex-1 flex flex-col pt-[calc(theme(spacing.safe-top)+theme(spacing.14))] pb-[calc(theme(spacing.20)+theme(spacing.safe-bottom))]">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.type === "bot" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary mr-2 mt-1">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-card shadow-card rounded-bl-sm"
                }`}
              >
                <p className={`text-body-sm whitespace-pre-line ${message.type === "user" ? "" : "text-foreground"}`}>
                  {message.content}
                </p>
                <p className={`text-caption mt-1 ${message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        {messages.length <= 2 && (
          <div className="px-5 pb-3">
            <p className="text-caption text-muted-foreground mb-2">Quick actions</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => sendMessage(action.prompt)}
                  className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-body-sm font-medium text-primary hover:bg-accent/80 transition-colors"
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-5 pb-4 border-t border-border bg-background">
          <div className="flex items-center gap-3 mt-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(inputValue)}
              placeholder="Ask me anything about your finances..."
              className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </main>

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
