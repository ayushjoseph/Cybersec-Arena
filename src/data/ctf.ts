export type CTFTask = {
  id: string;
  title: string;
  category: 'Web' | 'Cryptography' | 'Forensics' | 'Reverse' | 'Binary';
  difficulty: 'easy' | 'medium';
  prompt: string;
  flag: string; // expected exact match, demo only
};

export const CTF_TASKS: CTFTask[] = [
  {
    id: 'web-hello',
    title: 'Hidden in HTML',
    category: 'Web',
    difficulty: 'easy',
    prompt: 'View page source and find the hidden flag in a comment. Flag format: CSA{...}',
    flag: 'CSA{view_source}',
  },
  {
    id: 'crypto-caesar',
    title: 'Caesar Shift',
    category: 'Cryptography',
    difficulty: 'easy',
    prompt: 'Decrypt "KHOOR" with a Caesar shift of 3. Flag format: CSA{plaintext}',
    flag: 'CSA{HELLO}',
  },
  {
    id: 'forensics-hex',
    title: 'Hex Dump Secret',
    category: 'Forensics',
    difficulty: 'easy',
    prompt: 'A file contains ASCII in a hex dump. Convert and extract the message. Flag format: CSA{message}',
    flag: 'CSA{HEX2ASCII}',
  },
  {
    id: 'reverse-func',
    title: 'Function Mystery',
    category: 'Reverse',
    difficulty: 'medium',
    prompt: 'A function returns 1337 when given input xyz. Discover the constant. Flag format: CSA{1337}',
    flag: 'CSA{1337}',
  },
  {
    id: 'bin-endian',
    title: 'Endian Enigma',
    category: 'Binary',
    difficulty: 'medium',
    prompt: 'A 32-bit integer in little endian reads as 0x78563412. Provide the decimal. Flag format: CSA{305419896}',
    flag: 'CSA{305419896}',
  },
];
