'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  AlertCircle,
  Loader2,
  CheckCircle2,
} from 'lucide-react'
import { PasswordInput } from '@/utils/utils'

const resetSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(resetSchema)
  })

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <AlertCircle size={48} className="mx-auto text-rose-500" />
        <h2 className="text-xl font-bold text-[#F4F4F5]">Invalid Link</h2>
        <p className="text-sm text-[#71717A]">This password reset link is missing a token or is invalid.</p>
        <Link href="/auth" className="btn-violet px-6 py-2 text-sm inline-block w-full text-center mt-4 cursor-pointer">
          <span>Back to Login</span>
        </Link>
      </div>
    )
  }

  const onSubmit = async (data) => {
    setError('')
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: data.password })
      })
      
      const result = await res.json()
      
      if (!res.ok) {
        setError(result.message || 'Failed to reset password')
        return
      }

      setSuccess(true)
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  return (
    <div className="space-y-8">
      {/* ── Logo ── */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className="text-[#F4F4F5] font-bold text-2xl tracking-tight">
          PitchCraft <span className="gradient-text">AI</span>
        </span>
      </div>

      {success ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4 space-y-6"
        >
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto text-emerald-500">
            <CheckCircle2 size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#F4F4F5]">Password Updated!</h3>
            <p className="text-sm text-[#71717A] leading-relaxed">
              Your password has been reset successfully. You can now log in with your new credentials.
            </p>
          </div>
          <Link
            href="/auth"
            className="w-full btn-violet py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Return to Login</span>
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#F4F4F5]">Set new password</h2>
            <p className="text-sm text-[#71717A] mt-1 text-center">Please enter your new secure password.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs p-3 rounded-xl flex items-center gap-2">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <PasswordInput 
              id="reset-password"
              label="New Password"
              error={errors.password?.message}
              registration={register('password')}
            />

            <PasswordInput 
              id="reset-confirm"
              label="Confirm New Password"
              error={errors.confirmPassword?.message}
              registration={register('confirmPassword')}
            />

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-violet py-3.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 mt-2 cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <span>Update Password</span>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#18181B] border border-[#27272A] rounded-3xl p-10 shadow-2xl shadow-black/50">
        <Suspense fallback={<div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#7C3AED]" /></div>}>
          <ResetPasswordContent />
        </Suspense>
      </div>
    </div>
  )
}
