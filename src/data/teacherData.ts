import { DomainId } from '../types';

export interface ClassroomConceptGap {
  id: string;
  concept: string;
  affectedPercentage: number;
  affectedCount: number;
  totalStudents: number;
  averageAccuracy: number;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  confidence: number;
  commonErrorPatterns: string[];
  recommendedIntervention: string;
  affectedStudents: {
    name: string;
    accuracy: number;
    lastAttempt: string;
    gapSeverity: 'HIGH' | 'MEDIUM' | 'LOW';
    specificStruggle: string;
  }[];
}

export interface TeacherClassData {
  className: string;
  totalStudents: number;
  averageScore: number;
  studentsWithLearningGaps: number;
  assessmentCompletionRate: number;
  conceptGaps: ClassroomConceptGap[];
}

export const PYTHON_TEACHER_DATA: TeacherClassData = {
  className: 'Advanced Python Systems & Software Engineering (Cohort 3)',
  totalStudents: 38,
  averageScore: 64,
  studentsWithLearningGaps: 22,
  assessmentCompletionRate: 97,
  conceptGaps: [
    {
      id: 'py-mutability',
      concept: 'Object References & Mutability',
      affectedPercentage: 48,
      affectedCount: 18,
      totalStudents: 38,
      averageAccuracy: 32,
      severity: 'HIGH',
      confidence: 94,
      commonErrorPatterns: [
        'Sharing state via mutable default arguments (def fn(x, arr=[])) evaluated once at parse time',
        'Confusing shallow copies (list(a)) with copy.deepcopy(a) on nested collections',
        'Closure late binding: lambdas in loops looking up final iteration variable value',
        'Confusing object identity ("is") with structural value equality ("==")'
      ],
      recommendedIntervention: 'Conduct 20-minute live memory diagramming on Python object references on the heap, demonstrating the None sentinel idiom.',
      affectedStudents: [
        { name: 'Alex Rivera (Demo Student)', accuracy: 25, lastAttempt: 'Today', gapSeverity: 'HIGH', specificStruggle: 'Mutable default argument shared list trap & shallow copy' },
        { name: 'Devon Vance', accuracy: 20, lastAttempt: 'Today', gapSeverity: 'HIGH', specificStruggle: 'Closure late binding loop variable lookup' },
        { name: 'Sarah Lin', accuracy: 35, lastAttempt: 'Yesterday', gapSeverity: 'HIGH', specificStruggle: 'Nested list mutation across slice references' },
        { name: 'Priya Sharma', accuracy: 40, lastAttempt: 'Yesterday', gapSeverity: 'MEDIUM', specificStruggle: 'Class attribute vs instance attribute mutable dict leak' }
      ]
    },
    {
      id: 'py-recursion',
      concept: 'Recursion & Base Cases',
      affectedPercentage: 32,
      affectedCount: 12,
      totalStudents: 38,
      averageAccuracy: 61,
      severity: 'MEDIUM',
      confidence: 88,
      commonErrorPatterns: [
        'Omitting search failure base conditions (low > high) triggering RecursionError',
        'Naive exponential call trees without memoization or lru_cache'
      ],
      recommendedIntervention: 'Require students to write inductive termination proofs before implementing recursion.',
      affectedStudents: [
        { name: 'Kai Tanaka', accuracy: 50, lastAttempt: '2 days ago', gapSeverity: 'MEDIUM', specificStruggle: 'Binary search infinite loop on missing target' },
        { name: 'Elena Rostova', accuracy: 55, lastAttempt: 'Today', gapSeverity: 'MEDIUM', specificStruggle: 'Call stack depth exceeded on countdown base case' }
      ]
    },
    {
      id: 'py-generators',
      concept: 'Generators & Iteration',
      affectedPercentage: 18,
      affectedCount: 7,
      totalStudents: 38,
      averageAccuracy: 76,
      severity: 'LOW',
      confidence: 82,
      commonErrorPatterns: [
        'Attempting to re-iterate exhausted generator objects'
      ],
      recommendedIntervention: 'Quick recap on generator consumption lifecycle.',
      affectedStudents: [
        { name: 'Lucas Scott', accuracy: 70, lastAttempt: '3 days ago', gapSeverity: 'LOW', specificStruggle: 'Generator exhaustion upon second loop' }
      ]
    },
    {
      id: 'py-slicing',
      concept: 'List Comprehensions & Slicing',
      affectedPercentage: 5,
      affectedCount: 2,
      totalStudents: 38,
      averageAccuracy: 94,
      severity: 'LOW',
      confidence: 96,
      commonErrorPatterns: [
        'Occasional 1-based indexing confusion on slice start'
      ],
      recommendedIntervention: 'Minor warmup review.',
      affectedStudents: [
        { name: 'Maya Jones', accuracy: 80, lastAttempt: '4 days ago', gapSeverity: 'LOW', specificStruggle: 'Off-by-one upper bound slice' }
      ]
    }
  ]
};

export const JS_TEACHER_DATA: TeacherClassData = {
  className: 'JavaScript Engine Internals & Full-Stack Systems (Cohort 1)',
  totalStudents: 32,
  averageScore: 66,
  studentsWithLearningGaps: 16,
  assessmentCompletionRate: 91,
  conceptGaps: [
    {
      id: 'js-async',
      concept: 'Async Event Loop & Microtasks',
      affectedPercentage: 46,
      affectedCount: 15,
      totalStudents: 32,
      averageAccuracy: 34,
      severity: 'HIGH',
      confidence: 92,
      commonErrorPatterns: [
        'Assuming setTimeout(..., 0) runs before Promise.then() microtasks',
        'Microtask queue starvation in recursive queueMicrotask calls',
        'Confusing Promise.all fail-fast with Promise.allSettled'
      ],
      recommendedIntervention: 'Step-by-step browser event loop visualizer session.',
      affectedStudents: [
        { name: 'Alex Rivera (Demo Student)', accuracy: 30, lastAttempt: 'Today', gapSeverity: 'HIGH', specificStruggle: 'Microtask vs macrotask execution order' },
        { name: 'Jordan Reed', accuracy: 35, lastAttempt: 'Yesterday', gapSeverity: 'HIGH', specificStruggle: 'Await null microtask queue yielding' }
      ]
    },
    {
      id: 'js-this',
      concept: 'Prototypes & this Binding',
      affectedPercentage: 28,
      affectedCount: 9,
      totalStudents: 32,
      averageAccuracy: 62,
      severity: 'MEDIUM',
      confidence: 86,
      commonErrorPatterns: [
        'Arrow functions inside object literals inheriting global lexical this'
      ],
      recommendedIntervention: 'Demonstrate explicit call/apply/bind invocation patterns.',
      affectedStudents: [
        { name: 'Nina Chen', accuracy: 55, lastAttempt: '2 days ago', gapSeverity: 'MEDIUM', specificStruggle: 'Arrow function object method this.name undefined' }
      ]
    }
  ]
};

export const ALGEBRA_TEACHER_DATA: TeacherClassData = {
  className: 'Grade 10 Accelerated Mathematics (Period 3)',
  totalStudents: 34,
  averageScore: 68,
  studentsWithLearningGaps: 18,
  assessmentCompletionRate: 94,
  conceptGaps: [
    {
      id: 'quadratics',
      concept: 'Quadratic Equations',
      affectedPercentage: 42,
      affectedCount: 14,
      totalStudents: 34,
      averageAccuracy: 38,
      severity: 'HIGH',
      confidence: 91,
      commonErrorPatterns: [
        'Dropping double negatives in -b term (-(-7) entered as -7)',
        'Premature simplification of radical discriminant before division',
        'Confusing vertex extrema (-b/2a) with ground-level roots'
      ],
      recommendedIntervention: 'Conduct 20-minute targeted board drill on sign tracking inside the Quadratic Formula.',
      affectedStudents: [
        { name: 'Alex Rivera (Demo Student)', accuracy: 33, lastAttempt: 'Today', gapSeverity: 'HIGH', specificStruggle: 'Formula substitution sign error (-(-b))' }
      ]
    }
  ]
};

export function getTeacherDataForDomain(domainId: string): TeacherClassData {
  switch (domainId) {
    case 'python':
      return PYTHON_TEACHER_DATA;
    case 'javascript':
      return JS_TEACHER_DATA;
    case 'algebra':
    default:
      return ALGEBRA_TEACHER_DATA;
  }
}
