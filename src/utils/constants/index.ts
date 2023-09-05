export enum CardConst {
  CopyPrompt = 'Copy Prompt',
  Likes = '5.1M',
}
export enum Paths {
  Home = '/home',
  KeyManagement = '/home/keyManagement',
  Workspace = '/home/workspaceDashboard',
  Deployment = '/home/deployment',
  TestCases = '/home/testCases',
  Profile = '/home/profile',
}
export enum SidebarConst {
  Menu = 'Menu',
  Library = 'Library/Repository',
  Workspace = 'Workspace',
  KeyManagement = 'Key Management',
  Deployment = 'Deployment',
  TestCases = 'Test Cases',
  Profile = 'Ekta Sharma',
  Logout = 'Logout',
}
export enum IconPaths {
  LOGO = '/assets/logo/logo.svg',
  YAMAK = '/assets/logo/Yamakai.svg',
}
export enum TOKENS {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  USER_TYPE_TOKEN = 'user_type_token',
}
export enum Workspace {
  CreatedBy = 'Created by :',
  CreatedOn = 'Created on :',
  Workspaces = 'Workspaces',
  Subhead1 = 'Welcome to our Workspace!!',
  Subhead2 = 'Explore the area where you are spending your most time of creating prompt and enhancing them...',
  Create = 'Create Workspace',
  Subhead3 = 'Provide the following details to create a workspace',
  Name = 'Workspace Name',
  Select = 'Select Your Model Key',
  KeyName = 'Enter Key Name',
  LLMProvider = 'Enter LLM Provider',
  LLMKey = 'Enter LLM Key',
  Parameters = 'Parameters',
}
export const workspaces = [
  {
    link: '/home/workspace1',
    heading: 'Space 1',
    createdBy: 'Deepak Sharma',
    createdOn: '30 Aug 2023',
    label: 'Workspace1',
  },
  {
    link: '/home/workspace2',
    heading: 'Space 2',
    createdBy: 'Deepak Sharma',
    createdOn: '2 Sept 2023',
    label: 'Workspace2',
  },
];

export const keymanagement = {
  message:
    "We uses API keys from various LLM providers to make API calls on your behalf. To get started, you'll need to create an account with one or more providers and obtain an API key from each. Once entered here, they'll be securely encrypted and stored, but can be removed at anytime.",
  inputs: [
    { name: 'Open AI', placeHolder: 'sk-*************************' },
    { name: 'Bard', placeHolder: 'sk-*************************' },
  ],
};

export enum KeyManagement {
  Title = 'Open AI Key',
  Ok = 'Save the Key',
  Cancel = 'Test The connection',
  SubHead = 'Enter the key from your LLM Provider in the below boxes',
  Input1Id = 'key-management-title',
  Input1Name = 'key-management-title',
  Input1Placeholder = 'Enter Key Title',
  Input2Id = 'key-management-llm-provider',
  Input2Name = 'key-management-llm-provider',
  Input2Placeholder = 'Select LLM Provider',
  Input3Id = 'key-management-sk',
  Input3Name = 'key-management-sk',
  Input3Placeholder = 'sk-******************',
}
