'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// We have to dynamically import vanta.js to avoid SSR issues
let DOTS: any = null;

const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !DOTS) {
      import('vanta/dist/vanta.dots.min.js').then((vantaModule) => {
        DOTS = vantaModule.default;
        if (vantaRef.current && !vantaEffect) {
          const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary')
            .trim();
          const backgroundColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--background')
            .trim();

          const effect = DOTS({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: `hsl(${primaryColor})`,
            color2: `hsl(${primaryColor})`,
            backgroundColor: `hsl(${backgroundColor})`,
            size: 2.5,
            spacing: 30.00,
            showLines: false,
          });
          setVantaEffect(effect);
        }
      });
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 -z-10"
    />
  );
};

export default VantaBackground;
