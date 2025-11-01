export interface MathCard {
  id: number;
  question: string;
  answer: string;
  options?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'spelling';
  inputType?: 'multiple-choice' | 'text-input';
}

export const mathCards: MathCard[] = [
  {
    id: 1,
    question: "2 + 3 = ?",
    answer: "5",
    options: ["3", "4", "5", "6"],
    difficulty: "easy",
    category: "addition"
  },
  {
    id: 2,
    question: "5 - 2 = ?",
    answer: "3",
    options: ["1", "2", "3", "4"],
    difficulty: "easy",
    category: "subtraction"
  },
  {
    id: 3,
    question: "4 + 4 = ?",
    answer: "8",
    options: ["6", "7", "8", "9"],
    difficulty: "easy",
    category: "addition"
  },
  {
    id: 4,
    question: "10 - 3 = ?",
    answer: "7",
    options: ["5", "6", "7", "8"],
    difficulty: "easy",
    category: "subtraction"
  },
  {
    id: 5,
    question: "3 + 5 = ?",
    answer: "8",
    options: ["6", "7", "8", "9"],
    difficulty: "easy",
    category: "addition"
  },
  {
    id: 6,
    question: "9 - 4 = ?",
    answer: "5",
    options: ["3", "4", "5", "6"],
    difficulty: "easy",
    category: "subtraction"
  },
  {
    id: 7,
    question: "6 + 2 = ?",
    answer: "8",
    options: ["6", "7", "8", "9"],
    difficulty: "easy",
    category: "addition"
  },
  {
    id: 8,
    question: "8 - 3 = ?",
    answer: "5",
    options: ["3", "4", "5", "6"],
    difficulty: "easy",
    category: "subtraction"
  },
  {
    id: 9,
    question: "1 + 7 = ?",
    answer: "8",
    options: ["6", "7", "8", "9"],
    difficulty: "easy",
    category: "addition"
  },
  {
    id: 10,
    question: "7 - 2 = ?",
    answer: "5",
    options: ["3", "4", "5", "6"],
    difficulty: "easy",
    category: "subtraction"
  },
  {
    id: 11,
    question: "🐱 3 cats + 🐱 2 cats = ?",
    answer: "5",
    options: ["4", "5", "6", "7"],
    difficulty: "easy",
    category: "addition"
  },
  {
    id: 12,
    question: "🍎 6 apples - 🍎 1 apple = ?",
    answer: "5",
    options: ["4", "5", "6", "7"],
    difficulty: "easy",
    category: "subtraction"
  },
  {
    id: 13,
    question: "🌟 4 stars + 🌟 3 stars = ?",
    answer: "7",
    options: ["6", "7", "8", "9"],
    difficulty: "easy",
    category: "addition"
  },
  {
    id: 14,
    question: "🚗 8 cars - 🚗 3 cars = ?",
    answer: "5",
    options: ["4", "5", "6", "7"],
    difficulty: "easy",
    category: "subtraction"
  },
  
  // MULTIPLICATION - Easy (2x, 5x, 10x tables)
  {
    id: 15,
    question: "2 × 3 = ?",
    answer: "6",
    options: ["5", "6", "7", "8"],
    difficulty: "easy",
    category: "multiplication"
  },
  {
    id: 16,
    question: "5 × 2 = ?",
    answer: "10",
    options: ["8", "9", "10", "11"],
    difficulty: "easy",
    category: "multiplication"
  },
  {
    id: 17,
    question: "🍕 2 pizzas × 4 slices each = ? slices",
    answer: "8",
    options: ["6", "7", "8", "9"],
    difficulty: "easy",
    category: "multiplication"
  },
  {
    id: 18,
    question: "10 × 3 = ?",
    answer: "30",
    options: ["20", "25", "30", "35"],
    difficulty: "easy",
    category: "multiplication"
  },
  {
    id: 19,
    question: "🌟 3 groups × 5 stars each = ? stars",
    answer: "15",
    options: ["12", "15", "18", "20"],
    difficulty: "easy",
    category: "multiplication"
  },
  
  // MULTIPLICATION - Medium (3x, 4x, 6x tables)
  {
    id: 20,
    question: "3 × 4 = ?",
    answer: "12",
    options: ["10", "11", "12", "13"],
    difficulty: "medium",
    category: "multiplication"
  },
  {
    id: 21,
    question: "6 × 3 = ?",
    answer: "18",
    options: ["15", "16", "18", "20"],
    difficulty: "medium",
    category: "multiplication"
  },
  {
    id: 22,
    question: "4 × 5 = ?",
    answer: "20",
    options: ["18", "19", "20", "21"],
    difficulty: "medium",
    category: "multiplication"
  },
  {
    id: 23,
    question: "🎈 7 × 2 = ? balloons",
    answer: "14",
    options: ["12", "13", "14", "15"],
    difficulty: "medium",
    category: "multiplication"
  },
  
  // DIVISION - Easy (sharing equally)
  {
    id: 24,
    question: "8 ÷ 2 = ?",
    answer: "4",
    options: ["3", "4", "5", "6"],
    difficulty: "easy",
    category: "division"
  },
  {
    id: 25,
    question: "10 ÷ 5 = ?",
    answer: "2",
    options: ["1", "2", "3", "4"],
    difficulty: "easy",
    category: "division"
  },
  {
    id: 26,
    question: "🍪 12 cookies ÷ 3 kids = ? each",
    answer: "4",
    options: ["3", "4", "5", "6"],
    difficulty: "easy",
    category: "division"
  },
  {
    id: 27,
    question: "6 ÷ 3 = ?",
    answer: "2",
    options: ["1", "2", "3", "4"],
    difficulty: "easy",
    category: "division"
  },
  {
    id: 28,
    question: "🎁 15 gifts ÷ 5 people = ? each",
    answer: "3",
    options: ["2", "3", "4", "5"],
    difficulty: "easy",
    category: "division"
  },
  
  // DIVISION - Medium
  {
    id: 29,
    question: "18 ÷ 6 = ?",
    answer: "3",
    options: ["2", "3", "4", "5"],
    difficulty: "medium",
    category: "division"
  },
  {
    id: 30,
    question: "24 ÷ 4 = ?",
    answer: "6",
    options: ["5", "6", "7", "8"],
    difficulty: "medium",
    category: "division"
  },
  {
    id: 31,
    question: "🍎 21 apples ÷ 7 baskets = ? each",
    answer: "3",
    options: ["2", "3", "4", "5"],
    difficulty: "medium",
    category: "division"
  },
  
  // MIXED OPERATIONS - Medium/Hard
  {
    id: 32,
    question: "5 + 3 × 2 = ? (multiply first!)",
    answer: "11",
    options: ["10", "11", "13", "16"],
    difficulty: "hard",
    category: "multiplication"
  },
  {
    id: 33,
    question: "20 - 10 ÷ 2 = ?",
    answer: "15",
    options: ["5", "10", "15", "18"],
    difficulty: "hard",
    category: "division"
  },
  
  // LARGER NUMBERS - Progressive difficulty
  {
    id: 34,
    question: "25 + 15 = ?",
    answer: "40",
    options: ["35", "40", "45", "50"],
    difficulty: "medium",
    category: "addition"
  },
  {
    id: 35,
    question: "50 - 20 = ?",
    answer: "30",
    options: ["25", "30", "35", "40"],
    difficulty: "medium",
    category: "subtraction"
  },
  {
    id: 36,
    question: "8 × 5 = ?",
    answer: "40",
    options: ["35", "40", "45", "50"],
    difficulty: "medium",
    category: "multiplication"
  },
  {
    id: 37,
    question: "36 ÷ 6 = ?",
    answer: "6",
    options: ["5", "6", "7", "8"],
    difficulty: "medium",
    category: "division"
  },
  
  // WORD PROBLEMS - Real world applications
  {
    id: 38,
    question: "👑 If Princess has 3 tiaras and gets 4 more, how many does she have?",
    answer: "7",
    options: ["6", "7", "8", "9"],
    difficulty: "easy",
    category: "addition"
  },
  {
    id: 39,
    question: "🧸 There are 12 teddy bears. If 4 go to sleep, how many are awake?",
    answer: "8",
    options: ["6", "7", "8", "9"],
    difficulty: "easy",
    category: "subtraction"
  },
  {
    id: 40,
    question: "🎂 Birthday cake has 6 rows with 4 candles each. How many candles total?",
    answer: "24",
    options: ["20", "22", "24", "26"],
    difficulty: "medium",
    category: "multiplication"
  },
  
  // FRACTIONS - Simple introduction
  {
    id: 41,
    question: "🍕 Half of 8 pizza slices = ?",
    answer: "4",
    options: ["3", "4", "5", "6"],
    difficulty: "medium",
    category: "division"
  },
  {
    id: 42,
    question: "🍰 1/4 of 12 cupcakes = ?",
    answer: "3",
    options: ["2", "3", "4", "6"],
    difficulty: "hard",
    category: "division"
  },
  
  // SKIP COUNTING - Pattern recognition
  {
    id: 43,
    question: "Count by 2s: 2, 4, 6, 8, __?",
    answer: "10",
    options: ["9", "10", "11", "12"],
    difficulty: "easy",
    category: "addition"
  },
  {
    id: 44,
    question: "Count by 5s: 5, 10, 15, 20, __?",
    answer: "25",
    options: ["22", "23", "25", "30"],
    difficulty: "easy",
    category: "addition"
  },
  {
    id: 45,
    question: "Count by 10s: 10, 20, 30, __?",
    answer: "40",
    options: ["35", "40", "45", "50"],
    difficulty: "easy",
    category: "addition"
  },
  
  // TEXT INPUT CARDS - No multiple choice options
  {
    id: 46,
    question: "3 + 4 = ?",
    answer: "7",
    difficulty: "easy",
    category: "addition",
    inputType: "text-input"
  },
  {
    id: 47,
    question: "9 - 5 = ?",
    answer: "4",
    difficulty: "easy",
    category: "subtraction",
    inputType: "text-input"
  },
  {
    id: 48,
    question: "6 × 7 = ?",
    answer: "42",
    difficulty: "medium",
    category: "multiplication",
    inputType: "text-input"
  },
  {
    id: 49,
    question: "15 ÷ 3 = ?",
    answer: "5",
    difficulty: "medium",
    category: "division",
    inputType: "text-input"
  },
  {
    id: 50,
    question: "What is 8 + 6?",
    answer: "14",
    difficulty: "easy",
    category: "addition",
    inputType: "text-input"
  }
];

// SPELLING CARDS: 1 -> One, 2 -> Two, ... 20 -> Twenty
const spellingCards: MathCard[] = [
  { id: 51, question: 'Spell the number 1', answer: 'One', difficulty: 'easy', category: 'spelling', inputType: 'text-input' },
  { id: 52, question: 'Spell the number 2', answer: 'Two', difficulty: 'easy', category: 'spelling', inputType: 'text-input' },
  { id: 53, question: 'Spell the number 3', answer: 'Three', difficulty: 'easy', category: 'spelling', inputType: 'text-input' },
  { id: 54, question: 'Spell the number 4', answer: 'Four', difficulty: 'easy', category: 'spelling', inputType: 'text-input' },
  { id: 55, question: 'Spell the number 5', answer: 'Five', difficulty: 'easy', category: 'spelling', inputType: 'text-input' },
  { id: 56, question: 'Spell the number 6', answer: 'Six', difficulty: 'easy', category: 'spelling', inputType: 'text-input' },
  { id: 57, question: 'Spell the number 7', answer: 'Seven', difficulty: 'easy', category: 'spelling', inputType: 'text-input' },
  { id: 58, question: 'Spell the number 8', answer: 'Eight', difficulty: 'easy', category: 'spelling', inputType: 'text-input' },
  { id: 59, question: 'Spell the number 9', answer: 'Nine', difficulty: 'easy', category: 'spelling', inputType: 'text-input' },
  { id: 60, question: 'Spell the number 10', answer: 'Ten', difficulty: 'easy', category: 'spelling', inputType: 'text-input' },
  { id: 61, question: 'Spell the number 11', answer: 'Eleven', difficulty: 'medium', category: 'spelling', inputType: 'text-input' },
  { id: 62, question: 'Spell the number 12', answer: 'Twelve', difficulty: 'medium', category: 'spelling', inputType: 'text-input' },
  { id: 63, question: 'Spell the number 13', answer: 'Thirteen', difficulty: 'hard', category: 'spelling', inputType: 'text-input' },
  { id: 64, question: 'Spell the number 14', answer: 'Fourteen', difficulty: 'medium', category: 'spelling', inputType: 'text-input' },
  { id: 65, question: 'Spell the number 15', answer: 'Fifteen', difficulty: 'hard', category: 'spelling', inputType: 'text-input' },
  { id: 66, question: 'Spell the number 16', answer: 'Sixteen', difficulty: 'hard', category: 'spelling', inputType: 'text-input' },
  { id: 67, question: 'Spell the number 17', answer: 'Seventeen', difficulty: 'hard', category: 'spelling', inputType: 'text-input' },
  { id: 68, question: 'Spell the number 18', answer: 'Eighteen', difficulty: 'hard', category: 'spelling', inputType: 'text-input' },
  { id: 69, question: 'Spell the number 19', answer: 'Nineteen', difficulty: 'hard', category: 'spelling', inputType: 'text-input' },
  { id: 70, question: 'Spell the number 20', answer: 'Twenty', difficulty: 'hard', category: 'spelling', inputType: 'text-input' }
]

// Merge spelling cards into exported mathCards
export const allMathCards = [...mathCards, ...spellingCards]
