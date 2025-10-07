export type CodeChallenge = {
  id: string;
  title: string;
  snippet: string;
  question: string;
  options: string[];
  answer: number;
};

export const CODE_CHALLENGES: CodeChallenge[] = [
  {
    id: 'sql-injection',
    title: 'Prevent SQL Injection',
    snippet: `// Node.js (insecure)
app.get('/user', async (req, res) => {
  const id = req.query.id; // e.g. "1 OR 1=1"
  const rows = await db.query("SELECT * FROM users WHERE id = " + id);
  res.json(rows);
});`,
    question: 'What is the best fix?',
    options: [
      'Sanitize by removing keywords like OR, SELECT',
      'Use parameterized queries/prepared statements',
      'Escape all quotes using string replace',
      'Validate id with regex and proceed with string concat',
    ],
    answer: 1,
  },
  {
    id: 'xss-escape',
    title: 'Prevent XSS in output',
    snippet: `// React (insecure)
<div dangerouslySetInnerHTML={{ __html: user.bio }} />`,
    question: 'What prevents XSS?',
    options: [
      'Use DOMPurify/sanitization before setting innerHTML',
      'Use eval() to parse the HTML',
      'Wrap in <pre> tags',
      'Set Content-Type to text/plain only',
    ],
    answer: 0,
  },
  {
    id: 'crypto-hash',
    title: 'Store Passwords Securely',
    snippet: `// Insecure: MD5 without salt
const hash = md5(password);`,
    question: 'Best practice?',
    options: [
      'Use bcrypt/argon2 with salt and work factor',
      'Encrypt with AES and store key nearby',
      'Base64 encode and store',
      'SHA1 is sufficient today',
    ],
    answer: 0,
  },
];
