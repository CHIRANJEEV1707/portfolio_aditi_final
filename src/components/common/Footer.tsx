import Link from 'next/link';
import AnimatedSocialLinks, { type Social } from '@/components/ui/social-links';

const socialLinks: Social[] = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/aditiii_a13?igsh=bXIycnp1YWhuNm1p&utm_source=qr',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/aditi-agrawal-700502266?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
  },
  {
    name: 'Pinterest',
    url: 'https://pin.it/5Ld21II1O',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png',
  },
];

const Footer = () => {
  return (
    <footer className="bg-background py-8">
      <div className="container mx-auto text-center text-muted-foreground">
        <div className="flex justify-center mb-4">
          <AnimatedSocialLinks socials={socialLinks} />
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Aditi Agrawal. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
