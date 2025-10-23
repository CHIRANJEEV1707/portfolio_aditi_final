'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

type EasterEggProps = {
  id: string;
  character: string;
  message: string;
  className?: string;
  onFound: (id: string) => void;
};

const EasterEgg = ({ id, character, message, className, onFound }: EasterEggProps) => {
  const [isFound, setIsFound] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFound) {
      onFound(id);
      setIsFound(true);
      const audio = new Audio('/sounds/chime.mp3');
      audio.play();
    }
    setShowMessage(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMessage(false);
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
          isFound && showMessage ? 'animate-[gentle-bounce_1s_ease-in-out]' : '',
          isHovered && !isFound ? 'scale-125' : ''
        )}
        style={{
          filter: isHovered || (isFound && showMessage) ? 'drop-shadow(0 0 10px hsl(var(--accent)))' : 'none',
        }}
      >
        {character}
      </div>

      {/* Message Bubble */}
      {showMessage && (
        <div 
          className="popup-content-animation absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative rounded-full bg-primary px-4 py-2 text-xs text-primary-foreground shadow-lg">
            {message}
            <button
              onClick={handleClose}
              className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-foreground/50 text-primary transition-colors hover:bg-primary-foreground"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Close message</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EasterEgg;
