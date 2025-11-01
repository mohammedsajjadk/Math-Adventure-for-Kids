'use client'

import { useState } from 'react'
import { MathCard } from '../data/cards'

interface GameCardProps {
  card: MathCard;
  onAnswer: (answer: string, difficulty?: 'again' | 'hard' | 'good' | 'easy') => void;
  timeLeft: number;
  ankiMode?: boolean;
}

export default function GameCard({ card, onAnswer, timeLeft, ankiMode = false }: GameCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [textInputAnswer, setTextInputAnswer] = useState<string>('')
  const [showFeedback, setShowFeedback] = useState(false)

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer)
    setShowFeedback(true)
    
    // Don't auto-advance for Anki-style feedback
    // Let parent component handle advancement
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (textInputAnswer.trim()) {
      setSelectedAnswer(textInputAnswer.trim())
      setShowFeedback(true)
    }
  }

  const handleDifficultyClick = (difficulty: 'again' | 'hard' | 'good' | 'easy') => {
    onAnswer(selectedAnswer || '', difficulty)
    setSelectedAnswer(null)
    setTextInputAnswer('')
    setShowFeedback(false)
  }

  const isCorrect = selectedAnswer === card.answer

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white/50 p-8 text-center min-h-[400px] flex flex-col justify-center items-center transform transition-all duration-300 hover:shadow-xl">
      {showFeedback ? (
        <div className={`flex flex-col items-center justify-center h-full animate-bounce-in`}>
          <div className={`text-8xl mb-4 ${isCorrect ? 'animate-bounce' : 'animate-wiggle'}`}>
            {isCorrect ? '🎉' : '💝'}
          </div>
          <div className={`text-4xl font-bold ${isCorrect ? 'text-green-600' : 'text-blue-600'}`}>
            {isCorrect ? 'Fantastic!' : 'Keep trying!'}
          </div>
          <div className={`text-2xl mt-2 mb-6 ${isCorrect ? 'text-green-500' : 'text-blue-500'}`}>
            {isCorrect ? 'You are amazing!' : `The answer is ${card.answer}`}
          </div>
          
          {/* Mode-specific buttons */}
          <div className="flex gap-3 mt-4">
            {ankiMode ? (
              // Anki-style difficulty buttons
              !isCorrect ? (
                <button
                  onClick={() => handleDifficultyClick('again')}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  🔄 Try Again
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleDifficultyClick('hard')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 text-sm"
                  >
                    😓 Hard
                  </button>
                  <button
                    onClick={() => handleDifficultyClick('good')}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    😊 Good
                  </button>
                  <button
                    onClick={() => handleDifficultyClick('easy')}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 text-sm"
                  >
                    😄 Easy
                  </button>
                </>
              )
            ) : (
              // Fun mode: simple continue button
              <button
                onClick={() => onAnswer(selectedAnswer || '')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 text-xl"
              >
                {isCorrect ? '🌟 Next Question!' : '💪 Keep Going!'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-6xl font-bold text-purple-700 mb-4">
              {card.question}
            </h2>
            <div className="flex justify-center items-center gap-2">
              <span className="text-2xl">⏰</span>
              <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-gray-600'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
          
          {card.inputType === 'text-input' ? (
            <form onSubmit={handleTextSubmit} className="w-full max-w-lg">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={textInputAnswer}
                  onChange={(e) => setTextInputAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="bg-white/90 border-4 border-purple-300 focus:border-purple-500 rounded-2xl px-6 py-4 text-3xl text-center font-bold text-purple-700 placeholder-purple-400 outline-none shadow-lg"
                  autoFocus
                  disabled={showFeedback}
                />
                <button
                  type="submit"
                  disabled={!textInputAnswer.trim() || showFeedback}
                  className="bg-gradient-to-br from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl text-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✨ Submit Answer ✨
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              {card.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  className="bg-gradient-to-br from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-6 px-8 rounded-2xl text-3xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
                  disabled={showFeedback}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}