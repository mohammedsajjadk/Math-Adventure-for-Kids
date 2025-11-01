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
    utterance.rate = options.rate || 1.2
    utterance.pitch = options.pitch || 1.3 // Higher pitch for female voice
    utterance.volume = options.volume || 0.8
    
    // Try to select a female voice
    const voices = window.speechSynthesis.getVoices()
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('zira') ||
      voice.name.toLowerCase().includes('hazel') ||
      voice.name.toLowerCase().includes('samantha')
    )
    
    if (femaleVoice) {
      utterance.voice = femaleVoice
    }
    
    // Add a small delay to ensure cancellation is complete
    setTimeout(() => {
      window.speechSynthesis.speak(utterance)
    }, 100)
  }

  static playTimeUpWarning(): void {
    const messages = [
      "Maahira, time is running out! Hurry up!",
      "Quick Maahira, you can do this! Time's ticking!",
      "Maahira, focus! Just a few seconds left!",
      "Come on Maahira, you've got this! Be quick!",
      "Maahira, don't give up! Answer quickly!",
      "Time's almost up Maahira! You're so close!",
      "Hurry Maahira! Show me what you know!",
      "Quick thinking time Maahira! You can do it!"
    ]
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    this.speak(randomMessage, { rate: 1.3, pitch: 1.2 })
  }

  static playCorrectAnswer(): void {
    const messages = [
      "Excellent Maahira! You're so smart!",
      "Perfect! You got it right Maahira!",
      "Amazing work Maahira! You're brilliant!",
      "Yes! That's correct Maahira! Well done!",
      "Fantastic Maahira! You're a math superstar!",
      "Wonderful job Maahira! Keep it up!",
      "Outstanding Maahira! You're incredible!",
      "Brilliant answer Maahira! You rock!",
      "Super job Maahira! You're getting so good at this!",
      "Magnificent Maahira! You're a genius!"
    ]
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    this.speak(randomMessage, { rate: 1.1, pitch: 1.3 })
  }

  static playIncorrectAnswer(): void {
    const messages = [
      "That's okay Maahira! Let's try the next one!",
      "Don't worry Maahira, you'll get the next one!",
      "Good try Maahira! Keep practicing!",
      "It's alright Maahira, learning takes time!",
      "No problem Maahira! You're doing great!",
      "That's okay sweetie! Next question coming up!",
      "Good effort Maahira! Let's keep going!",
      "Don't give up Maahira! You're learning so much!",
      "Nice try Maahira! The next one will be easier!",
      "It's okay Maahira! Every mistake helps you learn!"
    ]
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    this.speak(randomMessage, { rate: 1.0, pitch: 1.0 })
  }

  static playTimeUp(): void {
    const messages = [
      "Time's up Maahira! But don't worry, you can still answer!",
      "Oops, time ran out Maahira! Take your time now!",
      "Time's finished Maahira! You can still try!",
      "That's time Maahira! No rush, just answer when ready!",
      "Time up Maahira! But you're doing so well!",
      "Clock stopped Maahira! You can still give it a try!"
    ]
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    this.speak(randomMessage, { rate: 1.0, pitch: 0.9 })
  }

  static playGameStart(): void {
    const messages = [
      "Hello Maahira! Ready to have some math fun?",
      "Hi there Maahira! Let's solve some problems together!",
      "Welcome back Maahira! Time for some math magic!",
      "Hey Maahira! Ready to show off your math skills?"
    ]
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    this.speak(randomMessage, { rate: 1.0, pitch: 1.1 })
  }

  static playRewardEarned(): void {
    const messages = [
      "Wow Maahira! You earned a reward! You're amazing!",
      "Congratulations Maahira! You got a special reward!",
      "Fantastic Maahira! You earned a shiny reward card!",
      "Incredible Maahira! You deserve this reward!",
      "Amazing job Maahira! Here's your special prize!",
      "Outstanding Maahira! You've earned a beautiful reward!"
    ]
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    this.speak(randomMessage, { rate: 1.0, pitch: 1.4 })
  }
}