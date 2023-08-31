import { Button, Input } from 'components/common';
import React from 'react';
import { Workspace } from 'utils/constants';

const handleChange = () => {};

const handleConnection = () => {};

const handleSaveKey = () => {};

const inputs = [
  {
    id: '1',
    name: Workspace.KeyName,
    placeholder: Workspace.KeyName,
    onChange: handleChange,
  },
  {
    id: '2',
    name: Workspace.LLMProvider,
    placeholder: Workspace.LLMProvider,
    onChange: handleChange,
  },
  {
    id: '3',
    name: Workspace.LLMKey,
    placeholder: Workspace.LLMKey,
    onChange: handleChange,
  },
];
const buttons = [
  {
    name: 'Test Connection',
    onClick: handleConnection,
    className: 'text-black font-poppins font-bold',
  },
  {
    name: 'Save the key',
    onClick: handleSaveKey,
    className: 'text-secondary font-poppins font-bold',
  },
];

const collapseItem: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div>
        {inputs.map(input => (
          <Input
            id={input.id}
            name={input.name}
            className="p-2 w-full placeholder:text-gray400 bg-gray100 mb-4"
            placeholder={input.placeholder}
            onChange={input.onChange}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {buttons.map(button => (
          <Button
            size={undefined}
            type={'link'}
            shape={undefined}
            onClick={button.onClick}
            name={button.name}
            className={button.className}
          />
        ))}
      </div>
    </div>
  );
};

export default collapseItem;
