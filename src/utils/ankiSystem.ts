import { MathCard } from '../data/cards'
import { AnkiSettings, AnkiSettingsManager } from './ankiSettings'

export interface AnkiCard extends MathCard {
  easeFactor: number // How "easy" the card is (2.5 = default)
  interval: number // Days until next review
  repetitions: number // How many times reviewed
  nextReviewDate: string // When to show again
  lastReviewDate: string // When last seen
  grade: number // Last performance (0-5, like Anki)
}

export interface ReviewStats {
  againCount: number // Failed attempts (red button)
  hardCount: number // Difficult (red button but knew answer)
  goodCount: number // Normal success (green button)
  easyCount: number // Very easy (blue button)
}

export class AnkiAlgorithm {
  // Kid-friendly Anki SM-2 algorithm with customizable settings
  static calculateNextReview(card: AnkiCard, grade: number): AnkiCard {
    const settings = AnkiSettingsManager.loadSettings()
    const now = new Date()
    
    let newCard = { ...card }
    newCard.lastReviewDate = now.toISOString().split('T')[0]
    newCard.grade = grade
    
    if (grade < 3) {
      // Failed - reset to beginning like Anki "Again"
      newCard.repetitions = 0
      newCard.interval = settings.minimumInterval
      newCard.easeFactor = Math.max(1.3, newCard.easeFactor - settings.failureResetStrength)
    } else {
      // Passed - calculate next interval based on settings
      if (newCard.repetitions === 0) {
        // First time seeing this card
        if (grade === 5) { // Easy on first try
          newCard.interval = settings.easyInterval
        } else {
          newCard.interval = settings.graduatingInterval
        }
      } else if (newCard.repetitions === 1) {
        // Second successful review
        newCard.interval = settings.graduatingInterval * 2
      } else {
        // Mature card - use ease factor
        newCard.interval = Math.round(newCard.interval * newCard.easeFactor * settings.intervalModifier)
      }
      
      newCard.repetitions += 1
      
      // Adjust ease factor based on performance (gentler for kids)
      if (grade === 3) { // Hard
        newCard.easeFactor = Math.max(1.3, newCard.easeFactor - 0.1)
      } else if (grade === 5) { // Easy
        newCard.easeFactor = Math.min(2.5, newCard.easeFactor + (settings.easyBonus - 1))
      }
      
      // Apply easy bonus for grade 5
      if (grade === 5) {
        newCard.interval = Math.round(newCard.interval * settings.easyBonus)
      }
      
      // Respect minimum and maximum intervals
      newCard.interval = Math.max(settings.minimumInterval, newCard.interval)
      newCard.interval = Math.min(settings.maximumInterval, newCard.interval)
    }
    
    // Calculate next review date
    const nextDate = new Date(now)
    nextDate.setDate(nextDate.getDate() + newCard.interval)
    newCard.nextReviewDate = nextDate.toISOString().split('T')[0]
    
    return newCard
  }
  
  static getDueCards(cards: AnkiCard[]): AnkiCard[] {
    const today = new Date().toISOString().split('T')[0]
    return cards.filter(card => card.nextReviewDate <= today)
  }
  
  static getNewCards(cards: AnkiCard[], limit: number = 5): AnkiCard[] {
    return cards.filter(card => card.repetitions === 0).slice(0, limit)
  }
  
  static getReviewCards(cards: AnkiCard[]): AnkiCard[] {
    const today = new Date().toISOString().split('T')[0]
    return cards.filter(card => 
      card.repetitions > 0 && card.nextReviewDate <= today
    )
  }
}