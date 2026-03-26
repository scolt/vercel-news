import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header';
import { Inter, Source_Serif_4, Space_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner'
import './globals.css';
import { Footer } from '@/components/footer';
import { env } from '@/libs/utils/env';

// ui
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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: '%s | Vercel Daily News',
      absolute: 'Vercel Daily News',
    },
    description: 'Your daily dose of news about Vercel.',
    metadataBase: env.appUrl,
    openGraph: {
      url: '/',
      siteName: 'Vercel Daily News',
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
