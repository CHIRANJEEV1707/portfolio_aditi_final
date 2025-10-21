'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const AnimatedText = ({ text }: { text: string }) => {
  const letters = text.split('');
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="letter-reveal"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </span>
    </>
  );
};

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-background via-secondary to-background">
      <div className="relative z-10">
        <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-foreground">
          {isMounted ? <AnimatedText text="Aditi Agrawal" /> : 'Aditi Agrawal'}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl text-muted-foreground font-body max-w-2xl mx-auto">
          Digital Marketing Strategist & Creative Solutionist
        </p>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
