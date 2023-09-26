import React, { useState } from 'react';
import { FiCopy, FiHeart } from 'react-icons/fi';
import { BiLike, BiDislike } from 'react-icons/bi';
import { PiWarningBold } from 'react-icons/pi';
import { CardConst } from 'utils/constants';
import { Button, Modal, Tag, Text } from 'components/common';

interface CardProps {
  heading: string;
  subHeading: string;
  buttonName: string;
  description: string;
}
const handleClick = () => {};
const buttons = [
  { icon: <FiCopy />, name: CardConst.CopyPrompt, onclick: handleClick },
  { icon: <BiLike />, name: CardConst.Likes, onclick: handleClick },
  { icon: <BiDislike />, name: CardConst.Likes, onclick: handleClick },
  { icon: <FiHeart />, onclick: handleClick },
  { icon: <PiWarningBold />, onclick: handleClick },
];

const LibraryCard: React.FC<CardProps> = ({
  heading,
  subHeading,
  buttonName,
  description,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const addPromptHandler: React.MouseEventHandler = () => {
    setShowModal(prev => !prev);
  };

  const importPromptHandler = () => {
    console.log('IMPORT PROMPT');
  };

  return (
    <>
      <div className="flex flex-col bg-white p-4 rounded-2xl shadow">
        <div className="flex sm:flex-col md:flex-row sm:items-start md:justify-between gap-4 items-center mb-4">
          <h2
            className="text-black font-bold text-md cursor-pointer transition hover:text-primary"
            onClick={addPromptHandler}
          >
            {heading}
          </h2>
          <Button
            size="small"
            variant="default"
            onClick={importPromptHandler}
            className="!text-xs !p-2 !py-4"
            name={buttonName}
          />
        </div>
        <Tag color="pink" bordered={false} label={subHeading} />
        <Text
          children={description}
          className="text-xs text-black !opacity-100 font-medium mb-4"
        />
        <div className="flex flex-wrap justify-start gap-2">
          {buttons.map((button, index) => (
            <Button
              key={`library-card-icon-${index}`}
              onClick={button.onclick}
              size="small"
              variant="outlined"
              icon={button.icon}
              name={button.name}
              className="!text-xs !py-3.5"
            />
          ))}
        </div>
      </div>
      <Modal
        title={'Human Written | 100% Percent Unique | SEO Optimized Article'}
        centered={true}
        isOpen={showModal}
        showModalHandler={() => setShowModal(true)}
        cancelModalHandler={() => setShowModal(false)}
        okText={'Import Prompt'}
        cancelText="TEST"
      >
        Some data about prompt
      </Modal>
    </>
  );
};

export default LibraryCard;
