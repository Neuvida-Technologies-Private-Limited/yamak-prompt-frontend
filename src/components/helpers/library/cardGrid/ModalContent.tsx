import React from 'react';
import { Tag, Text, Heading } from 'components/common';

interface ContentProps {
  title: string;
  tags: string[];
  user_message: string;
}

const ModalContent: React.FC<ContentProps> = ({ tags, user_message }) => {
  return (
    <>
      <div className="flex">
        {tags.map((tag, i) => (
          <Tag
            key={`prompt-card-tag-${i}`}
            color="blue"
            bordered={true}
            label={tag}
          />
        ))}
      </div>
      <Text
        children={user_message}
        className="text-xs text-gray900 !opacity-100 mb-4"
      />
      <Heading level={5}>Prompt</Heading>
      <div className="flex flex-col gap-2 bg-gray50 rounded-md p-4 mb-6">
        <p className="font-bold">System: </p>
        <Text
          children={
            'You will be provided with statements, and your task is to convert them to standard English.'
          }
          className="text-xs text-black !opacity-100"
        />
        <p className="font-bold">User: </p>
        <Text
          children={'She no went to the market'}
          className="text-xs text-black !opacity-100"
        />
      </div>
      <div>
        <Heading level={5}>Sample Answer</Heading>
        <Text
          children={'She did not go to the market'}
          className="text-xs text-secondary !opacity-100 font-medium mb-4"
        />
      </div>
    </>
  );
};

export default ModalContent;
