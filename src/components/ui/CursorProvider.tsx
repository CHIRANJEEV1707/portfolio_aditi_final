
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
    const homepageSectionsToDisable = ['#work', '#projects'];

    const updateCursorVisibility = () => {
      const currentHash = window.location.hash;
      const onHomepage = pathname === '/';

      const isDisabledByHash = onHomepage && homepageSectionsToDisable.some(section => currentHash.startsWith(section));
      const isDisabledByRoute = routesToDisable.some(route => pathname.startsWith(route));
      
      setShowCursor(!isDisabledByHash && !isDisabledByRoute);
    };

    updateCursorVisibility();

    window.addEventListener('hashchange', updateCursorVisibility);
    
    return () => {
      window.removeEventListener('hashchange', updateCursorVisibility);
    };

  }, [pathname]);

  return (
    <>
      {showCursor && <SplashCursor />}
      {children}
    </>
  );
}
