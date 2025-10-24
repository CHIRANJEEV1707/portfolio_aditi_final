'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CSSProperties } from 'react';

type ComicTextProps = {
  children: string;
  className?: string;
  style?: CSSProperties;
  fontSize?: number;
};

export function ComicText({
  children,
  className,
  style,
  fontSize = 5,
}: ComicTextProps) {
  if (typeof children !== 'string') {
    throw new Error('children must be a string');
  }

  return (
    <h1
      className={cn(
        'font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter',
        className
      )}
    >
      {children}
    </h1>
  );
}
