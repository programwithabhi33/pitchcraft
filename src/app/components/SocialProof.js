'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { id: 'stat-freelancers', value: 2400, suffix: '+', label: 'Freelancers Onboarded', icon: '👥' },
  { id: 'stat-emails', value: 45000, suffix: '+', label: 'Emails Written', icon: '📧' },
  { id: 'stat-time-saved', value: 25, suffix: ' min', label: 'Saved Per Outreach', icon: '⏱️' },
  { id: 'stat-reply-rate', value: 3.2, suffix: 'x', label: 'Avg. Reply Rate Boost', icon: '📈' },
]

const logos = [
  { id: 'logo-upwork', name: 'Upwork', icon: '🔵' },
  { id: 'logo-toptal', name: 'Toptal', icon: '🟣' },
  { id: 'logo-fiverr', name: 'Fiverr', icon: '🟢' },
  { id: 'logo-malt', name: 'Malt', icon: '🔴' },
]

const testimonials = [
  {
    id: 'test-1',
    author: 'Sarah Jenkins',
    role: 'Full-Stack Developer',
    quote: 'I used to spend 45 minutes on every outreach email. Now it takes 90 seconds and my reply rate tripled. This tool paid for itself in the first week.',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    id: 'test-2',
    author: 'Marcus Chen',
    role: 'Agency Founder',
    quote: 'Our team of 5 now sends consistent, branded outreach. No more "every writer has their own style" problem. Our agency finally looks like a real agency.',
    avatar: 'https://i.pravatar.cc/150?u=marcus',
  },
  {
    id: 'test-3',
    author: 'David Rodriguez',
    role: 'Growth Consultant',
    quote: 'I hire Indian devs regularly. The emails I get back are usually terrible. I gave my vendors access to PitchCraft and now I can actually evaluate them.',
    avatar: 'https://i.pravatar.cc/150?u=david',
  },
]

function StatCounter({ stat }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true) })
    if(ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let start = 0
    const end = stat.value
    const duration = 2000
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [visible, stat.value])

  return (
    <div ref={ref} className="text-center p-6 bg-[#18181B] border border-[#27272A] rounded-2xl">
      <div className="text-2xl mb-2">{stat.icon}</div>
      <div className="text-3xl font-bold text-[#F4F4F5]">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-xs font-bold uppercase tracking-widest text-[#52525B] mt-1">{stat.label}</div>
    </div>
  )
}

export default function SocialProof() {
  return (
    <section className="py-24 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map(s => <StatCounter key={s.id} stat={s} />)}
        </div>

        {/* Logos */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#52525B]">Used by high-performers on</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 mb-24">
          {logos.map(l => (
            <div key={l.id} className="flex items-center gap-2">
              <span className="text-2xl">{l.icon}</span>
              <span className="text-xl font-bold text-[#F4F4F5]">{l.name}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(t => (
            <div key={t.id} className="bg-[#18181B] border border-[#27272A] p-8 rounded-3xl relative">
              <div className="text-[#7C3AED] mb-6">
                <svg className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-2.2 1.8-4 4-4V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8h-2z" />
                </svg>
              </div>
              <p className="text-[#D4D4D8] leading-relaxed mb-8 italic">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full border-2 border-[#27272A]" />
                <div>
                  <p className="text-sm font-bold text-[#F4F4F5]">{t.author}</p>
                  <p className="text-xs text-[#52525B]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
