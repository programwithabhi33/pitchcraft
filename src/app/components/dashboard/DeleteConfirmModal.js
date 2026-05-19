'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react'

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, isDeleting, title = "Delete this email?", message = "This action cannot be undone. This email will be permanently removed from your library." }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#000]/80 backdrop-blur-sm"
      />
      
      {/* Modal */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        className="relative w-full max-w-sm bg-[#18181B] border border-[#27272A] rounded-3xl p-6 shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col items-center text-center space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
            <Trash2 size={24} />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-[#F4F4F5]">{title}</h2>
            <p className="text-xs text-[#71717A] leading-relaxed">
              {message}
            </p>
          </div>

          <div className="flex flex-col w-full gap-2">
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer text-sm"
            >
              {isDeleting ? <Loader2 size={16} className="animate-spin" /> : null}
              {isDeleting ? 'Deleting...' : 'Delete Permanently'}
            </button>
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="w-full py-3 bg-[#27272A] hover:bg-[#3F3F46] text-[#F4F4F5] font-semibold rounded-xl transition-all cursor-pointer text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
