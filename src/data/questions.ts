import { Question } from '../types';

export const DEMO_QUESTIONS: Question[] = [
  {
    id: 'q1',
    question: 'Solve for x: 3x - 7 = 14',
    options: [
      { id: 'a', text: 'x = 5' },
      { id: 'b', text: 'x = 7' },
      { id: 'c', text: 'x = 8' },
      { id: 'd', text: 'x = 9' }
    ],
    correctAnswer: 'b',
    topic: 'Algebra',
    concept: 'Linear Equations',
    difficulty: 'Beginner',
    type: 'MCQ',
    explanation: 'Add 7 to both sides: 3x = 21. Divide both sides by 3: x = 7.',
    misconceptionMap: {
      'a': 'Subtracted 7 instead of adding 7 to the right side (3x = 7)',
      'c': 'Arithmetic error in division',
      'd': 'Miscalculated 21 / 3'
    }
  },
  {
    id: 'q2',
    question: 'Solve the multi-step linear equation: 4(x + 2) = 2x + 16',
    options: [
      { id: 'a', text: 'x = 2' },
      { id: 'b', text: 'x = 3' },
      { id: 'c', text: 'x = 4' },
      { id: 'd', text: 'x = 6' }
    ],
    correctAnswer: 'c',
    topic: 'Algebra',
    concept: 'Linear Equations',
    difficulty: 'Medium',
    type: 'MCQ',
    explanation: 'Distribute 4: 4x + 8 = 2x + 16. Subtract 2x: 2x + 8 = 16. Subtract 8: 2x = 8. Divide by 2: x = 4.',
    misconceptionMap: {
      'a': 'Forgot to distribute 4 to the +2 constant',
      'b': 'Sign error when isolating variables on one side',
      'd': 'Added 8 to right side instead of subtracting'
    }
  },
  {
    id: 'q3',
    question: 'Given f(x) = 2x² - 3x + 1, find f(3).',
    options: [
      { id: 'a', text: '8' },
      { id: 'b', text: '10' },
      { id: 'c', text: '16' },
      { id: 'd', text: '19' }
    ],
    correctAnswer: 'b',
    topic: 'Algebra',
    concept: 'Functions',
    difficulty: 'Beginner',
    type: 'MCQ',
    explanation: 'Evaluate f(3): 2(3)² - 3(3) + 1 = 2(9) - 9 + 1 = 18 - 9 + 1 = 10.',
    misconceptionMap: {
      'a': 'Calculated 2(3) squared as (6)² = 36 or subtraction error',
      'c': 'Added instead of subtracted 3(3)',
      'd': 'Ignored negative sign on -3x'
    }
  },
  {
    id: 'q4',
    question: 'If f(x) = 3x - 1 and g(x) = x + 4, what is the composite function f(g(2))?',
    options: [
      { id: 'a', text: '15' },
      { id: 'b', text: '17' },
      { id: 'c', text: '19' },
      { id: 'd', text: '21' }
    ],
    correctAnswer: 'b',
    topic: 'Algebra',
    concept: 'Functions',
    difficulty: 'Medium',
    type: 'MCQ',
    explanation: 'First compute inner function g(2) = 2 + 4 = 6. Then evaluate f(6) = 3(6) - 1 = 18 - 1 = 17.',
    misconceptionMap: {
      'a': 'Computed g(f(2)) instead of f(g(2))',
      'c': 'Added 1 instead of subtracting 1: 18 + 1 = 19',
      'd': 'Multiplied 3 * 2 * 4'
    }
  },
  {
    id: 'q5',
    question: 'Find the domain of the rational function f(x) = (2x + 1) / (x - 5).',
    options: [
      { id: 'a', text: 'All real numbers except x = 0' },
      { id: 'b', text: 'All real numbers except x = 5' },
      { id: 'c', text: 'All real numbers except x = -5' },
      { id: 'd', text: 'All real numbers x ≥ 5' }
    ],
    correctAnswer: 'b',
    topic: 'Algebra',
    concept: 'Functions',
    difficulty: 'Medium',
    type: 'MCQ',
    explanation: 'The denominator cannot equal zero: x - 5 ≠ 0, therefore x ≠ 5. Domain is all real numbers except x = 5.',
    misconceptionMap: {
      'a': 'Confused zero of function with denominator restriction',
      'c': 'Sign error in setting denominator equal to 0 (thought x + 5 = 0)',
      'd': 'Confused radical domain rule with rational domain rule'
    }
  },
  {
    id: 'q6',
    question: 'Solve by factoring: x² - 5x + 6 = 0',
    options: [
      { id: 'a', text: 'x = -2, -3' },
      { id: 'b', text: 'x = 2, 3' },
      { id: 'c', text: 'x = 1, 6' },
      { id: 'd', text: 'x = -1, 6' }
    ],
    correctAnswer: 'b',
    topic: 'Algebra',
    concept: 'Quadratic Equations',
    subconcept: 'Factorization',
    difficulty: 'Beginner',
    type: 'MCQ',
    explanation: 'The equation factors into (x - 2)(x - 3) = 0. Setting each factor to 0 gives x = 2 or x = 3.',
    misconceptionMap: {
      'a': 'Did not invert signs when solving (x - 2)=0 and (x - 3)=0',
      'c': 'Used factors of 6 (1, 6) without checking the middle coefficient sum -5',
      'd': 'Factored with wrong signs for product +6'
    }
  },
  {
    id: 'q7',
    question: 'Solve using the Quadratic Formula: 2x² - 7x + 3 = 0. What are the roots?',
    options: [
      { id: 'a', text: 'x = 3, x = 1/2' },
      { id: 'b', text: 'x = -3, x = -1/2' },
      { id: 'c', text: 'x = 3, x = -1/2' },
      { id: 'd', text: 'x = 7/4 ± √25 / 4' }
    ],
    correctAnswer: 'a',
    topic: 'Algebra',
    concept: 'Quadratic Equations',
    subconcept: 'Quadratic Formula Application',
    difficulty: 'Medium',
    type: 'MCQ',
    explanation: 'Using x = (-b ± √(b² - 4ac)) / (2a): a=2, b=-7, c=3. -b = -(-7) = 7. b² - 4ac = 49 - 24 = 25. x = (7 ± 5) / 4. Roots are 12/4 = 3 and 2/4 = 1/2.',
    misconceptionMap: {
      'b': 'Negative sign error: substituted -7 directly into numerator instead of -(-7) = +7',
      'c': 'Sign error during branch calculation of the minus term',
      'd': 'Incomplete simplification of discriminant'
    }
  },
  {
    id: 'q8',
    question: 'A ball is launched from ground level with height h(t) = -5t² + 20t meters. At what time t (t > 0) does the ball hit the ground again?',
    options: [
      { id: 'a', text: 't = 2 seconds' },
      { id: 'b', text: 't = 4 seconds' },
      { id: 'c', text: 't = 5 seconds' },
      { id: 'd', text: 't = 10 seconds' }
    ],
    correctAnswer: 'b',
    topic: 'Algebra',
    concept: 'Quadratic Equations',
    subconcept: 'Quadratic Modeling & Application',
    difficulty: 'Hard',
    type: 'MCQ',
    explanation: 'Set h(t) = 0: -5t² + 20t = 0. Factor out -5t: -5t(t - 4) = 0. Roots are t = 0 (launch) and t = 4 seconds (impact).',
    misconceptionMap: {
      'a': 'Found the vertex peak time (-b / 2a = -20 / -10 = 2s) instead of ground impact',
      'c': 'Divided 20 by 4 or made an arithmetic cancellation error',
      'd': 'Confused formula coefficients'
    }
  },
  {
    id: 'q9',
    question: 'Find the discriminant of 3x² + 4x + 2 = 0 and determine the nature of its roots.',
    options: [
      { id: 'a', text: 'Discriminant = 40 (two distinct real roots)' },
      { id: 'b', text: 'Discriminant = -8 (two complex/imaginary roots)' },
      { id: 'c', text: 'Discriminant = 0 (one repeated real root)' },
      { id: 'd', text: 'Discriminant = 8 (two rational roots)' }
    ],
    correctAnswer: 'b',
    topic: 'Algebra',
    concept: 'Quadratic Equations',
    subconcept: 'Discriminant Analysis',
    difficulty: 'Medium',
    type: 'MCQ',
    explanation: 'Δ = b² - 4ac = 4² - 4(3)(2) = 16 - 24 = -8. Since Δ < 0, there are no real roots (two complex conjugate roots).',
    misconceptionMap: {
      'a': 'Added 16 + 24 instead of subtracting 4ac (16 - 24 = -8)',
      'c': 'Miscalculated 16 - 16 = 0',
      'd': 'Dropped negative sign on -8'
    }
  },
  {
    id: 'q10',
    question: 'Solve for x: (x - 3)² = 16. Enter both values separated by comma (e.g. -1, 7).',
    correctAnswer: '-1, 7',
    topic: 'Algebra',
    concept: 'Quadratic Equations',
    subconcept: 'Square Root Property',
    difficulty: 'Medium',
    type: 'SHORT_ANSWER',
    explanation: 'Take the square root of both sides: x - 3 = ±4. Case 1: x - 3 = 4 → x = 7. Case 2: x - 3 = -4 → x = -1.',
    misconceptionMap: {
      '7': 'Only considered positive principal square root (+4), forgot the negative branch (-4)',
      '1, 7': 'Subtracted 3 instead of adding 3: -4 - 3 = -7'
    }
  }
];

// The Golden Demo response pattern specified in the brief:
// Linear Equations: Strong (2/2 correct = 100%)
// Functions: Moderate (2/3 correct = 67%)
// Quadratic Equations: Weak (1/5 correct = 20% or 1/3 correct = 33%)
// - q6 (Beginner factoring): Correct! ('b')
// - q7 (Medium formula): Incorrect! ('b', selected negative sign error -3, -1/2)
// - q8 (Hard word problem): Incorrect! ('a', selected vertex t=2 instead of impact t=4)
// - q9 (Medium discriminant): Incorrect! ('a', added 4ac instead of subtracting)
// - q10 (Short answer): Incorrect! ('7', forgot negative branch)
export const GOLDEN_DEMO_RESPONSES = [
  { questionId: 'q1', selectedAnswer: 'b', isCorrect: true, timeSpentSeconds: 22 },
  { questionId: 'q2', selectedAnswer: 'c', isCorrect: true, timeSpentSeconds: 38 },
  { questionId: 'q3', selectedAnswer: 'b', isCorrect: true, timeSpentSeconds: 25 },
  { questionId: 'q4', selectedAnswer: 'b', isCorrect: true, timeSpentSeconds: 41 },
  { questionId: 'q5', selectedAnswer: 'a', isCorrect: false, timeSpentSeconds: 34, identifiedMisconception: 'Confused zero of function with denominator restriction' },
  { questionId: 'q6', selectedAnswer: 'b', isCorrect: true, timeSpentSeconds: 19 },
  { questionId: 'q7', selectedAnswer: 'b', isCorrect: false, timeSpentSeconds: 52, identifiedMisconception: 'Negative sign error: substituted -7 directly into numerator instead of -(-7)' },
  { questionId: 'q8', selectedAnswer: 'a', isCorrect: false, timeSpentSeconds: 61, identifiedMisconception: 'Found the vertex peak time (-b/2a = 2s) instead of ground impact' },
  { questionId: 'q9', selectedAnswer: 'a', isCorrect: false, timeSpentSeconds: 48, identifiedMisconception: 'Added 16 + 24 instead of subtracting 4ac' },
  { questionId: 'q10', selectedAnswer: '7', isCorrect: false, timeSpentSeconds: 39, identifiedMisconception: 'Only considered positive principal square root (+4), forgot negative branch' }
];
