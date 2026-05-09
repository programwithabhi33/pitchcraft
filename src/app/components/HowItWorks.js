// Server component — no 'use client' needed

export default function HowItWorks() {
  const steps = [
    {
      id: 'step-1',
      number: '01',
      title: 'Fill in 4 Fields',
      description: 'Tell us who you are, what you offer, the client\'s name, and the project type. Takes less than 60 seconds.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      id: 'step-2',
      number: '02',
      title: 'AI Generates Your Kit',
      description: 'PitchCraft generates a high-conversion cold email in 3 distinct tones — all in under 30 seconds.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'step-3',
      number: '03',
      title: 'Review, Edit & Send',
      description: 'Copy your favorite version with one click. Save it to your history or regenerate in seconds. Then send — and win.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
    },
  ]

  return (
    <section id="how-it-works" className="py-28 bg-[#18181B]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="badge badge-violet mx-auto">How It Works</span>
          <h2 className="text-4xl font-bold text-[#F4F4F5] mt-4">
            From Brief to{' '}
            <span className="gradient-text">Send-Ready</span>
            {' '}in 3 Steps
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-transparent via-[#7C3AED]/40 to-transparent" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.id} id={step.id} className="flex flex-col items-center text-center relative">
                {/* Number circle */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-[#09090B] border-2 border-[#7C3AED]/40 flex items-center justify-center shadow-[0_0_24px_rgba(124,58,237,0.15)]">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-[#6D28D9]/10 flex items-center justify-center text-[#A78BFA]">
                      {step.icon}
                    </div>
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#7C3AED] text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#F4F4F5] mb-3">{step.title}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

         {/* CTA */}
         <div className="text-center mt-16">
           <a
             href="/auth"
             id="how-it-works-cta"
             className="btn-violet inline-flex items-center gap-2.5 text-base px-8 py-3.5"
           >
             <span className="flex items-center gap-2.5">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
               Try It Free — No Card Needed
             </span>
           </a>
         </div>
      </div>
    </section>
  )
}
