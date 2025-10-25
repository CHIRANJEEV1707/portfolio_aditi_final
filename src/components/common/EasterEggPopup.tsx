
'use client';

import { usePopup } from '@/contexts/PopupContext';
import { AnimatePresence, motion } from 'framer-motion';

const EasterEggPopup = () => {
  const { isPopupVisible, popupMessage } = usePopup();

  return (
    <AnimatePresence>
      {isPopupVisible && (
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
  );
};

export default EasterEggPopup;
