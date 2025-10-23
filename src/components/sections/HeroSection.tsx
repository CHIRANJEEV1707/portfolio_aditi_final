'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react';
import TypingAnimation from '@/components/common/TypingAnimation';
import EasterEgg from '@/components/common/EasterEgg';
import { AnimatePresence, motion } from 'framer-motion';

const AnimatedText = ({ text }: { text: string }) => {
  const letters = text.split('');
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="inline-block"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </span>
    </>
  );
};

const easterEggs = [
  { id: 'sparkle', char: '✨', message: 'You found me! 🌸', className: 'top-[20%] left-[5%] md:left-[15%] subtle-float-anim' },
  { id: 'art', char: '🎨', message: 'Creative minds notice details 💙', className: 'top-[75%] right-[5%] md:right-[15%] subtle-float-anim-reverse' },
  { id: 'idea', char: '💡', message: 'Hidden spark unlocked ✨', className: 'bottom-[15%] left-[30%] subtle-float-anim' },
  { id: 'thought', char: '💭', message: 'Imagination builds worlds ✨', className: 'top-[15%] right-[25%] subtle-float-anim-reverse' },
  { id: 'pixel', char: '✦', message: 'Every pixel has a purpose', className: 'top-[10%] left-[10%] subtle-float-anim' },
];

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
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
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden subtle-grid">
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsla(var(--primary),0.25),transparent_60%)] -z-10" />
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
      
      <AnimatePresence>
        {isQuoteOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsQuoteOpen(false)}
          >
            <motion.div
              className="relative max-w-sm rounded-2xl border border-white/20 bg-background/70 p-8 text-center shadow-2xl backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              onClick={(e) => e.stopPropagation()}
            >
               <p className="text-center text-2xl mb-2">✨</p>
               <p className="text-center text-lg text-foreground">
                {currentQuote}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
