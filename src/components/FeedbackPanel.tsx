import { useState } from 'react';
import type { Feedback } from '../types/app';
import { formatDateTime } from '../utils/format';
import { Button } from './Button';
import { Card } from './Card';
import { EmptyState } from './EmptyState';

interface FeedbackPanelProps {
  feedback?: Feedback;
  hidden: boolean;
  hintKeywords: string[];
  lastEvaluatedAt?: string;
  isLoading: boolean;
  onToggleHidden: () => void;
}

const Section = ({ title, items }: { title: string; items: string[] }) => (
  <div className="space-y-2">
    <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
    {items.length > 0 ? (
      <ul className="space-y-1 text-sm leading-6 text-slate-600">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="rounded-xl bg-slate-50 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-slate-400">표시할 내용이 없습니다.</p>
    )}
  </div>
);

export const FeedbackPanel = ({
  feedback,
  hidden,
  hintKeywords,
  lastEvaluatedAt,
  isLoading,
  onToggleHidden,
}: FeedbackPanelProps) => {
  const [isHintOpen, setIsHintOpen] = useState(false);

  return (
    <Card className="flex h-full max-h-full min-h-0 flex-col space-y-4 overflow-hidden">
      <div className="shrink-0 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">AI 채점 결과</p>
          <h3 className="text-xl font-bold text-slate-950">피드백 카드</h3>
          <p className="mt-1 text-xs text-slate-400">최근 채점 시각: {formatDateTime(lastEvaluatedAt)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setIsHintOpen((prev) => !prev)}>
            {isHintOpen ? '힌트 닫기' : '힌트 보기'}
          </Button>
          <Button variant="secondary" onClick={onToggleHidden}>
            {hidden ? '보기' : '가리기'}
          </Button>
        </div>
      </div>

      <div
        className={`shrink-0 overflow-hidden rounded-2xl bg-brand-50 transition-all duration-200 ease-out ${
          isHintOpen ? 'max-h-40 opacity-100 ring-1 ring-brand-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4">
          <p className="text-sm font-semibold text-brand-900">핵심 키워드 힌트</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {hintKeywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-8 w-24 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
            <div className="grid gap-3 md:grid-cols-2">
              <div className="h-24 animate-pulse rounded-2xl bg-slate-100" />
              <div className="h-24 animate-pulse rounded-2xl bg-slate-100" />
            </div>
          </div>
        ) : !feedback ? (
          <EmptyState
            title="아직 채점 결과가 없습니다"
            description="답안을 제출하면 점수, 총평, 보완 포인트, 개선 답안을 이 영역에서 확인할 수 있습니다."
          />
        ) : (
          <div className="space-y-4 pr-1">
            <div
              className={`overflow-hidden rounded-[24px] transition-all duration-200 ease-out ${
                hidden ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'
              }`}
              aria-hidden={hidden}
            >
              <div
                className={`space-y-5 transition-all duration-200 ease-out ${
                  hidden ? 'translate-y-1 opacity-0 blur-[2px]' : 'translate-y-0 opacity-100 blur-0'
                }`}
              >
                <div className="inline-flex rounded-2xl bg-brand-50 px-4 py-3 text-brand-900 ring-1 ring-brand-100">
                  <span className="text-sm font-medium">점수</span>
                  <span className="ml-3 text-2xl font-bold">{feedback.score}</span>
                  <span className="ml-1 self-end text-sm font-medium">/ 100</span>
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-4">
                  <h4 className="text-sm font-semibold text-slate-900">총평</h4>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {feedback.summary}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Section title="잘한 점" items={feedback.strengths} />
                  <Section title="부족한 점" items={feedback.weaknesses} />
                </div>

                <Section title="보완 포인트" items={feedback.improvements} />

                <div className="rounded-2xl bg-slate-950 px-4 py-4 text-slate-50">
                  <h4 className="text-sm font-semibold text-white">개선 예시 답안</h4>
                  <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-slate-200">
                    {feedback.rewrittenAnswer}
                  </pre>
                </div>
              </div>
            </div>

            {hidden && (
              <EmptyState
                title="피드백이 가려져 있습니다"
                description="직접 다시 풀어보고 싶다면 그대로 두고, 필요할 때 보기 버튼으로 다시 펼치세요."
              />
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
