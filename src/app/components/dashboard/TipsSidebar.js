'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, ChevronRight, Crown, Zap, Star, ArrowRight } from 'lucide-react'

const tips = [
  {
    id: 'tip-1',
    icon: '✉️',
    title: 'Lead with a specific trigger',
    body: 'Mention something specific about the client — a post they made, a product launch, or a recent hire. Generic openers die in inbox.',
  },
  {
    id: 'tip-2',
    icon: '⏱️',
    title: 'Follow up on Day 4, not Day 7',
    body: 'Research shows 60% of replies to cold emails come after the second touchpoint. PitchCraft generates your Day 4 email automatically.',
  },
  {
    id: 'tip-3',
    icon: '🎯',
    title: 'One ask per email',
    body: 'Don\'t ask for a call, a review, and a referral together. One clear CTA per email dramatically increases response rates.',
  },
  {
    id: 'tip-4',
    icon: '📊',
    title: 'Subject lines under 6 words',
    body: 'Short subject lines outperform long ones on mobile. Use PitchCraft\'s subject line variants and pick the sharpest one.',
  },
]

const proFeatures = [
  { icon: Zap, label: 'Unlimited cold emails' },
  { icon: Star, label: 'All 3 tone presets' },
  { icon: Crown, label: 'LinkedIn messages' },
]

export default function TipsSidebar({ userPlan = 'free' }) {
  const [currentTip, setCurrentTip] = useState(0)
  const tip = tips[currentTip]

  return (
    <aside id="tips-sidebar" className="flex flex-col gap-5 w-full">

      {/* ── Tip of the Day ───────────────────────── */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[#27272A] bg-[#1E1033]/40">
          <Lightbulb size={14} className="text-[#F59E0B]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">Tip of the Day</span>
          <span className="ml-auto text-[10px] text-[#52525B]">
            {currentTip + 1}/{tips.length}
          </span>
        </div>

        {/* Tip content */}
        <div className="p-4 space-y-2.5">
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{tip.icon}</span>
              <p className="text-sm font-semibold text-[#F4F4F5] leading-snug">{tip.title}</p>
            </div>
            <p className="text-xs text-[#71717A] leading-relaxed">{tip.body}</p>
          </motion.div>

          {/* Dots navigation */}
          <div className="flex items-center gap-1.5 pt-1">
            {tips.map((_, i) => (
              <button
                key={i}
                id={`tip-dot-${i}`}
                onClick={() => setCurrentTip(i)}
                className={`h-1 rounded-full transition-all duration-200 ${
                  i === currentTip
                    ? 'w-4 bg-[#7C3AED]'
                    : 'w-1.5 bg-[#27272A] hover:bg-[#3F3F46]'
                }`}
              />
            ))}
            <button
              id="tip-next-btn"
              onClick={() => setCurrentTip((c) => (c + 1) % tips.length)}
              className="ml-auto text-[#52525B] hover:text-[#A1A1AA] transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Upgrade prompt (free plan only) ──────── */}
      {userPlan === 'free' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          id="upgrade-sidebar-card"
          className="relative overflow-hidden rounded-2xl border border-[#7C3AED]/30 bg-gradient-to-b from-[#1E1033] to-[#18181B] p-5"
        >
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-[#7C3AED]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#7C3AED]/20 flex items-center justify-center">
                <Crown size={14} className="text-[#A78BFA]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#F4F4F5]">Upgrade to Pro</p>
                <p className="text-[10px] text-[#52525B]">₹199/month · No lock-in</p>
              </div>
            </div>

            <ul className="space-y-2">
              {proFeatures.map(f => {
                const Icon = f.icon
                return (
                  <li key={f.label} className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                    <Icon size={11} className="text-[#7C3AED] flex-shrink-0" />
                    {f.label}
                  </li>
                )
              })}
            </ul>

            <a
              href="/dashboard/upgrade"
              id="sidebar-upgrade-cta"
              className="btn-violet w-full text-center text-xs py-2.5 flex items-center justify-center gap-1.5"
            >
              <span className="flex items-center gap-1.5">
                Upgrade Now
                <ArrowRight size={12} />
              </span>
            </a>
          </div>
        </motion.div>
      )}

      {/* ── Activity summary ─────────────────────── */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-4 space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-[#52525B]">This Month</p>
        <div className="space-y-2.5">
          {[
            { label: 'Emails Generated', value: 3, color: '#7C3AED', max: 5 },
            { label: 'Proposals Created', value: 1, color: '#0EA5E9', max: 5 },
            { label: 'Follow-ups Sent', value: 1, color: '#10B981', max: 5 },
          ].map(stat => (
            <div key={stat.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#71717A]">{stat.label}</span>
                <span className="text-xs font-semibold text-[#A1A1AA]">{stat.value}/{stat.max}</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#27272A] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{ background: stat.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
