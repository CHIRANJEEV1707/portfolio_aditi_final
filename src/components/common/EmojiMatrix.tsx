
'use client';

import React, { useEffect, useRef } from 'react';

const EmojiMatrix = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const emojis = ['✨', '🎨', '💡', '💭', '🚀', '📈', '🔍', '👾', '🌕', '💻', '❤️', '🍾', '🌸', '🌼'];
    const particleCount = 25;
    const particles: any[] = [];

    function Particle(this: any) {
      this.x = Math.random() * width;
      this.y = Math.random() * height + height;
      this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
      this.size = Math.random() * 25 + 25; // Increased size
      this.speed = Math.random() * 1 + 0.5;
      this.opacity = Math.random() * 0.6 + 0.6; // Increased opacity
    }

    Particle.prototype.draw = function() {
      if (!ctx) return;
      ctx.globalAlpha = this.opacity;
      ctx.font = `${this.size}px sans-serif`;
      ctx.fillText(this.emoji, this.x, this.y);
    };

    Particle.prototype.update = function() {
      this.y -= this.speed;
      if (this.y < -this.size) {
        this.y = height + this.size;
        this.x = Math.random() * width;
      }
    };

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new (Particle as any)());
      }
    }

    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles.length = 0;
      init();
    };

    init();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-2] pointer-events-none opacity-10">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default EmojiMatrix;
