import Sidebar from '@/app/components/dashboard/Sidebar'
import UpgradeBanner from '@/app/components/dashboard/UpgradeBanner'

export const metadata = {
  title: 'Dashboard – PitchCraft AI',
  description: 'Your PitchCraft AI workspace. Generate cold emails, proposals, and follow-ups.',
}

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#09090B] overflow-hidden">
      {/* Left sidebar — sticky, collapsible */}
      <Sidebar />

      {/* Main area — scrollable */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {/* Sticky upgrade banner at bottom */}
        <UpgradeBanner userPlan="free" />
      </div>
    </div>
  )
}
