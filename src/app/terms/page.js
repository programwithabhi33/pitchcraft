import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#09090B] py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-[#F4F4F5] mb-8">
            Terms of Service
          </h1>
          <div className="space-y-6 text-[#A1A1AA] leading-relaxed">
            <p>
              Welcome to PitchCraft AI. By using our service, you agree to the
              following terms:
            </p>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#F4F4F5]">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing PitchCraft AI, you agree to be bound by these Terms
                of Service and all applicable laws and regulations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#F4F4F5]">
                2. Use License
              </h2>
              <p>
                PitchCraft AI grants you a personal, non-exclusive license to
                use the AI-generated content for your professional outreach. You
                retain ownership of the generated copy but agree to use the
                service responsibly.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#F4F4F5]">
                3. Disclaimer
              </h2>
              <p>
                The materials on PitchCraft AI are provided on an 'as is' basis.
                PitchCraft AI makes no warranties, expressed or implied, and
                hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of
                merchantability or fitness for a particular purpose.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#F4F4F5]">
                4. Limitations
              </h2>
              <p>
                In no event shall PitchCraft AI or its suppliers be liable for
                any damages arising out of the use or inability to use the
                services, even if PitchCraft AI has been notified orally or in
                writing of the possibility of such damage.
              </p>
            </section>

            <p className="pt-8 text-xs italic border-t border-[#27272A]">
              Last Updated: May 2026
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
