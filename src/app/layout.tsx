
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/common/Header';
import FloatingEmojis from '@/components/common/FloatingEmojis';

export const metadata: Metadata = {
  title: 'Aditi Agrawal | Digital Marketing Strategist & Creative Solutionist',
  description:
    'Personal portfolio of Aditi Agrawal, a digital marketing strategist and creative solutionist, showcasing creative confidence, elegance, and originality.',
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
        <FloatingEmojis />
        <div className="relative z-10 flex flex-col flex-grow">
          <Header />
          <main className="flex-grow">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
