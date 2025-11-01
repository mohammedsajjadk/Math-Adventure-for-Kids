'use client'

import { MathCard, allMathCards as defaultCards } from '../data/cards'

export class CardManager {
  private static CARDS_KEY = 'mathGameCustomCards'

  static saveCards(cards: MathCard[]): void {
    if (typeof window === 'undefined' || !window.localStorage) return
    try {
      localStorage.setItem(this.CARDS_KEY, JSON.stringify(cards))
      console.log('✅ Cards saved successfully!')
    } catch (error) {
      console.error('❌ Failed to save cards:', error)
    }
  }

  static loadCards(): MathCard[] {
    // If localStorage is not available (SSR), return defaults
    if (typeof window === 'undefined' || !window.localStorage) {
      console.log('📖 Loading default cards (SSR)')
      return [...defaultCards]
    }

    try {
      const saved = localStorage.getItem(this.CARDS_KEY)
      if (saved) {
        const cards = JSON.parse(saved)
        console.log('📖 Custom cards loaded successfully!')
        return cards
      }
    } catch (error) {
      console.error('❌ Failed to load custom cards:', error)
    }

    // Return default cards if no custom cards exist
    console.log('📖 Loading default cards')
    return [...defaultCards]
  }

  static addCard(card: MathCard): MathCard[] {
    const currentCards = this.loadCards()
    const newCards = [...currentCards, card]
    this.saveCards(newCards)
    return newCards
  }

  static deleteCard(cardId: number): MathCard[] {
    const currentCards = this.loadCards()
    const filteredCards = currentCards.filter(card => card.id !== cardId)
    this.saveCards(filteredCards)
    return filteredCards
  }

  static updateCard(updatedCard: MathCard): MathCard[] {
    const currentCards = this.loadCards()
    const updatedCards = currentCards.map(card => 
      card.id === updatedCard.id ? updatedCard : card
    )
    this.saveCards(updatedCards)
    return updatedCards
  }

  static resetToDefaults(): MathCard[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.CARDS_KEY)
    }
    console.log('🔄 Cards reset to defaults')
    return [...defaultCards]
  }

  static exportCards(): string {
    const cards = this.loadCards()
    return JSON.stringify(cards, null, 2)
  }

  static importCards(data: string): boolean {
    try {
      const cards = JSON.parse(data)
      if (Array.isArray(cards) && cards.length > 0) {
        this.saveCards(cards)
        return true
      }
    } catch (error) {
      console.error('Failed to import cards:', error)
    }
    return false
  }

  static getNextId(): number {
    const cards = this.loadCards()
    if (cards.length === 0) return 1
    return Math.max(...cards.map(card => card.id)) + 1
  }
}