import Image from 'next/image';
import AnimateOnScroll from '@/components/common/AnimateOnScroll';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const AboutSection = () => {
  const profileImage = PlaceHolderImages.find(
    (img) => img.id === 'aditi-profile'
  );

  return (
    <section id="about" className="py-20 md:py-32 container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        <AnimateOnScroll
          animation="fade-in"
          className="lg:col-span-2 relative"
        >
            <Link href="/about">
              <div className="aspect-[4/5] relative rounded-lg overflow-hidden shadow-lg">
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
              </div>
            </Link>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-in" className="lg:col-span-3">
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
           <Link href="/about" className="inline-flex items-center text-primary mt-4 font-bold">
            Read more about me <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default AboutSection;
