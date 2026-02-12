import { useState } from "react";
import { Header } from "@/components/balanceiq/Header";
import { TabBar, TabId } from "@/components/balanceiq/TabBar";
import { BillCard } from "@/components/balanceiq/BillCard";
import { EmptyBillsCard } from "@/components/balanceiq/EmptyBillsCard";
import { AddBillModal } from "@/components/balanceiq/AddBillModal";
import { FilterModal, BillFilter } from "@/components/balanceiq/FilterModal";
import { Plus, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockBills = [
  { id: 1, name: "Electric", amount: 89, dueDate: "Nov 10", category: "electric" as const, status: "upcoming" as const },
  { id: 2, name: "Phone", amount: 65, dueDate: "Nov 12", category: "phone" as const, status: "upcoming" as const },
  { id: 3, name: "Internet", amount: 79, dueDate: "Nov 15", category: "internet" as const, status: "upcoming" as const },
  { id: 4, name: "Rent", amount: 1500, dueDate: "Nov 1", category: "rent" as const, status: "due-soon" as const },
  { id: 5, name: "Car Insurance", amount: 145, dueDate: "Nov 20", category: "car" as const, status: "upcoming" as const },
  { id: 6, name: "Credit Card", amount: 250, dueDate: "Nov 25", category: "credit" as const, status: "upcoming" as const },
];

export default function Bills() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("bills");
  const [showAddModal, setShowAddModal] = useState(false);
  const [addMode, setAddMode] = useState<"choose" | "manual" | "scan">("choose");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<BillFilter>({ status: [], category: [], sortBy: "date" });

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    if (tab === "home") navigate("/dashboard");
    if (tab === "savings") navigate("/savings");
    if (tab === "advisor") navigate("/advisor");
    if (tab === "more") navigate("/settings");
  };

  const openAdd = (mode: "choose" | "manual" | "scan") => {
    setAddMode(mode);
    setShowAddModal(true);
  };

  // Apply filters
  let filteredBills = [...mockBills];
  if (filters.status.length > 0) {
    filteredBills = filteredBills.filter((b) => filters.status.includes(b.status));
  }
  if (filters.category.length > 0) {
    filteredBills = filteredBills.filter((b) => filters.category.includes(b.category));
  }
  filteredBills.sort((a, b) => {
    if (filters.sortBy === "amount") return b.amount - a.amount;
    if (filters.sortBy === "name") return a.name.localeCompare(b.name);
    return 0; // date - keep original order
  });

  const totalDue = mockBills.reduce((sum, bill) => sum + bill.amount, 0);
  const upcomingCount = mockBills.length;
  const activeFilterCount = filters.status.length + filters.category.length + (filters.sortBy !== "date" ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Bills"
        variant="standard"
        rightAction={
          <button
            onClick={() => openAdd("choose")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary-dark transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        }
      />

      <main className="px-5 pt-[calc(theme(spacing.safe-top)+theme(spacing.14)+0.5rem)] pb-[calc(theme(spacing.20)+theme(spacing.safe-bottom)+theme(spacing.4))]">
        {/* Summary Card */}
        <div className="rounded-xl bg-card p-5 shadow-card mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body-sm text-muted-foreground">Bills covered this month</p>
              <p className="text-number-lg text-foreground money-display mt-1">
                ${totalDue.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-body-sm text-muted-foreground">Upcoming</p>
              <p className="text-h2 text-primary mt-1">{upcomingCount} bills</p>
            </div>
          </div>
        </div>

        {/* Quick Add Options */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => openAdd("scan")}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/30 bg-accent py-4 text-body-sm font-medium text-primary hover:border-primary hover:bg-accent/80 transition-colors"
          >
            📸 Scan Bill
          </button>
          <button
            onClick={() => openAdd("manual")}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/30 bg-accent py-4 text-body-sm font-medium text-primary hover:border-primary hover:bg-accent/80 transition-colors"
          >
            📝 Add Manually
          </button>
        </div>

        {/* Filter */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-h2 text-foreground">All Bills</h2>
          <button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-1 text-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Filter className="h-4 w-4" />
            Filter
            {activeFilterCount > 0 && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-caption text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Bills List */}
        {filteredBills.length > 0 ? (
          <div className="space-y-2">
            {filteredBills.map((bill) => (
              <BillCard
                key={bill.id}
                name={bill.name}
                amount={bill.amount}
                dueDate={bill.dueDate}
                category={bill.category}
                status={bill.status}
                onClick={() => {}}
              />
            ))}
          </div>
        ) : (
          <EmptyBillsCard onAddBill={() => openAdd("choose")} />
        )}
      </main>

      <AddBillModal open={showAddModal} onClose={() => setShowAddModal(false)} mode={addMode} />
      <FilterModal open={showFilterModal} onClose={() => setShowFilterModal(false)} filters={filters} onApply={setFilters} />
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
