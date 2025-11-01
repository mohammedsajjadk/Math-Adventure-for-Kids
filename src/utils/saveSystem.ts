'use client'

export interface SavedProgress {
  totalScore: number
  totalRewards: number
  totalCorrectAnswers: number
  totalQuestionsAnswered: number
  lastPlayDate: string
  streakDays: number
  achievements: string[]
  favoriteCategories: { [key: string]: number }
  completedCardIds: number[]
  currentSessionAnswered: number[]
}

export class GameSaveSystem {
  private static SAVE_KEY = 'mathGameProgress'

  static saveProgress(progress: SavedProgress): void {
    try {
      localStorage.setItem(this.SAVE_KEY, JSON.stringify(progress))
      console.log('✅ Progress saved successfully!')
    } catch (error) {
      console.error('❌ Failed to save progress:', error)
    }
  }

  static loadProgress(): SavedProgress {
    try {
      const saved = localStorage.getItem(this.SAVE_KEY)
      if (saved) {
        const progress = JSON.parse(saved)
        console.log('📖 Progress loaded successfully!')
        return progress
      }
    } catch (error) {
      console.error('❌ Failed to load progress:', error)
    }

    // Return default progress if no save exists
    return {
      totalScore: 0,
      totalRewards: 0,
      totalCorrectAnswers: 0,
      totalQuestionsAnswered: 0,
      lastPlayDate: new Date().toISOString().split('T')[0],
      streakDays: 0,
      achievements: [],
      favoriteCategories: {},
      completedCardIds: [],
      currentSessionAnswered: []
    }
  }

  static updateProgress(updates: Partial<SavedProgress>): SavedProgress {
    const current = this.loadProgress()
    const updated = { ...current, ...updates }
    this.saveProgress(updated)
    return updated
  }

  static addScore(points: number): void {
    const current = this.loadProgress()
    this.saveProgress({
      ...current,
      totalScore: current.totalScore + points
    })
  }

  static addCorrectAnswer(category: string, cardId?: number): void {
    const current = this.loadProgress()
    const newCompletedIds = cardId ? [...current.completedCardIds, cardId] : current.completedCardIds
    const newSessionAnswered = cardId ? [...current.currentSessionAnswered, cardId] : current.currentSessionAnswered
    
    this.saveProgress({
      ...current,
      totalCorrectAnswers: current.totalCorrectAnswers + 1,
      totalQuestionsAnswered: current.totalQuestionsAnswered + 1,
      favoriteCategories: {
        ...current.favoriteCategories,
        [category]: (current.favoriteCategories[category] || 0) + 1
      },
      completedCardIds: newCompletedIds,
      currentSessionAnswered: newSessionAnswered
    })
  }

  static addReward(): void {
    const current = this.loadProgress()
    this.saveProgress({
      ...current,
      totalRewards: current.totalRewards + 1
    })
  }

  static checkAchievements(progress: SavedProgress): string[] {
    const newAchievements: string[] = []

    // First Correct Answer
    if (progress.totalCorrectAnswers >= 1 && !progress.achievements.includes('first_correct')) {
      newAchievements.push('first_correct')
    }

    // Math Wizard (10 correct answers)
    if (progress.totalCorrectAnswers >= 10 && !progress.achievements.includes('math_wizard')) {
      newAchievements.push('math_wizard')
    }

    // Reward Collector (5 rewards)
    if (progress.totalRewards >= 5 && !progress.achievements.includes('reward_collector')) {
      newAchievements.push('reward_collector')
    }

    // High Score (1000 points)
    if (progress.totalScore >= 1000 && !progress.achievements.includes('high_scorer')) {
      newAchievements.push('high_scorer')
    }

    return newAchievements
  }

  static getAchievementMessage(achievement: string): string {
    const messages = {
      'first_correct': '🌟 First Correct Answer! You\'re amazing!',
      'math_wizard': '🧙‍♀️ Math Wizard! 10 correct answers!',
      'reward_collector': '🏆 Reward Collector! 5 rewards earned!',
      'high_scorer': '💎 High Scorer! 1000 points achieved!'
    }
    return messages[achievement as keyof typeof messages] || '🎉 Achievement Unlocked!'
  }

  static clearProgress(): void {
    localStorage.removeItem(this.SAVE_KEY)
    console.log('🗑️ Progress cleared')
  }

  static exportProgress(): string {
    const progress = this.loadProgress()
    return JSON.stringify(progress, null, 2)
  }

  static importProgress(data: string): boolean {
    try {
      const progress = JSON.parse(data)
      this.saveProgress(progress)
      return true
    } catch (error) {
      console.error('Failed to import progress:', error)
      return false
    }
  }

  static startNewSession(): void {
    const current = this.loadProgress()
    this.saveProgress({
      ...current,
      currentSessionAnswered: []
    })
  }

  static isCardAnsweredInSession(cardId: number): boolean {
    const current = this.loadProgress()
    return current.currentSessionAnswered.includes(cardId)
  }

  static isCardCompleted(cardId: number): boolean {
    const current = this.loadProgress()
    return current.completedCardIds.includes(cardId)
  }

  static getUnansweredCards(allCardIds: number[]): number[] {
    const current = this.loadProgress()
    return allCardIds.filter(id => !current.currentSessionAnswered.includes(id))
  }

  static resetCompletedCards(): void {
    const current = this.loadProgress()
    this.saveProgress({
      ...current,
      completedCardIds: [],
      currentSessionAnswered: []
    })
  }
}