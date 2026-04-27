'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { User, Briefcase, Building2, Target, Lightbulb, Zap, MessageSquare } from 'lucide-react'

// Tone selector options
const TONES = [
  { id: 'Formal', label: 'Formal' },
  { id: 'Friendly', label: 'Friendly' },
  { id: 'Bold', label: 'Bold' },
]

export default function GeneratorForm({ activeTab, isGenerating, onGenerate }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      role: '',
      service: '',
      clientName: '',
      clientIndustry: '',
      projectType: '',
      context: '',
      tone: 'Friendly',
    }
  })

  // We keep a local state for the radio selector so we can easily map the UI
  const [selectedTone, setSelectedTone] = useState('Friendly')

  const onSubmit = (data) => {
    onGenerate({ ...data, tone: selectedTone })
  }

  // Determine what placeholers to show based on activeTab
  const placeholders = {
    role: "e.g. Arjun, React Developer",
    service: "e.g. Frontend MVP Builds",
    clientName: "e.g. Acme Startup",
    clientIndustry: "e.g. FinTech / SaaS",
    projectType: "e.g. Dashboard Rewrite",
    context: activeTab === 'linkedin' 
      ? "e.g. Saw their recent post about engineering leadership."
      : "e.g. Budget is tight, focus on speed to market.",
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Your details */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[#A1A1AA] flex items-center gap-2 uppercase tracking-wide">
            <User size={14} className="text-[#7C3AED]" /> You
          </h3>
          
          <div className="space-y-1">
            <label className="text-xs text-[#A1A1AA] font-medium ml-1">Your Name / Role</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
              <input
                {...register('role')}
                placeholder={placeholders.role}
                className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-9 py-2.5 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_0_2px_rgba(124,58,237,0.15)] transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs text-[#A1A1AA] font-medium ml-1">Your Service</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
              <input
                {...register('service')}
                placeholder={placeholders.service}
                className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-9 py-2.5 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_0_2px_rgba(124,58,237,0.15)] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Client details */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[#A1A1AA] flex items-center gap-2 uppercase tracking-wide">
            <Building2 size={14} className="text-[#0EA5E9]" /> Client
          </h3>
          
          <div className="space-y-1">
            <label className="text-xs text-[#A1A1AA] font-medium ml-1">Client Name / Company</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
              <input
                {...register('clientName')}
                placeholder={placeholders.clientName}
                className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-9 py-2.5 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_0_2px_rgba(124,58,237,0.15)] transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs text-[#A1A1AA] font-medium ml-1">Client Industry</label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
              <input
                {...register('clientIndustry')}
                placeholder={placeholders.clientIndustry}
                className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-9 py-2.5 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_0_2px_rgba(124,58,237,0.15)] transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-[#27272A]" />

      {/* Project specifics */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-[#A1A1AA] flex items-center gap-2 uppercase tracking-wide">
          <Lightbulb size={14} className="text-[#F59E0B]" /> Project Context
        </h3>
        
        <div className="space-y-1">
          <label className="text-xs text-[#A1A1AA] font-medium ml-1">Project Type (Optional)</label>
          <div className="relative">
            <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
            <input
              {...register('projectType')}
              placeholder={placeholders.projectType}
              className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-9 py-2.5 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_0_2px_rgba(124,58,237,0.15)] transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-[#A1A1AA] font-medium ml-1">Extra Context / Notes</label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#52525B]" />
            <textarea
              {...register('context')}
              placeholder={placeholders.context}
              rows={3}
              className="w-full bg-[#18181B] border border-[#27272A] rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_0_2px_rgba(124,58,237,0.15)] transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Tone & Submit row */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-4 flex flex-col gap-4">
        <div>
          <label className="text-xs text-[#A1A1AA] font-medium mb-2 block">Voice &amp; Tone</label>
          <div className="flex items-center gap-2 bg-[#09090B] p-1 rounded-xl border border-[#27272A] w-fit">
            {TONES.map(tone => (
              <button
                key={tone.id}
                type="button"
                onClick={() => setSelectedTone(tone.id)}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors z-0 ${
                  selectedTone === tone.id ? 'text-[#F4F4F5]' : 'text-[#71717A] hover:text-[#A1A1AA]'
                }`}
              >
                {selectedTone === tone.id && (
                  <motion.div
                    layoutId="tone-selection"
                    className="absolute inset-0 bg-[#27272A] border border-[#3F3F46] rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {tone.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full btn-violet py-3.5 text-sm font-bold flex items-center justify-center gap-2 group disabled:opacity-75 disabled:cursor-not-allowed shadow-[0_0_24px_rgba(124,58,237,0.2)] hover:shadow-[0_0_32px_rgba(124,58,237,0.3)] transition-all duration-300"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin text-[#A78BFA]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating…
            </span>
          ) : (
            <span className="flex items-center gap-2 text-white">
              <Zap size={16} fill="currentColor" className="text-[#A78BFA] group-hover:scale-110 transition-transform" />
              Generate {activeTab === 'email' ? 'Email' : activeTab === 'proposal' ? 'Proposal' : activeTab === 'linkedin' ? 'LinkedIn Message' : 'Sequence'}
            </span>
          )}
        </button>
      </div>

    </form>
  )
}
