import React, { useEffect, useState } from 'react';

import { message } from 'antd';

import { Text, Heading, Tag } from 'components/common';
import { TextVariants } from 'utils/constants';
import { ModalContent as ModalConst } from 'utils/constants';

interface ContentProps {
  id: string;
  onPromptInfo: (id: string) => Promise<any>;
}

const ModalContent: React.FC<ContentProps> = ({ id, onPromptInfo }) => {
  const [modalContent, setModalContent] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const res = await onPromptInfo(id);
        setModalContent(res);
      } catch (err: any) {
        message.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [id, onPromptInfo]);

  return isLoading ? (
    <p>Loading prompt content...</p>
  ) : (
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
          {modalContent.data.user_message || ModalConst.NO_USER_MESSAGE}
        </Text>
      </div>
      <Heading level={5}>Prompt</Heading>
      <div className="flex flex-col gap-2 bg-gray50 rounded-md p-4 mb-6">
        <p className="font-bold">System: </p>
        <Text variant={TextVariants.SMALL}>
          {modalContent.data.system_message || ModalConst.NO_SYSTEM_MESSAGE}
        </Text>
        <p className="font-bold">User: </p>
        <Text variant={TextVariants.SMALL}>
          {modalContent.data.user_message || ModalConst.NO_USER_MESSAGE}
        </Text>
      </div>
      <div className="mb-8">
        <Heading level={5}>Sample Answer</Heading>
        <Text variant={TextVariants.SMALL} className="text-secondary">
          {modalContent.data.sample_output || ModalConst.NO_PROMPT_OUTPUT}
        </Text>
      </div>
    </>
  );
};

export default ModalContent;
