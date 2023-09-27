import React, { useState } from 'react';
import { HiOutlineRefresh, HiPlus, HiOutlineChatAlt2 } from 'react-icons/hi';
import { Button, Input, Tabs } from 'components/common';
import { WorkspaceParameters, WorkspaceChat } from 'components/helpers';
import { Workspace, InputVariants } from 'utils/constants';
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
            variant="primary"
            icon={<HiPlus />}
            onClick={handleClick}
            className="bg-primary hover:bg-primary900 hover:!text-white text-white flex justify-center rounded-lg border-none"
          />
        </div>
        <div className="flex gap-2 md:justify-end sm:justify-center">
          <Button
            size={undefined}
            variant="primary"
            icon={<HiOutlineRefresh />}
            name={Workspace.Reset}
            onClick={handleClick}
            className="items-center flex font-poppins text-primary800 font-medium p-4 border-2 border-primary50 bg-primary50 rounded-lg"
          />
          <Button
            size={undefined}
            variant="primary"
            name={Workspace.Publish}
            onClick={handleClick}
            className="publishedBtn border-black p-4 border-2 rounded-lg font-medium text-black font-poppins transition-all ease-in-out duration-300"
          />
        </div>
      </div>
      <div className="flex px-8 h-full py-2 border-b-4 border-gray50 items-center justify-between">
        {/* Tab Switcher starts */}
        <Tabs tabs={tabs} currentTab={currentTab} onTabClick={handleTabClick} />
        {/* Tab Switcher ends */}
        <div className="flex py-2 justify-center items-center">
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
