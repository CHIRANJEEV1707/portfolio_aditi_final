'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react';
import TypingAnimation from '@/components/common/TypingAnimation';
import EasterEgg from '@/components/common/EasterEgg';
import SuccessPopup from '@/components/common/SuccessPopup';

const AnimatedText = ({ text }: { text: string }) => {
  const letters = text.split('');
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {letters.map((letter, index) => (
          <span
            key={index}
            className="letter-reveal"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {letter === ' ' ? ' ' : letter}
          </span>
        ))}
      </span>
    </>
  );
};

const easterEggs = [
  { id: 'sparkle', char: '✨', message: 'You found me! 🌸', className: 'top-[20%] left-[5%] md:left-[15%]' },
  { id: 'art', char: '🎨', message: 'Creative minds notice details 💙', className: 'top-[75%] right-[5%] md:right-[15%]' },
  { id: 'idea', char: '💡', message: 'Hidden spark unlocked ✨', className: 'bottom-[15%] left-[20%] md:left-[30%]' },
];

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [foundEggs, setFoundEggs] = useState<string[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    setIsMounted(true);
    // Preload audio
    new Audio('/sounds/chime.mp3');
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isQuoteOpen) {
      timer = setTimeout(() => {
        setIsQuoteOpen(false);
      }, 4000); // Auto-close after 4 seconds
    }
    return () => clearTimeout(timer);
  }, [isQuoteOpen]);

  const handleEggFound = useCallback((id: string) => {
    const egg = easterEggs.find(e => e.id === id);
    if(egg) {
      setCurrentQuote(egg.message);
      setIsQuoteOpen(true);
    }
    
    setFoundEggs((prev) => {
      const newFound = prev.includes(id) ? prev : [...prev, id];
      if (newFound.length === easterEggs.length && !showSuccessPopup) {
         setTimeout(() => {
            setIsQuoteOpen(false); // Close any open quote before showing the final popup
            setShowSuccessPopup(true);
         }, 500);
      }
      return newFound;
    });
  }, [showSuccessPopup]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden subtle-grid">
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsla(var(--primary),0.25),transparent_60%)] z-10" />
      </div>

      {isMounted && easterEggs.map((egg) => (
        <EasterEgg
          key={egg.id}
          id={egg.id}
          character={egg.char}
          onFound={() => handleEggFound(egg.id)}
          className={egg.className}
        />
      ))}
      
      {isQuoteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setIsQuoteOpen(false)}
        >
          <div
            className="popup-content-animation relative max-w-sm rounded-2xl border border-white/20 bg-background/70 p-8 text-center shadow-2xl backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
             <p className="text-center text-2xl mb-2">✨</p>
             <p className="text-center text-lg text-foreground">
              {currentQuote}
            </p>
          </div>
        </div>
      )}

      <SuccessPopup isOpen={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} />

      <div className="relative z-30">
        <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-foreground">
          {isMounted ? <AnimatedText text="Aditi Agrawal" /> : 'Aditi Agrawal'}
        </h1>
        <div className="mt-4 text-lg md:text-xl lg:text-2xl text-muted-foreground font-body max-w-2xl mx-auto">
          {isMounted ? (
            <TypingAnimation
              texts={[
                'Digital Marketing Strategist',
                'Creative Solutionist',
                'Aesthetic Thinker',
                'Brand Storyteller',
              ]}
            />
          ) : (
            'Digital Marketing Strategist & Creative Solutionist'
          )}
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
        <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
