// Server component — no 'use client' needed

const footerLinks = {
  Product: [
    { id: "footer-features", label: "Features", href: "/#features" },
    {
      id: "footer-how-it-works",
      label: "How It Works",
      href: "/#how-it-works",
    },
    { id: "footer-faq", label: "FAQ", href: "/#faq" },
  ],
  Legal: [
    { id: "footer-privacy", label: "Privacy Policy", href: "/privacy" },
    { id: "footer-terms", label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#09090B] border-t border-[#3F3F46]/40">
      {/* CTA Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1E1033] via-[#2d1060] to-[#1E1033] py-16">
        <div className="absolute inset-0 mesh-grid opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#7C3AED]/20 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 text-center space-y-6">
          <span className="badge badge-violet mx-auto">Get Started</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F4F5] leading-tight mt-3">
            Stop Losing Clients to{" "}
            <span className="gradient-text">Weak Outreach</span>
          </h2>
          <p className="text-[#A1A1AA] text-base max-w-lg mx-auto">
            Generate high-conversion cold emails in 30 seconds. Start writing
            and winning today.
          </p>
          <a
            href="/auth"
            id="footer-cta-btn"
            className="btn-violet inline-flex items-center gap-2.5 text-base px-8 py-3.5 cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Generate My First Email
            </span>
          </a>
        </div>
      </div>

      {/* Footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-[#F4F4F5] font-bold text-lg tracking-tight">
                PitchCraft <span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              AI-powered cold emails for freelancers, agencies, and consultants.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <p className="text-[#F4F4F5] text-sm font-bold">{category}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.id}>
                    <a
                      id={link.id}
                      href={link.href}
                      className="text-[#A1A1AA] hover:text-[#F4F4F5] text-sm transition-colors cursor-pointer"
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
          <p>
            © {new Date().getFullYear()} PitchCraft AI. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
