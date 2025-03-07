import React from 'react';
import { message } from 'antd';

import { Heading, Modal, Text } from 'components/common';
import { Workspace, TextVariants, ITEMS_PER_PAGE } from 'utils/constants';
import { GetWorkspaceHistory, PublishPromptWorkspace } from 'middleware/api';
import { useRecoilState } from 'recoil';
import {
  workspaceHistoryPaginationState,
  workspaceHistoryState,
  workspaceInfoState,
} from 'middleware/state';

interface PublishPromptProps {
  showModal: boolean;
  is_public: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  systemMessage: string;
  userMessage: string;
  uuid: string;
  heading: string;
}

const PublishPrompt: React.FC<PublishPromptProps> = ({
  showModal,
  setShowModal,
  is_public,
  systemMessage,
  userMessage,
  uuid,
  heading,
}) => {
  const [{ id }] = useRecoilState(workspaceInfoState);
  const [{ currentPage }, setHistoryPagination] = useRecoilState(
    workspaceHistoryPaginationState
  );
  const [{ history }, setWorkspaceHistoryState] = useRecoilState(
    workspaceHistoryState
  );

  async function handleCancel(event: React.MouseEvent) {
    event.stopPropagation();
    setShowModal(false);
  }

  const handlePublishPrompt = async (
    event: React.MouseEvent,
    uuid: string,
    is_public: boolean
  ) => {
    event.stopPropagation();

    const publishPromptParams = {
      uuid,
      is_public,
    };
    if (uuid === '') {
      return;
    }
    try {
      const res = await PublishPromptWorkspace(publishPromptParams);

      if (res.status === 201) {
        const response = await GetWorkspaceHistory(
          id,
          currentPage,
          'completion'
        );
        setHistoryPagination(old => ({
          ...old,
          count: response.data.count,
          hasNext: response.data.next,
          hasPrevious: response.data.previous,
          totalPages: Math.ceil(response.data.count / ITEMS_PER_PAGE),
        }));
        setWorkspaceHistoryState(old => ({
          ...old,
          history: response.data.results,
        }));
        message.success(res.data);
        setShowModal(false);
      } else {
        message.error(res.error);
        return;
      }
    } catch (error: any) {
      message.error(error);
    }
  };

  return (
    <div>
      <Modal
        title={Workspace.PublishPrompt}
        centered={true}
        isOpen={showModal}
        cancelModalHandler={handleCancel}
        okText={Workspace.Publish}
        sumbitHandler={e => handlePublishPrompt(e, uuid, is_public)}
        className="keyManagement"
      >
        <>
          <Heading level={5}>
            {Workspace.Prompt} : {heading}
          </Heading>
          <div className="flex flex-col gap-2 bg-gray50 rounded-md p-4 mb-6">
            <p className="font-bold">{Workspace.System}</p>
            <Text variant={TextVariants.SMALL}>{systemMessage}</Text>
            <p className="font-bold">{Workspace.User}</p>
            <Text variant={TextVariants.SMALL}>{userMessage}</Text>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default PublishPrompt;
