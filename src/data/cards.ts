export interface MathCard {
  id: number;
  question: string;
  answer: string;
  options?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'spelling';
  inputType?: 'multiple-choice' | 'text-input';
  audioScenario?: string; // Funny scenario read aloud instead of showing question
  hideVisualQuestion?: boolean; // Hide the question text when audioScenario is used
  acceptableAnswers?: string[]; // Alternative valid answers (e.g., "01" for "1")
}

export const mathCards: MathCard[] = [
  // ADDITION & SUBTRACTION - User requested set (text-input) with funny scenarios
  {
    id: 71, 
    question: "13 + 20 = ?", 
    answer: "33", 
    difficulty: "medium", 
    category: "addition", 
    inputType: "text-input",
    audioScenario: "Maahira found 13 magical unicorn stickers in her backpack! Then her brother Yoosuf gave her 20 more because he felt generous. How many sparkly unicorn stickers does Maahira have now?",
    hideVisualQuestion: true,
    acceptableAnswers: ["33", "thirty-three", "thirty three"]
  },
  { 
    id: 72, 
    question: "63 - 20 = ?", 
    answer: "43", 
    difficulty: "medium", 
    category: "subtraction", 
    inputType: "text-input",
    audioScenario: "Yoosuf had 63 gummy bears but he got too excited and ate 20 of them before dinner! Maryam counted how many were left. How many gummy bears survived Yoosuf's snack attack?",
    hideVisualQuestion: true,
    acceptableAnswers: ["43", "forty-three", "forty three"]
  },
  { 
    id: 73, 
    question: "41 + 40 = ?", 
    answer: "81", 
    difficulty: "medium", 
    category: "addition", 
    inputType: "text-input",
    audioScenario: "Ms. Deenihan brought 41 colorful pencils to class. Then Ahmed's mom donated 40 more pencils because she wanted to help! How many pencils does the class have now for their art project?",
    hideVisualQuestion: true,
    acceptableAnswers: ["81", "eighty-one", "eighty one"]
  },
  { 
    id: 74, 
    question: "81 - 40 = ?", 
    answer: "41", 
    difficulty: "medium", 
    category: "subtraction", 
    inputType: "text-input",
    audioScenario: "Haaniya collected 81 beautiful seashells at the beach. But then a sneaky seagull flew away with 40 of them! How many seashells does Haaniya still have?",
    hideVisualQuestion: true,
    acceptableAnswers: ["41", "forty-one", "forty one"]
  },

  { 
    id: 75, 
    question: "24 + 30 = ?", 
    answer: "54", 
    difficulty: "medium", 
    category: "addition", 
    inputType: "text-input",
    audioScenario: "Sajjad bought 24 delicious cookies from the bakery. Then Farheen surprised everyone with 30 more homemade cookies! How many cookies does the family have for their tea party?",
    hideVisualQuestion: true,
    acceptableAnswers: ["54", "fifty-four", "fifty four"]
  },
  { 
    id: 76, 
    question: "74 - 30 = ?", 
    answer: "44", 
    difficulty: "medium", 
    category: "subtraction", 
    inputType: "text-input",
    audioScenario: "Yousuf Huda was playing with 74 bouncy balls in the playground! But 30 balls rolled away down the hill when he wasn't looking. How many bouncy balls does he have left to play with?",
    hideVisualQuestion: true,
    acceptableAnswers: ["44", "forty-four", "forty four"]
  },
  { 
    id: 77, 
    question: "18 + 50 = ?", 
    answer: "68", 
    difficulty: "medium", 
    category: "addition", 
    inputType: "text-input",
    audioScenario: "Maryam had 18 toy dinosaurs in her collection. Then her cousin gave her 50 more dinosaurs because she loves them so much! How many roaring dinosaurs does Maryam have now?",
    hideVisualQuestion: true,
    acceptableAnswers: ["68", "sixty-eight", "sixty eight"]
  },
  { 
    id: 78, 
    question: "88 - 50 = ?", 
    answer: "38", 
    difficulty: "medium", 
    category: "subtraction", 
    inputType: "text-input",
    audioScenario: "Ahmed collected 88 bottle caps for his science project. But he used 50 of them to build a super cool robot! How many bottle caps does Ahmed still have?",
    hideVisualQuestion: true,
    acceptableAnswers: ["38", "thirty-eight", "thirty eight"]
  },

  { id: 79, question: "31 + 40 = ?", answer: "71", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 80, question: "81 - 40 = ?", answer: "41", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 81, question: "26 + 60 = ?", answer: "86", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 82, question: "96 - 60 = ?", answer: "36", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 83, question: "42 + 50 = ?", answer: "92", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 84, question: "92 - 50 = ?", answer: "42", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 85, question: "34 + 70 = ?", answer: "104", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 86, question: "94 - 70 = ?", answer: "24", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 87, question: "17 + 60 = ?", answer: "77", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 88, question: "97 - 60 = ?", answer: "37", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 89, question: "43 + 80 = ?", answer: "123", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 90, question: "93 - 80 = ?", answer: "13", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 91, question: "29 + 70 = ?", answer: "99", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 92, question: "89 - 70 = ?", answer: "19", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 93, question: "57 + 90 = ?", answer: "147", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 94, question: "90 - 87 = ?", answer: "3", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 95, question: "36 + 80 = ?", answer: "116", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 96, question: "96 - 80 = ?", answer: "16", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 97, question: "21 + 20 = ?", answer: "41", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 98, question: "71 - 20 = ?", answer: "51", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 99, question: "45 + 90 = ?", answer: "135", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 100, question: "95 - 90 = ?", answer: "5", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 101, question: "32 + 30 = ?", answer: "62", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 102, question: "82 - 30 = ?", answer: "52", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 103, question: "22 + 10 = ?", answer: "32", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 104, question: "72 - 10 = ?", answer: "62", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 105, question: "44 + 40 = ?", answer: "84", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 106, question: "84 - 40 = ?", answer: "44", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 107, question: "53 + 20 = ?", answer: "73", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 108, question: "63 - 20 = ?", answer: "43", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 109, question: "55 + 50 = ?", answer: "105", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 110, question: "95 - 50 = ?", answer: "45", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 111, question: "19 + 30 = ?", answer: "49", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 112, question: "79 - 30 = ?", answer: "49", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 113, question: "63 + 60 = ?", answer: "123", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 114, question: "83 - 60 = ?", answer: "23", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 115, question: "27 + 40 = ?", answer: "67", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 116, question: "87 - 40 = ?", answer: "47", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 117, question: "72 + 70 = ?", answer: "142", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 118, question: "92 - 70 = ?", answer: "22", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 119, question: "38 + 50 = ?", answer: "88", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 120, question: "98 - 50 = ?", answer: "48", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 121, question: "14 + 80 = ?", answer: "94", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 122, question: "94 - 80 = ?", answer: "14", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 123, question: "46 + 60 = ?", answer: "106", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 124, question: "86 - 60 = ?", answer: "26", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 125, question: "28 + 90 = ?", answer: "118", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 126, question: "78 - 90 = ?", answer: "-12", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 127, question: "52 + 70 = ?", answer: "122", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 128, question: "92 - 70 = ?", answer: "22", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 129, question: "37 + 20 = ?", answer: "57", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 130, question: "77 - 20 = ?", answer: "57", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 131, question: "64 + 80 = ?", answer: "144", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 132, question: "94 - 80 = ?", answer: "14", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 133, question: "49 + 30 = ?", answer: "79", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 134, question: "89 - 30 = ?", answer: "59", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 135, question: "11 + 90 = ?", answer: "101", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 136, question: "91 - 90 = ?", answer: "1", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 137, question: "51 + 40 = ?", answer: "91", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 138, question: "81 - 40 = ?", answer: "41", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 139, question: "25 + 20 = ?", answer: "45", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 140, question: "75 - 20 = ?", answer: "55", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 141, question: "62 + 50 = ?", answer: "112", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 142, question: "82 - 50 = ?", answer: "32", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 143, question: "33 + 30 = ?", answer: "63", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 144, question: "73 - 30 = ?", answer: "43", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 145, question: "16 + 60 = ?", answer: "76", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 146, question: "86 - 60 = ?", answer: "26", difficulty: "medium", category: "subtraction", inputType: "text-input" },

  { id: 147, question: "35 + 80 = ?", answer: "115", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 148, question: "95 - 80 = ?", answer: "15", difficulty: "medium", category: "subtraction", inputType: "text-input" },
  { id: 149, question: "23 + 70 = ?", answer: "93", difficulty: "medium", category: "addition", inputType: "text-input" },
  { id: 150, question: "93 - 70 = ?", answer: "23", difficulty: "medium", category: "subtraction", inputType: "text-input" }
  ,
  // SEQUENTIAL MULTIPLICATION TABLES: 2x, 3x, 4x, 5x (text-input)
  { id: 151, question: "2 × 1 = ?", answer: "2", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 152, question: "2 × 2 = ?", answer: "4", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 153, question: "2 × 3 = ?", answer: "6", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 154, question: "2 × 4 = ?", answer: "8", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 155, question: "2 × 5 = ?", answer: "10", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 156, question: "2 × 6 = ?", answer: "12", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 157, question: "2 × 7 = ?", answer: "14", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 158, question: "2 × 8 = ?", answer: "16", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 159, question: "2 × 9 = ?", answer: "18", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 160, question: "2 × 10 = ?", answer: "20", difficulty: "easy", category: "multiplication", inputType: "text-input" },

  { id: 161, question: "3 × 1 = ?", answer: "3", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 162, question: "3 × 2 = ?", answer: "6", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 163, question: "3 × 3 = ?", answer: "9", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 164, question: "3 × 4 = ?", answer: "12", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 165, question: "3 × 5 = ?", answer: "15", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 166, question: "3 × 6 = ?", answer: "18", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 167, question: "3 × 7 = ?", answer: "21", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 168, question: "3 × 8 = ?", answer: "24", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 169, question: "3 × 9 = ?", answer: "27", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 170, question: "3 × 10 = ?", answer: "30", difficulty: "easy", category: "multiplication", inputType: "text-input" },

  { id: 171, question: "4 × 1 = ?", answer: "4", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 172, question: "4 × 2 = ?", answer: "8", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 173, question: "4 × 3 = ?", answer: "12", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 174, question: "4 × 4 = ?", answer: "16", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 175, question: "4 × 5 = ?", answer: "20", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 176, question: "4 × 6 = ?", answer: "24", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 177, question: "4 × 7 = ?", answer: "28", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 178, question: "4 × 8 = ?", answer: "32", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 179, question: "4 × 9 = ?", answer: "36", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 180, question: "4 × 10 = ?", answer: "40", difficulty: "easy", category: "multiplication", inputType: "text-input" },

  { id: 181, question: "5 × 1 = ?", answer: "5", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 182, question: "5 × 2 = ?", answer: "10", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 183, question: "5 × 3 = ?", answer: "15", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 184, question: "5 × 4 = ?", answer: "20", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 185, question: "5 × 5 = ?", answer: "25", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 186, question: "5 × 6 = ?", answer: "30", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 187, question: "5 × 7 = ?", answer: "35", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 188, question: "5 × 8 = ?", answer: "40", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 189, question: "5 × 9 = ?", answer: "45", difficulty: "easy", category: "multiplication", inputType: "text-input" },
  { id: 190, question: "5 × 10 = ?", answer: "50", difficulty: "easy", category: "multiplication", inputType: "text-input" }
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
