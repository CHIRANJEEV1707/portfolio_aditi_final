
'use client'
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

  return (
    <PageTransition>
      <div ref={constraintsRef} className="min-h-screen pt-24 pb-12 relative overflow-hidden">
        <EasterEgg
          className="top-1/4 left-[5%] z-30"
          onClick={() => handleEggClick("Waah Shampy waaaah, aur easter eggs chaiye😑")}
        >
          🔍
        </EasterEgg>
        <AnimateOnScroll animation="fade-in">
          <header className="container mx-auto mb-12">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/#projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all projects
              </Link>
            </Button>
            <p className="text-primary font-bold mb-2">{project.client}</p>
            <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter">
              {project.name}
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-muted-foreground max-w-3xl">
              {project.description}
            </p>
          </header>
        </AnimateOnScroll>

        {heroImage && (
          <AnimateOnScroll
            animation="fade-in"
            className="container mx-auto mb-16 h-[50vh] flex items-center justify-center"
          >
            <DraggableImage image={heroImage} constraintsRef={constraintsRef} width={600} />
          </AnimateOnScroll>
        )}

        <AnimateOnScroll animation="fade-in" className="container mx-auto">
          <div>
            <div>
              <h2 className="font-headline text-3xl font-bold mb-4">The Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line max-w-4xl">
                {project.story}
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="container mx-auto mt-16 mb-32">
          <h2 className="font-headline text-3xl font-bold mb-8">Visuals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.visuals.map((visualId, index) => {
              const visualImage = PlaceHolderImages.find(
                (img) => img.id === visualId
              );
              if (!visualImage) return null;
              return (
                <AnimateOnScroll
                  key={visualId}
                  animation="fade-in"
                >
                  <div
                    className={cn(
                      'relative w-full overflow-hidden rounded-lg shadow-md',
                      project.slug === 'hukams-lalit-mahal'
                        ? 'aspect-[4/3]'
                        : 'aspect-video'
                    )}
                  >
                    <Image
                      src={visualImage.imageUrl}
                      alt={`Visual for ${project.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      data-ai-hint={visualImage.imageHint}
                    />
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
