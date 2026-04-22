export const formatDateTime = (value?: string): string => {
  if (!value) return '-';

  try {
    return new Intl.DateTimeFormat('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value));
  } catch {
    return value;
  }
};

export const maskApiKey = (apiKey: string): string => {
  if (!apiKey) return '미설정';
  if (apiKey.length <= 10) return `${apiKey.slice(0, 3)}•••`;
  return `${apiKey.slice(0, 6)}••••••${apiKey.slice(-4)}`;
};

export const downloadJson = (filename: string, data: unknown): void => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};
