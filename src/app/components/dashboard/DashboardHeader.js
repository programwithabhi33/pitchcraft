"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import useSWR from "swr";
import { useDashboardStore } from "@/app/store/dashboardStore";

const fetcher = (url) => fetch(url).then((res) => res.json());

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardHeader() {
  const { data: user } = useSWR("/api/user/usage", fetcher);
  const { setSidebarCollapsed } = useDashboardStore();
  const greeting = useMemo(() => getGreeting(), []);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[#27272A] bg-[#18181B] h-16 flex-shrink-0 sticky top-0 z-20">
      {/* Left: Mobile Menu Toggle + Greeting */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button - Only visible < lg */}
        <button
          onClick={() => setSidebarCollapsed(false)}
          className="lg:hidden p-2 rounded-xl bg-[#09090B] border border-[#27272A] text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors cursor-pointer"
        >
          <Menu size={18} />
        </button>

        <div>
          <h1 className="text-lg font-bold text-[#F4F4F5] leading-tight truncate">
            {greeting}, {user?.name?.split(" ")[0] || "there"} 👋
          </h1>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Placeholder for any future header actions */}
      </div>
    </header>
  );
}
