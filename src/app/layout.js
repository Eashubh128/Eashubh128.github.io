import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import { Analytics } from '@vercel/analytics/react';
import ScrollProgress from '@/components/ScrollProgress';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Eashubh Thapliyal — Mobile SDE Portfolio',
  description: 'Portfolio of Eashubh Thapliyal, a high-performance Software Development Engineer specializing in Android and Cross-Platform (Flutter) applications.',
  keywords: ['android developer', 'flutter developer', 'mobile engineer', 'SDE', 'portfolio', 'Eashubh Thapliyal'],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0a0f',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-dark-bg text-gray-200 antialiased">
        <SmoothScrollProvider>
          <ScrollProgress />
          {children}
          <Analytics />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
