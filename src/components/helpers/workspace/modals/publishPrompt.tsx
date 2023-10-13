import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { Button, Heading, Modal, Text } from 'components/common';
import { Workspace, ButtonVariants, TextVariants } from 'utils/constants';
import { publishPromptState } from 'middleware/state';
import { toast } from 'react-toastify';
import { PublishPromptWorkspace } from 'middleware/api';
import { message } from 'antd';

interface PublishPromptProps {}

const PublishPrompt: React.FC<PublishPromptProps> = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const [publishState, setPublishState] = useRecoilState(publishPromptState);

  const { systemMessage, userMessage, heading, uuid, is_public } = publishState;

  const handlePublishPrompt = async (uuid: string, is_public: boolean) => {
    debugger;
    const publishPromptParams = {
      uuid,
      is_public,
    };

    try {
      const res = await PublishPromptWorkspace(publishPromptParams);

      if (res.status === 201) {
        message.success(res.data);
        setShowModal(false);
      } else {
        message.error(res.error);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <div>
      <Button
        size={undefined}
        variant={ButtonVariants.OUTLINED}
        name={Workspace.PublishPrompt}
        onClick={() => setShowModal(true)}
      />
      <Modal
        title={Workspace.PublishPrompt}
        centered={true}
        isOpen={showModal}
        cancelModalHandler={() => setShowModal(false)}
        okText={Workspace.Publish}
        sumbitHandler={() => handlePublishPrompt(uuid, is_public)}
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
