import { useEffect, useMemo, useState } from 'react';
import { useProgress } from '../lib/progress';
import { QUIZ_QUESTIONS } from '../data/quiz';

export default function AICyberQuizBot() {
  const { state, recordQuiz } = useProgress();
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [qid, setQid] = useState<string>('');

  const pool = useMemo(() => QUIZ_QUESTIONS.filter((q) => q.difficulty === state.quiz.difficulty), [state.quiz.difficulty]);

  useEffect(() => {
    // pick a question when entering or on difficulty change
    const q = pool[Math.floor(Math.random() * pool.length)];
    if (q) setQid(q.id);
    setSelected(null);
    setSubmitted(false);
  }, [pool]);

  const q = useMemo(() => QUIZ_QUESTIONS.find((x) => x.id === qid), [qid]);

  const submit = () => {
    if (!q || selected == null) return;
    const correct = selected === q.answer;
    recordQuiz(correct);
    setSubmitted(true);
  };

  const next = () => {
    const qn = pool[Math.floor(Math.random() * pool.length)];
    if (qn) {
      setQid(qn.id);
      setSelected(null);
      setSubmitted(false);
    }
  };

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold text-cyan-300">AI Cyber QuizBot</h1>
      <p className="text-slate-400">Adaptive quiz with explanations tailored to your level.</p>

      <div className="border border-slate-800 rounded-lg p-4 bg-white/[0.03] space-y-2">
        <div className="text-xs text-slate-400">Difficulty: <span className="text-cyan-300">{state.quiz.difficulty}</span> • Correct: {state.quiz.correct}/{state.quiz.answered}</div>
        {q ? (
          <>
            <div className="font-semibold text-fuchsia-300">{q.prompt}</div>
            <div className="grid sm:grid-cols-2 gap-2">
              {q.choices.map((c, idx) => (
                <label key={idx} className={`flex items-center gap-2 p-2 rounded border ${selected === idx ? 'border-cyan-400/40 bg-cyan-500/10' : 'border-slate-800 bg-black/30'}`}>
                  <input type="radio" name="quiz" checked={selected === idx} onChange={() => setSelected(idx)} />
                  <span className="text-sm">{c}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={submit} disabled={submitted || selected == null} className="px-3 py-1 text-sm rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">Submit</button>
              <button onClick={next} className="px-3 py-1 text-sm rounded bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-400/30">Next</button>
            </div>
            {submitted && (
              <div className="text-xs text-slate-400">Explanation: {q.explain}</div>
            )}
          </>
        ) : (
          <div className="text-sm text-slate-400">No questions found for this difficulty.</div>
        )}
      </div>
    </div>
  );
}
