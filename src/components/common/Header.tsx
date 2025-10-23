'use client';

import { NavBar, type NavItem } from '@/components/ui/tubelight-navbar';
import { Home, User, Briefcase, Mail } from 'lucide-react';

const navItems: NavItem[] = [
  { name: 'Home', url: '#home', icon: Home },
  { name: 'About', url: '#about', icon: User },
  { name: 'Work', url: '#work', icon: Briefcase },
  { name: 'Contact', url: '#contact', icon: Mail },
];

const Header = () => {
  return <NavBar items={navItems} />;
};

export default Header;
