import { QUESTIONS } from '../data/questions';
import { STORAGE_KEY } from './constants';
import type { AppState, QuestionState } from '../types/app';

const createDefaultQuestions = (): QuestionState[] =>
  QUESTIONS.map((item) => ({
    ...item,
    answer: '',
    isFeedbackHidden: false,
  }));

export const createDefaultAppState = (): AppState => ({
  apiKey: '',
  questions: createDefaultQuestions(),
  currentQuestionId: QUESTIONS[0].id,
});

const normalizeState = (input: unknown): AppState => {
  const fallback = createDefaultAppState();

  if (!input || typeof input !== 'object') {
    return fallback;
  }

  const raw = input as Partial<AppState>;
  const questionMap = new Map(
    Array.isArray(raw.questions) ? raw.questions.map((item) => [item.id, item]) : [],
  );

  return {
    apiKey: typeof raw.apiKey === 'string' ? raw.apiKey : '',
    currentQuestionId:
      typeof raw.currentQuestionId === 'number' &&
      QUESTIONS.some((item) => item.id === raw.currentQuestionId)
        ? raw.currentQuestionId
        : fallback.currentQuestionId,
    questions: QUESTIONS.map((seed) => {
      const saved = questionMap.get(seed.id);
      return {
        ...seed,
        answer: typeof saved?.answer === 'string' ? saved.answer : '',
        feedback: saved?.feedback,
        isFeedbackHidden: typeof saved?.isFeedbackHidden === 'boolean' ? saved.isFeedbackHidden : false,
        lastSavedAt: typeof saved?.lastSavedAt === 'string' ? saved.lastSavedAt : undefined,
        lastEvaluatedAt:
          typeof saved?.lastEvaluatedAt === 'string' ? saved.lastEvaluatedAt : undefined,
      };
    }),
  };
};

export const loadAppState = (): AppState => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? normalizeState(JSON.parse(raw)) : createDefaultAppState();
  } catch {
    return createDefaultAppState();
  }
};

export const saveAppState = (state: AppState): boolean => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
};

export const resetAppState = (): AppState => {
  const next = createDefaultAppState();
  saveAppState(next);
  return next;
};
