
'use client';

import { useRef } from 'react';
import { ImageTrail } from '@/components/ui/image-trail';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import StarIcon from '../common/StarIcon';

const WorkSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const imageIds = [
    'work-trail-1',
    'work-trail-2',
    'work-trail-3',
    'work-trail-4',
    'work-trail-5',
    'work-trail-6',
    'work-trail-7',
  ];
  const trailImages = PlaceHolderImages.filter((img) =>
    imageIds.includes(img.id)
  );

  return (
    <div
      id="work"
      ref={ref}
      className="flex w-full h-[50vh] justify-center items-center relative overflow-hidden"
    >
      <StarIcon className="absolute top-1/4 left-1/4 w-8 h-8 text-primary/30" />
      <StarIcon className="absolute bottom-1/4 right-1/4 w-12 h-12 text-primary/30 rotate-12" />
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
      <h2 className="text-7xl md:text-9xl font-black z-10 select-none text-center uppercase tracking-tighter">
        Work
      </h2>
    </div>
  );
};

export default WorkSection;
