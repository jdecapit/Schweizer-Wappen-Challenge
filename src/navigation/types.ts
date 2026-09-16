import { CantonId } from '../data/cantons';

export type QuizMode = 'flagToName' | 'nameToFlag' | 'mixed';

export type RootStackParamList = {
  Home: undefined;
  Quiz: { mode: QuizMode; questionCount: number };
  Results: { score: number; total: number };
  Learn: { focusId?: CantonId } | undefined;
};
