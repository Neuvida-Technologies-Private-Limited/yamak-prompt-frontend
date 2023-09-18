import React from 'react';
import { FiBookmark, FiClock } from 'react-icons/fi';
import { Button, Input, StyledInput } from 'components/common';
import { Workspace, InputVariants } from 'utils/constants';
import { WorkspaceHistory } from 'components/helpers';

const buttons = [
  {
    onclick: () => handleClick,
    name: 'Submit',
    className:
      'createWorkspace bg-primary h-10 px-7 rounded-lg mr-2 font-bold text-white border-none font-poppins hover:bg-hoverPrimary transition-all ease-in-out duration-300',
  },
  {
    onclick: () => handleClick,
    name: 'Bookmark',
    className:
      'md:flex items-center bg-gray100 text-gray500 font-poppins border-2 border-none h-10 px-4 rounded-lg sm:hidden',
    icon: <FiBookmark />,
  },
  {
    onclick: () => handleClick,
    className:
      'sm:flex items-center justify-center md:bg-gray100 md:text-gray500 sm:text-primary700 md:border-none sm:border sm:border-primary700 font-poppins !p-4 text-lg rounded-md md:hidden',
    icon: <FiBookmark />,
  },
  {
    onclick: () => handleHistoryClick,
    className:
      'sm:flex items-center justify-center md:bg-gray100 md:text-gray500 sm:text-primary700 md:border-none sm:border sm:border-primary700 font-poppins !p-4 text-lg rounded-md md:hidden',
    icon: <FiClock />,
  },
];

const handleChange = () => {};
const handleClick = () => {};
const handleHistoryClick = () => {};

const index: React.FC = () => {
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
      <div className="flex pt-6 h-full">
        <StyledInput
          label={Workspace.Output}
          placeholder={Workspace.EnterHere}
          className="w-full"
        />
      </div>
      <div className="flex py-6 md:justify-between items-center sm:flex-wrap md:flex-nowrap sm:gap-2 sm:justify-center">
        <div className="flex items-center gap-4">
          {buttons.map(btn => (
            <Button
              size={undefined}
              type={'default'}
              shape={undefined}
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

export default index;
