export interface Character {
  id: string
  name: string
  emoji: string
  description: string
  unlockRequirement: {
    totalScore: number
    achievements: string[]
  }
}

export interface Achievement {
  id: string
  name: string
  description: string
  emoji: string
  type: 'streak' | 'score' | 'perfect' | 'speed' | 'milestone'
  requirement: any
  reward: {
    points: number
    character?: string
    theme?: string
  }
}

export const gameSystem = {
  characters: [
    {
      id: 'princess',
      name: 'Princess Luna',
      emoji: '👑',
      description: 'A brave princess who loves learning!',
      unlockRequirement: { totalScore: 0, achievements: [] }
    },
    {
      id: 'wizard',
      name: 'Mathemagician',  
      emoji: '🧙‍♀️',
      description: 'A wise wizard who masters numbers!',
      unlockRequirement: { totalScore: 500, achievements: ['math_wizard'] }
    },
    {
      id: 'astronaut',
      name: 'Space Explorer',
      emoji: '👩‍🚀', 
      description: 'Explores the galaxy of knowledge!',
      unlockRequirement: { totalScore: 1000, achievements: ['high_scorer'] }
    }
  ],

  achievements: [
    {
      id: 'first_steps',
      name: 'First Steps',
      description: 'Answered your first question!',
      emoji: '👶',
      type: 'milestone',
      requirement: { correctAnswers: 1 },
      reward: { points: 50 }
    },
    {
      id: 'speed_demon',
      name: 'Lightning Fast',
      description: 'Answered 5 questions in under 30 seconds!',
      emoji: '⚡',
      type: 'speed', 
      requirement: { questionsInTime: 5, timeLimit: 30 },
      reward: { points: 200, theme: 'lightning' }
    },
    {
      id: 'perfect_week',
      name: 'Perfect Week',
      description: 'Studied every day this week!',
      emoji: '🌟',
      type: 'streak',
      requirement: { dailyStreak: 7 },
      reward: { points: 500, character: 'wizard' }
    }
  ],

  powerUps: [
    {
      id: 'extra_time',
      name: '⏰ Time Boost',
      description: 'Get 10 extra seconds!',
      cost: 100
    },
    {
      id: 'hint',
      name: '💡 Smart Hint', 
      description: 'Get a helpful clue!',
      cost: 50
    },
    {
      id: 'skip',
      name: '⏭️ Skip Card',
      description: 'Skip this question without penalty!',
      cost: 75
    }
  ]
}