import type { QuestionState } from '../types/app';
import { Button } from './Button';
import { Card } from './Card';
import { AnswerEditor } from './AnswerEditor';
import { FeedbackPanel } from './FeedbackPanel';

interface QuestionCardProps {
  question: QuestionState;
  isSubmitting: boolean;
  errorMessage: string | null;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
  onResetQuestion: () => void;
  onToggleFeedbackHidden: () => void;
}

export const QuestionCard = ({
  question,
  isSubmitting,
  errorMessage,
  onAnswerChange,
  onSubmit,
  onResetQuestion,
  onToggleFeedbackHidden,
}: QuestionCardProps) => (
  <div className="grid gap-4 xl:h-full xl:max-h-full xl:min-h-0 xl:overflow-hidden 2xl:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]">
    <Card className="flex flex-col space-y-5 overflow-hidden xl:h-full xl:max-h-full xl:min-h-0">
      <div className="shrink-0 space-y-2">
        <p className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
          문제 {question.id}
        </p>
        <h2 className="text-xl font-bold leading-tight text-slate-950 sm:text-2xl">
          {question.question}
        </h2>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <AnswerEditor answer={question.answer} onChange={onAnswerChange} />
      </div>

      {errorMessage && (
        <div className="shrink-0 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
          {errorMessage}
        </div>
      )}

      <div className="shrink-0 flex flex-wrap items-center gap-3">
        <Button onClick={onSubmit} disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? '채점 중...' : '현재 답안 채점'}
        </Button>
        <Button
          variant="ghost"
          onClick={onResetQuestion}
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          이 문제 초기화
        </Button>
        <p className="w-full text-xs text-slate-400 xl:w-auto">
          현재 문제만 OpenAI API로 전송됩니다. 제출 후 피드백은 자동 저장됩니다.
        </p>
      </div>
    </Card>

    <FeedbackPanel
      feedback={question.feedback}
      hidden={question.isFeedbackHidden}
      hintKeywords={question.hintKeywords}
      lastEvaluatedAt={question.lastEvaluatedAt}
      isLoading={isSubmitting}
      onToggleHidden={onToggleFeedbackHidden}
    />
  </div>
);
