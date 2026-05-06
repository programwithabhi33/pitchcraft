import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#09090B] font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-[#F4F4F5] mb-6">
          Terms of Service
        </h1>
        <div className="space-y-6 text-[#A1A1AA] leading-relaxed">
          <p>
            Last updated: April 27, 2026
          </p>
          <p>
            Welcome to PitchCraft AI! These Terms of Service ("Terms") govern your use of our website and services.
          </p>
          <p>
            By accessing or using our services, you agree to be bound by these Terms. If you do not agree, please do not use our services.
          </p>
          <p>
            We reserve the right to modify these Terms at any time. Your continued use of the service after any modifications constitutes your acceptance of the updated Terms.
          </p>
          <Link href="/" className="text-[#7C3AED] hover:text-[#A78BFA]">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}