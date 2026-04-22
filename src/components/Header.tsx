import { maskApiKey } from '../utils/format';
import { Button } from './Button';
import { QuestionTabs } from './QuestionTabs';

interface HeaderProps {
  currentQuestionId: number;
  answeredIds: number[];
  evaluatedIds: number[];
  apiKey: string;
  onSelectQuestion: (id: number) => void;
  onOpenSettings: () => void;
  onReset: () => void;
  onRandomQuestion: () => void;
}

export const Header = ({
  currentQuestionId,
  answeredIds,
  evaluatedIds,
  apiKey,
  onSelectQuestion,
  onOpenSettings,
  onReset,
  onRandomQuestion,
}: HeaderProps) => (
  <header>
    <div className="rounded-[28px] bg-white/95 p-4 shadow-soft ring-1 ring-slate-100 backdrop-blur sm:p-5 xl:rounded-[32px] xl:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2 xl:flex-1">
          <p className="text-sm font-semibold text-brand-600">AI Exam Prep</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            서술형 답안 작성 및 AI 채점
          </h1>
          <p className="text-sm text-slate-500">
            현재 API Key: <span className="font-semibold text-slate-700">{maskApiKey(apiKey)}</span>
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 xl:max-w-[760px] xl:items-end">
          <div className="flex flex-wrap gap-2 xl:justify-end">
            <Button variant="secondary" onClick={onOpenSettings} className="flex-1 sm:flex-none">
              API Key 설정
            </Button>
            <Button variant="secondary" onClick={onRandomQuestion} className="flex-1 sm:flex-none">
              랜덤 문제
            </Button>
            <Button variant="danger" onClick={onReset} className="w-full sm:w-auto">
              전체 초기화
            </Button>
          </div>

          <div className="w-full rounded-[22px] bg-slate-50 px-3 py-3 ring-1 ring-slate-100 sm:px-4 sm:py-4">
            <div className="mb-3">
              <p className="text-sm font-medium text-slate-500">문제 바로가기</p>
              <p className="text-base font-bold text-slate-900 sm:text-lg">
                {currentQuestionId}번 문제 선택됨
              </p>
            </div>
            <QuestionTabs
              currentQuestionId={currentQuestionId}
              answeredIds={answeredIds}
              evaluatedIds={evaluatedIds}
              onSelect={onSelectQuestion}
            />
          </div>
        </div>
      </div>
    </div>
  </header>
);
