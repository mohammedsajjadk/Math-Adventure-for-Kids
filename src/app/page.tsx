'use client'

import { useState, useEffect } from 'react'
import GameCard from '../components/GameCard'
import ProgressBar from '../components/ProgressBar'
import RewardCard from '../components/RewardCard'
import Timer from '../components/Timer'
import SaveIndicator from '../components/SaveIndicator'
import MathOverview from '../components/MathOverview'
import { GameSaveSystem } from '../utils/saveSystem'
import { CardManager } from '../utils/cardManager'
import { DeckManager } from '../utils/deckManager'

export default function Home() {
  const [currentCard, setCurrentCard] = useState(0)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showReward, setShowReward] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(false)
  const [rewardsCollected, setRewardsCollected] = useState(0)
  const [showSaveIndicator, setShowSaveIndicator] = useState(false)
  const [ankiMode, setAnkiMode] = useState(false)
  const [showOverview, setShowOverview] = useState(false)
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(['easy'])
  const [selectedDecks, setSelectedDecks] = useState<string[]>([])
  const [allCards, setAllCards] = useState(CardManager.loadCards())
  const [availableCards, setAvailableCards] = useState(() => {
    const cards = CardManager.loadCards()
    const activeCards = DeckManager.getCardsForActiveDecks(cards)
    return activeCards.filter(card => card.difficulty === 'easy')
  })

  // Update available cards when difficulty or deck selection changes
  const updateAvailableCards = (difficulties: string[], decks?: string[]) => {
    const currentDecks = decks || selectedDecks
    const activeDecks = DeckManager.getActiveDecks()
    const allowedCategories = currentDecks.length > 0 
      ? activeDecks.filter(deck => currentDecks.includes(deck.id)).map(deck => deck.category)
      : activeDecks.map(deck => deck.category)

    const unansweredCardIds = GameSaveSystem.getUnansweredCards(allCards.map(c => c.id))
    const filtered = allCards.filter(card => 
      difficulties.includes(card.difficulty) && 
      allowedCategories.includes(card.category) &&
      unansweredCardIds.includes(card.id)
    )
    
    if (filtered.length === 0) {
      // All cards have been answered, reset session and allow all cards
      GameSaveSystem.startNewSession()
      const resetFiltered = allCards.filter(card => 
        difficulties.includes(card.difficulty) && 
        allowedCategories.includes(card.category)
      )
      setAvailableCards(resetFiltered)
    } else {
      setAvailableCards(filtered)
    }
    setCurrentCard(0) // Reset to first card of new set
  }

  // Load saved progress and preferences on component mount
  useEffect(() => {
    const savedProgress = GameSaveSystem.loadProgress()
    setScore(savedProgress.totalScore)
    setRewardsCollected(savedProgress.totalRewards)
    setCorrectAnswers(savedProgress.totalCorrectAnswers)
    
    // Load saved Anki mode preference
    const savedAnkiMode = localStorage.getItem('mathGameAnkiMode')
    if (savedAnkiMode !== null) {
      setAnkiMode(savedAnkiMode === 'true')
    }
    
    // Load saved difficulty preferences
    const savedDifficulties = localStorage.getItem('mathGameSelectedDifficulties')
    if (savedDifficulties) {
      try {
        const difficulties = JSON.parse(savedDifficulties)
        setSelectedDifficulties(difficulties)
      } catch (error) {
        console.error('Failed to load difficulty preferences:', error)
      }
    }
    
    // Load active decks for deck selector
    const activeDecks = DeckManager.getActiveDecks()
    if (activeDecks.length > 0) {
      setSelectedDecks(activeDecks.map(deck => deck.id))
    }
    
    // Filter out cards that were answered in the current session
    const filterUnansweredCards = () => {
      const currentCards = CardManager.loadCards()
      setAllCards(currentCards) // Update allCards state
      
      const activeDecks = DeckManager.getActiveDecks()
      const allowedCategories = activeDecks.map(deck => deck.category)
      
      const unansweredCardIds = GameSaveSystem.getUnansweredCards(currentCards.map(c => c.id))
      const unansweredCards = currentCards.filter(card => 
        selectedDifficulties.includes(card.difficulty) && 
        allowedCategories.includes(card.category) &&
        unansweredCardIds.includes(card.id)
      )
      
      if (unansweredCards.length === 0) {
        // All cards have been answered in this session, reset for a new round
        GameSaveSystem.startNewSession()
        const filtered = currentCards.filter(card => 
          selectedDifficulties.includes(card.difficulty) && 
          allowedCategories.includes(card.category)
        )
        setAvailableCards(filtered)
      } else {
        setAvailableCards(unansweredCards)
      }
    }
    
    filterUnansweredCards()
  }, [])

  const CARDS_FOR_REWARD = 5 // Number of correct answers to get a reward

  const startGame = () => {
    setGameActive(true)
    setTimeLeft(30)
    
    if (!ankiMode) {
      // Fun mode: shuffle the available cards for random order
      const shuffled = [...availableCards].sort(() => Math.random() - 0.5)
      setAvailableCards(shuffled)
      setCurrentCard(0)
    }
    // Anki mode uses the cards in their spaced repetition order (already handled by difficulty)
  }

  const handleAnswer = (answer: string, difficulty?: 'again' | 'hard' | 'good' | 'easy') => {
    const currentCardData = availableCards[currentCard]
    const correct = answer === currentCardData.answer
    const wasTimedOut = timeLeft === 0
    
    if (correct && !wasTimedOut) {
      // Only count correct answers that weren't timed out for rewards/score
      const newScore = score + 10
      const newCorrectAnswers = correctAnswers + 1
      
      setScore(newScore)
      setCorrectAnswers(newCorrectAnswers)
      
      // Save progress immediately and track this card as answered
      GameSaveSystem.addCorrectAnswer(currentCardData.category, currentCardData.id)
      GameSaveSystem.addScore(10)
      setShowSaveIndicator(true)
      
      if (newCorrectAnswers % CARDS_FOR_REWARD === 0) {
        setShowReward(true)
        setGameActive(false)
        return
      }
    }

    // Remove the current card from available cards since it's been answered
    const updatedCards = availableCards.filter((_, index) => index !== currentCard)
    
    if (updatedCards.length === 0) {
      // All cards completed! Reset for new round
      GameSaveSystem.startNewSession()
      const activeDecks = DeckManager.getActiveDecks()
      const allowedCategories = selectedDecks.length > 0 
        ? activeDecks.filter(deck => selectedDecks.includes(deck.id)).map(deck => deck.category)
        : activeDecks.map(deck => deck.category)
      
      const resetCards = allCards.filter(card => 
        selectedDifficulties.includes(card.difficulty) && 
        allowedCategories.includes(card.category)
      )
      setAvailableCards(resetCards)
      setCurrentCard(0)
    } else {
      setAvailableCards(updatedCards)
      // Adjust current card index if needed
      if (currentCard >= updatedCards.length) {
        setCurrentCard(0)
      }
    }

    // Always restart the game and timer for next question
    setGameActive(true)
    setTimeLeft(30)
  }

  const collectReward = () => {
    const newRewards = rewardsCollected + 1
    setRewardsCollected(newRewards)
    
    // Save reward progress
    GameSaveSystem.addReward()
    
    setShowReward(false)
    setCurrentCard((prev) => (prev + 1) % availableCards.length)
    setTimeLeft(30)
    setGameActive(true)
  }

  const handleTimeUp = () => {
    // Timer stops at 0, doesn't auto-advance anymore
    // Child must still answer, but wrong/timeout answers don't count for rewards
    setGameActive(false) // Stop the game, wait for answer
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameActive) {
      handleTimeUp()
    }

    return () => clearInterval(interval)
  }, [gameActive, timeLeft])

  if (showReward) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <SaveIndicator show={showSaveIndicator} />
        <RewardCard onCollect={collectReward} rewardsNeeded={10 - rewardsCollected} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SaveIndicator show={showSaveIndicator} />
      <header className="text-center mb-8">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          🌟 Mahira's Math Adventure! 🌟
        </h1>
        
        {/* Mode Toggle */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <span className={`text-lg font-semibold ${!ankiMode ? 'text-purple-600' : 'text-gray-400'}`}>
            🎮 Fun Mode
          </span>
          <button
            onClick={() => {
              const newAnkiMode = !ankiMode
              setAnkiMode(newAnkiMode)
              localStorage.setItem('mathGameAnkiMode', newAnkiMode.toString())
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              ankiMode ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                ankiMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-lg font-semibold ${ankiMode ? 'text-indigo-600' : 'text-gray-400'}`}>
            🎯 Anki Mode
          </span>
        </div>
        <div className="flex justify-center items-center gap-8 mb-6">
          <div className="bg-white/80 rounded-full px-6 py-3 shadow-lg">
            <span className="text-2xl font-bold text-purple-600">Score: {score}</span>
          </div>
          <div className="bg-white/80 rounded-full px-6 py-3 shadow-lg">
            <span className="text-2xl font-bold text-pink-600">Rewards: {rewardsCollected}</span>
          </div>
        </div>
        <ProgressBar current={correctAnswers % CARDS_FOR_REWARD} total={CARDS_FOR_REWARD} />
        
        {/* Difficulty Selector */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <span className="text-lg font-semibold text-gray-600">Difficulty:</span>
          {['easy', 'medium', 'hard'].map((diff) => (
            <label key={diff} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDifficulties.includes(diff)}
                onChange={(e) => {
                  let newDiffs;
                  if (e.target.checked) {
                    newDiffs = [...selectedDifficulties, diff];
                  } else {
                    newDiffs = selectedDifficulties.filter(d => d !== diff);
                  }
                  if (newDiffs.length > 0) {
                    setSelectedDifficulties(newDiffs);
                    updateAvailableCards(newDiffs);
                    localStorage.setItem('mathGameSelectedDifficulties', JSON.stringify(newDiffs));
                  }
                }}
                className="w-4 h-4 rounded"
              />
              <span className={`font-semibold capitalize px-3 py-1 rounded-full text-sm ${
                diff === 'easy' ? 'bg-green-100 text-green-700' :
                diff === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {diff} ({allCards.filter(card => card.difficulty === diff).length})
              </span>
            </label>
          ))}
        </div>

        {/* Deck Selector */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          <span className="text-lg font-semibold text-gray-600">Choose Decks:</span>
          {DeckManager.getActiveDecks().map((deck) => (
            <label key={deck.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDecks.includes(deck.id)}
                onChange={(e) => {
                  let newDecks;
                  if (e.target.checked) {
                    newDecks = [...selectedDecks, deck.id];
                  } else {
                    newDecks = selectedDecks.filter(id => id !== deck.id);
                  }
                  if (newDecks.length > 0) {
                    setSelectedDecks(newDecks);
                    updateAvailableCards(selectedDifficulties, newDecks);
                  }
                }}
                className="w-4 h-4 rounded"
              />
              <span className={`font-semibold px-4 py-2 rounded-full text-sm bg-gradient-to-r ${deck.color} text-white shadow-lg`}>
                {deck.emoji} {deck.name}
              </span>
            </label>
          ))}
        </div>

        {/* Show Math Library Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowOverview(!showOverview)}
            className="bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            {showOverview ? '🎮 Hide Library' : '📚 Show Math Library'}
          </button>
        </div>
      </header>

      {/* Math Overview */}
      {showOverview && (
        <div className="max-w-4xl mx-auto mb-8">
          <MathOverview />
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {!gameActive ? (
          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-6 px-12 rounded-full text-3xl shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              🚀 Start Adventure! 🚀
            </button>
          </div>
        ) : (
          <>
            <Timer timeLeft={timeLeft} totalTime={30} />
            <GameCard
              card={availableCards[currentCard]}
              onAnswer={handleAnswer}
              timeLeft={timeLeft}
              ankiMode={ankiMode}
            />
          </>
        )}
      </div>
    </div>
  )
}