'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type EasterEggProps = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};

const EasterEgg = ({ children, className, onClick }: EasterEggProps) => {
  const [isFound, setIsFound] = useState(false);

  const handleClick = () => {
    if (!isFound) {
      setIsFound(true);
      onClick();
    }
  };

  return (
    <motion.div
      className={cn(
        'absolute text-4xl md:text-5xl cursor-pointer transition-opacity duration-500 hover:opacity-100 hover:drop-shadow-[0_0_10px_hsl(var(--primary))]',
        isFound ? 'opacity-50 cursor-default' : 'opacity-30',
        className
      )}
      onClick={handleClick}
      whileHover={{ scale: 1.2, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

export default EasterEgg;
