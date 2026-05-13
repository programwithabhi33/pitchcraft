'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, ShieldAlert, Loader2, CheckCircle2, Briefcase, Sparkles, X, AlertTriangle
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

// --- Confirmation Modal ---

function DeleteAccountModal({ isOpen, onClose, onConfirm, isDeleting }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-[#18181B] border border-[#27272A] rounded-3xl p-8 shadow-2xl overflow-hidden"
      >
        {/* Warning Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
            <AlertTriangle size={32} />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#F4F4F5]">Delete your account?</h2>
            <p className="text-sm text-[#71717A] leading-relaxed">
              This action is <span className="text-rose-500 font-bold uppercase tracking-tight">permanent</span>. 
              You will lose access to all your saved emails and outreach history forever.
            </p>
          </div>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 active:scale-[0.98]"
            >
              {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <ShieldAlert size={18} />}
              {isDeleting ? 'Deleting Account...' : 'Yes, Delete Everything'}
            </button>
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="w-full py-3.5 bg-[#27272A] hover:bg-[#3F3F46] text-[#F4F4F5] font-semibold rounded-xl transition-all"
            >
              Nevermind, Keep My Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// --- Main Settings Component ---

export default function SettingsPage() {
  const { data: user, mutate, isLoading: isFetching } = useSWR('/api/user/usage', fetcher, {
    revalidateOnFocus: true,
    revalidateOnMount: true
  })
  
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    senderRole: '',
    senderTone: 'Friendly',
  })

  // Robust initialization from SWR data
  useEffect(() => {
    if (user) {
      const normalizedTone = user.senderTone 
        ? (user.senderTone.charAt(0).toUpperCase() + user.senderTone.slice(1).toLowerCase()) 
        : 'Friendly';

      setFormData({
        name: user.name || '',
        senderRole: user.senderRole || '',
        senderTone: normalizedTone,
      })
    }
  }, [user])

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setSuccess(false)
    
    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name,
          senderName: formData.name, 
          senderRole: formData.senderRole,
          senderTone: formData.senderTone
        }),
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
        await mutate()
      } else {
        alert('Failed to save settings. Please try again.')
      }
    } catch (error) {
      console.error('Settings save error:', error)
      alert('An error occurred while saving.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      const res = await fetch('/api/user/delete', { method: 'DELETE' })
      if (res.ok) {
        // Log out user and redirect to home after successful deletion
        signOut({ callbackUrl: '/' })
      } else {
        alert('Failed to delete account. Please contact support.')
        setIsDeleting(false)
        setIsModalOpen(false)
      }
    } catch (error) {
      console.error('Account deletion error:', error)
      alert('An error occurred during deletion.')
      setIsDeleting(false)
      setIsModalOpen(false)
    }
  }

  const TONE_OPTIONS = ['Formal', 'Friendly', 'Bold']

  return (
    <div className="flex flex-col min-h-full bg-[#09090B]">
      {/* ── Page Header ── */}
      <div className="px-6 py-8 border-b border-[#27272A]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-[#F4F4F5]">Profile Settings</h1>
          <p className="text-sm text-[#71717A] mt-1">Manage your identity and outreach defaults.</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#18181B] border border-[#27272A] rounded-2xl overflow-hidden shadow-xl">
            
            <div className="grid grid-cols-1 md:grid-cols-3">
              
              {/* Left Column: Visuals */}
              <div className="p-8 bg-[#1E1033]/20 border-b md:border-b-0 md:border-r border-[#27272A] flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 rounded-3xl border-2 border-[#7C3AED]/50 shadow-[0_0_20px_rgba(124,58,237,0.2)]" 
                      alt={user.name} 
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center text-white text-3xl font-bold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F4F4F5]">{isFetching ? 'Loading...' : (user?.name || 'User')}</h3>
                  <p className="text-[10px] text-[#52525B] font-medium uppercase tracking-widest mt-1">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="md:col-span-2 p-8">
                <form onSubmit={handleSave} className="space-y-6">
                  
                  <div className="grid grid-cols-1 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA] flex items-center gap-2">
                        <User size={13} className="text-[#7C3AED]" /> Your Full Name
                      </label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-[#09090B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-[#F4F4F5] focus:outline-none focus:border-[#7C3AED] transition-all" 
                        placeholder="e.g. Abhishek Gupta"
                      />
                    </div>

                    {/* Service/Title */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA] flex items-center gap-2">
                        <Briefcase size={13} className="text-[#0EA5E9]" /> Your Service / Title
                      </label>
                      <input 
                        type="text" 
                        value={formData.senderRole}
                        onChange={(e) => setFormData({...formData, senderRole: e.target.value})}
                        className="w-full bg-[#09090B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-[#F4F4F5] focus:outline-none focus:border-[#7C3AED] transition-all" 
                        placeholder="e.g. Full-Stack Developer"
                      />
                    </div>

                    {/* Default Tone */}
                    <div className="space-y-1.5 pt-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA] flex items-center gap-2 mb-2">
                        <Sparkles size={13} className="text-[#F59E0B]" /> Default Tone
                      </label>
                      <div className="flex items-center gap-2 bg-[#09090B] p-1 rounded-xl border border-[#27272A] w-fit relative z-0">
                        {TONE_OPTIONS.map(tone => {
                          const isSelected = formData.senderTone.toLowerCase() === tone.toLowerCase();
                          return (
                            <button
                              key={tone}
                              type="button"
                              onClick={() => setFormData({...formData, senderTone: tone})}
                              className={`relative px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-200 z-10 ${
                                isSelected ? 'text-[#F4F4F5]' : 'text-[#71717A] hover:text-[#A1A1AA]'
                              }`}
                            >
                              {isSelected && (
                                <motion.div
                                  layoutId="settings-tone-pill"
                                  className="absolute inset-0 bg-[#27272A] border border-[#3F3F46] rounded-lg -z-10"
                                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                              )}
                              <span className="relative z-10">{tone}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#27272A] flex items-center justify-between">
                    <p className="text-[10px] text-[#52525B]">Last updated: {new Date().toLocaleDateString()}</p>
                    <button 
                      type="submit" 
                      disabled={isSaving}
                      className="btn-violet px-8 py-3 text-sm font-bold flex items-center gap-2 min-w-[160px] justify-center"
                    >
                      {isSaving ? <Loader2 size={16} className="animate-spin" /> : success ? <CheckCircle2 size={16} /> : null}
                      {isSaving ? 'Saving...' : success ? 'Successfully Saved!' : 'Save Profile'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Minimal Danger Zone */}
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group text-xs font-medium text-[#52525B] hover:text-rose-500 transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-rose-500/5"
            >
              <ShieldAlert size={14} className="group-hover:animate-pulse" /> 
              Delete your account and all data
            </button>
          </div>

        </div>
      </div>

      {/* Confirmation Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <DeleteAccountModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleDeleteAccount}
            isDeleting={isDeleting}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
