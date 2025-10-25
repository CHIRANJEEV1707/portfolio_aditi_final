
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SplashCursor } from './splash-cursor';

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      let shouldDisable = false;
      // Traverse up the DOM tree to see if any parent has the disable class
      while (target && target.parentElement) {
        if (target.classList.contains('disable-cursor-trail')) {
          shouldDisable = true;
          break;
        }
        target = target.parentElement;
      }
      setIsElementHovered(shouldDisable);
    };

    window.addEventListener('mousemove', handleMouseMove, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove, true);
    };
  }, []);

  const showCursor = !isRouteDisabled && !isElementHovered;

  return (
    <>
      {showCursor && <SplashCursor />}
      {children}
    </>
  );
}
