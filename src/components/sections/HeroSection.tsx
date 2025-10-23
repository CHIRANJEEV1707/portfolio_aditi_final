'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react';
import TypingAnimation from '@/components/common/TypingAnimation';
import EasterEgg from '@/components/common/EasterEgg';
import SuccessPopup from '@/components/common/SuccessPopup';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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

const FloatingElement = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`absolute text-foreground/5 text-6xl font-bold -z-10 ${className}`}
    >
      {children}
    </div>
  );
};

const easterEggs = [
  { id: 'sparkle', char: '✨', message: 'You found me! 🌸', className: 'top-[20%] left-[5%] md:left-[15%]' },
  { id: 'art', char: '🎨', message: 'Creative minds notice details 💙', className: 'top-[75%] right-[5%] md:right-[15%]' },
  { id: 'idea', char: '💡', message: 'Hidden spark unlocked ✨', className: 'top-[40%] right-[10%] md:right-[20%]' },
];

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [foundEggs, setFoundEggs] = useState<string[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    setIsMounted(true);
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
      if (newFound.length === easterEggs.length) {
        setTimeout(() => setShowSuccessPopup(true), 500);
      }
      return newFound;
    });
  }, []);

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
      
      <AlertDialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl">✨</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg text-foreground">
              {currentQuote}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      <SuccessPopup isOpen={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} />

      <div className="relative z-10">
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
