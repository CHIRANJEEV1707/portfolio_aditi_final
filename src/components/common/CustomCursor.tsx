'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    const onMouseOut = (e: MouseEvent) => {
        setIsHovering(false);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  if (!isClient) return null;

  return (
    <div
      className={cn(
        'fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block transition-transform duration-100 ease-out'
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    >
      <div
        className={cn(
          'rounded-full transition-all duration-300 ease-out',
          isHovering
            ? 'w-12 h-12 bg-accent/20 border-2 border-accent'
            : 'w-3 h-3 bg-primary'
        )}
      ></div>
    </div>
  );
};

export default CustomCursor;
