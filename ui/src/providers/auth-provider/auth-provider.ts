'use client';

import type { AuthProvider } from '@refinedev/core';
import Cookies from 'js-cookie';

const endpoints = {
  login: 'http://localhost:3001/auth/signin',
};

const httpFetcher = {
  GET: (url: string) => fetch(url),
  POST: (url: string, body: NonNullable<unknown>) =>
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }),
  PATCH: (url: string, body: NonNullable<unknown>) =>
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }),
  DELETE: (url: string) => fetch(url, { method: 'DELETE' }),
};

export const getAccessToken = () => {
  const auth = Cookies.get('auth');
  if (auth) {
    const parsedAuth = JSON.parse(auth);
    return parsedAuth.access_token;
  }
  return null;
};

export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const resp = await httpFetcher.POST(endpoints.login, { email, password });
    const auth = await resp.json();
    if (!resp.ok || !auth) {
      return {
        success: false,
        error: {
          name: 'Login Error',
          message: 'Invalid username or password',
        },
      };
    }
    Cookies.set('auth', JSON.stringify(auth), {
      expires: 1, // 1 days
      path: '/',
    });
    return {
      success: true,
      redirectTo: '/',
    };
  },
  logout: async () => {
    Cookies.remove('auth', { path: '/' });
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    const auth = Cookies.get('auth');
    if (auth) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: '/login',
    };
  },
  getPermissions: async () => {
    const auth = Cookies.get('auth');
    if (auth) {
      const parsedAuth = JSON.parse(auth);
      const user = parseJwt(parsedAuth.access_token);
      return user.role;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = Cookies.get('auth');
    if (auth) {
      const parsedAuth = JSON.parse(auth);
      const user = parseJwt(parsedAuth.access_token);
      return user;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
