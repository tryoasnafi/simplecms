import { RefineKbarProvider } from '@refinedev/kbar';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ColorModeContextProvider } from '@contexts/color-mode';
import '@refinedev/antd/dist/reset.css';
import { RefineRoutes } from './routes';

export const metadata: Metadata = {
  title: 'Simple CMS',
  description: 'Simple CMS',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  const defaultMode = theme?.value === 'dark' ? 'dark' : 'light';

  return (
    <html lang="en">
      <body>
        <Suspense>
          <RefineKbarProvider>
            <AntdRegistry>
              <ColorModeContextProvider defaultMode={defaultMode}>
                <RefineRoutes>{children}</RefineRoutes>
              </ColorModeContextProvider>
            </AntdRegistry>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
