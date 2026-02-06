import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Calendar,
  Wallet,
  Target,
  FileText,
  Check,
  Plus,
  Sparkles,
} from "lucide-react";

type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly" | "";

interface OnboardingData {
  income: string;
  payFrequency: PayFrequency;
  nextPayDate: string;
}

const STEPS = [
  { id: 1, label: "Income" },
  { id: 2, label: "Schedule" },
  { id: 3, label: "Preview" },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    income: "",
    payFrequency: "",
    nextPayDate: "",
  });

  const canProceedStep1 = data.income.length > 0;
  const canProceedStep2 = data.payFrequency !== "" && data.nextPayDate.length > 0;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate("/");
  };

  const handleFinish = () => {
    navigate("/dashboard");
  };

  const payFrequencies: { value: PayFrequency; label: string; desc: string }[] = [
    { value: "weekly", label: "Weekly", desc: "Every week" },
    { value: "biweekly", label: "Bi-weekly", desc: "Every 2 weeks" },
    { value: "semimonthly", label: "Semi-monthly", desc: "1st & 15th" },
    { value: "monthly", label: "Monthly", desc: "Once a month" },
  ];

  const incomeNum = parseFloat(data.income) || 0;
  const estimatedSafe = Math.round(incomeNum * 0.6);
  const estimatedBills = Math.round(incomeNum * 0.3);
  const estimatedSavings = Math.round(incomeNum * 0.1);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-5 pt-safe-top">
        <div className="flex items-center justify-between h-14">
          <button
            onClick={handleBack}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted/50 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex gap-2">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s.id === step
                    ? "w-8 bg-primary"
                    : s.id < step
                    ? "w-2 bg-primary"
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-body-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pb-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col h-full"
            >
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent mt-4 mb-6">
                <DollarSign className="h-7 w-7 text-primary" />
              </div>

              <h1 className="text-h1 text-foreground">What's your take-home pay?</h1>
              <p className="mt-2 text-body text-muted-foreground">
                Enter the amount you receive each paycheck after taxes.
              </p>

              {/* Input */}
              <div className="mt-8 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-number-lg text-muted-foreground">
                  $
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={data.income}
                  onChange={(e) => setData({ ...data, income: e.target.value })}
                  className="w-full h-16 pl-10 pr-4 rounded-xl border-[1.5px] border-input bg-card text-number-lg text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all money-display"
                />
              </div>

              <p className="mt-3 text-caption text-muted-foreground">
                This helps us calculate how much you can safely spend.
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col h-full"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent mt-4 mb-6">
                <Calendar className="h-7 w-7 text-primary" />
              </div>

              <h1 className="text-h1 text-foreground">How often do you get paid?</h1>
              <p className="mt-2 text-body text-muted-foreground">
                We'll align your bills and spending to your pay cycle.
              </p>

              {/* Frequency Grid */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {payFrequencies.map((freq) => (
                  <button
                    key={freq.value}
                    onClick={() => setData({ ...data, payFrequency: freq.value })}
                    className={`flex flex-col items-start rounded-xl border-[1.5px] p-4 transition-all ${
                      data.payFrequency === freq.value
                        ? "border-primary bg-accent"
                        : "border-input bg-card hover:border-muted-foreground/30"
                    }`}
                  >
                    <span
                      className={`text-body font-semibold ${
                        data.payFrequency === freq.value
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {freq.label}
                    </span>
                    <span className="text-caption text-muted-foreground mt-1">
                      {freq.desc}
                    </span>
                    {data.payFrequency === freq.value && (
                      <div className="mt-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Next Pay Date */}
              <div className="mt-6">
                <label className="text-body-sm font-medium text-muted-foreground mb-2 block">
                  Next pay date
                </label>
                <input
                  type="date"
                  value={data.nextPayDate}
                  onChange={(e) =>
                    setData({ ...data, nextPayDate: e.target.value })
                  }
                  className="w-full h-14 px-4 rounded-xl border-[1.5px] border-input bg-card text-body text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col h-full"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent mt-4 mb-6">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>

              <h1 className="text-h1 text-foreground">You're all set!</h1>
              <p className="mt-2 text-body text-muted-foreground">
                Here's a preview of your financial snapshot based on your income.
              </p>

              {/* Preview Cards */}
              <div className="mt-8 space-y-3">
                {/* Score Preview */}
                <div className="rounded-xl bg-card p-5 shadow-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-body-sm text-muted-foreground">
                        Your BalanceIQ Score
                      </p>
                      <p className="text-number-lg text-primary mt-1">42</p>
                    </div>
                    <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-[3px] border-primary/30">
                      <span className="text-body font-bold text-primary">42</span>
                      <span className="text-[10px] text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <p className="text-caption text-muted-foreground mt-3">
                    Add bills and goals to improve your score
                  </p>
                </div>

                {/* Safe to Spend */}
                <div className="rounded-xl bg-card p-5 shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                      <Wallet className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-body-sm text-muted-foreground">
                        Estimated Safe to Spend
                      </p>
                      <p className="text-h2 text-foreground money-display">
                        ${estimatedSafe.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="rounded-xl bg-card p-5 shadow-card">
                  <p className="text-body-sm font-medium text-foreground mb-4">
                    Estimated breakdown
                  </p>
                  <div className="space-y-3">
                    <BreakdownRow
                      icon={<Wallet className="h-4 w-4" />}
                      label="Safe to Spend"
                      amount={estimatedSafe}
                      pct={60}
                    />
                    <BreakdownRow
                      icon={<FileText className="h-4 w-4" />}
                      label="Bills (estimated)"
                      amount={estimatedBills}
                      pct={30}
                    />
                    <BreakdownRow
                      icon={<Target className="h-4 w-4" />}
                      label="Savings"
                      amount={estimatedSavings}
                      pct={10}
                    />
                  </div>
                </div>

                {/* Optional next steps */}
                <div className="rounded-xl border border-dashed border-muted p-4">
                  <p className="text-body-sm font-medium text-foreground mb-3">
                    Optional next steps
                  </p>
                  <div className="space-y-2">
                    <OptionalStep
                      icon={<FileText className="h-4 w-4" />}
                      label="Add your bills"
                      onClick={() => navigate("/bills")}
                    />
                    <OptionalStep
                      icon={<Target className="h-4 w-4" />}
                      label="Set a savings goal"
                      onClick={() => navigate("/savings")}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 pb-8 pt-4 bg-gradient-to-t from-background via-background to-transparent">
        {step < 3 ? (
          <button
            onClick={handleNext}
            disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-body font-semibold text-primary-foreground shadow-lg hover:bg-primary-dark active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none"
          >
            Continue
            <ChevronRight className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-body font-semibold text-primary-foreground shadow-lg hover:bg-primary-dark active:scale-[0.98] transition-all"
          >
            Go to Dashboard
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

function BreakdownRow({
  icon,
  label,
  amount,
  pct,
}: {
  icon: React.ReactNode;
  label: string;
  amount: number;
  pct: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-body-sm text-foreground">{label}</span>
          <span className="text-body-sm font-semibold text-foreground money-display">
            ${amount.toLocaleString()}
          </span>
        </div>
        <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="h-full rounded-full bg-primary"
          />
        </div>
      </div>
    </div>
  );
}

function OptionalStep({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-accent/50 transition-colors"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-primary">
        {icon}
      </div>
      <span className="text-body-sm text-foreground flex-1 text-left">{label}</span>
      <Plus className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
