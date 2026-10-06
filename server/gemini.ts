import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

export const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

export async function runGeminiDiagnosis(payload: {
  questions: any[];
  responses: any[];
  studentName: string;
  baseDiagnoses: any[];
}) {
  if (!ai) {
    return null;
  }

  try {
    const prompt = `
You are the AI Diagnostic Engine for DomainBreakers (AI-Powered Learning Gap Detector).
Problem Statement: DU-01 - AI-Powered Learning Gap Detector.
Your objective is to identify the underlying concept behind a student's mistakes across technical programming languages (Python, JavaScript, DSA) and STEM disciplines, explain WHY the system detected that learning gap, and provide targeted pedagogical insight.

Student Name: ${payload.studentName}
Questions and Responses:
${JSON.stringify(payload.responses.map(r => {
  const q = payload.questions.find(item => item.id === r.questionId);
  return {
    questionId: r.questionId,
    concept: q?.concept,
    subconcept: q?.subconcept,
    difficulty: q?.difficulty,
    questionText: q?.question,
    codeSnippet: q?.codeSnippet,
    language: q?.language,
    studentAnswer: r.selectedAnswer,
    correctAnswer: q?.correctAnswer,
    isCorrect: r.isCorrect,
    misconception: q?.misconceptionMap?.[r.selectedAnswer] || r.identifiedMisconception
  };
}), null, 2)}

Provide a structured JSON response with the following format:
{
  "topConcept": "The weak concept (e.g. Object References & Mutability, Async Event Loop & Microtasks, or Quadratic Equations)",
  "diagnosisType": "Application difficulty",
  "conceptualDiagnosis": "Detailed diagnosis explaining why the student is stumbling on this specific programming or mathematical construct.",
  "pedagogicalAdvice": "Targeted actionable advice for the student or teacher.",
  "cognitiveTrapIdentified": "The specific technical trap (e.g. Mutable default argument sharing or Microtask queue starvation).",
  "whyDetected": [
    "Evidence point 1 citing exact questions or code traps missed",
    "Evidence point 2 comparing basic vs applied performance",
    "Evidence point 3 citing recurring error patterns"
  ],
  "recommendedActions": [
    "Action step 1",
    "Action step 2",
    "Action step 3",
    "Action step 4"
  ]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
  } catch (err) {
    console.warn('[Gemini Diagnosis API] Fallback triggered due to:', err);
  }
  return null;
}
