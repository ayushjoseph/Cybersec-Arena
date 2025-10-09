import { IProgressStorage } from './IProgressStorage';
import { ProgressState, defaultProgress } from '../../types/progress';

export class LocalStorageService implements IProgressStorage {
  private readonly storageKey: string;

  constructor(storageKey: string = 'cybersec_arena_progress_v1') {
    this.storageKey = storageKey;
  }

  async load(): Promise<ProgressState | null> {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return { ...defaultProgress, ...parsed } as ProgressState;
    } catch (error) {
      console.error('Failed to load progress from localStorage:', error);
      return null;
    }
  }

  async save(state: ProgressState): Promise<void> {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save progress to localStorage:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Failed to clear progress from localStorage:', error);
      throw error;
    }
  }
}
