import { CANTONS, Canton, CantonId } from './cantons';
import { QuizMode } from '../navigation/types';

export interface QuizQuestion {
  type: 'flagToName' | 'nameToFlag';
  answer: Canton;
  options: Canton[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(answerId: CantonId, count: number): Canton[] {
  const pool = CANTONS.filter((c) => c.id !== answerId);
  return shuffle(pool).slice(0, count);
}

export function buildQuiz(mode: QuizMode, questionCount: number): QuizQuestion[] {
  const order = shuffle(CANTONS).slice(0, Math.min(questionCount, CANTONS.length));
  return order.map((answer) => {
    const type: 'flagToName' | 'nameToFlag' =
      mode === 'mixed' ? (Math.random() < 0.5 ? 'flagToName' : 'nameToFlag') : mode;
    const distractors = pickDistractors(answer.id, 3);
    const options = shuffle([answer, ...distractors]);
    return { type, answer, options };
  });
}
