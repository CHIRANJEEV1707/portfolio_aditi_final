'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

interface DraggableImageProps {
  image: ImagePlaceholder;
  constraintsRef: React.RefObject<HTMLElement>;
  width?: number;
}

export default function DraggableImage({
  image,
  constraintsRef,
  width = 300,
}: DraggableImageProps) {
  return (
    <motion.div
      className="relative z-10 rounded-lg shadow-lg cursor-grab active:cursor-grabbing aspect-square mx-auto"
      style={{
        width: `${width}px`,
        height: 'auto',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      }}
      drag
      dragConstraints={constraintsRef}
      dragMomentum={false}
      whileHover={{
        scale: 1.05,
        zIndex: 20,
        filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))',
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 30,
        filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.3))',
      }}
    >
      <Image
        src={image.imageUrl}
        alt={image.description}
        fill
        className="object-cover rounded-lg pointer-events-none"
        sizes={`(max-width: 768px) 100vw, ${width}px`}
        priority
      />
    </motion.div>
  );
}
