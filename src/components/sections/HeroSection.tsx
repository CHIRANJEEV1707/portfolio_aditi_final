'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react';
import TypingAnimation from '@/components/common/TypingAnimation';
import EasterEgg from '@/components/common/EasterEgg';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
            {letter === ' ' ? ' ' : letter}
          </motion.span>
        ))}
      </span>
    </>
  );
};

const easterEggs = [
  { char: '✨', className: 'top-[15%] left-[5%]', message: 'You found me! 🌸' },
  { char: '🎨', className: 'bottom-[15%] right-[5%]', message: 'Creative minds notice details 💙' },
  { char: '💡', className: 'top-[50%] right-[15%]', message: 'Hidden spark unlocked ✨' },
  { char: '💭', className: 'top-[15%] right-[10%]', message: 'Imagination builds worlds ✨' },
  { char: '✦', className: 'bottom-[20%] left-[10%]', message: 'Every pixel has a purpose ✦' },
];

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeEgg, setActiveEgg] = useState<string | null>(null);
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    setIsMounted(true);
    setAudio(new Audio('/sounds/chime.mp3'));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeEgg) {
      timer = setTimeout(() => {
        setActiveEgg(null);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [activeEgg]);

  const handleEggClick = (message: string) => {
    setPopupMessage(message);
    setActiveEgg(message);
    audio?.play().catch(err => console.error("Audio play failed:", err));
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden subtle-grid">
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsla(var(--primary),0.25),transparent_60%)] -z-10" />
      </div>

      {isMounted && easterEggs.map((egg, index) => (
        <EasterEgg
          key={index}
          className={egg.className}
          onClick={() => handleEggClick(egg.message)}
        >
          {egg.char}
        </EasterEgg>
      ))}
      
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
      
      <AnimatePresence>
        {activeEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-background/80 backdrop-blur-lg border border-primary/20 shadow-2xl rounded-2xl p-6 text-center">
              <p className="text-primary text-lg font-medium">{popupMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default HeroSection;
