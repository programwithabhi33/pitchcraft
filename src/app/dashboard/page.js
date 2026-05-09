import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import QuickActions from '@/app/components/dashboard/QuickActions'
import RecentOutputs from '@/app/components/dashboard/RecentOutputs'
import TipsSidebar from '@/app/components/dashboard/TipsSidebar'
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

      {/* Content — 2-column layout: main + right sidebar */}
      <div className="flex-1 gap-0">

        {/* ── Main content area ─────────────────── */}
        <main className="flex-1 min-w-0 p-6 space-y-8">

          {/* Quick actions */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-base font-bold text-[#F4F4F5]">Quick Actions</h2>
              <span className="text-xs text-[#52525B]">— start generating</span>
            </div>
            <QuickActions />
          </section>

          {/* Recent outputs */}
          <RecentOutputs />
        </main>

        {/* ── Right sidebar ─────────────────────── */}
        <aside className="hidden xl:block w-72 flex-shrink-0 border-l border-[#27272A] p-5 overflow-y-auto">
          <TipsSidebar userPlan="free" />
        </aside>
      </div>
    </div>
  )
}
