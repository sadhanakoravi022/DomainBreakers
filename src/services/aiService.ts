import { Question, StudentResponse, AssessmentResult, PracticeQuestion } from '../types';
import { LearningEngine } from './learningEngine';

export interface AIAnalysisResponse {
  result: AssessmentResult;
  source: 'gemini-3.8-flash' | 'deterministic_engine';
  aiInsights?: {
    conceptualDiagnosis: string;
    pedagogicalAdvice: string;
    cognitiveTrapIdentified: string;
  };
}

export class AIService {
  /**
   * Diagnoses learning gaps using Gemini 3.8 Flash server endpoint,
   * with automatic fallback to the deterministic LearningEngine if offline/unavailable.
   */
  static async analyzeAssessment(
    questions: Question[],
    responses: StudentResponse[],
    studentName = 'Alex Rivera'
  ): Promise<AIAnalysisResponse> {
    const selectedDomain = questions.find(question => question.domain)?.domain;
    const scopedQuestions = selectedDomain
      ? questions.filter(question => question.domain === selectedDomain)
      : questions;
    const selectedQuestionIds = new Set(scopedQuestions.map(question => question.id));
    const scopedResponses = responses.filter(response => selectedQuestionIds.has(response.questionId));

    // Generate base deterministic diagnosis first to ensure baseline integrity
    const baseResult = LearningEngine.analyze(scopedQuestions, scopedResponses, studentName);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questions: scopedQuestions,
          responses: scopedResponses,
          studentName,
          baseDiagnoses: baseResult.diagnoses
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.result) {
          return {
            result: baseResult,
            source: 'gemini-3.8-flash',
            aiInsights: data.aiInsights
          };
        }
      }
    } catch {
      // In development or if server API is unavailable, silently use local engine
    }

    // Deterministic fallback
    return {
      result: baseResult,
      source: 'deterministic_engine',
      aiInsights: {
        conceptualDiagnosis: baseResult.topLearningGap?.diagnosisSummary ||
          'Foundational understanding confirmed; sign confusion in formula substitution observed.',
        pedagogicalAdvice: 'Isolate the -b substitution step with color-coded algebraic templates.',
        cognitiveTrapIdentified: 'Double negative inversion: -(-7) mistakenly written as -7.'
      }
    };
  }

  /**
   * Generates targeted practice questions via Gemini server endpoint or fallback.
   */
  static async generateAdaptivePractice(
    concept: string,
    diagnosedGap: string
  ): Promise<{ questions: PracticeQuestion[]; source: string }> {
    try {
      const response = await fetch('/api/generate-practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept, diagnosedGap })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.questions && data.questions.length > 0) {
          return { questions: data.questions, source: 'gemini-3.8-flash' };
        }
      }
    } catch {
      // Fallback
    }

    return {
      questions: LearningEngine.generateTargetedPractice(concept),
      source: 'deterministic_engine'
    };
  }
}
