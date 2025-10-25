
'use client';

import Image from 'next/image';
import AnimateOnScroll from '@/components/common/AnimateOnScroll';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useState, useRef } from 'react';
import EasterEgg from '../common/EasterEgg';
import { useToast } from '@/hooks/use-toast';

const AboutSection = () => {
  const profileImage = PlaceHolderImages.find(
    (img) => img.id === 'aditi-profile'
  );
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLAnchorElement>(null);
  const { toast } = useToast();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  const handleEggClick = (message: string) => {
    toast({
      title: 'Aha!',
      description: message,
    })
  };

  const imageTransform = isHovering
    ? {
        transform: `perspective(800px) rotateX(${
          (mousePosition.y / (containerRef.current?.clientHeight || 1) - 0.5) * -15
        }deg) rotateY(${
          (mousePosition.x / (containerRef.current?.clientWidth || 1) - 0.5) * 15
        }deg) scale3d(1.05, 1.05, 1.05)`,
      }
    : { transform: 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)' };

  return (
    <section id="about" className="py-20 md:py-32 container mx-auto relative">
       <EasterEgg
          className="top-[10%] right-[5%] z-30"
          onClick={() => handleEggClick("Deep in thought!")}
        >
          🤔
        </EasterEgg>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        <AnimateOnScroll
          animation="fade-in"
          className="lg:col-span-2 relative"
        >
          <Link
            href="/about"
            ref={containerRef}
            className="group block"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="aspect-[4/5] relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-out" style={imageTransform}>
              {profileImage && (
                <Image
                  src={profileImage.imageUrl}
                  alt={profileImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={profileImage.imageHint}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              )}
              <div
                className="absolute text-white text-lg font-bold flex items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  top: mousePosition.y,
                  left: mousePosition.x,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                Read more
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </div>
            </div>
          </Link>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-in" className="lg:col-span-3 relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            A warm mix of creativity, curiosity, and calm energy.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            I find joy in turning little ideas into something beautiful. My
            passion lies at the intersection of strategic thinking and creative
            expression, where data-driven insights meet compelling
            storytelling. I believe in crafting marketing that not only converts
            but also connects with people on a deeper level.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default AboutSection;
