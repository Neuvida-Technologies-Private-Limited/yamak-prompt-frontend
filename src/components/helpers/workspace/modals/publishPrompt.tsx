import React, { useState } from 'react';

import { Button, Modal } from 'components/common';
import { Workspace, ButtonVariants, TextVariants } from 'utils/constants';

const PublishPrompt = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {};
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
        sumbitHandler={handleClick}
        className="keyManagement"
      >
        <>
          <div className="flex">
            {modalContent.data.tags.map((tag: string, i: number) => (
              <Tag
                key={`prompt-card-tag-${i}`}
                color="blue"
                bordered={true}
                label={tag}
              />
            ))}
          </div>
          <div className="mt-2 mb-4">
            <Text variant={TextVariants.MEDIUM}>
              {modalContent.data.user_message || ModalConst.NoUserMessage}
            </Text>
          </div>
          <Heading level={5}>Prompt</Heading>
          <div className="flex flex-col gap-2 bg-gray50 rounded-md p-4 mb-6">
            <p className="font-bold">System: </p>
            <Text variant={TextVariants.SMALL}>
              {modalContent.data.system_message || ModalConst.NoSystemMessage}
            </Text>
            <p className="font-bold">User: </p>
            <Text variant={TextVariants.SMALL}>
              {modalContent.data.user_message || ModalConst.NoUserMessage}
            </Text>
          </div>
          <div>
            <Heading level={5}>Sample Answer</Heading>
            <Text variant={TextVariants.SMALL} className="text-secondary">
              {modalContent.data.sample_output || ModalConst.NoSampleOutput}
            </Text>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default PublishPrompt;
