import { useEffect, useMemo, useState } from 'react';
import { Banner } from './components/Banner';
import { ConfirmModal } from './components/ConfirmModal';
import { Header } from './components/Header';
import { QuestionCarousel } from './components/QuestionCarousel';
import { SettingsPanel } from './components/SettingsPanel';
import { AUTOSAVE_DELAY_MS } from './lib/constants';
import { evaluateAnswer } from './lib/openai';
import { createDefaultAppState, loadAppState, resetAppState, saveAppState } from './lib/storage';
import type { AppState, QuestionState } from './types/app';
import { useDebouncedEffect } from './hooks/useDebouncedEffect';

function App() {
  const [appState, setAppState] = useState<AppState>(() =>
    typeof window === 'undefined' ? createDefaultAppState() : loadAppState(),
  );
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [submittingId, setSubmittingId] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const answeredIds = useMemo(
    () => appState.questions.filter((item) => item.answer.trim().length > 0).map((item) => item.id),
    [appState.questions],
  );

  const evaluatedIds = useMemo(
    () => appState.questions.filter((item) => Boolean(item.feedback)).map((item) => item.id),
    [appState.questions],
  );

  useDebouncedEffect(
    () => {
      const success = saveAppState(appState);
      setSaveError(success ? null : '브라우저 저장소에 저장하지 못했습니다.');
    },
    AUTOSAVE_DELAY_MS,
    [appState],
  );

  useEffect(() => {
    document.title = `AI 시험 대비 채점 앱 · ${appState.currentQuestionId}번 문제`;
  }, [appState.currentQuestionId]);

  const updateQuestion = (id: number, updater: (prev: QuestionState) => QuestionState) => {
    setAppState((prev) => ({
      ...prev,
      questions: prev.questions.map((item) => (item.id === id ? updater(item) : item)),
    }));
  };

  const handleSelectQuestion = (id: number) => {
    setAppState((prev) => ({ ...prev, currentQuestionId: id }));
    setSubmitError(null);
  };

  const handleAnswerChange = (id: number, answer: string) => {
    updateQuestion(id, (prev) => ({
      ...prev,
      answer,
      lastSavedAt: new Date().toISOString(),
    }));
  };

  const handleSubmit = async (id: number) => {
    const target = appState.questions.find((item) => item.id === id);
    if (!target) return;

    if (!appState.apiKey.trim()) {
      setSubmitError('OpenAI API Key를 먼저 입력해 주세요.');
      setIsSettingsOpen(true);
      return;
    }

    if (!target.answer.trim()) {
      setSubmitError('빈 답안은 제출할 수 없습니다.');
      return;
    }

    setSubmittingId(id);
    setSubmitError(null);

    try {
      const result = await evaluateAnswer(appState.apiKey.trim(), target.question, target.answer.trim());
      updateQuestion(id, (prev) => ({
        ...prev,
        feedback: result.feedback,
        isFeedbackHidden: false,
        lastEvaluatedAt: new Date().toISOString(),
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      setSubmitError(message.includes('Failed to fetch') ? '네트워크 오류가 발생했습니다.' : message);
    } finally {
      setSubmittingId(null);
    }
  };

  const handleToggleFeedbackHidden = (id: number) => {
    updateQuestion(id, (prev) => ({
      ...prev,
      isFeedbackHidden: !prev.isFeedbackHidden,
    }));
  };

  const handleSaveApiKey = (apiKey: string) => {
    setAppState((prev) => ({ ...prev, apiKey }));
  };

  const handleReset = () => {
    const next = resetAppState();
    setAppState(next);
    setSaveError(null);
    setSubmitError(null);
    setIsResetModalOpen(false);
  };

  const handleRandomQuestion = () => {
    const target =
      appState.questions[Math.floor(Math.random() * appState.questions.length)] ?? appState.questions[0];

    setAppState((prev) => ({
      ...prev,
      currentQuestionId: target.id,
      questions: prev.questions.map((item) =>
        item.id === target.id
          ? {
              ...item,
              answer: '',
              feedback: undefined,
              isFeedbackHidden: false,
              lastEvaluatedAt: undefined,
              lastSavedAt: new Date().toISOString(),
            }
          : item,
      ),
    }));
    setSubmitError(null);
  };

  return (
    <div className="h-screen overflow-hidden bg-transparent px-4 py-4 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-full w-full max-w-[1400px] min-h-0 flex-col gap-4">
        <Header
          currentQuestionId={appState.currentQuestionId}
          answeredIds={answeredIds}
          evaluatedIds={evaluatedIds}
          apiKey={appState.apiKey}
          onSelectQuestion={handleSelectQuestion}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onReset={() => setIsResetModalOpen(true)}
          onRandomQuestion={handleRandomQuestion}
        />

        {!appState.apiKey && (
          <Banner tone="warning">
            OpenAI API Key가 아직 없습니다. 상단의 <strong>API Key 설정</strong>에서 키를 입력해야 AI 채점을 사용할 수 있습니다.
          </Banner>
        )}

        {saveError && <Banner tone="error">{saveError}</Banner>}

        <div className="min-h-0 flex-1">
          <QuestionCarousel
            questions={appState.questions}
            currentQuestionId={appState.currentQuestionId}
            isSubmitting={submittingId !== null}
            errorMessage={submitError}
            onSelectQuestion={handleSelectQuestion}
            onAnswerChange={handleAnswerChange}
            onSubmit={handleSubmit}
            onToggleFeedbackHidden={handleToggleFeedbackHidden}
          />
        </div>
      </div>

      <SettingsPanel
        open={isSettingsOpen}
        currentApiKey={appState.apiKey}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveApiKey}
      />

      <ConfirmModal
        open={isResetModalOpen}
        title="전체 데이터를 초기화할까요?"
        description="저장된 답안, 피드백, API Key, 현재 위치까지 모두 삭제됩니다. 이 작업은 되돌릴 수 없습니다."
        confirmLabel="전체 초기화"
        onConfirm={handleReset}
        onClose={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}

export default App;
