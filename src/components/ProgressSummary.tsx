import { Card } from './Card';

interface ProgressSummaryProps {
  answeredCount: number;
  evaluatedCount: number;
  totalCount: number;
}

export const ProgressSummary = ({
  answeredCount,
  evaluatedCount,
  totalCount,
}: ProgressSummaryProps) => {
  const progress = Math.round((answeredCount / totalCount) * 100);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">진행 현황</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{progress}% 완료</p>
        </div>
        <div className="min-w-[140px] flex-1">
          <div className="h-2 rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-brand-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-xs text-slate-500">
            <span>작성 {answeredCount}/{totalCount}</span>
            <span>채점 {evaluatedCount}/{totalCount}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
