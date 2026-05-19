"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Mail,
  CheckCheck,
  RefreshCw,
  BookmarkPlus,
  Zap,
  Building2,
  User,
  Target,
  Lightbulb,
} from "lucide-react";
import { Copy } from "lucide-react";

const demoLines = [
  { label: "Subject", value: "Re: Your React project — let's talk" },
  {
    label: "Opening",
    value: "Hi Sarah, I noticed your post about scaling your MVP…",
  },
  {
    label: "Offer",
    value: "I help US startups ship clean React frontends in 3–4 weeks.",
  },
  {
    label: "CTA",
    value: "Free 20-min call this week? I've kept 2 slots open.",
  },
];

function TypingDemo() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | pause | erase

  useEffect(() => {
    const currentLine = demoLines[lineIdx];
    if (phase === "typing") {
      if (charIdx < currentLine.value.length) {
        const t = setTimeout(() => setCharIdx((c) => c + 1), 30);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pause"), 2000);
        return () => clearTimeout(t);
      }
    }
    if (phase === "pause") {
      const t = setTimeout(() => setPhase("erase"), 800);
      return () => clearTimeout(t);
    }
    if (phase === "erase") {
      if (charIdx > 0) {
        const t = setTimeout(() => setCharIdx((c) => c - 1), 15);
        return () => clearTimeout(t);
      } else {
        setLineIdx((i) => (i + 1) % demoLines.length);
        setPhase("typing");
      }
    }
  }, [charIdx, phase, lineIdx]);

  return (
    <div className="space-y-3">
      {demoLines.map((line, i) => (
        <div key={line.label} className="flex gap-3 items-start group">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#7C3AED] w-14 flex-shrink-0 pt-1 opacity-70">
            {line.label}
          </span>
          <p className="text-sm text-[#E4E4E7] leading-relaxed">
            {i < lineIdx ? (
              line.value
            ) : i === lineIdx ? (
              <>
                {line.value.slice(0, charIdx)}
                <span className="inline-block w-1 h-3.5 bg-[#A78BFA] ml-1 animate-pulse" />
              </>
            ) : (
              <span className="text-[#27272A]">
                {"•".repeat(Math.min(line.value.length, 20))}
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#09090B]"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 mesh-grid opacity-[0.15]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        {/* ─── Left: Content ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 text-center lg:text-left z-20"
        >
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <span className="badge badge-sky">30-Second Outreach</span>
            <span className="badge badge-violet">AI-Powered</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#F4F4F5]">
            Win More Clients with <br />
            <span className="gradient-text-hero">AI-Powered</span> <br />
            Cold Emails
          </h1>

          <p className="text-base md:text-lg text-[#A1A1AA] leading-relaxed max-w-xl mx-auto lg:mx-0">
            Fill in 4 fields. Get a polished, high-conversion cold email in
            seconds. Stop staring at a blank page and start winning project
            after project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="/auth"
              className="w-full sm:w-auto btn-violet text-base px-8 py-4 flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <Zap size={18} fill="currentColor" />
                Generate My First Email
              </span>
            </a>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto btn-outline text-base px-8 py-4 flex items-center justify-center gap-2 cursor-pointer"
            >
              See How It Works
            </a>
          </div>

          {/* 50/50 Grid for Badges */}
          <div className="grid grid-cols-2 gap-4 pt-4 max-w-lg mx-auto lg:mx-0">
            {[
              { icon: "⚡", label: "Instant results" },
              { icon: "🎯", label: "Subject Variants" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 bg-[#18181B] border border-[#27272A] rounded-2xl px-4 py-4 hover:border-[#3F3F46] transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-bold text-[#F4F4F5]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Right: Dashboard Preview ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 w-full"
        >
          {/* Main Container simulating the 2-panel Generator */}
          <div className="bg-[#18181B] border border-[#27272A] rounded-3xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.6)] flex flex-col h-[520px] md:h-[580px]">
            {/* Fake Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-[#27272A] bg-[#09090B]/50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3F3F46]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#3F3F46]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#3F3F46]" />
              </div>
              <div className="badge text-[10px] text-[#A78BFA] bg-[#7C3AED]/10 border border-[#7C3AED]/20">
                Cold Email Generator
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Left Panel: Fake Form */}
              <div className="hidden md:flex w-[40%] flex-col border-r border-[#27272A] bg-[#09090B]/30 p-5 space-y-6">
                <div className="space-y-4">
                  <div className="h-2 w-12 bg-[#27272A] rounded-full" />
                  <div className="h-9 w-full bg-[#18181B] border border-[#27272A] rounded-xl" />
                  <div className="h-2 w-16 bg-[#27272A] rounded-full" />
                  <div className="h-9 w-full bg-[#18181B] border border-[#27272A] rounded-xl" />
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-14 bg-[#27272A] rounded-full" />
                  <div className="h-9 w-full bg-[#18181B] border border-[#27272A] rounded-xl" />
                  <div className="h-20 w-full bg-[#18181B] border border-[#27272A] rounded-xl" />
                </div>
                <div className="pt-2">
                  <div className="h-10 w-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 rounded-xl" />
                </div>
              </div>

              {/* Right Panel: Output Preview */}
              <div className="flex-1 flex flex-col bg-[#18181B]">
                {/* Action Bar */}
                <div className="px-5 py-3.5 border-b border-[#27272A] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">
                      Ready to use
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-7 h-7 rounded-lg bg-[#27272A] flex items-center justify-center">
                      <Mail size={12} className="text-[#A1A1AA]" />
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-[#27272A] flex items-center justify-center">
                      <Copy size={12} className="text-[#A1A1AA]" />
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-[#27272A] flex items-center justify-center">
                      <RefreshCw size={12} className="text-[#A1A1AA]" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
                  <div className="bg-[#1E1033]/40 border border-[#7C3AED]/20 rounded-xl p-4 mb-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#A78BFA] mb-2 flex items-center gap-1.5">
                      <Lightbulb size={12} /> Subject Variants
                    </h4>
                    <div className="space-y-1.5">
                      <div className="h-3 w-3/4 bg-[#A78BFA]/20 rounded-full" />
                      <div className="h-3 w-5/6 bg-[#A78BFA]/20 rounded-full" />
                    </div>
                  </div>
                  <TypingDemo />
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-[#27272A] bg-[#09090B]/40 text-center">
                  <span className="text-[9px] font-mono text-[#52525B] tracking-widest uppercase">
                    AI Generated Outreach
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Accents */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#7C3AED]/20 rounded-full blur-3xl" />
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#0EA5E9]/10 rounded-full blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
