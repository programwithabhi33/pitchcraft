'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import * as Tabs from '@radix-ui/react-tabs'
import GeneratorForm from '@/app/components/generator/GeneratorForm'
import OutputPanel from '@/app/components/generator/OutputPanel'
import { Mail, FileText, Clock, Send } from 'lucide-react'

const TABS = [
  { id: 'email', label: 'Cold Email', icon: Mail },
  { id: 'proposal', label: 'Proposal PDF', icon: FileText },
  { id: 'followup', label: 'Follow-up Sequence', icon: Clock },
  { id: 'linkedin', label: 'LinkedIn Message', icon: Send },
]

export default function GeneratorPage() {
  const [activeTab, setActiveTab] = useState('email')
  const [isGenerating, setIsGenerating] = useState(false)
  const [outputData, setOutputData] = useState(null)

  const handleGenerate = async (formData) => {
    setIsGenerating(true)
    setOutputData(null)
    
    // Mock API call to simulate generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    // Mock output data based on tab
    let result = {}
    if (activeTab === 'email') {
      result = {
        subjects: [
          'Quick question about your frontend team',
          'Scaling your MVP with React',
          'Frontend support for your upcoming launch'
        ],
        body: `Hi Sarah,\n\nI noticed your recent post about scaling the MVP. Managing a fast-paced product roadmap is tough, especially when the frontend starts to slow down feature delivery.\n\nI'm Arjun, a React developer specializing in early-stage startups. I help teams ship clean, maintainable frontend features without the overhead of a full-time hire.\n\nWould you be open to a quick chat to see if there's a fit for your upcoming milestones?\n\nBest,\nArjun`
      }
    } else if (activeTab === 'proposal') {
      result = {
        body: `# Project Proposal\n\n## 1. Project Overview\nWe will modernize your legacy dashboard using React and Tailwind CSS.\n\n## 2. Scope of Work\n- Design System implementation\n- Component migration\n- State management with Zustand\n\n## 3. Timeline\nEstimated completion: 4-6 weeks.\n\n## 4. Investment\nTotal fixed price: $4,500 USD.`
      }
    } else if (activeTab === 'followup') {
      result = {
        body: `**Day 1**\nHi Sarah,\nJust bringing this to the top of your inbox. Let me know if you have any questions about the proposal!\n\n**Day 4**\nHi Sarah,\nChecking in—I know how busy things get. Should we reconnect next week instead?\n\n**Day 7**\nHi Sarah,\nI'll assume the timing isn't right for now. Keep me in mind if things change! I'll stay subscribed to your updates.`
      }
    } else if (activeTab === 'linkedin') {
      result = {
        body: `Hi Sarah! Loved your recent post about scaling MVP engineering. I specialize in helping startups like yours accelerate frontend delivery with React. Would love to connect and follow your journey!`
      }
    }
    
    setOutputData(result)
    setIsGenerating(false)
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Top Header & Tabs */}
      <div className="sticky top-0 z-10 bg-[#09090B] border-b border-[#27272A] px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#F4F4F5]">Generator</h1>
          <p className="text-xs text-[#71717A]">AI-powered outreach and proposals</p>
        </div>
        
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List className="flex items-center gap-1 bg-[#18181B] p-1 rounded-xl border border-[#27272A] overflow-x-auto no-scrollbar">
            {TABS.map(tab => (
              <Tabs.Trigger
                key={tab.id}
                value={tab.id}
                className="relative flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap focus:outline-none data-[state=active]:text-[#F4F4F5] data-[state=inactive]:text-[#71717A] data-[state=inactive]:hover:text-[#A1A1AA]"
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="generator-tab"
                    className="absolute inset-0 bg-[#27272A] border border-[#3F3F46] rounded-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <tab.icon size={14} className={activeTab === tab.id ? 'text-[#A78BFA]' : ''} />
                  {tab.label}
                </span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel: Form (45%) */}
        <div className="w-full lg:w-[45%] flex-shrink-0 flex flex-col border-r border-[#27272A] bg-[#09090B] overflow-y-auto">
          <div className="p-6">
            <GeneratorForm
              activeTab={activeTab}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
            />
          </div>
        </div>

        {/* Right Panel: Output (55%) */}
        <div className="w-full lg:w-[55%] flex flex-col bg-[#18181B] relative h-[600px] lg:h-auto border-t lg:border-t-0 border-[#27272A]">
          <OutputPanel
            isGenerating={isGenerating}
            outputData={outputData}
            activeTab={activeTab}
            onRegenerate={() => handleGenerate(null)} // Re-uses last data in real app
          />
        </div>
      </div>
    </div>
  )
}
