import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Bills from "./pages/Bills";
import Savings from "./pages/Savings";
import Advisor from "./pages/Advisor";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Subscription from "./pages/Subscription";
import LinkedAccounts from "./pages/LinkedAccounts";
import Notifications from "./pages/Notifications";
import Security from "./pages/Security";
import HelpSupport from "./pages/HelpSupport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/advisor" element={<Advisor />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/profile" element={<Profile />} />
          <Route path="/settings/subscription" element={<Subscription />} />
          <Route path="/settings/linked-accounts" element={<LinkedAccounts />} />
          <Route path="/settings/notifications" element={<Notifications />} />
          <Route path="/settings/security" element={<Security />} />
          <Route path="/settings/help" element={<HelpSupport />} />
          <Route path="/settings/terms" element={<HelpSupport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
