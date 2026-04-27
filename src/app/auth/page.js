'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import * as Tabs from '@radix-ui/react-tabs'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Label from '@radix-ui/react-label'
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckIcon,
  ArrowRight,
  Zap,
  Chrome,
} from 'lucide-react'

// ─── Zod schemas ──────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
})

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
})

// ─── Benefits list (left panel) ───────────────────────────────────────────────

const benefits = [
  {
    icon: <Zap className="w-4 h-4" />,
    text: 'Cold email + proposal PDF generated in 30 seconds',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    text: 'Native-level English adapted to any client market',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    text: 'Day 1 / 4 / 7 follow-up sequence auto-generated',
  },
]

// ─── Floating Label Input ──────────────────────────────────────────────────────

function FloatingInput({
  id,
  label,
  type = 'text',
  icon: Icon,
  error,
  registration,
  suffix,
}) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  return (
    <div className="relative">
      <div
        className={`relative flex items-center rounded-xl border transition-all duration-200 bg-[#09090B] ${
          error
            ? 'border-[#F43F5E] shadow-[0_0_0_3px_rgba(244,63,94,0.12)]'
            : focused
            ? 'border-[#7C3AED] shadow-[0_0_0_3px_rgba(124,58,237,0.15)]'
            : 'border-[#3F3F46] hover:border-[#52525B]'
        }`}
      >
        {/* Left icon */}
        <div className={`pl-4 flex-shrink-0 transition-colors duration-200 ${focused ? 'text-[#7C3AED]' : 'text-[#52525B]'}`}>
          <Icon className="w-4 h-4" />
        </div>

        {/* Input */}
        <input
          id={id}
          type={type}
          {...registration}
          onFocus={(e) => { setFocused(true); registration?.onBlur && null }}
          onBlur={(e) => {
            setFocused(false)
            setHasValue(e.target.value.length > 0)
            registration?.onBlur?.(e)
          }}
          onChange={(e) => {
            setHasValue(e.target.value.length > 0)
            registration?.onChange?.(e)
          }}
          placeholder=" "
          className="peer w-full bg-transparent px-3 pt-5 pb-2 text-sm text-[#F4F4F5] placeholder-transparent outline-none"
          autoComplete={
            id === 'email' ? 'email'
            : id === 'password' ? 'current-password'
            : id === 'name' ? 'name'
            : 'off'
          }
        />

        {/* Floating label */}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-11 transition-all duration-200 font-medium select-none ${
            focused || hasValue
              ? 'top-2 text-[10px] tracking-wide uppercase'
              : 'top-1/2 -translate-y-1/2 text-sm'
          } ${
            error ? 'text-[#F43F5E]'
            : focused ? 'text-[#7C3AED]'
            : 'text-[#71717A]'
          }`}
        >
          {label}
        </label>

        {/* Suffix (e.g., show/hide eye) */}
        {suffix && (
          <div className="pr-4 flex-shrink-0">
            {suffix}
          </div>
        )}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="mt-1.5 text-xs text-[#F43F5E] flex items-center gap-1.5 pl-1"
          >
            <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Password Input with show/hide ────────────────────────────────────────────

function PasswordInput({ id, label, error, registration }) {
  const [show, setShow] = useState(false)

  return (
    <FloatingInput
      id={id}
      label={label}
      type={show ? 'text' : 'password'}
      icon={Lock}
      error={error}
      registration={registration}
      suffix={
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          tabIndex={-1}
          className="text-[#52525B] hover:text-[#A1A1AA] transition-colors"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }
    />
  )
}

// ─── Google OAuth Button ───────────────────────────────────────────────────────

function GoogleButton({ label }) {
  return (
    <button
      id="auth-google-btn"
      type="button"
      className="group w-full flex items-center justify-center gap-3 rounded-xl border border-[#3F3F46] bg-[#18181B] hover:bg-[#27272A] hover:border-[#52525B] text-[#F4F4F5] font-semibold text-sm py-3.5 transition-all duration-200 active:scale-[0.99]"
    >
      {/* Google G SVG */}
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Continue with Google
    </button>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function OrDivider() {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-[#27272A]" />
      <span className="text-xs text-[#52525B] font-medium tracking-wider">OR CONTINUE WITH EMAIL</span>
      <div className="flex-1 h-px bg-[#27272A]" />
    </div>
  )
}

// ─── Login Form ───────────────────────────────────────────────────────────────

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })

  const [checked, setChecked] = useState(false)

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 1200))
    console.log('Login:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <GoogleButton label="Log in with Google" />
      <OrDivider />

      <FloatingInput
        id="login-email"
        label="Email address"
        type="email"
        icon={Mail}
        error={errors.email?.message}
        registration={register('email')}
      />

      <PasswordInput
        id="login-password"
        label="Password"
        error={errors.password?.message}
        registration={register('password')}
      />

      {/* Remember me + Forgot password */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <Checkbox.Root
            id="login-remember"
            checked={checked}
            onCheckedChange={setChecked}
            className="w-4 h-4 rounded border border-[#3F3F46] bg-[#09090B] data-[state=checked]:bg-[#7C3AED] data-[state=checked]:border-[#7C3AED] flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40"
          >
            <Checkbox.Indicator>
              <CheckIcon className="w-2.5 h-2.5 text-white" strokeWidth={3} />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Label.Root
            htmlFor="login-remember"
            className="text-xs text-[#A1A1AA] cursor-pointer select-none"
          >
            Remember me
          </Label.Root>
        </div>
        <a
          href="#"
          id="forgot-password-link"
          className="text-xs text-[#7C3AED] hover:text-[#A78BFA] transition-colors font-medium"
        >
          Forgot password?
        </a>
      </div>

      {/* Submit */}
      <button
        id="login-submit-btn"
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 btn-violet py-3.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Signing in…</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Log In
            <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </button>
    </form>
  )
}

// ─── Sign Up Form ─────────────────────────────────────────────────────────────

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signUpSchema) })

  const [checked, setChecked] = useState(false)

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 1400))
    console.log('SignUp:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <GoogleButton label="Sign up with Google" />
      <OrDivider />

      {/* Name field — animated in */}
      <motion.div
        initial={{ opacity: 0, height: 0, y: -8 }}
        animate={{ opacity: 1, height: 'auto', y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <FloatingInput
          id="signup-name"
          label="Full name"
          type="text"
          icon={User}
          error={errors.name?.message}
          registration={register('name')}
        />
      </motion.div>

      <FloatingInput
        id="signup-email"
        label="Work email"
        type="email"
        icon={Mail}
        error={errors.email?.message}
        registration={register('email')}
      />

      <PasswordInput
        id="signup-password"
        label="Create password (8+ chars)"
        error={errors.password?.message}
        registration={register('password')}
      />

      {/* Terms checkbox */}
      <div className="flex items-start gap-2.5 pt-1">
        <Checkbox.Root
          id="signup-terms"
          checked={checked}
          onCheckedChange={setChecked}
          className="mt-0.5 w-4 h-4 rounded border border-[#3F3F46] bg-[#09090B] data-[state=checked]:bg-[#7C3AED] data-[state=checked]:border-[#7C3AED] flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 flex-shrink-0"
        >
          <Checkbox.Indicator>
            <CheckIcon className="w-2.5 h-2.5 text-white" strokeWidth={3} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <Label.Root
          htmlFor="signup-terms"
          className="text-xs text-[#A1A1AA] leading-relaxed cursor-pointer"
        >
          I agree to the{' '}
          <a href="#" id="terms-link" className="text-[#7C3AED] hover:text-[#A78BFA] transition-colors">Terms of Service</a>
          {' '}and{' '}
          <a href="#" id="privacy-link" className="text-[#7C3AED] hover:text-[#A78BFA] transition-colors">Privacy Policy</a>
        </Label.Root>
      </div>

      {/* Submit */}
      <button
        id="signup-submit-btn"
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 btn-violet py-3.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Creating account…</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Create Free Account
            <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </button>
    </form>
  )
}

// ─── Auth Page ────────────────────────────────────────────────────────────────

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login')

  return (
    <div className="min-h-screen flex bg-[#09090B]">

      {/* ── Left Panel (40%) ───────────────────────────── */}
      <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden flex-col">

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E1033] via-[#2D1060] to-[#09090B]" />
        <div className="absolute inset-0 mesh-grid opacity-20" />

        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#7C3AED]/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-48 h-48 bg-[#6D28D9]/15 rounded-full blur-[60px] pointer-events-none" />

        {/* Content */}
        <div className="relative flex flex-col flex-1 p-10 justify-between">

          {/* Top: Logo */}
          <Link href="/" id="auth-logo" className="flex items-center gap-2.5 group w-fit">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] transition-shadow">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-[#F4F4F5] font-bold text-xl tracking-tight">
              PitchCraft <span className="gradient-text">AI</span>
            </span>
          </Link>

          {/* Middle: Tagline + Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="badge badge-violet text-[11px]">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                AI-Powered Outreach
              </span>
              <h2 className="text-3xl font-extrabold text-[#F4F4F5] leading-snug">
                Win clients with{' '}
                <span className="gradient-text">AI-written</span>{' '}
                emails &amp; proposals
              </h2>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                Fill in 4 fields. Get a polished cold email, a 1-page proposal PDF, and
                a 3-email follow-up sequence — in under 30 seconds.
              </p>
            </div>

            {/* Benefits */}
            <ul className="space-y-4">
              {benefits.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.12 }}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#A78BFA] flex-shrink-0 mt-0.5">
                    {b.icon}
                  </div>
                  <span className="text-sm text-[#D4D4D8] leading-snug">{b.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Bottom: Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center gap-3"
          >
            {/* Avatar stack */}
            <div className="flex -space-x-2">
              {['AM', 'SK', 'MD', 'RK'].map((initials, i) => (
                <div
                  key={initials}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-[#1E1033]"
                  style={{
                    background: `hsl(${270 + i * 25}, 60%, 50%)`,
                    zIndex: 4 - i,
                  }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-xs text-[#71717A] leading-snug">
              Join <span className="text-[#F4F4F5] font-semibold">2,400+</span> freelancers<br />
              already winning with PitchCraft
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Right Panel (60%) ──────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:py-0">

        {/* Mobile logo */}
        <Link href="/" id="auth-logo-mobile" className="lg:hidden flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="text-[#F4F4F5] font-bold text-lg">PitchCraft <span className="gradient-text">AI</span></span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-8 shadow-[0_24px_64px_rgba(0,0,0,0.5)]">

            {/* Tabs */}
            <Tabs.Root
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              {/* Tab header */}
              <div className="space-y-1">
                <Tabs.List
                  className="flex rounded-xl bg-[#09090B] border border-[#27272A] p-1 gap-1"
                  aria-label="Auth mode"
                >
                  {[
                    { value: 'login', id: 'auth-tab-login', label: 'Log In' },
                    { value: 'signup', id: 'auth-tab-signup', label: 'Sign Up' },
                  ].map(tab => (
                    <Tabs.Trigger
                      key={tab.value}
                      value={tab.value}
                      id={tab.id}
                      className="relative flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/60 data-[state=active]:text-[#F4F4F5] data-[state=inactive]:text-[#71717A] data-[state=inactive]:hover:text-[#A1A1AA]"
                    >
                      {/* Active indicator */}
                      {activeTab === tab.value && (
                        <motion.div
                          layoutId="auth-tab-indicator"
                          className="absolute inset-0 bg-[#27272A] rounded-lg border border-[#3F3F46]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
              </div>

              {/* Heading */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-2xl font-bold text-[#F4F4F5]">
                    {activeTab === 'login' ? 'Welcome back' : 'Create your account'}
                  </h1>
                  <p className="text-sm text-[#71717A] mt-1">
                    {activeTab === 'login'
                      ? 'Sign in to your PitchCraft workspace'
                      : 'Start writing better proposals in 30 seconds'}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Forms */}
              <Tabs.Content value="login" className="outline-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key="login-form"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <LoginForm />
                  </motion.div>
                </AnimatePresence>
              </Tabs.Content>

              <Tabs.Content value="signup" className="outline-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key="signup-form"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <SignUpForm />
                  </motion.div>
                </AnimatePresence>
              </Tabs.Content>
            </Tabs.Root>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-[#52525B] mt-5 leading-relaxed">
            By continuing, you agree to our{' '}
            <a href="#" id="auth-footer-terms" className="text-[#71717A] hover:text-[#A1A1AA] transition-colors underline underline-offset-2">Terms of Service</a>
            {' '}and{' '}
            <a href="#" id="auth-footer-privacy" className="text-[#71717A] hover:text-[#A1A1AA] transition-colors underline underline-offset-2">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
