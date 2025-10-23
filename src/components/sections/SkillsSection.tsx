import { Megaphone, BrainCircuit, Lightbulb, BarChart3, Users, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimateOnScroll from '../common/AnimateOnScroll';
import StarIcon from '../common/StarIcon';

const skills = [
  {
    icon: Megaphone,
    title: 'Crafting brands that speak.',
    description: 'Building memorable brand identities and voices.',
  },
  {
    icon: BarChart3,
    title: 'Planning campaigns that convert.',
    description: 'Data-driven strategies for measurable results.',
  },
  {
    icon: Lightbulb,
    title: 'Making creativity make sense.',
    description: 'Translating innovative ideas into effective marketing.',
  },
  {
    icon: BrainCircuit,
    title: 'Digital Strategy',
    description: 'Holistic planning for long-term online growth.',
  },
  {
    icon: Users,
    title: 'Community Management',
    description: 'Fostering and engaging online communities.',
  },
  {
    icon: Palette,
    title: 'Content Creation',
    description: 'Visually compelling and engaging content.',
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 md:py-32 bg-secondary/50 relative overflow-hidden">
      <StarIcon className="absolute -top-20 -right-20 w-48 h-48 text-primary/10 star-spin" />
      <StarIcon className="absolute bottom-10 left-10 w-24 h-24 text-accent/10 star-spin" style={{ animationDirection: 'reverse' }} />
      <div className="container mx-auto">
        <AnimateOnScroll as="h2" animation="slide-in-up" className="font-headline text-5xl md:text-6xl font-bold text-center mb-12">
          My Skillz
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <AnimateOnScroll
              key={index}
              animation="slide-in-up"
              delay={`delay-${index * 100}`}
            >
              <Card className="h-full text-center bg-card/80 backdrop-blur-sm border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-2xl group">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <skill.icon className="w-12 h-12 text-primary group-hover:text-accent transition-colors duration-300 group-hover:scale-110" />
                  </div>
                  <CardTitle className="font-headline text-2xl">{skill.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
