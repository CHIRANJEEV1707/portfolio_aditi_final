
'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import TypingAnimation from '@/components/common/TypingAnimation';
import EasterEgg from '@/components/common/EasterEgg';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import StarIcon from '../common/StarIcon';
import { ComicText } from '../ui/comic-text';
import SquiggleIcon from '../common/SquiggleIcon';
import PlusIcon from '../common/PlusIcon';
import { DotScreenShader } from '../ui/dot-shader-background';


const FloatingImages = ({
  images,
  constraintsRef,
}: {
  images: ImagePlaceholder[];
  constraintsRef: React.RefObject<HTMLElement>;
}) => {
  const imageStyles = [
    { top: '15%', left: '80%', width: 150, duration: 25, rotate: -5 },
    { top: '70%', left: '10%', width: 120, duration: 30, rotate: 10 },
    { top: '5%', left: '30%', width: 100, duration: 20, rotate: -8 },
    { top: '80%', left: '70%', width: 180, duration: 35, rotate: 12 },
  ];

  return (
    <>
      {images.map((image, index) => {
        const style = imageStyles[index % imageStyles.length];
        return (
          <motion.div
            key={image.id}
            className="absolute rounded-lg shadow-lg cursor-grab active:cursor-grabbing"
            style={{
              top: style.top,
              left: style.left,
              width: `${style.width}px`,
              height: 'auto',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [-10, 10], 
              rotate: [style.rotate - 2, style.rotate + 2] 
            }}
            transition={{
              opacity: { duration: 0.5, delay: index * 0.2 },
              scale: { duration: 0.5, delay: index * 0.2 },
              y: {
                duration: style.duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
               rotate: {
                duration: style.duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }
            }}
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            whileHover={{ scale: 1.1, zIndex: 20, filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))' }}
            whileDrag={{ scale: 1.2, zIndex: 30, filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.3))' }}
          >
            <Image
              src={image.imageUrl}
              alt={image.description}
              width={style.width}
              height={style.width * (3/4)} // Assuming a 4:3 aspect ratio for initial render, will adjust based on image file
              className="object-cover rounded-lg pointer-events-none"
              sizes={`${style.width}px`}
              priority
            />
          </motion.div>
        );
      })}
    </>
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
    className: 'top-[55%] right-[5%]',
    message: 'Every pixel has a purpose ✦',
  },
];

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [activeEgg, setActiveEgg] = useState<string | null>(null);
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const imageIds = ['hero-1', 'hero-2', 'hero-3', 'hero-4'];
  const floatingImages = PlaceHolderImages.filter(img => imageIds.includes(img.id));

  useEffect(() => {
    setIsMounted(true);
    setAudio(new Audio('/sounds/chime.mp3'));
    const timer = setTimeout(() => setShowTitle(true), 500); // Delay for reveal
    return () => clearTimeout(timer);
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
      id="home"
      ref={constraintsRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden"
    >
      <div className="absolute inset-0 -z-20">
        <DotScreenShader />
      </div>
      

      <StarIcon className="absolute top-[10%] left-[20%] w-8 h-8 text-primary/50 star-spin -z-10" style={{ animationDuration: '15s' }} />
      <StarIcon className="absolute top-[80%] left-[5%] w-12 h-12 text-accent/50 star-spin -z-10" style={{ animationDuration: '25s' }}/>
      <StarIcon className="absolute top-[15%] right-[5%] w-10 h-10 text-primary/50 star-spin -z-10" style={{ animationDuration: '20s' }} />
      <StarIcon className="absolute bottom-[10%] right-[30%] w-6 h-6 text-accent/50 star-spin -z-10" style={{ animationDuration: '12s' }} />
      
      <SquiggleIcon className="absolute top-[5%] left-[50%] w-24 h-24 text-primary/20 star-spin -z-10" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
      <PlusIcon className="absolute top-[85%] left-[85%] w-10 h-10 text-accent/50 star-spin -z-10" style={{ animationDuration: '18s' }} />
      <SquiggleIcon className="absolute bottom-[5%] right-[5%] w-16 h-16 text-accent/30 star-spin -z-10" style={{ animationDuration: '30s' }} />
      <PlusIcon className="absolute bottom-[30%] left-[10%] w-8 h-8 text-primary/40 star-spin -z-10" style={{ animationDuration: '22s', animationDirection: 'reverse' }}/>

      {isMounted && (
        <FloatingImages images={floatingImages} constraintsRef={constraintsRef} />
      )}

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

      <div className="relative z-10 text-center flex flex-col items-center justify-center">
        <AnimatePresence>
          {showTitle && (
            <ComicText
              fontSize={6}
              style={{
                '--dot-color': 'hsl(var(--primary))',
                '--background-color': 'hsl(var(--accent))',
                fontFamily: 'var(--font-headline)',
              } as React.CSSProperties}
            >
              Aditi Agrawal
            </ComicText>
          )}
        </AnimatePresence>
        <motion.div
            className="mt-4 text-lg md:text-xl lg:text-2xl text-muted-foreground font-body max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
        >
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
        </motion.div>
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

    
