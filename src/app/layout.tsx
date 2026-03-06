import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Inter, Source_Serif_4, Space_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner'
import './globals.css';

// ui?
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

// for titles
const spaceMono = Space_Mono({
    weight: ['400'],
    variable: '--font-space-mono',
    subsets: ['latin'],
});

// for body
const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Vercel Daily News',
    absolute: 'Vercel Daily News',
  },
  description: 'The latest news from Vercel and NextJS world.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sourceSerif.variable} ${spaceMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
