import React, { useState } from 'react';

import { FiCopy, FiHeart } from 'react-icons/fi';
import { BiDislike } from 'react-icons/bi';

import { Button, Modal, Tag, Text } from 'components/common';
import ModalContent from './ModalContent';
import { LibraryCardItem as CardItemProps } from 'types';
import { ButtonVariants, Library, LibraryCard as Card } from 'utils/constants';
import { BsTrash } from 'react-icons/bs';

const LibraryCard: React.FC<CardItemProps> = ({
  title,
  bookmarked,
  is_public,
  liked_by_user,
  likes_dislikes_count,
  prompt_type,
  sample_output,
  tags,
  user_message,
  uuid,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const addPromptHandler: React.MouseEventHandler = () => {
    setShowModal(prev => !prev);
  };

  const importPromptHandler = () => {};

  return (
    <>
      <div className="flex flex-col bg-white p-4 rounded-2xl shadow">
        <div className="flex sm:flex-col md:flex-row sm:items-start md:justify-between gap-4 items-center mb-4">
          <h2
            className="text-black font-bold text-md cursor-pointer transition hover:text-primary"
            onClick={addPromptHandler}
          >
            {title}
          </h2>
          <Button
            size="small"
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
            size="small"
            name={Card.ButtonCopyPrompt}
            icon={<FiCopy />}
            onClick={() => {}}
          />
          <Button
            variant={ButtonVariants.OUTLINED_LIGHT}
            size="small"
            name={Card.ButtonFavorite}
            icon={<FiHeart />}
            onClick={() => {}}
          />
          <Button
            variant={ButtonVariants.OUTLINED_LIGHT}
            size="small"
            name={Card.ButtonDislike}
            icon={<BiDislike />}
            onClick={() => {}}
          />
          <Button
            variant={ButtonVariants.OUTLINED_LIGHT}
            size="small"
            name={Card.ButtonDelete}
            icon={<BsTrash />}
            onClick={() => {}}
          />
        </div>
      </div>
      <Modal
        key={uuid}
        title={title}
        centered={true}
        isOpen={showModal}
        cancelModalHandler={() => setShowModal(false)}
        okText={'Import Prompt'}
        footer={[
          <Button
            variant={ButtonVariants.PRIMARY}
            size="small"
            name={Library.ImportPrompt}
            onClick={() => {}}
          />,
        ]}
      >
        <ModalContent title={title} tags={tags} user_message={user_message} />
      </Modal>
    </>
  );
};

export default LibraryCard;
