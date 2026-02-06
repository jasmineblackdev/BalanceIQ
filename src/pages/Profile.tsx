import { useState } from "react";
import { Header } from "@/components/balanceiq/Header";
import { Camera, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@email.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Profile" variant="back" onBack={() => navigate("/settings")} />

      <main className="px-5 pt-[calc(theme(spacing.safe-top)+theme(spacing.14)+0.5rem)] pb-8">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
              JD
            </div>
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-card shadow-card border border-border">
              <Camera className="h-4 w-4 text-primary" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-body-sm font-medium text-foreground mb-1.5 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="text-body-sm font-medium text-foreground mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="text-body-sm font-medium text-foreground mb-1.5 block">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="text-body-sm font-medium text-foreground mb-1.5 block">Date of Birth</label>
            <input
              type="date"
              defaultValue="1990-06-15"
              className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-8 w-full rounded-xl bg-primary py-4 text-body font-semibold text-primary-foreground hover:bg-primary-dark active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {saved ? <><Check className="h-5 w-5" /> Saved!</> : "Save Changes"}
        </button>
      </main>
    </div>
  );
}
