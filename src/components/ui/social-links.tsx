'use client';
import React from 'react';
import Link from 'next/link';

export type Social = {
  name: string;
  image: string;
  url: string;
};

interface AnimatedSocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: Social[];
}

const AnimatedSocialLinks = React.forwardRef<
  HTMLDivElement,
  AnimatedSocialLinksProps
>(({ socials, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className="flex items-center justify-center gap-4"
      {...props}
    >
      {socials.map((social) => (
        <Link
          href={social.url}
          key={social.name}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:text-primary transition-colors"
        >
          {social.name}
        </Link>
      ))}
    </div>
  );
});

AnimatedSocialLinks.displayName = 'AnimatedSocialLinks';

export default AnimatedSocialLinks;
