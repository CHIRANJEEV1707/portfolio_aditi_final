
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SplashCursor } from './splash-cursor';

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // These are the route prefixes to disable the cursor on
    const routesToDisable = ['/projects/'];
    
    const isDisabledByRoute = routesToDisable.some(route => pathname.startsWith(route));
    
    setShowCursor(!isDisabledByRoute);

  }, [pathname]);

  return (
    <>
      {showCursor && <SplashCursor />}
      {children}
    </>
  );
}
