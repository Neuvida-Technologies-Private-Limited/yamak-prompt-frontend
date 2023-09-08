import React from 'react';
import { FiCopy, FiHeart } from 'react-icons/fi';
import { BiLike, BiDislike } from 'react-icons/bi';
import { PiWarningBold } from 'react-icons/pi';
import { CardConst } from 'utils/constants';
import { Button, Text } from 'components/common';

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
  const importPromptHandler = () => {};

  return (
    <div className="flex flex-col bg-white p-4 rounded-2xl shadow">
      <div className="flex sm:flex-col md:flex-row sm:items-start md:justify-between gap-4 items-center mb-4">
        <h2 className="text-black font-bold text-md ">{heading}</h2>
        <Button
          size="small"
          type="default"
          shape="default"
          onClick={importPromptHandler}
          className="!text-xs whitespace-nowrap bg-gray50 text-primary800 font-bold !p-2 !py-4 !rounded-xl border-0"
          name={buttonName}
        />
      </div>
      <h3 className="bg-red50 text-gray800 inline-block self-start mb-4 p-1 px-2 rounded-lg text-xs">
        {subHeading}
      </h3>
      <Text
        children={description}
        className="text-xs text-black !opacity-100 font-medium mb-4"
      />
      <div className="flex flex-wrap justify-start gap-2">
        {buttons.map((button, index) => (
          <Button
            key={`library-card-icon-${index}`}
            onClick={button.onclick}
            size={undefined}
            type={'default'}
            shape={undefined}
            icon={button.icon}
            name={button.name}
            className="flex items-center text-xs justify-center"
          />
        ))}
      </div>
    </div>
  );
};

export default LibraryCard;
