'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, X, Zap } from 'lucide-react'

// Only shows for free users — pass userPlan prop or integrate with auth store later
export default function UpgradeBanner({ userPlan = 'free' }) {
  const [dismissed, setDismissed] = useState(false)

  if (userPlan !== 'free' || dismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        id="upgrade-banner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, delay: 0.4 }}
        className="sticky bottom-0 left-0 right-0 z-20"
      >
        {/* Inner container */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#1E1033] via-[#2D1060] to-[#1E1033] border-t border-[#7C3AED]/30 px-6 py-3">
          {/* Animated shimmer */}
          <div className="absolute inset-0 animate-shimmer pointer-events-none" />

          <div className="relative max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#7C3AED]/25 flex items-center justify-center flex-shrink-0">
                <Crown size={13} className="text-[#A78BFA]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#F4F4F5] truncate">
                  You have <span className="text-[#F43F5E]">2 free uses left</span> this month
                </p>
                <p className="text-xs text-[#71717A] hidden sm:block">
                  Upgrade to Pro for unlimited emails, proposals &amp; follow-ups — ₹199/month
                </p>
              </div>
            </div>

            {/* Right: CTA + dismiss */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href="/dashboard/upgrade"
                id="banner-upgrade-cta"
                className="btn-violet text-xs px-4 py-2 flex items-center gap-1.5 whitespace-nowrap"
              >
                <span className="flex items-center gap-1.5">
                  <Zap size={12} />
                  Upgrade Now
                </span>
              </a>
              <button
                id="banner-dismiss-btn"
                onClick={() => setDismissed(true)}
                className="text-[#52525B] hover:text-[#A1A1AA] transition-colors p-1.5 rounded-lg hover:bg-[#27272A]"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
