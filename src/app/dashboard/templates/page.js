'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, List, LayoutGrid, Trash2, 
  Copy, Mail, ChevronLeft, ChevronRight,
  Loader2, CheckCheck
} from 'lucide-react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

const TYPE_CONFIG = {
  cold_email: { label: 'Cold Email', icon: Mail, badge: 'badge-violet', color: '#7C3AED' },
}

export default function TemplatesPage() {
  const [activeCategory, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState(null)

  const CATEGORIES = [
    { id: 'All', label: 'All Templates' },
    { id: 'saas', label: 'SaaS' },
    { id: 'agency', label: 'Agency' },
    { id: 'freelance', label: 'Freelance' },
  ]

  const TEMPLATES = [
    {
      id: 'temp-1',
      name: 'Quick Startup Intro',
      category: 'saas',
      preview: 'Hi {name}, noticed your recent scaling post. I help startups ship clean frontend features...',
      fullText: 'Hi {name},\n\nI noticed your recent post about scaling the MVP. Managing a fast-paced product roadmap is tough, especially when the frontend starts to slow down feature delivery.\n\nI specialize in early-stage startups and help teams ship maintainable features without the overhead of a full-time hire.\n\nWould you be open to a quick chat?\n\nBest,\n{your_name}',
    },
    {
      id: 'temp-2',
      name: 'Agency White-label',
      category: 'agency',
      preview: 'Hey {name}, your SEO work for {client} caught my eye. We handle the development while you...',
      fullText: 'Hey {name},\n\nYour agency\'s SEO work for {client} caught my eye. I specialize in building custom high-performance landing pages for marketing agencies.\n\nWe handle the technical development while you focus on the strategy. It’s a perfect white-label fit.\n\nInterested in seeing some of our recent builds?\n\nCheers,\n{your_name}',
    },
  ]

  const filtered = TEMPLATES.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.preview.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat = activeCategory === 'All' || t.category === activeCategory
    return matchesSearch && matchesCat
  })

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-[#09090B] border-b border-[#27272A] px-6 py-6 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-[#F4F4F5]">Email Templates</h1>
            <p className="text-sm text-[#71717A] mt-1">Proven outreach structures for different industries.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
             <div className="flex items-center gap-1 bg-[#18181B] p-1 rounded-xl border border-[#27272A] overflow-x-auto no-scrollbar">
               {CATEGORIES.map(cat => (
                 <button
                   key={cat.id}
                   onClick={() => setActiveTab(cat.id)}
                   className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                     activeCategory === cat.id ? 'bg-[#27272A] text-[#F4F4F5]' : 'text-[#71717A] hover:text-[#A1A1AA]'
                   }`}
                 >
                   {cat.label}
                 </button>
               ))}
             </div>

             <div className="relative flex-1 w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates…"
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl pl-9 pr-4 py-2 text-sm text-[#F4F4F5] focus:outline-none focus:border-[#7C3AED]"
                />
              </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto bg-[#09090B]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(temp => (
              <div 
                key={temp.id}
                className="bg-[#18181B] border border-[#27272A] rounded-2xl p-5 hover:border-[#3F3F46] transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED]">
                    <Mail size={18} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#52525B]">{temp.category}</span>
                </div>
                
                <h3 className="text-sm font-bold text-[#F4F4F5] mb-2">{temp.name}</h3>
                <p className="text-xs text-[#71717A] leading-relaxed line-clamp-3 mb-6">{temp.preview}</p>
                
                <button 
                  onClick={() => handleCopy(temp.id, temp.fullText)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    copiedId === temp.id ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-[#27272A] text-[#F4F4F5] hover:bg-[#3F3F46]'
                  }`}
                >
                  {copiedId === temp.id ? <CheckCheck size={14} /> : <Copy size={14} />}
                  {copiedId === temp.id ? 'Copied' : 'Copy Template'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
