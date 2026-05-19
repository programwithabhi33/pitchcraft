"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  User,
  Briefcase,
  Building2,
  Target,
  Lightbulb,
  Zap,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const TONES = [
  { id: "Formal", label: "Formal" },
  { id: "Friendly", label: "Friendly" },
  { id: "Bold", label: "Bold" },
];

export default function GeneratorForm({ isGenerating, onGenerate }) {
  // Use SWR with aggressive revalidation to catch settings changes
  const { data: user } = useSWR("/api/user/usage", fetcher, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "",
      service: "",
      clientName: "",
      clientIndustry: "",
      projectType: "",
      context: "",
      tone: "Friendly",
    },
  });

  const [selectedTone, setSelectedTone] = useState("Friendly");

  // Robust initialization and synchronization
  useEffect(() => {
    if (user) {
      // Normalize capitalization (Settings uses capitalized, API returns raw)
      const rawTone = user.senderTone || "Friendly";
      const normalizedTone =
        rawTone.charAt(0).toUpperCase() + rawTone.slice(1).toLowerCase();

      reset({
        role: user.senderName || user.name || "",
        service: user.senderRole || "",
        clientName: "",
        clientIndustry: "",
        projectType: "",
        context: "",
        tone: normalizedTone,
      });

      // Update local state for visual button highlighting
      setSelectedTone(normalizedTone);
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    onGenerate({ ...data, tone: selectedTone });
  };

  const placeholders = {
    role: "e.g. Arjun, React Developer",
    service: "e.g. Frontend MVP Builds",
    clientName: "e.g. Acme Startup",
    clientIndustry: "e.g. FinTech / SaaS",
    projectType: "e.g. Dashboard Rewrite",
    context: "e.g. Budget is tight, focus on speed to market.",
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Your details */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[#A1A1AA] flex items-center gap-2 uppercase tracking-wide">
            <User size={14} className="text-[#7C3AED]" /> You
          </h3>

          <div className="space-y-1">
            <label className="text-xs text-[#A1A1AA] font-medium ml-1">
              Your Name / Role
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
              <input
                {...register("role", {
                  required: "Please enter your name or role",
                })}
                placeholder={placeholders.role}
                className={`w-full bg-[#18181B] border rounded-xl px-9 py-2.5 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none transition-all ${
                  errors.role
                    ? "border-rose-500/50 focus:border-rose-500"
                    : "border-[#27272A] focus:border-[#7C3AED]"
                }`}
              />
            </div>
            {errors.role && (
              <p className="text-[10px] text-rose-500 mt-1 ml-1 flex items-center gap-1">
                <AlertCircle size={10} /> {errors.role.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs text-[#A1A1AA] font-medium ml-1">
              Your Service
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
              <input
                {...register("service", {
                  required: "Please enter what you offer",
                })}
                placeholder={placeholders.service}
                className={`w-full bg-[#18181B] border rounded-xl px-9 py-2.5 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none transition-all ${
                  errors.service
                    ? "border-rose-500/50 focus:border-rose-500"
                    : "border-[#27272A] focus:border-[#7C3AED]"
                }`}
              />
            </div>
            {errors.service && (
              <p className="text-[10px] text-rose-500 mt-1 ml-1 flex items-center gap-1">
                <AlertCircle size={10} /> {errors.service.message}
              </p>
            )}
          </div>
        </div>

        {/* Client details */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[#A1A1AA] flex items-center gap-2 uppercase tracking-wide">
            <Building2 size={14} className="text-[#0EA5E9]" /> Client
          </h3>

          <div className="space-y-1">
            <label className="text-xs text-[#A1A1AA] font-medium ml-1">
              Client Name / Company
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
              <input
                {...register("clientName", {
                  required: "Please enter client name",
                })}
                placeholder={placeholders.clientName}
                className={`w-full bg-[#18181B] border rounded-xl px-9 py-2.5 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none transition-all ${
                  errors.clientName
                    ? "border-rose-500/50 focus:border-rose-500"
                    : "border-[#27272A] focus:border-[#7C3AED]"
                }`}
              />
            </div>
            {errors.clientName && (
              <p className="text-[10px] text-rose-500 mt-1 ml-1 flex items-center gap-1">
                <AlertCircle size={10} /> {errors.clientName.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs text-[#A1A1AA] font-medium ml-1">
              Client Industry
            </label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
              <input
                {...register("clientIndustry", {
                  required: "Please enter industry",
                })}
                placeholder={placeholders.clientIndustry}
                className={`w-full bg-[#18181B] border rounded-xl px-9 py-2.5 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none transition-all ${
                  errors.clientIndustry
                    ? "border-rose-500/50 focus:border-rose-500"
                    : "border-[#27272A] focus:border-[#7C3AED]"
                }`}
              />
            </div>
            {errors.clientIndustry && (
              <p className="text-[10px] text-rose-500 mt-1 ml-1 flex items-center gap-1">
                <AlertCircle size={10} /> {errors.clientIndustry.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-[#27272A]" />

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-[#A1A1AA] flex items-center gap-2 uppercase tracking-wide">
          <Lightbulb size={14} className="text-[#F59E0B]" /> Project Context
        </h3>

        <div className="space-y-1">
          <label className="text-xs text-[#A1A1AA] font-medium ml-1">
            Project Type (Optional)
          </label>
          <div className="relative">
            <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
            <input
              {...register("projectType")}
              placeholder={placeholders.projectType}
              className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-9 py-2.5 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-[#A1A1AA] font-medium ml-1">
            Extra Context / Notes
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#52525B]" />
            <textarea
              {...register("context")}
              placeholder={placeholders.context}
              rows={3}
              className="w-full bg-[#18181B] border border-[#27272A] rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] transition-all resize-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-4 flex flex-col gap-4">
        <div>
          <label className="text-xs text-[#A1A1AA] font-medium mb-2 block">
            Voice &amp; Tone
          </label>
          <div className="flex items-center gap-2 bg-[#09090B] p-1 rounded-xl border border-[#27272A] w-fit relative z-0">
            {TONES.map((tone) => {
              const isSelected =
                selectedTone.toLowerCase() === tone.id.toLowerCase();
              return (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => setSelectedTone(tone.id)}
                  className={`cursor-pointer relative px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors z-10 ${
                    isSelected
                      ? "text-[#F4F4F5]"
                      : "text-[#71717A] hover:text-[#A1A1AA]"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="generator-tone-selection"
                      className="absolute inset-0 bg-[#27272A] border border-[#3F3F46] rounded-lg -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{tone.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full btn-violet py-3.5 text-sm font-bold flex items-center justify-center gap-2 group disabled:opacity-75 disabled:cursor-not-allowed shadow-[0_0_24px_rgba(124,58,237,0.2)] hover:shadow-[0_0_32px_rgba(124,58,237,0.3)] transition-all duration-300"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4 animate-spin text-[#A78BFA]"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Generating…
            </span>
          ) : (
            <span className="flex items-center gap-2 text-white">
              <Zap
                size={16}
                fill="currentColor"
                className="text-[#A78BFA] group-hover:scale-110 transition-transform"
              />
              Generate Cold Email
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
