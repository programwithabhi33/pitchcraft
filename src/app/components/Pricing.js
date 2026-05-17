'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Zap, ShieldCheck, Mail, Sparkles } from 'lucide-react'

const freeFeatures = [
  { 
    id: 'feat-emails', 
    label: '10 High-Quality Emails / Mo', 
    desc: 'Powered by Llama 3.3 70B for near-human results.',
    icon: Mail,
    color: '#7C3AED'
  },
  { 
    id: 'feat-tones', 
    label: '3 Persuasive Tones', 
    desc: 'Switch between Formal, Friendly, and Bold instantly.',
    icon: Zap,
    color: '#0EA5E9'
  },
  { 
    id: 'feat-history', 
    label: 'Email Library & History', 
    desc: 'Every winning email is auto-saved to your dashboard.',
    icon: ShieldCheck,
    color: '#10B981'
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-28 bg-[#09090B] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="badge badge-violet mx-auto">100% Free MVP</span>
          <h2 className="text-4xl font-bold text-[#F4F4F5] mt-4">
            Powerful Outreach, <span className="gradient-text">Zero Cost</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            We're keeping PitchCraft free for all early users. No credit card, no complex subscriptions — just start winning more clients today.
          </p>
        </div>

        {/* Unified Free Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#18181B] border border-[#27272A] rounded-[32px] p-8 md:p-12 overflow-hidden shadow-2xl"
        >
          {/* Decorative Sparkle */}
          <div className="absolute top-0 right-0 p-8 text-[#7C3AED]/20">
            <Sparkles size={120} />
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left: Value Prop */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#F4F4F5] mb-2">The Free Forever Plan</h3>
                <p className="text-[#71717A] text-sm">Everything you need to scale your outreach as an individual.</p>
              </div>

              <div className="space-y-6">
                {freeFeatures.map(f => (
                  <div key={f.id} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}15`, color: f.color }}>
                      <f.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#F4F4F5]">{f.label}</p>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CTA Section */}
            <div className="bg-[#09090B] border border-[#27272A] rounded-2xl p-8 flex flex-col items-center text-center space-y-6">
              <div className="space-y-1">
                <span className="text-5xl font-extrabold text-[#F4F4F5]">₹0</span>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#52525B]">Free Forever</p>
              </div>
              
              <div className="w-full space-y-3">
                <a 
                  href="/auth" 
                  className="btn-violet w-full py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#7C3AED]/20 cursor-pointer"
                >
                  <Zap size={16} fill="currentColor" />
                  Get Started Free
                </a>
                <p className="text-[10px] text-[#52525B] font-medium">Join 2,400+ users winning with PitchCraft</p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[11px] text-[#A1A1AA]">
                  <CheckCircle2 size={12} className="text-[#10B981]" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#A1A1AA]">
                  <CheckCircle2 size={12} className="text-[#10B981]" />
                  Unlimited tone switching
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Bottom Note */}
        <p className="text-center text-[#52525B] text-xs mt-12 font-medium">
          Interested in white-labeling or team access? <a href="mailto:hello@pitchcraft.ai" className="text-[#7C3AED] hover:underline cursor-pointer">Contact us for custom solutions.</a>
        </p>
      </div>
    </section>
  )
}
