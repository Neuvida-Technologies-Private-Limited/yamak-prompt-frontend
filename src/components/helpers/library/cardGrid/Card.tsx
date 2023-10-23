import React, { useState } from 'react';

import { FiCopy, FiHeart } from 'react-icons/fi';
import {
  BiDislike,
  BiLike,
  BiSolidDislike,
  BiSolidHeart,
  BiSolidLike,
} from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { message } from 'antd';

import { Button, Modal, Tag, Text } from 'components/common';
import ModalContent from './ModalContent';
import { LibraryCardItem as CardItemProps } from 'types';
import { ButtonVariants, Library, LibraryCard as Card } from 'utils/constants';
import { ImportPromptModal } from 'components/helpers';

const LibraryCard: React.FC<CardItemProps> = ({
  title,
  favourite,
  bookmarked,
  is_public,
  liked_by_user,
  likes_dislikes_count,
  prompt_type,
  sample_output,
  tags,
  user_message,
  uuid,
  onDeletePrompt,
  onPromptInfo,
  onUpdatePrompt,
  system_message,
}) => {
  const [promptInfoModal, showPromptInfoModal] = useState<boolean>(false);
  const [importPromptModal, showImportPromptModal] = useState<boolean>(false);
  const [deletePromptModal, showDeleteModal] = useState(false);
  const [isFavourite, setIsFavourite] = useState(favourite);
  const [isLiked, setisLiked] = useState<null | boolean>(function () {
    if (liked_by_user === null) return null;
    if (liked_by_user === true) return true;
    return false;
  });
  const [isDisliked, setIsDisliked] = useState<null | boolean>(function () {
    if (liked_by_user === null) return null;
    if (liked_by_user === true) return false;
    return true;
  });

  const promptInfoHandler: React.MouseEventHandler = () => {
    showPromptInfoModal(prev => !prev);
  };

  function importPromptHandler(event: React.MouseEvent) {
    event.stopPropagation();
    showImportPromptModal(prev => !prev);
  }

  function copyPromptHandler(event: React.MouseEvent) {
    event.stopPropagation();
    navigator.clipboard.writeText(user_message);
    message.success(Card.Copied);
  }

  async function favoriteHandler(event: React.MouseEvent) {
    event.stopPropagation();
    setIsFavourite(prev => !prev);
    const updateObj = {
      favourite: !isFavourite,
    };
    const res: any = await onUpdatePrompt(JSON.stringify(updateObj), uuid);

    if (res.status !== 200) return message.error(res.error);

    message.success(Card.Success);
  }

  async function likeHandler(event: React.MouseEvent) {
    event.stopPropagation();

    setisLiked(prev => !prev);
    setIsDisliked(false);

    const updateObj = isLiked ? { liked: 'delete' } : { liked: true };

    const res: any = await onUpdatePrompt(JSON.stringify(updateObj), uuid);
    if (res.status !== 200) {
      message.error(res.error);
      return;
    }
    message.success(Card.Success);
  }

  async function dislikeHandler(event: React.MouseEvent) {
    event.stopPropagation();

    setIsDisliked(prev => !prev);
    setisLiked(false);

    const updateObj = isDisliked ? { liked: 'delete' } : { liked: false };

    const res: any = await onUpdatePrompt(JSON.stringify(updateObj), uuid);
    if (res.status !== 200) {
      message.error(res.error);
      return;
    }
    message.success(Card.Success);
  }

  async function deleteHandler(event: React.MouseEvent) {
    event.stopPropagation();

    try {
      await onDeletePrompt(uuid);
      message.success(Card.Deleted);
      showDeleteModal(false);
    } catch (err: any) {}
  }

  return (
    <>
      <div
        className="flex flex-col bg-white p-4 rounded-2xl shadow cursor-pointer h-auto transition-all duration-300 hover:shadow-md hover:-translate-y-1"
        onClick={promptInfoHandler}
      >
        <div className="flex sm:flex-col md:flex-row sm:items-start md:justify-between gap-4 items-center mb-4">
          <h2 className="text-black font-bold text-md cursor-pointer">
            {title}
          </h2>
          <Button
            variant={ButtonVariants.DEFAULT}
            onClick={importPromptHandler}
            name={Library.CARD_BUTTON_NAME}
          />
        </div>
        <div className="flex flex-wrap">
          {tags.map((tag, i) => (
            <Tag
              key={`prompt-card-tag-${i}`}
              color="pink"
              bordered={true}
              label={tag}
            />
          ))}
        </div>
        <Text
          children={user_message}
          className="text-xs text-black !opacity-100 font-medium mb-4"
        />
        <div className="flex flex-wrap justify-start gap-2">
          <Button
            variant={ButtonVariants.OUTLINED_LIGHT}
            name={Card.ButtonCopyPrompt}
            icon={<FiCopy />}
            onClick={copyPromptHandler}
          />
          <Button
            variant={ButtonVariants.OUTLINED_LIGHT}
            name={Card.ButtonFavorite}
            icon={isFavourite ? <BiSolidHeart /> : <FiHeart />}
            onClick={favoriteHandler}
          />
          <Button
            variant={ButtonVariants.OUTLINED_LIGHT}
            name={likes_dislikes_count.likes}
            icon={
              isLiked === null ? (
                <BiLike />
              ) : isLiked === true ? (
                <BiSolidLike />
              ) : (
                <BiLike />
              )
            }
            onClick={likeHandler}
          />
          <Button
            variant={ButtonVariants.OUTLINED_LIGHT}
            name={likes_dislikes_count.dislikes}
            icon={
              isDisliked === null ? (
                <BiDislike />
              ) : isDisliked === true ? (
                <BiSolidDislike />
              ) : (
                <BiDislike />
              )
            }
            onClick={dislikeHandler}
          />
          <Button
            variant={ButtonVariants.OUTLINED_LIGHT}
            name={Card.ButtonDelete}
            icon={<BsTrash />}
            onClick={event => {
              event.stopPropagation();
              showDeleteModal(true);
            }}
          />
        </div>
      </div>
      <Modal
        key={uuid}
        title={title}
        centered={true}
        isOpen={promptInfoModal}
        cancelText=""
        cancelModalHandler={() => showPromptInfoModal(false)}
        sumbitHandler={() => {}}
        okText={Library.CARD_BUTTON_NAME}
      >
        <ModalContent key={uuid} id={uuid} onPromptInfo={onPromptInfo} />
      </Modal>
      <Modal
        title={'Are you sure you want to delete this prompt?'}
        centered={true}
        isOpen={deletePromptModal}
        cancelModalHandler={() => showDeleteModal(false)}
        sumbitHandler={deleteHandler}
        okText="Yes"
        cancelText="No"
        closeIcon={false}
      />
      <ImportPromptModal
        isOpen={importPromptModal}
        cancelModalHandler={showImportPromptModal}
        tags={tags}
        promptTitle={title}
        systemMessage={system_message}
        userMessage={user_message}
        promptID={uuid}
        bookmarked={bookmarked}
        sample_output={[]}
      />
    </>
  );
};

export default LibraryCard;
