import { useState } from 'react';
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
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelectFromMenu = (id: number) => {
    onSelectQuestion(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header>
        <div className="rounded-[28px] bg-white/95 p-4 shadow-soft ring-1 ring-slate-100 backdrop-blur sm:p-5 xl:rounded-[32px] xl:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="space-y-2 xl:flex-1">
              <div className="flex items-start justify-between gap-4 xl:block">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-brand-600">AI Exam Prep</p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                    서술형 답안 작성 및 AI 채점
                  </h1>
                  <p className="text-sm text-slate-500">
                    현재 API Key:{' '}
                    <span className="font-semibold text-slate-700">{maskApiKey(apiKey)}</span>
                  </p>
                </div>

                <Button
                  variant="secondary"
                  className="shrink-0 xl:hidden"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="메뉴 열기"
                >
                  메뉴
                </Button>
              </div>
            </div>

            <div className="hidden w-full max-w-full flex-col gap-4 xl:flex xl:max-w-[760px] xl:items-end">
              <div className="flex flex-wrap justify-end gap-2">
                <Button variant="secondary" onClick={onOpenSettings}>
                  API Key 설정
                </Button>
                <Button variant="secondary" onClick={onRandomQuestion}>
                  랜덤 문제
                </Button>
                <Button variant="danger" onClick={onReset}>
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

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/30 backdrop-blur-sm xl:hidden">
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-default"
            aria-label="메뉴 닫기"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">빠른 메뉴</p>
                <p className="text-xl font-bold text-slate-950">{currentQuestionId}번 문제</p>
              </div>
              <Button variant="ghost" onClick={() => setIsMenuOpen(false)}>
                닫기
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  onOpenSettings();
                  setIsMenuOpen(false);
                }}
              >
                API Key 설정
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  onRandomQuestion();
                  setIsMenuOpen(false);
                }}
              >
                랜덤 문제
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  onReset();
                  setIsMenuOpen(false);
                }}
              >
                전체 초기화
              </Button>
            </div>

            <div className="mt-5 min-h-0 flex-1 rounded-[24px] bg-slate-50 px-4 py-4 ring-1 ring-slate-100">
              <div className="mb-3">
                <p className="text-sm font-medium text-slate-500">문제 바로가기</p>
                <p className="text-base font-bold text-slate-900">{currentQuestionId}번 문제 선택됨</p>
              </div>
              <QuestionTabs
                currentQuestionId={currentQuestionId}
                answeredIds={answeredIds}
                evaluatedIds={evaluatedIds}
                onSelect={handleSelectFromMenu}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
