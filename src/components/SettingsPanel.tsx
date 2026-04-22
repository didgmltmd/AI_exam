import { useEffect, useState } from 'react';
import { Banner } from './Banner';
import { Button } from './Button';
import { Card } from './Card';

interface SettingsPanelProps {
  open: boolean;
  currentApiKey: string;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

export const SettingsPanel = ({
  open,
  currentApiKey,
  onClose,
  onSave,
}: SettingsPanelProps) => {
  const [draftKey, setDraftKey] = useState(currentApiKey);

  useEffect(() => {
    setDraftKey(currentApiKey);
  }, [currentApiKey, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/30 px-4 py-6 backdrop-blur-sm">
      <Card className="w-full max-w-xl space-y-4">
        <div>
          <p className="text-sm font-medium text-slate-500">설정</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">OpenAI API Key</h2>
        </div>

        <Banner tone="warning">
          API Key는 브라우저의 localStorage에 저장되며, 프론트엔드에서 직접 OpenAI API로 전송됩니다.
        </Banner>

        <div className="space-y-2">
          <label htmlFor="api-key-input" className="text-sm font-semibold text-slate-700">
            API Key 입력
          </label>
          <input
            id="api-key-input"
            type="password"
            value={draftKey}
            onChange={(event) => setDraftKey(event.target.value)}
            placeholder="sk-..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-100"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            닫기
          </Button>
          <Button
            onClick={() => {
              onSave(draftKey.trim());
              onClose();
            }}
          >
            저장
          </Button>
        </div>
      </Card>
    </div>
  );
};
