'use client'

import { useState, useEffect } from 'react'

const demoLines = [
  { label: 'Subject', value: 'Re: Your React project — let\'s talk' },
  { label: 'Opening', value: 'Hi Sarah, I noticed your post about scaling your MVP…' },
  { label: 'Offer', value: 'I help US startups ship clean React frontends in 3–4 weeks.' },
  { label: 'CTA', value: 'Free 20-min call this week? I\'ve kept 2 slots open.' },
]

function TypingDemo() {
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [phase, setPhase] = useState('typing') // typing | pause | erase

  useEffect(() => {
    const currentLine = demoLines[lineIdx]

    if (phase === 'typing') {
      if (charIdx < currentLine.value.length) {
        const t = setTimeout(() => setCharIdx(c => c + 1), 38)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('pause'), 1800)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'pause') {
      const t = setTimeout(() => setPhase('erase'), 600)
      return () => clearTimeout(t)
    }

    if (phase === 'erase') {
      if (charIdx > 0) {
        const t = setTimeout(() => setCharIdx(c => c - 1), 20)
        return () => clearTimeout(t)
      } else {
        setLineIdx(i => (i + 1) % demoLines.length)
        setPhase('typing')
      }
    }
  }, [charIdx, phase, lineIdx])

  const current = demoLines[lineIdx]

  return (
    <div className="space-y-2">
      {demoLines.map((line, i) => (
        <div key={line.label} className="flex gap-3 items-start">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED] w-16 flex-shrink-0 pt-0.5">
            {line.label}
          </span>
          <p className="text-sm text-[#F4F4F5] leading-relaxed">
            {i < lineIdx
              ? line.value
              : i === lineIdx
              ? (
                <>
                  {line.value.slice(0, charIdx)}
                  <span className="typing-cursor" />
                </>
              )
              : <span className="text-[#3F3F46]">{'·'.repeat(Math.min(line.value.length, 24))}</span>
            }
          </p>
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section id="hero" className="relative overflow-hidden hero-bg mesh-grid min-h-screen flex items-center pt-16">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6D28D9]/08 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* ─── Left: Copy ─────────────────────────────── */}
        <div className={`space-y-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>

          {/* Badge */}
          <div className="flex items-center gap-3">
            <span className="badge badge-sky">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-pulse" />
              AI-Powered
            </span>
            <span className="badge badge-emerald">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              30-Second Results
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight">
            <span className="gradient-text-hero">Win More Clients</span>
            <br />
            <span className="text-[#F4F4F5]">with High-Conversion</span>
            <br />
            <span className="text-[#F4F4F5]">Cold Emails</span>
          </h1>

          {/* Sub-tagline */}
          <p className="text-lg text-[#A1A1AA] leading-relaxed max-w-lg">
            Fill in 4 fields. Get a polished cold email in under{' '}
            <span className="text-[#F4F4F5] font-semibold">30 seconds</span>. 
            No blank-page paralysis. No weak English. Just results.
          </p>

          {/* CTA buttons */}
           <div className="flex flex-col sm:flex-row gap-4">
             <a
               href="/auth"
               id="hero-generate-btn"
               className="btn-violet text-base px-8 py-3.5 flex items-center justify-center gap-2.5"
             >
               <span className="flex items-center gap-2.5">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
                 Generate My First Email Free
               </span>
             </a>
             <a
               href="#features"
               id="hero-see-how-btn"
               className="btn-outline text-base px-8 py-3.5 flex items-center justify-center gap-2"
             >
               See How It Works
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
               </svg>
             </a>
           </div>

          {/* Social trust mini-strip */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            {[
              { icon: '⚡', label: '30-second output' },
              { icon: '🌍', label: 'Native-level English' },
              { icon: '🔥', label: '100% Free to start' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Right: Demo card ───────────────────────── */}
        <div
          className={`animate-float ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
          style={{ animationDelay: '0.3s' }}
        >
          <div className="glass-card rounded-2xl p-1 animate-glow">
            {/* Card header bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#3F3F46]/50">
              <div className="w-3 h-3 rounded-full bg-rose-500/70" />
              <div className="w-3 h-3 rounded-full bg-amber-500/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              <div className="ml-auto flex items-center gap-2">
                <span className="badge badge-violet text-[10px]">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generating…
                </span>
              </div>
            </div>

            <div className="px-5 py-5 space-y-5">
              {/* Input fields preview */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">Your brief</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Your Role', value: 'React Developer' },
                    { label: 'Client', value: 'Sarah — US Startup' },
                    { label: 'Service', value: 'Frontend Build' },
                    { label: 'Tone', value: 'Confident' },
                  ].map(f => (
                    <div key={f.label} className="bg-[#09090B] border border-[#3F3F46] rounded-lg p-2.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A1A1AA] mb-0.5">{f.label}</p>
                      <p className="text-[13px] text-[#F4F4F5] font-medium">{f.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#3F3F46]/50" />

              {/* Live typing output */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">AI Output</p>
                  <span className="badge badge-sky text-[10px]">Cold Email</span>
                </div>
                <div className="bg-[#09090B] border border-[#3F3F46] rounded-xl p-4 min-h-[140px]">
                  <TypingDemo />
                </div>
              </div>

              {/* Action buttons preview */}
              <div className="flex gap-2 pt-1">
                <button id="demo-copy-btn" className="flex-1 text-xs font-semibold py-2 rounded-lg bg-[#7C3AED] text-white hover:bg-[#6D28D9] transition-colors">
                  Copy Email
                </button>
                <button id="demo-save-btn" className="flex-1 text-xs font-semibold py-2 rounded-lg border border-[#3F3F46] text-[#A1A1AA] hover:border-[#A78BFA] hover:text-[#A78BFA] transition-colors">
                  Save to History
                </button>
                <button id="demo-regenerate-btn" className="flex-1 text-xs font-semibold py-2 rounded-lg border border-[#3F3F46] text-[#A1A1AA] hover:border-[#A78BFA] hover:text-[#A78BFA] transition-colors">
                  Regenerate
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09090B] to-transparent pointer-events-none" />
    </section>
  )
}
