import { ProgressState } from '../../types/progress';

export interface IProgressStorage {
  load(): Promise<ProgressState | null>;
  save(state: ProgressState): Promise<void>;
  clear(): Promise<void>;
}
