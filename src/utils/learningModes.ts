export type LearningMode = 
  | 'flashcards'      // Traditional Anki cards
  | 'typing'          // Type the answer
  | 'listening'       // Audio-based learning
  | 'speaking'        // Speech recognition
  | 'matching'        // Match pairs game
  | 'multiple_choice' // Current math style
  | 'fill_blanks'     // Complete the sentence
  | 'story_mode'      // Learn through stories
  | 'game_mode'       // Gamified challenges

export interface LearningSession {
  mode: LearningMode
  subject: 'math' | 'language' | 'science' | 'history' | 'geography'
  timeLimit?: number
  cardLimit?: number
  difficultyRange: string[]
  achievements: string[]
}

// Revolutionary learning modes
export const advancedLearningModes = {
  story_mode: {
    name: "📚 Story Learning",
    description: "Learn through interactive stories where your daughter is the hero!",
    example: "Princess needs to solve 3 + 4 to unlock the magical door..."
  },
  
  voice_mode: {
    name: "🎙️ Voice Learning", 
    description: "She speaks the answers out loud - great for confidence!",
    features: ["Speech recognition", "Pronunciation feedback", "Voice rewards"]
  },
  
  drawing_mode: {
    name: "🎨 Visual Learning",
    description: "Draw numbers, trace letters, create visual solutions",
    features: ["Touch/mouse drawing", "Number formation", "Creative expression"]
  },
  
  parent_child: {
    name: "👨‍👩‍👧 Parent-Child Mode",
    description: "Collaborative learning where parents can join the session",
    features: ["Two-player mode", "Parent coaching prompts", "Family challenges"]
  }
}