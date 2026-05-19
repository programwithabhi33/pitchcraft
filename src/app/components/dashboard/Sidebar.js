"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Zap,
  BookMarked,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";
import { useDashboardStore } from "@/app/store/dashboardStore";
import { signOut } from "next-auth/react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const navLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    id: "sidebar-dashboard",
  },
  {
    href: "/dashboard/generator",
    label: "Generator",
    icon: Zap,
    id: "sidebar-generator",
  },
  {
    href: "/dashboard/saved",
    label: "Saved",
    icon: BookMarked,
    id: "sidebar-saved",
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
    id: "sidebar-settings",
  },
];

export default function Sidebar() {
  const { data: user } = useSWR("/api/user/usage", fetcher);
  const { sidebarCollapsed, toggleSidebar, setSidebarCollapsed } =
    useDashboardStore();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  if (!mounted) return null;

  return (
    <>
      {/* ── Mobile Backdrop (Overlay) ── */}
      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarCollapsed(true)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          // DESKTOP: Adjust width normally
          // MOBILE (<1024px): Width is ALWAYS 0 in the flex flow, but visual width is 280 when open
          width:
            typeof window !== "undefined" && window.innerWidth < 1024
              ? 0
              : sidebarCollapsed
                ? 68
                : 240,
          x:
            typeof window !== "undefined" &&
            window.innerWidth < 1024 &&
            sidebarCollapsed
              ? -280
              : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed lg:relative flex-shrink-0 h-screen sticky top-0 flex flex-col bg-[#18181B] border-r border-[#27272A] z-[110] overflow-visible`}
      >
        {/* Visual Sidebar Container (Fixed/Absolute for mobile overlay) */}
        <div
          className={`flex flex-col h-full bg-[#18181B] border-r border-[#27272A] transition-all duration-300 ${
            // On mobile, this part has its own fixed width when the parent aside is 0
            typeof window !== "undefined" && window.innerWidth < 1024
              ? "fixed top-0 left-0 bottom-0 w-[280px]"
              : "w-full"
          }`}
        >
          {/* ── Logo ─────────────────────────────────── */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-[#27272A] h-16 flex-shrink-0">
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-2.5 overflow-hidden"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(124,58,237,0.4)]">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className="text-[#F4F4F5] font-bold text-base tracking-tight whitespace-nowrap">
                    PitchCraft <span className="gradient-text">AI</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {sidebarCollapsed && (
              <div className="hidden lg:flex w-7 h-7 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] items-center justify-center mx-auto flex-shrink-0 shadow-[0_0_12px_rgba(124,58,237,0.4)]">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            )}

            {/* Mobile-only close button */}
            {!sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="lg:hidden p-1.5 rounded-lg hover:bg-[#27272A] text-[#71717A] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* ── Nav links ────────────────────────────── */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-0.5 no-scrollbar">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  id={link.id}
                  onClick={() => {
                    if (
                      typeof window !== "undefined" &&
                      window.innerWidth < 1024
                    )
                      setSidebarCollapsed(true);
                  }}
                  title={sidebarCollapsed ? link.label : undefined}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                    active
                      ? "bg-[#7C3AED]/15 text-[#A78BFA]"
                      : "text-[#71717A] hover:bg-[#27272A] hover:text-[#D4D4D8]"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active-pill"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#7C3AED] rounded-r-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <Icon
                    className={`w-4.5 h-4.5 flex-shrink-0 ${active ? "text-[#A78BFA]" : ""}`}
                    size={18}
                  />

                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.18 }}
                        className="text-sm font-medium whitespace-nowrap overflow-hidden"
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </nav>

          {/* ── User profile footer ─────────────── */}
          <div className="border-t border-[#27272A] p-3 flex-shrink-0">
            <div
              className={`flex items-center gap-3 rounded-xl p-2 hover:bg-[#27272A] transition-colors cursor-pointer ${sidebarCollapsed ? "justify-center" : ""}`}
            >
              <div className="relative flex-shrink-0">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full border border-[#27272A]"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                )}
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10B981] border-2 border-[#18181B]" />
              </div>

              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex-1 overflow-hidden min-w-0"
                  >
                    <p className="text-sm font-semibold text-[#F4F4F5] truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-[#52525B] truncate">
                      {user?.email}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="cursor-pointer text-[#52525B] hover:text-[#F43F5E] transition-colors flex-shrink-0"
                    title="Log out"
                    id="sidebar-logout-btn"
                  >
                    <LogOut size={14} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Desktop Collapse toggle ──────────────────────── */}
        <button
          id="sidebar-collapse-btn"
          onClick={toggleSidebar}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#27272A] border border-[#3F3F46] items-center justify-center text-[#71717A] hover:text-[#F4F4F5] hover:bg-[#3F3F46] transition-all shadow-lg z-50 cursor-pointer"
        >
          {sidebarCollapsed ? (
            <ChevronRight size={12} />
          ) : (
            <ChevronLeft size={12} />
          )}
        </button>
      </motion.aside>
    </>
  );
}
