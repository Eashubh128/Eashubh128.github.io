import localFont from 'next/font/local';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import { Analytics } from '@vercel/analytics/react';
import ScrollProgress from '@/components/ScrollProgress';

const spaceGrotesk = localFont({
  src: '../../public/fonts/space-grotesk.woff2',
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: '../../public/fonts/jetbrains-mono.woff2',
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Eashubh Thapliyal — Mobile Systems & Android Engineer',
  description: 'Portfolio of Eashubh Thapliyal, a high-performance Software Development Engineer specializing in Android and Cross-Platform (Flutter) applications.',
  keywords: ['android developer', 'flutter developer', 'mobile engineer', 'SDE', 'portfolio', 'Eashubh Thapliyal'],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#09090b',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-dark-bg text-zinc-200 antialiased selection:bg-indigo-900 selection:text-indigo-100">
        <SmoothScrollProvider>
          <ScrollProgress />
          {children}
          <Analytics />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
