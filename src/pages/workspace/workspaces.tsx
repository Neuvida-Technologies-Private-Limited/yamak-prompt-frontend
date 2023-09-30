import React, { useState } from 'react';
import { HiOutlineRefresh, HiPlus, HiOutlineChatAlt2 } from 'react-icons/hi';
import { Button, Input, Tabs } from 'components/common';
import { WorkspaceParameters, WorkspaceChat } from 'components/helpers';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';
import { BsCheck2Circle } from 'react-icons/bs';

interface WorkspaceProps {
  label: string;
}

const tabs = [
  {
    id: '1',
    tabTitle: Workspace.Chat,
    content: <WorkspaceChat />,
    icon: <HiOutlineChatAlt2 />,
  },
  {
    id: '2',
    tabTitle: Workspace.Completion,
    content: 'b', //completion page will come
    icon: <BsCheck2Circle />,
  },
];

const handleClick = () => {};
const handleChange = () => {};

const Index: React.FC<WorkspaceProps> = ({ label }) => {
  const [currentTab, setCurrentTab] = useState<string | null>('1');

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
  };

  return (
    <div className="flex flex-col max-h-screen">
      <div className="grid items-center h-full p-8 border-b-4 border-gray50 sm:justify-center md:justify-between md:grid-cols-2 sm:grid-cols-1">
        <div className="flex sm:justify-center md:justify-start">
          <h1 className="text-2xl font-poppins font-semibold pr-3">
            {Workspace.Marketing}
          </h1>
          <Button
            size={undefined}
            variant={ButtonVariants.PRIMARY}
            icon={<HiPlus />}
            onClick={handleClick}
            className="!px-5"
          />
        </div>
        <div className="flex gap-2 md:justify-end sm:justify-center items-center">
          <Button
            size={undefined}
            variant={ButtonVariants.PRIMARY_LIGHT}
            icon={<HiOutlineRefresh />}
            name={Workspace.Reset}
            onClick={handleClick}
          />
          <Button
            size={undefined}
            variant={ButtonVariants.OUTLINED}
            name={Workspace.Publish}
            onClick={handleClick}
          />
        </div>
      </div>
      <div className="flex px-8 h-full py-2 border-b-4 border-gray50 items-center justify-between">
        {/* Tab Switcher starts */}
        <Tabs tabs={tabs} currentTab={currentTab} onTabClick={handleTabClick} />
        {/* Tab Switcher ends */}
        <div className="flex py-2 justify-center items-center gap-2">
          <Input
            id={Workspace.SearchPrompt}
            name={Workspace.SearchPrompt}
            placeholder={Workspace.SearchPrompt}
            onChange={handleChange}
            className="!mb-0 sm:hidden md:block"
            type="search"
            variant={InputVariants.Filled}
          />
          <WorkspaceParameters />
        </div>
      </div>

      {tabs.map((tab, i) => (
        <div
          className="lg:flex lg:flex-row sm:grid md:grid-col-2 h-full sm:grid-col-1 px-4 !overflow-y-scroll"
          key={i}
        >
          {currentTab === tab.id && <>{tab.content}</>}
        </div>
      ))}
    </div>
  );
};

export default Index;
