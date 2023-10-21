import React, { useEffect, useState } from 'react';

import { message } from 'antd';
import { MdOutlineBookmark, MdOutlineBookmarkBorder } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { RiUploadCloudFill, RiUploadCloudLine } from 'react-icons/ri';

import { Button, Heading, Tooltip, Text } from 'components/common';
import {
  ButtonSizes,
  ButtonVariants,
  TextVariants,
  Workspace,
} from 'utils/constants';
import { PublishPromptModal } from 'components/helpers';
import {
  generateOutputState,
  variablesRowState,
  variablesRowNumberState,
} from 'middleware/state';
import { Variables } from 'types';

interface DraftProps {
  title: string;
  onUpdatePrompt: (update: any, id: string) => Promise<any>;
  systemMessage: string;
  userMessage: string;
  uuid: string;
  bookmarked: boolean;
  published: boolean;
  output: [];
  tags: [];
  variables: Variables;
}

const Drafts: React.FC<DraftProps> = ({
  title,
  onUpdatePrompt,
  uuid,
  bookmarked,
  systemMessage,
  userMessage,
  published,
  output,
  tags,
  variables,
}) => {
  const [isBookmark, setIsBookmark] = useState(bookmarked);
  const [isPublished, setIsPublished] = useState(published);
  const [showModal, setShowModal] = useState(false);
  const [, setOutputState] = useRecoilState(generateOutputState);
  const [, setRowStates] = useRecoilState(variablesRowState);
  const [, setVariableRows] = useRecoilState(variablesRowNumberState);

  async function handleBookmark(event: React.MouseEvent) {
    event.stopPropagation();
    setIsBookmark(prev => !prev);
    const updateObj = {
      bookmarked: !isBookmark,
    };
    const res: any = await onUpdatePrompt(JSON.stringify(updateObj), uuid);

    if (res.status !== 200) return message.error(res.error);

    message.success(
      isBookmark ? Workspace.UnbookmarkedSuccess : Workspace.BookmarkedSuccess
    );
  }

  const handleHistory: React.MouseEventHandler = () => {
    const formattedTags = tags.map(tag => tag).join(', ');

    const newStates = [];
    for (const variableName in variables) {
      if (Object.prototype.hasOwnProperty.call(variables, variableName)) {
        const variableValue = variables[variableName];
        newStates.push({ variableName, variableValue });
      }

      // Update variableRows based on the number of newStates
      setVariableRows([...Array(newStates.length).keys()]);
    }

    setRowStates(newStates);

    // setVariableRows([newStates.length]);

    setOutputState(old => ({
      ...old,
      system_message: systemMessage,
      user_message: userMessage,
      title: title,
      output: output,
      tags: formattedTags,
      variables: variables,
    }));
  };

  useEffect(() => {
    setIsBookmark(bookmarked);
  }, [bookmarked]);

  useEffect(() => {
    setIsPublished(published);
  }, [published]);

  return (
    <div className="flex flex-col justify-between h-fit w-full py-3 border-b mb-2 p-2 transition hover:shadow">
      <div className="w-full flex flex-row">
        <div className="cursor-pointer w-full" onClick={handleHistory}>
          <Heading level={5} children={title} />
        </div>
        <div className="flex items-center gap-2">
          <Tooltip
            element={
              <Button
                variant={ButtonVariants.SECONDARY}
                icon={
                  isBookmark ? (
                    <MdOutlineBookmark />
                  ) : (
                    <MdOutlineBookmarkBorder />
                  )
                }
                size={ButtonSizes.SMALL}
                onClick={handleBookmark}
              />
            }
            title={isBookmark ? Workspace.Unbookmark : Workspace.Bookmark}
            color="white"
          />
          <Tooltip
            element={
              <Button
                variant={ButtonVariants.OUTLINED_LIGHT}
                icon={
                  isPublished ? <RiUploadCloudFill /> : <RiUploadCloudLine />
                }
                size={ButtonSizes.SMALL}
                onClick={() => setShowModal(true)}
                disabled={isPublished ? true : false}
              />
            }
            title={isPublished ? Workspace.Published : Workspace.Publish}
            color="white"
          />
        </div>
      </div>
      <div className="w-full">
        <Text
          variant={TextVariants.SMALL}
          children={published ? Workspace.Published : ''}
          className="!text-secondary400"
        />
      </div>
      <PublishPromptModal
        showModal={showModal}
        setShowModal={setShowModal}
        is_public={false}
        systemMessage={systemMessage}
        userMessage={userMessage}
        uuid={uuid}
        heading={title}
      />
    </div>
  );
};

export default Drafts;
