import { atom, selector } from 'recoil';
import { Variables } from 'types';

import {
  OptionItems,
  WorkspaceChatOutputs,
  WorkspaceDetailsType,
  WorkspaceHistoryType,
} from 'types';

// workspace dashboard
export const keyOptionsState = atom({
  key: 'keyOptions-state',
  default: {
    options: [] as OptionItems[],
  },
});

export const workspaceState = atom({
  key: 'workspace-state',
  default: {
    items: [] as WorkspaceDetailsType[],
  },
});

export const workspacePaginationState = atom({
  key: 'workspace-pagination-state',
  default: {
    currentPage: 1,
    count: 0,
    itemsPerPage: 10,
    hasNext: null,
    hasPrevious: null,
    query: '',
    totalPages: 0,
  },
});

// workspaces
export const workspaceInfoState = atom({
  key: 'workspaceInfo-state',
  default: {
    id: '',
    title: '',
    model_key: '',
    last_modified: '',
    timestamp: '',
    user_uuid: '',
    activeTab: '1',
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
    isLoading: false,
    workspace: '',
    system_message: '',
    user_message: '',
    title: '',
    is_public: false,
    bookmarked: false,
    prompt_type: 'Completion',
    tags: '',
    parameters: {
      temperature: 1.0,
      max_tokens: 256,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      logit_bias: 0,
    },
    output: [],
    uuid: '',
    variables: {} as Variables,
  },
});

export const generateChatOutputState = atom({
  key: 'generate-chat-output-state',
  default: {
    isLoading: false,
    workspace: '',
    system_message: '',
    user_message: '',
    title: '',
    is_public: false,
    bookmarked: false,
    prompt_type: 'Chat',
    tags: '',
    parameters: {
      temperature: 1.0,
      max_tokens: 50,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      logit_bias: 0,
    },
    output: [],
    uuid: '',
    variables: {} as Variables,
  },
});

export const workspaceChatOutputs = atom({
  key: 'workspace-chat-outputs',
  default: {
    isLoading: false,
    chats: [] as WorkspaceChatOutputs[],
    currentPage: 1,
    count: 0,
    itemsPerPage: 10,
    hasNext: null,
    hasPrevious: null,
    totalPages: 0,
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

export const workspaceHistoryPaginationState = atom({
  key: 'workspace-history-pagination',
  default: {
    currentPage: 1,
    count: 0,
    itemsPerPage: 10,
    hasNext: null,
    hasPrevious: null,
    query: '',
    totalPages: 0,
  },
});
export const variablesRowState = atom<
  { variableName: string; variableValue: string }[]
>({
  key: 'variableRow-State',
  default: [],
});

export const variablesRowNumberState = atom<number[]>({
  key: 'variablesRowNumberState',
  default: [],
});
