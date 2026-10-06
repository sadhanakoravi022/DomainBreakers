export interface ConceptNode {
  id: string;
  name: string;
  category: string;
  status: 'STRONG' | 'MODERATE' | 'WEAK' | 'NEUTRAL';
  score: number;
  description: string;
  prerequisites: string[];
  subconcepts?: ConceptNode[];
  learningAdvice: string;
}

export const PYTHON_CONCEPT_TREE: ConceptNode = {
  id: 'python-root',
  name: 'Python Systems & Core',
  category: 'Root Language Domain',
  status: 'MODERATE',
  score: 68,
  description: 'Python runtime execution model, memory references, call frames, and idiomatic constructs.',
  prerequisites: [],
  learningAdvice: 'Solid syntactic fluency. Primary gap is Python reference semantics and mutable object lifetimes.',
  subconcepts: [
    {
      id: 'py-comprehensions',
      name: 'List Comprehensions & Slicing',
      category: 'Syntax Foundation',
      status: 'STRONG',
      score: 95,
      description: 'Interval slicing [start:stop:step] and declarative inline iteration.',
      prerequisites: ['python-root'],
      learningAdvice: 'Mastery achieved. Efficiently uses comprehension filtering and half-open indexing.',
      subconcepts: [
        {
          id: 'py-slicing',
          name: 'Half-Open Index Slices',
          category: 'Core Skill',
          status: 'STRONG',
          score: 100,
          description: 'Non-inclusive upper bound index behavior.',
          prerequisites: ['py-comprehensions'],
          learningAdvice: 'Flawlessly executed.'
        },
        {
          id: 'py-comp-filter',
          name: 'Conditional Transformations',
          category: 'Core Skill',
          status: 'STRONG',
          score: 90,
          description: 'Inline if-predicate filtering with value projection.',
          prerequisites: ['py-comprehensions'],
          learningAdvice: 'Optimal fluency.'
        }
      ]
    },
    {
      id: 'py-mutability',
      name: 'Object References & Mutability',
      category: 'Core Language Architecture',
      status: 'WEAK',
      score: 22,
      description: 'Pass-by-assignment object pointers, mutable default parameters, and memory identity.',
      prerequisites: ['python-root'],
      learningAdvice: 'CRITICAL LEARNING GAP: Believes default arguments are instantiated per function call rather than once at definition. Confuses shallow copy list(a) with deepcopy.',
      subconcepts: [
        {
          id: 'py-default-args',
          name: 'Mutable Default Arguments',
          category: 'Sub-concept',
          status: 'WEAK',
          score: 15,
          description: 'Evaluating def fn(x, arr=[]) once at module parse time vs per-call instantiation.',
          prerequisites: ['py-mutability'],
          learningAdvice: 'PRIMARY GAP: Fails to recognize that default lists are shared across all invocations. Needs the "None" sentinel pattern.'
        },
        {
          id: 'py-shallow-deep',
          name: 'Shallow vs Deep Copying',
          category: 'Sub-concept',
          status: 'WEAK',
          score: 25,
          description: 'Inner nested references persisting inside new outer collection containers.',
          prerequisites: ['py-mutability'],
          learningAdvice: 'Treats list(a) as if it clones all nested dimensions.'
        },
        {
          id: 'py-closure-late-bind',
          name: 'Closure Late Binding',
          category: 'Sub-concept',
          status: 'WEAK',
          score: 28,
          description: 'Lambdas inside loops capturing variable names by reference instead of values.',
          prerequisites: ['py-mutability'],
          learningAdvice: 'Assumes loop variables bind eagerly by value.'
        }
      ]
    },
    {
      id: 'py-recursion',
      name: 'Recursion & Base Cases',
      category: 'Algorithm Control Flow',
      status: 'MODERATE',
      score: 67,
      description: 'Call frame activation, termination conditions, and stack recursion limits.',
      prerequisites: ['python-root'],
      learningAdvice: 'Good basic recursion understanding; forgets edge termination checks (e.g., low > high in binary search).',
      subconcepts: [
        {
          id: 'py-base-case',
          name: 'Termination Condition Boundaries',
          category: 'Skill',
          status: 'MODERATE',
          score: 65,
          description: 'Preventing RecursionError stack overflows.',
          prerequisites: ['py-recursion'],
          learningAdvice: 'Review search failure base states.'
        },
        {
          id: 'py-memoization',
          name: 'Exponential Tree Overlap',
          category: 'Skill',
          status: 'MODERATE',
          score: 60,
          description: 'Diagnosing redundant subproblem calls in naive tree recursion.',
          prerequisites: ['py-recursion'],
          learningAdvice: 'Understand lru_cache and DP tables.'
        }
      ]
    }
  ]
};

export const JS_CONCEPT_TREE: ConceptNode = {
  id: 'js-root',
  name: 'JavaScript Runtimes & Async',
  category: 'Root Language Domain',
  status: 'MODERATE',
  score: 65,
  description: 'V8 execution model, microtask queue semantics, and prototypical inheritance.',
  prerequisites: [],
  learningAdvice: 'Understands basic DOM and synchronous logic; struggles with Event Loop microtask drain order.',
  subconcepts: [
    {
      id: 'js-event-loop',
      name: 'Async Event Loop & Microtasks',
      category: 'Runtime Core',
      status: 'WEAK',
      score: 28,
      description: 'Promise.then microtask starvation vs setTimeout macrotask timers.',
      prerequisites: ['js-root'],
      learningAdvice: 'CRITICAL GAP: Assumes setTimeout(fn, 0) executes before Promise.then() microtasks or in file order.',
      subconcepts: [
        {
          id: 'js-micro-macro',
          name: 'Microtask vs Macrotask Queue',
          category: 'Sub-concept',
          status: 'WEAK',
          score: 20,
          description: 'Microtask queue completely draining before the next timer ticks.',
          prerequisites: ['js-event-loop'],
          learningAdvice: 'Study V8 turn-of-loop phases.'
        },
        {
          id: 'js-await-pause',
          name: 'Async/Await Yielding',
          category: 'Sub-concept',
          status: 'WEAK',
          score: 35,
          description: 'Await expressions transforming remaining function body into microtasks.',
          prerequisites: ['js-event-loop'],
          learningAdvice: 'Recognize synchronous preamble before first await.'
        }
      ]
    },
    {
      id: 'js-closures',
      name: 'Closures & Lexical Scope',
      category: 'Language Semantics',
      status: 'STRONG',
      score: 85,
      description: 'Lexical environments, block scoping with let/const, and variable capture.',
      prerequisites: ['js-root'],
      learningAdvice: 'Clear grasp of var vs let iteration binding in loops.',
      subconcepts: [
        {
          id: 'js-var-let',
          name: 'Loop Binding Scoping',
          category: 'Skill',
          status: 'STRONG',
          score: 90,
          description: 'Per-iteration bindings with let.',
          prerequisites: ['js-closures'],
          learningAdvice: 'Mastered.'
        }
      ]
    },
    {
      id: 'js-prototypes',
      name: 'Prototypes & this Binding',
      category: 'Object Model',
      status: 'MODERATE',
      score: 68,
      description: 'Prototype inheritance chain and lexical arrow function this.',
      prerequisites: ['js-root'],
      learningAdvice: 'Review arrow functions in object literals inheriting global/window this.',
      subconcepts: [
        {
          id: 'js-arrow-this',
          name: 'Lexical this in Arrow Functions',
          category: 'Skill',
          status: 'MODERATE',
          score: 60,
          description: 'Arrow functions lacking their own this context.',
          prerequisites: ['js-prototypes'],
          learningAdvice: 'Use regular function shorthand for object methods.'
        }
      ]
    }
  ]
};

export const ALGEBRA_CONCEPT_TREE: ConceptNode = {
  id: 'algebra',
  name: 'Engineering Mathematics',
  category: 'Root Domain',
  status: 'MODERATE',
  score: 72,
  description: 'Foundational algebraic operations, polynomials, and symbolic manipulation.',
  prerequisites: [],
  learningAdvice: 'Core mathematical foundation. Good overall retention with targeted isolated gaps.',
  subconcepts: [
    {
      id: 'linear-equations',
      name: 'Linear Equations',
      category: 'Foundation',
      status: 'STRONG',
      score: 85,
      description: 'Single-variable linear equations, multi-step distribution, and balance transformations.',
      prerequisites: ['algebra'],
      learningAdvice: 'Solid mastery achieved. Can proceed to advanced multi-variable systems.'
    },
    {
      id: 'quadratic-equations',
      name: 'Quadratic Equations',
      category: 'Core Gap',
      status: 'WEAK',
      score: 35,
      description: 'Second-degree polynomials, factorization, vertex analysis, and the Quadratic Formula.',
      prerequisites: ['algebra', 'linear-equations'],
      learningAdvice: 'CRITICAL LEARNING GAP. Basic factoring is recognized, but formula substitution breaks down under negative sign constraints.'
    },
    {
      id: 'functions',
      name: 'Functions',
      category: 'Intermediate',
      status: 'MODERATE',
      score: 68,
      description: 'Domain constraints, functional notation, and function composition.',
      prerequisites: ['algebra'],
      learningAdvice: 'Moderate stability. Direct evaluation is strong; review rational denominator domain constraints.'
    }
  ]
};

export function getConceptTreeForDomain(domainId: string): ConceptNode {
  switch (domainId) {
    case 'python':
      return PYTHON_CONCEPT_TREE;
    case 'javascript':
      return JS_CONCEPT_TREE;
    case 'algebra':
    default:
      return ALGEBRA_CONCEPT_TREE;
  }
}
