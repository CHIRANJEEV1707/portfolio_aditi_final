
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import { projects } from '@/lib/data';
import WorkSection from '@/components/sections/WorkSection';
import Footer from '@/components/common/Footer';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <ProjectsSection projects={projects} />
      <ContactSection />
      <Footer />
    </>
  );
}
