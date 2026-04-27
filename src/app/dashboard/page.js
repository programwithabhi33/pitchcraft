import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import QuickActions from '@/app/components/dashboard/QuickActions'
import RecentOutputs from '@/app/components/dashboard/RecentOutputs'
import TipsSidebar from '@/app/components/dashboard/TipsSidebar'

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Top header bar */}
      <DashboardHeader />

      {/* Content — 2-column layout: main + right sidebar */}
      <div className="flex flex-1 gap-0">

        {/* ── Main content area ─────────────────── */}
        <main className="flex-1 min-w-0 p-6 space-y-8">

          {/* Usage bar (mobile — shown only on small screens, header shows pill on md+) */}
          <div className="sm:hidden">
            <MobileUsageBar />
          </div>

          {/* Quick actions */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-base font-bold text-[#F4F4F5]">Quick Actions</h2>
              <span className="text-xs text-[#52525B]">— start generating</span>
            </div>
            <QuickActions />
          </section>

          {/* Recent outputs */}
          <RecentOutputs isEmpty={false} />
        </main>

        {/* ── Right sidebar ─────────────────────── */}
        <aside className="hidden xl:block w-72 flex-shrink-0 border-l border-[#27272A] p-5 overflow-y-auto">
          <TipsSidebar userPlan="free" />
        </aside>
      </div>
    </div>
  )
}

// Mobile-only usage bar
function MobileUsageBar() {
  const used = 3
  const total = 5
  const pct = (used / total) * 100

  return (
    <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4 flex items-center gap-4">
      <div className="flex-1 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#A1A1AA]">{used} of {total} free uses</span>
          <a href="/dashboard/upgrade" className="text-xs font-bold text-[#7C3AED]">Upgrade →</a>
        </div>
        <div className="h-1.5 rounded-full bg-[#27272A] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#7C3AED] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
