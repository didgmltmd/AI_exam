import { OPENAI_MODEL } from './constants';
import type { EvaluationResult, Feedback } from '../types/app';

interface OpenAIChatResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
}

const systemPrompt = `
너는 AI 활용 시험의 서술형 답안을 평가하는 채점관이다.
반드시 JSON 객체 하나만 출력해야 한다.
마크다운 코드블록을 쓰지 마라.
score는 0~100의 정수여야 한다.
summary는 문자열이다.
strengths, weaknesses, improvements는 문자열 배열이다.
rewrittenAnswer는 정답에 더 가까운 개선 답안이다.
사용자의 답안이 짧거나 불완전해도 채점과 보완 방향을 제공하라.
PR 곡선처럼 그림 설명이 필요한 경우 rewrittenAnswer에 ASCII 예시를 포함해도 된다.
`;

const buildUserPrompt = (question: string, answer: string) => `
[문제]
${question}

[채점 기준]
- 개념 정확성
- 핵심 키워드 포함 여부
- 불필요하거나 틀린 표현 지적
- 보완 방향 제시
- 정답에 가까운 개선 답안 재작성

[사용자 답안]
${answer}

아래 JSON 스키마를 정확히 지켜라.
{
  "score": 78,
  "summary": "총평",
  "strengths": ["잘한 점"],
  "weaknesses": ["부족한 점"],
  "improvements": ["보완 포인트"],
  "rewrittenAnswer": "개선 답안"
}
`;

const extractJsonObject = (text: string): string => {
  const fenced = text.match(/```json\s*([\s\S]*?)```/i) ?? text.match(/```\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start >= 0 && end > start) {
    return text.slice(start, end + 1);
  }

  return text;
};

const normalizeFeedback = (parsed: unknown, raw: string): Feedback => {
  const input = (parsed ?? {}) as Partial<Feedback>;

  return {
    score:
      typeof input.score === 'number'
        ? Math.max(0, Math.min(100, Math.round(input.score)))
        : 0,
    summary:
      typeof input.summary === 'string'
        ? input.summary
        : '응답을 해석하지 못해 원문을 함께 표시합니다.',
    strengths: Array.isArray(input.strengths)
      ? input.strengths.filter((item): item is string => typeof item === 'string')
      : [],
    weaknesses: Array.isArray(input.weaknesses)
      ? input.weaknesses.filter((item): item is string => typeof item === 'string')
      : [],
    improvements: Array.isArray(input.improvements)
      ? input.improvements.filter((item): item is string => typeof item === 'string')
      : [],
    rewrittenAnswer:
      typeof input.rewrittenAnswer === 'string'
        ? input.rewrittenAnswer
        : '원문 응답을 확인해 수동으로 검토해 주세요.',
    raw,
  };
};

export const evaluateAnswer = async (
  apiKey: string,
  question: string,
  answer: string,
): Promise<EvaluationResult> => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt.trim() },
        { role: 'user', content: buildUserPrompt(question, answer).trim() },
      ],
    }),
  });

  const data = (await response.json()) as OpenAIChatResponse;

  if (!response.ok) {
    throw new Error(data.error?.message || 'OpenAI API 요청에 실패했습니다.');
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('응답 본문이 비어 있습니다.');
  }

  try {
    const raw = extractJsonObject(content);
    return {
      feedback: normalizeFeedback(JSON.parse(raw), content),
      raw: content,
    };
  } catch {
    return {
      feedback: normalizeFeedback(undefined, content),
      raw: content,
    };
  }
};
