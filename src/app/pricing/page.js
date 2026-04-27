'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ChevronDown, Star, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// --- Data ---
const plans = [
  {
    name: 'Free',
    desc: 'Perfect to try out the AI.',
    monthly: 0,
    annual: 0,
    cta: 'Start for free',
    features: ['5 generated emails/mo', '2 proposals/mo', 'Basic tones', 'Standard support'],
    missing: ['Unlimited generations', 'LinkedIn messages', 'Sequence templates', 'API Access']
  },
  {
    name: 'Pro',
    desc: 'For freelancers scaling outreach.',
    monthly: 29,
    annual: 24, // $288/year vs $348/year
    popular: true,
    cta: 'Get Pro',
    features: ['Unlimited emails & proposals', 'All tone presets', 'LinkedIn messages', 'Automated follow-ups', 'Priority support'],
    missing: ['API Access', 'Team workspace']
  },
  {
    name: 'Team',
    desc: 'For agencies & teams.',
    monthly: 79,
    annual: 65,
    cta: 'Start Team Trial',
    features: ['Everything in Pro', 'Up to 5 team members', 'Shared templates', 'API Access', 'Dedicated account manager'],
    missing: []
  }
]

const featuresList = [
  { name: 'Cold Emails (Monthly)', free: '5', pro: 'Unlimited', team: 'Unlimited' },
  { name: 'Proposals (Monthly)', free: '2', pro: 'Unlimited', team: 'Unlimited' },
  { name: 'Tone Presets', free: 'Basic (1)', pro: 'All (3)', team: 'Custom + All' },
  { name: 'LinkedIn Messages', free: false, pro: true, team: true },
  { name: 'Follow-up Sequences', free: false, pro: true, team: true },
  { name: 'Team Workspace', free: false, pro: false, team: 'Up to 5 seats' },
  { name: 'API Access', free: false, pro: false, team: true },
]

const faqs = [
  { q: 'Can I cancel my subscription at any time?', a: 'Yes, you can cancel your subscription at any time from your account settings. You will retain access to your plan until the end of your billing cycle.' },
  { q: 'Do you offer refunds?', a: 'If you are not satisfied with PitchCraft within the first 14 days of your Pro or Team subscription, we will issue a full refund—no questions asked.' },
  { q: 'What happens when I hit my free limit?', a: 'You will be prompted to upgrade to a Pro plan to continue generating outputs. Your saved outputs will always remain accessible.' },
  { q: 'Do you offer a discount for nonprofits?', a: 'Yes! We offer a 50% discount on all our paid plans for registered nonprofits and educational institutions. Contact our support team to apply.' },
  { q: 'Can I change my plan later?', a: 'Absolutely. You can upgrade from Pro to Team or downgrade at any time. Prorated charges or credits will be applied automatically.' },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-violet-200">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* ── Header ── */}
        <div className="max-w-3xl mx-auto text-center px-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 tracking-tight mb-6">
            Invest in your <span className="text-violet-600">outreach.</span>
          </h1>
          <p className="text-lg text-zinc-600 max-w-xl mx-auto">
            Choose the perfect plan for your freelance business or agency. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <span className={`text-sm font-semibold transition-colors ${!annual ? 'text-zinc-900' : 'text-zinc-500'}`}>Monthly</span>
            <button 
              onClick={() => setAnnual(!annual)}
              className="relative w-14 h-8 rounded-full bg-zinc-200 p-1 transition-colors hover:bg-zinc-300 focus:outline-none"
            >
              <div 
                className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${annual ? 'translate-x-6' : 'translate-x-0'}`} 
              />
            </button>
            <span className={`text-sm font-semibold flex items-center gap-2 transition-colors ${annual ? 'text-zinc-900' : 'text-zinc-500'}`}>
              Annually 
              <span className="text-[10px] uppercase font-bold tracking-wider bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
                2 months free
              </span>
            </span>
          </div>
        </div>

        {/* ── Testimonial Strip ── */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex -space-x-4 flex-shrink-0">
              <img src="https://i.pravatar.cc/100?img=1" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="User" />
              <img src="https://i.pravatar.cc/100?img=2" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="User" />
              <img src="https://i.pravatar.cc/100?img=3" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="User" />
            </div>
            <div>
              <div className="flex text-amber-400 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-zinc-700 font-medium italic">"Upgrading to Pro paid for itself in 3 days when PitchCraft helped me land a $5k retainer using a generated sequence."</p>
              <p className="text-sm border-[#71717A] text-zinc-500 mt-2 font-semibold">— Sarah J., Freelance Designer</p>
            </div>
          </div>
        </div>

        {/* ── Pricing Cards ── */}
        <div className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const price = annual ? plan.annual : plan.monthly
              const isPro = plan.popular

              return (
                <div 
                  key={plan.name}
                  className={`relative flex flex-col bg-white rounded-3xl p-8 transition-shadow ${
                    isPro 
                      ? 'border-2 border-violet-600 shadow-2xl scale-100 md:scale-105 z-10' 
                      : 'border border-zinc-200 shadow-sm'
                  }`}
                >
                  {isPro && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-zinc-900">{plan.name}</h3>
                  <p className="text-sm text-zinc-500 mt-2">{plan.desc}</p>
                  
                  <div className="mt-6 mb-8 flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-zinc-900">${price}</span>
                    <span className="text-zinc-500 font-medium">/mo</span>
                  </div>

                  <button className={`w-full py-3 rounded-xl font-bold transition-all mb-8 shadow-sm ${
                    isPro 
                      ? 'bg-violet-600 text-white hover:bg-violet-700 hover:shadow-violet-600/25 hover:shadow-lg' 
                      : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                  }`}>
                    {plan.cta}
                  </button>

                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase text-zinc-900 tracking-wider mb-4">What's included</p>
                    <ul className="space-y-4">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-start gap-3 text-sm text-zinc-700">
                          <Check size={18} className="text-violet-600 flex-shrink-0" /> {f}
                        </li>
                      ))}
                      {plan.missing.map(f => (
                        <li key={f} className="flex items-start gap-3 text-sm text-zinc-400">
                          <X size={18} className="text-zinc-300 flex-shrink-0" /> <span className="line-through">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Feature Comparison Table ── */}
        <div className="max-w-5xl mx-auto px-6 mb-32 hidden md:block">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-zinc-900">Compare Plans</h2>
            <p className="text-zinc-500 mt-2">See exactly what you're getting.</p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="py-5 px-6 font-semibold text-zinc-900 w-1/3">Features</th>
                  <th className="py-5 px-6 font-semibold text-zinc-900 text-center">Free</th>
                  <th className="py-5 px-6 font-bold text-violet-700 bg-violet-50 text-center border-x border-violet-100">Pro</th>
                  <th className="py-5 px-6 font-semibold text-zinc-900 text-center">Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {featuresList.map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-zinc-700">{row.name}</td>
                    
                    <td className="py-4 px-6 text-sm text-center text-zinc-600">
                      {typeof row.free === 'boolean' 
                        ? (row.free ? <Check size={18} className="mx-auto text-emerald-500" /> : <X size={18} className="mx-auto text-zinc-300" />)
                        : row.free}
                    </td>
                    
                    <td className="py-4 px-6 text-sm text-center font-semibold text-violet-800 bg-violet-50/30 border-x border-violet-100">
                      {typeof row.pro === 'boolean' 
                        ? (row.pro ? <Check size={18} className="mx-auto text-violet-600" /> : <X size={18} className="mx-auto text-zinc-300" />)
                        : row.pro}
                    </td>

                    <td className="py-4 px-6 text-sm text-center text-zinc-600">
                      {typeof row.team === 'boolean' 
                        ? (row.team ? <Check size={18} className="mx-auto text-emerald-500" /> : <X size={18} className="mx-auto text-zinc-300" />)
                        : row.team}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="max-w-3xl mx-auto px-6 mb-32">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-zinc-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`bg-white border transition-colors rounded-2xl overflow-hidden shadow-sm ${openFaq === i ? 'border-violet-300' : 'border-zinc-200'}`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-semibold text-zinc-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${openFaq === i ? 'rotate-180 text-violet-600' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-zinc-600 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer CTA ── */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-zinc-900 mb-6">Ready to win more clients?</h2>
          <a 
            href="/auth" 
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm md:text-base px-8 py-4 rounded-xl shadow-lg shadow-violet-600/30 transition-all hover:scale-105"
          >
            Start for free — no credit card required <ArrowRight size={18} />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
