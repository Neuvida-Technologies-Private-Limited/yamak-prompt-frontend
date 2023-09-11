import React from 'react';
import { FiBookmark } from 'react-icons/fi';
import { Button, Input, StyledInput } from 'components/common';
import { Workspace } from 'utils/constants';

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
      'flex items-center bg-gray200 text-gray600 font-poppins border-2 border-gray200 h-10 px-4 rounded-lg',
    icon: <FiBookmark />,
  },
];

const handleChange = () => {};
const handleClick = () => {};

const index: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <Input
          id={Workspace.PromptTitle}
          name={Workspace.PromptTitle}
          placeholder={Workspace.PromptTitle}
          className="p-2"
          onChange={handleChange}
        />
      </div>
      <div className="flex pt-6 h-full">
        <StyledInput
          label={Workspace.Output}
          placeholder={Workspace.EnterHere}
          className="w-full"
        />
      </div>
      <div className="flex py-6 ">
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
    </div>
  );
};

export default index;
