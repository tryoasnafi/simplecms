'use client';

import { authProvider } from '@providers/auth-provider';
import { BaseKey, CanReturnType, IResourceItem } from '@refinedev/core';

type CanParams = {
  resource: string;
  action: string;
  params?: {
    resource?: IResourceItem;
    id?: BaseKey;
    [key: string]: any;
  };
};

export const accessControlProvider = {
  can: async ({ resource }: CanParams): Promise<CanReturnType> => {
    const role = await authProvider.getPermissions?.();
    let can = false;
    if (role === 'admin') {
      can = true;
    }
    if (role === 'writer') {
      can = resource === 'articles';
    }
    console.log(role, can);
    return Promise.resolve({
      can,
    });
  },
};
