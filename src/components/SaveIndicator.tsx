'use client'

import { useState, useEffect } from 'react'

interface SaveIndicatorProps {
  show: boolean
}

export default function SaveIndicator({ show }: SaveIndicatorProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [show])

  if (!visible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-bounce-in">
      <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="font-bold">Progress Saved! ✅</span>
      </div>
    </div>
  )
}