import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import AnimateOnScroll from '../common/AnimateOnScroll';
import { ArrowUpRight } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <section id="work" className="py-20 md:py-32 container mx-auto">
      <AnimateOnScroll
        as="h2"
        animation="slide-in-up"
        className="font-headline text-5xl md:text-6xl font-bold mb-12"
      >
        Selected Work
      </AnimateOnScroll>
      <div className="border-t border-foreground/20">
        {projects.map((project, index) => {
          const projectImage = PlaceHolderImages.find(
            (img) => img.id === project.imageId
          );
          return (
            <AnimateOnScroll key={project.slug} animation="fade-in">
              <Link
                href={`/projects/${project.slug}`}
                className="group block border-b border-foreground/20"
              >
                <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-8 py-8 px-4 transition-all duration-300 group-hover:bg-secondary/50">
                  <div className="flex-1">
                    <p className="text-muted-foreground mb-1">{project.client}</p>
                    <h3 className="font-headline text-3xl md:text-5xl font-bold group-hover:text-primary transition-colors duration-300">
                      {project.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-muted-foreground text-lg">{project.date}</p>
                    <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:rotate-45">
                        <ArrowUpRight className="w-5 h-5"/>
                    </div>
                  </div>

                  {projectImage && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 aspect-video pointer-events-none opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out -rotate-6 z-10 hidden lg:block">
                      <Image
                        src={projectImage.imageUrl}
                        alt={project.name}
                        fill
                        className="object-cover rounded-lg shadow-2xl"
                        data-ai-hint={projectImage.imageHint}
                        sizes="256px"
                      />
                    </div>
                  )}
                </div>
              </Link>
            </AnimateOnScroll>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
