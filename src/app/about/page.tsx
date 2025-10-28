
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
  const { toast } = useToast();
  const handleEggClick = (message: string) => {
    toast({
      title: 'Easter Egg Found!',
      description: message,
    });
  };


  return (
    <>
      <PageTransition>
        <div ref={constraintsRef} className="pt-24 pb-12 relative overflow-hidden">
          <EasterEgg
              className="top-[10%] left-[5%] z-30"
              onClick={() => handleEggClick("Currently manifesting engagement rates higher than my anxiety levels🌸")}
            >
              🚀
            </EasterEgg>
            <EasterEgg
              className="bottom-[20%] right-[10%] z-30"
              onClick={() => handleEggClick("Your girl makes strategy so good even the algorithm takes notes😏")}
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
          
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <AnimateOnScroll animation="fade-in" className="md:col-span-1 h-[350px] flex items-center justify-center">
              <div className="mx-auto md:mx-0 max-w-xs">
                {profileImage && (
                   <DraggableImage image={profileImage} constraintsRef={constraintsRef} width={300} />
                )}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" className="md:col-span-2">
              <div className="prose prose-lg dark:prose-invert text-muted-foreground max-w-none leading-relaxed space-y-6">
                <p>
                  Hello! I'm Aditi, a marketing enthusiast with a heart for design and a mind for strategy. 
                  My journey into the world of digital marketing began with a simple curiosity: how do brands capture our attention and, more importantly, our loyalty? This question has led me down a path of continuous learning, from mastering the art of SEO to crafting viral social media campaigns.
                </p>
                <p>
                With a degree in Psychology, my fascination with people and their stories gradually shaped into a passion for communication, design, and digital marketing.

From content strategy and campaign planning to shoot direction and grid aesthetics, I blend structure with creativity to help brands grow with meaning. I’ve had the opportunity to work with hospitality, lifestyle, retail, and political clients, creating content that looks good, feels right, and connects deeply.

I believe every brand has a heartbeat, and my goal is to make people feel it, through design, words, and little details that make a big difference.

                </p>
                <p>
                When I’m not crafting brand stories, I’m probably exploring new cafes, scrolling through Pinterest, or finding inspiration in everyday moments.
                </p>
                <p>
                  I'm always excited to connect with like-minded individuals and brands who are passionate about making a positive impact. Let's create something bold together.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}
