// Server component — no 'use client' needed

const footerLinks = {
  Product: [
    { id: 'footer-features', label: 'Features', href: '#features' },
    { id: 'footer-pricing', label: 'Pricing', href: '#pricing' },
    { id: 'footer-how-it-works', label: 'How It Works', href: '#how-it-works' },
    { id: 'footer-changelog', label: 'Changelog', href: '/' },
  ],
  Company: [
    { id: 'footer-about', label: 'About', href: '/' },
    { id: 'footer-blog', label: 'Blog', href: '/' },
    { id: 'footer-careers', label: 'Careers', href: '/' },
    { id: 'footer-contact', label: 'Contact', href: '/' },
  ],
  Legal: [
    { id: 'footer-privacy', label: 'Privacy Policy', href: '/' },
    { id: 'footer-terms', label: 'Terms of Service', href: '/' },
    { id: 'footer-refund', label: 'Refund Policy', href: '/' },
  ],
}

const socialLinks = [
  {
    id: 'social-twitter',
    label: 'Twitter',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'social-linkedin',
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'social-github',
    label: 'GitHub',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#09090B] border-t border-[#3F3F46]/40">

           {/* CTA Banner */}
           <div className="relative overflow-hidden bg-gradient-to-r from-[#1E1033] via-[#2d1060] to-[#1E1033] py-16">
             <div className="absolute inset-0 mesh-grid opacity-20" />
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#7C3AED]/20 rounded-full blur-3xl" />

             <div className="relative max-w-3xl mx-auto px-4 text-center space-y-6">
               <span className="badge badge-violet mx-auto">Get Started Today</span>
               <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F4F5] leading-tight mt-3">
                 Stop Losing Clients to{' '}
                 <span className="gradient-text">Weak Proposals</span>
               </h2>
               <p className="text-[#A1A1AA] text-base max-w-lg mx-auto">
                 Join 2,400+ freelancers already using PitchCraft to win projects with AI-powered outreach.
                 Start free — no credit card required.
               </p>
               <a
                 href="/auth"
                 id="footer-cta-btn"
                 className="btn-violet inline-flex items-center gap-2.5 text-base px-8 py-3.5"
               >
                 <span className="flex items-center gap-2.5">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                   </svg>
                   Generate My First Email Free
                 </span>
               </a>
             </div>
           </div>

      {/* Footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-[#F4F4F5] font-bold text-lg tracking-tight">
                PitchCraft <span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              AI-powered cold emails and proposals for freelancers, agencies, and consultants.
            </p>
           {/* Social icons */}
             <div className="flex gap-2 pt-1">
               {socialLinks.map((link, index) => {
                 let url = '#'
                 if (link.id === 'social-twitter') url = 'https://twitter.com/pitchcraftai'
                 else if (link.id === 'social-linkedin') url = 'https://linkedin.com/company/pitchcraftai'
                 else if (link.id === 'social-github') url = 'https://github.com/pitchcraftai'
                 
                 return (
                   <a
                     key={link.id}
                     id={link.id}
                     href={url}
                     aria-label={link.label}
                     className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#3F3F46] flex items-center justify-center text-[#A1A1AA] hover:text-[#A78BFA] hover:border-[#7C3AED]/40 transition-all"
                   >
                     {link.icon}
                   </a>
                 )
               })}
             </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <p className="text-[#F4F4F5] text-sm font-bold">{category}</p>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.id}>
                    <a
                      id={link.id}
                      href={link.href}
                      className="text-[#A1A1AA] hover:text-[#F4F4F5] text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#3F3F46]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#A1A1AA]">
          <p>© {new Date().getFullYear()} PitchCraft AI. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
