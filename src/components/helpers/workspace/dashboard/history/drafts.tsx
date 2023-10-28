import React, { useEffect, useState } from 'react';

import { message } from 'antd';
import { MdOutlineBookmark, MdOutlineBookmarkBorder } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { RiUploadCloudFill, RiUploadCloudLine } from 'react-icons/ri';
import { FiTrash2 } from 'react-icons/fi';

import { Button, Heading, Tooltip, Text, Modal } from 'components/common';
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
  publishPromptState,
} from 'middleware/state';
import { Variables } from 'types';

interface DraftProps {
  title: string;
  onUpdatePrompt: (update: any, id: string) => Promise<any>;
  deleteHistory: (uuid: string) => Promise<void>;
  getHistory: (currentPage: number) => Promise<void>;
  systemMessage: string;
  userMessage: string;
  uuid: string;
  bookmarked: boolean;
  published: boolean;
  output: [];
  tags: [];
  variables: Variables;
  currentPage: number;
}

const Drafts: React.FC<DraftProps> = ({
  title,
  onUpdatePrompt,
  deleteHistory,
  getHistory,
  uuid,
  bookmarked,
  systemMessage,
  userMessage,
  published,
  output,
  tags,
  variables,
  currentPage,
}) => {
  const [isBookmark, setIsBookmark] = useState(bookmarked);
  const [isPublished, setIsPublished] = useState(published);
  const [showModal, setShowModal] = useState(false);
  const [deletePromptModal, showDeleteModal] = useState(false);
  const [, setOutputState] = useRecoilState(generateOutputState);
  const [, setRowStates] = useRecoilState(variablesRowState);
  const [, setVariableRows] = useRecoilState(variablesRowNumberState);
  const [, setPublishState] = useRecoilState(publishPromptState);

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
    await getHistory(currentPage);
  }
  async function handlePublishPrompt(event: React.MouseEvent) {
    event.stopPropagation();
    setShowModal(true);
  }
  async function handleCancel(event: React.MouseEvent) {
    event.stopPropagation();

    showDeleteModal(false);
  }
  async function handleDeleteModal(event: React.MouseEvent) {
    event.stopPropagation();
    showDeleteModal(true);
  }
  async function handleDelete(event: React.MouseEvent) {
    event.stopPropagation();

    try {
      await deleteHistory(uuid);
      showDeleteModal(false);
      message.success('Prompt deleted successfully!');
    } catch (error) {
      message.error('Error in deleting prompt');
    }
  }

  const handleHistory: React.MouseEventHandler = () => {
    debugger;
    const formattedTags = tags.map(tag => tag).join(', ');
    if (Object.keys(variables).length > 0) {
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
    } else {
      setVariableRows([]);
      setRowStates([]);
    }

    setOutputState(old => ({
      ...old,
      system_message: systemMessage,
      user_message: userMessage,
      title: title,
      output: output,
      tags: formattedTags,
      variables: variables,
      uuid: uuid,
      bookmarked: bookmarked,
    }));
    setPublishState(old => ({
      ...old,
      heading: title,
      uuid: uuid,
      userMessage: userMessage,
      systemMessage: systemMessage,
    }));
  };

  useEffect(() => {
    setIsBookmark(bookmarked);
  }, [bookmarked]);

  useEffect(() => {
    setIsPublished(published);
  }, [published]);

  return (
    <div
      className=" cursor-pointer flex flex-col justify-between h-fit w-full py-2 border-b mb-2  transition hover:shadow"
      onClick={handleHistory}
    >
      <div className="w-full flex flex-row justify-between items-center px-2">
        <Heading level={5} children={title} />
        <div className="flex items-center gap-2">
          <Tooltip
            element={
              <Button
                variant={ButtonVariants.SECONDARY}
                className="!w-8 !h-8"
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
                variant={ButtonVariants.DEFAULT}
                className="!w-8 !h-8"
                icon={
                  isPublished ? <RiUploadCloudFill /> : <RiUploadCloudLine />
                }
                size={ButtonSizes.SMALL}
                onClick={handlePublishPrompt}
                disabled={isPublished ? true : false}
              />
            }
            title={isPublished ? Workspace.Published : Workspace.Publish}
            color="white"
          />
        </div>
      </div>
      <div className="w-full flex justify-between items-center pr-2">
        <Button
          variant={ButtonVariants.WARNING}
          size={ButtonSizes.SMALL}
          name={'Delete'}
          onClick={handleDeleteModal}
        />
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
      <Modal
        title={'Are you sure you want to delete this prompt?'}
        centered={true}
        isOpen={deletePromptModal}
        cancelModalHandler={handleCancel}
        sumbitHandler={handleDelete}
        okText="Yes"
        cancelText="No"
        closeIcon={false}
      />
    </div>
  );
};

export default Drafts;
