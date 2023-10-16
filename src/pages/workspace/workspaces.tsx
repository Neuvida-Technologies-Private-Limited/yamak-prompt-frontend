import React, { useCallback, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { HiOutlineRefresh, HiPlus, HiOutlineChatAlt2 } from 'react-icons/hi';
import { BsCheck2Circle } from 'react-icons/bs';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { getSearchWorkspaceHistory, getWorkspace } from 'middleware/api';
import {
  WorkspaceParameters,
  WorkspaceChat,
  WorkspaceCompletion,
  PublishPromptModal,
} from 'components/helpers';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';
import { Button, Input, Tabs } from 'components/common';
import {
  generateOutputState,
  workspaceHistoryState,
  workspaceInfoState,
} from 'middleware/state';
import { message } from 'antd';

const handleClick = () => {};
const handleChange = () => {};

const Index = () => {
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceInfoState);
  const [workspaceHistory, setWorkspaceHistory] = useRecoilState(
    workspaceHistoryState
  );
  const resetOutputState = useResetRecoilState(generateOutputState);

  const { id, title } = workspaceData;

  const [currentTab, setCurrentTab] = useState<string | null>('2');
  const Id = useLocation().pathname.split('/').at(-1);

  const getWorkspaceData = useCallback(
    async function () {
      try {
        const res = await getWorkspace(Id);

        setWorkspaceData(old => ({
          ...old,
          id: res.id,
          title: res.title,
          model_key: res.model_key,
          last_modified: res.last_modified,
          timestamp: res.timestamp,
          user_uuid: res.user_uuid,
        }));
      } catch (err: any) {
        toast.error(err.error);
      }
    },
    [setWorkspaceData]
  );

  const searchHistoryHandler = useCallback(
    async function (input: string, id: string) {
      try {
        const res = await getSearchWorkspaceHistory(id, input);
        setWorkspaceHistory(old => ({
          ...old,
          history: Array.isArray(res.results) ? res.results : [],
        }));
      } catch (err: any) {
        message.error(err.error);
      }
    },
    [setWorkspaceHistory]
  );

  useEffect(() => {
    getWorkspaceData();
  }, [id]);

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
      content: <WorkspaceCompletion onHistorySearch={searchHistoryHandler} />,
      icon: <BsCheck2Circle />,
    },
  ];

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="max-h-full grid items-center p-8 border-b-4 border-gray50 sm:justify-center md:justify-between md:grid-cols-2 sm:grid-cols-1 gap-4">
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
            onClick={resetOutputState}
          />
          <PublishPromptModal />
        </div>
      </div>
      <div className="max-h-full flex px-8 py-2 border-b-4 border-gray50 items-center justify-between">
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
      <div className="max-h-full overflow-y-scroll">
        <div className=" px-4 h-full">
          {tabs.map(tab => (
            <>{currentTab === tab.id && <>{tab.content}</>}</>
          ))}
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Index;
