'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Download, BookmarkPlus, RefreshCw, Sparkles, CheckCheck } from 'lucide-react'

// Simple markdown formatter for bolding/newlines
function MarkdownText({ text }) {
  if (!text) return null
  
  // Quick split by double newlines for paragraphs
  return (
    <div className="space-y-4 text-sm text-[#D4D4D8] leading-relaxed whitespace-pre-wrap">
      {text.split('**').map((part, i) => {
        // Even indices are normal text, odd indices are bold if formatted correctly
        if (i % 2 !== 0) return <strong key={i} className="text-[#F4F4F5] font-semibold">{part}</strong>
        return <span key={i}>{part}</span>
      })}
    </div>
  )
}

export default function OutputPanel({ isGenerating, outputData, activeTab, onRegenerate }) {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  // Demo typing effect state for the body text
  const [displayedText, setDisplayedText] = useState('')
  
  useEffect(() => {
    if (!outputData?.body) {
      setDisplayedText('')
      return
    }

    // A fast typing effect to simulate AI streaming
    setDisplayedText('')
    let i = 0
    const fullText = outputData.body
    
    // Typing speed based on chunk size to be fast but visible
    const interval = setInterval(() => {
      const charsPerTick = 5
      setDisplayedText(prev => prev + fullText.slice(i, i + charsPerTick))
      i += charsPerTick
      
      if (i >= fullText.length) {
        clearInterval(interval)
        setDisplayedText(fullText) // Ensure exact match at the end
      }
    }, 15)

    return () => clearInterval(interval)
  }, [outputData?.body])

  const handleCopy = () => {
    if (!outputData) return
    navigator.clipboard.writeText(outputData.body)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    if (!outputData) return
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // Determine if it's completely empty
  const isEmpty = !isGenerating && !outputData

  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* Top Action Bar */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-[#27272A] bg-[#18181B]/80 backdrop-blur-sm z-10 min-h-[64px]">
        
        {/* Status */}
        <div className="flex items-center gap-2">
          {isGenerating ? (
            <span className="badge text-[#A78BFA] bg-[#7C3AED]/10 border border-[#7C3AED]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-pulse mr-1" />
              Generating
            </span>
          ) : outputData ? (
            <span className="badge text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20">
              Generated Ready
            </span>
          ) : (
            <span className="text-xs text-[#52525B] font-medium px-2">Ready to write</span>
          )}
        </div>

        {/* Action Buttons (visible only when not generating and have data) */}
        <AnimatePresence>
          {!isGenerating && outputData && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 sm:gap-2"
            >
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  copied 
                    ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30' 
                    : 'bg-[#27272A] text-[#E4E4E7] hover:bg-[#3F3F46] border border-transparent'
                }`}
              >
                {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              {activeTab === 'proposal' && (
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#27272A] text-[#E4E4E7] hover:bg-[#3F3F46] transition-colors border border-transparent"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">PDF</span>
                </button>
              )}

              <button
                onClick={handleSave}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  saved 
                    ? 'bg-[#7C3AED]/15 text-[#A78BFA] border border-[#7C3AED]/30' 
                    : 'bg-[#27272A] text-[#E4E4E7] hover:bg-[#3F3F46] border border-transparent'
                }`}
              >
                {saved ? <CheckCheck size={14} /> : <BookmarkPlus size={14} />}
                <span className="hidden lg:inline">{saved ? 'Saved' : 'Save'}</span>
              </button>

              <div className="w-px h-5 bg-[#3F3F46] mx-1" />

              <button
                onClick={onRegenerate}
                className="flex items-center p-1.5 text-[#A1A1AA] hover:text-[#A78BFA] hover:bg-[#7C3AED]/10 rounded-lg transition-colors border border-transparent hover:border-[#7C3AED]/20"
                title="Regenerate"
              >
                <RefreshCw size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 relative">
        
        {isEmpty && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 m-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#1E1033] border border-[#7C3AED]/20 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-[#A78BFA]/60" />
            </div>
            <h3 className="text-lg font-bold text-[#F4F4F5]">Awaiting Your Brief</h3>
            <p className="text-sm text-[#A1A1AA] mt-1 max-w-sm">
              Fill out the form and hit Generate. Your polished {activeTab === 'proposal' ? 'proposal' : 'copy'} will stream right here.
            </p>
          </div>
        )}

        {/* Shimmer skeleton while generating from scratch */}
        {isGenerating && !outputData && (
          <div className="space-y-6 max-w-2xl animate-pulse">
            {activeTab === 'email' && (
              <div className="w-full h-24 bg-[#27272A]/50 rounded-xl mb-8" />
            )}
            <div className="w-3/4 h-4 bg-[#27272A]/50 rounded mb-4" />
            <div className="w-full h-4 bg-[#27272A]/50 rounded" />
            <div className="w-full h-4 bg-[#27272A]/50 rounded" />
            <div className="w-5/6 h-4 bg-[#27272A]/50 rounded" />
            
            <div className="w-2/3 h-4 bg-[#27272A]/50 rounded mt-8 mb-4" />
            <div className="w-full h-4 bg-[#27272A]/50 rounded" />
            <div className="w-4/5 h-4 bg-[#27272A]/50 rounded" />
          </div>
        )}

        {/* Output rendering */}
        {!isEmpty && outputData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            {/* Subject Lines Box (Only for emails with multiple subject lines) */}
            {activeTab === 'email' && outputData.subjects && (
              <div className="bg-[#1E1033]/40 border border-[#7C3AED]/30 rounded-xl p-5 shadow-[0_8px_32px_rgba(124,58,237,0.05)]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A78BFA] mb-3 flex items-center gap-1.5">
                  <Lightbulb size={14} /> Generated Subject Lines
                </h4>
                <ul className="space-y-2">
                  {outputData.subjects.map((subject, idx) => (
                    <li key={idx} className="flex flex-start gap-2.5 group cursor-pointer">
                      <span className="text-[#3F3F46] font-mono text-sm group-hover:text-[#7C3AED] transition-colors">{idx + 1}.</span>
                      <span className="text-sm font-semibold text-[#D4D4D8] group-hover:text-[#F4F4F5] transition-colors">{subject}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Main Body Text with simulated typing */}
            <div className="relative">
              <MarkdownText text={displayedText} />
              
              {/* Typewriter Cursor */}
              {displayedText.length < outputData.body.length && (
                <span className="inline-block w-1.5 h-4 bg-[#A78BFA] ml-1 animate-pulse" />
              )}
            </div>
            
          </motion.div>
        )}
      </div>

      {/* Footer / Token indicator */}
      {!isEmpty && outputData && (
        <div className="flex-shrink-0 p-3 border-t border-[#27272A] bg-[#09090B]">
          <p className="text-center text-[10px] text-[#52525B] font-mono">
            ~142 tokens used <span className="mx-1">•</span> 1 output credit
          </p>
        </div>
      )}
    </div>
  )
}
