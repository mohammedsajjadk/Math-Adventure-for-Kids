# 🌟 Math Adventure - Interactive Learning for Kids 🌟

An engaging, colorful, and interactive math learning website designed specifically for young children (ages 4-8) with Anki-style flashcards, timer challenges, and a reward collection system.

## ✨ Features

### 🎮 Game Features
- **Timer-based Math Cards**: Customizable countdown timer for each question
- **Anki-style Learning**: Spaced repetition methodology for effective learning
- **Reward System**: Collect special gift cards after answering multiple questions correctly
- **Progress Tracking**: Visual progress bar showing advancement toward rewards
- **Kid-friendly Interface**: Colorful, animated, and engaging design

### 🛠️ Parent/Admin Controls
- **Card Management**: Add, edit, and delete math questions easily
- **Timer Configuration**: Adjust time limits per question
- **Reward Settings**: Configure how many correct answers are needed for rewards
- **Export/Import**: Save and share card collections
- **Difficulty Levels**: Easy, Medium, Hard question categories
- **Math Categories**: Addition, Subtraction, Multiplication, Division

### 🎨 Design Features
- **Colorful Animations**: Smooth transitions and celebrations
- **Responsive Design**: Works on tablets and computers
- **Sound Effects**: Audio feedback for engagement
- **Confetti Celebrations**: Reward animations when achievements are unlocked
- **Beautiful UI**: Kid-friendly color schemes and typography

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or Download the project**
   ```bash
   git clone <repository-url>
   cd maths-for-kids
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in your browser**
   - Navigate to `http://localhost:3000`
   - Game interface: `http://localhost:3000`
   - Admin panel: `http://localhost:3000/admin`

## 📚 How to Use

### For Kids (Main Game)
1. Click "🚀 Start Adventure!" to begin
2. Read the math question carefully
3. Click the correct answer before time runs out
4. Celebrate correct answers with fun animations!
5. Collect reward cards after answering multiple questions correctly
6. Work towards earning special gifts from parents!

### For Parents (Admin Panel)
1. Go to `/admin` to access the control panel
2. **Adjust Settings**:
   - Set timer duration (10-120 seconds)
   - Configure reward threshold (1-20 correct answers)
3. **Add New Cards**:
   - Enter math questions
   - Provide multiple choice answers
   - Set difficulty and category
4. **Manage Existing Cards**:
   - View all current questions
   - Delete unwanted cards
   - Export card collections

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom animations
- **Language**: TypeScript for type safety
- **Animations**: Framer Motion (planned)
- **Data Storage**: JSON files (no database required)
- **Hosting**: Static site generation for free deployment

## 🌐 Deployment

### Free Hosting Options

1. **Vercel** (Recommended)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   ```bash
   npm run build
   npm run export
   # Upload dist folder to Netlify
   ```

3. **GitHub Pages**
   ```bash
   npm run build
   npm run export
   # Upload to gh-pages branch
   ```

## 📁 Project Structure

```
maths-for-kids/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin panel for card management
│   │   ├── layout.tsx      # Root layout component
│   │   ├── page.tsx        # Main game interface
│   │   └── globals.css     # Global styles and animations
│   ├── components/
│   │   ├── GameCard.tsx    # Interactive math question card
│   │   ├── ProgressBar.tsx # Progress tracking component
│   │   ├── RewardCard.tsx  # Special reward display
│   │   └── Timer.tsx       # Countdown timer component
│   └── data/
│       └── cards.ts        # Math questions and answers
├── package.json
├── tailwind.config.ts      # Tailwind CSS configuration
└── README.md
```

## 🎯 Customization

### Adding Your Own Questions
1. Go to the admin panel at `/admin`
2. Fill in the "Add New Card" form:
   - **Question**: "What is 2 + 3?"
   - **Answer**: "5"
   - **Options**: ["3", "4", "5", "6"]
   - **Difficulty**: Easy/Medium/Hard
   - **Category**: Addition/Subtraction/etc.

### Customizing Rewards
- Adjust the reward threshold in admin settings
- Modify reward messages in `RewardCard.tsx`
- Add custom gift descriptions for your child

### Styling Changes
- Edit `globals.css` for color schemes
- Modify `tailwind.config.ts` for theme changes
- Update component styles in individual `.tsx` files

## 🎨 Color Theme

The website uses a cheerful, kid-friendly color palette:
- **Primary**: Purple and Pink gradients
- **Secondary**: Blue and Teal
- **Success**: Green shades
- **Warning**: Yellow and Orange
- **Background**: Soft blue to pink gradient

## 📱 Browser Support

- Chrome/Edge 80+
- Firefox 75+
- Safari 13+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a personal project for family use, but suggestions are welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for personal/educational use. Feel free to adapt it for your own children's learning!

## 💝 Made with Love

Created with ❤️ for young learners to make math fun and engaging!

---

**Happy Learning!** 🌟📚🎉