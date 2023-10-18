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
import { generateOutputState, variableUserInputState } from 'middleware/state';

interface DraftProps {
  title: string;
  onUpdatePrompt: (update: any, id: string) => Promise<any>;
  systemMessage: string;
  userMessage: string;
  uuid: string;
  bookmarked: boolean;
  published: boolean;
  output: [];
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
}) => {
  const [isBookmark, setIsBookmark] = useState(bookmarked);
  const [isPublished, setIsPublished] = useState(published);
  const [showModal, setShowModal] = useState(false);
  const [outputState, setOutputState] = useRecoilState(generateOutputState);
  const [{ userInput }, setUserInput] = useRecoilState(variableUserInputState);

  const {} = outputState;

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
    setOutputState(old => ({
      ...old,
      system_message: systemMessage,
      user_message: userMessage,
      title: title,
      output: output,
    }));
    setUserInput({ userInput: userMessage });
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
