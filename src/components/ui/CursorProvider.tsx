
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

    if (isRouteDisabled) {
      setShowCursor(false);
      return;
    }

    const handleScroll = () => {
      const workSection = document.getElementById('work');
      if (workSection) {
        const rect = workSection.getBoundingClientRect();
        const isOverWorkSection = rect.top < window.innerHeight && rect.bottom > 0;
        setShowCursor(!isOverWorkSection);
      } else {
        setShowCursor(true);
      }
    };

    // Only add scroll listener on the homepage
    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    } else {
      setShowCursor(!isRouteDisabled);
    }
    
    return () => {
      if (pathname === '/') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname]);

  return (
    <>
      {showCursor && <SplashCursor />}
      {children}
    </>
  );
}
