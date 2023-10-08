import { atom } from 'recoil';
import { OptionItems, WorkspaceDetailsType, WorkspaceHistoryType } from 'types';

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
    tags: [] as string[],
    parameters: {
      temperature: 1.0,
      max_tokens: 256,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      logit_bias: 0,
    },
    output: '',
  },
});
export const publishPromptState = atom({
  key: 'publishPrompt-state',
  default: {
    uuid: '',
    systemMessage: '',
    userMessage: '',
    heading: '',
    is_public: false,
    prompt_type: 'Completion',
  },
});
export const workspaceHistoryState = atom({
  key: 'workspaceHistory-state',
  default: {
    history: [] as WorkspaceHistoryType[],
  },
});
export const keyOptionsState = atom({
  key: 'keyOptions-state',
  default: {
    options: [] as OptionItems[],
  },
});
