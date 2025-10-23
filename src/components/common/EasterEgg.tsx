'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type EasterEggProps = {
  id: string;
  character: string;
  className?: string;
  onFound: (id: string) => void;
};

const EasterEgg = ({ id, character, className, onFound }: EasterEggProps) => {
  const [isFound, setIsFound] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFound) {
      onFound(id);
      setIsFound(true);
      const audio = new Audio('/sounds/chime.mp3');
      audio.play();
    }
  };

  return (
    <div
      className={cn(
        'absolute z-20 cursor-pointer transition-all duration-300',
        isFound ? 'opacity-50' : 'opacity-20 hover:opacity-100',
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          'relative text-4xl md:text-5xl transition-transform duration-300',
           isHovered && !isFound ? 'scale-125' : ''
        )}
        style={{
          filter: isHovered || isFound ? 'drop-shadow(0 0 10px hsl(var(--accent)))' : 'none',
        }}
      >
        {character}
      </div>
    </div>
  );
};

export default EasterEgg;
