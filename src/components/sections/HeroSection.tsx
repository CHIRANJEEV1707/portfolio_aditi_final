'use client';

import { ChevronDown } from 'lucide-react';
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
import { Button } from '@/components/ui/button';

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

const quotes: { [key: string]: { quote: string; author: string } } = {
  '🎨': {
    quote: 'Creativity is intelligence having fun.',
    author: 'Albert Einstein',
  },
  '✨': {
    quote: 'The details are not the details. They make the design.',
    author: 'Charles Eames',
  },
  '💡': {
    quote: 'Design is thinking made visual.',
    author: 'Saul Bass',
  },
  '🚀': {
    quote: 'Good marketing makes the company look smart. Great marketing makes the customer feel smart.',
    author: 'Joe Chernov',
  },
  '💻': {
    quote: 'Simplicity is the ultimate sophistication.',
    author: 'Leonardo da Vinci'
  },
  '👾': {
    quote: 'The best way to predict the future is to create it.',
    author: 'Peter Drucker'
  }
};

const FloatingElement = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`absolute text-foreground/5 text-6xl font-bold -z-10 hover:text-primary/20 transition-colors duration-300 ${className}`}
      aria-label={`Reveal a quote with ${children}`}
    >
      {children}
    </button>
  );
};

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<{
    quote: string;
    author: string;
  } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleElementClick = (emoji: string) => {
    setSelectedQuote(quotes[emoji]);
  };

  const floatingElements = [
    { emoji: '🎨', className: 'top-[15%] left-[10%] float-anim' },
    { emoji: '✨', className: 'bottom-[20%] right-[15%] float-anim-reverse' },
    { emoji: '💡', className: 'top-[50%] right-[5%] text-5xl float-anim' },
    { emoji: '🚀', className: 'bottom-[10%] left-[25%] text-5xl float-anim-reverse' },
    { emoji: '💻', className: 'top-[25%] right-[25%] text-7xl float-anim' },
    { emoji: '👾', className: 'bottom-[45%] left-[15%] text-5xl float-anim-reverse' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsla(var(--primary),0.25),transparent_60%)]" />
      </div>

      {floatingElements.map(({ emoji, className }) => (
        <FloatingElement
          key={emoji}
          className={className}
          onClick={() => handleElementClick(emoji)}
        >
          {emoji}
        </FloatingElement>
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
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
      </div>

      <AlertDialog
        open={!!selectedQuote}
        onOpenChange={(isOpen) => !isOpen && setSelectedQuote(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>A Spark of Inspiration</AlertDialogTitle>
            <AlertDialogDescription className="text-lg py-4">
              &quot;{selectedQuote?.quote}&quot;
              <br />
              <em className="text-sm">- {selectedQuote?.author}</em>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button
                onClick={() => setSelectedQuote(null)}
                className="bg-primary hover:bg-primary/90"
              >
                Nice!
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default HeroSection;
