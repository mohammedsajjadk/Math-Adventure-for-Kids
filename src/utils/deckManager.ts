'use client'

import { MathCard } from '../data/cards'

export interface Deck {
  id: string
  name: string
  description: string
  category: string
  isActive: boolean
  color: string
  emoji: string
  cardIds: number[]
}

export class DeckManager {
  private static DECKS_KEY = 'mathGameDecks'
  private static ACTIVE_DECKS_KEY = 'mathGameActiveDecks'

  static getDefaultDecks(): Deck[] {
    return [
      {
        id: 'addition',
        name: 'Addition Adventures',
        description: 'Learn to add numbers together!',
        category: 'addition',
        isActive: true,
        color: 'from-green-400 to-green-600',
        emoji: '➕',
        cardIds: []
      },
      {
        id: 'subtraction',
        name: 'Subtraction Superstar',
        description: 'Master taking numbers away!',
        category: 'subtraction',
        isActive: true,
        color: 'from-blue-400 to-blue-600',
        emoji: '➖',
        cardIds: []
      },
      {
        id: 'multiplication',
        name: 'Multiplication Magic',
        description: 'Discover the power of times tables!',
        category: 'multiplication',
        isActive: true,
        color: 'from-purple-400 to-purple-600',
        emoji: '✖️',
        cardIds: []
      },
      {
        id: 'division',
        name: 'Division Dynasty',
        description: 'Share and divide like a pro!',
        category: 'division',
        isActive: true,
        color: 'from-orange-400 to-orange-600',
        emoji: '➗',
        cardIds: []
      },
      {
        id: 'spelling',
        name: 'Spelling Numbers',
        description: 'Learn spellings for numbers 1 to 20',
        category: 'spelling',
        isActive: true,
        color: 'from-indigo-400 to-indigo-600',
        emoji: '🔤',
        cardIds: []
      }
    ]
  }

  static saveDecks(decks: Deck[]): void {
    try {
      localStorage.setItem(this.DECKS_KEY, JSON.stringify(decks))
      console.log('✅ Decks saved successfully!')
    } catch (error) {
      console.error('❌ Failed to save decks:', error)
    }
  }

  static loadDecks(): Deck[] {
    try {
      const saved = localStorage.getItem(this.DECKS_KEY)
      if (saved) {
        const decks = JSON.parse(saved)
        console.log('📖 Decks loaded successfully!')
        return decks
      }
    } catch (error) {
      console.error('❌ Failed to load decks:', error)
    }

    // Return default decks if no custom decks exist
    const defaultDecks = this.getDefaultDecks()
    this.saveDecks(defaultDecks)
    return defaultDecks
  }

  static updateDeckActiveStatus(deckId: string, isActive: boolean): Deck[] {
    const decks = this.loadDecks()
    const updatedDecks = decks.map(deck => 
      deck.id === deckId ? { ...deck, isActive } : deck
    )
    this.saveDecks(updatedDecks)
    return updatedDecks
  }

  static getActiveDecks(): Deck[] {
    const decks = this.loadDecks()
    return decks.filter(deck => deck.isActive)
  }

  static getCardsForActiveDecks(allCards: MathCard[]): MathCard[] {
    const activeDecks = this.getActiveDecks()
    const activeCategories = activeDecks.map(deck => deck.category)
    return allCards.filter(card => activeCategories.includes(card.category))
  }

  static createCustomDeck(deck: Omit<Deck, 'id'>): Deck[] {
    const decks = this.loadDecks()
    const newDeck: Deck = {
      ...deck,
      id: `custom_${Date.now()}`
    }
    const updatedDecks = [...decks, newDeck]
    this.saveDecks(updatedDecks)
    return updatedDecks
  }

  static updateDeck(deckId: string, updates: Partial<Deck>): Deck[] {
    const decks = this.loadDecks()
    const updatedDecks = decks.map(deck => 
      deck.id === deckId ? { ...deck, ...updates } : deck
    )
    this.saveDecks(updatedDecks)
    return updatedDecks
  }

  static deleteDeck(deckId: string): Deck[] {
    const decks = this.loadDecks()
    const filteredDecks = decks.filter(deck => deck.id !== deckId)
    this.saveDecks(filteredDecks)
    return filteredDecks
  }

  static resetToDefaults(): Deck[] {
    const defaultDecks = this.getDefaultDecks()
    this.saveDecks(defaultDecks)
    return defaultDecks
  }

  static getDeckStats(deckId: string, allCards: MathCard[]): {
    totalCards: number
    easyCards: number
    mediumCards: number
    hardCards: number
  } {
    const deck = this.loadDecks().find(d => d.id === deckId)
    if (!deck) {
      return { totalCards: 0, easyCards: 0, mediumCards: 0, hardCards: 0 }
    }

    const deckCards = allCards.filter(card => card.category === deck.category)
    
    return {
      totalCards: deckCards.length,
      easyCards: deckCards.filter(card => card.difficulty === 'easy').length,
      mediumCards: deckCards.filter(card => card.difficulty === 'medium').length,
      hardCards: deckCards.filter(card => card.difficulty === 'hard').length,
    }
  }
}