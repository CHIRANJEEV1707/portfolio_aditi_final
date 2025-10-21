'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimateOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-in-up' | 'slide-in-left' | 'slide-in-right';
  delay?: string; // Tailwind delay class e.g., 'delay-300'
  as?: React.ElementType;
};

const AnimateOnScroll = ({
  children,
  className,
  animation = 'fade-in',
  delay = '',
  as: Tag = 'div',
}: AnimateOnScrollProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animationClasses = {
    'fade-in': 'opacity-0',
    'slide-in-up': 'opacity-0 translate-y-8',
    'slide-in-left': 'opacity-0 -translate-x-8',
    'slide-in-right': 'opacity-0 translate-x-8',
  };

  const visibleClasses = {
    'fade-in': 'opacity-100',
    'slide-in-up': 'opacity-100 translate-y-0',
    'slide-in-left': 'opacity-100 translate-x-0',
    'slide-in-right': 'opacity-100 translate-x-0',
  };

  return (
    <Tag
      ref={ref}
      className={cn(
        'transition-all duration-1000 ease-out',
        delay,
        isVisible ? visibleClasses[animation] : animationClasses[animation],
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default AnimateOnScroll;
