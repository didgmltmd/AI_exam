import { useEffect, useMemo } from 'react';
import type { QuestionState } from '../types/app';
import { Button } from './Button';
import { QuestionCard } from './QuestionCard';

interface QuestionCarouselProps {
  questions: QuestionState[];
  currentQuestionId: number;
  isSubmitting: boolean;
  errorMessage: string | null;
  onSelectQuestion: (id: number) => void;
  onAnswerChange: (id: number, value: string) => void;
  onSubmit: (id: number) => void;
  onToggleFeedbackHidden: (id: number) => void;
}

export const QuestionCarousel = ({
  questions,
  currentQuestionId,
  isSubmitting,
  errorMessage,
  onSelectQuestion,
  onAnswerChange,
  onSubmit,
  onToggleFeedbackHidden,
}: QuestionCarouselProps) => {
  const currentIndex = useMemo(
    () => questions.findIndex((item) => item.id === currentQuestionId),
    [questions, currentQuestionId],
  );

  const currentQuestion = questions[currentIndex] ?? questions[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectQuestion(questions[currentIndex - 1].id);
      }
      if (event.key === 'ArrowRight' && currentIndex < questions.length - 1) {
        onSelectQuestion(questions[currentIndex + 1].id);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentIndex, onSelectQuestion, questions]);

  return (
    <section className="flex h-full min-h-0 flex-1 flex-col space-y-3 overflow-hidden">
      <div className="shrink-0 flex items-center justify-between">
        <p className="text-lg font-bold text-slate-950">
          {currentIndex + 1} / {questions.length}
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => currentIndex > 0 && onSelectQuestion(questions[currentIndex - 1].id)}
            disabled={currentIndex === 0}
          >
            이전
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              currentIndex < questions.length - 1 &&
              onSelectQuestion(questions[currentIndex + 1].id)
            }
            disabled={currentIndex === questions.length - 1}
          >
            다음
          </Button>
        </div>
      </div>

      <div key={currentQuestion.id} className="animate-card-fade min-h-0 flex-1 overflow-hidden">
        <QuestionCard
          question={currentQuestion}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          onAnswerChange={(value) => onAnswerChange(currentQuestion.id, value)}
          onSubmit={() => onSubmit(currentQuestion.id)}
          onToggleFeedbackHidden={() => onToggleFeedbackHidden(currentQuestion.id)}
        />
      </div>
    </section>
  );
};
