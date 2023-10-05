import { LabelType } from 'types';

export type LoginModel = {
  username: string;
  password: string;
};
export type RefreshModal = {
  refresh: string;
};
export type CreateKeyModal = {
  title: string;
  api_key: string;
  description: string;
  provider: string;
};
export type TestConnectionModal = {
  api_key: string;
  provider: string;
};
export type CreateWorkspaceModal = {
  title: string;
  model_key: string;
};
export type GenerateOutputModal = {
  workspace: string;
  system_message: string;
  user_message: string;
  title: string;
  is_public: string | any;
  bookmarked: string | any;
  prompt_type: string | any;
  tags: string[];
  parameters: {
    temperature: number;
    max_tokens: number;
  };
};
