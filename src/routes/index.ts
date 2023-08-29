import { KeyManagement, Library, Profile, Workspace } from 'pages';
import React from 'react';

interface Route {
  path: string;
  element: React.ComponentType<any>;
}

export const routes: Route[] = [
  {
    path: '/home',
    element: Library,
  },
  {
    path: '/home/workspace',
    element: Workspace,
  },
  {
    path: '/home/keyManagement',
    element: KeyManagement,
  },
  {
    path: '/home/profile',
    element: Profile,
  },
];
