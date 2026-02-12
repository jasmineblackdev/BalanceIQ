import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Wallet, ArrowRight, TrendingUp, Bell, Bot } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Safe-to-Spend",
      description: "Know exactly how much you can spend before your next paycheck",
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Bill Intelligence",
      description: "Auto-detect and track all your bills in one place",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "BalanceIQ Score",
      description: "Your personal financial health score, updated daily",
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI Advisor",
      description: "Get personalized tips to improve your finances",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/95 to-background" />
        
        {/* Decorative circles */}
        <div className="absolute top-20 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-40 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative px-5 pt-safe-top">
          <div className="flex flex-col items-center pt-12 pb-16 text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
                <Wallet className="h-8 w-8 text-primary-foreground" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-h1 text-primary-foreground"
            >
              BalanceIQ
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 text-body text-primary-foreground/80 max-w-[280px]"
            >
              Know exactly what you can spend — no stress, no jargon, just clarity
            </motion.p>

            {/* Score Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-primary bg-card shadow-modal"
            >
              <span className="text-number-lg text-primary">68</span>
              <span className="text-caption text-muted-foreground">/100</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-3 text-caption text-primary-foreground/60"
            >
              Your BalanceIQ Score
            </motion.p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-5 py-8 -mt-4">
        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-4 rounded-xl bg-card p-4 shadow-card"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-body font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1 text-body-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent px-5 pb-8 pt-6">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          onClick={() => navigate("/onboarding")}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-body font-semibold text-primary-foreground shadow-lg hover:bg-primary-dark active:scale-[0.98] transition-all"
        >
          Get Started
          <ArrowRight className="h-5 w-5" />
        </motion.button>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-4 text-center text-caption text-muted-foreground"
        >
          Free forever • No bank login needed • Your data stays yours
        </motion.p>
      </div>
    </div>
  );
}
