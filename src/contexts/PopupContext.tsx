
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface PopupContextType {
  isPopupVisible: boolean;
  popupMessage: string;
  showPopup: (message: string) => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudio(new Audio('/sounds/chime.mp3'));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPopupVisible) {
      timer = setTimeout(() => {
        setIsPopupVisible(false);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isPopupVisible]);

  const showPopup = useCallback((message: string) => {
    setPopupMessage(message);
    setIsPopupVisible(true);
    audio?.play().catch((err) => console.error('Audio play failed:', err));
  }, [audio]);

  return (
    <PopupContext.Provider value={{ isPopupVisible, popupMessage, showPopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};
