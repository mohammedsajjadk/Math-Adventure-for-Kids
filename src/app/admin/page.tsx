'use client'

import { useState, useEffect, useCallback } from 'react'
import { MathCard } from '../../data/cards'
import { GameSaveSystem, SavedProgress } from '../../utils/saveSystem'
import { AnkiSettings, AnkiSettingsManager } from '../../utils/ankiSettings'
import { CardManager } from '../../utils/cardManager'
import { DeckManager, Deck } from '../../utils/deckManager'

export default function AdminPanel() {
  const [cards, setCards] = useState<MathCard[]>([])
  const [decks, setDecks] = useState<Deck[]>([])
  const [timerDuration, setTimerDuration] = useState(30)
  const [rewardThreshold, setRewardThreshold] = useState(5)
  const [progress, setProgress] = useState<SavedProgress | null>(null)
  const [ankiSettings, setAnkiSettings] = useState<AnkiSettings | null>(null)
  
  // Filter and sort states
  const [filteredCards, setFilteredCards] = useState<MathCard[]>([])
  const [categoryFilter, setCategoryFilter] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('')
  const [inputTypeFilter, setInputTypeFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'id' | 'category' | 'difficulty' | 'question'>('id')
  
  // Edit card states
  const [editingCard, setEditingCard] = useState<MathCard | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)

  // Filter and sort cards based on current filters
  const applyFiltersAndSort = useCallback((cardsToFilter: MathCard[]) => {
    let filtered = cardsToFilter

    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(card => card.category === categoryFilter)
    }

    // Apply difficulty filter
    if (difficultyFilter) {
      filtered = filtered.filter(card => card.difficulty === difficultyFilter)
    }

    // Apply input type filter
    if (inputTypeFilter) {
      filtered = filtered.filter(card => card.inputType === inputTypeFilter)
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(card => 
        card.question.toLowerCase().includes(searchLower) ||
        card.answer.toLowerCase().includes(searchLower)
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'id':
          return a.id - b.id
        case 'category':
          return a.category.localeCompare(b.category)
        case 'difficulty':
          const diffOrder = { 'easy': 1, 'medium': 2, 'hard': 3 }
          return diffOrder[a.difficulty] - diffOrder[b.difficulty]
        case 'question':
          return a.question.localeCompare(b.question)
        default:
          return 0
      }
    })

    return filtered
  }, [categoryFilter, difficultyFilter, inputTypeFilter, searchTerm, sortBy])

  // Update filtered cards when cards or filters change
  useEffect(() => {
    const filtered = applyFiltersAndSort(cards)
    setFilteredCards(filtered)
  }, [cards, applyFiltersAndSort])

  // Load progress and settings on component mount
  useEffect(() => {
    // Load existing cards (either custom or defaults)
    const loadedCards = CardManager.loadCards()
    setCards(loadedCards)
    
    // Load existing decks
    const loadedDecks = DeckManager.loadDecks()
    setDecks(loadedDecks)
    
    // Load saved game settings
    const savedGameSettings = localStorage.getItem('mathGameSettings')
    if (savedGameSettings) {
      try {
        const settings = JSON.parse(savedGameSettings)
        setTimerDuration(settings.timerDuration || 30)
        setRewardThreshold(settings.rewardThreshold || 5)
      } catch (error) {
        console.error('Failed to load game settings:', error)
      }
    }
    
    const savedProgress = GameSaveSystem.loadProgress()
    const loadedSettings = AnkiSettingsManager.loadSettings()
    setProgress(savedProgress)
    setAnkiSettings(loadedSettings)
  }, [])

  const [newCard, setNewCard] = useState<Partial<MathCard>>({
    question: '',
    answer: '',
    options: ['', '', '', ''],
    difficulty: 'easy',
    category: 'addition',
    inputType: 'multiple-choice'
  })

  const handleAddCard = () => {
    if (newCard.question && newCard.answer) {
      const card: MathCard = {
        id: CardManager.getNextId(),
        question: newCard.question,
        answer: newCard.answer,
        options: newCard.inputType === 'multiple-choice' ? newCard.options : undefined,
        difficulty: newCard.difficulty || 'easy',
        category: newCard.category || 'addition',
        inputType: newCard.inputType || 'multiple-choice'
      }
      const updatedCards = CardManager.addCard(card)
      setCards(updatedCards)
      setNewCard({
        question: '',
        answer: '',
        options: ['', '', '', ''],
        difficulty: 'easy',
        category: 'addition',
        inputType: 'multiple-choice'
      })
      alert('Card added successfully! 🎉')
    }
  }

  const handleDeleteCard = (id: number) => {
    if (confirm('Are you sure you want to delete this card? This action cannot be undone!')) {
      const updatedCards = CardManager.deleteCard(id)
      setCards(updatedCards)
      alert('Card deleted successfully! 🗑️')
    }
  }

  const handleEditCard = (card: MathCard) => {
    setEditingCard({...card})
    setShowEditModal(true)
  }

  const handleUpdateCard = () => {
    if (editingCard && editingCard.question && editingCard.answer) {
      const updatedCards = CardManager.updateCard(editingCard)
      setCards(updatedCards)
      setShowEditModal(false)
      setEditingCard(null)
      alert('Card updated successfully! ✏️')
    }
  }

  const handleCancelEdit = () => {
    setShowEditModal(false)
    setEditingCard(null)
  }

  const exportCards = () => {
    const cardsData = CardManager.exportCards()
    const dataBlob = new Blob([cardsData], {type: 'application/json'})
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'math-cards.json'
    link.click()
  }

  const exportProgress = () => {
    const progressStr = GameSaveSystem.exportProgress()
    const dataBlob = new Blob([progressStr], {type: 'application/json'})
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'math-progress.json'
    link.click()
  }

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
      GameSaveSystem.clearProgress()
      setProgress(GameSaveSystem.loadProgress())
      alert('Progress reset successfully!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            🛠️ Admin Panel 🛠️
          </h1>
          <p className="text-xl text-gray-700">Manage your child&apos;s math cards and settings</p>
        </header>

        {/* Quick Customization Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 mb-8 border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">🎯 Quick Customization Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white/70 rounded-xl p-4">
              <h3 className="font-bold text-purple-600 mb-2">👑 Personalize for Your Daughter</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Change &quot;Princess&quot; to her name in page.tsx</li>
                <li>• Customize reward messages</li>
                <li>• Add story-based math problems</li>
              </ul>
            </div>
            <div className="bg-white/70 rounded-xl p-4">
              <h3 className="font-bold text-purple-600 mb-2">🎨 Themes Available</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Princess Theme (current) 👑</li>
                <li>• Space Adventure 🚀</li>
                <li>• Unicorn Magic 🦄</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Progress Dashboard */}
        {progress && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white/50 p-8 mb-8">
            <h2 className="text-3xl font-bold text-purple-700 mb-6">📊 Princess&apos;s Progress</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">{progress.totalScore}</div>
                <div className="text-sm text-blue-800">Total Score</div>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-green-600">{progress.totalCorrectAnswers}</div>
                <div className="text-sm text-green-800">Correct Answers</div>
              </div>
              <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-yellow-600">{progress.totalRewards}</div>
                <div className="text-sm text-yellow-800">Rewards Earned</div>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">{progress.totalQuestionsAnswered}</div>
                <div className="text-sm text-purple-800">Total Questions</div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={exportProgress}
                className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                📊 Export Progress
              </button>
              <button
                onClick={resetProgress}
                className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                🔄 Reset Progress
              </button>
            </div>
          </div>
        )}

        {/* Anki Settings Section */}
        {ankiSettings && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white/50 p-8 mb-8">
            <h2 className="text-3xl font-bold text-purple-700 mb-6">🎯 Anki Spaced Repetition Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
                <h3 className="text-xl font-bold text-blue-700 mb-4">📚 Learning Phase</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Graduating Interval (days)
                    </label>
                    <input
                      type="number"
                      value={ankiSettings.graduatingInterval}
                      onChange={(e) => setAnkiSettings({...ankiSettings, graduatingInterval: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      min="1"
                      max="10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Easy Interval (days)
                    </label>
                    <input
                      type="number"
                      value={ankiSettings.easyInterval}
                      onChange={(e) => setAnkiSettings({...ankiSettings, easyInterval: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      min="1"
                      max="30"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
                <h3 className="text-xl font-bold text-green-700 mb-4">🔄 Review Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Maximum Interval (days)
                    </label>
                    <input
                      type="number"
                      value={ankiSettings.maximumInterval}
                      onChange={(e) => setAnkiSettings({...ankiSettings, maximumInterval: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                      min="7"
                      max="365"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Interval Modifier (0.5 = easier, 1.0 = normal)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={ankiSettings.intervalModifier}
                      onChange={(e) => setAnkiSettings({...ankiSettings, intervalModifier: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                      min="0.3"
                      max="2.0"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Preset Buttons */}
            <div className="flex flex-wrap gap-3 mb-4">
              <button
                onClick={() => setAnkiSettings(AnkiSettingsManager.getPreset('beginner'))}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                🌱 Beginner (Very Easy)
              </button>
              <button
                onClick={() => setAnkiSettings(AnkiSettingsManager.getPreset('intermediate'))}
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                📈 Intermediate
              </button>
              <button
                onClick={() => setAnkiSettings(AnkiSettingsManager.getPreset('advanced'))}
                className="bg-gradient-to-r from-purple-400 to-purple-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                🚀 Advanced
              </button>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => {
                  AnkiSettingsManager.saveSettings(ankiSettings)
                  alert('Anki settings saved! 🎯')
                }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                💾 Save Anki Settings
              </button>
              <button
                onClick={() => {
                  AnkiSettingsManager.resetToDefaults()
                  setAnkiSettings(AnkiSettingsManager.loadSettings())
                  alert('Reset to kid-friendly defaults! 👶')
                }}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                🔄 Reset to Defaults
              </button>
            </div>
            
            <div className="mt-4 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                <p className="text-sm text-yellow-800">
                <strong>💡 Tip:</strong> Start with &quot;Beginner&quot; settings for your 6-year-old. 
                Cards she finds &quot;Hard&quot; will come back in just {ankiSettings.graduatingInterval} day(s), 
                while &quot;Easy&quot; cards wait up to {ankiSettings.maximumInterval} days!
              </p>
            </div>
          </div>
        )}

        {/* Settings Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white/50 p-8 mb-8">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">⚙️ Game Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Timer Duration (seconds)
              </label>
              <input
                type="number"
                value={timerDuration}
                onChange={(e) => setTimerDuration(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
                min="10"
                max="120"
              />
            </div>
            
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Cards for Reward
              </label>
              <input
                type="number"
                value={rewardThreshold}
                onChange={(e) => setRewardThreshold(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
                min="1"
                max="20"
              />
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                localStorage.setItem('mathGameSettings', JSON.stringify({ timerDuration, rewardThreshold }))
                // Notify other parts of the app that settings changed
                window.dispatchEvent(new Event('mathGameSettingsUpdated'))
                alert('Game settings saved! 🎯')
              }}
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              💾 Save Settings
            </button>
            <button
              onClick={() => {
                setTimerDuration(30)
                setRewardThreshold(5)
                localStorage.removeItem('mathGameSettings')
                // Notify other parts of the app that settings changed
                window.dispatchEvent(new Event('mathGameSettingsUpdated'))
                alert('Settings reset to defaults! ⚙️')
              }}
              className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🔄 Reset to Defaults
            </button>
          </div>
        </div>

        {/* Deck Management Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white/50 p-8 mb-8">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">🎯 Deck Management</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {decks.map((deck) => {
              const stats = DeckManager.getDeckStats(deck.id, cards)
              return (
                <div key={deck.id} className={`bg-gradient-to-br ${deck.color} rounded-2xl p-6 text-white shadow-xl transform transition-all duration-200 hover:scale-105`}>
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{deck.emoji}</div>
                    <h3 className="text-xl font-bold mb-2">{deck.name}</h3>
                    <p className="text-sm opacity-90">{deck.description}</p>
                  </div>
                  
                  <div className="bg-white/20 rounded-xl p-3 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{stats.totalCards}</div>
                      <div className="text-sm opacity-90">Total Cards</div>
                    </div>
                    <div className="flex justify-between text-xs mt-2">
                      <span>Easy: {stats.easyCards}</span>
                      <span>Med: {stats.mediumCards}</span>
                      <span>Hard: {stats.hardCards}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const updatedDecks = DeckManager.updateDeckActiveStatus(deck.id, !deck.isActive)
                        setDecks(updatedDecks)
                      }}
                      className={`flex-1 py-2 px-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                        deck.isActive 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : 'bg-gray-500 hover:bg-gray-600 text-white'
                      }`}
                    >
                      {deck.isActive ? '✅ Active' : '❌ Inactive'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                const defaultDecks = DeckManager.resetToDefaults()
                setDecks(defaultDecks)
                alert('Decks reset to defaults! 🎯')
              }}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🔄 Reset Decks
            </button>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <p className="text-blue-700 font-semibold mb-2">💡 How Decks Work:</p>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• <strong>Active decks</strong> are available for your child to play</li>
              <li>• <strong>Inactive decks</strong> are hidden from the main game</li>
              <li>• Each deck contains cards from its category (addition, subtraction, etc.)</li>
              <li>• Use this to focus on specific math skills!</li>
            </ul>
          </div>
        </div>

        {/* Add New Card Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white/50 p-8 mb-8">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">➕ Add New Card</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Question</label>
              <input
                type="text"
                value={newCard.question}
                onChange={(e) => setNewCard({...newCard, question: e.target.value})}
                placeholder="e.g., 2 + 3 = ?"
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
              />
            </div>
            
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Correct Answer</label>
              <input
                type="text"
                value={newCard.answer}
                onChange={(e) => setNewCard({...newCard, answer: e.target.value})}
                placeholder="e.g., 5"
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
              />
            </div>
            
            {newCard.inputType === 'multiple-choice' && (
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Answer Options (for Multiple Choice)</label>
                <div className="grid grid-cols-2 gap-4">
                  {newCard.options?.map((option, index) => (
                    <input
                      key={index}
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(newCard.options || [])]
                        newOptions[index] = e.target.value
                        setNewCard({...newCard, options: newOptions})
                      }}
                      placeholder={`Option ${index + 1}`}
                      className="px-4 py-3 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">💡 Make sure one of these options matches your correct answer exactly!</p>
              </div>
            )}
            
            {newCard.inputType === 'text-input' && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
                <p className="text-blue-700 font-semibold">📝 Text Input Mode</p>
                <p className="text-sm text-blue-600 mt-1">
                  Students will type their answer. No multiple choice options needed!
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Input Type</label>
                <select
                  value={newCard.inputType}
                  onChange={(e) => setNewCard({...newCard, inputType: e.target.value as 'multiple-choice' | 'text-input'})}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="text-input">Text Input</option>
                </select>
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Difficulty</label>
                <select
                  value={newCard.difficulty}
                  onChange={(e) => setNewCard({...newCard, difficulty: e.target.value as 'easy' | 'medium' | 'hard'})}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={newCard.category}
                  onChange={(e) => setNewCard({...newCard, category: e.target.value as 'addition' | 'subtraction' | 'multiplication' | 'division' | 'spelling'})}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
                >
                  <option value="addition">Addition</option>
                  <option value="subtraction">Subtraction</option>
                  <option value="multiplication">Multiplication</option>
                  <option value="division">Division</option>
                  <option value="spelling">Spelling</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={handleAddCard}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              ➕ Add Card
            </button>
          </div>
        </div>

        {/* Current Cards Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white/50 p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-purple-700">📚 Math Library ({filteredCards.length} of {cards.length} Problems)</h2>
            <div className="flex gap-3">
              <button
                onClick={exportCards}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-2 px-4 rounded-xl text-sm shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                💾 Export
              </button>
              <button
                onClick={() => {
                  if (confirm('Reset to default cards? This will remove all custom cards!')) {
                    const defaultCards = CardManager.resetToDefaults()
                    setCards(defaultCards)
                    setFilteredCards(defaultCards)
                    alert('Cards reset to defaults! 🔄')
                  }
                }}
                className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white font-bold py-2 px-4 rounded-xl text-sm shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Filter and Sort Controls */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-purple-200">
            <h3 className="text-xl font-bold text-purple-700 mb-4">🔍 Filter & Sort Cards</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none text-sm"
                >
                  <option value="">All Categories</option>
                  <option value="addition">Addition</option>
                  <option value="subtraction">Subtraction</option>
                  <option value="multiplication">Multiplication</option>
                  <option value="division">Division</option>
                  <option value="spelling">Spelling</option>
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none text-sm"
                >
                  <option value="">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Input Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Input Type</label>
                <select
                  value={inputTypeFilter}
                  onChange={(e) => setInputTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none text-sm"
                >
                  <option value="">All Types</option>
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="text-input">Text Input</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'id' | 'category' | 'difficulty' | 'question')}
                  className="w-full px-3 py-2 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none text-sm"
                >
                  <option value="id">ID</option>
                  <option value="category">Category</option>
                  <option value="difficulty">Difficulty</option>
                  <option value="question">Question</option>
                </select>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Questions</label>
              <input
                type="text"
                placeholder="Search in questions or answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none text-sm"
              />
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setCategoryFilter('')
                  setDifficultyFilter('')
                  setInputTypeFilter('')
                  setSearchTerm('')
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200"
              >
                🔄 Clear All
              </button>
              <button
                onClick={() => setCategoryFilter('spelling')}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200"
              >
                🔤 Spelling Only
              </button>
              <button
                onClick={() => setInputTypeFilter('text-input')}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200"
              >
                📝 Text Input Only
              </button>
            </div>
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full bg-white rounded-2xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <tr>
                  <th className="px-3 py-2 text-left text-sm">ID</th>
                  <th className="px-3 py-2 text-left text-sm">Question</th>
                  <th className="px-3 py-2 text-left text-sm">Answer</th>
                  <th className="px-3 py-2 text-left text-sm">Input Method</th>
                  <th className="px-3 py-2 text-left text-sm">Difficulty</th>
                  <th className="px-3 py-2 text-left text-sm">Category</th>
                  <th className="px-3 py-2 text-center text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCards.map((card, index) => (
                  <tr key={card.id} className={`${index % 2 === 0 ? 'bg-purple-50' : 'bg-white'} hover:bg-purple-100 transition-colors`}>
                    <td className="px-3 py-2 font-semibold text-purple-600 text-sm">{card.id}</td>
                    <td className="px-3 py-2 max-w-xs">
                      <div className="text-sm font-medium truncate" title={card.question}>
                        {card.question}
                      </div>
                    </td>
                    <td className="px-3 py-2 font-bold text-green-600 text-sm">{card.answer}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        card.inputType === 'text-input' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {card.inputType === 'text-input' ? '📝' : '☑️'}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        card.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                        card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {card.difficulty}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        card.category === 'addition' ? 'bg-green-100 text-green-700' :
                        card.category === 'subtraction' ? 'bg-blue-100 text-blue-700' :
                        card.category === 'multiplication' ? 'bg-purple-100 text-purple-700' :
                        card.category === 'division' ? 'bg-orange-100 text-orange-700' :
                        'bg-indigo-100 text-indigo-700'
                      }`}>
                        {card.category.slice(0, 4)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <div className="flex gap-1 justify-center">
                        <button
                          onClick={() => handleEditCard(card)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-lg text-xs transform hover:scale-105 transition-all duration-200"
                          title="Edit this card"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-lg text-xs transform hover:scale-105 transition-all duration-200"
                          title="Delete this card"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredCards.map((card) => (
              <div key={card.id} className="bg-white rounded-2xl p-4 shadow-lg border-2 border-purple-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="text-sm text-purple-600 font-semibold mb-1">ID: {card.id}</div>
                    <div className="text-lg font-bold text-gray-800 mb-2">{card.question}</div>
                    <div className="text-green-600 font-bold mb-2">Answer: {card.answer}</div>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => handleEditCard(card)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-xl text-sm transform hover:scale-105 transition-all duration-200"
                      title="Edit this card"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-xl text-sm transform hover:scale-105 transition-all duration-200"
                      title="Delete this card"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    card.inputType === 'text-input' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {card.inputType === 'text-input' ? '📝 Text Input' : '☑️ Multiple Choice'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    card.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {card.difficulty}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    card.category === 'addition' ? 'bg-green-100 text-green-700' :
                    card.category === 'subtraction' ? 'bg-blue-100 text-blue-700' :
                    card.category === 'multiplication' ? 'bg-purple-100 text-purple-700' :
                    card.category === 'division' ? 'bg-orange-100 text-orange-700' :
                    'bg-indigo-100 text-indigo-700'
                  }`}>
                    {card.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCards.length === 0 && cards.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No cards match your current filters. Try adjusting the filters above.</p>
            </div>
          )}
          
          {cards.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No cards available. Add some cards above to get started!</p>
            </div>
          )}
        </div>

        {/* Edit Card Modal */}
        {showEditModal && editingCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl border-4 border-purple-300 p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
              <h3 className="text-2xl font-bold text-purple-700 mb-6">✏️ Edit Card</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">Question</label>
                  <input
                    type="text"
                    value={editingCard.question}
                    onChange={(e) => setEditingCard({...editingCard, question: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">Correct Answer</label>
                  <input
                    type="text"
                    value={editingCard.answer}
                    onChange={(e) => setEditingCard({...editingCard, answer: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
                  />
                </div>
                
                {editingCard.inputType === 'multiple-choice' && editingCard.options && (
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Answer Options</label>
                    <div className="grid grid-cols-2 gap-4">
                      {editingCard.options.map((option, index) => (
                        <input
                          key={index}
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...editingCard.options!]
                            newOptions[index] = e.target.value
                            setEditingCard({...editingCard, options: newOptions})
                          }}
                          placeholder={`Option ${index + 1}`}
                          className="px-4 py-3 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Input Type</label>
                    <select
                      value={editingCard.inputType || 'multiple-choice'}
                      onChange={(e) => {
                        const inputType = e.target.value as 'multiple-choice' | 'text-input'
                        const updatedCard = {...editingCard, inputType}
                        if (inputType === 'multiple-choice' && !updatedCard.options) {
                          updatedCard.options = ['', '', '', '']
                        }
                        setEditingCard(updatedCard)
                      }}
                      className="w-full px-4 py-3 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
                    >
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="text-input">Text Input</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Difficulty</label>
                    <select
                      value={editingCard.difficulty}
                      onChange={(e) => setEditingCard({...editingCard, difficulty: e.target.value as 'easy' | 'medium' | 'hard'})}
                      className="w-full px-4 py-3 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      value={editingCard.category}
                      onChange={(e) => setEditingCard({...editingCard, category: e.target.value as 'addition' | 'subtraction' | 'multiplication' | 'division' | 'spelling'})}
                      className="w-full px-4 py-3 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
                    >
                      <option value="addition">Addition</option>
                      <option value="subtraction">Subtraction</option>
                      <option value="multiplication">Multiplication</option>
                      <option value="division">Division</option>
                      <option value="spelling">Spelling</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleUpdateCard}
                    className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    ✅ Update Card
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            🎮 Back to Game
          </a>
        </div>
      </div>
    </div>
  )
}