'use client';

import { useRef } from 'react';
import { ImageTrail } from '@/components/ui/image-trail';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const WorkSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const imageIds = ['project-1', 'project-2', 'project-3', 'project-4'];
  const trailImages = PlaceHolderImages.filter((img) =>
    imageIds.includes(img.id)
  );

  return (
    <div
      id="work"
      ref={ref}
      className="flex w-full h-[50vh] justify-center items-center bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 z-0 h-full w-full">
        <ImageTrail containerRef={ref}>
          {trailImages.map((image) => (
            <div
              key={image.id}
              className="flex relative overflow-hidden w-24 h-24 rounded-lg shadow-md"
            >
              <Image
                src={image.imageUrl}
                alt={image.description}
                className="object-cover absolute inset-0"
                fill
                sizes="96px"
              />
            </div>
          ))}
        </ImageTrail>
      </div>
      <h2 className="font-headline text-7xl md:text-9xl font-black z-10 select-none text-center uppercase tracking-tighter">
        Work
      </h2>
    </div>
  );
};

export default WorkSection;
