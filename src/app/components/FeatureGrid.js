"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    id: "feature-cold-email",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    badge: "Cold Email",
    badgeClass: "badge-violet",
    title: "Cold Emails That Actually Get Replies",
    description:
      "Three tone options — Formal, Friendly, or Bold. Native-level English adapted to the client's country and industry. Subject line A/B variants included.",
    bullets: [
      "3 tone presets",
      "AI-optimised subject lines",
      "Instant copy with one click",
    ],
    color: "#7C3AED",
  },
  {
    id: "feature-custom-tones",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    ),
    badge: "3 Tone Modes",
    badgeClass: "badge-sky",
    title: "Formal, Friendly, or Bold — Your Choice",
    description:
      "Adjust the vibe of your outreach with a single click. From professional corporate emails to casual startup greetings.",
    bullets: ["Professional Formal", "Casual Friendly", "Aggressive Bold"],
    color: "#0EA5E9",
  },
  {
    id: "feature-history",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    badge: "Personal Library",
    badgeClass: "badge-emerald",
    title: "Never Lose a Winning Template",
    description:
      "Every email you generate is saved to your personal library. Browse, search, and reuse your best-performing outreach copy anytime.",
    bullets: ["Auto-save history", "Search by client name", "One-click reuse"],
    color: "#10B981",
  },
];

function FeatureCard({ feature, delay }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={feature.id}
      className={`feature-card p-7 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `${feature.color}18`, color: feature.color }}
      >
        {feature.icon}
      </div>

      {/* Badge */}
      <div className="mb-3">
        <span className={`badge ${feature.badgeClass}`}>{feature.badge}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-[#F4F4F5] mb-3 leading-snug">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-[#A1A1AA] text-sm leading-relaxed mb-5">
        {feature.description}
      </p>

      {/* Bullets */}
      <ul className="space-y-2">
        {feature.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2.5 text-sm text-[#A1A1AA]"
          >
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: `${feature.color}20` }}
            >
              <svg
                className="w-2.5 h-2.5"
                fill={feature.color}
                viewBox="0 0 24 24"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
              </svg>
            </span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FeatureGrid() {
  return (
    <section id="features" className="relative py-28 section-glow bg-[#09090B]">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1E1033]/20 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <span className="badge badge-violet mx-auto">What You Get</span>
          <h2 className="text-4xl font-bold text-[#F4F4F5] mt-4">
            High-Conversion Emails,{" "}
            <span className="gradient-text">Zero Effort</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto leading-relaxed">
            PitchCraft generates hyper-personalized outreach in seconds. Fill in
            4 fields and get a send-ready email that wins replies.
          </p>
        </div>

        {/* 3-column grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
