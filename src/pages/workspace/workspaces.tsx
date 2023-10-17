import React, { useCallback, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { HiOutlineRefresh, HiPlus, HiOutlineChatAlt2 } from 'react-icons/hi';
import { BsCheck2Circle } from 'react-icons/bs';
import { useRecoilState, useResetRecoilState } from 'recoil';

import {
  PublishPromptWorkspace,
  getSearchWorkspaceHistory,
  getWorkspace,
} from 'middleware/api';
import {
  WorkspaceParameters,
  WorkspaceChat,
  WorkspaceCompletion,
  PublishPromptModal,
} from 'components/helpers';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';
import {
  generateOutputState,
  publishPromptState,
  workspaceHistoryState,
  workspaceInfoState,
} from 'middleware/state';
import { Button, Input, Tabs } from 'components/common';

// const handleClick = () => {};
// const handleChange = () => {};

// const tabs = [
//   {
//     id: '1',
//     tabTitle: Workspace.Chat,
//     content: <WorkspaceChat />,
//     icon: <HiOutlineChatAlt2 />,
//   },
//   {
//     id: '2',
//     tabTitle: Workspace.Completion,
//     content: <WorkspaceCompletion />,
//     icon: <BsCheck2Circle />,
//   },
// ];

import { message } from 'antd';

const Index = () => {
  const [currentTab, setCurrentTab] = useState<string | null>('2');
  const [showModal, setShowModal] = useState(false);

  const [{ title }, setWorkspaceData] = useRecoilState(workspaceInfoState);
  const [, setWorkspaceHistory] = useRecoilState(workspaceHistoryState);
  const [publishState] = useRecoilState(publishPromptState);

  const { systemMessage, userMessage, heading, uuid, is_public } = publishState;

  const resetOutputState = useResetRecoilState(generateOutputState);
  const resetPublishState = useResetRecoilState(publishPromptState);

  const id = useLocation().pathname.split('/').at(-1);

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
        toast.error(err.error);
      }
    },
    [setWorkspaceData, id]
  );

  const handlePublishPrompt = async (uuid: string, is_public: boolean) => {
    const publishPromptParams = {
      uuid,
      is_public,
    };

    try {
      const res = await PublishPromptWorkspace(publishPromptParams);

      if (res.status === 201) {
        message.success(res.data);
        return res.status;
      } else {
        message.error(res.error);
        return;
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getWorkspaceData();
  }, [getWorkspaceData]);

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
      content: <WorkspaceCompletion onPublishPrompt={handlePublishPrompt} />,
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
            onPublishPrompt={handlePublishPrompt}
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
        <Tabs tabs={tabs} currentTab={currentTab} onTabClick={handleTabClick} />
        {/* Tab Switcher ends */}
        <div className="flex py-2 justify-center items-center gap-2">
          <WorkspaceParameters />
        </div>
      </div>
      <div className="max-h-full h-full overflow-y-scroll">
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
