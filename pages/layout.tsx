import { GeistProvider, CssBaseline } from '@geist-ui/core';
import { GeistSans } from 'geist/font/sans';

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