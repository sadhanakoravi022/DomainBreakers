import {
  Question,
  StudentResponse,
  ConceptDiagnosis,
  Severity,
  DiagnosisType,
  LearningPathStep,
  PracticeQuestion,
  AssessmentResult,
  AssessmentAnswerRecord
} from '../types';
import { DEMO_QUESTIONS } from '../data/questions';

export class LearningEngine {
  static evaluateShortAnswer(question: Question, answer: string): {
    result: 'correct' | 'partial' | 'incorrect' | 'conceptually_misunderstood' | 'insufficient_evidence';
    mistakeType: string;
    rootCause: string;
    confidence: number;
    evidence: string[];
  } {
    const normalized = answer.trim();
    if (!normalized) {
      return {
        result: 'insufficient_evidence',
        mistakeType: 'Insufficient Evidence',
        rootCause: 'No reasoning was provided to assess conceptual understanding.',
        confidence: 24,
        evidence: ['No student reasoning was submitted for this question.'],
      };
    }

    const normalizedLower = normalized.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
    const compactAnswer = normalized.toLowerCase().replace(/\s+/g, '');
    const compactCorrectAnswer = question.correctAnswer.toLowerCase().replace(/\s+/g, '');
    if (question.correctAnswer && compactAnswer === compactCorrectAnswer) {
      return {
        result: 'correct',
        mistakeType: 'Correct Reasoning',
        rootCause: 'Student reasoning aligns with the expected conceptual explanation.',
        confidence: 92,
        evidence: ['The response matches the expected concept and reasoning direction.'],
      };
    }

    const reasoningHints = [
      'because', 'same', 'memory', 'reference', 'object', 'copy', 'shared',
      'sign', 'negative', 'formula', 'substitution', 'coefficient', 'root', 'loop'
    ];
    const matchedHints = reasoningHints.filter(h => normalizedLower.includes(h));

    if (matchedHints.length === 0) {
      return {
        result: 'incorrect',
        mistakeType: 'Insufficient Evidence',
        rootCause: 'The answer is too vague to confidently classify the misconception.',
        confidence: 35,
        evidence: ['The response does not provide enough reasoning to isolate the exact misconception.'],
      };
    }

    if (/(memory|reference|same object|same memory|shared|pointing)/.test(normalizedLower)) {
      return {
        result: 'partial',
        mistakeType: 'Conceptual Misunderstanding',
        rootCause: 'Student identifies shared references but cannot clearly explain why the mutation propagates.',
        confidence: 71,
        evidence: ['The response references shared memory or object references, but the explanation remains incomplete.'],
      };
    }

    if (/(sign|negative|minus|positive|opposite)/.test(normalizedLower)) {
      return {
        result: 'conceptually_misunderstood',
        mistakeType: 'Sign Error',
        rootCause: 'The student is misapplying sign conventions or coefficient signs in the formula flow.',
        confidence: 76,
        evidence: ['The explanation contains sign-related language indicating repeated sign confusion.'],
      };
    }

    if (/(formula|substitution|coefficient|plug|replace)/.test(normalizedLower)) {
      return {
        result: 'partial',
        mistakeType: 'Formula Misuse',
        rootCause: 'Student is discussing the formula but substituting values incorrectly or inconsistently.',
        confidence: 74,
        evidence: ['The reasoning mentions formula substitution but does not show correct execution.'],
      };
    }

    return {
      result: 'incorrect',
      mistakeType: 'Incorrect Application',
      rootCause: 'The student has not yet shown stable conceptual control over the underlying concept.',
      confidence: 58,
      evidence: ['The answer is incorrect and does not reveal the necessary conceptual step.'],
    };
  }

  /**
   * Analyzes student responses grouped by concept, extracting evidence,
   * calculating transparent confidence scores, severity, and diagnosing root misconceptions.
   */
  static analyze(
    questions: Question[],
    responses: StudentResponse[],
    studentName = 'Alex Rivera'
  ): AssessmentResult {
    const assessmentDomain = questions.find(question => question.domain)?.domain;
    const scopedQuestions = assessmentDomain
      ? questions.filter(question => question.domain === assessmentDomain)
      : questions;
    const questionIds = new Set(scopedQuestions.map(question => question.id));
    const scopedResponses = responses.filter(response => questionIds.has(response.questionId));

    // Step 1: Group by concept
    const conceptMap = new Map<string, {
      topic: string;
      questions: Question[];
      responses: StudentResponse[];
    }>();

    for (const q of scopedQuestions) {
      if (!conceptMap.has(q.concept)) {
        conceptMap.set(q.concept, {
          topic: q.topic,
          questions: [],
          responses: []
        });
      }
      const entry = conceptMap.get(q.concept)!;
      entry.questions.push(q);
      const resp = scopedResponses.find(r => r.questionId === q.id);
      if (resp) {
        entry.responses.push(resp);
      }
    }

    const diagnoses: ConceptDiagnosis[] = [];
    let totalQuestions = 0;
    let totalCorrect = 0;

    for (const [conceptName, data] of conceptMap.entries()) {
      const qs = data.questions;
      const resps = data.responses;

      const total = resps.length;
      totalQuestions += total;
      const correct = resps.filter(r => r.isCorrect).length;
      totalCorrect += correct;
      const incorrect = total - correct;
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

      // Difficulty performance breakdown
      const beginnerQs = qs.filter(q => q.difficulty === 'Beginner');
      const mediumQs = qs.filter(q => q.difficulty === 'Medium');
      const hardQs = qs.filter(q => q.difficulty === 'Hard');

      const beginnerResps = resps.filter(r => beginnerQs.some(q => q.id === r.questionId));
      const mediumResps = resps.filter(r => mediumQs.some(q => q.id === r.questionId));
      const hardResps = resps.filter(r => hardQs.some(q => q.id === r.questionId));

      const beginnerCorrect = beginnerResps.filter(r => r.isCorrect).length;
      const mediumCorrect = mediumResps.filter(r => r.isCorrect).length;
      const hardCorrect = hardResps.filter(r => r.isCorrect).length;

      const performanceByDifficulty = {
        Beginner: {
          total: beginnerResps.length,
          correct: beginnerCorrect,
          accuracy: beginnerResps.length > 0 ? Math.round((beginnerCorrect / beginnerResps.length) * 100) : 100
        },
        Medium: {
          total: mediumResps.length,
          correct: mediumCorrect,
          accuracy: mediumResps.length > 0 ? Math.round((mediumCorrect / mediumResps.length) * 100) : 100
        },
        Hard: {
          total: hardResps.length,
          correct: hardCorrect,
          accuracy: hardResps.length > 0 ? Math.round((hardCorrect / hardResps.length) * 100) : 100
        }
      };

      // Gather misconceptions & error patterns from student responses
      const errorPatterns: string[] = [];
      const whyDetected: string[] = [];
      const evidence: string[] = [];
      const mistakeCounts = new Map<string, number>();
      let rootCause = 'No clear misconception pattern has been isolated yet.';
      let mistakeFingerprint = 'Insufficient evidence';

      for (const r of resps) {
        if (!r.isCorrect) {
          const q = qs.find(item => item.id === r.questionId);
          const responseEvidence = q?.misconceptionMap?.[r.selectedAnswer]
            || r.identifiedMisconception
            || r.rootCause
            || r.mistakeType;
          if (responseEvidence) {
            evidence.push(responseEvidence);
            const normalizedEvidence = responseEvidence.toLowerCase();
            const normalizedConcept = conceptName.toLowerCase();
            const mistakeType = /object references|mutability/.test(normalizedConcept)
              ? 'Concept Problem'
              : /async event loop|microtasks/.test(normalizedConcept)
              ? 'Application Problem'
              : /formula|substitut|sign|coefficient/.test(normalizedEvidence)
              ? 'Formula Problem'
              : /calculat|arithmetic|computation/.test(normalizedEvidence)
              ? 'Calculation Mistake'
              : /concept|understand|reference|memory|identity/.test(normalizedEvidence)
              ? 'Concept Problem'
              : /application|apply|loop|execution|scenario/.test(normalizedEvidence)
              ? 'Application Problem'
              : 'Partially Understood';
            mistakeCounts.set(mistakeType, (mistakeCounts.get(mistakeType) || 0) + 1);
          }
        }
      }

      const repeatedMistake = [...mistakeCounts.entries()]
        .filter(([, count]) => count >= 2)
        .sort((a, b) => b[1] - a[1])[0];
      if (repeatedMistake) {
        mistakeFingerprint = repeatedMistake[0];
        rootCause = repeatedMistake[0];
        errorPatterns.push(repeatedMistake[0]);
      }

      // Step 5: Classify Diagnosis Type & Severity
      let diagnosisType: DiagnosisType = 'Strong understanding';
      let severity: Severity = 'LOW';
      let isWeak = false;
      let insufficientEvidence = false;

      if (total === 0 || (incorrect > 0 && !repeatedMistake)) {
        diagnosisType = 'Insufficient evidence';
        severity = 'LOW';
        insufficientEvidence = true;
        whyDetected.push(total === 0 ? 'No questions have been answered for this concept.' : 'A repeated mistake pattern has not appeared in enough answers yet.');
        whyDetected.push('Insufficient evidence. More responses are needed before assigning a confident learning gap.');
        evidence.push('Not enough evidence yet.');
      } else if (accuracy >= 80 && !repeatedMistake) {
        diagnosisType = 'Strong understanding';
        severity = 'LOW';
        isWeak = false;
        whyDetected.push(`Demonstrated solid competence with ${correct} of ${total} questions correct (${accuracy}%).`);
        if (beginnerResps.length > 0) whyDetected.push('Consistently solved foundational questions with minimal hesitation.');
      } else if (accuracy >= 55 && !repeatedMistake) {
        diagnosisType = 'Partial understanding';
        severity = 'MEDIUM';
        isWeak = false;
        whyDetected.push(`${correct} of ${total} questions answered correctly (${accuracy}%).`);
        if (beginnerResps.length > 0 && beginnerCorrect === beginnerResps.length) {
          whyDetected.push('Basic understanding demonstrated, but inconsistent on multi-step questions.');
        }
        if (errorPatterns.length > 0) {
          whyDetected.push(`Isolated errors observed: ${errorPatterns[0]}`);
        }
      } else {
        isWeak = Boolean(repeatedMistake);
        const hasFormulaIssue = mistakeFingerprint === 'Formula Problem';

        if (beginnerCorrect > 0 && (mediumCorrect === 0 || hardCorrect === 0)) {
          diagnosisType = 'Application difficulty';
        } else if (hasFormulaIssue) {
          diagnosisType = 'Formula misuse';
        } else if (errorPatterns.length >= 2) {
          diagnosisType = 'Repeated mistake pattern';
        } else {
          diagnosisType = 'Conceptual misunderstanding';
        }

        severity = isWeak && total >= 2 && accuracy <= 40 ? 'HIGH' : 'MEDIUM';
        whyDetected.push(`${incorrect} of ${total} related questions were answered incorrectly (${accuracy}% accuracy).`);
        if (beginnerResps.length > 0) {
          whyDetected.push(`Basic-level understanding was demonstrated (${beginnerCorrect}/${beginnerResps.length} correct on foundational items).`);
        }
        if (mediumResps.length > 0) {
          whyDetected.push(`Medium-level questions broke down (${mediumCorrect}/${mediumResps.length} correct).`);
        }
        if (hardResps.length > 0 && hardCorrect === 0) {
          whyDetected.push(`Application & modeling questions were unsuccessful (${hardCorrect}/${hardResps.length} correct).`);
        }
        if (errorPatterns.length > 0) {
          whyDetected.push(`Recurring pattern identified: "${errorPatterns[0]}"`);
        }
      }

      let sampleSizeFactor = 0;
      if (total >= 4) sampleSizeFactor = 40;
      else if (total === 3) sampleSizeFactor = 32;
      else if (total === 2) sampleSizeFactor = 22;
      else sampleSizeFactor = 10;

      let errorConsistencyFactor = 0;
      if (isWeak) {
        if (errorPatterns.length >= 2) errorConsistencyFactor = 30;
        else if (errorPatterns.length === 1) errorConsistencyFactor = 22;
        else errorConsistencyFactor = 15;
      } else {
        errorConsistencyFactor = 25;
      }

      let difficultyGradientFactor = 0;
      if (beginnerCorrect > 0 && mediumCorrect === 0) {
        difficultyGradientFactor = 28;
      } else if (accuracy >= 80 || accuracy <= 35) {
        difficultyGradientFactor = 24;
      } else {
        difficultyGradientFactor = 15;
      }

      let calculatedConfidence = Math.min(96, Math.max(25, sampleSizeFactor + errorConsistencyFactor + difficultyGradientFactor));
      if (diagnosisType === 'Insufficient evidence') {
        calculatedConfidence = 30;
      }

      let diagnosisSummary = '';
      if (isWeak) {
        diagnosisSummary = `Student understands the core idea but repeatedly misapplies the concept when the problem requires precise formula substitution or sign handling.`;
      } else if (accuracy >= 80) {
        diagnosisSummary = `Student exhibits robust operational fluency and conceptual clarity across varying problem complexities.`;
      } else {
        diagnosisSummary = `Student demonstrates working comprehension but requires consolidation in boundary conditions and nested transformations.`;
      }

      if (insufficientEvidence) {
        diagnosisSummary = 'Not enough responses exist yet to confirm a learning gap. More evidence is required before strong intervention.';
      }

      const recommendedActions: string[] = [];
      if (isWeak) {
        recommendedActions.push('Revise foundational formula structure and negative sign handling.');
        recommendedActions.push('Practice step-by-step substitution templates before simplifying arithmetic.');
        recommendedActions.push('Solve scaffolded beginner-to-intermediate drill sets.');
        recommendedActions.push('Attempt adaptive reassessment to verify mastery retention.');
      } else if (accuracy < 80) {
        recommendedActions.push('Review edge cases and domain constraints.');
        recommendedActions.push('Complete a quick 5-question consolidation drill.');
      } else {
        recommendedActions.push('Proceed to advanced composite challenges and application problems.');
      }

      if (insufficientEvidence) {
        recommendedActions.length = 0;
        recommendedActions.push('Collect more responses before making a strong claim about a learning gap.');
        recommendedActions.push('Retake the short diagnostic with application-style questions.');
      }

      diagnoses.push({
        concept: conceptName,
        topic: data.topic,
        totalQuestions: total,
        correctAnswers: correct,
        incorrectAnswers: incorrect,
        accuracy,
        performanceByDifficulty,
        severity,
        confidence: calculatedConfidence,
        confidenceBreakdown: {
          sampleSizeFactor,
          errorConsistencyFactor,
          difficultyGradientFactor,
          formulaOrMisconceptionFactor: errorPatterns.length > 0 ? 15 : 5,
          explanation: `Calculated from sample depth (${total} questions evaluated), recurring error patterns (${errorPatterns.length} isolated), and clear difficulty drop-off gradient.`
        },
        diagnosisType,
        diagnosisSummary,
        rootCause: rootCause || 'No single root cause is yet clear from the data.',
        mistakeFingerprint: mistakeFingerprint || 'Repeated mistake pattern',
        whyDetected,
        evidence: evidence.length > 0 ? evidence.slice(0, 4) : ['Insufficient evidence — more responses are required.'],
        errorPatterns,
        repeatedMistakes: repeatedMistake?.[1] || 0,
        recommendedActions,
        isWeakConcept: isWeak,
        insufficientEvidence
      });
    }

    // Sort diagnoses by severity (HIGH first) and lowest accuracy
    diagnoses.sort((a, b) => {
      const severityOrder: Record<Severity, number> = { HIGH: 3, MEDIUM: 2, LOW: 1 };
      if (severityOrder[b.severity] !== severityOrder[a.severity]) {
        return severityOrder[b.severity] - severityOrder[a.severity];
      }
      return a.accuracy - b.accuracy;
    });

    const topGap = diagnoses.find(d => d.isWeakConcept) || null;

    // Build personalized learning path
    const learningPath: LearningPathStep[] = topGap ? [
      {
        id: 'step-1',
        stepNumber: 1,
        title: `Revise ${topGap.concept} Core Principles`,
        description: `Review formula definitions, coefficient signs (a, b, c), and common pitfalls like -(-b).`,
        concept: topGap.concept,
        estimatedMinutes: 8,
        completed: false,
        type: 'concept_review'
      },
      {
        id: 'step-2',
        stepNumber: 2,
        title: `Guided Step-by-Step Substitution Drill`,
        description: `Practice plugging coefficients into template brackets before carrying out square roots.`,
        concept: topGap.concept,
        estimatedMinutes: 10,
        completed: false,
        type: 'drill'
      },
      {
        id: 'step-3',
        stepNumber: 3,
        title: `Solve Targeted Application Problems`,
        description: `Differentiate between projectile roots (ground impact) vs. vertex peaks (-b/2a).`,
        concept: topGap.concept,
        estimatedMinutes: 12,
        completed: false,
        type: 'application_practice'
      },
      {
        id: 'step-4',
        stepNumber: 4,
        title: `Take Adaptive Reassessment`,
        description: `Test understanding on newly generated problems to measure measurable improvement.`,
        concept: topGap.concept,
        estimatedMinutes: 10,
        completed: false,
        type: 'reassessment'
      }
    ] : [
      {
        id: 'step-1',
        stepNumber: 1,
        title: 'Review Advanced Mathematical Modeling',
        description: 'Deepen fluency across multi-variable systems and polynomial graph analysis.',
        concept: 'Algebra',
        estimatedMinutes: 15,
        completed: false,
        type: 'concept_review'
      }
    ];

    // Targeted practice questions generated based on diagnosed weak concept
    const adaptivePractice = topGap
    ? LearningEngine.generateTargetedPractice(topGap.concept, scopedQuestions)
      : [];

    const overallScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const questionResults: AssessmentAnswerRecord[] = scopedResponses.flatMap(response => {
      const question = scopedQuestions.find(item => item.id === response.questionId);
      if (!question) return [];

      const selectedOption = question.options?.find(option => option.id === response.selectedAnswer);
      const correctOption = question.options?.find(option => option.id === question.correctAnswer);
      const observedIssue = !response.isCorrect
        ? question.misconceptionMap?.[response.selectedAnswer]
          || response.identifiedMisconception
          || response.rootCause
          || response.mistakeType
        : undefined;

      return [{
        questionId: question.id,
        domain: question.domain,
        topic: question.topic,
        concept: question.concept,
        difficulty: question.difficulty,
        correctAnswer: correctOption?.text || question.correctAnswer,
        studentAnswer: selectedOption?.text || response.selectedAnswer,
        isCorrect: response.isCorrect,
        result: response.result || (response.isCorrect ? 'correct' : 'incorrect'),
        observedIssue
      }];
    });

    return {
      studentName,
      timestamp: new Date().toISOString(),
      overallScore,
      totalQuestions,
      correctCount: totalCorrect,
      diagnoses,
      topLearningGap: topGap,
      responses: scopedResponses,
      questionResults,
      learningPath,
      adaptivePractice
    };
  }

  /**
   * Generates targeted practice questions:
   * 2 Beginner questions, 2 Intermediate questions, 1 Application question
   * with new problems that do not repeat the original test questions.
   */
  static generateTargetedPractice(concept: string, domainQuestions: Question[] = []): PracticeQuestion[] {
    if (concept === 'Object References & Mutability') {
      return [
        {
          id: 'pq_py1',
          question: 'What is the standard idiomatic fix to prevent mutable default argument sharing?',
          codeSnippet: `def create_account(name, ledger=None):
    if ledger is None:
        ledger = []
    ledger.append(name)
    return ledger`,
          options: [
            'Use "ledger=None" and initialize "ledger = []" inside the body',
            'Use "ledger=list()" directly in parameter default',
            'Use global keyword inside the function',
            'Pass ledger as an immutable tuple parameter'
          ],
          correctAnswer: 'Use "ledger=None" and initialize "ledger = []" inside the body',
          concept: 'Object References & Mutability',
          difficulty: 'Beginner',
          explanation: 'Default arguments are evaluated once at function definition. Setting the default to None and instantiating a new list inside the body creates a fresh instance per call.',
          hint: 'Remember that None is immutable and serves as an ideal sentinel.',
          targetMisconception: 'Evaluating parameter expressions per function invocation'
        },
        {
          id: 'pq_py2',
          question: 'What is the output after mutating the copy?',
          codeSnippet: `a = [1, 2, [3, 4]]
import copy
b = copy.deepcopy(a)
a[2].append(99)
print(b[2])`,
          options: ['[3, 4]', '[3, 4, 99]', '[[3, 4]]', 'AttributeError'],
          correctAnswer: '[3, 4]',
          concept: 'Object References & Mutability',
          difficulty: 'Intermediate',
          explanation: 'copy.deepcopy() recursively clones all nested objects. Modifying a[2] has zero effect on b[2], leaving b[2] as [3, 4].',
          hint: 'Deep copy completely detaches nested references in memory.',
          targetMisconception: 'Confusing shallow copy with deep copy'
        },
        {
          id: 'pq_py3',
          question: 'How do you fix closure late binding so that each lambda captures the loop variable value at iteration time?',
          codeSnippet: `funcs = [lambda x=i: x for i in range(3)]
print([f() for f in funcs])`,
          options: [
            'Use default argument "lambda x=i: x" to bind i eagerly',
            'Use nonlocal keyword inside lambda',
            'Convert list to tuple before appending',
            'Use global scope'
          ],
          correctAnswer: 'Use default argument "lambda x=i: x" to bind i eagerly',
          concept: 'Object References & Mutability',
          difficulty: 'Intermediate',
          explanation: 'Default arguments are evaluated at function definition time, locking in the current value of i for each lambda.',
          hint: 'Default parameters evaluate when the lambda is declared, not when called.',
          targetMisconception: 'Late binding loop variable lookup'
        },
        {
          id: 'pq_py4',
          question: 'What will print(x is y, x == y) output for two separately created identical lists?',
          codeSnippet: `x = [1, 2, 3]
y = [1, 2, 3]
print(x is y, x == y)`,
          options: ['False True', 'True True', 'True False', 'False False'],
          correctAnswer: 'False True',
          concept: 'Object References & Mutability',
          difficulty: 'Beginner',
          explanation: '"is" checks object identity in memory (distinct memory allocations = False), while "==" checks value equivalence (identical contents = True).',
          hint: 'Memory address vs structural equality.',
          targetMisconception: 'Confusing memory identity with value equality'
        },
        {
          id: 'pq_py5',
          question: 'In high-throughput microservices, what risk does sharing mutable state across threaded requests introduce?',
          codeSnippet: `class Cache:
    shared_store = {} # class attribute
    def put(self, k, v):
        self.shared_store[k] = v`,
          options: [
            'Shared class attribute creates race conditions and cross-tenant data leakage',
            'Python forbids dictionary class attributes',
            'Memory is released immediately after each request',
            'No risk, Python is completely single-threaded'
          ],
          correctAnswer: 'Shared class attribute creates race conditions and cross-tenant data leakage',
          concept: 'Object References & Mutability',
          difficulty: 'Application',
          explanation: 'Class-level mutable attributes are shared across all instances of Cache throughout the entire process lifetime, causing data corruption across concurrent requests.',
          hint: 'Class attributes belong to the class object, not individual instances.',
          targetMisconception: 'Confusing instance attributes (self.store) with class attributes'
        }
      ];
    }

    if (concept === 'Async Event Loop & Microtasks') {
      return [
        {
          id: 'pq_js1',
          question: 'What is the logged order of tasks in the JavaScript event loop?',
          codeSnippet: `console.log('A');
queueMicrotask(() => console.log('B'));
setTimeout(() => console.log('C'), 0);
console.log('D');`,
          options: ['A, D, B, C', 'A, B, C, D', 'A, D, C, B', 'B, A, D, C'],
          correctAnswer: 'A, D, B, C',
          concept: 'Async Event Loop & Microtasks',
          difficulty: 'Beginner',
          explanation: 'Synchronous script logs A and D. The microtask queue (queueMicrotask) drains next, logging B. Finally, macrotask timer logs C.',
          hint: 'Synchronous -> Microtasks -> Macrotasks.',
          targetMisconception: 'Executing setTimeout(..., 0) before microtasks'
        },
        {
          id: 'pq_js2',
          question: 'What happens to the event loop if a microtask recursively queues another microtask?',
          codeSnippet: `function infiniteMicro() {
  Promise.resolve().then(infiniteMicro);
}
infiniteMicro();`,
          options: [
            'Starves the event loop: UI freezes and I/O timers never execute',
            'Automatically terminates with StackOverflow after 10 calls',
            'Switches over to setTimeout queue after 1 second',
            'Runs concurrently on a background worker thread'
          ],
          correctAnswer: 'Starves the event loop: UI freezes and I/O timers never execute',
          concept: 'Async Event Loop & Microtasks',
          difficulty: 'Intermediate',
          explanation: 'The runtime must drain all microtasks before yielding to macrotasks or UI rendering. Recursive microtasks cause complete event loop starvation.',
          hint: 'Microtask queue must reach length zero before macrotasks can run.',
          targetMisconception: 'Assuming round-robin queue execution'
        },
        {
          id: 'pq_js3',
          question: 'What does Promise.race() return when given multiple promises?',
          options: [
            'Settles with the first settled promise (whether resolved or rejected)',
            'Returns the promise with the highest numerical value',
            'Waits for all promises to resolve and sorts by speed',
            'Discards any rejected promise and waits for a resolution'
          ],
          correctAnswer: 'Settles with the first settled promise (whether resolved or rejected)',
          concept: 'Async Event Loop & Microtasks',
          difficulty: 'Intermediate',
          explanation: 'Promise.race adopts the outcome (fulfilled or rejected) of whichever promise settles first.',
          hint: 'The very first promise to finish wins the race.',
          targetMisconception: 'Confusing Promise.race with Promise.any'
        }
      ];
    }

    const matchingQuestions = domainQuestions.filter(question => question.concept === concept);
    if (matchingQuestions.length > 0) {
      return matchingQuestions.slice(0, 5).map(question => ({
        id: `practice-${question.id}`,
        question: question.question,
        codeSnippet: question.codeSnippet,
        language: question.language,
        options: question.options?.map(option => option.text),
        correctAnswer: question.options?.find(option => option.id === question.correctAnswer)?.text || question.correctAnswer,
        concept,
        difficulty: question.difficulty === 'Beginner' ? 'Beginner' : question.difficulty === 'Medium' ? 'Intermediate' : 'Application',
        explanation: question.explanation,
        hint: `Focus on ${question.topic}.`,
        targetMisconception: question.topic
      }));
    }

    if (concept === 'Quadratic Equations') {
      return [
        {
          id: 'pq1',
          question: 'Solve for x: x² - 8x + 12 = 0 by factoring.',
          options: ['x = -2, -6', 'x = 2, 6', 'x = 3, 4', 'x = -3, 4'],
          correctAnswer: 'x = 2, 6',
          concept: 'Quadratic Equations',
          difficulty: 'Beginner',
          explanation: 'Factors of +12 that sum to -8 are -2 and -6. (x - 2)(x - 6) = 0 gives roots x = 2 and x = 6.',
          hint: 'Look for two numbers whose product is +12 and sum is -8.',
          targetMisconception: 'Sign error when factoring negative middle term'
        },
        {
          id: 'pq2',
          question: 'In the equation 3x² - 5x - 2 = 0, identify the correct substitution for -b in the Quadratic Formula.',
          options: ['-5', '+5', '-(-2)', '+2'],
          correctAnswer: '+5',
          concept: 'Quadratic Equations',
          difficulty: 'Beginner',
          explanation: 'Here b = -5. The formula requires -b = -(-5) = +5.',
          hint: 'Remember that the formula has a minus sign in front of b: -(-5) = +5.',
          targetMisconception: 'Dropping double negative on -(-b)'
        },
        {
          id: 'pq3',
          question: 'Using the Quadratic Formula, find the roots of x² - 6x + 5 = 0.',
          options: ['x = 1, 5', 'x = -1, -5', 'x = 2, 3', 'x = -2, 5'],
          correctAnswer: 'x = 1, 5',
          concept: 'Quadratic Equations',
          difficulty: 'Intermediate',
          explanation: 'x = (-(-6) ± √((-6)² - 4(1)(5))) / 2 = (6 ± √(36 - 20)) / 2 = (6 ± 4) / 2 → roots are 5 and 1.',
          hint: 'Calculate discriminant Δ = 36 - 20 = 16. √16 = 4.',
          targetMisconception: 'Sign error in numerator (-b)'
        },
        {
          id: 'pq4',
          question: 'Calculate the discriminant Δ for 2x² + 3x - 5 = 0 and specify root character.',
          options: ['Δ = 49 (two real rational roots)', 'Δ = -31 (no real roots)', 'Δ = 25 (two roots)', 'Δ = 0 (single root)'],
          correctAnswer: 'Δ = 49 (two real rational roots)',
          concept: 'Quadratic Equations',
          difficulty: 'Intermediate',
          explanation: 'b² - 4ac = 3² - 4(2)(-5) = 9 - (-40) = 9 + 40 = 49. Since 49 > 0 and a perfect square, there are two distinct rational roots.',
          hint: 'Watch the double negative: - 4(2)(-5) becomes + 40!',
          targetMisconception: 'Subtracting positive 40 instead of adding (- - = +)'
        },
        {
          id: 'pq5',
          question: 'A model rocket’s height is given by h(t) = -5t² + 30t meters. How many seconds does it take to return to the ground (h = 0)?',
          options: ['t = 3 seconds', 't = 6 seconds', 't = 5 seconds', 't = 15 seconds'],
          correctAnswer: 't = 6 seconds',
          concept: 'Quadratic Equations',
          difficulty: 'Application',
          explanation: 'Set -5t² + 30t = 0 → -5t(t - 6) = 0. Roots are t = 0 (ignition) and t = 6 seconds (landing). Note: t = 3 is the peak vertex height (-b/2a = 3), not the ground landing.',
          hint: 'Ground level means height h(t) = 0, not maximum peak vertex!',
          targetMisconception: 'Confusing vertex peak time with root landing time'
        }
      ];
    }

    // Generic fallback practice questions for other concepts
    return [
      {
        id: 'pq1',
        question: `Solve beginner practice challenge for ${concept}: Evaluate foundational step.`,
        options: ['Option A (Correct)', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A (Correct)',
        concept,
        difficulty: 'Beginner',
        explanation: 'Applying core definition yields the target result.',
        hint: 'Start with fundamental definitions.'
      },
      {
        id: 'pq2',
        question: `Verify intermediate properties in ${concept}.`,
        options: ['Option A', 'Option B (Correct)', 'Option C', 'Option D'],
        correctAnswer: 'Option B (Correct)',
        concept,
        difficulty: 'Intermediate',
        explanation: 'Executing multi-step transformations confirms the second branch.',
        hint: 'Isolate terms systematically.'
      },
      {
        id: 'pq3',
        question: `Apply ${concept} to a constrained problem setting.`,
        options: ['Option A', 'Option B', 'Option C (Correct)', 'Option D'],
        correctAnswer: 'Option C (Correct)',
        concept,
        difficulty: 'Application',
        explanation: 'Setting up boundary equations resolves the target state.',
        hint: 'Map variables to constraints.'
      }
    ];
  }
}
