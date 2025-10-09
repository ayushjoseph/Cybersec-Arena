import { ProgressState } from '../types/progress';

export class ProgressCalculationService {
  calculateOverallPercent(state: ProgressState): number {
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

  calculateOverallScore(state: ProgressState): number {
    return (
      state.ctf.solvedIds.length * 100 +
      state.phish.solvedIds.length * 150 +
      state.code.solvedIds.length * 150 +
      state.quiz.correct * 80 +
      state.firewall.bestScore * 20
    );
  }
}
