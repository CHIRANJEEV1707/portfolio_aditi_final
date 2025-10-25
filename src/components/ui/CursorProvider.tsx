'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, createContext, useContext } from 'react';
import { SplashCursor } from './splash-cursor';
import { CursorContext } from '@/contexts/CursorContext';

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isRouteDisabled, setIsRouteDisabled] = useState(false);
  const [isTrailDisabled, setIsTrailDisabled] = useState(false);

  useEffect(() => {
    // Routes to fully disable the cursor on
    const routesToDisable = ['/projects/'];
    const isDisabled = routesToDisable.some((route) =>
      pathname.startsWith(route)
    );
    setIsRouteDisabled(isDisabled);
  }, [pathname]);

  const showCursor = !isRouteDisabled;

  return (
    <CursorContext.Provider value={{ isTrailDisabled, setIsTrailDisabled }}>
      {showCursor && <SplashCursor disabled={isTrailDisabled} />}
      {children}
    </CursorContext.Provider>
  );
}
