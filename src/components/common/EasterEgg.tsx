'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type EasterEggProps = {
  id: string;
  character: string;
  message: string;
  className?: string;
  onFound: (id: string) => void;
};

const EasterEgg = ({ id, character, message, className, onFound }: EasterEggProps) => {
  const [isFound, setIsFound] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!isFound) {
      setIsFound(true);
      onFound(id);
      const audio = new Audio('/sounds/chime.mp3');
      audio.play();
    }
  };

  return (
    <div
      className={cn(
        'absolute z-20 cursor-pointer transition-all duration-300',
        isFound ? 'opacity-100' : 'opacity-20 hover:opacity-100',
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          'relative text-4xl md:text-5xl transition-transform duration-300',
          isFound ? 'animate-[gentle-bounce_1s_ease-in-out]' : '',
          isHovered && !isFound ? 'scale-125' : ''
        )}
        style={{
          filter: isHovered || isFound ? 'drop-shadow(0 0 10px hsl(var(--accent)))' : 'none',
        }}
      >
        {character}
      </div>
      <div
        className={cn(
          'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground shadow-lg transition-all duration-300',
          isFound ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        )}
      >
        {message}
      </div>
    </div>
  );
};

export default EasterEgg;
