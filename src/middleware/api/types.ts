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
export type PromptModal = {
  title: string;
  user_message: string;
  tags: string;
  is_public: boolean;
  system_message: string;
  sample_output: string;
};
export type CreateWorkspaceModal = {
  title: string;
  modal_key: string;
};
