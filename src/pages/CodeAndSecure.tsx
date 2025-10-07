import { useState } from 'react';
import { CODE_CHALLENGES } from '../data/code';
import { useProgress } from '../lib/progress';

export default function CodeAndSecure() {
  const { state, markCodeSolved } = useProgress();
  const [choice, setChoice] = useState<Record<string, number | null>>({});
  const [showExplain, setShowExplain] = useState<Record<string, boolean>>({});

  const submit = (id: string, answer: number) => {
    const c = choice[id];
    if (c === answer) {
      markCodeSolved(id);
    }
    setShowExplain((s) => ({ ...s, [id]: true }));
  };

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold text-cyan-300">Code & Secure</h1>
      <p className="text-slate-400">Fix vulnerable code and learn best practices (SQLi, XSS, etc.).</p>
      <div className="space-y-4">
        {CODE_CHALLENGES.map((q) => {
          const solved = state.code.solvedIds.includes(q.id);
          return (
            <div key={q.id} className="border border-slate-800 rounded-lg p-4 bg-white/[0.03]">
              <div className="font-semibold text-fuchsia-300">{q.title}</div>
              <pre className="mt-2 p-3 rounded bg-black/40 border border-slate-800 text-xs overflow-auto"><code>{q.snippet}</code></pre>
              <div className="mt-2 text-sm text-slate-300">{q.question}</div>
              <div className="mt-2 grid sm:grid-cols-2 gap-2">
                {q.options.map((opt, idx) => (
                  <label key={idx} className={`flex items-center gap-2 p-2 rounded border ${choice[q.id] === idx ? 'border-cyan-400/40 bg-cyan-500/10' : 'border-slate-800 bg-black/30'}`}>
                    <input
                      type="radio"
                      name={q.id}
                      disabled={solved}
                      checked={choice[q.id] === idx}
                      onChange={() => setChoice((c) => ({ ...c, [q.id]: idx }))}
                    />
                    <span className="text-sm">{opt}</span>
                  </label>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <button
                  disabled={solved || choice[q.id] == null}
                  onClick={() => submit(q.id, q.answer)}
                  className="px-3 py-1 text-sm rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/30"
                >Check Answer</button>
                {solved && <span className="text-xs text-cyan-300">Correct ✓</span>}
              </div>
              {showExplain[q.id] && (
                <div className="mt-2 text-xs text-slate-400">Explanation: {q.options[q.answer]}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
