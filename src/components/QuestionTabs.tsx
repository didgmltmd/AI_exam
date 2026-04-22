import { cn } from '../utils/cn';

interface QuestionTabsProps {
  currentQuestionId: number;
  answeredIds: number[];
  evaluatedIds: number[];
  onSelect: (id: number) => void;
}

export const QuestionTabs = ({
  currentQuestionId,
  answeredIds,
  evaluatedIds,
  onSelect,
}: QuestionTabsProps) => (
  <div className="scrollbar-hidden flex gap-2 overflow-x-auto pb-1">
    {Array.from({ length: 10 }, (_, index) => index + 1).map((id) => {
      const answered = answeredIds.includes(id);
      const evaluated = evaluatedIds.includes(id);

      return (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className={cn(
            'flex min-w-[52px] items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition',
            currentQuestionId === id
              ? 'bg-brand-500 text-white shadow-sm'
              : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50',
          )}
          aria-label={`${id}번 문제로 이동`}
        >
          <span>{id}</span>
          <span
            className={cn(
              'ml-2 h-2.5 w-2.5 rounded-full',
              evaluated ? 'bg-emerald-400' : answered ? 'bg-amber-400' : 'bg-slate-200',
            )}
          />
        </button>
      );
    })}
  </div>
);
