import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import AnimateOnScroll from '@/components/common/AnimateOnScroll';
import StarIcon from '@/components/common/StarIcon';

export default function AboutPage() {
  const profileImage = PlaceHolderImages.find(
    (img) => img.id === 'aditi-profile'
  );

  return (
    <div className="pt-24 pb-12 relative overflow-hidden bg-background">
      <StarIcon className="absolute -top-10 -left-10 w-32 h-32 text-primary/10 star-spin" />
      <StarIcon className="absolute bottom-20 -right-10 w-24 h-24 text-accent/10 star-spin" style={{ animationDuration: '30s' }} />
      
      <AnimateOnScroll animation="fade-in" delay="delay-100" className="container mx-auto">
        <header className="text-center my-16">
          <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            Aditi Agrawal
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Digital Marketing Strategist & Creative Solutionist
          </p>
        </header>
      </AnimateOnScroll>
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <AnimateOnScroll animation="slide-in-left" delay="delay-200" className="md:col-span-1">
          <div className="aspect-square relative rounded-full overflow-hidden shadow-2xl mx-auto md:mx-0 max-w-xs">
            {profileImage && (
              <Image
                src={profileImage.imageUrl}
                alt={profileImage.description}
                fill
                className="object-cover"
                data-ai-hint={profileImage.imageHint}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            )}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="slide-in-up" delay="delay-300" className="md:col-span-2">
          <div className="prose prose-lg prose-invert text-muted-foreground max-w-none leading-relaxed space-y-6">
            <p>
              Hello! I'm Aditi, a marketing enthusiast with a heart for design and a mind for strategy. 
              My journey into the world of digital marketing began with a simple curiosity: how do brands capture our attention and, more importantly, our loyalty? This question has led me down a path of continuous learning, from mastering the art of SEO to crafting viral social media campaigns.
            </p>
            <p>
              I find joy in turning little ideas into something beautiful. My
              passion lies at the intersection of strategic thinking and creative
              expression, where data-driven insights meet compelling
              storytelling. I believe in crafting marketing that not only converts
              but also connects with people on a deeper level. For me, it's about creating experiences that feel authentic, memorable, and genuinely human.
            </p>
            <p>
              When I'm not brainstorming campaign ideas or analyzing analytics, you can find me exploring local art galleries, experimenting with new recipes in the kitchen, or getting lost in a good book. I believe that creativity is a muscle that needs to be exercised in all areas of life, and I bring that philosophy into every project I tackle.
            </p>
            <p>
              I'm always excited to connect with like-minded individuals and brands who are passionate about making a positive impact. Let's create something bold together.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
