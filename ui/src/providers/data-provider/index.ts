'use client';

import { getAccessToken } from '@providers/auth-provider';
import { DataProvider } from '@refinedev/core';

const httpFetcher = {
  GET: (url: string) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }),
  POST: (url: string, body: any) =>
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }),
  PATCH: (url: string, body: any) =>
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }),
  DELETE: (url: string) =>
    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }),
};

export const dataProviderRest = (
  apiUrl: string,
): Omit<
  Required<DataProvider>,
  'createMany' | 'updateMany' | 'deleteMany' | 'custom'
> => ({
  getList: async ({ resource }) => {
    try {
      const url = `${apiUrl}/${resource}`;

      const resp = await httpFetcher.GET(url);
      const data = await resp.json();
      const total = Array.isArray(data) ? data.length : 0;
      return {
        data: data,
        total: total,
      };
    } catch (error) {
      console.error(error);
      return {
        data: [],
        total: 0,
      };
    }
  },

  getMany: async ({ resource }) => {
    const url = `${apiUrl}/${resource}`;

    const resp = await httpFetcher.GET(url);
    const data = await resp.json();
    const total = Array.isArray(data) ? data.length : 0;
    return {
      data: data,
      total: total,
    };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

    const resp = await httpFetcher.POST(url, variables);
    const data = await resp.json();

    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const resp = await httpFetcher.PATCH(url, variables);
    const data = await resp.json();

    return {
      data,
    };
  },

  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const resp = await httpFetcher.GET(url);
    const data = await resp.json();

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const resp = await httpFetcher.DELETE(url);
    const data = await resp.json();

    return {
      data,
    };
  },

  getApiUrl: () => {
    return apiUrl;
  },
});

const API_URL = process.env.API_URL || '';

export const dataProvider = dataProviderRest(API_URL);
