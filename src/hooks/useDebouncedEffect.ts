import { useEffect } from 'react';

export const useDebouncedEffect = (
  effect: () => void,
  delay: number,
  dependencies: React.DependencyList,
): void => {
  useEffect(() => {
    const timeout = window.setTimeout(effect, delay);
    return () => window.clearTimeout(timeout);
  }, [delay, effect, ...dependencies]);
};
