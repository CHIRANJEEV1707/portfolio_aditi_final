
'use client';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import AnimateOnScroll from '@/components/common/AnimateOnScroll';
import PageTransition from '@/components/common/PageTransition';
import { cn } from '@/lib/utils';
import EasterEgg from '@/components/common/EasterEgg';
import { useToast } from '@/hooks/use-toast';
import { useRef } from 'react';
import DraggableImage from '@/components/common/DraggableImage';
import Footer from '@/components/common/Footer';

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const project = projects.find((p) => p.slug === params.slug);
  const { toast } = useToast();

  if (!project) {
    notFound();
  }
  const handleEggClick = (message: string) => {
    toast({
      title: 'Easter Egg Found!',
      description: message,
    });
  };

  const heroImage = PlaceHolderImages.find((img) => img.id === project.imageId);
  const visual1 = PlaceHolderImages.find(
    (img) => img.id === project.visuals[0]
  );
  const visual2 = PlaceHolderImages.find(
    (img) => img.id === project.visuals[1]
  );
  const visual3 = PlaceHolderImages.find((img) => img.id === 'project-extra-1');
  const visual4 = PlaceHolderImages.find((img) => img.id === 'project-extra-2');

  return (
    <PageTransition>
      <div
        ref={constraintsRef}
        className="min-h-screen pt-24 pb-12 relative overflow-hidden flex flex-col"
      >
        <div className="flex-grow container mx-auto flex flex-col items-center">
          <EasterEgg
            className="top-1/4 left-[5%] z-30"
            onClick={() =>
              handleEggClick('Waah Shampy waaaah, aur easter eggs chaiye😑')
            }
          >
            🔍
          </EasterEgg>

          <div className="w-full max-w-3xl text-center">
            <AnimateOnScroll animation="fade-in">
              <header className="my-16">
                <p className="text-primary font-bold mb-2">{project.client}</p>
                <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter">
                  {project.name}
                </h1>
                <p className="mt-4 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                  {project.description}
                </p>
              </header>
            </AnimateOnScroll>

            {heroImage && (
              <AnimateOnScroll
                animation="fade-in"
                className="mb-16 flex items-center justify-center"
              >
                <DraggableImage
                  image={heroImage}
                  constraintsRef={constraintsRef}
                  width={600}
                />
              </AnimateOnScroll>
            )}

            <AnimateOnScroll animation="fade-in">
              <div className="prose prose-lg dark:prose-invert text-muted-foreground max-w-3xl leading-relaxed space-y-6 text-center mx-auto">
                <h2 className="font-headline text-3xl font-bold mb-4">
                  The Story
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.story}
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Draggable Images */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {visual1 && (
              <div className="absolute top-[30%] left-[75%] pointer-events-auto">
                <DraggableImage
                  image={visual1}
                  constraintsRef={constraintsRef}
                  width={250}
                />
              </div>
            )}
            {visual2 && (
              <div className="absolute top-[60%] left-[10%] pointer-events-auto">
                <DraggableImage
                  image={visual2}
                  constraintsRef={constraintsRef}
                  width={200}
                />
              </div>
            )}
            {visual3 && (
              <div className="absolute top-[75%] right-[10%] pointer-events-auto">
                <DraggableImage
                  image={visual3}
                  constraintsRef={constraintsRef}
                  width={220}
                />
              </div>
            )}
            {visual4 && (
              <div className="absolute top-[10%] right-[15%] pointer-events-auto">
                <DraggableImage
                  image={visual4}
                  constraintsRef={constraintsRef}
                  width={180}
                />
              </div>
            )}
          </div>
        </div>
        <div className="mb-16"></div>
        <Footer />
      </div>
    </PageTransition>
  );
}
