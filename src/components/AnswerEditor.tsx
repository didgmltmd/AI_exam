interface AnswerEditorProps {
  answer: string;
  onChange: (value: string) => void;
}

export const AnswerEditor = ({ answer, onChange }: AnswerEditorProps) => (
  <div className="flex h-full min-h-0 flex-col space-y-3 overflow-hidden">
    <div className="flex items-center justify-between">
      <label htmlFor="answer-textarea" className="text-sm font-semibold text-slate-700">
        답안 작성
      </label>
    </div>
    <textarea
      id="answer-textarea"
      value={answer}
      onChange={(event) => onChange(event.target.value)}
      placeholder="핵심 개념, 이유, 예시를 포함해 서술형으로 작성해 보세요."
      className="scrollbar-hidden min-h-[240px] w-full flex-1 overflow-y-auto resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-100 xl:min-h-0 xl:h-full"
    />
  </div>
);
