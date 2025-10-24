'use client';

import Link from 'next/link';
import { Home, User, Briefcase, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export type NavItem = {
  name: string;
  url: string;
  icon: typeof Home;
};

const navItems: NavItem[] = [
  { name: 'Home', url: '#home', icon: Home },
  { name: 'About', url: '#about', icon: User },
  { name: 'Work', url: '#work', icon: Briefcase },
  { name: 'Contact', url: '#contact', icon: Mail },
];

export function NavBar({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== '/') return;
      const sections = items.map(item => document.getElementById(item.url.substring(1)));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items, pathname]);

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 p-4">
      <nav className="flex items-center gap-2 bg-background/80 border backdrop-blur-md p-2 rounded-full shadow-lg">
        {items.map((item) => {
           const id = item.url.substring(1);
           const isActive = activeTab === id;
           const href = pathname === "/" ? item.url : `/${item.url}`

          return (
            <Link
              key={item.name}
              href={href}
              onClick={() => {
                if (pathname === '/') {
                  setActiveTab(id)
                }
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive ? "bg-primary/10 text-primary" : ""
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <item.icon className="md:hidden h-5 w-5" />
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
