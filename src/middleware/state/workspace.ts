import { atom } from 'recoil';
import { WorkspaceDetailsType } from 'types';

export const workspaceState = atom({
  key: 'workspace-state',
  default: {
    workspace_details: [] as WorkspaceDetailsType[],
  },
});

export const createWorkspaceState = atom({
  key: 'createWorkspace-state',
  default: {
    title: '',
    titleError: '',
    modal_key: '',
    modal_keyError: '',
  },
});
