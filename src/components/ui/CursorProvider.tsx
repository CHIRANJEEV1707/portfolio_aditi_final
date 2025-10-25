'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, createContext, useContext } from 'react';
import { SplashCursor } from './splash-cursor';

const CursorContext = createContext({
  isElementHovered: false,
  setIsElementHovered: (isHovered: boolean) => {},
});

export const useCursorContext = () => useContext(CursorContext);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isRouteDisabled, setIsRouteDisabled] = useState(false);
  const [isElementHovered, setIsElementHovered] = useState(false);

  useEffect(() => {
    // Routes to fully disable the cursor on
    const routesToDisable = ['/projects/'];
    const isDisabled = routesToDisable.some((route) =>
      pathname.startsWith(route)
    );
    setIsRouteDisabled(isDisabled);
  }, [pathname]);

  const showCursor = !isRouteDisabled && !isElementHovered;

  return (
    <CursorContext.Provider value={{ isElementHovered, setIsElementHovered }}>
      {showCursor && <SplashCursor />}
      {children}
    </CursorContext.Provider>
  );
}
