export const themes = {
  princess: {
    name: "Princess Theme",
    colors: {
      primary: "from-pink-400 to-purple-600",
      secondary: "from-purple-400 to-pink-500", 
      background: "from-pink-100 via-purple-50 to-blue-100",
      success: "from-green-400 to-emerald-500",
      reward: "from-yellow-300 to-pink-400"
    },
    emojis: {
      main: "👑",
      correct: "✨",
      reward: "🎁",
      timer: "⏰",
      celebration: "🎉"
    }
  },
  space: {
    name: "Space Adventure",
    colors: {
      primary: "from-blue-500 to-purple-700",
      secondary: "from-indigo-400 to-blue-600",
      background: "from-blue-900 via-purple-900 to-black",
      success: "from-green-400 to-blue-500",
      reward: "from-yellow-400 to-orange-500"
    },
    emojis: {
      main: "🚀",
      correct: "⭐",
      reward: "🏆",
      timer: "🛸",
      celebration: "🎆"
    }
  },
  unicorn: {
    name: "Unicorn Magic",
    colors: {
      primary: "from-pink-400 via-purple-400 to-indigo-500",
      secondary: "from-purple-300 to-pink-400",
      background: "from-pink-50 via-purple-50 to-indigo-50",
      success: "from-emerald-400 to-teal-500",
      reward: "from-yellow-300 via-pink-300 to-purple-400"
    },
    emojis: {
      main: "🦄",
      correct: "🌈",
      reward: "💎",
      timer: "✨",
      celebration: "🎊"
    }
  }
}

export const currentTheme = themes.princess // Change this to switch themes!