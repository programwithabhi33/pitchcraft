import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#09090B] py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-[#F4F4F5] mb-8">
            Privacy Policy
          </h1>
          <div className="space-y-6 text-[#A1A1AA] leading-relaxed">
            <p>
              Your privacy is important to us. It is PitchCraft AI's policy to
              respect your privacy regarding any information we may collect from
              you across our website.
            </p>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#F4F4F5]">
                1. Information We Collect
              </h2>
              <p>
                We only ask for personal information (like your name and email)
                when we truly need it to provide a service to you. We collect it
                by fair and lawful means, with your knowledge and consent.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#F4F4F5]">
                2. Use of Information
              </h2>
              <p>
                We use your information to manage your account, track your
                generation limits, and provide personalized AI outreach advice.
                We do not share any personally identifying information with
                third-parties, except when required to by law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#F4F4F5]">
                3. Data Security
              </h2>
              <p>
                We store only what is necessary to provide the service. We
                protect stored data within commercially acceptable means to
                prevent loss and theft, as well as unauthorized access,
                disclosure, copying, use, or modification.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#F4F4F5]">
                4. AI Data Processing
              </h2>
              <p>
                PitchCraft AI uses third-party AI models (like Groq/Llama) to
                generate content. While we send your brief to these models, we
                do not use your personal identity data for training purposes.
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
