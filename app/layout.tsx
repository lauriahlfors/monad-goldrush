import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Goldrush Controller',
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${GeistSans.className}`}>
      <body className="bg-akvamariini-950">{children}</body>
    </html>
  );
}
