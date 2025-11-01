export interface GameSession {
  date: string
  questionsAnswered: number
  correctAnswers: number
  timeSpent: number // in seconds
  rewardsEarned: number
  averageTimePerQuestion: number
  difficulty: 'easy' | 'medium' | 'hard'
}

export class ProgressTracker {
  private sessions: GameSession[] = []

  constructor() {
    this.loadProgress()
  }

  startSession() {
    const session: GameSession = {
      date: new Date().toISOString().split('T')[0],
      questionsAnswered: 0,
      correctAnswers: 0,
      timeSpent: 0,
      rewardsEarned: 0,
      averageTimePerQuestion: 0,
      difficulty: 'easy'
    }
    return session
  }

  recordAnswer(session: GameSession, isCorrect: boolean, timeSpent: number) {
    session.questionsAnswered++
    if (isCorrect) session.correctAnswers++
    session.timeSpent += timeSpent
    session.averageTimePerQuestion = session.timeSpent / session.questionsAnswered
  }

  recordReward(session: GameSession) {
    session.rewardsEarned++
  }

  saveSession(session: GameSession) {
    this.sessions.push(session)
    this.saveProgress()
  }

  getWeeklyStats() {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const recentSessions = this.sessions.filter(s => 
      new Date(s.date) >= oneWeekAgo
    )

    return {
      totalSessions: recentSessions.length,
      totalQuestions: recentSessions.reduce((sum, s) => sum + s.questionsAnswered, 0),
      totalCorrect: recentSessions.reduce((sum, s) => sum + s.correctAnswers, 0),
      totalRewards: recentSessions.reduce((sum, s) => sum + s.rewardsEarned, 0),
      averageAccuracy: recentSessions.length > 0 
        ? recentSessions.reduce((sum, s) => sum + (s.correctAnswers / s.questionsAnswered), 0) / recentSessions.length
        : 0
    }
  }

  private loadProgress() {
    if (typeof window === 'undefined' || !window.localStorage) return
    try {
      const saved = localStorage.getItem('mathProgress')
      if (saved) {
        this.sessions = JSON.parse(saved)
      }
    } catch (error) {
      console.log('Could not load progress')
    }
  }

  private saveProgress() {
    if (typeof window === 'undefined' || !window.localStorage) return
    try {
      localStorage.setItem('mathProgress', JSON.stringify(this.sessions))
    } catch (error) {
      console.log('Could not save progress')
    }
  }
}

export const progressTracker = new ProgressTracker()