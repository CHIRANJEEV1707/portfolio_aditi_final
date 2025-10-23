'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import AnimateOnScroll from '../common/AnimateOnScroll';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import StarIcon from '../common/StarIcon';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  const [hoveredProjectImage, setHoveredProjectImage] = useState<string | null>(
    null
  );
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setImagePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const defaultImage = PlaceHolderImages.find((img) => img.id === 'project-1');

  return (
    <section id="projects" className="py-20 md:py-32 container mx-auto relative">
      <StarIcon className="absolute top-10 left-0 w-24 h-24 text-accent/20 star-spin" style={{ animationDuration: '40s' }}/>
      
      <div className="relative z-10 border-t border-foreground/10">
        {projects.map((project) => {
          const projectImage = PlaceHolderImages.find(
            (img) => img.id === project.imageId
          );
          return (
            <AnimateOnScroll key={project.slug} animation="fade-in" asChild>
              <Link
                href={`/projects/${project.slug}`}
                className="group block"
                onMouseEnter={() =>
                  setHoveredProjectImage(projectImage?.imageUrl || null)
                }
                onMouseLeave={() => setHoveredProjectImage(null)}
              >
                <div className="border-b border-foreground/10 transition-colors duration-300 group-hover:bg-primary/5">
                  <div className="container mx-auto py-8 flex justify-between items-center">
                    <div>
                      <p className="text-muted-foreground mb-1 text-sm">
                        {project.client}
                      </p>
                      <h3 className="font-headline text-3xl md:text-5xl font-bold group-hover:text-primary transition-colors duration-300">
                        {project.name}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:rotate-45 shrink-0">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          );
        })}
      </div>

      {isClient && (
        <div
          className={cn(
            'pointer-events-none fixed top-0 left-0 z-0 transition-opacity duration-300 hidden md:block',
            hoveredProjectImage ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            transform: `translate(calc(${imagePosition.x}px - 200px), calc(${imagePosition.y}px - 150px))`,
          }}
          aria-hidden="true"
        >
          <div className="relative w-[400px] h-[300px] rounded-lg overflow-hidden shadow-2xl rotate-[-3deg]">
            <Image
              src={hoveredProjectImage || defaultImage?.imageUrl || ''}
              alt="Project preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
