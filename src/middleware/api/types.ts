export type LoginModel = {
  username: string;
  password: string;
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
