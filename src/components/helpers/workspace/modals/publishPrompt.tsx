import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { Button, Heading, Modal, Text } from 'components/common';
import { Workspace, ButtonVariants, TextVariants } from 'utils/constants';
import { publishPromptState } from 'middleware/state';
import { toast } from 'react-toastify';
import { PublishPromptWorkspace } from 'middleware/api';
import { message } from 'antd';

interface PublishPromptProps {
  onPublishPrompt: (uuid: string, is_public: boolean) => Promise<any>;
  showModal: boolean;
  is_public: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  systemMessage: string;
  userMessage: string;
  uuid: string;
  heading: string;
}

const PublishPrompt: React.FC<PublishPromptProps> = ({
  onPublishPrompt,
  showModal,
  setShowModal,
  is_public,
  systemMessage,
  userMessage,
  uuid,
  heading,
}) => {
  const sumbitHandler = async () => {
    try {
      const res = await onPublishPrompt(uuid, is_public);
    } catch (error) {}
  };

  return (
    <div>
      <Modal
        title={Workspace.PublishPrompt}
        centered={true}
        isOpen={showModal}
        cancelModalHandler={() => setShowModal(false)}
        okText={Workspace.Publish}
        sumbitHandler={sumbitHandler}
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
