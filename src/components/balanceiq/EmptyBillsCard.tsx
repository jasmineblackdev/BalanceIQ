import { cn } from "@/lib/utils";
import { FileText, Plus } from "lucide-react";

interface EmptyBillsCardProps {
  onAddBill?: () => void;
  className?: string;
}

export function EmptyBillsCard({ onAddBill, className }: EmptyBillsCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl bg-card p-8 shadow-card text-center",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <FileText className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-h2 text-foreground">No bills yet</h3>
      <p className="mt-2 text-body-sm text-muted-foreground max-w-[240px]">
        Add your first bill to see how much you can safely spend
      </p>
      <button
        onClick={onAddBill}
        className="mt-6 flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-body font-semibold text-primary-foreground hover:bg-primary-dark active:scale-[0.98] transition-all"
      >
        <Plus className="h-5 w-5" />
        Add Bill
      </button>
    </div>
  );
}
