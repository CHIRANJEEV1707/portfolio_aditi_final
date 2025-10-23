'use client';

import { ChevronDown, Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import TypingAnimation from '@/components/common/TypingAnimation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '../ui/button';

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

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isEasterEggVisible, setIsEasterEggVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsla(var(--primary),0.25),transparent_60%)]" />

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

        <button
          onClick={() => setIsEasterEggVisible(true)}
          className="absolute top-[30%] left-[5%] text-2xl float-anim-reverse"
          style={{ animationDuration: '10s' }}
          aria-label="A little secret"
        >
          <Heart className="w-8 h-8 text-primary/50 hover:text-primary transition-colors" />
        </button>
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

      <AlertDialog open={isEasterEggVisible} onOpenChange={setIsEasterEggVisible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You Found a Secret!</AlertDialogTitle>
            <AlertDialogDescription className="text-lg py-4">
              My secret to creativity is a good cup of coffee and a playlist of lo-fi beats.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button onClick={() => setIsEasterEggVisible(false)} className="bg-primary hover:bg-primary/90">Got it!</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </section>
  );
};

export default HeroSection;
