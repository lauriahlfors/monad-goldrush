import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';

import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js Starter',
  description: 'Starter for Next.js projects!',
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${GeistSans.className}`}>
      <body>{children}</body>
    </html>
  );
}
