import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-text-muted mb-6">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-text-muted leading-relaxed">
          <p>Last updated: April 27, 2026</p>
          <p>
            At PitchCraft AI, we take your privacy seriously. This Privacy
            Policy describes how we collect, use, and protect your information
            when you use our services.
          </p>
          <p>
            We collect personal information that you voluntarily provide to us,
            such as your name, email address, and usage data, to provide and
            improve our services.
          </p>
          <p>
            We do not sell your personal information to third parties. We may
            share data with trusted partners who assist us in operating our
            website and delivering our services.
          </p>
          <p>
            You have the right to access, correct, or delete your personal
            information at any time by contacting us.
          </p>
          <Link href="/" className="text-violet hover:text-violet-light">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
