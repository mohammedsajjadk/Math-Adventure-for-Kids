export interface AnkiSettings {
  // Learning phase settings (for new cards)
  learningSteps: number[] // Minutes: [1, 10] means 1min then 10min
  graduatingInterval: number // Days until card becomes "mature"
  easyInterval: number // Days if marked "Easy" on first try
  
  // Review settings (for mature cards)
  easyBonus: number // Multiplier for "Easy" button (1.3 = 30% bonus)
  intervalModifier: number // Global interval modifier (1.0 = 100%)
  maximumInterval: number // Max days between reviews
  
  // Difficulty settings for kids
  kidFriendlyMode: boolean // Simpler intervals for young learners
  minimumInterval: number // Minimum days between reviews
  failureResetStrength: number // How much to reduce ease on failure
}

export const defaultAnkiSettings: AnkiSettings = {
  // Kid-friendly learning steps (much shorter than adult Anki)
  learningSteps: [1, 10], // 1 minute, then 10 minutes (vs Anki's 1min, 10min)
  graduatingInterval: 1, // 1 day (vs Anki's 4 days)
  easyInterval: 4, // 4 days for easy (vs Anki's 4 days)
  
  // Gentler review settings
  easyBonus: 1.2, // 20% bonus (vs Anki's 30%)
  intervalModifier: 0.8, // 80% of normal intervals (easier for kids)
  maximumInterval: 30, // Max 30 days (vs Anki's 36500 days)
  
  // Kid-specific settings
  kidFriendlyMode: true,
  minimumInterval: 1, // At least 1 day between reviews
  failureResetStrength: 0.1 // Gentler punishment for wrong answers
}

export const adultAnkiSettings: AnkiSettings = {
  // Standard Anki settings for comparison
  learningSteps: [1, 10],
  graduatingInterval: 4,
  easyInterval: 4,
  
  easyBonus: 1.3,
  intervalModifier: 1.0,
  maximumInterval: 36500,
  
  kidFriendlyMode: false,
  minimumInterval: 1,
  failureResetStrength: 0.2
}

export class AnkiSettingsManager {
  private static SETTINGS_KEY = 'ankiSettings'
  
  static loadSettings(): AnkiSettings {
    // If localStorage isn't available (SSR), return defaults
    if (typeof window === 'undefined' || !window.localStorage) return defaultAnkiSettings
    try {
      const saved = localStorage.getItem(this.SETTINGS_KEY)
      if (saved) {
        return { ...defaultAnkiSettings, ...JSON.parse(saved) }
      }
    } catch (error) {
      console.log('Using default Anki settings')
    }
    return defaultAnkiSettings
  }
  
  static saveSettings(settings: AnkiSettings): void {
    if (typeof window === 'undefined' || !window.localStorage) return
    try {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings))
    } catch (error) {
      console.error('Failed to save Anki settings')
    }
  }
  
  static resetToDefaults(): void {
    if (typeof window === 'undefined' || !window.localStorage) return
    localStorage.removeItem(this.SETTINGS_KEY)
  }
  
  // Preset configurations
  static getPreset(type: 'beginner' | 'intermediate' | 'advanced'): AnkiSettings {
    const presets = {
      beginner: {
        ...defaultAnkiSettings,
        learningSteps: [5], // Just 5 minutes
        graduatingInterval: 1,
        maximumInterval: 7, // Max 1 week
        intervalModifier: 0.5 // Very gentle
      },
      intermediate: {
        ...defaultAnkiSettings,
        learningSteps: [1, 10],
        graduatingInterval: 2,
        maximumInterval: 14, // Max 2 weeks
        intervalModifier: 0.7
      },
      advanced: {
        ...defaultAnkiSettings,
        learningSteps: [1, 10, 1440], // Include 1 day step
        graduatingInterval: 3,
        maximumInterval: 60, // Max 2 months
        intervalModifier: 0.9
      }
    }
    return presets[type]
  }
}