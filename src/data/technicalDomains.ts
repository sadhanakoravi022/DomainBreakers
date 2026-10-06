import { DomainId, Question } from '../types';
import {
  JAVASCRIPT_QUESTIONS,
  PYTHON_QUESTIONS
} from './technicalQuestions';
import { DEMO_QUESTIONS } from './questions';

export interface TechnicalDomainConfig {
  id: DomainId;
  label: string;
  category: string;
  icon: string;
  gapConcept: string;
}

export const DOMAIN_GROUPS: { label: string; icon: string; domains: TechnicalDomainConfig[] }[] = [
  {
    label: 'Programming',
    icon: '💻',
    domains: [
      { id: 'python', label: 'Python', category: 'Programming', icon: '🐍', gapConcept: 'Python Fundamentals' },
      { id: 'python-core', label: 'Python Core & Mutability', category: 'Programming', icon: '🐍', gapConcept: 'Object References & Mutability' },
      { id: 'java', label: 'Java', category: 'Programming', icon: '☕', gapConcept: 'Java Fundamentals' },
      { id: 'c', label: 'C', category: 'Programming', icon: '💻', gapConcept: 'C Fundamentals' },
      { id: 'cpp', label: 'C++', category: 'Programming', icon: '💻', gapConcept: 'C++ Fundamentals' },
      { id: 'javascript', label: 'JavaScript', category: 'Programming', icon: '🟨', gapConcept: 'JavaScript Fundamentals' },
      { id: 'javascript-async', label: 'JavaScript & Async Engine', category: 'Programming', icon: '🟨', gapConcept: 'Async Event Loop & Microtasks' },
      { id: 'dsa', label: 'Data Structures & Algorithms', category: 'Programming', icon: '🧩', gapConcept: 'Data Structures & Algorithms' }
    ]
  },
  {
    label: 'Web Development',
    icon: '🌐',
    domains: [
      { id: 'html-css', label: 'HTML & CSS', category: 'Web Development', icon: '🌐', gapConcept: 'HTML & CSS Fundamentals' },
      { id: 'react', label: 'React', category: 'Web Development', icon: '⚛️', gapConcept: 'React Fundamentals' },
      { id: 'node', label: 'Node.js', category: 'Web Development', icon: '🟢', gapConcept: 'Node.js Fundamentals' },
      { id: 'backend', label: 'Backend Development', category: 'Web Development', icon: '⚙️', gapConcept: 'Backend Development' },
      { id: 'apis', label: 'APIs & Web Services', category: 'Web Development', icon: '🔌', gapConcept: 'APIs & Web Services' }
    ]
  },
  {
    label: 'Database',
    icon: '🗄️',
    domains: [
      { id: 'sql', label: 'SQL', category: 'Database', icon: '🗄️', gapConcept: 'SQL Querying' },
      { id: 'dbms', label: 'DBMS', category: 'Database', icon: '🗄️', gapConcept: 'Database Management' },
      { id: 'mongodb', label: 'MongoDB', category: 'Database', icon: '🍃', gapConcept: 'MongoDB Fundamentals' }
    ]
  },
  {
    label: 'AI & Data',
    icon: '🤖',
    domains: [
      { id: 'ai', label: 'Artificial Intelligence', category: 'AI & Data', icon: '🤖', gapConcept: 'Artificial Intelligence' },
      { id: 'machine-learning', label: 'Machine Learning', category: 'AI & Data', icon: '🤖', gapConcept: 'Machine Learning' },
      { id: 'data-science', label: 'Data Science', category: 'AI & Data', icon: '📊', gapConcept: 'Data Science' },
      { id: 'data-analytics', label: 'Data Analytics', category: 'AI & Data', icon: '📈', gapConcept: 'Data Analytics' }
    ]
  },
  {
    label: 'Computer Science',
    icon: '🖥️',
    domains: [
      { id: 'oop', label: 'Object-Oriented Programming', category: 'Computer Science', icon: '🧱', gapConcept: 'Object-Oriented Programming' },
      { id: 'operating-systems', label: 'Operating Systems', category: 'Computer Science', icon: '🖥️', gapConcept: 'Operating Systems' },
      { id: 'computer-networks', label: 'Computer Networks', category: 'Computer Science', icon: '🌐', gapConcept: 'Computer Networks' },
      { id: 'computer-architecture', label: 'Computer Architecture', category: 'Computer Science', icon: '🖥️', gapConcept: 'Computer Architecture' }
    ]
  },
  {
    label: 'Mathematics',
    icon: '📐',
    domains: [
      { id: 'algebra', label: 'Engineering Mathematics', category: 'Mathematics', icon: '📐', gapConcept: 'Quadratic Equations' },
      { id: 'probability-statistics', label: 'Probability & Statistics', category: 'Mathematics', icon: '📊', gapConcept: 'Probability & Statistics' },
      { id: 'linear-algebra', label: 'Linear Algebra', category: 'Mathematics', icon: '📐', gapConcept: 'Linear Algebra' }
    ]
  }
];

export const TECHNICAL_DOMAINS = DOMAIN_GROUPS.flatMap(group => group.domains);
export const getDomainConfig = (id: DomainId) => TECHNICAL_DOMAINS.find(domain => domain.id === id) || TECHNICAL_DOMAINS[0];

type QuestionSeed = {
  topic: string;
  difficulty: Question['difficulty'];
  question: string;
  correct: string;
  wrong: [string, string, string];
  explanation: string;
};

const seeds: Partial<Record<DomainId, QuestionSeed[]>> = {
  python: [
    { topic: 'Lists', difficulty: 'Beginner', question: 'Which list operation adds one item to the end of a Python list?', correct: 'items.append(value)', wrong: ['items.add(value)', 'items.push(value)', 'items.insertEnd(value)'], explanation: 'append adds one item to the end of a Python list.' },
    { topic: 'Dictionaries', difficulty: 'Medium', question: 'How do you safely read a possibly missing key "name" from a Python dictionary data?', correct: 'data.get("name")', wrong: ['data.fetch("name")', 'data.name', 'data.read("name")'], explanation: 'dict.get returns None (or a provided default) when the key is absent.' },
    { topic: 'Mutability', difficulty: 'Hard', question: 'What does assigning b = a do when a is a Python list?', correct: 'Both names refer to the same list object', wrong: ['It creates a deep copy', 'It creates a new list with copied values', 'It converts the list to a tuple'], explanation: 'Assignment binds another name to the same mutable list; it does not copy it.' }
  ],
  java: [
    { topic: 'Classes and Objects', difficulty: 'Beginner', question: 'What does the new keyword do when used with a Java class?', correct: 'Creates an object by invoking a constructor', wrong: ['Declares an interface', 'Imports a package', 'Makes a method static'], explanation: 'new creates an instance and calls its constructor.' },
    { topic: 'Inheritance', difficulty: 'Medium', question: 'Which keyword declares that a Java class inherits from another class?', correct: 'extends', wrong: ['implements', 'inherits', 'instanceof'], explanation: 'A class uses extends to inherit from a superclass.' },
    { topic: 'Interfaces', difficulty: 'Hard', question: 'How does a Java class declare that it provides an interface implementation?', correct: 'implements InterfaceName', wrong: ['extends InterfaceName', 'uses InterfaceName', 'inherits InterfaceName'], explanation: 'Classes implement interfaces with the implements keyword.' }
  ],
  c: [
    { topic: 'Variables', difficulty: 'Beginner', question: 'Which declaration creates an integer variable in C?', correct: 'int count = 3;', wrong: ['integer count = 3;', 'var count = 3;', 'number count = 3;'], explanation: 'int is the built-in C integer type.' },
    { topic: 'Pointers', difficulty: 'Medium', question: 'For int *p, what does *p mean in an expression?', correct: 'The value stored at the address held by p', wrong: ['The address of p itself', 'A multiplication operator only', 'The size of an integer'], explanation: 'Unary * dereferences a pointer to access its pointed-to value.' },
    { topic: 'Functions', difficulty: 'Hard', question: 'What must a C function return if its declared return type is int?', correct: 'An integer value on every path that returns', wrong: ['A pointer value', 'A string literal', 'No value'], explanation: 'A function declared int must return an integer result.' }
  ],
  cpp: [
    { topic: 'References', difficulty: 'Beginner', question: 'What is a C++ reference?', correct: 'An alias for an existing object', wrong: ['A dynamically allocated array', 'A copy of a class definition', 'A null pointer by default'], explanation: 'A reference is another name bound to an existing object.' },
    { topic: 'Vectors', difficulty: 'Medium', question: 'Which operation adds an element to the end of std::vector<int> values?', correct: 'values.push_back(4)', wrong: ['values.append(4)', 'values.add(4)', 'values.insert_end(4)'], explanation: 'std::vector uses push_back to append an element.' },
    { topic: 'Inheritance', difficulty: 'Hard', question: 'Which base-class method behavior enables runtime polymorphism in C++?', correct: 'A virtual method overridden by a derived class', wrong: ['A private non-virtual method', 'A global function with the same name', 'A static data member'], explanation: 'Virtual dispatch selects an overridden implementation at runtime.' }
  ],
  javascript: [
    { topic: 'Variables and Scope', difficulty: 'Beginner', question: 'Which declaration is block-scoped in JavaScript?', correct: 'let', wrong: ['var only', 'global', 'define'], explanation: 'let and const are block-scoped; var is function-scoped.' },
    { topic: 'Arrays', difficulty: 'Medium', question: 'What does [1, 2, 3].map(x => x * 2) return?', correct: '[2, 4, 6]', wrong: ['[1, 2, 3]', '6', 'undefined'], explanation: 'map creates a new array from the callback result for each item.' },
    { topic: 'Promises', difficulty: 'Hard', question: 'When does a Promise.then callback run relative to the current synchronous script?', correct: 'After the current script, as a microtask', wrong: ['Immediately before the next statement', 'Only after all timers', 'On a separate JavaScript thread'], explanation: 'Promise reactions are queued as microtasks and run after current synchronous work.' }
  ],
  dsa: [
    { topic: 'Stacks and Queues', difficulty: 'Beginner', question: 'Which principle does a stack follow?', correct: 'Last in, first out (LIFO)', wrong: ['First in, first out (FIFO)', 'Random access only', 'Smallest item first'], explanation: 'The most recently pushed stack item is popped first.' },
    { topic: 'Searching', difficulty: 'Medium', question: 'What condition does binary search require for its input array?', correct: 'The array is sorted', wrong: ['The array has an even length', 'All values are unique', 'The array contains only positive numbers'], explanation: 'Binary search discards half the search range based on sorted order.' },
    { topic: 'Time Complexity', difficulty: 'Hard', question: 'What is binary search time complexity on a sorted array of n items?', correct: 'O(log n)', wrong: ['O(n)', 'O(n log n)', 'O(1) for every input'], explanation: 'Each comparison halves the remaining search interval.' }
  ],
  'html-css': [
    { topic: 'Semantic HTML', difficulty: 'Beginner', question: 'Which element represents the main content of a page?', correct: '<main>', wrong: ['<span>', '<aside>', '<footer>'], explanation: '<main> identifies the central content unique to the page.' },
    { topic: 'Box Model', difficulty: 'Medium', question: 'Which CSS property includes padding and border in an element’s declared width?', correct: 'box-sizing: border-box', wrong: ['display: block', 'position: relative', 'overflow: hidden'], explanation: 'border-box includes content, padding, and border in the specified dimensions.' },
    { topic: 'Flexbox', difficulty: 'Hard', question: 'Which Flexbox property aligns items along the main axis?', correct: 'justify-content', wrong: ['align-content only', 'float', 'vertical-align'], explanation: 'justify-content distributes flex items along the main axis.' }
  ],
  react: [
    { topic: 'Components and Props', difficulty: 'Beginner', question: 'What are props used for in React?', correct: 'Passing data from a parent component to a child', wrong: ['Changing the DOM directly', 'Storing values between renders by mutation', 'Defining CSS selectors'], explanation: 'Props are inputs passed from parent to child components.' },
    { topic: 'useState', difficulty: 'Medium', question: 'What should a React component do to update state created by useState?', correct: 'Call the state setter function', wrong: ['Mutate the state variable directly', 'Edit the component function name', 'Call useEffect with no dependencies'], explanation: 'Calling the setter schedules a state update and rerender.' },
    { topic: 'useEffect', difficulty: 'Hard', question: 'When does useEffect with an empty dependency array normally run?', correct: 'After the component is first mounted', wrong: ['Before every render', 'Only when the component unmounts', 'After every state update forever'], explanation: 'An empty dependency array means the effect runs after initial mount.' }
  ],
  node: [
    { topic: 'Modules', difficulty: 'Beginner', question: 'Which built-in Node.js module provides file system operations?', correct: 'fs', wrong: ['pathlib', 'files', 'osfile'], explanation: 'The fs module provides file system APIs in Node.js.' },
    { topic: 'Express Middleware', difficulty: 'Medium', question: 'What is Express middleware commonly used to do?', correct: 'Run logic during the request-response cycle', wrong: ['Compile CSS in the browser', 'Create a database table automatically', 'Replace the Node.js event loop'], explanation: 'Middleware can inspect or modify requests/responses and pass control onward.' },
    { topic: 'Async Programming', difficulty: 'Hard', question: 'How should a rejected promise in an async route be handled?', correct: 'Catch or forward the error to error-handling middleware', wrong: ['Ignore it because promises retry automatically', 'Return it as a CSS response', 'Use setTimeout to suppress it'], explanation: 'Async failures must be caught or forwarded to the framework error handler.' }
  ],
  backend: [
    { topic: 'HTTP Requests', difficulty: 'Beginner', question: 'Which HTTP method is generally used to retrieve a resource?', correct: 'GET', wrong: ['PATCH', 'DELETE', 'CONNECT'], explanation: 'GET requests retrieve representations of resources.' },
    { topic: 'Authentication', difficulty: 'Medium', question: 'What should a backend do before storing a user password?', correct: 'Hash it with a suitable password-hashing algorithm', wrong: ['Store it as plain text', 'Encode it with Base64 only', 'Place it in a URL parameter'], explanation: 'Password hashes reduce exposure if stored credentials are disclosed.' },
    { topic: 'REST APIs', difficulty: 'Hard', question: 'What does an HTTP 404 response communicate?', correct: 'The requested resource was not found', wrong: ['The request succeeded with no body', 'The server is permanently unavailable', 'The client is unauthorized'], explanation: '404 indicates that the requested resource could not be found.' }
  ],
  apis: [
    { topic: 'HTTP Methods', difficulty: 'Beginner', question: 'Which status code commonly indicates that a resource was created successfully?', correct: '201 Created', wrong: ['301 Moved Permanently', '401 Unauthorized', '500 Internal Server Error'], explanation: '201 Created indicates successful creation of a resource.' },
    { topic: 'JSON', difficulty: 'Medium', question: 'Which is valid JSON for an object containing a name?', correct: '{"name":"Asha"}', wrong: ["{'name':'Asha'}", '{name:"Asha"}', 'name = "Asha"'], explanation: 'JSON requires double-quoted property names and string values.' },
    { topic: 'API Errors', difficulty: 'Hard', question: 'What should a useful API error response generally include?', correct: 'An appropriate status code and a clear, safe error message', wrong: ['A server stack trace with secrets', 'A success status for every failure', 'The user’s password'], explanation: 'Errors should be understandable to clients without exposing sensitive internals.' }
  ],
  sql: [
    { topic: 'SELECT and WHERE', difficulty: 'Beginner', question: 'Which clause filters rows before they are returned?', correct: 'WHERE', wrong: ['ORDER BY', 'GROUP BY', 'SELECT'], explanation: 'WHERE filters individual rows according to a condition.' },
    { topic: 'Aggregate Functions', difficulty: 'Medium', question: 'Which SQL function counts rows in a result?', correct: 'COUNT(*)', wrong: ['SUM(*)', 'TOTAL ROWS()', 'NUMBER(*)'], explanation: 'COUNT(*) returns the number of rows.' },
    { topic: 'JOIN', difficulty: 'Hard', question: 'What does an INNER JOIN return?', correct: 'Rows with matching join values in both tables', wrong: ['Every row from the left table regardless of match', 'Only rows with no match', 'A Cartesian product in all cases'], explanation: 'INNER JOIN retains rows that satisfy the join condition on both sides.' }
  ],
  dbms: [
    { topic: 'Keys', difficulty: 'Beginner', question: 'What does a primary key do in a relational table?', correct: 'Uniquely identifies each row', wrong: ['Allows duplicate row identifiers', 'Sorts rows automatically', 'Encrypts every column'], explanation: 'A primary key uniquely identifies a record in a table.' },
    { topic: 'Normalization', difficulty: 'Medium', question: 'Why is database normalization commonly used?', correct: 'To reduce redundant data and update anomalies', wrong: ['To store every value as an image', 'To remove all relationships', 'To make every query return one row'], explanation: 'Normalization organizes data to reduce duplication and modification anomalies.' },
    { topic: 'Transactions', difficulty: 'Hard', question: 'Which ACID property ensures a committed transaction survives a system failure?', correct: 'Durability', wrong: ['Isolation', 'Atomicity', 'Consistency'], explanation: 'Durability means committed changes persist despite failures.' }
  ],
  mongodb: [
    { topic: 'Documents', difficulty: 'Beginner', question: 'How does MongoDB primarily store records in a collection?', correct: 'As BSON documents', wrong: ['Only as rows with fixed columns', 'As HTML pages', 'As plain SQL statements'], explanation: 'MongoDB stores records as BSON documents in collections.' },
    { topic: 'Queries', difficulty: 'Medium', question: 'Which MongoDB method retrieves documents matching a filter?', correct: 'find()', wrong: ['selectRows()', 'whereAll()', 'lookupText()'], explanation: 'find(filter) returns documents that match the filter.' },
    { topic: 'Indexes', difficulty: 'Hard', question: 'What is a common purpose of a MongoDB index?', correct: 'Speeding up queries on indexed fields', wrong: ['Guaranteeing every query is faster', 'Replacing document validation', 'Encrypting the collection'], explanation: 'Indexes can improve read query speed for fields used in filters or sorting.' }
  ],
  ai: [
    { topic: 'Search Algorithms', difficulty: 'Beginner', question: 'What is a search algorithm in Artificial Intelligence used to do?', correct: 'Explore possible states to find a path or solution', wrong: ['Compress source code', 'Create a database key', 'Render a web page'], explanation: 'Search explores a state space to find a goal or solution.' },
    { topic: 'Knowledge Representation', difficulty: 'Medium', question: 'Why does an AI system use knowledge representation?', correct: 'To encode facts and relationships so they can be reasoned about', wrong: ['To increase image resolution', 'To replace all algorithms with SQL', 'To guarantee perfect predictions'], explanation: 'Knowledge representations let systems store facts and reason over relationships.' },
    { topic: 'Neural Networks', difficulty: 'Hard', question: 'What does a neural network learn during training?', correct: 'Parameters that reduce error on training examples', wrong: ['A fixed set of human-written answers only', 'The operating system version', 'The order of files on disk'], explanation: 'Training adjusts model parameters to reduce a chosen loss function.' }
  ],
  'machine-learning': [
    { topic: 'Supervised Learning', difficulty: 'Beginner', question: 'What data does supervised learning use during training?', correct: 'Examples paired with labels or target values', wrong: ['Only unlabelled examples', 'No examples at all', 'Only deployment logs'], explanation: 'Supervised learning learns from examples with known targets.' },
    { topic: 'Train and Test', difficulty: 'Medium', question: 'Why keep a test set separate from model training?', correct: 'To estimate performance on unseen data', wrong: ['To increase the training data labels', 'To choose a larger learning rate automatically', 'To remove all model errors'], explanation: 'A held-out test set provides an estimate of generalization.' },
    { topic: 'Overfitting', difficulty: 'Hard', question: 'Which result is a common sign of overfitting?', correct: 'High training accuracy but much lower test accuracy', wrong: ['Low accuracy on both sets always means overfitting', 'Identical predictions for all examples', 'A model with no parameters'], explanation: 'Overfit models memorize training patterns and generalize poorly.' }
  ],
  'data-science': [
    { topic: 'Data Cleaning', difficulty: 'Beginner', question: 'What is a common first step when preparing a messy dataset?', correct: 'Inspect and address missing or inconsistent values', wrong: ['Delete every column immediately', 'Train a model before checking data', 'Convert all values to images'], explanation: 'Data inspection helps identify missing values, duplicates, and inconsistencies.' },
    { topic: 'Pandas', difficulty: 'Medium', question: 'In pandas, what does DataFrame.head() show by default?', correct: 'The first five rows', wrong: ['The last five columns', 'Only missing values', 'A full statistical model'], explanation: 'head() displays the first five rows unless another count is provided.' },
    { topic: 'Correlation', difficulty: 'Hard', question: 'What does correlation between two variables establish by itself?', correct: 'An association, not necessarily causation', wrong: ['That one variable causes the other', 'That both variables are normally distributed', 'That the relationship is always linear and causal'], explanation: 'Correlation measures association and alone cannot establish cause.' }
  ],
  'data-analytics': [
    { topic: 'Mean, Median, Mode', difficulty: 'Beginner', question: 'Which measure is the middle value after observations are sorted?', correct: 'Median', wrong: ['Mean', 'Range', 'Variance'], explanation: 'The median is the central ordered value (or midpoint of two central values).' },
    { topic: 'Data Visualization', difficulty: 'Medium', question: 'Which chart is typically useful for comparing categories?', correct: 'Bar chart', wrong: ['Scatter plot only', 'Network packet trace', 'Database index'], explanation: 'Bar charts compare quantities across discrete categories.' },
    { topic: 'Correlation', difficulty: 'Hard', question: 'A strong correlation between two measurements means:', correct: 'They vary together, but causation is not proven', wrong: ['One must cause the other', 'Both have the same units', 'There are no outliers'], explanation: 'Correlation indicates association, not proof of causation.' }
  ],
  oop: [
    { topic: 'Encapsulation', difficulty: 'Beginner', question: 'What is encapsulation in object-oriented programming?', correct: 'Bundling state with methods and controlling access to it', wrong: ['Repeating code in every class', 'Sorting objects by memory address', 'Running every method in parallel'], explanation: 'Encapsulation combines data and behavior while controlling access to implementation details.' },
    { topic: 'Inheritance', difficulty: 'Medium', question: 'What does inheritance allow a class to do?', correct: 'Reuse or extend behavior from a base class', wrong: ['Turn every field into a constant', 'Avoid creating objects', 'Convert methods into database tables'], explanation: 'Inheritance lets derived classes reuse and specialize base-class behavior.' },
    { topic: 'Polymorphism', difficulty: 'Hard', question: 'What is polymorphism commonly used to achieve?', correct: 'Different implementations behind a shared interface', wrong: ['One object having no methods', 'Preventing method calls through a base type', 'Making every class identical'], explanation: 'Polymorphism allows a common interface to invoke type-specific behavior.' }
  ],
  'operating-systems': [
    { topic: 'Processes and Threads', difficulty: 'Beginner', question: 'What is a process?', correct: 'A running program with its own execution context', wrong: ['A single CPU instruction', 'A file system directory', 'A network cable'], explanation: 'A process is an executing program with its associated resources and state.' },
    { topic: 'CPU Scheduling', difficulty: 'Medium', question: 'What is the goal of CPU scheduling?', correct: 'Choose which ready task gets CPU time next', wrong: ['Choose which file is deleted', 'Assign IP addresses', 'Compile source code'], explanation: 'The scheduler selects a ready process or thread to run.' },
    { topic: 'Deadlocks', difficulty: 'Hard', question: 'What is a deadlock?', correct: 'Tasks wait indefinitely for resources held by one another', wrong: ['A process finishes normally', 'A disk has no free space', 'A thread runs faster than expected'], explanation: 'Deadlock is a circular wait where tasks cannot make progress.' }
  ],
  'computer-networks': [
    { topic: 'OSI Model', difficulty: 'Beginner', question: 'Which OSI layer is responsible for routing packets between networks?', correct: 'Network layer', wrong: ['Application layer', 'Presentation layer', 'Physical layer'], explanation: 'The network layer handles logical addressing and routing.' },
    { topic: 'TCP and UDP', difficulty: 'Medium', question: 'Which statement about TCP is correct?', correct: 'It provides reliable, ordered byte-stream delivery', wrong: ['It never retransmits lost data', 'It is always connectionless', 'It guarantees zero latency'], explanation: 'TCP provides reliable and ordered delivery through connection management and retransmission.' },
    { topic: 'DNS', difficulty: 'Hard', question: 'What does DNS commonly resolve?', correct: 'A domain name to an IP address', wrong: ['A password to a username', 'A file to a process', 'A port number to a MAC address only'], explanation: 'DNS maps domain names to records such as IP addresses.' }
  ],
  'computer-architecture': [
    { topic: 'CPU', difficulty: 'Beginner', question: 'What is the CPU primarily responsible for?', correct: 'Executing instructions and coordinating computation', wrong: ['Storing files permanently by itself', 'Routing internet traffic between networks', 'Displaying web page styles'], explanation: 'The CPU executes instructions and performs control and arithmetic operations.' },
    { topic: 'Memory Hierarchy', difficulty: 'Medium', question: 'Which is generally fastest and closest to the CPU core?', correct: 'CPU registers', wrong: ['Hard disk storage', 'Remote network storage', 'Optical media'], explanation: 'Registers are small, very fast storage locations inside the CPU.' },
    { topic: 'Cache', difficulty: 'Hard', question: 'Why does a CPU use cache memory?', correct: 'To keep frequently used data closer to the processor', wrong: ['To replace the instruction set', 'To make disk storage permanent', 'To assign network addresses'], explanation: 'Caches reduce average access time by storing recently or frequently used data near the CPU.' }
  ],
  'probability-statistics': [
    { topic: 'Probability', difficulty: 'Beginner', question: 'For a fair six-sided die, what is the probability of rolling a 3?', correct: '1/6', wrong: ['1/3', '1/2', '3/6'], explanation: 'One of six equally likely outcomes is a 3.' },
    { topic: 'Statistics', difficulty: 'Medium', question: 'What is the mean of 2, 4, and 6?', correct: '4', wrong: ['3', '6', '12'], explanation: 'The mean is (2 + 4 + 6) / 3 = 4.' },
    { topic: 'Conditional Probability', difficulty: 'Hard', question: 'What does P(A | B) represent?', correct: 'The probability of A given that B has occurred', wrong: ['The probability of A or B only', 'The probability that neither event occurs', 'The average of P(A) and P(B)'], explanation: 'Conditional probability describes event A under the condition that B occurred.' }
  ],
  'linear-algebra': [
    { topic: 'Vectors', difficulty: 'Beginner', question: 'What is the result of adding vectors (1, 2) and (3, 4)?', correct: '(4, 6)', wrong: ['(3, 8)', '(4, 8)', '(1, 6)'], explanation: 'Add corresponding components: (1 + 3, 2 + 4) = (4, 6).' },
    { topic: 'Matrices', difficulty: 'Medium', question: 'When can two matrices be added?', correct: 'When they have the same number of rows and columns', wrong: ['Only when both are square', 'Only when both have determinant 1', 'When the first has more columns'], explanation: 'Matrix addition is defined for matrices with matching dimensions.' },
    { topic: 'Linear Systems', difficulty: 'Hard', question: 'What does a unique solution to a square linear system correspond to?', correct: 'A coefficient matrix with nonzero determinant', wrong: ['A coefficient matrix with zero determinant always', 'A matrix containing only zeros', 'Any matrix with repeated rows'], explanation: 'A square matrix is invertible, and the system has a unique solution, when its determinant is nonzero.' }
  ]
};

const makeDomainQuestions = (domain: TechnicalDomainConfig, questions: QuestionSeed[]): Question[] =>
  questions.map((seed, index) => {
    const answerIndex = (index + domain.id.length) % 4;
    const optionTexts = [...seed.wrong];
    optionTexts.splice(answerIndex, 0, seed.correct);
    const options = optionTexts.map((text, optionIndex) => ({
      id: String.fromCharCode(97 + optionIndex),
      text
    }));

    return {
      id: `${domain.id}-${String(index + 1).padStart(3, '0')}`,
      domain: domain.id,
      question: seed.question,
      options,
      correctAnswer: options[answerIndex].id,
      topic: seed.topic,
      concept: domain.gapConcept,
      difficulty: seed.difficulty,
      type: 'MCQ',
      explanation: seed.explanation,
      misconceptionMap: Object.fromEntries(options
        .filter((_, optionIndex) => optionIndex !== answerIndex)
        .map((option, optionIndex) => [option.id, `A misunderstanding about ${seed.topic.toLowerCase()}. ${option.text}`]))
    };
  });

const existingQuestions: Partial<Record<DomainId, Question[]>> = {
  python: PYTHON_QUESTIONS,
  'python-core': PYTHON_QUESTIONS,
  javascript: JAVASCRIPT_QUESTIONS,
  'javascript-async': JAVASCRIPT_QUESTIONS,
  algebra: DEMO_QUESTIONS
};

export const getQuestionsForDomain = (domainId: DomainId): Question[] => {
  const domain = getDomainConfig(domainId);
  const existing = existingQuestions[domainId];
  const questions = existing
    ? existing.map(question => ({ ...question, domain: domainId }))
    : makeDomainQuestions(domain, seeds[domainId] || []);
  return questions.filter(question => question.domain === domainId);
};
