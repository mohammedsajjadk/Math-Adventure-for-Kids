'use client'

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-bold text-purple-600">Progress to Next Reward</span>
        <span className="text-lg font-bold text-pink-600">{current}/{total}</span>
      </div>
      
      <div className="bg-white/50 rounded-full h-6 shadow-inner border-2 border-white/80 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-500 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse-scale"></div>
        </div>
      </div>
      
      <div className="flex justify-center mt-2">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 mx-1 rounded-full transition-all duration-300 ${
              index < current 
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 scale-110 shadow-lg' 
                : 'bg-gray-300'
            }`}
          >
            {index < current && (
              <div className="w-full h-full rounded-full bg-white/30 animate-bounce"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}