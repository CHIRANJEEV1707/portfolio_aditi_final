import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com',
  },
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com',
  },
];

const Footer = () => {
  return (
    <footer className="bg-background py-8">
      <div className="container mx-auto text-center text-muted-foreground">
        <div className="flex justify-center gap-6 mb-4">
          {socialLinks.map((link) => (
            <Link
              href={link.url}
              key={link.name}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <link.icon className="w-6 h-6" />
            </Link>
          ))}
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Aditi Agrawal. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
