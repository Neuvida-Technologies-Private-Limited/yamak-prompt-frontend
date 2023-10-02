import {
  KeyManagement,
  Library,
  Profile,
  WorkspaceDashboard,
  Workspaces,
} from 'pages';
import React from 'react';

interface Route {
  path: string;
  element: React.ComponentType<any>;
  props?: any;
}

export const routes: Route[] = [
  {
    path: '/home',
    element: Library,
  },
  {
    path: '/home/workspaceDashboard',
    element: WorkspaceDashboard,
  },
  {
    path: '/home/keyManagement',
    element: KeyManagement,
  },
  {
    path: '/home/profile',
    element: Profile,
  },
  {
    path: '/home/workspace/:id',
    element: Workspaces,
  },
];
