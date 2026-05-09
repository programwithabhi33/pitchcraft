'use client'

import { motion } from 'framer-motion'
import { Lightbulb, RefreshCw, Quote } from 'lucide-react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function HorizontalTips() {
  const { data: tip, isLoading, mutate } = useSWR('/api/user/tip', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false
  })

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      
      {/* ── Dynamic AI Tip (Takes 2/3 space) ───────────────────────── */}
      <div className="lg:col-span-2 bg-[#18181B] border border-[#27272A] rounded-2xl overflow-hidden flex flex-col sm:flex-row h-full">
        {/* Left icon/header area */}
        <div className="sm:w-32 bg-[#1E1033]/40 border-b sm:border-b-0 sm:border-r border-[#27272A] p-4 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B]">
            <Lightbulb size={20} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA] text-center hidden sm:block">Outreach Tip</span>
          
          <button 
            onClick={() => mutate()} 
            disabled={isLoading}
            className="p-2 rounded-lg bg-[#27272A] text-[#52525B] hover:text-[#A78BFA] transition-colors disabled:opacity-30"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
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
              <h3 className="text-base font-bold text-[#F4F4F5]">{tip?.title}</h3>
              <p className="text-sm text-[#71717A] leading-relaxed max-w-2xl">
                {tip?.body}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Philosophy Box (Takes 1/3 space) ─────────────────────── */}
      <div className="bg-gradient-to-br from-[#1E1033]/30 to-[#18181B] border border-[#7C3AED]/20 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden group h-full">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#7C3AED]/5 rounded-full blur-2xl" />
        
        <div className="relative space-y-3">
          <Quote size={20} className="text-[#7C3AED] opacity-40" />
          <p className="text-xs text-[#A1A1AA] italic leading-relaxed font-medium">
            "The best cold emails don't feel like cold emails. They feel like a helpful suggestion from a peer."
          </p>
          <div className="pt-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#52525B] border-t border-[#27272A] pt-2 inline-block w-full">
              — PitchCraft AI
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
