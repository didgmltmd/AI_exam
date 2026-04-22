export interface Feedback {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  rewrittenAnswer: string;
  raw?: string;
}

export interface QuestionSeed {
  id: number;
  question: string;
  hintKeywords: string[];
}

export interface QuestionState extends QuestionSeed {
  answer: string;
  feedback?: Feedback;
  isFeedbackHidden: boolean;
  lastSavedAt?: string;
  lastEvaluatedAt?: string;
}

export interface AppState {
  apiKey: string;
  questions: QuestionState[];
  currentQuestionId: number;
}

export interface EvaluationResult {
  feedback: Feedback;
  raw: string;
}

export interface PracticeSession {
  questionId: number;
  answer: string;
  feedback?: Feedback;
  isFeedbackHidden: boolean;
  lastEvaluatedAt?: string;
}
