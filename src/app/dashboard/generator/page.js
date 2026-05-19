'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import GeneratorForm from '@/app/components/generator/GeneratorForm'
import OutputPanel from '@/app/components/generator/OutputPanel'

export default function GeneratorPage() {
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
      {/* Integrated Dashboard Header for Mobile Menu Support */}
      <DashboardHeader 
        title="Cold Email Generator" 
        subtitle="AI-powered high-conversion outreach" 
      />

      {/* Main Two-Panel Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel: Form (45%) */}
        <div className="w-full lg:w-[45%] flex-shrink-0 flex flex-col border-r border-[#27272A] bg-[#09090B] overflow-y-auto">
          <div className="p-6">
            <GeneratorForm
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
