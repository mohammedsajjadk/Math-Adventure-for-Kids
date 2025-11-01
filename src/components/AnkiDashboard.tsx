'use client'

import { useState, useEffect } from 'react'
import { AnkiCard, AnkiAlgorithm, ReviewStats } from '../utils/ankiSystem'
import { mathCards } from '../data/cards'

interface AnkiDashboardProps {
  onStartSession: (cards: AnkiCard[]) => void
}

export default function AnkiDashboard({ onStartSession }: AnkiDashboardProps) {
  const [ankiCards, setAnkiCards] = useState<AnkiCard[]>([])
  const [stats, setStats] = useState<ReviewStats>({
    againCount: 0,
    hardCount: 0,
    goodCount: 0,
    easyCount: 0
  })

  useEffect(() => {
    // Convert regular cards to Anki cards if not already done
    const savedAnkiCards = localStorage.getItem('ankiCards')
    if (savedAnkiCards) {
      setAnkiCards(JSON.parse(savedAnkiCards))
    } else {
      const initialAnkiCards: AnkiCard[] = mathCards.map(card => ({
        ...card,
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReviewDate: new Date().toISOString().split('T')[0],
        lastReviewDate: '',
        grade: 0
      }))
      setAnkiCards(initialAnkiCards)
      localStorage.setItem('ankiCards', JSON.stringify(initialAnkiCards))
    }

    // Load review stats
    const savedStats = localStorage.getItem('reviewStats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  const dueCards = AnkiAlgorithm.getDueCards(ankiCards)
  const newCards = AnkiAlgorithm.getNewCards(ankiCards)
  const reviewCards = AnkiAlgorithm.getReviewCards(ankiCards)

  const startNewCards = () => {
    onStartSession(newCards.slice(0, 5))
  }

  const startReviews = () => {
    onStartSession(dueCards)
  }

  const startMixed = () => {
    const mixed = [...newCards.slice(0, 2), ...reviewCards.slice(0, 8)]
    onStartSession(mixed)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          📚 Today's Math Study
        </h2>
        <p className="text-xl text-gray-600">Just like Anki, but for math! 🎯</p>
      </div>

      {/* Anki-style Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-6 text-center border-4 border-blue-300">
          <div className="text-4xl font-bold text-blue-700">{newCards.length}</div>
          <div className="text-lg text-blue-600 mb-4">New Cards</div>
          <button
            onClick={startNewCards}
            disabled={newCards.length === 0}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-xl transform hover:scale-105 transition-all duration-200"
          >
            Study New
          </button>
        </div>

        <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-3xl p-6 text-center border-4 border-red-300">
          <div className="text-4xl font-bold text-red-700">{dueCards.length}</div>
          <div className="text-lg text-red-600 mb-4">Due for Review</div>
          <button
            onClick={startReviews}
            disabled={dueCards.length === 0}
            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-xl transform hover:scale-105 transition-all duration-200"
          >
            Review Now
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-6 text-center border-4 border-green-300">
          <div className="text-4xl font-bold text-green-700">{newCards.length + dueCards.length}</div>
          <div className="text-lg text-green-600 mb-4">Total Today</div>
          <button
            onClick={startMixed}
            disabled={newCards.length + dueCards.length === 0}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-xl transform hover:scale-105 transition-all duration-200"
          >
            Mixed Study
          </button>
        </div>
      </div>

      {/* Today's Review Stats */}
      <div className="bg-white/90 rounded-3xl p-6 shadow-xl border-4 border-white/50">
        <h3 className="text-2xl font-bold text-purple-700 mb-4 text-center">📊 Today's Performance</h3>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.againCount}</div>
            <div className="text-sm text-red-500">Again</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.hardCount}</div>
            <div className="text-sm text-orange-500">Hard</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.goodCount}</div>
            <div className="text-sm text-green-500">Good</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.easyCount}</div>
            <div className="text-sm text-blue-500">Easy</div>
          </div>
        </div>
      </div>

      {/* Quick explanation */}
      <div className="mt-6 text-center text-sm text-gray-600 bg-purple-50 rounded-2xl p-4">
        <p><strong>🎯 How it works:</strong> Cards you find "Hard" come back sooner, "Easy" cards wait longer - just like Anki's spaced repetition!</p>
      </div>
    </div>
  )
}