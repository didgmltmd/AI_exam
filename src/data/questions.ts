import type { QuestionSeed } from '../types/app';

export const QUESTIONS: QuestionSeed[] = [
  {
    id: 1,
    question:
      '객체 탐지에서 모델이 예측한 바운딩 박스가 실제 정답과 얼마나 일치하는지를 평가하는 지표인 "IoU(Intersection over Union)"의 값을 구하는 공식을 \'교집합\'과 \'합집합\'이라는 단어를 사용하여 서술하시오.',
    hintKeywords: ['예측 박스', '정답 박스', '교집합', '합집합', '넓이 비율'],
  },
  {
    id: 2,
    question:
      "스마트 팩토리의 컨베이어 벨트에서 '불량 사과'를 골라내는 AI 모델을 개발했습니다. 이 모델에서 FP와 FN이 발생했다는 것은 현장에서 각각 어떤 상황이 벌어진 것인지 구체적으로 서술하시오.",
    hintKeywords: ['FP', '정상 사과', '불량으로 오검출', 'FN', '불량 사과 놓침'],
  },
  {
    id: 3,
    question:
      '객체 탐지 모델의 신뢰도 임계값(Confidence Threshold)을 기존 0.5에서 0.9로 매우 높게(엄격하게) 조정했습니다. 이때 모델의 정밀도(Precision)와 재현율(Recall) 수치는 각각 어떻게 변화할 가능성이 높은지 그 이유와 함께 서술하시오.',
    hintKeywords: ['Threshold 상승', '예측 감소', 'Precision 상승 가능', 'Recall 하락 가능'],
  },
  {
    id: 4,
    question:
      "자율주행 자동차의 '보행자 인식 AI 시스템'을 설계할 때, 개발자는 정밀도(Precision)가 조금 떨어지더라도 재현율(Recall)을 높이는 방향으로 모델을 튜닝해야 합니다. 그 이유를 서술하시오.",
    hintKeywords: ['보행자 놓침', '안전', 'FN 최소화', 'Recall 우선'],
  },
  {
    id: 5,
    question:
      '어떤 YOLO 모델의 성능을 평가했더니 정밀도(Precision)는 99%로 매우 높게 나왔으나, 재현율(Recall)은 20%로 매우 낮게 나왔습니다. 이 모델은 현재 어떤 특징을 가지고 예측을 수행하고 있는지 평가하시오.',
    hintKeywords: ['매우 보수적', '확실할 때만 검출', '거짓 양성 적음', '놓침 많음'],
  },
  {
    id: 6,
    question:
      'YOLO 모델이 추론을 마친 후 반환하는 데이터 중, 바운딩 박스의 좌표를 표현하는 `xyxy` 방식과 `xywh` 방식의 차이점을 각 좌표의 의미를 중심으로 간략히 비교하시오.',
    hintKeywords: ['좌상단', '우하단', '중심점', '너비', '높이'],
  },
  {
    id: 7,
    question:
      'mAP(mean Average Precision)를 도출하기 위한 과정 중 하나인 PR 곡선(Precision-Recall Curve)에서, X축과 Y축은 각각 어떤 지표를 나타내는지 적고, 성능이 우수한 AI 모델일수록 이 곡선의 형태가 어떻게 그려지는지 그림으로 그리고 설명하라.',
    hintKeywords: ['X축 Recall', 'Y축 Precision', '우상단', '면적 큼', 'ASCII 가능'],
  },
  {
    id: 8,
    question:
      '객체 탐지 대회에서 모델을 평가할 때, mAP50 대신 mAP50-95 지표를 최종 랭킹 기준으로 삼았습니다. 이 두 지표의 채점 기준(IoU) 차이를 설명하고, mAP50-95와 mAP50의 모델검증시 차이점을 설명하시오.',
    hintKeywords: ['IoU 0.5', '0.5~0.95', '더 엄격함', '박스 정밀도 평가'],
  },
  {
    id: 9,
    question:
      'YOLO가 한 명의 사람 객체 주변에 여러 개의 바운딩 박스를 중복해서 그렸을 때, IoU 면적과 신뢰도 점수를 비교하여 가장 확실한 박스 하나만 남기고 나머지는 모두 제거하는 후처리 알고리즘의 명칭을 쓰고 간략히 설명하라.',
    hintKeywords: ['NMS', '중복 제거', 'IoU 비교', '신뢰도 높은 박스 유지'],
  },
  {
    id: 10,
    question:
      '모델 결과의 Confidence Score(신뢰도 점수)가 0.85라는 것은, 단순히 "그 박스 안에 어떤 물체가 있을 확률이 85%다"라는 뜻만 있는 것이 아니며, 이 스코어를 구성하는 두 가지 수학적 확률/지표 요소를 서술하시오.',
    hintKeywords: ['Objectness', 'Class Probability', '조건부 확률', '곱 형태'],
  },
];
