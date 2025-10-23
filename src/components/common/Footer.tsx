import AnimatedSocialLinks, {
  type Social,
} from '@/components/ui/social-links';
import Link from 'next/link';

const socialLinks: Social[] = [
  {
    name: 'Twitter',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg',
    url: 'https://twitter.com',
  },
  {
    name: 'LinkedIn',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
    url: 'https://linkedin.com',
  },
  {
    name: 'GitHub',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
    url: 'https://github.com',
  },
];

const Footer = () => {
  return (
    <footer className="bg-background py-8">
      <div className="container mx-auto text-center text-muted-foreground">
        <div className="flex justify-center gap-6 mb-4">
          <AnimatedSocialLinks
            socials={socialLinks.map((s) => ({
              name: s.name,
              image: s.image,
            }))}
            className="!gap-6"
          />
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Aditi Agrawal. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
