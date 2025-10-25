
'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import TypingAnimation from '@/components/common/TypingAnimation';
import EasterEgg from '@/components/common/EasterEgg';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import {
  PlaceHolderImages,
  type ImagePlaceholder,
} from '@/lib/placeholder-images';
import { GridBackground } from '../ui/grid-background';
import { useToast } from '@/hooks/use-toast';

const FloatingImages = ({
  images,
  constraintsRef,
}: {
  images: ImagePlaceholder[];
  constraintsRef: React.RefObject<HTMLElement>;
}) => {
  const imageStyles = [
    { top: '10%', left: '5%', width: 150, duration: 25, rotate: -5 },
    { top: '60%', left: '85%', width: 120, duration: 30, rotate: 10 },
    { top: '5%', left: '90%', width: 100, duration: 20, rotate: -8 },
    { top: '75%', left: '2%', width: 180, duration: 35, rotate: 12 },
  ];

  return (
    <div className='absolute inset-0'>
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
              rotate: [style.rotate - 2, style.rotate + 2],
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
              },
            }}
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            whileHover={{
              scale: 1.1,
              zIndex: 20,
              filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))',
            }}
            whileDrag={{
              scale: 1.2,
              zIndex: 30,
              filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.3))',
            }}
          >
            <Image
              src={image.imageUrl}
              alt={image.description}
              width={style.width}
              height={(style.width * 4) / 3}
              className="object-cover rounded-lg pointer-events-none"
              sizes={`${style.width}px`}
              priority
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
    className: 'top-[15%] left-[80%]',
    message: 'You found me! 🌸',
  },
  {
    char: '🎨',
    className: 'bottom-[15%] right-[80%]',
    message: 'Creative minds notice details 💙',
  },
  {
    char: '💡',
    className: 'top-[15%] right-[80%]',
    message: 'Hidden spark unlocked ✨',
  },
  {
    char: '💭',
    className: 'bottom-[15%] left-[80%]',
    message: 'Imagination builds worlds ✨',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: i * 0.04 },
  }),
};

const childVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();


  const imageIds = ['hero-1', 'hero-2', 'hero-3', 'hero-4'];
  const floatingImages = PlaceHolderImages.filter((img) =>
    imageIds.includes(img.id)
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEggClick = (message: string) => {
    toast({
      title: 'Easter Egg Found!',
      description: message,
    });
  };
  
  const name = "Aditi";
  const surname = "Agrawal";

  return (
    <section
      id="home"
      ref={constraintsRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden"
    >
      <GridBackground />
      <FloatingImages
        images={floatingImages}
        constraintsRef={constraintsRef}
      />
      {isMounted &&
        easterEggs.map((egg, index) => (
          <EasterEgg
            key={index}
            className={`${egg.className} z-30`}
            onClick={() => handleEggClick(egg.message)}
          >
            {egg.char}
          </EasterEgg>
        ))}
      <div className="relative z-20">
        <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1),transparent_60%)]" />
        <div className="relative text-center flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center font-black uppercase tracking-tighter text-6xl md:text-8xl">
            <motion.div
              className="flex justify-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {name.split('').map((letter, index) => (
                <motion.p
                  key={index}
                  variants={childVariants}
                  className="m-0 text-transparent bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text"
                >
                  {letter}
                </motion.p>
              ))}
            </motion.div>
            <motion.div
              className="flex justify-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {surname.split('').map((letter, index) => (
                <motion.p
                  key={index}
                  variants={childVariants}
                  className="m-0 text-transparent bg-gradient-to-t from-foreground to-muted-foreground bg-clip-text"
                >
                  {letter}
                </motion.p>
              ))}
            </motion.div>
          </div>
          <div className="mt-4 text-lg md:text-xl lg:text-2xl text-muted-foreground font-body max-w-2xl mx-auto">
            {isMounted ? (
              <TypingAnimation
                texts={[
                  'Digital Marketing Strategist',
                  'Creative Solutionist',
                  'Aesthetic Thinker',
                  'Brand Storyteller',
                ]}
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={2500}
              />
            ) : (
              'Digital Marketing Strategist & Creative Solutionist'
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
        <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
      </div>

    </section>
  );
};

export default HeroSection;
