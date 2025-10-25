
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isRouteDisabled, setIsRouteDisabled] = useState(false);

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
    <>
      {children}
    </>
  );
}
