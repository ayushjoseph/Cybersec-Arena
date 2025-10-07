export type QuizQuestion = {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prompt: string;
  choices: string[];
  answer: number;
  explain: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-pwd-1',
    difficulty: 'easy',
    prompt: 'Which is a strong authentication control?',
    choices: ['MFA', 'Shared passwords', 'Plaintext storage', 'Security through obscurity'],
    answer: 0,
    explain: 'MFA adds a second factor, greatly reducing account takeover risk.',
  },
  {
    id: 'q-input-1',
    difficulty: 'easy',
    prompt: 'What helps prevent SQL injection?',
    choices: ['Parameterized queries', 'String concatenation', 'Dynamic SQL with user input', 'Disabling errors'],
    answer: 0,
    explain: 'Parameterized queries prevent untrusted input from changing query structure.',
  },
  {
    id: 'q-xss-1',
    difficulty: 'medium',
    prompt: 'To mitigate XSS in rich text, you should:',
    choices: ['Sanitize HTML', 'Use eval()', 'Rely on CSP alone', 'Trust user input'],
    answer: 0,
    explain: 'Sanitize untrusted HTML and prefer safe rendering patterns; CSP complements.',
  },
  {
    id: 'q-net-1',
    difficulty: 'medium',
    prompt: 'Which network control detects intrusions by pattern matching?',
    choices: ['IDS', 'WAF', 'NAT', 'CDN'],
    answer: 0,
    explain: 'IDS inspects traffic for known attack signatures and anomalies.',
  },
  {
    id: 'q-crypto-1',
    difficulty: 'hard',
    prompt: 'Which property ensures a message cannot be altered undetected?',
    choices: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'],
    answer: 1,
    explain: 'Integrity means modifications are detectable (e.g., MAC/HMAC).',
  },
  {
    id: 'q-threat-1',
    difficulty: 'hard',
    prompt: 'A supply-chain attack most likely compromises:',
    choices: ['User passwords', 'Third-party dependency', 'TLS certificates only', 'Browser cache'],
    answer: 1,
    explain: 'Attackers compromise dependencies or build systems to spread malicious updates.',
  },
];
