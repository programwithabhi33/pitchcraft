import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import QuickActions from '@/app/components/dashboard/QuickActions'
import RecentOutputs from '@/app/components/dashboard/RecentOutputs'
import HorizontalTips from '@/app/components/dashboard/HorizontalTips'
import { auth } from '@/auth'
import dbConnect from '@/lib/db'
import User from '@/models/User'

export default async function DashboardPage() {
  const session = await auth()
  await dbConnect()
  const user = await User.findById(session.user.id)

  return (
    <div className="flex flex-col min-h-full">
      {/* Top header bar */}
      <DashboardHeader />

      {/* ── Main content area ─────────────────── */}
      <main className="flex-1 p-6 space-y-10 max-w-7xl mx-auto w-full">

        {/* 1. Quick actions */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-base font-bold text-[#F4F4F5]">Quick Actions</h2>
            <span className="text-xs text-[#52525B]">— start generating</span>
          </div>
          <QuickActions />
        </section>

        {/* 2. Dynamic AI Tips (Horizontal placement) */}
        <HorizontalTips />

        {/* 3. Recent outputs */}
        <section>
          <RecentOutputs />
        </section>
      </main>
    </div>
  )
}
