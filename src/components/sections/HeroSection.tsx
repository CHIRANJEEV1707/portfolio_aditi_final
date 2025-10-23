'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import TypingAnimation from '@/components/common/TypingAnimation';
import EasterEgg from '@/components/common/EasterEgg';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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

const FloatingShapes = () => {
  const shapes = [
    {
      style: {
        width: '15rem',
        height: '15rem',
        top: '10%',
        left: '10%',
        background: 'hsla(var(--foreground), 0.1)',
      },
      animate: {
        x: [0, 20, 0, -20, 0],
        y: [0, -30, 0, 30, 0],
      },
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
    {
      style: {
        width: '10rem',
        height: '10rem',
        top: '60%',
        left: '80%',
        background: 'hsla(var(--accent), 0.15)',
      },
      animate: {
        x: [0, -40, 0, 40, 0],
        y: [0, 50, 0, -50, 0],
      },
      transition: {
        duration: 25,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
    {
      style: {
        width: '8rem',
        height: '8rem',
        top: '75%',
        left: '20%',
        background: 'hsla(var(--foreground), 0.12)',
      },
      animate: {
        x: [0, 30, 0, -30, 0],
        y: [0, -20, 0, 20, 0],
      },
      transition: {
        duration: 18,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
     {
      style: {
        width: '20rem',
        height: '20rem',
        top: '25%',
        left: '50%',
        background: 'hsla(var(--accent), 0.08)',
      },
      animate: {
        x: [0, 50, 0, -50, 0],
        y: [0, -40, 0, 40, 0],
      },
      transition: {
        duration: 30,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  ];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full filter blur-3xl"
          style={shape.style}
          animate={shape.animate}
          transition={shape.transition}
        />
      ))}
    </div>
  );
};

const FloatingImages = ({ constraintsRef }: { constraintsRef: React.RefObject<HTMLElement> }) => {
  const imageIds = ['project-1', 'project-2', 'project-3', 'project-4'];
  const images = PlaceHolderImages.filter(img => imageIds.includes(img.id));

  const imageStyles = [
    { top: '15%', left: '80%', size: 150, duration: 25, rotate: -5 },
    { top: '70%', left: '10%', size: 120, duration: 30, rotate: 10 },
    { top: '40%', left: '30%', size: 100, duration: 20, rotate: -8 },
    { top: '80%', left: '70%', size: 180, duration: 35, rotate: 12 },
  ];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {images.map((image, index) => {
        if (!image) return null;
        const style = imageStyles[index % imageStyles.length];
        return (
          <motion.div
            key={image.id}
            className="absolute rounded-lg shadow-lg cursor-grab active:cursor-grabbing"
            style={{
              top: style.top,
              left: style.left,
              width: `${style.size}px`,
              height: `${style.size * 0.75}px`,
            }}
            animate={{ y: [-10, 10], rotate: [style.rotate - 2, style.rotate + 2] }}
            transition={{
              duration: style.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            whileDrag={{ scale: 1.1, zIndex: 50, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          >
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover rounded-lg pointer-events-none"
              sizes={`${style.size}px`}
            />
          </motion.div>
        );
      })}
    </div>
  );
};


const easterEggs = [
  {
    char: '✨',
    className: 'top-[15%] left-[10%]',
    message: 'You found me! 🌸',
  },
  {
    char: '🎨',
    className: 'bottom-[10%] right-[15%]',
    message: 'Creative minds notice details 💙',
  },
  {
    char: '💡',
    className: 'top-[20%] right-[20%]',
    message: 'Hidden spark unlocked ✨',
  },
  {
    char: '💭',
    className: 'bottom-[25%] left-[25%]',
    message: 'Imagination builds worlds ✨',
  },
  {
    char: '✦',
    className: 'top-[55%] right-[40%]',
    message: 'Every pixel has a purpose ✦',
  },
];

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeEgg, setActiveEgg] = useState<string | null>(null);
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);


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
    audio?.play().catch((err) => console.error('Audio play failed:', err));
  };

  return (
    <section 
      ref={constraintsRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden"
    >
      <div className="absolute inset-0 -z-20 bg-background" />
      <FloatingShapes />
      <FloatingImages constraintsRef={constraintsRef}/>
      
      {isMounted &&
        easterEggs.map((egg, index) => (
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
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="bg-background/80 backdrop-blur-lg border border-primary/20 shadow-2xl rounded-2xl p-6 text-center"
            >
              <p className="text-primary text-lg font-medium">{popupMessage}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
