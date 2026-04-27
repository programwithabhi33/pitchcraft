'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Pencil, Trash2, Mail, FileText, Clock, ChevronDown, CheckCheck } from 'lucide-react'

// Mock outputs — replace with SWR / API hook later
const mockOutputs = [
  {
    id: 'out-1',
    type: 'email',
    title: 'Cold Email — TechStartup NY',
    snippet: 'Hi Sarah, I noticed your post about scaling your MVP with a lean frontend team…',
    date: '2026-04-25',
    tone: 'Confident',
    client: 'Sarah — US Startup',
  },
  {
    id: 'out-2',
    type: 'proposal',
    title: 'Proposal — E-commerce Frontend Rebuild',
    snippet: 'Scope: React migration of legacy jQuery site. Timeline: 4 weeks. Budget: $4,800…',
    date: '2026-04-24',
    tone: null,
    client: 'Shopify Agency, UK',
  },
  {
    id: 'out-3',
    type: 'followup',
    title: 'Follow-up Sequence — DevOps Consulting',
    snippet: 'Day 1: Quick follow-up on my proposal sent yesterday. Day 4: Just checking in…',
    date: '2026-04-23',
    tone: 'Warm',
    client: 'CloudCo, Singapore',
  },
  {
    id: 'out-4',
    type: 'email',
    title: 'Cold Email — Marketing Agency Outreach',
    snippet: "Hi James, your agency's SEO work for Finhaven caught my eye. I specialize in…",
    date: '2026-04-22',
    tone: 'Direct',
    client: 'James — AU Agency',
  },
]

const typeConfig = {
  email: {
    label: 'Cold Email',
    icon: Mail,
    badgeClass: 'badge-violet',
    color: '#7C3AED',
  },
  proposal: {
    label: 'Proposal PDF',
    icon: FileText,
    badgeClass: 'badge-sky',
    color: '#0EA5E9',
  },
  followup: {
    label: 'Follow-up',
    icon: Clock,
    badgeClass: 'badge-emerald',
    color: '#10B981',
  },
}

function OutputCard({ output, index }) {
  const [copied, setCopied] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const config = typeConfig[output.type]
  const Icon = config.icon

  const handleCopy = () => {
    navigator.clipboard?.writeText(output.snippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = () => {
    setDeleted(true)
  }

  if (deleted) return null

  const formattedDate = new Date(output.date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      id={`output-card-${output.id}`}
      className="group relative bg-[#18181B] border border-[#27272A] rounded-2xl p-5 hover:border-[#3F3F46] transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${config.color}18`, color: config.color }}
          >
            <Icon size={15} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#F4F4F5] truncate">{output.title}</p>
            <p className="text-xs text-[#52525B]">{output.client}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className={`badge ${config.badgeClass} text-[9px]`}>{config.label}</span>
        </div>
      </div>

      {/* Snippet */}
      <p className="text-xs text-[#71717A] leading-relaxed line-clamp-2 border-l-2 border-[#27272A] pl-3">
        {output.snippet}
      </p>

      {/* Footer: date + tone + actions */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#52525B] font-medium">{formattedDate}</span>
          {output.tone && (
            <>
              <span className="text-[#27272A]">·</span>
              <span className="text-[10px] text-[#52525B] font-medium">{output.tone}</span>
            </>
          )}
        </div>

        {/* Actions — show on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            id={`output-copy-${output.id}`}
            onClick={handleCopy}
            title="Copy content"
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
              copied
                ? 'bg-[#10B981]/20 text-[#10B981]'
                : 'bg-[#27272A] text-[#71717A] hover:text-[#F4F4F5] hover:bg-[#3F3F46]'
            }`}
          >
            {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
          </button>
          <button
            id={`output-edit-${output.id}`}
            title="Edit"
            className="w-7 h-7 rounded-lg bg-[#27272A] text-[#71717A] hover:text-[#F4F4F5] hover:bg-[#3F3F46] flex items-center justify-center transition-all"
          >
            <Pencil size={12} />
          </button>
          <button
            id={`output-delete-${output.id}`}
            onClick={handleDelete}
            title="Delete"
            className="w-7 h-7 rounded-lg bg-[#27272A] text-[#71717A] hover:text-[#F43F5E] hover:bg-[#F43F5E]/10 flex items-center justify-center transition-all"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      id="empty-state"
      className="col-span-full flex flex-col items-center justify-center py-20 text-center space-y-5"
    >
      {/* Illustration */}
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-[#1E1033] border border-[#7C3AED]/20 flex items-center justify-center">
          <Mail className="w-9 h-9 text-[#7C3AED]/60" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-center">
          <FileText className="w-4 h-4 text-[#0EA5E9]/60" />
        </div>
      </div>

      <div className="space-y-1.5 max-w-xs">
        <h3 className="text-lg font-bold text-[#F4F4F5]">No outputs yet</h3>
        <p className="text-sm text-[#52525B] leading-relaxed">
          Generate your first cold email or proposal and it will appear here.
        </p>
      </div>

      <a
        href="/dashboard/generator"
        id="empty-state-cta"
        className="btn-violet text-sm px-6 py-2.5 flex items-center gap-2"
      >
        <span className="flex items-center gap-2">
          <Mail size={14} />
          Generate Your First Email
        </span>
      </a>
    </motion.div>
  )
}

export default function RecentOutputs({ isEmpty = false }) {
  const outputs = isEmpty ? [] : mockOutputs
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? outputs : outputs.slice(0, 4)

  return (
    <section id="recent-outputs-section" className="space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-bold text-[#F4F4F5]">Recent Outputs</h2>
          {outputs.length > 0 && (
            <span className="badge badge-violet text-[9px] px-2 py-0.5">{outputs.length}</span>
          )}
        </div>
        {outputs.length > 0 && (
          <a
            href="/dashboard/saved"
            id="recent-view-all-link"
            className="text-xs text-[#7C3AED] hover:text-[#A78BFA] font-medium transition-colors"
          >
            View all →
          </a>
        )}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        <AnimatePresence>
          {outputs.length === 0 ? (
            <EmptyState key="empty" />
          ) : (
            visible.map((output, i) => (
              <OutputCard key={output.id} output={output} index={i} />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Show more */}
      {outputs.length > 4 && !showAll && (
        <motion.button
          onClick={() => setShowAll(true)}
          id="recent-show-more-btn"
          className="w-full py-2.5 rounded-xl border border-[#27272A] text-xs font-medium text-[#71717A] hover:text-[#F4F4F5] hover:border-[#3F3F46] transition-all flex items-center justify-center gap-1.5"
        >
          Show more <ChevronDown size={12} />
        </motion.button>
      )}
    </section>
  )
}
