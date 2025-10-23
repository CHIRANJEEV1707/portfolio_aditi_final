import type { Metadata } from 'next';
import { Poppins, PT_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Toaster } from '@/components/ui/toaster';
import CustomCursor from '@/components/common/CustomCursor';
import PageTransition from '@/components/common/PageTransition';

const fontHeadline = Poppins({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-headline',
});

const fontBody = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

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
          'min-h-screen bg-background font-body antialiased',
          fontHeadline.variable,
          fontBody.variable
        )}
      >
        <CustomCursor />
        <Header />
        <PageTransition>
          <main className="flex-grow">{children}</main>
        </PageTransition>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
