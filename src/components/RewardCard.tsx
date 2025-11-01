'use client'

import { useState } from 'react'

interface RewardCardProps {
  onCollect: () => void;
  rewardsNeeded: number;
}

export default function RewardCard({ onCollect, rewardsNeeded }: RewardCardProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleCollect = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onCollect()
      setIsAnimating(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Confetti Animation */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="confetti absolute"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'][Math.floor(Math.random() * 6)]
            }}
          />
        ))}
      </div>

      <div className={`bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-3xl shadow-2xl border-4 border-yellow-600 p-8 text-center max-w-md transform ${isAnimating ? 'scale-110 rotate-12' : 'rotate-3 hover:rotate-0'} transition-all duration-500`}>
        <div className="text-8xl mb-4 animate-bounce">🎁</div>
        
        <h2 className="text-4xl font-bold text-yellow-900 mb-4">
          🌟 SPECIAL REWARD! 🌟
        </h2>
        
        <p className="text-2xl text-yellow-800 mb-6 font-semibold">
          Amazing work, Princess! You answered 5 questions correctly!
        </p>
        
        <div className="bg-white/80 rounded-2xl p-4 mb-6">
          <p className="text-xl text-purple-700 font-bold">
            Collect {rewardsNeeded} more reward cards to get a special surprise from Daddy and Mommy! 💝✨
          </p>
        </div>
        
        <button
          onClick={handleCollect}
          disabled={isAnimating}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-2xl shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50"
        >
          {isAnimating ? '✨ Collecting... ✨' : '🎉 Collect Reward! 🎉'}
        </button>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-2xl font-bold text-purple-600">
          Keep going! You're doing amazing! 🚀
        </p>
      </div>
    </div>
  )
}