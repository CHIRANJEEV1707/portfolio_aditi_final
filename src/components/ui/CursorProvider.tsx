
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SplashCursor } from './splash-cursor';

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Routes to fully disable the cursor on
    const routesToDisable = ['/projects/'];
    const isRouteDisabled = routesToDisable.some(route => pathname.startsWith(route));

    setShowCursor(!isRouteDisabled);
    
  }, [pathname]);

  return (
    <>
      {showCursor && <SplashCursor />}
      {children}
    </>
  );
}
