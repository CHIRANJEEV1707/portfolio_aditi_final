
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import AnimateOnScroll from '@/components/common/AnimateOnScroll';
import PageTransition from '@/components/common/PageTransition';
import Footer from '@/components/common/Footer';
import EasterEgg from '@/components/common/EasterEgg';
import { useToast } from '@/hooks/use-toast';
import { useRef } from 'react';
import DraggableImage from '@/components/common/DraggableImage';

export default function AboutPage() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const profileImage = PlaceHolderImages.find(
    (img) => img.id === 'aditi-profile'
  );
  const aboutImage1 = PlaceHolderImages.find((img) => img.id === 'about-1');
  const aboutImage2 = PlaceHolderImages.find((img) => img.id === 'about-2');
  const aboutImage3 = PlaceHolderImages.find((img) => img.id === 'about-3');

  const { toast } = useToast();
  const handleEggClick = (message: string) => {
    toast({
      title: 'Easter Egg Found!',
      description: message,
    });
  };

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <div
          ref={constraintsRef}
          className="pt-24 pb-12 relative overflow-hidden flex-grow"
        >
          <EasterEgg
            className="top-[10%] left-[5%] z-30"
            onClick={() =>
              handleEggClick(
                'Currently manifesting engagement rates higher than my anxiety levels🌸'
              )
            }
          >
            🚀
          </EasterEgg>
          <EasterEgg
            className="bottom-[20%] right-[10%] z-30"
            onClick={() =>
              handleEggClick(
                'Your girl makes strategy so good even the algorithm takes notes😏'
              )
            }
          >
            📈
          </EasterEgg>

          <AnimateOnScroll animation="fade-in" className="container mx-auto">
            <header className="text-center my-16">
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                Aditi
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Digital Marketing Strategist & Creative Solutionist
              </p>
            </header>
          </AnimateOnScroll>

          <div className="container mx-auto flex flex-col items-center gap-12">
            <AnimateOnScroll animation="fade-in">
              <div className="prose prose-lg dark:prose-invert text-muted-foreground max-w-3xl leading-relaxed space-y-6 text-center">
                <p>
                  Hello! I'm Aditi, a marketing enthusiast with a heart for
                  design and a mind for strategy. My journey into the world of
                  digital marketing began with a simple curiosity: how do
                  brands capture our attention and, more importantly, our
                  loyalty? This question has led me down a path of continuous
                  learning, from mastering the art of SEO to crafting viral
                  social media campaigns.
                </p>
                <p>
                  With a degree in Psychology, my fascination with people and
                  their stories gradually shaped into a passion for
                  communication, design, and digital marketing. From content
                  strategy and campaign planning to shoot direction and grid
                  aesthetics, I blend structure with creativity to help brands
                  grow with meaning. I’ve had the opportunity to work with
                  hospitality, lifestyle, retail, and political clients,
                  creating content that looks good, feels right, and connects
                  deeply. I believe every brand has a heartbeat, and my goal is
                  to make people feel it, through design, words, and little
                  details that make a big difference.
                </p>
                <p>
                  When I’m not crafting brand stories, I’m probably exploring
                  new cafes, scrolling through Pinterest, or finding
                  inspiration in everyday moments.
                </p>
                <p>
                  I'm always excited to connect with like-minded individuals
                  and brands who are passionate about making a positive impact.
                  Let's create something bold together.
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Draggable Images */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {profileImage && (
              <div className="absolute top-[20%] left-[10%] pointer-events-auto">
                <DraggableImage
                  image={profileImage}
                  constraintsRef={constraintsRef}
                  width={250}
                />
              </div>
            )}
            {aboutImage1 && (
              <div className="absolute top-[60%] left-[5%] pointer-events-auto">
                <DraggableImage
                  image={aboutImage1}
                  constraintsRef={constraintsRef}
                  width={200}
                />
              </div>
            )}
            {aboutImage2 && (
              <div className="absolute top-[15%] right-[12%] pointer-events-auto">
                <DraggableImage
                  image={aboutImage2}
                  constraintsRef={constraintsRef}
                  width={220}
                />
              </div>
            )}
            {aboutImage3 && (
              <div className="absolute top-[65%] right-[15%] pointer-events-auto">
                <DraggableImage
                  image={aboutImage3}
                  constraintsRef={constraintsRef}
                  width={180}
                />
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
