import Sidebar from '@/app/components/dashboard/Sidebar'

export const metadata = {
  title: 'Dashboard – PitchCraft AI',
  description: 'Your PitchCraft AI workspace. Generate high-conversion cold emails in seconds.',
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
      </div>
    </div>
  )
}
