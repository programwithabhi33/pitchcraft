'use client'

import { motion } from 'framer-motion'
import { Lightbulb, RefreshCw } from 'lucide-react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function TipsSidebar() {
  const { data: tip, error, isLoading, mutate } = useSWR('/api/user/tip', fetcher, {
    revalidateOnFocus: false, // Don't refresh tip just because user switched tabs
    revalidateIfStale: false
  })

  return (
    <aside id="tips-sidebar" className="flex flex-col gap-5 w-full">

      {/* ── Dynamic AI Tip ───────────────────────── */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[#27272A] bg-[#1E1033]/40">
          <Lightbulb size={14} className="text-[#F59E0B]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">Outreach Tip</span>
          
          <button 
            onClick={() => mutate()} 
            disabled={isLoading}
            className="ml-auto text-[#52525B] hover:text-[#A78BFA] transition-colors disabled:opacity-30"
            title="Get new tip"
          >
            <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Tip content */}
        <div className="p-4">
          {isLoading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 bg-[#27272A] rounded w-3/4" />
              <div className="h-3 bg-[#27272A] rounded w-full" />
              <div className="h-3 bg-[#27272A] rounded w-5/6" />
            </div>
          ) : (
            <motion.div
              key={tip?.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-2"
            >
              <p className="text-sm font-bold text-[#F4F4F5] leading-snug">
                {tip?.title}
              </p>
              <p className="text-xs text-[#71717A] leading-relaxed">
                {tip?.body}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Vertical Quote Box ─────────────────────── */}
      <div className="p-5 bg-gradient-to-br from-[#18181B] to-[#09090B] border border-[#27272A] rounded-2xl relative overflow-hidden group">
        {/* Decorative subtle gradient glow */}
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#7C3AED]/5 rounded-full blur-2xl group-hover:bg-[#7C3AED]/10 transition-colors" />
        
        <div className="relative flex flex-col gap-3">
          <div className="w-8 h-1 bg-[#7C3AED] rounded-full opacity-50" />
          <p className="text-xs text-[#A1A1AA] italic leading-relaxed font-medium">
            "The best cold emails don't feel like cold emails. They feel like a helpful suggestion from a peer."
          </p>
          <p className="text-[10px] text-[#52525B] font-bold uppercase tracking-widest">— PitchCraft Philosophy</p>
        </div>
      </div>
    </aside>
  )
}
