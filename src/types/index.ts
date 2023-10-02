export type LibraryCardItem = {
  // id: number;
  // heading: string;
  // subHeading: string;
  // buttonName: string;
  // description: string;
  // favorite?: boolean;
  title: string;
  bookmarked: boolean;
  is_public: boolean;
  liked_by_user: boolean | null;
  likes_dislikes_count: { likes: number; dislikes: number };
  prompt_type: string;
  sample_output: string;
  tags: string[];
  user_message: string;
  uuid: string;
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
