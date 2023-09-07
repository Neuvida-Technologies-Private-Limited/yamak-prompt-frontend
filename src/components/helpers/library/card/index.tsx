import React from 'react';
import { FiCopy, FiHeart } from 'react-icons/fi';
import { BiLike, BiDislike } from 'react-icons/bi';
import { PiWarningBold } from 'react-icons/pi';
import { CardConst } from 'utils/constants';
import { Button } from 'components/common';

interface CardProps {
  heading: string;
  subHeading: string;
}
const handleClick = () => {};
const buttons = [
  { icon: <FiCopy />, name: CardConst.CopyPrompt, onclick: handleClick },
  { icon: <BiLike />, name: CardConst.Likes, onclick: handleClick },
  { icon: <BiDislike />, name: CardConst.Likes, onclick: handleClick },
  { icon: <FiHeart />, onclick: handleClick },
  { icon: <PiWarningBold />, onclick: handleClick },
];

const index: React.FC<CardProps> = ({ heading, subHeading }) => {
  return (
    <div className="flex flex-col bg-bgSecondary w-1/3 p-5 rounded-2xl">
      <div className="font-poppins font-bold text-md pb-3">
        <h2 className="text-black">{heading}</h2>
      </div>
      <div className="font-raleway font-normal text-xs pb-3">
        <h3 className="text-gray800">{subHeading}</h3>
      </div>
      <div className="flex justify-between">
        {buttons.map(button => (
          <Button
            onClick={button.onclick}
            size={undefined}
            type={'default'}
            shape={undefined}
            icon={button.icon}
            name={button.name}
            className="flex items-center text-xs justify-center font-raleway"
          />
        ))}
      </div>
    </div>
  );
};

export default index;
