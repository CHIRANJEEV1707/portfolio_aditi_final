
'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useWindowSize } from '@/hooks/useWindowSize';

const EMOJIS = ['✨', '🎨', '💡', '💭', '🚀', '📈', '🌸', '💙', '🔍', '👾', '💻', '🍾', '🌕'];
const EMOJI_COUNT = 12;

const FloatingEmojis = () => {
  const { width, height } = useWindowSize();
  const [emojis, setEmojis] = useState<any[]>([]);

  useEffect(() => {
    if (width && height) {
      setEmojis(
        Array.from({ length: EMOJI_COUNT }).map((_, i) => ({
          id: i,
          emoji: EMOJIS[i % EMOJIS.length],
          x: Math.random() * width,
          y: Math.random() * height, // Keep this for initial random distribution
          size: Math.random() * 30 + 25,
          duration: Math.random() * 15 + 10,
          delay: Math.random() * 5,
        }))
      );
    }
  }, [width, height]);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none overflow-hidden">
      {emojis.map((emoji) => (
        <motion.div
          key={emoji.id}
          className="absolute"
          style={{
            left: emoji.x,
            fontSize: emoji.size,
            opacity: Math.random() * 0.5 + 0.1,
          }}
          initial={{
            y: -50, // Start above the screen
          }}
          animate={{
            y: height ? height + 50 : 1000,
          }}
          transition={{
            duration: emoji.duration,
            delay: emoji.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
        >
          {emoji.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingEmojis;
