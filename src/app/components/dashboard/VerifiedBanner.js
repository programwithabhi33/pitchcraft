'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function VerifiedBanner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (searchParams.get('verified') === 'true') {
      setShow(true)
      // Auto-hide after 6 seconds
      const timer = setTimeout(() => setShow(false), 6000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  const handleClose = () => {
    setShow(false)
    // Clean up the URL
    router.replace('/dashboard')
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          className="bg-emerald-500/10 border-b border-emerald-500/20"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-emerald-500">
              <CheckCircle2 size={18} />
              <p className="text-sm font-bold">Account has been verified successfully. Welcome to PitchCraft AI!</p>
            </div>
            <button 
              onClick={handleClose}
              className="text-emerald-500/60 hover:text-emerald-500 transition-colors p-1"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
