import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { HiOutlineRefresh, HiPlus, HiOutlineChatAlt2 } from 'react-icons/hi';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';
import { BsCheck2Circle } from 'react-icons/bs';

import { getWorkspace } from 'middleware/api';
import {
  WorkspaceParameters,
  WorkspaceChat,
  WorkspaceCompletion,
} from 'components/helpers';
import { Button, Input, Tabs } from 'components/common';
import { useRecoilState } from 'recoil';
import { workspaceInfoState } from 'middleware/state';

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
    content: <WorkspaceCompletion />,
    icon: <BsCheck2Circle />,
  },
];

const handleClick = () => {};
const handleChange = () => {};

const Index = () => {
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceInfoState);
  const { id, title, model_key, last_modified, timestamp, user_uuid } =
    workspaceData;

  const [currentTab, setCurrentTab] = useState<string | null>('2');
  const Id = useLocation().pathname.split('/').at(-1);

  useEffect(() => {
    async function getData() {
      try {
        const res = await getWorkspace(Id);
        setWorkspaceData(res);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [Id]);

  const generateOutput = async () => {};

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="grid items-center p-8 border-b-4 border-gray50 sm:justify-center md:justify-between md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div className="flex sm:justify-center md:justify-start items-center">
          <h1 className="sm:text-xl md:text-2xl font-poppins font-semibold pr-3">
            {title}
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
      <div className="flex px-8 py-2 border-b-4 border-gray50 items-center justify-between">
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
          className="lg:flex lg:flex-row sm:grid md:grid-col-2 sm:grid-col-1 px-4 !overflow-y-scroll"
          key={i}
        >
          {currentTab === tab.id && <>{tab.content}</>}
        </div>
      ))}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Index;
