'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Bell, Search } from 'lucide-react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardHeader() {
  const { data: user, error } = useSWR('/api/user/usage', fetcher)
  const greeting = useMemo(() => getGreeting(), [])
  
  const used = user?.usageCount || 0
  const total = user?.totalLimit || 10
  const pct = (used / total) * 100

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[#27272A] bg-[#18181B] h-16 flex-shrink-0 sticky top-0 z-20">

      {/* Left: Greeting */}
      <div>
        <h1 className="text-lg font-bold text-[#F4F4F5] leading-tight truncate">
          {greeting}, {user?.name?.split(' ')[0] || 'there'} 👋
        </h1>
        <p className="text-xs text-[#52525B]">Here's your workspace</p>
      </div>

      {/* Right: Search + usage pill + notifications */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 w-52 hover:border-[#3F3F46] transition-colors">
          <Search size={14} className="text-[#52525B]" />
          <input
            id="dashboard-search"
            type="text"
            placeholder="Search outputs…"
            className="bg-transparent text-sm text-[#A1A1AA] placeholder-[#52525B] outline-none w-full"
          />
          <kbd className="text-[10px] text-[#3F3F46] px-1.5 py-0.5 rounded bg-[#18181B] border border-[#27272A] font-mono">⌘K</kbd>
        </div>

        {/* Usage pill */}
        {!error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            id="dashboard-usage-pill"
            className="hidden sm:flex items-center gap-2.5 bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2"
          >
            {/* Mini progress bar */}
            <div className="relative w-20 h-1.5 bg-[#27272A] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className={`absolute inset-y-0 left-0 rounded-full ${
                  pct >= 80 ? 'bg-[#F43F5E]' : pct >= 60 ? 'bg-[#F59E0B]' : 'bg-[#7C3AED]'
                }`}
              />
            </div>

            <span className="text-xs font-semibold text-[#A1A1AA] whitespace-nowrap">
              <span className={pct >= 80 ? 'text-[#F43F5E]' : 'text-[#F4F4F5]'}>
                {used}
              </span>
              <span className="text-[#52525B]"> of {total} free uses</span>
            </span>

            {user?.plan === 'free' && (
              <a
                href="/dashboard/upgrade"
                id="header-upgrade-link"
                className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] hover:text-[#A78BFA] transition-colors whitespace-nowrap"
              >
                Upgrade →
              </a>
            )}
          </motion.div>
        )}

        {/* Notifications */}
        <button
          id="dashboard-notifications-btn"
          className="relative w-9 h-9 rounded-xl bg-[#09090B] border border-[#27272A] flex items-center justify-center text-[#71717A] hover:text-[#F4F4F5] hover:border-[#3F3F46] transition-all"
        >
          <Bell size={16} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
        </button>
      </div>
    </header>
  )
}
