"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Eye, EyeOff, Lock } from "lucide-react";

function FloatingInput({
  id,
  label,
  type = "text",
  icon: Icon,
  error,
  registration,
  suffix,
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <div
        className={`relative flex items-center rounded-xl border transition-all duration-200 bg-[#09090B] ${error ? "border-[#F43F5E] shadow-[0_0_0_3px_rgba(244,63,94,0.12)]" : focused ? "border-[#7C3AED] shadow-[0_0_0_3px_rgba(124,58,237,0.15)]" : "border-[#3F3F46] hover:border-[#52525B]"}`}
      >
        <div
          className={`pl-4 flex-shrink-0 transition-colors duration-200 ${focused ? "text-[#7C3AED]" : "text-[#52525B]"}`}
        >
          <Icon className="w-4 h-4" />
        </div>
        <input
          id={id}
          type={type}
          {...registration}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
            registration?.onBlur?.(e);
          }}
          onChange={(e) => {
            setHasValue(e.target.value.length > 0);
            registration?.onChange?.(e);
          }}
          placeholder=" "
          className="peer w-full bg-transparent px-3 pt-5 pb-2 text-sm text-[#F4F4F5] placeholder-transparent outline-none"
        />
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-11 transition-all duration-200 font-medium select-none ${focused || hasValue ? "top-2 text-[10px] tracking-wide uppercase" : "top-1/2 -translate-y-1/2 text-sm"} ${error ? "text-[#F43F5E]" : focused ? "text-[#7C3AED]" : "text-[#71717A]"}`}
        >
          {label}
        </label>
        {suffix && <div className="pr-4 flex-shrink-0">{suffix}</div>}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 text-xs text-[#F43F5E] flex items-center gap-1.5 pl-1"
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function PasswordInput({ id, label, error, registration }) {
  const [show, setShow] = useState(false);
  return (
    <FloatingInput
      id={id}
      label={label}
      type={show ? "text" : "password"}
      icon={Lock}
      error={error}
      registration={registration}
      suffix={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          tabIndex={-1}
          className="text-[#52525B] hover:text-[#A1A1AA] transition-colors cursor-pointer"
        >
          {show ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      }
    />
  );
}

export { PasswordInput, FloatingInput };
