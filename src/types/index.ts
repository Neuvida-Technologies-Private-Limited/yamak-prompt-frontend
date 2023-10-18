export type LibraryCardItem = {
  title: string;
  favourite: boolean;
  bookmarked: boolean;
  is_public: boolean;
  liked_by_user: boolean | null;
  likes_dislikes_count: { likes: number; dislikes: number };
  prompt_type: string;
  sample_output: string;
  tags: string[];
  user_message: string;
  uuid: string;
  onDeletePrompt: (id: string) => Promise<any>;
  onPromptInfo: (id: string) => Promise<any>;
  onUpdatePrompt: (update: any, id: string) => Promise<any>;
};

export type LibraryGetPromptInfoModal = {
  data: {
    title: string;
    system_message: string;
    user_message: string;
    sample_output: string;
    favourite: boolean;
    published: boolean;
    is_public: boolean;
    prompt_type: string;
    workspace: string | null;
    likes_dislikes_count: {
      likes: number;
      dislikes: number;
    };
    liked_by_user: boolean | null;
    tags: string[];
  };
  error: string;
  status_code: number;
};

export type Tab = {
  id: string;
  tabTitle: string;
  content?: string | React.ReactNode;
  icon: React.ReactElement;
};

export type LabelType = {
  id: string | number;
  text: string;
};

export type WorkspaceData = {
  id: string;
  first_name: string;
  last_name: string;
  title: string;
  last_modified: string;
  model_key: string | null;
  timestamp: string;
  user_uuid: string;
};

export type KeyDetailsType = {
  uuid: string;
  title: string;
  description: string;
  api_key: string;
  provider: string;
};
export type WorkspaceDetailsType = {
  id: string;
  title: string;
  last_modified: string;
  timestamp: string;
  model_key: string;
  user_uuid: string;
};
export type WorkspaceHistoryType = {
  title: string;
  bookmarked: boolean;
  is_public: boolean;
  uuid: string;
  user_message: string;
  system_message: string;
  published: boolean;
  prompt_output: [];
};

export type WorkspaceChatOutputs = {
  user_message: string;
  output: string;
};

export type OptionItems = {
  value: any;
  label: any;
};
