import Sidebar from '@/app/components/dashboard/Sidebar'

export const metadata = {
  title: 'Dashboard – PitchCraft AI',
  description: 'Your PitchCraft AI workspace. Generate high-conversion cold emails in seconds.',
}

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#09090B] relative overflow-hidden">
      {/* 
        Sidebar is now handled as an overlay on mobile internally.
        On desktop (lg+), it takes up its own column.
      */}
      <Sidebar />

      {/* Main area — scrollable */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
