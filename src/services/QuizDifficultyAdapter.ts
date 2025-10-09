import { Difficulty } from '../types/progress';

export class QuizDifficultyAdapter {
  adaptDifficulty(currentDifficulty: Difficulty, wasCorrect: boolean): Difficulty {
    if (wasCorrect) {
      if (currentDifficulty === 'easy') return 'medium';
      if (currentDifficulty === 'medium') return 'hard';
      return 'hard';
    } else {
      if (currentDifficulty === 'hard') return 'medium';
      if (currentDifficulty === 'medium') return 'easy';
      return 'easy';
    }
  }
}
