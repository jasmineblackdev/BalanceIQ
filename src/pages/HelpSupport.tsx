import { useState } from "react";
import { Header } from "@/components/balanceiq/Header";
import { MessageCircle, Mail, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  { q: "How is my BalanceIQ Score calculated?", a: "Your score is based on four factors: budget health (25pts), savings rate (25pts), bill management (25pts), and investment readiness (25pts). Each is evaluated based on your financial activity." },
  { q: "How do I scan a bill?", a: "Go to the Bills tab, tap the + button, and select 'Scan Bill'. You can take a photo or upload a PDF. Our AI will automatically extract the bill details." },
  { q: "Is my financial data secure?", a: "Yes! We use bank-level 256-bit encryption. Your data is never sold to third parties. You can manage your privacy settings under Security & Privacy." },
  { q: "Can I share goals with family?", a: "With the Family plan, you can invite up to 5 family members to share bills and savings goals. Upgrade from the Subscription page." },
  { q: "How do I cancel my subscription?", a: "Go to Settings > Subscription and tap 'Cancel Subscription' at the bottom. You'll keep Pro features until the end of your billing period." },
];

export default function HelpSupport() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header title="Help & Support" variant="back" onBack={() => navigate("/settings")} />

      <main className="px-5 pt-[calc(theme(spacing.safe-top)+theme(spacing.14)+0.5rem)] pb-8">
        {/* Contact Options */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="flex flex-col items-center gap-2 rounded-xl bg-card p-5 shadow-card hover:bg-accent transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <p className="text-body-sm font-medium text-foreground">Live Chat</p>
            <p className="text-caption text-muted-foreground">Available 24/7</p>
          </button>
          <button className="flex flex-col items-center gap-2 rounded-xl bg-card p-5 shadow-card hover:bg-accent transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <p className="text-body-sm font-medium text-foreground">Email Us</p>
            <p className="text-caption text-muted-foreground">Reply in 24hrs</p>
          </button>
        </div>

        {/* FAQ */}
        <h2 className="text-h2 text-foreground mb-3">Frequently Asked</h2>
        <div className="rounded-xl bg-card shadow-card overflow-hidden">
          {faqs.map((faq, i) => (
            <div key={i} className={i < faqs.length - 1 ? "border-b border-border" : ""}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center gap-3 px-4 py-4 text-left"
              >
                <p className="flex-1 text-body font-medium text-foreground">{faq.q}</p>
                {openFaq === i ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4">
                  <p className="text-body-sm text-muted-foreground">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Terms */}
        <div className="mt-6 space-y-3">
          <button className="flex w-full items-center justify-between rounded-xl bg-card px-4 py-4 shadow-card">
            <span className="text-body font-medium text-foreground">Terms of Service</span>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="flex w-full items-center justify-between rounded-xl bg-card px-4 py-4 shadow-card">
            <span className="text-body font-medium text-foreground">Privacy Policy</span>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </main>
    </div>
  );
}
