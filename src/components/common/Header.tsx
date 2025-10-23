'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimateOnScroll from './AnimateOnScroll';

const Header = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6">
      <AnimateOnScroll
        animation="fade-in"
        className="container mx-auto flex justify-end items-center"
      >
      </AnimateOnScroll>
    </header>
  );
};

export default Header;
