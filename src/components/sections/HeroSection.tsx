'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react';
import TypingAnimation from '@/components/common/TypingAnimation';
import { motion } from 'framer-motion';
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

const floatingEmojis = [
    { char: '✨', className: 'top-[20%] left-[5%] md:left-[15%] float-1' },
    { char: '🎨', className: 'top-[75%] right-[5%] md:right-[15%] float-2' },
    { char: '💡', className: 'bottom-[15%] left-[30%] float-3' },
    { char: '💭', className: 'top-[15%] right-[25%] float-1' },
    { char: '✦', className: 'top-[10%] left-[10%] float-2' },
  ];

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden subtle-grid">
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsla(var(--primary),0.25),transparent_60%)] -z-10" />
      </div>

      {isMounted && floatingEmojis.map((emoji, index) => (
        <div
          key={index}
          className={cn(
            'absolute text-4xl md:text-5xl opacity-20',
            emoji.className
          )}
        >
          {emoji.char}
        </div>
      ))}
      
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
