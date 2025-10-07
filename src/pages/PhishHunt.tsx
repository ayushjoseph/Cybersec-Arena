import { useState } from 'react';
import { useProgress } from '../lib/progress';
import { PHISH_EMAILS } from '../data/phish';

export default function PhishHunt() {
  const { state, markPhishSolved } = useProgress();
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  const answer = (id: string, guessPhish: boolean, actual: boolean, hint: string) => {
    if (guessPhish === actual) {
      setFeedback((f) => ({ ...f, [id]: 'Correct!' }));
      markPhishSolved(id);
    } else {
      setFeedback((f) => ({ ...f, [id]: `Not quite. Hint: ${hint}` }));
    }
  };

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold text-cyan-300">Phish Hunt</h1>
      <p className="text-slate-400">Analyze emails, detect phishing links, and learn social engineering tells.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {PHISH_EMAILS.map((m) => {
          const solved = state.phish.solvedIds.includes(m.id);
          return (
            <div key={m.id} className="border border-slate-800 rounded-lg p-4 bg-white/[0.03] space-y-2">
              <div className="text-xs text-slate-400">From: {m.from}</div>
              <div className="font-semibold text-fuchsia-300">{m.subject}</div>
              <p className="text-sm text-slate-300">{m.body}</p>
              <div className="flex gap-2">
                <button
                  disabled={solved}
                  onClick={() => answer(m.id, true, m.isPhish, m.hint)}
                  className="px-3 py-1 text-sm rounded bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-400/30"
                >Phish</button>
                <button
                  disabled={solved}
                  onClick={() => answer(m.id, false, m.isPhish, m.hint)}
                  className="px-3 py-1 text-sm rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/30"
                >Legit</button>
              </div>
              {solved ? (
                <div className="text-xs text-cyan-300">Solved ✓</div>
              ) : (
                feedback[m.id] && <div className="text-xs text-slate-400">{feedback[m.id]}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
