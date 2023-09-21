import React from 'react';

interface Tab {
  id: string;
  tabTitle: string;
  content?: string | React.ReactNode;
  icon: React.ReactElement;
}

interface TabsProps {
  tabs: Tab[];
  currentTab: string | null;
  onTabClick: (tabId: string) => void;
  className?: string;
}
const Tabs: React.FC<TabsProps> = ({
  tabs,
  currentTab,
  onTabClick,
  className,
}) => {
  return (
    <div
      className={`bg-gray50 rounded-2xl flex justify-center items-center h-12 px-2 font-poppins ${className}`}
    >
      {tabs.map((tab, i) => (
        <button
          key={i}
          id={tab.id}
          disabled={currentTab === `${tab.id}`}
          onClick={() => onTabClick(tab.id)}
          className={`${
            currentTab === `${tab.id}` && 'bg-white shadow'
          } rounded-md mx-1 font-medium p-2 border-0 transition-all duration-300 ease-in-out hover:text-primary`}
        >
          <div className="flex items-center gap-2">
            <span className="">{tab.icon}</span>
            {tab.tabTitle}
          </div>
        </button>
      ))}
    </div>
  );
};

export default Tabs;
