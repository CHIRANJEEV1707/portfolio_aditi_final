'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

type SuccessPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SuccessPopup = ({ isOpen, onClose }: SuccessPopupProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="popup-content-animation relative w-full max-w-sm rounded-2xl border border-white/20 bg-background/70 p-8 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full p-1 text-muted-foreground transition-colors hover:bg-white/20 hover:text-foreground"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>
        <p className="mb-4 text-5xl">✨</p>
        <p className="text-lg font-medium text-foreground">
          You discovered all my creative Easter Eggs!
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Curiosity is the best creativity. 💙
        </p>
      </div>
    </div>
  );
};

export default SuccessPopup;
