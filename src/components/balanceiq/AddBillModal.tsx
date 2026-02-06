import { useState } from "react";
import { X, Camera, FileText, ChevronDown } from "lucide-react";

interface AddBillModalProps {
  open: boolean;
  onClose: () => void;
  mode: "choose" | "manual" | "scan";
}

const categories = [
  { value: "electric", label: "Electric", icon: "💡" },
  { value: "phone", label: "Phone", icon: "📱" },
  { value: "internet", label: "Internet", icon: "🌐" },
  { value: "rent", label: "Rent", icon: "🏠" },
  { value: "car", label: "Car Insurance", icon: "🚗" },
  { value: "credit", label: "Credit Card", icon: "💳" },
  { value: "water", label: "Water", icon: "💧" },
  { value: "gas", label: "Gas", icon: "🔥" },
  { value: "subscription", label: "Subscription", icon: "📺" },
  { value: "other", label: "Other", icon: "📄" },
];

const frequencies = [
  { value: "monthly", label: "Monthly" },
  { value: "bi-weekly", label: "Bi-Weekly" },
  { value: "weekly", label: "Weekly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
];

export function AddBillModal({ open, onClose, mode: initialMode }: AddBillModalProps) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [autoPay, setAutoPay] = useState(false);
  const [reminder, setReminder] = useState(true);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  if (!open) return null;

  const resetForm = () => {
    setName("");
    setAmount("");
    setDueDate("");
    setCategory("");
    setFrequency("monthly");
    setAutoPay(false);
    setReminder(true);
  };

  const handleSave = () => {
    resetForm();
    onClose();
  };

  const selectedCategory = categories.find((c) => c.value === category);

  if (mode === "choose") {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative w-full max-w-lg rounded-t-3xl bg-card p-6 modal-slide-up">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted" />
          <h2 className="text-h2 text-foreground mb-6">Add a Bill</h2>

          <div className="space-y-3">
            <button
              onClick={() => setMode("scan")}
              className="flex w-full items-center gap-4 rounded-xl bg-accent p-4 hover:bg-accent/80 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-body font-semibold text-foreground">Scan Bill</p>
                <p className="text-caption text-muted-foreground">Take a photo or upload a PDF</p>
              </div>
            </button>

            <button
              onClick={() => setMode("manual")}
              className="flex w-full items-center gap-4 rounded-xl bg-accent p-4 hover:bg-accent/80 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-body font-semibold text-foreground">Add Manually</p>
                <p className="text-caption text-muted-foreground">Enter bill details yourself</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "scan") {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative w-full max-w-lg rounded-t-3xl bg-card p-6 modal-slide-up" style={{ maxHeight: "90vh", overflowY: "auto" }}>
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted" />
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-h2 text-foreground">Scan Bill</h2>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-accent p-12">
            <Camera className="h-12 w-12 text-primary mb-4" />
            <p className="text-body font-medium text-foreground mb-1">Upload your bill</p>
            <p className="text-caption text-muted-foreground text-center mb-4">Take a photo or choose a PDF from your files</p>
            <div className="flex gap-3">
              <button className="rounded-lg bg-primary px-5 py-2.5 text-body-sm font-semibold text-primary-foreground hover:bg-primary-dark transition-colors">
                Take Photo
              </button>
              <button className="rounded-lg border-2 border-primary px-5 py-2.5 text-body-sm font-semibold text-primary hover:bg-accent/80 transition-colors">
                Choose File
              </button>
            </div>
          </div>

          <p className="mt-4 text-caption text-muted-foreground text-center">
            AI will automatically extract bill details
          </p>
        </div>
      </div>
    );
  }

  // Manual mode
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-t-3xl bg-card p-6 modal-slide-up" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted" />
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-h2 text-foreground">Add Bill Manually</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Bill Name */}
          <div>
            <label className="text-body-sm font-medium text-foreground mb-1.5 block">Bill Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Electric Bill"
              className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-body-sm font-medium text-foreground mb-1.5 block">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body font-medium text-muted-foreground">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-xl border border-border bg-background pl-8 pr-4 py-3.5 text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="text-body-sm font-medium text-foreground mb-1.5 block">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-body-sm font-medium text-foreground mb-1.5 block">Category</label>
            <button
              onClick={() => setShowCategoryPicker(!showCategoryPicker)}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-3.5 text-body transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {selectedCategory ? (
                <span className="flex items-center gap-2 text-foreground">
                  <span>{selectedCategory.icon}</span>
                  {selectedCategory.label}
                </span>
              ) : (
                <span className="text-muted-foreground">Select category</span>
              )}
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            {showCategoryPicker && (
              <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl border border-border bg-card p-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => { setCategory(cat.value); setShowCategoryPicker(false); }}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-body-sm transition-colors ${
                      category === cat.value ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Frequency */}
          <div>
            <label className="text-body-sm font-medium text-foreground mb-1.5 block">Frequency</label>
            <div className="flex flex-wrap gap-2">
              {frequencies.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFrequency(f.value)}
                  className={`rounded-full px-4 py-2 text-body-sm font-medium transition-colors ${
                    frequency === f.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-foreground hover:bg-accent/80"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-body text-foreground">Auto-Pay</span>
              <button
                onClick={() => setAutoPay(!autoPay)}
                className={`relative h-7 w-12 rounded-full transition-colors ${autoPay ? "bg-primary" : "bg-muted"}`}
              >
                <div className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${autoPay ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-body text-foreground">Payment Reminder</span>
              <button
                onClick={() => setReminder(!reminder)}
                className={`relative h-7 w-12 rounded-full transition-colors ${reminder ? "bg-primary" : "bg-muted"}`}
              >
                <div className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${reminder ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!name || !amount || !dueDate}
          className="mt-6 w-full rounded-xl bg-primary py-4 text-body font-semibold text-primary-foreground hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
        >
          Add Bill
        </button>
      </div>
    </div>
  );
}
