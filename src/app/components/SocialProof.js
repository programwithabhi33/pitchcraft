'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { id: 'stat-freelancers', value: 2400, suffix: '+', label: 'Freelancers Onboarded', icon: '👥' },
  { id: 'stat-proposals', value: 18000, suffix: '+', label: 'Proposals Generated', icon: '📄' },
  { id: 'stat-time-saved', value: 45, suffix: ' min', label: 'Saved Per Proposal', icon: '⏱️' },
  { id: 'stat-win-rate', value: 3, suffix: 'x', label: 'Higher Reply Rate', icon: '📈' },
]

const logos = [
  { id: 'logo-upwork', name: 'Upwork', icon: '🔵' },
  { id: 'logo-toptal', name: 'Toptal', icon: '🟣' },
  { id: 'logo-fiverr', name: 'Fiverr', icon: '🟢' },
  { id: 'logo-freelancer', name: 'Freelancer.com', icon: '🔷' },
  { id: 'logo-linkedin', name: 'LinkedIn', icon: '🟦' },
  { id: 'logo-99designs', name: '99designs', icon: '🔴' },
]

const testimonials = [
  {
    id: 'testimonial-arjun',
    quote: 'I used to spend 45 minutes on every Upwork proposal. Now it takes 90 seconds and my reply rate tripled. This tool paid for itself in the first week.',
    name: 'Arjun M.',
    role: 'React Developer, Pune',
    avatar: 'AM',
    color: '#7C3AED',
  },
  {
    id: 'testimonial-shruti',
    quote: 'Our team of 5 now sends consistent, branded proposals. No more "every writer has their own style" problem. Our agency finally looks like a real agency.',
    name: 'Shruti K.',
    role: 'Agency Owner, Mumbai',
    avatar: 'SK',
    color: '#0EA5E9',
  },
  {
    id: 'testimonial-mike',
    quote: 'I hire Indian devs regularly. The proposals I get back are usually terrible. I gave my vendors access to PitchCraft and now I can actually evaluate them.',
    name: 'Mike D.',
    role: 'Startup Founder, Austin TX',
    avatar: 'MD',
    color: '#10B981',
  },
]

function AnimatedCounter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = Date.now()
          const step = () => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function SocialProof() {
  return (
    <section id="social-proof" className="py-24 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* ─── Stats ─────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(stat => (
            <div
              key={stat.id}
              id={stat.id}
              className="feature-card p-6 text-center space-y-2"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-4xl font-extrabold gradient-text">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-[#A1A1AA] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ─── Trust logos ───────────────────────────── */}
        <div className="text-center space-y-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">
            Used by freelancers on
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {logos.map(logo => (
              <div
                key={logo.id}
                id={logo.id}
                className="flex items-center gap-2.5 bg-[#18181B] border border-[#3F3F46] rounded-xl px-5 py-2.5 hover:border-[#7C3AED]/40 transition-colors"
              >
                <span className="text-lg">{logo.icon}</span>
                <span className="text-sm font-semibold text-[#A1A1AA]">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Testimonials ──────────────────────────── */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#F4F4F5]">
              Real People. <span className="gradient-text">Real Results.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                id={t.id}
                className="feature-card p-6 space-y-4"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[#A1A1AA] text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-1">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-[#F4F4F5] text-sm font-semibold">{t.name}</p>
                    <p className="text-[#A1A1AA] text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
