import { useMemo } from 'react';
import { useProgress, overallScore } from '../lib/progress';

export default function Leaderboard() {
  const { state } = useProgress();
  const youScore = overallScore(state);
  const rows = useMemo(() => {
    const base = [
      { name: 'ZeroDayZ', score: 4200 },
      { name: 'CryptoCat', score: 3600 },
      { name: 'ForensicFox', score: 2900 },
    ];
    const merged = [...base, { name: 'You', score: youScore }];
    return merged.sort((a, b) => b.score - a.score);
  }, [youScore]);

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold text-cyan-300">Leaderboard</h1>
      <div className="border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.06]">
            <tr className="text-left">
              <th className="px-4 py-2">Player</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className={`odd:bg-white/[0.02] ${r.name === 'You' ? 'bg-cyan-500/10' : ''}`}>
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">{r.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
