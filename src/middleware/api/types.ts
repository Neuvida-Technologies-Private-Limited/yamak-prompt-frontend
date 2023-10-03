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
  is_public: string;
  bookmarked: string;
  prompt_type: string;
  tags: [];
  parameters: {
    temperature: string;
    max_token: string;
  };
};
