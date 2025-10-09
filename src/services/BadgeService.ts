import { ProgressState } from '../types/progress';

export interface BadgeRule {
  id: string;
  condition: (state: ProgressState) => boolean;
}

export class BadgeService {
  private rules: BadgeRule[] = [
    {
      id: 'First Blood',
      condition: (state) => state.ctf.solvedIds.length >= 1,
    },
    {
      id: 'Phish Whisperer',
      condition: (state) => state.phish.solvedIds.length >= 3,
    },
    {
      id: 'Secure Coder',
      condition: (state) => state.code.solvedIds.length >= 3,
    },
    {
      id: 'Quiz Novice',
      condition: (state) => state.quiz.correct >= 5,
    },
    {
      id: 'Network Guardian',
      condition: (state) => state.firewall.bestScore >= 20,
    },
  ];

  computeBadges(state: ProgressState, existingBadges: string[] = []): string[] {
    const badges = new Set<string>(existingBadges);

    for (const rule of this.rules) {
      if (rule.condition(state)) {
        badges.add(rule.id);
      }
    }

    return Array.from(badges);
  }

  addCustomRule(rule: BadgeRule): void {
    this.rules.push(rule);
  }

  getRules(): BadgeRule[] {
    return [...this.rules];
  }
}
