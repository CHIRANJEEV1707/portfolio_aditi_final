
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SplashCursor } from './splash-cursor';

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // These are the sections on the homepage to disable the cursor on
    const homepageSectionsToDisable = ['#work', '#projects'];
    // These are the route prefixes to disable the cursor on
    const routesToDisable = ['/projects/'];

    const shouldShow =
      !routesToDisable.some((route) => pathname.startsWith(route)) &&
      !homepageSectionsToDisable.some((section) => window.location.hash.startsWith(section));

    setShowCursor(shouldShow);

    const handleHashChange = () => {
        const shouldShow =
        !routesToDisable.some((route) => pathname.startsWith(route)) &&
        !homepageSectionsToDisable.some((section) => window.location.hash.startsWith(section));
        setShowCursor(shouldShow);
    }
    
    window.addEventListener('hashchange', handleHashChange);

    return () => {
        window.removeEventListener('hashchange', handleHashChange);
    }

  }, [pathname]);

  return (
    <>
      {showCursor && <SplashCursor />}
      {children}
    </>
  );
}
