import React, { useCallback, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { HiOutlineRefresh, HiPlus, HiOutlineChatAlt2 } from 'react-icons/hi';
import { BsCheck2Circle } from 'react-icons/bs';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { message } from 'antd';

import { getWorkspace } from 'middleware/api';
import {
  WorkspaceParameters,
  WorkspaceChat,
  WorkspaceCompletion,
  PublishPromptModal,
} from 'components/helpers';
import { Workspace, ButtonVariants } from 'utils/constants';
import {
  generateOutputState,
  publishPromptState,
  workspaceChatOutputs,
  workspaceHistoryPaginationState,
  workspaceHistoryState,
  workspaceInfoState,
} from 'middleware/state';
import { Button, Tabs } from 'components/common';

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

const Index = () => {
  // const [currentTab, setCurrentTab] = useState<string | null>('2');
  const [showModal, setShowModal] = useState(false);

  const [{ title, activeTab }, setWorkspaceData] =
    useRecoilState(workspaceInfoState);
  const [{ systemMessage, userMessage, heading, uuid, is_public }] =
    useRecoilState(publishPromptState);

  const resetOutputState = useResetRecoilState(generateOutputState);
  const resetPublishState = useResetRecoilState(publishPromptState);
  const resetWorkspaceState = useResetRecoilState(workspaceHistoryState);
  const resetWorkspacePaginationState = useResetRecoilState(
    workspaceHistoryPaginationState
  );
  const resetChatOutputs = useResetRecoilState(workspaceChatOutputs);

  const id = useLocation().pathname.split('/').at(-1);

  const handleTabClick = (tabId: string) => {
    // setCurrentTab(tabId);
    setWorkspaceData(old => ({ ...old, activeTab: tabId }));
  };

  const handleClick = () => {};

  const handleReset = () => {
    resetOutputState();
    resetPublishState();
  };

  const getWorkspaceData = useCallback(
    async function () {
      try {
        const res = await getWorkspace(id);
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
        message.error(err.error);
      }
    },
    [setWorkspaceData, id]
  );

  useEffect(() => {
    getWorkspaceData();

    return () => {
      resetWorkspaceState();
      resetWorkspacePaginationState();
      resetChatOutputs();
    };
  }, [
    getWorkspaceData,
    resetWorkspacePaginationState,
    resetWorkspaceState,
    resetChatOutputs,
    id,
  ]);

  return (
    <div className="flex flex-col h-full">
      <div className="max-h-full grid items-center p-6 border-b-4 border-gray50 sm:justify-center md:justify-between md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div className="flex sm:justify-center md:justify-start items-center">
          <h1 className="sm:text-xl md:text-2xl font-poppins font-semibold pr-3">
            {title}
          </h1>
          <Button
            variant={ButtonVariants.PRIMARY}
            icon={<HiPlus />}
            onClick={handleClick}
            className="!px-5"
          />
        </div>
        <div className="flex gap-2 md:justify-end sm:justify-center items-center">
          <Button
            variant={ButtonVariants.PRIMARY_LIGHT}
            icon={<HiOutlineRefresh />}
            name={Workspace.Reset}
            onClick={handleReset}
          />
          <div>
            <Button
              size={undefined}
              variant={ButtonVariants.OUTLINED}
              name={Workspace.PublishPrompt}
              onClick={() => setShowModal(true)}
            />
          </div>
          <PublishPromptModal
            showModal={showModal}
            setShowModal={setShowModal}
            systemMessage={systemMessage}
            userMessage={userMessage}
            heading={heading}
            uuid={uuid}
            is_public={is_public}
          />
        </div>
      </div>
      <div className="max-h-full flex px-8 py-2 border-b-4 border-gray50 items-center justify-between">
        {/* Tab Switcher starts */}
        <Tabs tabs={tabs} currentTab={activeTab} onTabClick={handleTabClick} />
        {/* Tab Switcher ends */}
        <div className="flex py-2 justify-center items-center gap-2">
          <WorkspaceParameters />
        </div>
      </div>
      <div className="max-h-full h-full overflow-y-scroll">
        <div className=" px-4 h-full">
          {tabs.map(tab => (
            <>{activeTab === tab.id && <>{tab.content}</>}</>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
