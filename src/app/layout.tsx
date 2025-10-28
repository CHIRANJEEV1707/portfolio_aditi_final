
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/common/Header';
import SplashCursor from '@/components/ui/splash-cursor';
import EmojiMatrix from '@/components/common/EmojiMatrix';

export const metadata: Metadata = {
  title: 'Aditi Agrawal | Digital Marketing Strategist & Creative Solutionist',
  description:
    'Personal portfolio of Aditi Agrawal, a digital marketing strategist and creative solutionist, showcasing creative confidence, elegance, and originality.',
  icons: {
    icon: '/images/AA.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background antialiased flex flex-col',
        )}
      >
        <EmojiMatrix />
        <SplashCursor />
        <div className="relative z-[2]">
          <Header />
          <main className="flex-grow">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
