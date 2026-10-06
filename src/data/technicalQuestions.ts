import { Question, LearningDomain, StudentResponse } from '../types';

export const AVAILABLE_DOMAINS: LearningDomain[] = [
  {
    id: 'python',
    name: 'Python Core & Architecture',
    category: 'Technical Programming',
    icon: 'Terminal',
    badge: 'Python 3.12',
    description: 'Object references, mutable default argument traps, recursion call frames, and generator streams.',
    primaryLanguage: 'python'
  },
  {
    id: 'javascript',
    name: 'JavaScript & Async Runtimes',
    category: 'Technical Programming',
    icon: 'Code2',
    badge: 'ESNext / Node',
    description: 'Async Event Loop & microtask queue ordering, closure scope variables, and prototype chains.',
    primaryLanguage: 'javascript'
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    category: 'Computer Science',
    icon: 'Cpu',
    badge: 'C++ / DSA',
    description: 'Pointers & memory dereferences, recursive call stack frames, and tree traversal algorithms.',
    primaryLanguage: 'cpp'
  },
  {
    id: 'algebra',
    name: 'Engineering Mathematics',
    category: 'Mathematics',
    icon: 'Binary',
    badge: 'Algebra',
    description: 'Polynomial factorization, quadratic formula sign mechanics, and function domains.',
    primaryLanguage: 'math'
  }
];

// ==========================================
// 1. PYTHON CORE & ARCHITECTURE (10 Questions)
// ==========================================
export const PYTHON_QUESTIONS: Question[] = [
  {
    id: 'py1',
    question: 'What is the output of the following Python list slicing operation?',
    codeSnippet: `nums = [10, 20, 30, 40, 50]
result = nums[1:4]
print(result)`,
    language: 'python',
    options: [
      { id: 'a', text: '[10, 20, 30]' },
      { id: 'b', text: '[20, 30, 40]' },
      { id: 'c', text: '[20, 30, 40, 50]' },
      { id: 'd', text: '[10, 20, 30, 40]' }
    ],
    correctAnswer: 'b',
    topic: 'Python Programming',
    concept: 'List Comprehensions & Slicing',
    difficulty: 'Beginner',
    type: 'MCQ',
    explanation: 'Python slices are half-open intervals [start:stop). Index 1 is 20, index 3 is 40. Index 4 (50) is excluded, producing [20, 30, 40].',
    misconceptionMap: {
      'a': 'Assumed 1-based indexing instead of 0-based indexing',
      'c': 'Included the upper bound index 4',
      'd': 'Started from index 0 instead of index 1'
    }
  },
  {
    id: 'py2',
    question: 'What will be printed by the list comprehension with conditional filtering?',
    codeSnippet: `data = [1, 2, 3, 4, 5, 6]
evens_squared = [x**2 for x in data if x % 2 == 0]
print(evens_squared)`,
    language: 'python',
    options: [
      { id: 'a', text: '[4, 16, 36]' },
      { id: 'b', text: '[2, 4, 6]' },
      { id: 'c', text: '[1, 4, 9, 16, 25, 36]' },
      { id: 'd', text: '[4, 8, 12]' }
    ],
    correctAnswer: 'a',
    topic: 'Python Programming',
    concept: 'List Comprehensions & Slicing',
    difficulty: 'Beginner',
    type: 'MCQ',
    explanation: 'Filtered numbers where x % 2 == 0 are [2, 4, 6]. Squaring each gives [2²=4, 4²=16, 6²=36].',
    misconceptionMap: {
      'b': 'Forgot to apply the x**2 transformation',
      'c': 'Ignored the if condition',
      'd': 'Multiplied by 2 instead of squaring'
    }
  },
  {
    id: 'py3',
    question: 'What is the output of the recursive countdown function when called with count_down(3)?',
    codeSnippet: `def count_down(n):
    if n <= 0:
        return []
    return [n] + count_down(n - 1)

print(count_down(3))`,
    language: 'python',
    options: [
      { id: 'a', text: '[3, 2, 1]' },
      { id: 'b', text: '[1, 2, 3]' },
      { id: 'c', text: '[3, 2, 1, 0]' },
      { id: 'd', text: 'RecursionError: maximum recursion depth exceeded' }
    ],
    correctAnswer: 'a',
    topic: 'Python Programming',
    concept: 'Recursion & Base Cases',
    difficulty: 'Beginner',
    type: 'MCQ',
    explanation: 'count_down(3) prepends 3 to count_down(2), which prepends 2 to count_down(1), which returns [1] + count_down(0) = [1] + [] = [1]. Total is [3, 2, 1].',
    misconceptionMap: {
      'b': 'Reversed call stack concatenation order',
      'c': 'Included base case 0 instead of returning empty list',
      'd': 'Believed base condition n <= 0 is never reached'
    }
  },
  {
    id: 'py4',
    question: 'What is the critical bug in this recursive binary search implementation?',
    codeSnippet: `def binary_search(arr, target, low, high):
    mid = (low + high) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] > target:
        return binary_search(arr, target, low, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, high)`,
    language: 'python',
    options: [
      { id: 'a', text: 'Missing base case when target is not present (low > high)' },
      { id: 'b', text: 'Floor division (low + high) // 2 throws ZeroDivisionError' },
      { id: 'c', text: 'Recursive call arguments are inverted' },
      { id: 'd', text: 'mid - 1 should be mid' }
    ],
    correctAnswer: 'a',
    topic: 'Python Programming',
    concept: 'Recursion & Base Cases',
    difficulty: 'Medium',
    type: 'MCQ',
    explanation: 'If target is not present in arr, low will eventually exceed high. Without "if low > high: return -1", the function will cause RecursionError with infinite calls.',
    misconceptionMap: {
      'b': 'Confused floor division // with modulo or zero division',
      'c': 'Did not check boundary failure condition',
      'd': 'Did not recognize infinite loop risk when target is missing'
    }
  },
  {
    id: 'py5',
    question: 'What will happen when calling this recursive Fibonacci function with fib(30)?',
    codeSnippet: `def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)`,
    language: 'python',
    options: [
      { id: 'a', text: 'O(n) linear execution time with memoization' },
      { id: 'b', text: 'Exponential O(2ⁿ) call tree with massive redundant recalculations' },
      { id: 'c', text: 'SyntaxError due to double recursive call in one return statement' },
      { id: 'd', text: 'Returns 0 because base case handles n <= 1' }
    ],
    correctAnswer: 'b',
    topic: 'Python Programming',
    concept: 'Recursion & Base Cases',
    difficulty: 'Medium',
    type: 'MCQ',
    explanation: 'Naive recursive Fibonacci creates a branching tree of size 2ⁿ, repeatedly recomputing subproblems like fib(5) millions of times. Requires memoization or dynamic programming.',
    misconceptionMap: {
      'a': 'Assumed Python automatically caches recursive function results',
      'c': 'Thought Python prohibits multiple recursive calls in one line',
      'd': 'Misread base case'
    }
  },
  {
    id: 'py6',
    question: 'What is the output of the two calls to append_item()?',
    codeSnippet: `def append_item(val, container=[]):
    container.append(val)
    return container

print(append_item(1))
print(append_item(2))`,
    language: 'python',
    options: [
      { id: 'a', text: '[1] then [2]' },
      { id: 'b', text: '[1] then [1, 2]' },
      { id: 'c', text: '[1] then []' },
      { id: 'd', text: 'TypeError: default parameter must be immutable' }
    ],
    correctAnswer: 'b',
    topic: 'Python Programming',
    concept: 'Object References & Mutability',
    difficulty: 'Medium',
    type: 'MCQ',
    explanation: 'CRITICAL PYTHON TRAP: Default argument expressions are evaluated ONCE at function definition time, NOT each time the function is invoked. The same list object is retained and mutated across subsequent calls, outputting [1] then [1, 2].',
    misconceptionMap: {
      'a': 'Believed a new empty list [] is re-created every time append_item() is invoked',
      'c': 'Thought container resets upon function return',
      'd': 'Thought Python rejects mutable default parameters at compile-time'
    }
  },
  {
    id: 'py7',
    question: 'What does print(b) output after mutating the nested list?',
    codeSnippet: `import copy
a = [[1, 2], [3, 4]]
b = list(a) # shallow copy
a[0].append(99)
print(b[0])`,
    language: 'python',
    options: [
      { id: 'a', text: '[1, 2]' },
      { id: 'b', text: '[1, 2, 99]' },
      { id: 'c', text: '[[1, 2, 99], [3, 4]]' },
      { id: 'd', text: 'IndexError' }
    ],
    correctAnswer: 'b',
    topic: 'Python Programming',
    concept: 'Object References & Mutability',
    difficulty: 'Medium',
    type: 'MCQ',
    explanation: 'list(a) performs a SHALLOW copy: the outer list is new, but its inner elements are references to the same list objects in memory. Mutating a[0] mutates the exact object referenced by b[0].',
    misconceptionMap: {
      'a': 'Confused shallow copy list(a) with deepcopy copy.deepcopy(a)',
      'c': 'Did not note that b[0] was indexed instead of b',
      'd': 'Assumed list constructor detaches nested memory'
    }
  },
  {
    id: 'py8',
    question: 'What is the output of the following generator function pipeline?',
    codeSnippet: `def generate_multiples():
    n = 1
    while n <= 3:
        yield n * 10
        n += 1

gen = generate_multiples()
print(next(gen), next(gen))`,
    language: 'python',
    options: [
      { id: 'a', text: '10 20' },
      { id: 'b', text: '10 10' },
      { id: 'c', text: '[10, 20]' },
      { id: 'd', text: 'StopIteration error' }
    ],
    correctAnswer: 'a',
    topic: 'Python Programming',
    concept: 'Generators & Control Flow',
    difficulty: 'Beginner',
    type: 'MCQ',
    explanation: 'The first next() yields 1 * 10 = 10 and pauses execution. The second next() resumes after the yield, increments n to 2, and yields 20.',
    misconceptionMap: {
      'b': 'Believed generator restarts from beginning on each next() call',
      'c': 'Expected a list instead of unpacked space-separated values',
      'd': 'Thought while loop completed before returning'
    }
  },
  {
    id: 'py9',
    question: 'What will print(output) display after the closure loop execution?',
    codeSnippet: `funcs = []
for i in range(3):
    funcs.append(lambda: i)

output = [f() for f in funcs]
print(output)`,
    language: 'python',
    options: [
      { id: 'a', text: '[0, 1, 2]' },
      { id: 'b', text: '[2, 2, 2]' },
      { id: 'c', text: '[3, 3, 3]' },
      { id: 'd', text: '[0, 0, 0]' }
    ],
    correctAnswer: 'b',
    topic: 'Python Programming',
    concept: 'Object References & Mutability',
    difficulty: 'Hard',
    type: 'MCQ',
    explanation: 'PYTHON CLOSURE LATE BINDING: The lambdas capture the variable "i" by reference, not its value at creation time. By the time the lambdas are executed, the loop has completed with i = 2, so every lambda returns 2!',
    misconceptionMap: {
      'a': 'Assumed Python binds loop variables eagerly by value (i=i default parameter was needed)',
      'c': 'Thought range(3) ends at i = 3 instead of 2',
      'd': 'Expected initial iteration binding'
    }
  },
  {
    id: 'py10',
    question: 'How do you idiomatically fix the mutable default argument trap in Python? Enter the default parameter value (e.g. None).',
    codeSnippet: `def add_user(name, users=None):
    if users is None:
        users = []
    users.append(name)
    return users`,
    correctAnswer: 'None',
    topic: 'Python Programming',
    concept: 'Object References & Mutability',
    difficulty: 'Medium',
    type: 'SHORT_ANSWER',
    explanation: 'The standard Python idiom is to set the default parameter to None, and inside the function body check "if users is None: users = []". This guarantees a fresh list on every invocation.',
    misconceptionMap: {
      '[]': 'Used mutable list [] which repeats the shared state bug',
      'list()': 'Calling list() in signature still evaluates only once'
    }
  }
];

// Golden Demo for Python Track:
// List Comprehensions: Strong (2/2 = 100%)
// Generators & Control Flow: Strong (1/1 = 100%)
// Recursion: Moderate (2/3 = 67%)
// Object References & Mutability: WEAK (0/4 = 0% accuracy -> High Learning Gap on Mutable Defaults & Shallow Copies)
export const GOLDEN_DEMO_PYTHON_RESPONSES: StudentResponse[] = [
  { questionId: 'py1', selectedAnswer: 'b', isCorrect: true, timeSpentSeconds: 18 },
  { questionId: 'py2', selectedAnswer: 'a', isCorrect: true, timeSpentSeconds: 22 },
  { questionId: 'py3', selectedAnswer: 'a', isCorrect: true, timeSpentSeconds: 24 },
  { questionId: 'py4', selectedAnswer: 'a', isCorrect: true, timeSpentSeconds: 32 },
  { questionId: 'py5', selectedAnswer: 'a', isCorrect: false, timeSpentSeconds: 38, identifiedMisconception: 'Assumed Python automatically caches recursive function results' },
  { questionId: 'py6', selectedAnswer: 'a', isCorrect: false, timeSpentSeconds: 45, identifiedMisconception: 'Believed a new empty list [] is re-created every time append_item() is invoked' },
  { questionId: 'py7', selectedAnswer: 'a', isCorrect: false, timeSpentSeconds: 48, identifiedMisconception: 'Confused shallow copy list(a) with deepcopy copy.deepcopy(a)' },
  { questionId: 'py8', selectedAnswer: 'a', isCorrect: true, timeSpentSeconds: 20 },
  { questionId: 'py9', selectedAnswer: 'a', isCorrect: false, timeSpentSeconds: 52, identifiedMisconception: 'Assumed Python binds closure loop variables eagerly by value' },
  { questionId: 'py10', selectedAnswer: '[]', isCorrect: false, timeSpentSeconds: 36, identifiedMisconception: 'Used mutable list [] which repeats the shared state bug instead of None' }
];

// ==========================================
// 2. JAVASCRIPT & ASYNC RUNTIMES (10 Questions)
// ==========================================
export const JAVASCRIPT_QUESTIONS: Question[] = [
  {
    id: 'js1',
    question: 'What is the logged output order of console statements?',
    codeSnippet: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');`,
    language: 'javascript',
    options: [
      { id: 'a', text: '1, 4, 3, 2' },
      { id: 'b', text: '1, 2, 3, 4' },
      { id: 'c', text: '1, 4, 2, 3' },
      { id: 'd', text: '1, 3, 4, 2' }
    ],
    correctAnswer: 'a',
    topic: 'JavaScript',
    concept: 'Async Event Loop & Microtasks',
    difficulty: 'Medium',
    type: 'MCQ',
    explanation: 'Synchronous tasks run first: 1, 4. Then the Microtask Queue (Promise.then) empties: 3. Finally the Macrotask Queue (setTimeout callback) executes: 2. Result: 1, 4, 3, 2.',
    misconceptionMap: {
      'b': 'Assumed setTimeout(..., 0) runs immediately in sequential code order',
      'c': 'Thought macrotask setTimeout runs before microtask Promise.then',
      'd': 'Thought Promise callbacks run synchronously before console.log(4)'
    }
  },
  {
    id: 'js2',
    question: 'What will be output by this async/await execution sequence?',
    codeSnippet: `async function test() {
  console.log('A');
  await null;
  console.log('B');
}
console.log('C');
test();
console.log('D');`,
    language: 'javascript',
    options: [
      { id: 'a', text: 'C, A, D, B' },
      { id: 'b', text: 'C, A, B, D' },
      { id: 'c', text: 'A, C, D, B' },
      { id: 'd', text: 'C, D, A, B' }
    ],
    correctAnswer: 'a',
    topic: 'JavaScript',
    concept: 'Async Event Loop & Microtasks',
    difficulty: 'Medium',
    type: 'MCQ',
    explanation: 'C logs first. test() is invoked: A logs synchronously. Then "await null" pauses test() and queues the resumption in the microtask queue. D logs synchronously. Finally the microtask queue runs B. Result: C, A, D, B.',
    misconceptionMap: {
      'b': 'Believed "await null" continues synchronously without yielding to the event loop',
      'c': 'Missed that C is called before test()',
      'd': 'Thought async functions delay their initial execution'
    }
  },
  {
    id: 'js3',
    question: 'What is printed by the closure timeout loop?',
    codeSnippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}`,
    language: 'javascript',
    options: [
      { id: 'a', text: '0, 1, 2' },
      { id: 'b', text: '3, 3, 3' },
      { id: 'c', text: 'undefined, undefined, undefined' },
      { id: 'd', text: '2, 2, 2' }
    ],
    correctAnswer: 'b',
    topic: 'JavaScript',
    concept: 'Closures & Lexical Scope',
    difficulty: 'Beginner',
    type: 'MCQ',
    explanation: 'The variable "var i" is function-scoped (or globally scoped). When the setTimeout callbacks fire after 100ms, the loop has completed with i = 3. All 3 callbacks share the same i reference, logging 3, 3, 3. Using "let" would create a block-scoped binding per iteration.',
    misconceptionMap: {
      'a': 'Expected block scoping as if "let" was used instead of "var"',
      'd': 'Thought i terminates at 2 instead of failing condition at 3',
      'c': 'Believed i fell out of scope'
    }
  },
  {
    id: 'js4',
    question: 'What is the output of the arrow function object method?',
    codeSnippet: `const user = {
  name: 'Alex',
  greet: () => {
    return this.name;
  }
};
console.log(user.greet());`,
    language: 'javascript',
    options: [
      { id: 'a', text: 'Alex' },
      { id: 'b', text: 'undefined' },
      { id: 'c', text: 'TypeError: greet is not a function' },
      { id: 'd', text: 'ReferenceError: this is not defined' }
    ],
    correctAnswer: 'b',
    topic: 'JavaScript',
    concept: 'Prototypes & this Binding',
    difficulty: 'Medium',
    type: 'MCQ',
    explanation: 'Arrow functions do NOT have their own "this" binding. They inherit "this" lexically from the enclosing scope (window/global in this case, not user). Therefore this.name evaluates to undefined.',
    misconceptionMap: {
      'a': 'Believed arrow functions bind "this" to the containing object literal',
      'c': 'Thought arrow functions cannot be assigned as object properties',
      'd': 'Believed "this" is forbidden in arrow functions'
    }
  },
  {
    id: 'js5',
    question: 'What does Promise.all() do when one promise in the array rejects?',
    codeSnippet: `const p1 = Promise.resolve(10);
const p2 = Promise.reject(new Error('fail'));
const p3 = Promise.resolve(30);

Promise.all([p1, p2, p3]).catch(err => console.log('caught!'));`,
    language: 'javascript',
    options: [
      { id: 'a', text: 'Waits for p1 and p3 to finish before rejecting' },
      { id: 'b', text: 'Immediately rejects (short-circuits) on the first rejection' },
      { id: 'c', text: 'Ignores rejected promises and returns [10, 30]' },
      { id: 'd', text: 'Converts rejection to null in the returned array' }
    ],
    correctAnswer: 'b',
    topic: 'JavaScript',
    concept: 'Async Event Loop & Microtasks',
    difficulty: 'Medium',
    type: 'MCQ',
    explanation: 'Promise.all has fail-fast behavior: if any promise rejects, the returned promise immediately rejects with that error, discarding unresolved results.',
    misconceptionMap: {
      'a': 'Confused Promise.all with Promise.allSettled',
      'c': 'Thought Promise.all filters out errors',
      'd': 'Assumed automatic error masking'
    }
  },
  {
    id: 'js6',
    question: 'What is the return value of [1, 2, 3].map(x => x * 2)?',
    codeSnippet: `const nums = [1, 2, 3];
const result = nums.map(x => x * 2);
console.log(result);`,
    language: 'javascript',
    options: [
      { id: 'a', text: '[2, 4, 6]' },
      { id: 'b', text: '[1, 2, 3]' },
      { id: 'c', text: 'undefined' },
      { id: 'd', text: '6' }
    ],
    correctAnswer: 'a',
    topic: 'JavaScript',
    concept: 'Array Higher-Order Methods',
    difficulty: 'Beginner',
    type: 'MCQ',
    explanation: 'Array.prototype.map creates a new array with the results of calling a provided function on every element.',
    misconceptionMap: {
      'b': 'Thought map mutates the original array in place',
      'c': 'Thought map does not return an array',
      'd': 'Confused map with reduce'
    }
  },
  {
    id: 'js7',
    question: 'What is output by checking prototype inheritance?',
    codeSnippet: `function Animal() {}
const dog = new Animal();
console.log(Object.getPrototypeOf(dog) === Animal.prototype);`,
    language: 'javascript',
    options: [
      { id: 'a', text: 'true' },
      { id: 'b', text: 'false' },
      { id: 'c', text: 'undefined' },
      { id: 'd', text: 'TypeError' }
    ],
    correctAnswer: 'a',
    topic: 'JavaScript',
    concept: 'Prototypes & this Binding',
    difficulty: 'Beginner',
    type: 'MCQ',
    explanation: 'An object created via "new Constructor()" has its internal [[Prototype]] set directly to Constructor.prototype.',
    misconceptionMap: {
      'b': 'Thought Object.getPrototypeOf inspects the constructor function itself',
      'c': 'Believed prototype chains are hidden from getPrototypeOf',
      'd': 'Assumed constructor functions lack prototypes'
    }
  },
  {
    id: 'js8',
    question: 'What does typeof NaN return in JavaScript?',
    codeSnippet: `console.log(typeof NaN);`,
    language: 'javascript',
    options: [
      { id: 'a', text: '"number"' },
      { id: 'b', text: '"nan"' },
      { id: 'c', text: '"undefined"' },
      { id: 'd', text: '"object"' }
    ],
    correctAnswer: 'a',
    topic: 'JavaScript',
    concept: 'Type Coercion & Primitives',
    difficulty: 'Beginner',
    type: 'MCQ',
    explanation: 'In the IEEE 754 floating-point standard, NaN ("Not-a-Number") is a special numeric value, so typeof NaN evaluates to "number".',
    misconceptionMap: {
      'b': 'Expected literal "nan" type',
      'c': 'Thought NaN behaves like undefined',
      'd': 'Confused with typeof null returning "object"'
    }
  },
  {
    id: 'js9',
    question: 'What will be output by evaluating microtask queue starvation?',
    codeSnippet: `Promise.resolve().then(() => {
  console.log('Micro 1');
  Promise.resolve().then(() => console.log('Micro 2'));
});
setTimeout(() => console.log('Macro 1'), 0);`,
    language: 'javascript',
    options: [
      { id: 'a', text: 'Micro 1, Micro 2, Macro 1' },
      { id: 'b', text: 'Micro 1, Macro 1, Micro 2' },
      { id: 'c', text: 'Macro 1, Micro 1, Micro 2' },
      { id: 'd', text: 'Micro 1, Macro 1' }
    ],
    correctAnswer: 'a',
    topic: 'JavaScript',
    concept: 'Async Event Loop & Microtasks',
    difficulty: 'Hard',
    type: 'MCQ',
    explanation: 'The microtask queue MUST be completely drained before the event loop advances to the next macrotask. Enqueuing "Micro 2" during "Micro 1" executes "Micro 2" before "Macro 1" can run.',
    misconceptionMap: {
      'b': 'Believed the event loop alternates between microtask and macrotask queues',
      'c': 'Thought setTimeout executes first',
      'd': 'Thought nested microtasks are deferred to the next tick'
    }
  },
  {
    id: 'js10',
    question: 'Which keyword fixes the loop closure issue in "for (var i = 0; i < 3; i++)" to give each iteration its own binding?',
    codeSnippet: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10);
} // logs 0, 1, 2`,
    correctAnswer: 'let',
    topic: 'JavaScript',
    concept: 'Closures & Lexical Scope',
    difficulty: 'Beginner',
    type: 'SHORT_ANSWER',
    explanation: 'Replacing "var" with "let" introduces block scoping: JavaScript creates a new lexical scope and variable binding for each loop iteration.',
    misconceptionMap: {
      'const': 'const cannot be incremented via i++',
      'var': 'var shares the same binding across all iterations'
    }
  }
];

// Golden Demo for JavaScript Track
export const GOLDEN_DEMO_JAVASCRIPT_RESPONSES: StudentResponse[] = [
  { questionId: 'js1', selectedAnswer: 'b', isCorrect: false, timeSpentSeconds: 42, identifiedMisconception: 'Assumed setTimeout(..., 0) runs immediately in sequential code order' },
  { questionId: 'js2', selectedAnswer: 'b', isCorrect: false, timeSpentSeconds: 48, identifiedMisconception: 'Believed "await null" continues synchronously without yielding to the event loop' },
  { questionId: 'js3', selectedAnswer: 'b', isCorrect: true, timeSpentSeconds: 20 },
  { questionId: 'js4', selectedAnswer: 'b', isCorrect: true, timeSpentSeconds: 25 },
  { questionId: 'js5', selectedAnswer: 'a', isCorrect: false, timeSpentSeconds: 38, identifiedMisconception: 'Confused Promise.all with Promise.allSettled' },
  { questionId: 'js6', selectedAnswer: 'a', isCorrect: true, timeSpentSeconds: 15 },
  { questionId: 'js7', selectedAnswer: 'a', isCorrect: true, timeSpentSeconds: 20 },
  { questionId: 'js8', selectedAnswer: 'a', isCorrect: true, timeSpentSeconds: 16 },
  { questionId: 'js9', selectedAnswer: 'b', isCorrect: false, timeSpentSeconds: 50, identifiedMisconception: 'Believed event loop alternates between microtask and macrotask queues' },
  { questionId: 'js10', selectedAnswer: 'let', isCorrect: true, timeSpentSeconds: 22 }
];
