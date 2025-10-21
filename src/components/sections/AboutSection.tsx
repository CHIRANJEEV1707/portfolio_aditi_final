import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import StarIcon from '@/components/common/StarIcon';
import AnimateOnScroll from '@/components/common/AnimateOnScroll';

const AboutSection = () => {
  const profileImage = PlaceHolderImages.find((img) => img.id === 'aditi-profile');

  return (
    <section id="about" className="py-20 md:py-32 container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        <AnimateOnScroll
          animation="slide-in-left"
          className="lg:col-span-2 relative"
        >
          {profileImage && (
            <div className="aspect-[4/5] relative rounded-lg overflow-hidden shadow-2xl rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
              <Image
                src={profileImage.imageUrl}
                alt={profileImage.description}
                fill
                className="object-cover"
                data-ai-hint={profileImage.imageHint}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          )}
          <StarIcon className="absolute -top-8 -left-8 w-16 h-16 text-accent star-spin" />
          <StarIcon className="absolute -bottom-5 -right-5 w-10 h-10 text-primary star-spin" style={{animationDuration: '30s'}}/>
        </AnimateOnScroll>
        <AnimateOnScroll
          animation="slide-in-right"
          className="lg:col-span-3"
        >
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">
            A warm mix of creativity, curiosity, and calm energy.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            I find joy in turning little ideas into something beautiful. My passion lies at the intersection of strategic thinking and creative expression, where data-driven insights meet compelling storytelling. I believe in crafting marketing that not only converts but also connects with people on a deeper level.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default AboutSection;
