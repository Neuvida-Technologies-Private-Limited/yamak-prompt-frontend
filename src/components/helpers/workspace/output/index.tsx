import React from 'react';
import { FiBookmark, FiClock } from 'react-icons/fi';
import { Button, Input, TextArea } from 'components/common';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';

const buttons = [
  {
    onclick: () => handleClick,
    name: 'Submit',
    variant: ButtonVariants.PRIMARY,
  },
  {
    onclick: () => handleClick,
    name: 'Bookmark',
    variant: ButtonVariants.PRIMARY_LIGHT,
    icon: <FiBookmark />,
    className: 'md:!flex sm:!hidden',
  },
  {
    onclick: () => handleClick,
    variant: ButtonVariants.OUTLINED_LIGHT,
    className: 'sm:flex md:!hidden',
    icon: <FiBookmark />,
  },
  {
    onclick: () => handleHistoryClick,
    variant: ButtonVariants.OUTLINED_LIGHT,
    className: 'sm:flex md:!hidden',
    icon: <FiClock />,
  },
];

const handleChange = () => {};
const handleClick = () => {};
const handleHistoryClick = () => {};

const OutputSection: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <Input
          id={Workspace.PromptTitle}
          name={Workspace.PromptTitle}
          placeholder={Workspace.PromptTitle}
          onChange={handleChange}
          variant={InputVariants.Filled}
        />
      </div>
      <div className="flex flex-col font-poppins border rounded-lg border-gray200 p-4 h-full">
        <label className="font-semibold pb-2">{Workspace.Output}</label>
        <TextArea
          id={Workspace.EnterHere}
          name={Workspace.EnterHere}
          rows={10}
          placeholder={Workspace.EnterHere}
          maxLength={0}
          className="!resize-none !h-full focus:border-gray50 hover:border-0"
          onChange={handleChange}
        />
      </div>
      <div className="flex py-6 md:justify-between items-center sm:flex-wrap md:flex-nowrap sm:gap-2 sm:justify-center">
        <div className="flex items-center gap-4">
          {buttons.map((btn, index) => (
            <Button
              key={`button-item-${index}`}
              size={undefined}
              variant={btn.variant}
              onClick={btn.onclick}
              icon={btn.icon}
              name={btn.name}
              className={btn.className}
            />
          ))}
        </div>
        <div className="font-poppins text-xs text-primary700 p-2 border-2 border-primary700 rounded-2xl">
          {Workspace.CharacterLimit}
        </div>
      </div>
    </div>
  );
};

export default OutputSection;
