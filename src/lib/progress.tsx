import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type ProgressState = {
  ctf: { solvedIds: string[] };
  phish: { solvedIds: string[] };
  code: { solvedIds: string[] };
  quiz: { answered: number; correct: number; difficulty: Difficulty };
  firewall: { bestScore: number };
  badges: string[];
};

export const defaultProgress: ProgressState = {
  ctf: { solvedIds: [] },
  phish: { solvedIds: [] },
  code: { solvedIds: [] },
  quiz: { answered: 0, correct: 0, difficulty: 'easy' },
  firewall: { bestScore: 0 },
  badges: [],
};

const STORAGE_KEY = 'cybersec_arena_progress_v1';

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return { ...defaultProgress, ...parsed } as ProgressState;
  } catch {
    return defaultProgress;
  }
}

function save(state: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function computeBadges(state: ProgressState): string[] {
  const badges = new Set<string>(state.badges);
  if (state.ctf.solvedIds.length >= 1) badges.add('First Blood');
  if (state.phish.solvedIds.length >= 3) badges.add('Phish Whisperer');
  if (state.code.solvedIds.length >= 3) badges.add('Secure Coder');
  if (state.quiz.correct >= 5) badges.add('Quiz Novice');
  if (state.firewall.bestScore >= 20) badges.add('Network Guardian');
  return Array.from(badges);
}

export function overallPercent(state: ProgressState) {
  // crude aggregation: each domain contributes equally up to 100%
  const parts = [
    Math.min(100, state.ctf.solvedIds.length * 10),
    Math.min(100, state.phish.solvedIds.length * 20),
    Math.min(100, state.code.solvedIds.length * 20),
    Math.min(100, state.quiz.correct * 10),
    Math.min(100, state.firewall.bestScore * 5),
  ];
  const avg = parts.reduce((a, b) => a + b, 0) / parts.length;
  return Math.round(avg);
}

export function overallScore(state: ProgressState) {
  return (
    state.ctf.solvedIds.length * 100 +
    state.phish.solvedIds.length * 150 +
    state.code.solvedIds.length * 150 +
    state.quiz.correct * 80 +
    state.firewall.bestScore * 20
  );
}

export type ProgressContextType = {
  state: ProgressState;
  setState: React.Dispatch<React.SetStateAction<ProgressState>>;
  markCTFSolved: (id: string) => void;
  markPhishSolved: (id: string) => void;
  markCodeSolved: (id: string) => void;
  recordQuiz: (correct: boolean) => void;
  setFirewallBest: (score: number) => void;
  reset: () => void;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => load());

  useEffect(() => {
    const next = { ...state, badges: computeBadges(state) };
    save(next);
  }, [state]);

  const api = useMemo<ProgressContextType>(() => ({
    state,
    setState,
    markCTFSolved: (id) => setState((s) => ({ ...s, ctf: { solvedIds: Array.from(new Set([...s.ctf.solvedIds, id])) } })),
    markPhishSolved: (id) => setState((s) => ({ ...s, phish: { solvedIds: Array.from(new Set([...s.phish.solvedIds, id])) } })),
    markCodeSolved: (id) => setState((s) => ({ ...s, code: { solvedIds: Array.from(new Set([...s.code.solvedIds, id])) } })),
    recordQuiz: (correct) => setState((s) => {
      const answered = s.quiz.answered + 1;
      const correctCount = s.quiz.correct + (correct ? 1 : 0);
      // naive adaptation: increase difficulty if two in a row correct
      let nextDiff: Difficulty = s.quiz.difficulty;
      if (correct && s.quiz.difficulty === 'easy') nextDiff = 'medium';
      else if (correct && s.quiz.difficulty === 'medium') nextDiff = 'hard';
      else if (!correct && s.quiz.difficulty === 'hard') nextDiff = 'medium';
      else if (!correct && s.quiz.difficulty === 'medium') nextDiff = 'easy';
      return { ...s, quiz: { answered, correct: correctCount, difficulty: nextDiff } };
    }),
    setFirewallBest: (score) => setState((s) => ({ ...s, firewall: { bestScore: Math.max(s.firewall.bestScore, score) } })),
    reset: () => setState(defaultProgress),
  }), [state]);

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
