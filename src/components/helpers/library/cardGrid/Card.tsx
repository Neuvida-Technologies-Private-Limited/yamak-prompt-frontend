import React, { useState } from 'react';
import { FiCopy, FiHeart } from 'react-icons/fi';
import { BiLike, BiDislike } from 'react-icons/bi';
import { PiWarningBold } from 'react-icons/pi';
import { Library } from 'utils/constants';
import { Button, Modal, Tag, Text } from 'components/common';
import ModalContent from './ModalContent';
import { LibraryCardItem as CardItemProps } from 'types';

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

  const importPromptHandler = () => {
    console.log('IMPORT PROMPT FROM CARD');
  };

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
            variant="default"
            onClick={importPromptHandler}
            className="!text-xs !p-2"
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
            variant="outlined"
            size="small"
            name="Copy Prompt"
            icon={<FiCopy />}
            onClick={() => {}}
            className="!text-xs !py-1 !px-2"
          />
          <Button
            variant="outlined"
            size="small"
            name={' ' + likes_dislikes_count.likes}
            icon={<BiLike />}
            onClick={() => {}}
            className="!text-xs !py-1 !px-2"
          />
          <Button
            variant="outlined"
            size="small"
            name={' ' + likes_dislikes_count.dislikes}
            icon={<BiDislike />}
            onClick={() => {}}
            className="!text-xs !py-1 !px-2"
          />
          <Button
            variant="outlined"
            size="small"
            name=""
            icon={<FiHeart />}
            onClick={() => {}}
            className="!text-xs !py-1 !px-2"
          />
          <Button
            variant="outlined"
            size="small"
            name=""
            icon={<PiWarningBold />}
            onClick={() => {}}
            className="!text-xs !py-1 !px-2"
          />
        </div>
      </div>
      <Modal
        key={uuid}
        title={title}
        centered={true}
        isOpen={showModal}
        showModalHandler={() => setShowModal(true)}
        cancelModalHandler={() => setShowModal(false)}
        okText={'Import Prompt'}
        footer={[
          <Button
            variant="primary"
            size="small"
            name="Import Prompt"
            onClick={() => console.log('IMPORT PROMPT FROM MODAL')}
          />,
        ]}
      >
        <ModalContent title={title} tags={tags} user_message={user_message} />
      </Modal>
    </>
  );
};

export default LibraryCard;
