export class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {}
  private enabled = false

  constructor() {
    // Initialize sounds (you can add actual sound files later)
    this.sounds = {
      correct: new Audio('/sounds/correct.mp3'),
      incorrect: new Audio('/sounds/try-again.mp3'),
      reward: new Audio('/sounds/celebration.mp3'),
      tick: new Audio('/sounds/tick.mp3')
    }
  }

  enable() {
    this.enabled = true
  }

  disable() {
    this.enabled = false
  }

  play(soundName: string) {
    if (!this.enabled) return
    
    const sound = this.sounds[soundName]
    if (sound) {
      sound.currentTime = 0
      sound.play().catch(() => {
        // Handle autoplay restrictions
        console.log('Sound autoplay blocked')
      })
    }
  }

  // Fun alternatives using Web Audio API for beeps
  playBeep(frequency: number = 800, duration: number = 200) {
    if (!this.enabled) return

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration / 1000)
    } catch (error) {
      console.log('Web Audio API not supported')
    }
  }

  playCorrectSound() {
    this.playBeep(800, 200)
    setTimeout(() => this.playBeep(1000, 300), 100)
  }

  playIncorrectSound() {
    this.playBeep(300, 500)
  }

  playCelebrationSound() {
    this.playBeep(600, 150)
    setTimeout(() => this.playBeep(800, 150), 100)
    setTimeout(() => this.playBeep(1000, 150), 200)
    setTimeout(() => this.playBeep(1200, 300), 300)
  }
}

export const soundManager = new SoundManager()