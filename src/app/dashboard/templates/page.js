'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Tabs from '@radix-ui/react-tabs'
import { Search, Filter, Star, Mail, FileText, Clock, Send, X, ArrowRight, Edit3 } from 'lucide-react'

// --- Mock Data ---

const CATEGORIES = ['All', 'IT Services', 'Design', 'Marketing', 'Finance', 'Legal', 'HR']

const TABS = [
  { id: 'all', label: 'All Templates' },
  { id: 'email', label: 'Emails' },
  { id: 'proposal', label: 'Proposals' },
  { id: 'followup', label: 'Follow-ups' },
  { id: 'linkedin', label: 'LinkedIn' },
]

const TEMPLATES = [
  {
    id: 1,
    name: 'Tech Startup Intro',
    type: 'email',
    typeBadge: 'Cold Email',
    badgeClass: 'badge-violet',
    icon: Mail,
    iconColor: '#7C3AED',
    industry: 'IT Services',
    rating: 4.9,
    uses: '1.2k',
    preview: 'A high-converting intro for dev agencies pitching startups. Focuses on shipping speed and clean architecture.',
    fullText: `Subject: Scaling {{Client Company}}'s MVP
    
Hi {{First Name}},

I noticed your recent announcement about the seed round—congratulations! As you move to scale the product, engineering bottlenecks are usually the first hurdle.

I help startups like {{Client Company}} accelerate their feature delivery using modern React stacks. We integrate directly with your team to clear the backlog and ship production-ready code.

Are you open to a quick 10-minute chat next week to see if there's a fit?

Best,
{{Your Name}}`
  },
  {
    id: 2,
    name: 'Website Redesign Scope',
    type: 'proposal',
    typeBadge: 'Proposal',
    badgeClass: 'badge-sky',
    icon: FileText,
    iconColor: '#0EA5E9',
    industry: 'Design',
    rating: 4.8,
    uses: '850',
    preview: 'Comprehensive 1-page proposal for a full website overhaul including UX discovery, design, and Next.js development.',
    fullText: `# Website Redesign Proposal

## 1. Executive Summary
We will modernize your digital presence to increase conversion rates and ensure mobile responsiveness.

## 2. Project Scope
- UX Audit & User Journey Mapping
- High-fidelity UI Design (Figma)
- Frontend Development (Next.js + Tailwind)

## 3. Timeline
The project will take approximately 6 weeks from kickoff to launch.

## 4. Investment
Fixed cost: $8,500.`
  },
  {
    id: 3,
    name: 'SaaS Founder Outreach',
    type: 'linkedin',
    typeBadge: 'LinkedIn',
    badgeClass: 'badge-amber',
    icon: Send,
    iconColor: '#F59E0B',
    industry: 'IT Services',
    rating: 4.7,
    uses: '2.1k',
    preview: 'Short, punchy LinkedIn connection request tailored for reaching out to B2B SaaS founders.',
    fullText: `Hi {{First Name}}, loved your recent post on bootstrapped growth. I specialize in helping B2B SaaS companies scale their frontend engineering without the overhead of full-time hires. Would love to connect and follow your journey!`
  },
  {
    id: 4,
    name: 'SEO Monthly Retainer',
    type: 'proposal',
    typeBadge: 'Proposal',
    badgeClass: 'badge-sky',
    icon: FileText,
    iconColor: '#0EA5E9',
    industry: 'Marketing',
    rating: 4.6,
    uses: '620',
    preview: 'Standardized retainer proposal for monthly SEO and content marketing services.',
    fullText: `# SEO Retainer Proposal

## 1. Overview
Consistent organic growth requires long-term execution. This proposal outlines our monthly SEO strategy.

## 2. Deliverables (Monthly)
- 4x Optimized Blog Posts
- 10x High-DA Backlinks
- Strategy calls & reporting

## 3. Pricing
$1,500 / month (cancel anytime).`
  },
  {
    id: 5,
    name: 'Post-Proposal Check-in',
    type: 'followup',
    typeBadge: 'Sequence',
    badgeClass: 'badge-emerald',
    icon: Clock,
    iconColor: '#10B981',
    industry: 'Finance',
    rating: 4.9,
    uses: '3.4k',
    preview: 'A gentle 3-step sequence designed to bump a sent proposal without sounding pushy.',
    fullText: `**Day 1**
Hi {{First Name}},
Just making sure you received the proposal I sent over yesterday. Let me know if you have any questions!

**Day 4**
Hi {{First Name}},
Checking in. I know how busy it gets. If now isn't the right time, just let me know.

**Day 7**
Hi {{First Name}},
I'll assume priorities have shifted for now. Keep me in mind for the future!`
  },
  {
    id: 6,
    name: 'Recruiter Toolkit',
    type: 'email',
    typeBadge: 'Cold Email',
    badgeClass: 'badge-violet',
    icon: Mail,
    iconColor: '#7C3AED',
    industry: 'HR',
    rating: 4.5,
    uses: '410',
    preview: 'Email template for selling HR software solutions to mid-market recruiting teams.',
    fullText: `Subject: Faster candidate sourcing for {{Client Company}}

Hi {{First Name}},

Sourcing top talent takes up 40% of a recruiter's week. 

Our toolkit automates pipeline generation, letting your team focus on interviewing rather than hunting. On average, our clients reduce time-to-hire by 15 days.

Open to a brief demo on Thursday?`
  }
]

// --- Components ---

export default function TemplatesPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(null) // For Modal

  // Filter logic
  const filteredTemplates = TEMPLATES.filter(template => {
    const matchesTab = activeTab === 'all' || template.type === activeTab
    const matchesCategory = activeCategory === 'All' || template.industry === activeCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.preview.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesCategory && matchesSearch
  })

  // Prevent background scrolling when modal is open
  if (typeof window !== 'undefined') {
    document.body.style.overflow = selectedTemplate ? 'hidden' : 'auto'
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* ── Page Header ── */}
      <div className="bg-[#09090B] border-b border-[#27272A] px-6 py-6 pb-0 sticky top-0 z-10 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#F4F4F5]">Template Library</h1>
              <p className="text-sm text-[#71717A] mt-1">Start fast with pre-built, high-converting templates.</p>
            </div>
            
            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates…"
                className="w-full bg-[#18181B] border border-[#27272A] rounded-xl pl-9 pr-4 py-2 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] transition-colors"
              />
            </div>
          </div>

          {/* Radix Tabs */}
          <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
            <Tabs.List className="flex items-center gap-6 border-b border-[#27272A] overflow-x-auto no-scrollbar">
              {TABS.map(tab => (
                <Tabs.Trigger
                  key={tab.id}
                  value={tab.id}
                  className="relative pb-3 text-sm font-semibold transition-colors whitespace-nowrap focus:outline-none data-[state=active]:text-[#F4F4F5] data-[state=inactive]:text-[#71717A] data-[state=inactive]:hover:text-[#A1A1AA]"
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="template-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C3AED] rounded-t-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="flex-1 bg-[#09090B] p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            <div className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold text-[#52525B] uppercase tracking-wider mr-2">
              <Filter size={14} /> Filters
            </div>
            
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                  activeCategory === category
                    ? 'bg-[#E4E4E7] text-[#09090B] border-[#E4E4E7]'
                    : 'bg-[#18181B] text-[#A1A1AA] border-[#27272A] hover:bg-[#27272A] hover:text-[#F4F4F5]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filteredTemplates.map((template, idx) => {
                const Icon = template.icon
                return (
                  <motion.div
                    key={template.id}
                    layoutId={`card-${template.id}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    onClick={() => setSelectedTemplate(template)}
                    className="group flex flex-col bg-[#18181B] border border-[#27272A] rounded-2xl p-5 cursor-pointer hover:border-[#3F3F46] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Hover subtle glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300" style={{ background: template.iconColor }} />

                    <div className="flex items-start justify-between gap-3 mb-3 relative">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${template.iconColor}18`, color: template.iconColor }}
                        >
                          <Icon size={18} />
                        </div>
                        <h3 className="text-base font-bold text-[#F4F4F5] leading-tight">{template.name}</h3>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2 mb-4 relative">
                      <span className={`badge ${template.badgeClass}`}>{template.typeBadge}</span>
                      <span className="text-[10px] text-[#A1A1AA] px-2 py-0.5 rounded-full border border-[#27272A] bg-[#09090B]">{template.industry}</span>
                    </div>

                    <p className="text-sm text-[#71717A] leading-relaxed line-clamp-2 mb-5 relative flex-1">
                      {template.preview}
                    </p>

                    <div className="flex items-center justify-between border-t border-[#27272A] pt-4 relative">
                      <div className="flex items-center gap-1 text-[#F59E0B]">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs font-bold text-[#F4F4F5]">{template.rating}</span>
                        <span className="text-[10px] text-[#52525B] ml-1">({template.uses})</span>
                      </div>
                      
                      <div className="text-xs font-semibold text-[#A1A1AA] group-hover:text-[#F4F4F5] flex items-center gap-1 transition-colors">
                        Preview <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {filteredTemplates.length === 0 && (
              <div className="col-span-full py-20 text-center text-[#A1A1AA]">
                No templates found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Modal / Sidebar Drawer ── */}
      <AnimatePresence>
        {selectedTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTemplate(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Dialog */}
            <motion.div
              layoutId={`card-${selectedTemplate.id}`}
              className="relative w-full h-full md:h-auto md:max-w-3xl bg-[#18181B] border border-[#27272A] md:rounded-2xl shadow-2xl flex flex-col md:max-h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-[#27272A]">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${selectedTemplate.iconColor}18`, color: selectedTemplate.iconColor }}
                  >
                    <selectedTemplate.icon size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#F4F4F5] leading-tight">{selectedTemplate.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`badge ${selectedTemplate.badgeClass} text-[9px]`}>{selectedTemplate.typeBadge}</span>
                      <span className="text-xs text-[#71717A]">• {selectedTemplate.industry}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedTemplate(null)}
                  className="p-2 text-[#71717A] hover:text-[#F4F4F5] hover:bg-[#27272A] rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 bg-[#09090B]">
                <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-5 shadow-inner">
                  <pre className="text-sm text-[#D4D4D8] whitespace-pre-wrap font-sans leading-relaxed">
                    {selectedTemplate.fullText}
                  </pre>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-5 border-t border-[#27272A] bg-[#18181B]">
                <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#A1A1AA] hover:text-[#F4F4F5] bg-[#27272A] hover:bg-[#3F3F46] rounded-xl transition-all">
                  <Edit3 size={16} /> Customize
                </button>
                <a 
                  href={`/dashboard/generator?templateId=${selectedTemplate.id}`} 
                  className="btn-violet px-6 py-2.5 text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                >
                  Use Template <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
