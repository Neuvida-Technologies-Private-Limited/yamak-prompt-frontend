import { LibraryCardItem as CardItem } from 'types';

export enum InputVariants {
  Filled = 'filled',
  Outlined = 'outlined',
  Default = 'default',
}
export enum ButtonVariants {
  PRIMARY = 'primary',
  PRIMARY_LIGHT = 'primary-light',
  SECONDARY = 'secondary',
  OUTLINED = 'outlined',
  OUTLINED_LIGHT = 'outlined-light',
  PRIMARY_LINK = 'primary-link',
  SECONDARY_LINK = 'secondary-link',
  DEFAULT = 'default',
}
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
  CSRF_TOKEN = 'csrf_token',
}
export enum LoginConst {
  Banner_Desc = 'A few Clicks away from creating your Prompt Management',
  SignIn = 'Sign in with Google',
  Welcome = 'Welcome Back',
  Login_Desc = 'Enter the following Details and continue your journey to manage your prompt',
  LogIn = 'LogIn',
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
  AddPrompt = 'Add Prompt',
  Test = 'Test Connection',
  AddKey = 'Add Key',
  PromptTitle = 'Prompt Title',
  EnterHere = 'Enter a user message here',
  Output = 'Output',
  Reset = 'Reset',
  Publish = 'Publish Prompt',
  SearchPrompt = 'Search Prompt Library',
  CharacterLimit = 'Your limit is 300 character',
  Marketing = 'Marketing Prompt Room',
  History = 'History',
  Prompt = 'Marketing Prompt 1',
  Date = '1 day ago',
  Time = '6.23 pm',
  SearchLibrary = 'Search Library',
  Search = 'search',
  ShowBookmarked = 'Show Bookmarked',
  ShowPublished = 'Show Published',
  Chat = 'Chat',
  Completion = 'Completion',
  LastEdited = 'Last Edited: ',
  ExploreTemplates = 'Explore Templates',
  AddVariable = 'Add Variable',
  User = 'User',
  Assistant = 'Assistent',
}

export enum KeyManagement {
  MESSAGE = "We uses API keys from various LLM providers to make API calls on your behalf. To get started, you'll need to create an account with one or more providers and obtain an API key from each. Once entered here, they'll be securely encrypted and stored, but can be removed at anytime.",
  ADD_KEY_BUTTON = 'Add Key',
  TITLE = 'Open AI Key',
  OK = 'Save Key',
  SUB_HEAD = 'Enter the key from your LLM Provider in the below boxes',
  KEY_TITLE = 'title',
  TITLE_PLACEHOLDER = 'Enter Key Title',
  LLM_TITLE = 'key-management-llm-provider',
  LLM_PLACEHOLDER = 'Select LLM Provider',
  API_KEY = 'api_key',
  SK_PLACEHOLDER = 'Enter API Key',
  DESCRIPTION_PLACEHOLDER = 'Enter Key Description',
  KEY_DESCRIPTION = 'description',
  DELETE = 'Delete',
  POPUP_TITLE = 'Delete the key',
  POPUP_DESCRIPTION = 'Are you sure to delete this key?',
  TestConnection = 'Test Connection',
  EMPTY_SCREEN_TEXT = 'Click on the "Add New Key" button to get started',
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
  UserMessageTitle = 'user-message-title',
  UserMessagePlaceholder = 'Enter user message',
  SystemMessageTitle = 'system-message-title',
  SystemMessagePlaceholder = 'Enter system message',
  WritePromptTitle = 'write-prompt-text',
  WritePromptPlaceholder = 'Prompt sample output',
  SelectTagPlaceholder = 'Select Tag',
  TagsTitle = 'add-tags',
  TagsPlaceholder = 'Enter tags (comma seperated)',
  SearchLibrary = 'Search Library',
  CardHeading = 'Human Written | 100% Unique | SEO Optimized Article',
  CardSubHeading = 'SEO/Writing',
  CardButtonName = 'Import Prompt',
  CardDescription = 'Human Written | Plagiarism Free | SEO Optimized Long-Form Article with Proper Outline',
  ImportPrompt = 'Import Prompt',
}

export enum LibraryCard {
  ButtonCopyPrompt = 'Copy prompt',
  ButtonFavorite = 'Favorite',
  ButtonDislike = 'Dislike',
  ButtonDelete = 'Delete',
}

export enum Label {
  NO_LABELS_MESSAGE = 'Create labels',
}

export const workspaces = [
  {
    link: '/home/workspace1',
    heading: 'Marketing Prompt Room',
    createdBy: 'Deepak Sharma',
    createdOn: '12th February',
    label: 'Workspace1',
  },
  {
    link: '/home/workspace1',
    heading: 'Marketing Prompt Room',
    createdBy: 'Deepak Sharma',
    createdOn: '12th February',
    label: 'Workspace1',
  },
  {
    link: '/home/workspace1',
    heading: 'Marketing Prompt Room',
    createdBy: 'Deepak Sharma',
    createdOn: '12th February',
    label: 'Workspace1',
  },
  {
    link: '/home/workspace1',
    heading: 'Marketing Prompt Room',
    createdBy: 'Deepak Sharma',
    createdOn: '12th February',
    label: 'Workspace1',
  },
  {
    link: '/home/workspace1',
    heading: 'Marketing Prompt Room',
    createdBy: 'Deepak Sharma',
    createdOn: '12th February',
    label: 'Workspace1',
  },
];

export const WorkspaceChatInputs = [
  {
    id: '1',
    label: 'System',
    placeholder: 'You are helpful assistance',
    className: ' w-full',
  },
];

export const WorkspaceCompletionInputs = [
  {
    id: '1',
    label: 'System',
    placeholder: 'You are helpful assistance',
    className: ' w-full',
  },
  {
    id: '2',
    label: 'User',
    placeholder:
      'Classify the following {{text 1}} into one of the following: Positive sentiment Negative sentiment Neutral sentiment Text: """ {{ text 2}} """',
    className: ' w-full',
  },
];

export const LibrarySelectOptions = [
  { value: 'copywriting', label: 'Copywriting' },
  { value: 'devops', label: 'Devops' },
  { value: 'generate-ai', label: 'Generate AI' },
];

export const KeyManagementSelectOptions = [
  { value: 'OpenAI', label: 'OpenAI' },
  { value: 'Bard', label: 'Bard' },
];

export const LibraryCardItems: CardItem[] = [];

export const KeyDetails = [
  {
    id: '1',
    title: 'Key 1',
    api_key: 'sk-*************************',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque.',
    provider: 'OpenAI',
  },
  {
    id: '2',
    title: 'Key 2',
    api_key: 'sk-*************************',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque.',
    provider: 'Bard',
  },
];
