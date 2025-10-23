import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import AnimateOnScroll from '../common/AnimateOnScroll';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((project, index) => {
          const projectImage = PlaceHolderImages.find(
            (img) => img.id === project.imageId
          );
          return (
            <AnimateOnScroll
              key={project.slug}
              animation="fade-in"
              delay={`delay-${(index % 2) * 150}`}
              asChild
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <Card className="overflow-hidden h-full transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                  {projectImage && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={projectImage.imageUrl}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={projectImage.imageHint}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-muted-foreground mb-1 text-sm">
                          {project.client}
                        </p>
                        <h3 className="font-headline text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors duration-300">
                          {project.name}
                        </h3>
                      </div>
                      <div className="mt-1 w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:rotate-45">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </AnimateOnScroll>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
