'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardHeader() {
  const { data: user } = useSWR('/api/user/usage', fetcher)
  const greeting = useMemo(() => getGreeting(), [])

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[#27272A] bg-[#18181B] h-16 flex-shrink-0 sticky top-0 z-20">

      {/* Left: Greeting */}
      <div>
        <h1 className="text-lg font-bold text-[#F4F4F5] leading-tight truncate">
          {greeting}, {user?.name?.split(' ')[0] || 'there'} 👋
        </h1>
        <p className="text-xs text-[#52525B]">Here's your workspace</p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Placeholder for any future header actions, currently empty for minimal look */}
      </div>
    </header>
  )
}
