export enum CardConst {
  CopyPrompt = 'Copy Prompt',
  Likes = '5.1M',
  All = 'All',
  Favourite = 'Favourite',
}
export enum Paths {
  Home = '/home',
  KeyManagement = '/home/keyManagement',
  Workspace = '/home/workspaceDashboard',
  Deployment = '/home/deployment',
  TestCases = '/home/testCases',
  Profile = '/home/profile',
  Help = '/home/help',
  Feedback = '/home/feedback',
}
export enum SidebarConst {
  General = 'General',
  Library = 'Library/Repository',
  Workspace = 'Workspace',
  KeyManagement = 'Key Management',
  Deployment = 'Deployment',
  TestCases = 'Test Cases',
  Profile = 'Ekta Sharma',
  Logout = 'Logout',
  Help = 'Help',
  Feedback = 'Feedback',
  Support = 'Support',
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
  Create = 'Create',
  Workspaces = 'Workspaces',
  Subhead1 = 'Welcome to our Workspace!!',
  Subhead2 = 'Explore the area where you are spending your most time of creating prompt and enhancing them...',
  CreateWorkspace = 'Create Workspace',
  NoWorkspace = 'Haven’t Created any Workspace Yet!!',
  NoWorkspaceDesc = 'A workspace easily allows you to create prompt and enhance them',
  Subhead3 = 'Provide the following details to create a workspace',
  Name = 'Workspace Name',
  Select = 'Select Your Model Key',
  KeyName = 'Enter Key Name',
  LLMProvider = 'Enter LLM Provider',
  LLMKey = 'Enter LLM Key',
  Parameters = 'Parameters',
  Test = 'Test Connection',
  Save = 'Save Key',
  PromptTitle = 'Prompt Title',
  EnterHere = 'Enter a user message here',
  Output = 'Output',
  Reset = 'Reset',
  Publish = 'Publish Prompt',
  SearchPrompt = 'Search Prompt Library',
  CharacterLimit = 'Your limit is 300 character',
  Marketing = 'Marketing Prompt Room',
  History = 'History',
  Prompt = 'Prompt 1',
  Date = '1 day ago',
  Time = '6.23 pm',
  SearchLibrary = 'Search Library',
  Search = 'search',
  ShowBookmarked = 'Show Bookmarked',
  ShowPublished = 'Show Published',
  Chat = 'Chat',
  Completion = 'Completion',
}

export enum KeyManagement {
  Message = "We uses API keys from various LLM providers to make API calls on your behalf. To get started, you'll need to create an account with one or more providers and obtain an API key from each. Once entered here, they'll be securely encrypted and stored, but can be removed at anytime.",
  ADD_KEY_BUTTON = 'Add Key',
  TITLE = 'Open AI Key',
  OK = 'Save Key',
  CANCEL = 'Test connection',
  SUB_HEAD = 'Enter the key from your LLM Provider in the below boxes',
  KEY_TITLE = 'key-management-title',
  TITLE_PLACEHOLDER = 'Enter Key Title',
  LLM_TITLE = 'key-management-llm-provider',
  LLM_PLACEHOLDER = 'Select LLM Provider',
  SK_TITLE = 'key-management-sk',
  SK_PLACEHOLDER = 'Enter Key',
}

export enum Library {
  Heading = 'Library/Repository',
  SubHeading = 'Browse and Choose from our Prompt Library',
  AddPromptButton = 'Add Prompt',
  ModalHeading = 'Add New Prompt',
  OkText = 'Add Prompt',
  SubHead = 'Fill in the details of your prompt',
  NewPromptTitle = 'new-prompt-title',
  TitlePlaceholder = 'Enter prompt title',
  WritePromptTitle = 'write-prompt-text',
  WritePromptPlaceholder = 'Write prompt (20 Characters)',
  SelectTopicPlaceholder = 'Select Topic',
  SearchLibrary = 'Search Library',
  CardHeading = 'Human Written | 100% Unique | SEO Optimized Article',
  CardSubHeading = 'SEO/Writing',
  CardButtonName = 'Import Prompt',
  CardDescription = 'Human Written | Plagiarism Free | SEO Optimized Long-Form Article with Proper Outline',
}

export const workspaces = [
  {
    link: '/home/workspace1',
    heading: 'Marketing Prompt Room',
    createdBy: 'Deepak Sharma',
    createdOn: '12th February',
    label: 'Workspace1',
  },
];

export const LibrarySelectOptions = [
  { value: 'copywriting', label: 'Copywriting' },
  { value: 'devops', label: 'Devops' },
  { value: 'generate-ai', label: 'Generate AI' },
];
