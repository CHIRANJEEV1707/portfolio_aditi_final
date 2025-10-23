'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: {
            opacity: 0,
            filter: 'blur(10px)',
          },
          animate: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
              duration: 0.7,
              ease: 'easeInOut',
            },
          },
          exit: {
            opacity: 0,
            filter: 'blur(10px)',
            transition: {
              duration: 0.7,
              ease: 'easeInOut',
            },
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
