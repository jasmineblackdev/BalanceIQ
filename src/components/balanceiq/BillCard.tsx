import { cn } from "@/lib/utils";
import { Lightbulb, Smartphone, Home, CreditCard, Wifi, Car, LucideIcon } from "lucide-react";

type BillCategory = "electric" | "phone" | "rent" | "credit" | "internet" | "car" | "other";

interface BillCardProps {
  name: string;
  amount: number;
  dueDate: string;
  category?: BillCategory;
  status?: "upcoming" | "due-soon" | "overdue";
  className?: string;
  onClick?: () => void;
}

const categoryIcons: Record<BillCategory, LucideIcon> = {
  electric: Lightbulb,
  phone: Smartphone,
  rent: Home,
  credit: CreditCard,
  internet: Wifi,
  car: Car,
  other: CreditCard,
};

const categoryEmojis: Record<BillCategory, string> = {
  electric: "💡",
  phone: "📱",
  rent: "🏠",
  credit: "💳",
  internet: "📶",
  car: "🚗",
  other: "📄",
};

export function BillCard({
  name,
  amount,
  dueDate,
  category = "other",
  status = "upcoming",
  className,
  onClick,
}: BillCardProps) {
  const Icon = categoryIcons[category];

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex h-18 items-center rounded-lg bg-card p-4 border card-interactive",
        status === "upcoming" && "border-border",
        status === "due-soon" && "border-warning",
        status === "overdue" && "border-destructive bg-destructive/5",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-lg">
        {categoryEmojis[category]}
      </div>
      <div className="ml-3 flex-1">
        <p className="text-body font-medium text-foreground">{name}</p>
        <p className="text-caption text-muted-foreground">{dueDate}</p>
      </div>
      <p className="text-body font-semibold text-foreground money-display">
        ${amount.toFixed(0)}
      </p>
    </div>
  );
}
