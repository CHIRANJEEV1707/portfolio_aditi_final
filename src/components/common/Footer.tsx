import AnimatedSocialLinks, {
  type Social,
} from '@/components/ui/social-links';
import Link from 'next/link';

const socialLinks: Social[] = [
  {
    name: 'Instagram',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
    url: 'https://www.instagram.com/aditiii_a13?igsh=bXIycnp1YWhuNm1p&utm_source=qr',
  },
  {
    name: 'LinkedIn',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
    url: 'https://linkedin.com',
  },
  {
    name: 'Pinterest',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png',
    url: 'https://pinterest.com',
  },
];

const Footer = () => {
  return (
    <footer className="bg-background py-8">
      <div className="container mx-auto text-center text-muted-foreground">
        <div className="flex justify-center gap-6 mb-4">
          <AnimatedSocialLinks
            socials={socialLinks}
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
