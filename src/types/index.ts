export type LibraryCardItem = {
  id: number;
  heading: string;
  subHeading: string;
  buttonName: string;
  description: string;
  favorite?: boolean;
};

export type Tab = {
  id: string;
  tabTitle: string;
  content?: string | React.ReactNode;
  icon: React.ReactElement;
};
