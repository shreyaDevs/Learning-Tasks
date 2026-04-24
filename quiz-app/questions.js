const quizData = [
  {
    id: 1,
    points: 5,
    questionText: "Which is the capital city of Australia?",
    options: [
      { id: "a", text: "Sydney", isCorrect: false },
      { id: "b", text: "Melbourne", isCorrect: false },
      { id: "c", text: "Canberra", isCorrect: true },
      { id: "d", text: "Perth", isCorrect: false }
    ],
    explanation: {
      text: "Canberra was selected as a compromise between Sydney and Melbourne.",
      show: true
    }
  },
  {
    id: 2,
    points: 5,
    questionText: "Who is known as the Father of the Nation in India?",
    options: [
      { id: "a", text: "Jawaharlal Nehru", isCorrect: false },
      { id: "b", text: "Subhas Chandra Bose", isCorrect: false },
      { id: "c", text: "Mahatma Gandhi", isCorrect: true },
      { id: "d", text: "Sardar Patel", isCorrect: false }
    ],
    explanation: {
      text: "Mahatma Gandhi led India's independence movement through non-violence.",
      show: true
    }
  },
  {
    id: 3,
    points: 5,
    questionText: "Which planet is known as the Red Planet?",
    options: [
      { id: "a", text: "Earth", isCorrect: false },
      { id: "b", text: "Mars", isCorrect: true },
      { id: "c", text: "Jupiter", isCorrect: false },
      { id: "d", text: "Venus", isCorrect: false }
    ],
    explanation: {
      text: "Mars appears red due to iron oxide (rust) on its surface.",
      show: true
    }
  },
  {
    id: 4,
    points: 5,
    questionText: "Which is the largest ocean on Earth?",
    options: [
      { id: "a", text: "Atlantic Ocean", isCorrect: false },
      { id: "b", text: "Indian Ocean", isCorrect: false },
      { id: "c", text: "Pacific Ocean", isCorrect: true },
      { id: "d", text: "Arctic Ocean", isCorrect: false }
    ],
    explanation: {
      text: "The Pacific Ocean is the largest and deepest ocean on Earth.",
      show: true
    }
  },
  {
    id: 5,
    points: 5,
    questionText: "Who invented the telephone?",
    options: [
      { id: "a", text: "Thomas Edison", isCorrect: false },
      { id: "b", text: "Alexander Graham Bell", isCorrect: true },
      { id: "c", text: "Nikola Tesla", isCorrect: false },
      { id: "d", text: "James Watt", isCorrect: false }
    ],
    explanation: {
      text: "Alexander Graham Bell patented the telephone in 1876.",
      show: true
    }
  },
  {
    id: 6,
    points: 5,
    questionText: "Which country hosted the FIFA World Cup 2022?",
    options: [
      { id: "a", text: "Russia", isCorrect: false },
      { id: "b", text: "Brazil", isCorrect: false },
      { id: "c", text: "Qatar", isCorrect: true },
      { id: "d", text: "France", isCorrect: false }
    ],
    explanation: {
      text: "Qatar became the first Middle Eastern country to host the FIFA World Cup.",
      show: true
    }
  },
  {
    id: 7,
    points: 5,
    questionText: "What is the national animal of India?",
    options: [
      { id: "a", text: "Lion", isCorrect: false },
      { id: "b", text: "Elephant", isCorrect: false },
      { id: "c", text: "Tiger", isCorrect: true },
      { id: "d", text: "Leopard", isCorrect: false }
    ],
    explanation: {
      text: "The Bengal Tiger represents strength and power and is India's national animal.",
      show: true
    }
  },
  {
    id: 8,
    points: 5,
    questionText: "Which is the smallest continent?",
    options: [
      { id: "a", text: "Europe", isCorrect: false },
      { id: "b", text: "Australia", isCorrect: true },
      { id: "c", text: "Antarctica", isCorrect: false },
      { id: "d", text: "South America", isCorrect: false }
    ],
    explanation: {
      text: "Australia is the smallest continent by land area.",
      show: true
    }
  },
  {
    id: 9,
    points: 5,
    questionText: "Who wrote the national anthem of India?",
    options: [
      { id: "a", text: "Rabindranath Tagore", isCorrect: true },
      { id: "b", text: "Bankim Chandra Chatterjee", isCorrect: false },
      { id: "c", text: "Sarojini Naidu", isCorrect: false },
      { id: "d", text: "Premchand", isCorrect: false }
    ],
    explanation: {
      text: "Rabindranath Tagore composed 'Jana Gana Mana', India's national anthem.",
      show: true
    }
  },
  {
    id: 10,
    points: 5,
    questionText: "Which gas do plants absorb from the atmosphere?",
    options: [
      { id: "a", text: "Oxygen", isCorrect: false },
      { id: "b", text: "Nitrogen", isCorrect: false },
      { id: "c", text: "Carbon Dioxide", isCorrect: true },
      { id: "d", text: "Hydrogen", isCorrect: false }
    ],
    explanation: {
      text: "Plants absorb carbon dioxide for photosynthesis.",
      show: true
    }
  }
];