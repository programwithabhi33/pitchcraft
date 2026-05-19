"use client";

import { motion } from "framer-motion";
import { Lightbulb, RefreshCw, Quote } from "lucide-react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function HorizontalTips() {
  const {
    data: tip,
    isLoading,
    mutate,
  } = useSWR("/api/user/tip", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  return (
    <section className="grid grid-cols-1 gap-4">
      {/* ── Dynamic AI Tip (Takes 2/3 space) ───────────────────────── */}
      <div className="lg:col-span-2 bg-[#18181B] border border-[#27272A] rounded-2xl overflow-hidden flex flex-col sm:flex-row h-full">
        {/* Left icon/header area */}
        <div className="sm:w-32 bg-[#1E1033]/40 border-b sm:border-b-0 sm:border-r border-[#27272A] p-4 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B]">
            <Lightbulb size={20} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA] text-center hidden sm:block">
            Outreach Tip
          </span>

          <button
            onClick={() => mutate()}
            disabled={isLoading}
            className="cursor-pointer p-2 rounded-lg bg-[#27272A] text-[#52525B] hover:text-[#A78BFA] transition-colors disabled:opacity-30"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Tip content */}
        <div className="flex-1 p-6 flex flex-col justify-center min-h-[120px]">
          {isLoading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-[#27272A] rounded w-1/3" />
              <div className="h-3 bg-[#27272A] rounded w-full" />
              <div className="h-3 bg-[#27272A] rounded w-5/6" />
            </div>
          ) : (
            <motion.div
              key={tip?.title}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <h3 className="text-base font-bold text-[#F4F4F5]">
                {tip?.title}
              </h3>
              <p className="text-sm text-[#71717A] leading-relaxed">
                {tip?.body}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
