import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Strength Training Session Designer',
  description: 'Build your perfect workout by filtering and selecting exercises',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
