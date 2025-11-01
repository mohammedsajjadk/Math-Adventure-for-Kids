'use client'

import { CardManager } from '../utils/cardManager'

export default function MathOverview() {
  const mathCards = CardManager.loadCards()
  const categories = ['addition', 'subtraction', 'multiplication', 'division'] as const
  const difficulties = ['easy', 'medium', 'hard'] as const

  const getCardCount = (category: string, difficulty?: string) => {
    return mathCards.filter(card => {
      if (difficulty) {
        return card.category === category && card.difficulty === difficulty
      }
      return card.category === category
    }).length
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      addition: 'from-green-100 to-green-200 border-green-300',
      subtraction: 'from-blue-100 to-blue-200 border-blue-300',
      multiplication: 'from-purple-100 to-purple-200 border-purple-300',
      division: 'from-orange-100 to-orange-200 border-orange-300'
    }
    return colors[category as keyof typeof colors] || 'from-gray-100 to-gray-200 border-gray-300'
  }

  const getCategoryEmoji = (category: string) => {
    const emojis = {
      addition: '➕',
      subtraction: '➖', 
      multiplication: '✖️',
      division: '➗'
    }
    return emojis[category as keyof typeof emojis] || '🔢'
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white/50 p-8 mb-8">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">🎯 Math Problem Library</h2>
      
      {/* Category Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <div key={category} className={`bg-gradient-to-br ${getCategoryColor(category)} rounded-2xl p-4 text-center border-2`}>
            <div className="text-3xl mb-2">{getCategoryEmoji(category)}</div>
            <div className="text-lg font-bold text-gray-800 capitalize">{category}</div>
            <div className="text-2xl font-bold text-gray-700">{getCardCount(category)}</div>
            <div className="text-sm text-gray-600">problems</div>
          </div>
        ))}
      </div>

      {/* Difficulty Breakdown */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">📊 Problems by Difficulty</h3>
        <div className="grid grid-cols-3 gap-4">
          {difficulties.map((difficulty) => {
            const count = mathCards.filter(card => card.difficulty === difficulty).length
            const colors = {
              easy: 'from-green-50 to-green-100 border-green-200 text-green-700',
              medium: 'from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-700', 
              hard: 'from-red-50 to-red-100 border-red-200 text-red-700'
            }
            
            return (
              <div key={difficulty} className={`bg-gradient-to-br ${colors[difficulty]} rounded-xl p-4 text-center border-2`}>
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm font-semibold capitalize">{difficulty}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sample Problems Preview */}
      <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
        <h3 className="text-lg font-bold text-purple-700 mb-3">🎲 Sample Problems Available:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <div className="font-semibold text-green-600">➕ Addition Examples:</div>
            <div className="text-gray-600">• Basic: 2 + 3 = ?</div>
            <div className="text-gray-600">• Story: 🐱 3 cats + 🐱 2 cats = ?</div>
            <div className="text-gray-600">• Advanced: 25 + 15 = ?</div>
          </div>
          
          <div className="space-y-1">
            <div className="font-semibold text-purple-600">✖️ Multiplication Examples:</div>
            <div className="text-gray-600">• Easy: 2 × 3 = ?</div>
            <div className="text-gray-600">• Story: 🍕 2 pizzas × 4 slices each</div>
            <div className="text-gray-600">• Tables: 8 × 5 = ?</div>
          </div>
          
          <div className="space-y-1">
            <div className="font-semibold text-orange-600">➗ Division Examples:</div>
            <div className="text-gray-600">• Sharing: 🍪 12 cookies ÷ 3 kids</div>
            <div className="text-gray-600">• Basic: 8 ÷ 2 = ?</div>
            <div className="text-gray-600">• Fractions: Half of 8 = ?</div>
          </div>
          
          <div className="space-y-1">
            <div className="font-semibold text-blue-600">🧠 Special Types:</div>
            <div className="text-gray-600">• Word problems with stories</div>
            <div className="text-gray-600">• Skip counting patterns</div>
            <div className="text-gray-600">• Simple fractions intro</div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          <strong>Perfect progression:</strong> Starts with simple addition (2+3) and grows to multiplication tables, 
          division, and even basic fractions - adapting as your daughter grows! 🌱➡️🌳
        </p>
      </div>
    </div>
  )
}