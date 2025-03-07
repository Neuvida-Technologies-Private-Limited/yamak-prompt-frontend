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
  WARNING = 'warning',
  DEFAULT = 'default',
}
export enum ButtonSizes {
  SMALL = 'small',
  MIDDLE = 'middle',
  LARGE = 'large',
}

export enum TextAreaVariants {
  FILLED = 'filled',
  DEFAULT = 'default',
}

export enum TextVariants {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
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
  Workspace = '/home/workspaces',
  Deployment = '/home/deployment',
  TestCases = '/home/testCases',
  Profile = '/home/profile',
  Help = '/home/help',
  Feedback = '/home/feedback',
}
export enum SidebarConst {
  General = 'General',
  Library = 'Library/Repository',
  Workspaces = 'Workspaces',
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
  EnterHere = 'Enter a user message',
  Output = 'Output',
  Reset = 'Reset',
  PublishPrompt = 'Publish Prompt',
  SearchPrompt = 'Search Prompt Library',
  CharacterLimit = 'Your limit is 300 character',
  Marketing = 'Marketing Prompt Room',
  History = 'History',
  Prompt = 'Prompt Title',
  Date = '1 day ago',
  Time = '6.23 pm',
  SearchHistory = 'Search History',
  Search = 'search',
  ShowBookmarked = 'Show Bookmarked',
  ShowPublished = 'Show Published',
  Chat = 'Chat',
  Completion = 'Completion',
  LastEdited = 'Last Edited: ',
  ExploreTemplates = 'Explore Templates',
  AddVariable = 'Add Variable',
  User = 'User Message',
  Assistant = 'Assistent',
  SelectKey = 'Select Key',
  UpdateWorkspace = 'Update Workspace',
  Update = 'Update',
  Delete = 'Delete',
  Publish = 'Publish',
  Published = 'Published',
  System = 'System: ',
  Sample = 'Sample Answer',
  NoVariables = 'No variables added yet',
  NoHistoryHead = 'No previous versions available',
  NoHistoryPara = 'Whenever you update your prompt in the right panel a history is generated here',
  BookmarkedSuccess = 'Bookmarked Successfully',
  UnbookmarkedSuccess = 'Unbookmarked Successfully',
  Bookmark = 'Bookmark',
  Unbookmark = 'Unbookmark',
  Save = 'Save',
  WORKSPACE_SEARCH_TITLE = 'workspaces-search',
  WORKSPACE_SEARCH_PLACEHOLDER = 'Search workspaces...',
}

export enum KeyManagement {
  MESSAGE = "Create an account with LLM providers, get API keys, and input them here. We'll encrypt and store them securely, but you can remove them anytime.",
  EMPTY_SCREEN_MESSAGE = "Click 'Add Key' to create a unique API key for access to advanced machine learning functionalities on AI platforms.",
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
  VALIDATE_KEY = 'Validate Key',
  EMPTY_SCREEN_TEXT = 'Click on the "Add New Key" button to get started',
  SUCCESS = 'Key Deleted Successfully',
  KEY_SEARCH_TITLE = 'key-management-search',
  KEY_SEARCH_PLACEHOLDER = 'Search keys...',
}

export enum Library {
  Heading = 'Library/Repository',
  SubHeading = 'Browse and Choose from our Prompt Library',
  AddPromptButton = 'Add Prompt',
  ModalHeading = 'Add New Prompt',
  OkText = 'Add Prompt',
  SubHead = 'Fill in the details of your prompt',
  NEW_PROMPT_TITLE = 'title',
  TITLE_PLACEHOLDER = 'Prompt title',
  USER_MESSAGE_TITLE = 'userMessage',
  USER_MESSAGE_PLACEHOLDER = 'User message',
  SYSTEM_MESSAGE_TITLE = 'systemMessage',
  SYSTEM_MESSAGE_PLACEHOLDER = 'System message',
  WRITE_PROMPT_TITLE = 'promptOutput',
  WRITE_PROMPT_PLACEHOLDER = 'Prompt sample output',
  SELECT_TAG_PLACEHOLDER = 'Select Tag',
  TAGS_TITLE = 'tags',
  TAGS_PLACEHOLDER = 'Enter tags (optional)',
  SEARCH_LIBRARY = 'Search prompts...',
  NO_SEARCH_LIBRARY = 'No items to search...',
  CARD_BUTTON_NAME = 'Import Prompt',
  IMPORT_PROMPT = 'Import Prompt',
  EMPTY_LIBRARY_HEADING = "Oops, it's a bit empty in here...",
  EMPTY_LIBRARY_TEXT = 'Start by creating a new prompt.',
}

export enum LibraryAddPrompt {
  NO_TITLE_MESSAGE = 'Title is required',
  NO_USER_MESSAGE = 'User message is required',
  NO_SYSTEM_MESSAGE = 'System message is required',
  NO_PROMPT_OUTPUT = 'Prompt output is required',
  NO_TAGS = 'Tags are required',
}

export enum LibraryCard {
  ButtonCopyPrompt = 'Copy prompt',
  ButtonFavorite = 'Favorite',
  ButtonDislike = 'Dislike',
  ButtonLike = 'Like',
  ButtonDelete = 'Delete',
  Success = 'Successfully updated',
  Copied = 'Copied',
  Deleted = 'Prompt deleted',
}

export enum ModalContent {
  NO_USER_MESSAGE = 'No user message',
  NO_SYSTEM_MESSAGE = 'No system message',
  NO_PROMPT_OUTPUT = 'No sample output',
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

export const LibrarySelectOptions = [
  { value: 'copywriting', label: 'Copywriting' },
  { value: 'devops', label: 'Devops' },
  { value: 'generate-ai', label: 'Generate AI' },
];

export const KeyManagementSelectOptions = [
  { value: 'OpenAI', label: 'OpenAI' },
  { value: 'Bard', label: 'Bard' },
];

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

export const ITEMS_PER_PAGE = 10;

export const ItemsPerPageOptions = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '15', value: '15' },
];
