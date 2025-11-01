export interface LanguageCard {
  id: number
  sourceText: string // "Hello"
  targetText: string // "Hola"
  pronunciation?: string // "OH-lah"
  audioUrl?: string // Text-to-speech or recorded audio
  image?: string // Visual aid
  category: 'vocabulary' | 'phrases' | 'grammar' | 'conversation'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  language: {
    from: string // "English"
    to: string // "Spanish"
    flag: string // "🇪🇸"
  }
  context?: string // "Greeting someone in the morning"
  example?: string // "Hello, how are you today?"
}

export const multiLanguageSupport = {
  spanish: {
    name: "Spanish",
    flag: "🇪🇸",
    voice: "es-ES",
    cards: [
      {
        id: 1,
        sourceText: "Hello",
        targetText: "Hola", 
        pronunciation: "OH-lah",
        category: "vocabulary",
        difficulty: "beginner"
      }
    ]
  },
  french: {
    name: "French", 
    flag: "🇫🇷",
    voice: "fr-FR"
  },
  arabic: {
    name: "Arabic",
    flag: "🇸🇦", 
    voice: "ar-SA"
  },
  german: {
    name: "German",
    flag: "🇩🇪",
    voice: "de-DE"
  }
}