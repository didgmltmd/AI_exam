import type { PropsWithChildren } from 'react';
import { cn } from '../utils/cn';

interface CardProps {
  className?: string;
}

export const Card = ({ children, className }: PropsWithChildren<CardProps>) => (
  <section className={cn('rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-slate-100', className)}>
    {children}
  </section>
);
