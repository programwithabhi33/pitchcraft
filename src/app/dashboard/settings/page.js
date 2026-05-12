'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Send, ShieldAlert, ChevronRight, Loader2, CheckCircle2
} from 'lucide-react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

// --- Profile Section ---

function ProfileSection({ user, onUpdate }) {
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email })
    }
  }, [user])

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name }),
      })
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
        onUpdate() // Refresh SWR cache globally
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-[#F4F4F5]">Profile Setup</h2>
        <p className="text-sm text-[#71717A] mt-1">Manage your basic account details.</p>
      </div>

      <div className="flex items-center gap-6 pb-6 border-b border-[#27272A]">
        <div className="relative group cursor-default">
          {user?.avatar ? (
            <img src={user.avatar} className="w-20 h-20 rounded-full border-2 border-[#27272A]" alt={user.name} />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-bold text-[#F4F4F5]">{user?.name}</p>
          <p className="text-xs text-[#A1A1AA]">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4 max-w-lg">
        <div className="space-y-1">
          <label className="text-xs text-[#A1A1AA] font-medium ml-1">Display Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-[#F4F4F5] focus:outline-none focus:border-[#7C3AED]" 
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-[#A1A1AA] font-medium ml-1">Email Address (Read-only)</label>
          <input 
            type="email" 
            value={formData.email}
            disabled
            className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-[#52525B] cursor-not-allowed outline-none" 
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSaving}
          className="btn-violet px-6 py-2.5 text-sm mt-4 flex items-center gap-2"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : success ? <CheckCircle2 size={16} /> : null}
          {isSaving ? 'Saving...' : success ? 'Saved!' : 'Save Changes'}
        </button>
      </form>
      
      <div className="pt-10">
        <div className="p-5 bg-[#F43F5E]/5 border border-[#F43F5E]/20 rounded-2xl flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-[#F43F5E] flex items-center gap-2">
              <ShieldAlert size={16} /> Delete Account
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-1 max-w-sm">
              Permanently remove your account and all your outreach data.
            </p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-[#F43F5E]/10 text-[#F43F5E] hover:bg-[#F43F5E]/20 text-xs font-semibold transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// --- Sender Profile Section ---

function SenderProfileSection({ user, onUpdate }) {
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    senderName: user?.senderName || '',
    senderRole: user?.senderRole || '',
    senderTone: user?.senderTone || 'Friendly',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        senderName: user.senderName || '',
        senderRole: user.senderRole || '',
        senderTone: user.senderTone || 'Friendly',
      })
    }
  }, [user])

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
        onUpdate()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-[#F4F4F5]">Sender Profile</h2>
        <p className="text-sm text-[#71717A] mt-1">These details pre-fill the Generator form.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-5 max-w-lg">
        <div className="space-y-1">
          <label className="text-xs text-[#A1A1AA] font-medium ml-1">Your Full Name</label>
          <input 
            type="text" 
            value={formData.senderName}
            onChange={(e) => setFormData({...formData, senderName: e.target.value})}
            placeholder="e.g. Abhishek"
            className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-[#F4F4F5] focus:outline-none focus:border-[#7C3AED]" 
          />
        </div>
        
        <div className="space-y-1">
          <label className="text-xs text-[#A1A1AA] font-medium ml-1">Your Service / Title</label>
          <input 
            type="text" 
            value={formData.senderRole}
            onChange={(e) => setFormData({...formData, senderRole: e.target.value})}
            placeholder="e.g. Full-Stack Developer"
            className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-[#F4F4F5] focus:outline-none focus:border-[#7C3AED]" 
          />
        </div>

        <div className="space-y-1 pt-2">
          <label className="text-xs text-[#A1A1AA] font-medium ml-1 block mb-2">Default Tone</label>
          <div className="flex items-center gap-2 bg-[#18181B] p-1 rounded-xl border border-[#27272A] w-fit">
            {['Formal', 'Friendly', 'Bold'].map(tone => (
              <button
                key={tone}
                type="button"
                onClick={() => setFormData({...formData, senderTone: tone})}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  formData.senderTone === tone ? 'bg-[#27272A] text-[#F4F4F5]' : 'text-[#71717A] hover:text-[#A1A1AA]'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={isSaving}
          className="btn-violet px-6 py-2.5 text-sm mt-4 flex items-center gap-2"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : success ? <CheckCircle2 size={16} /> : null}
          {isSaving ? 'Saving...' : success ? 'Saved!' : 'Save Sender Profile'}
        </button>
      </form>
    </motion.div>
  )
}

// --- Main Page Component ---

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'sender', label: 'Sender Profile', icon: Send },
]

export default function SettingsPage() {
  const { data: user, mutate } = useSWR('/api/user/usage', fetcher)
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="flex flex-col min-h-full bg-[#09090B]">
      <div className="px-6 py-8 border-b border-[#27272A]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-[#F4F4F5]">Settings</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 p-6">
          
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="flex flex-col space-y-1">
              {TABS.map(tab => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                      isActive 
                        ? 'text-[#F4F4F5]' 
                        : 'text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#27272A]/50'
                    }`}
                  >
                    <div className="relative z-10 flex items-center gap-3">
                      <Icon size={16} className={isActive ? 'text-[#A78BFA]' : 'text-[#71717A]'} />
                      <span>{tab.label}</span>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="settings-tab-bg"
                        className="absolute inset-0 bg-[#27272A] border border-[#3F3F46] rounded-xl"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && <ProfileSection key="profile" user={user} onUpdate={mutate} />}
              {activeTab === 'sender' && <SenderProfileSection key="sender" user={user} onUpdate={mutate} />}
            </AnimatePresence>
          </main>

        </div>
      </div>
    </div>
  )
}
