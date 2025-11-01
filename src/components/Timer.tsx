'use client'

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

export default function Timer({ timeLeft, totalTime }: TimerProps) {
  const percentage = (timeLeft / totalTime) * 100
  const isLowTime = timeLeft <= 10

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative w-32 h-32">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
        
        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="56"
            fill="transparent"
            stroke={isLowTime ? "#ef4444" : "#10b981"}
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 56}`}
            strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        
        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-4xl font-bold ${isLowTime ? 'text-red-500 animate-pulse' : 'text-green-600'}`}>
            {timeLeft}
          </div>
        </div>
        
        {/* Clock emoji */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <span className={`text-3xl ${isLowTime ? 'animate-wiggle' : ''}`}>⏰</span>
        </div>
      </div>
      
      <div className={`mt-2 text-lg font-semibold ${isLowTime ? 'text-red-500' : 'text-gray-600'}`}>
        {isLowTime ? 'Hurry up! ⚡' : 'Think carefully! 🤔'}
      </div>
    </div>
  )
}