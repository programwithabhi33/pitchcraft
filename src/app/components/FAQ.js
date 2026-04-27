'use client'

import { useState } from 'react'

const faqs = [
  {
    id: 'faq-1',
    question: 'Do I need any writing skills to use PitchCraft?',
    answer:
      'Not at all. You just fill in 4 fields: who you are, what you offer, the client\'s name, and the project type. PitchCraft generates the complete copy — subject line, email, proposal, and follow-ups — in native-level English.',
  },
  {
    id: 'faq-2',
    question: 'Will clients know an AI wrote my email?',
    answer:
      'No. PitchCraft is trained to produce natural, human-sounding outreach. Emails don\'t sound robotic or templated — they\'re specific to your client\'s industry, location, and project. Every output is unique.',
  },
  {
    id: 'faq-3',
    question: 'How is the proposal PDF generated?',
    answer:
      'The AI builds a 1-page proposal with your scope, deliverables, timeline, pricing, and credential summary. You can review and edit before exporting to a ready-to-send PDF — no Word, no Canva, no design skills needed.',
  },
  {
    id: 'faq-4',
    question: 'Can I use PitchCraft for any niche or industry?',
    answer:
      'Yes. PitchCraft works for software developers, designers, video editors, copywriters, SEO agencies, marketing consultants, and any service business. The AI adapts the tone and language to your specific industry and client profile.',
  },
  {
    id: 'faq-5',
    question: 'Is there a limit on how many proposals I can generate?',
    answer:
      'Free plan: 5 emails and 2 PDFs per month. Pro plan: unlimited emails, proposals, follow-ups, and LinkedIn messages. Team plan: unlimited output for up to 8 team members with shared brand settings.',
  },
  {
    id: 'faq-6',
    question: 'What if I\'m not happy with the output?',
    answer:
      'You can regenerate with a different tone or brief at any time. Pro users get 3 tone variants per generation. If you\'re still not satisfied, we offer a 7-day money-back guarantee on all paid plans — no questions asked.',
  },
]

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      id={faq.id}
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${
        open ? 'border-[#7C3AED]/50 bg-[#1E1033]/40' : 'border-[#3F3F46] bg-[#18181B]'
      }`}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between text-left px-6 py-5 gap-4"
        aria-expanded={open}
      >
        <span className="text-[#F4F4F5] font-semibold text-sm sm:text-base leading-snug">
          {faq.question}
        </span>
        <div
          className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
            open ? 'bg-[#7C3AED] rotate-45' : 'bg-[#3F3F46]/60'
          }`}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-[#A1A1AA] text-sm leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-28 bg-[#09090B]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <span className="badge badge-violet mx-auto">FAQ</span>
          <h2 className="text-4xl font-bold text-[#F4F4F5] mt-4">
            Common <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-[#A1A1AA] text-base">
            Everything you need to know before your first generation.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map(faq => <FAQItem key={faq.id} faq={faq} />)}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#A1A1AA] text-sm mb-4">Still have questions?</p>
          <a
            href="mailto:hello@pitchcraft.ai"
            id="faq-contact-link"
            className="text-[#A78BFA] hover:text-[#7C3AED] font-semibold text-sm transition-colors underline underline-offset-4"
          >
            hello@pitchcraft.ai
          </a>
        </div>
      </div>
    </section>
  )
}
