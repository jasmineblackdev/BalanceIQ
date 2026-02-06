import { useState } from "react";
import { X } from "lucide-react";

export type BillFilter = {
  status: string[];
  category: string[];
  sortBy: "date" | "amount" | "name";
};

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  filters: BillFilter;
  onApply: (filters: BillFilter) => void;
}

const statusOptions = [
  { value: "upcoming", label: "Upcoming" },
  { value: "due-soon", label: "Due Soon" },
  { value: "overdue", label: "Overdue" },
  { value: "paid", label: "Paid" },
];

const categoryOptions = [
  { value: "electric", label: "💡 Electric" },
  { value: "phone", label: "📱 Phone" },
  { value: "internet", label: "🌐 Internet" },
  { value: "rent", label: "🏠 Rent" },
  { value: "car", label: "🚗 Car" },
  { value: "credit", label: "💳 Credit" },
  { value: "water", label: "💧 Water" },
  { value: "subscription", label: "📺 Subscription" },
];

const sortOptions = [
  { value: "date" as const, label: "Due Date" },
  { value: "amount" as const, label: "Amount" },
  { value: "name" as const, label: "Name" },
];

export function FilterModal({ open, onClose, filters, onApply }: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState<BillFilter>(filters);

  if (!open) return null;

  const toggleArrayItem = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  const handleReset = () => {
    setLocalFilters({ status: [], category: [], sortBy: "date" });
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-t-3xl bg-card p-6 modal-slide-up" style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted" />
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-h2 text-foreground">Filter Bills</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Sort By */}
        <div className="mb-5">
          <h3 className="text-body-sm font-medium text-muted-foreground mb-2">Sort By</h3>
          <div className="flex gap-2">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLocalFilters((p) => ({ ...p, sortBy: opt.value }))}
                className={`rounded-full px-4 py-2 text-body-sm font-medium transition-colors ${
                  localFilters.sortBy === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-foreground hover:bg-accent/80"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="mb-5">
          <h3 className="text-body-sm font-medium text-muted-foreground mb-2">Status</h3>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  setLocalFilters((p) => ({ ...p, status: toggleArrayItem(p.status, opt.value) }))
                }
                className={`rounded-full px-4 py-2 text-body-sm font-medium transition-colors ${
                  localFilters.status.includes(opt.value)
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-foreground hover:bg-accent/80"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="mb-6">
          <h3 className="text-body-sm font-medium text-muted-foreground mb-2">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  setLocalFilters((p) => ({ ...p, category: toggleArrayItem(p.category, opt.value) }))
                }
                className={`rounded-full px-4 py-2 text-body-sm font-medium transition-colors ${
                  localFilters.category.includes(opt.value)
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-foreground hover:bg-accent/80"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 rounded-xl border-2 border-border py-3.5 text-body font-medium text-foreground hover:bg-muted/50 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 rounded-xl bg-primary py-3.5 text-body font-semibold text-primary-foreground hover:bg-primary-dark active:scale-[0.98] transition-all"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
