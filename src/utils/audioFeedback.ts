'use client'

export class AudioFeedback {
  private static isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  }

  private static speak(text: string, options: { rate?: number; pitch?: number; volume?: number } = {}): void {
    if (!this.isSupported()) {
      console.log('Speech synthesis not supported, fallback: ' + text)
      return
    }

    // Cancel any ongoing speech to prevent overlapping
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    // Slightly vary rate/pitch/volume to sound more natural unless explicitly provided
    const rand = (min: number, max: number) => min + Math.random() * (max - min)
    utterance.rate = options.rate ?? +rand(0.95, 1.05).toFixed(2)
    utterance.pitch = options.pitch ?? +rand(1.0, 1.25).toFixed(2)
    utterance.volume = options.volume ?? 0.9

    // Try to pick the best female English voice available
    const voices = window.speechSynthesis.getVoices()
    if (!voices || voices.length === 0) {
      // voices may not be loaded immediately in some browsers; retry shortly
      setTimeout(() => this.speak(text, options), 100)
      return
    }

    const femaleIndicators = [
      'female','woman','girl','zira','samantha','salli','sallie','sally','kendra','suzanne','victoria','emma','olivia','sophia','sophia','nicole','amy','laura','tessa','alloy','maria','hana'
    ]

    const englishVoices = voices.filter(v => /^en([-_]|$)/i.test(v.lang) || /english/i.test(v.name))

    const findByIndicator = (list: SpeechSynthesisVoice[]) =>
      list.find(v => femaleIndicators.some(ind => (v.name || '').toLowerCase().includes(ind) || (v.voiceURI || '').toLowerCase().includes(ind)))

    let chosen: SpeechSynthesisVoice | undefined = findByIndicator(englishVoices) || findByIndicator(voices)

    // Fallback to first English voice, or any voice available
    if (!chosen) chosen = englishVoices[0] || voices[0]

    // Check for a user-preferred voice stored in localStorage
    try {
      const preferred = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('ttsPreferredVoice') : null
      if (preferred) {
        const byName = voices.find(v => v.name === preferred || v.voiceURI === preferred)
        if (byName) chosen = byName
      }
    } catch (err) {
      // ignore localStorage errors
    }

    if (chosen) {
      utterance.voice = chosen
      // set language if known to help pronunciation
      if (chosen.lang) utterance.lang = chosen.lang
      console.debug('[AudioFeedback] Using TTS voice:', chosen.name, chosen.lang)
    } else {
      console.debug('[AudioFeedback] Using default TTS voice')
    }

    // Lightly post-process text for better prosody: ensure punctuation at end
    const normalize = (t: string) => {
      let out = t.trim()
      // Ensure sentence ends with a period or exclamation/question for natural pause
      if (!/[.!?]$/.test(out)) out = out + '.'
      // Small adjustments: replace double spaces
      out = out.replace(/\s{2,}/g, ' ')
      return out
    }

    utterance.text = normalize(text)

    // Add a small delay to ensure cancellation is complete and voices are ready
    setTimeout(() => {
      try {
        window.speechSynthesis.speak(utterance)
      } catch (err) {
        console.warn('Speech failed to play:', err)
      }
    }, 120)
  }

  // Expose available voices (runtime only). Returns array of {name, lang, voiceURI}
  static listVoices(): Array<{ name: string; lang?: string; voiceURI?: string }> {
    if (!this.isSupported()) return []
    const voices = window.speechSynthesis.getVoices()
    return voices.map(v => ({ name: v.name, lang: v.lang, voiceURI: v.voiceURI }))
  }

  // Set a preferred voice name/voiceURI to persist selection across sessions
  static setPreferredVoice(voiceIdentifier: string | null): void {
    if (typeof window === 'undefined' || !window.localStorage) return
    if (voiceIdentifier === null) {
      localStorage.removeItem('ttsPreferredVoice')
      console.debug('[AudioFeedback] Preferred TTS voice cleared')
    } else {
      localStorage.setItem('ttsPreferredVoice', voiceIdentifier)
      console.debug('[AudioFeedback] Preferred TTS voice set to', voiceIdentifier)
    }
  }

  static getPreferredVoice(): string | null {
    if (typeof window === 'undefined' || !window.localStorage) return null
    return localStorage.getItem('ttsPreferredVoice')
  }

  static playTimeUpWarning(): void {
    const messages = [
      "Maahira — time is running low, try your best now",
      "Quick, Maahira! A few seconds left — you can do it",
      "Focus Maahira, just a little bit more time remains",
      "Come on, Maahira — you're almost there, be quick",
      "Don't give up, Maahira — answer when you can",
      "Time's nearly up, Maahira — keep going",
      "Hurry, Maahira — show me what you know",
      "Quick thinking now, Maahira — you can solve this"
    ]
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    this.speak(randomMessage, { rate: 1.3, pitch: 1.2 })
  }

  static playCorrectAnswer(): void {
    const messages = [
      "Excellent, Maahira — that's right!",
      "Perfect! You got it — nice work",
      "Amazing job, Maahira — you're doing so well",
      "Yes, that's correct. Well done!",
      "Fantastic — you're a little math star",
      "Wonderful! Keep it up",
      "Outstanding — great thinking",
      "Brilliant answer — very clever",
      "Super job — you're improving every time",
      "Magnificent — you're getting so good"
    ]
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    this.speak(randomMessage, { rate: 1.1, pitch: 1.3 })
  }

  static playIncorrectAnswer(): void {
    const messages = [
      "That's okay, Maahira — let's try the next one",
      "Don't worry, you'll get the next question",
      "Good try — keep practicing and you'll improve",
      "It's alright — learning takes time",
      "No problem — you're doing really well",
      "Nice effort — next question is coming up",
      "Good try — let's keep going together",
      "Don't give up — every practice helps",
      "Nice try — the next one may be easier",
      "It's okay — mistakes help us learn"
    ]
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    this.speak(randomMessage, { rate: 1.0, pitch: 1.0 })
  }

  static playTimeUp(): void {
    const messages = [
      "Time's up, Maahira — but you can still answer if you'd like",
      "Oops, the time finished — take your time now",
      "Time's finished — you may still try the question",
      "That's the bell — answer when you're ready",
      "Time's up — and you're doing very well",
      "Clock stopped — give it a try if you wish"
    ]
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    this.speak(randomMessage, { rate: 1.0, pitch: 0.9 })
  }

  static playGameStart(): void {
    const messages = [
      "Hello Maahira — ready for some fun math?",
      "Hi Maahira! Let's solve a few problems together",
      "Welcome back — time for a little math magic",
      "Hey Maahira! Ready to show your math skills?"
    ]
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    this.speak(randomMessage, { rate: 1.0, pitch: 1.1 })
  }

  static playRewardEarned(): void {
    const messages = [
      "Wow — you earned a reward! Amazing work",
      "Congratulations! You got a special reward",
      "Fantastic! Here's a shiny reward card",
      "Incredible — you really deserved this",
      "Amazing job — your special prize awaits",
      "Outstanding — you earned a beautiful reward"
    ]
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    this.speak(randomMessage, { rate: 1.0, pitch: 1.4 })
  }
}