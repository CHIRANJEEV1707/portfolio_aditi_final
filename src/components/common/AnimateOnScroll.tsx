'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimateOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-in-up' | 'slide-in-left' | 'slide-in-right';
  delay?: string; // Tailwind delay class e.g., 'delay-300'
  as?: React.ElementType;
  asChild?: boolean;
};

const AnimateOnScroll = ({
  children,
  className,
  as: Tag = 'div',
  asChild = false,
  ...props
}: AnimateOnScrollProps) => {
  const Comp = asChild ? Tag : 'div';
  return <Comp className={className} {...props}>{children}</Comp>;
};

export default AnimateOnScroll;
