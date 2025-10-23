
import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import AnimateOnScroll from '@/components/common/AnimateOnScroll';
import StarIcon from '@/components/common/StarIcon';
import PageTransition from '@/components/common/PageTransition';
import { cn } from '@/lib/utils';

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const heroImage = PlaceHolderImages.find((img) => img.id === project.imageId);

  return (
    <PageTransition>
      <div className="pt-24 pb-12 relative overflow-hidden">
        <StarIcon className="absolute -top-10 -left-10 w-32 h-32 text-primary/10 star-spin" />
        <StarIcon className="absolute bottom-20 -right-10 w-24 h-24 text-accent/10 star-spin" style={{ animationDuration: '30s' }} />
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
            delay="delay-200"
            className="container mx-auto mb-16"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={heroImage.imageUrl}
                alt={project.name}
                fill
                className="object-cover"
                sizes="100vw"
                priority
                data-ai-hint={heroImage.imageHint}
              />
            </div>
          </AnimateOnScroll>
        )}

        <AnimateOnScroll animation="slide-in-up" className="container mx-auto">
          <div>
            <div>
              <h2 className="font-headline text-3xl font-bold mb-4">The Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line max-w-4xl">
                {project.story}
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="container mx-auto mt-16">
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
                  delay={`delay-${index * 200}`}
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
      </div>
    </PageTransition>
  );
}
