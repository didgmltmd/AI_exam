import type { PropsWithChildren } from 'react';
import { cn } from '../utils/cn';

interface BannerProps {
  tone?: 'info' | 'warning' | 'error';
  className?: string;
}

const toneMap = {
  info: 'bg-brand-50 text-brand-900 ring-brand-100',
  warning: 'bg-amber-50 text-amber-900 ring-amber-100',
  error: 'bg-red-50 text-red-900 ring-red-100',
};

export const Banner = ({
  children,
  tone = 'info',
  className,
}: PropsWithChildren<BannerProps>) => (
  <div className={cn('rounded-2xl px-4 py-3 text-sm ring-1', toneMap[tone], className)}>{children}</div>
);
