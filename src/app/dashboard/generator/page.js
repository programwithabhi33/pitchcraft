'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import * as Tabs from '@radix-ui/react-tabs'
import GeneratorForm from '@/app/components/generator/GeneratorForm'
import OutputPanel from '@/app/components/generator/OutputPanel'
import { Mail } from 'lucide-react'

const TABS = [
  { id: 'email', label: 'Cold Email', icon: Mail },
]

export default function GeneratorPage() {
  const [activeTab, setActiveTab] = useState('email')
  const [isGenerating, setIsGenerating] = useState(false)
  const [outputData, setOutputData] = useState(null)
  const [lastFormData, setLastFormData] = useState(null)

  const handleGenerate = async (formData) => {
    setIsGenerating(true)
    setOutputData(null)
    setLastFormData(formData)
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Something went wrong while generating')
        setIsGenerating(false)
        return
      }

      setOutputData(data)
    } catch (error) {
      console.error('Generation error:', error)
      alert('Failed to connect to the generator. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Top Header & Tabs */}
      <div className="sticky top-0 z-10 bg-[#09090B] border-b border-[#27272A] px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#F4F4F5]">Generator</h1>
          <p className="text-xs text-[#71717A]">AI-powered high-conversion cold emails</p>
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
            lastFormData={lastFormData}
            onRegenerate={() => handleGenerate(lastFormData)}
          />
        </div>
      </div>
    </div>
  )
}
