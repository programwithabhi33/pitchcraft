"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as Tabs from "@radix-ui/react-tabs";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Mail,
  User,
  ArrowRight,
  Zap,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  ArrowLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { PasswordInput, FloatingInput } from "@/utils/utils";

// ─── Zod schemas ──────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    rememberMe: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

// ─── UI Components ───────────────────────────────────────────────────────────

const benefits = [
  {
    icon: <Zap className="w-4 h-4" />,
    text: "Cold email generated in seconds",
  },
  {
    icon: <Mail className="w-4 h-4" />,
    text: "High-conversion subject lines included",
  },
  {
    icon: <ShieldCheck className="w-4 h-4" />,
    text: "Secure, verified accounts",
  },
];

// ─── Forms ───────────────────────────────────────────────────────────────────

function LoginForm({ onForgotClick }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    setError("");
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) {
        setError(result.error || "Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs p-3 rounded-xl flex items-center gap-2">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
      <FloatingInput
        id="login-email"
        label="Email address"
        type="email"
        icon={Mail}
        error={errors.email?.message}
        registration={register("email")}
      />
      <PasswordInput
        id="login-password"
        label="Password"
        error={errors.password?.message}
        registration={register("password")}
      />
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={onForgotClick}
          className="text-xs text-[#7C3AED] hover:text-[#A78BFA] font-medium transition-colors cursor-pointer"
        >
          Forgot password?
        </button>
      </div>
      <button
        id="login-submit-btn"
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-violet py-3.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          <>
            <span>Log In</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

function SignUpForm({ onVerifyRequired }) {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data) => {
    setError("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.message);
        return;
      }
      onVerifyRequired(data.email, data.password);
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs p-3 rounded-xl flex items-center gap-2">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
      <FloatingInput
        id="signup-name"
        label="Full name"
        icon={User}
        error={errors.name?.message}
        registration={register("name")}
      />
      <FloatingInput
        id="signup-email"
        label="Email address"
        type="email"
        icon={Mail}
        error={errors.email?.message}
        registration={register("email")}
      />
      <PasswordInput
        id="signup-password"
        label="Create password"
        error={errors.password?.message}
        registration={register("password")}
      />
      <PasswordInput
        id="signup-confirm"
        label="Confirm password"
        error={errors.confirmPassword?.message}
        registration={register("confirmPassword")}
      />
      <button
        id="signup-submit-btn"
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-violet py-3.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          <>
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

function OTPVerifyForm({ email, password }) {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(0);
  const inputRefs = useRef([]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (val, i) => {
    if (isNaN(val)) return;
    const newOtp = [...otp];
    const digit = val.slice(-1);
    newOtp[i] = digit;
    setOtp(newOtp);

    if (digit && i < 5) {
      inputRefs.current[i + 1].focus();
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace") {
      if (!otp[i] && i > 0) {
        const newOtp = [...otp];
        newOtp[i - 1] = "";
        setOtp(newOtp);
        inputRefs.current[i - 1].focus();
      } else if (otp[i]) {
        const newOtp = [...otp];
        newOtp[i] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(data)) {
      const digits = data.split("");
      setOtp(digits);
      inputRefs.current[5].focus();
    }
  };

  const handleResend = async () => {
    if (timer > 0 || isResending) return;

    setIsResending(true);
    setResendMessage("");
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resendOnly: true }), // We'll handle this in signup API
      });

      if (res.ok) {
        setResendMessage("Code has been resent successfully");
        setTimer(120); // 2 minute timer
      } else {
        setError("Failed to resend code");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setResendMessage("");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otp.join("") }),
      });

      if (!res.ok) {
        const r = await res.json();
        setError(r.message);
        setIsSubmitting(false);
        return;
      }

      // Verification successful! Now direct log in
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Verified, but login failed. Please log in manually.");
        setIsSubmitting(false);
      } else {
        router.push("/dashboard?verified=true");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong");
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <form onSubmit={handleVerify} className="space-y-6" noValidate>
      <div className="text-center space-y-2">
        <p className="text-sm text-[#71717A]">We sent a 6-digit code to</p>
        <p className="text-sm font-bold text-[#A78BFA] bg-[#7C3AED]/10 px-3 py-1 rounded-full inline-block">
          {email}
        </p>
      </div>

      <div className="flex justify-center gap-2.5">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={i === 0 ? handlePaste : undefined}
            className="w-12 h-14 bg-[#09090B] border border-[#27272A] rounded-xl text-center text-xl font-bold text-[#F4F4F5] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all cursor-text"
            maxLength={1}
            inputMode="numeric"
          />
        ))}
      </div>

      {resendMessage && (
        <div className="text-center text-xs text-emerald-500 font-medium bg-emerald-500/10 py-2 rounded-lg border border-emerald-500/20 flex items-center justify-center gap-1.5">
          <CheckCircle2 size={12} /> {resendMessage}
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-xs text-rose-500 font-semibold bg-rose-500/10 py-2 rounded-lg border border-rose-500/20"
        >
          {error}
        </motion.div>
      )}

      <button
        id="verify-submit-btn"
        type="submit"
        disabled={isSubmitting || otp.some((d) => !d)}
        className="w-full btn-violet py-3.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          <span>Complete Verification</span>
        )}
      </button>

      <div className="text-center pt-2">
        <p className="text-xs text-[#52525B]">
          Didn't receive code?{" "}
          {timer > 0 ? (
            <span className="text-[#71717A] font-medium ml-1">
              Resend in {formatTime(timer)}
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="text-[#7C3AED] hover:text-[#A78BFA] transition-colors font-bold underline underline-offset-4 cursor-pointer disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Resend"}
            </button>
          )}
        </p>
      </div>
    </form>
  );
}

function ForgotPasswordForm({ onBack }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.message || "Failed to send link");
        return;
      }
      setSuccess("Reset link sent! Please check your email.");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="space-y-4">
      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6 space-y-4"
        >
          <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto text-emerald-500">
            <CheckCircle2 size={28} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#F4F4F5]">Link Sent!</h3>
            <p className="text-sm text-[#71717A] leading-relaxed">
              We've sent a secure password reset link to your email address.
            </p>
          </div>
          <button
            onClick={onBack}
            className="w-full btn-outline py-3 text-sm font-semibold mt-4 cursor-pointer"
          >
            Return to Login
          </button>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-[#71717A] hover:text-[#F4F4F5] transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft size={12} /> Back to Login
          </button>
          <h2 className="text-xl font-bold text-[#F4F4F5]">Reset Password</h2>
          <p className="text-xs text-[#71717A] mb-4">
            Enter your email and we'll send you a link to reset your password.
          </p>
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs p-3 rounded-xl">
              {error}
            </div>
          )}
          <FloatingInput
            id="forgot-email"
            label="Email address"
            icon={Mail}
            error={errors.email?.message}
            registration={register("email")}
          />
          <button
            id="forgot-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-violet py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <span>Send Reset Link</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [step, setStep] = useState("auth"); // login | signup | verify | forgot
  const [emailForVerify, setEmailForVerify] = useState("");
  const [passwordForVerify, setPasswordForVerify] = useState("");

  const handleVerifyRequired = (email, password) => {
    setEmailForVerify(email);
    setPasswordForVerify(password);
    setStep("verify");
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex bg-[#09090B]">
      <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E1033] via-[#2D1060] to-[#09090B]" />
        <div className="absolute inset-0 mesh-grid opacity-20" />
        <div className="relative flex flex-col flex-1 p-10 justify-center text-center items-center">
          <div className="space-y-8 max-w-sm">
            <h2 className="text-3xl font-extrabold text-[#F4F4F5] leading-snug">
              Win clients with <span className="gradient-text">AI-written</span>{" "}
              emails
            </h2>
            <ul className="space-y-4 text-left">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#A78BFA] flex-shrink-0 mt-0.5">
                    {b.icon}
                  </div>
                  <span className="text-sm text-[#D4D4D8] leading-snug">
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:py-0 relative">
        <Link
          href="/"
          className="absolute top-10 left-10 flex items-center gap-2 text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-8 shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
            <AnimatePresence mode="wait">
              {step === "auth" && (
                <motion.div
                  key="auth-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Tabs.Root
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="space-y-6"
                  >
                    <Tabs.List className="flex rounded-xl bg-[#09090B] border border-[#27272A] p-1 gap-1">
                      {["login", "signup"].map((t) => (
                        <Tabs.Trigger
                          key={t}
                          value={t}
                          className={`relative flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 data-[state=active]:text-[#F4F4F5] data-[state=inactive]:text-[#71717A] cursor-pointer`}
                        >
                          {activeTab === t && (
                            <motion.div
                              layoutId="auth-tab-pill"
                              className="absolute inset-0 bg-[#27272A] rounded-lg border border-[#3F3F46]"
                            />
                          )}
                          <span className="relative z-10">
                            {t === "login" ? "Log In" : "Sign Up"}
                          </span>
                        </Tabs.Trigger>
                      ))}
                    </Tabs.List>

                    <button
                      onClick={handleGoogleSignIn}
                      className="w-full flex items-center justify-center gap-3 rounded-xl border border-[#3F3F46] bg-[#09090B] hover:bg-[#18181B] text-sm font-semibold py-3 transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </button>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-[#27272A]" />
                      <span className="text-[10px] text-[#52525B] font-bold">
                        OR
                      </span>
                      <div className="flex-1 h-px bg-[#27272A]" />
                    </div>

                    <Tabs.Content value="login">
                      <LoginForm onForgotClick={() => setStep("forgot")} />
                    </Tabs.Content>
                    <Tabs.Content value="signup">
                      <SignUpForm onVerifyRequired={handleVerifyRequired} />
                    </Tabs.Content>
                  </Tabs.Root>
                </motion.div>
              )}

              {step === "verify" && (
                <motion.div
                  key="verify-container"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-[#F4F4F5] text-center mb-2">
                    Verify your email
                  </h2>
                  <OTPVerifyForm
                    email={emailForVerify}
                    password={passwordForVerify}
                  />
                </motion.div>
              )}

              {step === "forgot" && (
                <motion.div
                  key="forgot-container"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <ForgotPasswordForm onBack={() => setStep("auth")} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="text-center text-[10px] text-[#52525B] mt-6">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="text-[#7C3AED] hover:text-[#A78BFA] transition-colors font-medium underline underline-offset-2 cursor-pointer"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-[#7C3AED] hover:text-[#A78BFA] transition-colors font-medium underline underline-offset-2 cursor-pointer"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}
