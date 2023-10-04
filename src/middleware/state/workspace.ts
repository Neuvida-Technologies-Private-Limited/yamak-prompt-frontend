import { atom } from 'recoil';
import { WorkspaceDetailsType } from 'types';

export const workspaceState = atom({
  key: 'workspace-state',
  default: {
    workspace_details: [] as WorkspaceDetailsType[],
  },
});
export const workspaceInfoState = atom({
  key: 'workspaceInfo-state',
  default: {
    id: '',
    title: '',
    model_key: '',
    last_modified: '',
    timestamp: '',
    user_uuid: '',
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
    is_public: false,
    bookmarked: false,
    prompt_type: 'Completion',
    tags: [],
    parameters: {
      temperature: 1.0,
      max_tokens: 50,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      logit_bias: 0,
    },
    output: '',
  },
});
