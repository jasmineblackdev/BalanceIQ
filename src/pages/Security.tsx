import { useState } from "react";
import { Header } from "@/components/balanceiq/Header";
import { Shield, Fingerprint, Lock, Eye, EyeOff, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Security() {
  const navigate = useNavigate();
  const [biometric, setBiometric] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header title="Security & Privacy" variant="back" onBack={() => navigate("/settings")} />

      <main className="px-5 pt-[calc(theme(spacing.safe-top)+theme(spacing.14)+0.5rem)] pb-8">
        {/* Security Score */}
        <div className="rounded-xl bg-card p-5 shadow-card mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-body font-semibold text-foreground">Security Score</p>
              <p className="text-caption text-muted-foreground">Your account is well protected</p>
            </div>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div className="h-2 rounded-full bg-primary progress-animate" style={{ width: "80%" }} />
          </div>
          <p className="mt-2 text-caption text-primary font-medium">80/100 — Good</p>
        </div>

        {/* Authentication */}
        <h3 className="text-body-sm font-medium text-muted-foreground mb-2 px-1">Authentication</h3>
        <div className="rounded-xl bg-card shadow-card overflow-hidden mb-6">
          <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
              <Fingerprint className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-body font-medium text-foreground">Biometric Login</p>
              <p className="text-caption text-muted-foreground">Face ID or fingerprint</p>
            </div>
            <button
              onClick={() => setBiometric(!biometric)}
              className={`relative h-7 w-12 rounded-full transition-colors ${biometric ? "bg-primary" : "bg-muted"}`}
            >
              <div className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${biometric ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>

          <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-body font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-caption text-muted-foreground">Extra security layer via SMS</p>
            </div>
            <button
              onClick={() => setTwoFactor(!twoFactor)}
              className={`relative h-7 w-12 rounded-full transition-colors ${twoFactor ? "bg-primary" : "bg-muted"}`}
            >
              <div className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${twoFactor ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>

          <button className="flex w-full items-center gap-4 px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
              {showPassword ? <EyeOff className="h-5 w-5 text-primary" /> : <Eye className="h-5 w-5 text-primary" />}
            </div>
            <div className="flex-1 text-left">
              <p className="text-body font-medium text-foreground">Change Password</p>
              <p className="text-caption text-muted-foreground">Last changed 30 days ago</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Privacy */}
        <h3 className="text-body-sm font-medium text-muted-foreground mb-2 px-1">Privacy</h3>
        <div className="rounded-xl bg-card shadow-card overflow-hidden">
          <button className="flex w-full items-center gap-4 px-4 py-4 border-b border-border">
            <div className="flex-1 text-left">
              <p className="text-body font-medium text-foreground">Data Sharing Preferences</p>
              <p className="text-caption text-muted-foreground">Control what data is shared</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="flex w-full items-center gap-4 px-4 py-4 border-b border-border">
            <div className="flex-1 text-left">
              <p className="text-body font-medium text-foreground">Download My Data</p>
              <p className="text-caption text-muted-foreground">Export all your account data</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="flex w-full items-center gap-4 px-4 py-4">
            <div className="flex-1 text-left">
              <p className="text-body font-medium text-destructive">Delete Account</p>
              <p className="text-caption text-muted-foreground">Permanently remove your data</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </main>
    </div>
  );
}
