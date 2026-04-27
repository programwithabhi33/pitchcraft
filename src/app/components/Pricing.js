'use client'

import { useState } from 'react'

const plans = [
  {
    id: 'plan-free',
    name: 'Free',
    badge: null,
    price: { inr: '₹0', usd: '$0' },
    period: 'forever',
    description: 'Try PitchCraft and see what AI-written outreach feels like.',
    cta: 'Start Free',
    ctaId: 'pricing-free-cta',
    ctaStyle: 'outline',
    features: [
      '5 cold emails / month',
      '2 proposal PDFs / month',
      'Basic tone options',
      'Email subject lines',
      'Community support',
    ],
    missing: ['Follow-up sequences', 'LinkedIn messages', 'Team workspace', 'Priority generation'],
  },
  {
    id: 'plan-pro',
    name: 'Pro',
    badge: 'Most Popular',
    price: { inr: '₹199', usd: '$12' },
    period: 'per month',
    description: 'For freelancers who want to send more proposals and win more clients.',
    cta: 'Start Pro Trial',
    ctaId: 'pricing-pro-cta',
    ctaStyle: 'violet',
    popular: true,
    features: [
      'Unlimited cold emails',
      'Unlimited proposal PDFs',
      'All 3 tone presets',
      'Follow-up sequences (Day 1/4/7)',
      'LinkedIn messages',
      'AI subject line variants',
      'Priority generation',
      'Email support',
    ],
    missing: ['Team workspace'],
  },
  {
    id: 'plan-team',
    name: 'Team',
    badge: null,
    price: { inr: '₹499', usd: '$29' },
    period: 'per month / team',
    description: 'For agencies and teams who need consistent, branded output across the board.',
    cta: 'Start Team Trial',
    ctaId: 'pricing-team-cta',
    ctaStyle: 'outline',
    features: [
      'Everything in Pro',
      'Up to 8 team members',
      'Shared brand voice settings',
      'Team template library',
      'Admin dashboard & analytics',
      'Priority support',
      'Custom onboarding',
    ],
    missing: [],
  },
]

const CheckIcon = ({ color = '#10B981' }) => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={color} strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const CrossIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 text-[#3F3F46]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default function Pricing() {
  const [currency, setCurrency] = useState('inr')

  return (
    <section id="pricing" className="relative py-28 bg-[#09090B] section-glow">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1E1033]/15 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <span className="badge badge-violet mx-auto">Pricing</span>
          <h2 className="text-4xl font-bold text-[#F4F4F5] mt-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-xl mx-auto">
            Start free. Upgrade when you're ready. No hidden fees, no lock-in.
          </p>

          {/* Currency toggle */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              id="pricing-toggle-inr"
              onClick={() => setCurrency('inr')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currency === 'inr'
                  ? 'bg-[#7C3AED] text-white'
                  : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
              }`}
            >
              ₹ INR
            </button>
            <button
              id="pricing-toggle-usd"
              onClick={() => setCurrency('usd')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currency === 'usd'
                  ? 'bg-[#7C3AED] text-white'
                  : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map(plan => (
            <div
              key={plan.id}
              id={plan.id}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.popular
                  ? 'pricing-popular'
                  : 'bg-[#18181B] border border-[#3F3F46]'
              }`}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="badge badge-violet whitespace-nowrap text-[11px] shadow-[0_4px_16px_rgba(124,58,237,0.4)]">
                    ✦ {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-1">
                <p className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">{plan.name}</p>
              </div>

              {/* Price */}
              <div className="flex items-end gap-1.5 mb-1">
                <span className="text-5xl font-extrabold text-[#F4F4F5]">
                  {plan.price[currency]}
                </span>
                {plan.price[currency] !== '₹0' && plan.price[currency] !== '$0' && (
                  <span className="text-[#A1A1AA] text-sm mb-1.5 font-medium">{plan.period}</span>
                )}
              </div>

              <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6">{plan.description}</p>

              {/* CTA */}
              {plan.ctaStyle === 'violet' ? (
                <a
                  href="#"
                  id={plan.ctaId}
                  className="btn-violet text-center text-sm py-3 mb-6 block"
                >
                  <span>{plan.cta}</span>
                </a>
              ) : (
                <a
                  href="#"
                  id={plan.ctaId}
                  className="btn-outline text-center text-sm py-3 mb-6 block"
                >
                  {plan.cta}
                </a>
              )}

              {/* Divider */}
              <div className="border-t border-[#3F3F46]/60 mb-5" />

              {/* Features list */}
              <ul className="space-y-3 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#F4F4F5]">
                    <CheckIcon color={plan.popular ? '#A78BFA' : '#10B981'} />
                    {f}
                  </li>
                ))}
                {plan.missing.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#3F3F46] line-through">
                    <CrossIcon />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-[#A1A1AA] text-sm mt-10">
          All plans include a 7-day free trial. No credit card required to start.
          <span className="text-[#7C3AED] font-semibold"> Cancel anytime.</span>
        </p>
      </div>
    </section>
  )
}
