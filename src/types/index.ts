export type Difficulty = 'Beginner' | 'Medium' | 'Hard';

export type QuestionType = 'MCQ' | 'SHORT_ANSWER';

export type StudentLanguage = 'en' | 'hi' | 'mr';

export type DomainId =
  | 'python'
  | 'python-core'
  | 'java'
  | 'c'
  | 'cpp'
  | 'javascript'
  | 'javascript-async'
  | 'dsa'
  | 'html-css'
  | 'react'
  | 'node'
  | 'backend'
  | 'apis'
  | 'sql'
  | 'dbms'
  | 'mongodb'
  | 'ai'
  | 'machine-learning'
  | 'data-science'
  | 'data-analytics'
  | 'oop'
  | 'operating-systems'
  | 'computer-networks'
  | 'computer-architecture'
  | 'algebra'
  | 'probability-statistics'
  | 'linear-algebra';

export type AssessmentOutcome = 'correct' | 'partial' | 'incorrect' | 'conceptually_misunderstood' | 'insufficient_evidence';

export interface LearningDomain {
  id: DomainId;
  name: string;
  category: 'Technical Programming' | 'Computer Science' | 'Mathematics';
  icon: string;
  badge: string;
  description: string;
  primaryLanguage: string;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface QuestionTranslation {
  question?: string;
  explanation?: string;
  placeholder?: string;
  promptLabel?: string;
}

export interface Question {
  id: string;
  domain?: DomainId;
  question: string;
  codeSnippet?: string;
  language?: string;
  options?: QuestionOption[];
  correctAnswer: string;
  topic: string;
  concept: string;
  subconcept?: string;
  difficulty: Difficulty;
  type: QuestionType;
  explanation: string;
  misconceptionMap?: Record<string, string>; // Maps wrong answers to specific misconception (e.g. "forgot -b in formula" or "mutable default arg shared across calls")
  translations?: Partial<Record<StudentLanguage, QuestionTranslation>>;
}

export interface StudentResponse {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpentSeconds?: number;
  identifiedMisconception?: string;
  result?: AssessmentOutcome;
  mistakeType?: string;
  rootCause?: string;
  evidence?: string[];
  confidence?: number;
  language?: StudentLanguage;
}

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH';

export type DiagnosisType =
  | 'Strong understanding'
  | 'Partial understanding'
  | 'Conceptual misunderstanding'
  | 'Application difficulty'
  | 'Calculation error'
  | 'Formula misuse'
  | 'Repeated mistake pattern'
  | 'Insufficient evidence';

export interface DifficultyPerformance {
  total: number;
  correct: number;
  accuracy: number;
}

export interface ConceptDiagnosis {
  concept: string;
  topic: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  performanceByDifficulty: {
    Beginner: DifficultyPerformance;
    Medium: DifficultyPerformance;
    Hard: DifficultyPerformance;
  };
  severity: Severity;
  confidence: number; // 0 - 100
  confidenceBreakdown: {
    sampleSizeFactor: number;
    errorConsistencyFactor: number;
    difficultyGradientFactor: number;
    formulaOrMisconceptionFactor: number;
    explanation: string;
  };
  diagnosisType: DiagnosisType;
  diagnosisSummary: string;
  rootCause: string;
  mistakeFingerprint: string;
  whyDetected: string[]; // Specific bullet points citing actual responses
  evidence: string[];
  errorPatterns: string[];
  repeatedMistakes: number;
  recommendedActions: string[];
  isWeakConcept: boolean;
  insufficientEvidence: boolean;
}

export interface LearningPathStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  concept: string;
  estimatedMinutes: number;
  completed: boolean;
  type: 'concept_review' | 'drill' | 'application_practice' | 'reassessment';
}

export interface PracticeQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  language?: string;
  options?: string[];
  correctAnswer: string;
  concept: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Application';
  explanation: string;
  hint?: string;
  targetMisconception?: string;
}

export interface AssessmentAnswerRecord {
  questionId: string;
  domain?: DomainId;
  topic: string;
  concept: string;
  difficulty: Difficulty;
  correctAnswer: string;
  studentAnswer: string;
  isCorrect: boolean;
  result: AssessmentOutcome;
  observedIssue?: string;
}

export interface AssessmentResult {
  studentName: string;
  timestamp: string;
  overallScore: number;
  totalQuestions: number;
  correctCount: number;
  diagnoses: ConceptDiagnosis[];
  topLearningGap: ConceptDiagnosis | null;
  responses: StudentResponse[];
  questionResults?: AssessmentAnswerRecord[];
  learningPath: LearningPathStep[];
  adaptivePractice: PracticeQuestion[];
}

export interface ReassessmentResult {
  beforeScore: number;
  afterScore: number;
  improvementPercentage: number;
  concept: string;
  questionsMastered: number;
  totalPracticeQuestions: number;
  remainingGaps: string[];
  status: 'Mastered' | 'Significant Improvement' | 'Needs Further Review';
}
