'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Send, CreditCard, Bell, Code, 
  Upload, CheckCircle2, AlertTriangle, Key, 
  Copy, RefreshCw, ChevronRight, ShieldAlert
} from 'lucide-react'

// --- Sections ---

function ProfileSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-[#F4F4F5]">Profile Setup</h2>
        <p className="text-sm text-[#71717A] mt-1">Manage your account details and password.</p>
      </div>

      <div className="flex items-center gap-6 pb-6 border-b border-[#27272A]">
        <div className="relative group cursor-pointer">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
            AM
          </div>
          <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Upload size={20} className="text-white" />
          </div>
        </div>
        <div>
          <button className="btn-violet px-4 py-2 text-xs mb-2">Upload new avatar</button>
          <p className="text-[10px] text-[#A1A1AA]">JPG, GIF or PNG. 1MB max.</p>
        </div>
      </div>

      <form className="space-y-4 max-w-lg">
        <div className="space-y-1">
          <label className="text-xs text-[#A1A1AA] font-medium ml-1">Full Name</label>
          <input type="text" defaultValue="Arjun M." className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-[#F4F4F5] focus:outline-none focus:border-[#7C3AED]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-[#A1A1AA] font-medium ml-1">Email Address</label>
          <input type="email" defaultValue="arjun@example.com" className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-[#F4F4F5] focus:outline-none focus:border-[#7C3AED]" />
        </div>
        <div className="pt-4 space-y-1 relative">
          <label className="text-xs text-[#A1A1AA] font-medium ml-1">New Password</label>
          <input type="password" placeholder="••••••••" className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-[#F4F4F5] focus:outline-none focus:border-[#7C3AED]" />
        </div>
        
        <button type="button" className="btn-violet px-6 py-2.5 text-sm mt-4">Save Changes</button>
      </form>
      
      {/* Danger Zone */}
      <div className="pt-10">
        <div className="p-5 bg-[#F43F5E]/5 border border-[#F43F5E]/20 rounded-2xl flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-[#F43F5E] flex items-center gap-2">
              <ShieldAlert size={16} /> Delete Account
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-1 max-w-sm">
              Permanently remove your account and all generated outputs. This action cannot be undone.
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

function SenderProfileSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-[#F4F4F5]">Sender Profile</h2>
        <p className="text-sm text-[#71717A] mt-1">These details pre-fill the Generator form to save you time.</p>
      </div>

      <form className="space-y-5 max-w-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-[#A1A1AA] font-medium ml-1">Your Name</label>
            <input type="text" defaultValue="Arjun" className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-[#F4F4F5] focus:outline-none focus:border-[#7C3AED]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-[#A1A1AA] font-medium ml-1">Your Title / Role</label>
            <input type="text" defaultValue="Fullstack Developer" className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-[#F4F4F5] focus:outline-none focus:border-[#7C3AED]" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-[#A1A1AA] font-medium ml-1">Company (Optional)</label>
          <input type="text" defaultValue="Acme Studios" className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-[#F4F4F5] focus:outline-none focus:border-[#7C3AED]" />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-[#A1A1AA] font-medium ml-1">Website URL</label>
          <input type="url" defaultValue="https://arjun.dev" className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-[#F4F4F5] focus:outline-none focus:border-[#7C3AED]" />
        </div>

        <div className="space-y-1 pt-2">
          <label className="text-xs text-[#A1A1AA] font-medium ml-1 block mb-2">Default Tone</label>
          <div className="flex items-center gap-2 bg-[#18181B] p-1 rounded-xl border border-[#27272A] w-fit">
            {['Formal', 'Friendly', 'Bold'].map(tone => (
              <button
                key={tone}
                type="button"
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  tone === 'Friendly' ? 'bg-[#27272A] text-[#F4F4F5]' : 'text-[#71717A] hover:text-[#A1A1AA]'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>
        
        <button type="button" className="btn-violet px-6 py-2.5 text-sm mt-4">Save Defaults</button>
      </form>
    </motion.div>
  )
}

function BillingSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-[#F4F4F5]">Billing &amp; Usage</h2>
        <p className="text-sm text-[#71717A] mt-1">Manage your subscription and view generation limits.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Current Plan */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-5">
            <span className="badge badge-amber text-[10px]">Free Plan</span>
          </div>
          <h3 className="text-sm font-semibold text-[#A1A1AA] mb-4">Current Plan</h3>
          <p className="text-3xl font-bold text-[#F4F4F5] mb-1">₹0<span className="text-sm text-[#71717A] font-medium">/month</span></p>
          <p className="text-xs text-[#71717A] mb-6">5 generations per month.</p>
          
          <button className="btn-violet w-full py-2.5 text-sm">Upgrade to Pro</button>
        </div>

        {/* Usage */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-[#A1A1AA] mb-4">Monthly Usage</h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#F4F4F5] font-semibold">2</span>
              <span className="text-[#71717A]">of 5 remaining</span>
            </div>
            <div className="h-2 rounded-full bg-[#09090B] border border-[#27272A] overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#7C3AED] to-[#F43F5E]" style={{ width: '60%' }} />
            </div>
          </div>
          <p className="text-[10px] text-[#A1A1AA]">Resets on May 1st, 2026</p>
        </div>
      </div>

      {/* Invoices */}
      <div>
        <h3 className="text-sm font-semibold text-[#A1A1AA] mb-4">Invoice History</h3>
        <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-8 text-center">
          <ReceiptIcon className="w-10 h-10 text-[#3F3F46] mx-auto mb-3" />
          <p className="text-sm text-[#71717A]">No invoices yet. You're on the free plan.</p>
        </div>
      </div>
    </motion.div>
  )
}
function ReceiptIcon(props) {
  return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
}

function NotificationsSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-[#F4F4F5]">Notifications</h2>
        <p className="text-sm text-[#71717A] mt-1">Manage what we email you about.</p>
      </div>

      <div className="bg-[#18181B] border border-[#27272A] rounded-2xl divide-y divide-[#27272A] max-w-2xl">
        <div className="p-5 flex justify-between items-center group">
          <div>
            <h4 className="text-sm font-semibold text-[#F4F4F5]">Product Updates</h4>
            <p className="text-xs text-[#71717A] mt-1">Feature releases, tips, and news.</p>
          </div>
          {/* Toggle Switch */}
          <button className="w-10 h-6 bg-[#7C3AED] rounded-full relative transition-colors">
            <motion.div layout className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm" />
          </button>
        </div>

        <div className="p-5 flex justify-between items-center group">
          <div>
            <h4 className="text-sm font-semibold text-[#F4F4F5]">Usage Alerts</h4>
            <p className="text-xs text-[#71717A] mt-1">Get an email when you hit 80% of your plan limit.</p>
          </div>
          <button className="w-10 h-6 bg-[#7C3AED] rounded-full relative transition-colors">
            <motion.div layout className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm" />
          </button>
        </div>

        <div className="p-5 flex justify-between items-center group">
          <div>
            <h4 className="text-sm font-semibold text-[#F4F4F5]">Weekly Digest</h4>
            <p className="text-xs text-[#71717A] mt-1">A weekly summary of your generated outputs.</p>
          </div>
          <button className="w-10 h-6 bg-[#27272A] rounded-full relative transition-colors border border-[#3F3F46]">
            <motion.div layout className="w-4 h-4 bg-[#71717A] rounded-full absolute top-1 left-1" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function ApiSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-[#F4F4F5]">API Access</h2>
        <p className="text-sm text-[#71717A] mt-1">Generate proposals programmatically (Pro feature).</p>
      </div>

      <div className="bg-[#1E1033]/40 border border-[#7C3AED]/30 rounded-2xl p-6 max-w-2xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <span className="badge badge-violet text-[10px]"><CrownIcon className="w-3 h-3 mr-1" /> Pro</span>
        </div>
        
        <Code className="w-10 h-10 text-[#A78BFA] mx-auto mb-3" />
        <h3 className="text-base font-bold text-[#F4F4F5] mb-2">Unlock PitchCraft API</h3>
        <p className="text-xs text-[#A1A1AA] max-w-md mx-auto mb-6 leading-relaxed">
          Automate your proposal workflows by connecting PitchCraft to Zapier, Make, or your custom CRM backend. Available on Pro and Team plans.
        </p>
        <button className="btn-violet px-6 py-2.5 text-sm">Upgrade to Unlock</button>
      </div>
      
      {/* Example structure if unlocked */}
      <div className="max-w-2xl opacity-50 select-none pointer-events-none">
        <h3 className="text-sm font-semibold text-[#A1A1AA] mb-4">Your Secret Key</h3>
        <div className="flex items-center gap-2">
          <input type="password" value="pc_live_xxxxxxxxxxxx" readOnly className="flex-1 bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-[#52525B]" />
          <button className="p-2.5 rounded-xl bg-[#27272A] text-[#71717A]"><Copy size={16} /></button>
          <button className="p-2.5 rounded-xl bg-[#27272A] text-[#71717A]"><RefreshCw size={16} /></button>
        </div>
      </div>
    </motion.div>
  )
}
function CrownIcon(props) {
  return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.69 4.31a.5.5 0 01.62 0l4.31 3.45a.5.5 0 00.7.07l4.32-3.45a.5.5 0 01.81.42v13.7a2 2 0 01-2 2H4.5a2 2 0 01-2-2V4.8a.5.5 0 01.81-.42l4.32 3.45a.5.5 0 00.7-.07l4.31-3.45z"/></svg>
}

// --- Main Page Component ---

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'sender', label: 'Sender Profile', icon: Send },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'api', label: 'API Access', icon: Code },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="flex flex-col min-h-full bg-[#09090B]">
      {/* ── Page Header ── */}
      <div className="px-6 py-8 border-b border-[#27272A]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-[#F4F4F5]">Settings</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 p-6">
          
          {/* Navigation Sidebar (Vertical Tabs) */}
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
                        ? 'text-[#F4F4F5] bg-[#7C3AED]/10' 
                        : 'text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#27272A]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isActive ? 'text-[#A78BFA]' : 'text-[#71717A]'} />
                      <span className="relative z-10">{tab.label}</span>
                    </div>

                    {isActive && (
                      <>
                        <motion.div
                          layoutId="settings-tab-bg"
                          className="absolute inset-0 bg-[#27272A] border border-[#3F3F46] rounded-xl z-0"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                        <ChevronRight size={14} className="relative z-10 text-[#71717A]" />
                      </>
                    )}
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Main Content Form Area */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && <ProfileSection key="profile" />}
              {activeTab === 'sender' && <SenderProfileSection key="sender" />}
              {activeTab === 'billing' && <BillingSection key="billing" />}
              {activeTab === 'notifications' && <NotificationsSection key="notifications" />}
              {activeTab === 'api' && <ApiSection key="api" />}
            </AnimatePresence>
          </main>

        </div>
      </div>
    </div>
  )
}
