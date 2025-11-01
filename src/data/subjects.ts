// Transform into a comprehensive learning platform
export interface Subject {
  id: string
  name: string
  emoji: string
  color: string
  description: string
  ageRange: [number, number]
  modules: Module[]
}

export interface Module {
  id: string
  name: string  
  description: string
  cards: any[]
  prerequisites?: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: number // minutes
}

export const educationalSubjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics', 
    emoji: '🔢',
    color: 'purple',
    description: 'Numbers, operations, and problem-solving',
    ageRange: [4, 12],
    modules: [
      {
        id: 'counting',
        name: 'Counting Fun',
        description: 'Learn to count from 1 to 100',
        cards: [],
        difficulty: 'easy',
        estimatedTime: 15
      },
      {
        id: 'addition',
        name: 'Addition Adventures',
        description: 'Adding numbers together',
        cards: [],
        difficulty: 'easy', 
        estimatedTime: 20
      }
    ]
  },
  
  {
    id: 'reading',
    name: 'Reading & Phonics',
    emoji: '📚',
    color: 'blue',
    description: 'Letters, sounds, and reading comprehension',
    ageRange: [3, 8],
    modules: [
      {
        id: 'alphabet',
        name: 'Alphabet Magic',
        description: 'Learn letter names and sounds',
        cards: [],
        difficulty: 'easy',
        estimatedTime: 10
      },
      {
        id: 'sight_words',
        name: 'Sight Words',
        description: 'Common words to recognize instantly',
        cards: [],
        difficulty: 'medium',
        estimatedTime: 15
      }
    ]
  },

  {
    id: 'science', 
    name: 'Science Wonders',
    emoji: '🔬',
    color: 'green',
    description: 'Explore the natural world',
    ageRange: [5, 12],
    modules: [
      {
        id: 'animals',
        name: 'Animal Kingdom',
        description: 'Learn about different animals',
        cards: [],
        difficulty: 'easy',
        estimatedTime: 20
      },
      {
        id: 'space',
        name: 'Space Adventure', 
        description: 'Planets, stars, and the solar system',
        cards: [],
        difficulty: 'medium',
        estimatedTime: 25
      }
    ]
  },

  {
    id: 'geography',
    name: 'World Explorer',
    emoji: '🌍', 
    color: 'orange',
    description: 'Countries, capitals, and cultures',
    ageRange: [6, 14],
    modules: [
      {
        id: 'countries',
        name: 'Country Flags',
        description: 'Learn world flags and countries',
        cards: [],
        difficulty: 'medium',
        estimatedTime: 30
      }
    ]
  }
]