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
    model_key: '',
    model_keyError: '',
  },
});

export const generateOutputState = atom({
  key: 'generateOutput-state',
  default: {
    workspace: '',
    system_message: '',
    user_message: '',
    title: '',
    is_public: '',
    bookmarked: '',
    prompt_type: '',
    tags: [],
    parameters: {
      temperature: '',
      max_tokens: '',
    },
  },
});
