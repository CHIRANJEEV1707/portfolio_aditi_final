'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import TypingAnimation from '@/components/common/TypingAnimation';

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
            {letter === ' ' ? ' ' : letter}
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

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden subtle-grid">
      {/* Container for background elements */}
      <div className="absolute inset-0 z-0">
        {/* Radial Gradient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsla(var(--primary),0.25),transparent_60%)]" />

        {/* Floating Elements */}
        <FloatingElement className="top-[15%] left-[10%] float-anim">🎨</FloatingElement>
        <FloatingElement className="bottom-[20%] right-[15%] float-anim-reverse">✨</FloatingElement>
        <FloatingElement className="top-[50%] right-[5%] text-5xl float-anim">
        💡
        </FloatingElement>
        <FloatingElement className="bottom-[10%] left-[25%] text-5xl float-anim-reverse">
        🚀
        </FloatingElement>
        <FloatingElement className="top-[25%] right-[25%] text-7xl float-anim">
          💻
        </FloatingElement>
        <FloatingElement className="bottom-[45%] left-[15%] text-5xl float-anim-reverse">
          👾
        </FloatingElement>
      </div>

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
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
