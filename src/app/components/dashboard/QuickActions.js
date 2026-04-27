'use client'

import { motion } from 'framer-motion'
import { Zap, FileText, ArrowRight, ChevronRight } from 'lucide-react'

const actions = [
  {
    id: 'quick-action-email',
    href: '/dashboard/generator?type=email',
    icon: Zap,
    iconBg: 'from-[#7C3AED] to-[#6D28D9]',
    iconGlow: 'rgba(124,58,237,0.35)',
    label: 'Write Cold Email',
    description: 'AI-crafted cold email with subject line variants and 3 tone options. Ready in 30 seconds.',
    tag: 'Most used',
    tagClass: 'badge-violet',
    stats: [
      { value: '30s', label: 'generation time' },
      { value: '3x', label: 'reply rate boost' },
    ],
    cta: 'Write Email',
    ctaStyle: 'violet',
  },
  {
    id: 'quick-action-proposal',
    href: '/dashboard/generator?type=proposal',
    icon: FileText,
    iconBg: 'from-[#0EA5E9] to-[#0284C7]',
    iconGlow: 'rgba(14,165,233,0.3)',
    label: 'Create Proposal',
    description: '1-page PDF proposal — scope, timeline, pricing, and credentials — generated and export-ready.',
    tag: 'Includes PDF',
    tagClass: 'badge-sky',
    stats: [
      { value: '1-page', label: 'clean format' },
      { value: '100%', label: 'PDF ready' },
    ],
    cta: 'Create Proposal',
    ctaStyle: 'sky',
  },
]

export default function QuickActions() {
  return (
    <section id="quick-actions-section" className="grid sm:grid-cols-2 gap-4">
      {actions.map((action, i) => {
        const Icon = action.icon
        return (
          <motion.a
            key={action.id}
            id={action.id}
            href={action.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#27272A] bg-[#18181B] hover:border-[#3F3F46] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6"
          >
            {/* Gradient top accent */}
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${
              action.ctaStyle === 'violet'
                ? 'from-transparent via-[#7C3AED]/60 to-transparent'
                : 'from-transparent via-[#0EA5E9]/50 to-transparent'
            }`} />

            {/* Subtle hover glow */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl ${
              action.ctaStyle === 'violet'
                ? 'bg-[#7C3AED]/04'
                : 'bg-[#0EA5E9]/04'
            }`} />

            {/* Icon + tag row */}
            <div className="flex items-start justify-between mb-4 relative">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.iconBg} flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_var(--glow)]`}
                style={{ '--glow': action.iconGlow }}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className={`badge ${action.tagClass} text-[10px]`}>{action.tag}</span>
            </div>

            {/* Title + description */}
            <h3 className="text-[#F4F4F5] font-bold text-lg mb-1.5 relative">{action.label}</h3>
            <p className="text-[#71717A] text-sm leading-relaxed mb-5 relative flex-1">{action.description}</p>

            {/* Stats row */}
            <div className="flex items-center gap-4 mb-5 relative">
              {action.stats.map(s => (
                <div key={s.label}>
                  <p className={`text-lg font-extrabold ${action.ctaStyle === 'violet' ? 'text-[#A78BFA]' : 'text-[#0EA5E9]'}`}>{s.value}</p>
                  <p className="text-[10px] text-[#52525B] uppercase tracking-wide font-medium">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={`relative flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
              action.ctaStyle === 'violet'
                ? 'bg-[#7C3AED]/15 text-[#A78BFA] group-hover:bg-[#7C3AED] group-hover:text-white'
                : 'bg-[#0EA5E9]/12 text-[#0EA5E9] group-hover:bg-[#0EA5E9] group-hover:text-white'
            }`}>
              {action.cta}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </motion.a>
        )
      })}
    </section>
  )
}
