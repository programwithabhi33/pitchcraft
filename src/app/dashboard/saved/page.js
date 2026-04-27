'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, List, LayoutGrid, Download, Trash2, 
  Copy, Edit3, MoreVertical, FileText, Mail, 
  Clock, Send, ChevronDown, CheckCheck
} from 'lucide-react'

// --- Mock Data ---

const MOCK_OUTPUTS = [
  {
    id: 'out-1',
    type: 'email',
    title: 'Cold Email — TechStartup NY',
    snippet: 'Hi Sarah, I noticed your post about scaling your MVP with a lean frontend team. Managing a quick roadmap is tough...',
    date: '2026-04-25',
    client: 'Sarah — US Startup',
    status: 'Sent',
  },
  {
    id: 'out-2',
    type: 'proposal',
    title: 'Proposal — E-commerce Frontend Rebuild',
    snippet: 'Scope: React migration of legacy jQuery site. Timeline: 4 weeks. Budget: $4,800. Deliverables include Figma to code...',
    date: '2026-04-24',
    client: 'Shopify Agency, UK',
    status: 'Draft',
  },
  {
    id: 'out-3',
    type: 'followup',
    title: 'Follow-up Sequence — DevOps Consulting',
    snippet: 'Day 1: Quick follow-up on my proposal sent yesterday. Day 4: Just checking in on the timeline. Day 7: Final touchpoint before I close the loop...',
    date: '2026-04-23',
    client: 'CloudCo, Singapore',
    status: 'Scheduled',
  },
  {
    id: 'out-4',
    type: 'email',
    title: 'Cold Email — Marketing Agency Outreach',
    snippet: 'Hi James, your agency\'s SEO work for Finhaven caught my eye. I specialize in building custom Webflow landing pages for agencies...',
    date: '2026-04-22',
    client: 'James — AU Agency',
    status: 'Draft',
  },
  {
    id: 'out-5',
    type: 'linkedin',
    title: 'Connection Req — Founders',
    snippet: 'Hi Alex, loved your insights on bootstrapping a B2B SaaS. I help technical founders scale their product design...',
    date: '2026-04-20',
    client: 'Alex — EU SaaS',
    status: 'Sent',
  },
  {
    id: 'out-6',
    type: 'proposal',
    title: 'Retainer Agreement — Q3 SEO',
    snippet: 'Monthly deliverables: 4x Blog Posts (2000 words), On-page Technical Audit, 10x High-DA Backlinks...',
    date: '2026-04-18',
    client: 'Fintech Firm, UAE',
    status: 'Sent',
  },
]

const TYPE_CONFIG = {
  email: { label: 'Cold Email', icon: Mail, badge: 'badge-violet', color: '#7C3AED' },
  proposal: { label: 'Proposal', icon: FileText, badge: 'badge-sky', color: '#0EA5E9' },
  followup: { label: 'Sequence', icon: Clock, badge: 'badge-emerald', color: '#10B981' },
  linkedin: { label: 'LinkedIn', icon: Send, badge: 'badge-amber', color: '#F59E0B' },
}

export default function SavedOutputsPage() {
  const [viewMode, setViewMode] = useState('list') // 'list' or 'grid'
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('All')
  
  const [outputs, setOutputs] = useState(MOCK_OUTPUTS)
  const [selectedIds, setSelectedIds] = useState([])
  const [copiedId, setCopiedId] = useState(null)

  // Filter application
  const filteredOutputs = outputs.filter(out => {
    const matchesSearch = out.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          out.snippet.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'All' || out.type === filterType
    return matchesSearch && matchesType
  })

  // Selection
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredOutputs.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredOutputs.map(o => o.id))
    }
  }

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const deleteSelected = () => {
    setOutputs(prev => prev.filter(o => !selectedIds.includes(o.id)))
    setSelectedIds([])
  }

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* ── Page Header ── */}
      <div className="bg-[#09090B] border-b border-[#27272A] px-6 py-6 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto space-y-5">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#F4F4F5]">Saved Library</h1>
              <p className="text-sm text-[#71717A] mt-1">Manage and export your previously generated content.</p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#18181B] p-1 rounded-xl border border-[#27272A] self-start md:self-auto">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#27272A] text-[#F4F4F5] shadow-sm' : 'text-[#71717A] hover:text-[#A1A1AA]'}`}
                title="List View"
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#27272A] text-[#F4F4F5] shadow-sm' : 'text-[#71717A] hover:text-[#A1A1AA]'}`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#18181B] p-3 rounded-2xl border border-[#27272A]">
            
            <div className="flex w-full sm:w-auto items-center gap-3 flex-1">
              {/* Search */}
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search outputs…"
                  className="w-full bg-[#09090B] border border-[#27272A] rounded-xl pl-9 pr-4 py-2 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] transition-colors"
                />
              </div>

              {/* Advanced Filter Placeholder Dropdown */}
              <div className="relative hidden sm:block">
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="appearance-none bg-[#09090B] border border-[#27272A] text-sm text-[#F4F4F5] rounded-xl pl-4 pr-10 py-2 focus:outline-none focus:border-[#7C3AED] transition-colors"
                >
                  <option value="All">All Types</option>
                  <option value="email">Cold Emails</option>
                  <option value="proposal">Proposals</option>
                  <option value="followup">Follow-ups</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B] pointer-events-none" />
              </div>
            </div>

            {/* Bulk Actions (Animate In) */}
            <AnimatePresence>
              {selectedIds.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-2 w-full sm:w-auto overflow-hidden"
                >
                  <div className="text-xs font-semibold text-[#A78BFA] px-2 whitespace-nowrap">
                    {selectedIds.length} selected
                  </div>
                  <button 
                    onClick={deleteSelected}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#F43F5E]/10 text-[#F43F5E] hover:bg-[#F43F5E]/20 transition-colors"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                  <button 
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#27272A] text-[#E4E4E7] hover:bg-[#3F3F46] transition-colors"
                  >
                    <Download size={14} /> Export CSV
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#09090B]">
        <div className="max-w-6xl mx-auto">
          
          {filteredOutputs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#1E1033] border border-[#7C3AED]/20 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-[#A78BFA]/60" />
              </div>
              <h3 className="text-lg font-bold text-[#F4F4F5]">No outputs found</h3>
              <p className="text-sm text-[#A1A1AA] mt-1 max-w-sm">
                Try adjusting your filters or search query to find what you're looking for.
              </p>
            </div>
          ) : (
            viewMode === 'list' ? (
              /* LIST VIEW */
              <div className="bg-[#18181B] border border-[#27272A] rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-[#27272A]/30 border-b border-[#27272A] text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">
                          <input 
                            type="checkbox"
                            className="w-4 h-4 rounded border-[#3F3F46] bg-[#09090B] focus:ring-[#7C3AED] focus:ring-offset-0 text-[#7C3AED]"
                            checked={selectedIds.length === filteredOutputs.length && filteredOutputs.length > 0}
                            onChange={toggleSelectAll}
                          />
                        </th>
                        <th className="py-3 px-4">Output Title</th>
                        <th className="py-3 px-4 w-40">Type</th>
                        <th className="py-3 px-4 w-32">Date</th>
                        <th className="py-3 px-4 w-28 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#27272A]">
                      {filteredOutputs.map(out => {
                        const isSelected = selectedIds.includes(out.id)
                        const config = TYPE_CONFIG[out.type]
                        const isCopied = copiedId === out.id

                        return (
                          <motion.tr 
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={out.id} 
                            className={`group transition-colors ${isSelected ? 'bg-[#7C3AED]/5' : 'hover:bg-[#27272A]/20'}`}
                          >
                            <td className="py-4 px-4 text-center">
                              <input 
                                type="checkbox"
                                className="w-4 h-4 rounded border-[#3F3F46] bg-[#09090B] focus:ring-[#7C3AED] focus:ring-offset-0 text-[#7C3AED]"
                                checked={isSelected}
                                onChange={() => toggleSelect(out.id)}
                              />
                            </td>
                            <td className="py-4 px-4 min-w-0">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${config.color}18`, color: config.color }}>
                                  <config.icon size={15} />
                                </div>
                                <div className="min-w-0 pr-4">
                                  <p className="text-sm font-semibold text-[#F4F4F5] truncate">{out.title}</p>
                                  <p className="text-xs text-[#71717A] truncate mt-0.5">{out.snippet}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <span className={`badge ${config.badge} text-[10px]`}>{config.label}</span>
                            </td>
                            <td className="py-4 px-4 text-xs text-[#A1A1AA] font-medium whitespace-nowrap">
                              {new Date(out.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => handleCopy(out.id, out.snippet)}
                                  className={`p-1.5 rounded-lg transition-colors ${isCopied ? 'text-[#10B981]' : 'text-[#71717A] hover:bg-[#3F3F46] hover:text-[#F4F4F5]'}`}
                                  title="Copy"
                                >
                                  {isCopied ? <CheckCheck size={14} /> : <Copy size={14} />}
                                </button>
                                <button className="p-1.5 rounded-lg text-[#71717A] hover:bg-[#3F3F46] hover:text-[#F4F4F5] transition-colors" title="Edit">
                                  <Edit3 size={14} />
                                </button>
                                <button 
                                  onClick={() => setOutputs(prev => prev.filter(o => o.id !== out.id))}
                                  className="p-1.5 rounded-lg text-[#71717A] hover:bg-[#F43F5E]/10 hover:text-[#F43F5E] transition-colors" 
                                  title="Delete"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* GRID VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence>
                  {filteredOutputs.map((out, idx) => {
                    const isSelected = selectedIds.includes(out.id)
                    const config = TYPE_CONFIG[out.type]
                    const isCopied = copiedId === out.id
                    
                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        key={out.id}
                        className={`group flex flex-col bg-[#18181B] border rounded-2xl p-5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all cursor-default relative ${
                          isSelected ? 'border-[#7C3AED]' : 'border-[#27272A] hover:border-[#3F3F46]'
                        }`}
                        onClick={() => toggleSelect(out.id)}
                      >
                        {isSelected && (
                          <div className="absolute top-0 right-0 w-0 h-0 border-t-[32px] border-l-[32px] border-t-[#7C3AED] border-l-transparent rounded-tr-2xl" />
                        )}
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 text-white z-10 w-3 h-3 flex items-center justify-center">
                            <CheckCheck size={10} strokeWidth={4} />
                          </div>
                        )}

                        <div className="flex items-center gap-3 mb-3 pr-6">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${config.color}18`, color: config.color }}>
                            <config.icon size={18} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm font-bold text-[#F4F4F5] truncate leading-tight">{out.title}</h3>
                            <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider mt-0.5">{out.client}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <span className={`badge ${config.badge} text-[9px]`}>{config.label}</span>
                          <span className="text-[10px] text-[#52525B] font-medium">{out.status}</span>
                        </div>

                        <p className="text-sm text-[#71717A] leading-relaxed line-clamp-3 mb-5 flex-1 relative z-10">
                          {out.snippet}
                        </p>

                        <div className="flex items-center justify-between border-t border-[#27272A] pt-4 mt-auto">
                          <span className="text-[10px] text-[#52525B] font-medium">
                            {new Date(out.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                            <button 
                              onClick={() => handleCopy(out.id, out.snippet)}
                              className={`p-1.5 rounded-lg transition-colors ${isCopied ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-[#27272A] text-[#71717A] hover:bg-[#3F3F46] hover:text-[#F4F4F5]'}`}
                              title="Copy"
                            >
                              {isCopied ? <CheckCheck size={12} /> : <Copy size={12} />}
                            </button>
                            <button className="p-1.5 rounded-lg bg-[#27272A] text-[#71717A] hover:text-[#F4F4F5] hover:bg-[#3F3F46] transition-colors" title="Edit">
                              <Edit3 size={12} />
                            </button>
                          </div>
                        </div>

                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
