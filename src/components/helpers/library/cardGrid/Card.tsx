import React, { useState } from 'react';

import { FiCopy, FiHeart } from 'react-icons/fi';
import { BiDislike, BiSolidDislike, BiSolidHeart } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { message } from 'antd';

import { Button, Modal, Tag, Text } from 'components/common';
import ModalContent from './ModalContent';
import { LibraryCardItem as CardItemProps } from 'types';
import { ButtonVariants, Library, LibraryCard as Card } from 'utils/constants';

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
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState(favourite);
  const [isLiked, setisLiked] = useState(liked_by_user);

  const promptInfoHandler: React.MouseEventHandler = () => {
    setShowModal(prev => !prev);
  };

  function importPromptHandler() {}

  function copyPromptHandler() {
    navigator.clipboard.writeText(user_message);
    message.success(Card.Copied);
  }

  async function favoriteHandler() {
    setIsFavourite(prev => !prev);
    const updateObj = {
      favourite: !isFavourite,
    };
    const res: any = await onUpdatePrompt(JSON.stringify(updateObj), uuid);

    if (res.status_code !== 200) return message.error(res.error);

    message.success(Card.Success);
  }

  async function dislikeHandler() {
    setisLiked(prev => !prev);
    /**
     * If not isDisliked means, the user like the card
     */
    const updateObj = {
      liked: !isLiked,
    };
    const res = await onUpdatePrompt(JSON.stringify(updateObj), uuid);

    if (res.status_code !== 200) return message.error(res.error);

    message.success(Card.Success);
  }

  async function deleteHandler() {
    if (window.confirm('Are you sure?')) {
      await onDeletePrompt(uuid);
      message.success('Prompt deleted');
    }
  }

  return (
    <>
      <div className="flex flex-col bg-white p-4 rounded-2xl shadow">
        <div className="flex sm:flex-col md:flex-row sm:items-start md:justify-between gap-4 items-center mb-4">
          <h2
            className="text-black font-bold text-md cursor-pointer transition hover:text-primary"
            onClick={promptInfoHandler}
          >
            {title}
          </h2>
          <Button
            variant={ButtonVariants.DEFAULT}
            onClick={importPromptHandler}
            name={Library.CardButtonName}
          />
        </div>
        <div className="flex">
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
            name={Card.ButtonDislike}
            icon={!isLiked ? <BiSolidDislike /> : <BiDislike />}
            onClick={dislikeHandler}
          />
          <Button
            variant={ButtonVariants.OUTLINED_LIGHT}
            name={Card.ButtonDelete}
            icon={<BsTrash />}
            onClick={deleteHandler}
          />
        </div>
      </div>
      <Modal
        key={uuid}
        title={title}
        centered={true}
        isOpen={showModal}
        cancelModalHandler={() => setShowModal(false)}
        sumbitHandler={() => {}}
        okText={'Import Prompt'}
      >
        <ModalContent key={uuid} id={uuid} onPromptInfo={onPromptInfo} />
      </Modal>
    </>
  );
};

export default LibraryCard;
