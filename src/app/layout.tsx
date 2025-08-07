import { GeistProvider, CssBaseline } from '@geist-ui/core';
import { GeistSans } from 'geist/font/sans';
import '../styles/globals.css';

export const metadata = {
  title: 'Zora Digital Fashion',
  description: 'Web3 Wearables Marketplace - Own Your Digital Style',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <GeistProvider>
          <CssBaseline />
          {children}
        </GeistProvider>
      </body>
    </html>
  );
}