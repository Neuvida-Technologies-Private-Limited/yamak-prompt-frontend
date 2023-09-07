import React from 'react';
import { Button, Input } from 'components/common';
import { Inputs, Buttons } from './constants';

const collapseItem: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div>
        {Inputs.map(
          (input: {
            id: string;
            name: string;
            placeholder: string;
            onChange: (value: string) => void;
          }) => (
            <Input
              id={input.id}
              name={input.name}
              className="p-2 w-full placeholder:text-gray400 bg-gray100 mb-4"
              placeholder={input.placeholder}
              onChange={input.onChange}
            />
          )
        )}
      </div>
      <div className="flex justify-between">
        {Buttons.map(
          (button: {
            onClick: () => void;
            name: string | undefined;
            className: string | undefined;
          }) => (
            <Button
              size={undefined}
              type={'link'}
              shape={undefined}
              onClick={button.onClick}
              name={button.name}
              className={button.className}
            />
          )
        )}
      </div>
    </div>
  );
};

export default collapseItem;
