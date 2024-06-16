'use client';

import { accessControlProvider } from '@providers/access-control-provider';
import { authProvider } from '@providers/auth-provider';
import { dataProvider } from '@providers/data-provider';
import { useNotificationProvider } from '@refinedev/antd';
import { AccessControlProvider, Refine } from '@refinedev/core';
import { RefineKbar } from '@refinedev/kbar';
import routerProvider from '@refinedev/nextjs-router';

export const RefineRoutes = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider}
      notificationProvider={useNotificationProvider}
      authProvider={authProvider}
      accessControlProvider={accessControlProvider as AccessControlProvider}
      resources={[
        {
          name: 'articles',
          list: '/articles',
          create: '/articles/create',
          edit: '/articles/edit/:id',
          show: '/articles/show/:id',
          meta: {
            canDelete: true,
          },
        },
        {
          name: 'users',
          list: '/users',
          create: '/users/create',
          edit: '/users/edit/:id',
          show: '/users/show/:id',
          meta: {
            canDelete: true,
          },
        },
      ]}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        useNewQueryKeys: true,
        projectId: '6GmHXY-S6pYIf-cjUetW',
        title: {
          icon: '',
          text: 'Simple CMS',
        },
      }}
    >
      {children}
      <RefineKbar />
    </Refine>
  );
};
