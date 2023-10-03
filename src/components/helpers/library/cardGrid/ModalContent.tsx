import React, { useEffect, useState } from 'react';
import { Text, Heading, Tag } from 'components/common';

interface ContentProps {
  id: string;
  onPromptInfo: (id: string) => unknown;
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
      } catch (err) {
        console.log(err);
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
        <Text variant="medium">
          {modalContent.data.user_message || 'No user message'}
        </Text>
      </div>
      <Heading level={5}>Prompt</Heading>
      <div className="flex flex-col gap-2 bg-gray50 rounded-md p-4 mb-6">
        <p className="font-bold">System: </p>
        <Text variant="medium">
          {modalContent.data.system_message || 'No system message'}
        </Text>
        <p className="font-bold">User: </p>
        <Text variant="medium">
          {modalContent.data.user_message || 'No user message'}
        </Text>
      </div>
      <div>
        <Heading level={5}>Sample Answer</Heading>
        <Text variant="medium" className="text-secondary">
          {modalContent.data.sample_output || 'No sample output'}
        </Text>
      </div>
    </>
  );
};

export default ModalContent;
