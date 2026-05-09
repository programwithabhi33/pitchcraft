'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, BookMarked, Settings, User } from 'lucide-react'

const actions = [
  {
    id: 'quick-action-email',
    href: '/dashboard/generator',
    icon: Zap,
    iconColor: '#7C3AED',
    label: 'Generate Cold Email',
    description: 'Create a hyper-personalized outreach email in any tone.',
    cta: 'Start Writing',
  },
  {
    id: 'quick-action-history',
    href: '/dashboard/saved',
    icon: BookMarked,
    iconColor: '#10B981',
    label: 'View Saved Library',
    description: 'Access your previous winning generations and templates.',
    cta: 'Browse History',
  },
  {
    id: 'quick-action-settings',
    href: '/dashboard/settings',
    icon: User,
    iconColor: '#F59E0B',
    label: 'Complete Profile',
    description: 'Setup your sender profile to auto-fill generator fields.',
    cta: 'Go to Settings',
  },
]

export default function QuickActions() {
  return (
    <div id="quick-actions-grid" className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action, i) => {
        const Icon = action.icon
        return (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            key={action.id}
          >
            <Link
              href={action.href}
              className="group block h-full bg-[#18181B] border border-[#27272A] rounded-2xl p-5 hover:border-[#3F3F46] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${action.iconColor}12`, color: action.iconColor }}
              >
                <Icon size={20} />
              </div>
              
              <h3 className="text-sm font-bold text-[#F4F4F5] mb-1.5">{action.label}</h3>
              <p className="text-xs text-[#71717A] leading-relaxed mb-5">
                {action.description}
              </p>
              
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#A78BFA] uppercase tracking-wider group-hover:gap-2.5 transition-all">
                {action.cta}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
