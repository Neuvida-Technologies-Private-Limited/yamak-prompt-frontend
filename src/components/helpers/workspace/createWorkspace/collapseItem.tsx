import React from 'react';
import { Button, Input } from 'components/common';
import { Inputs, Buttons } from './constants';
import { InputVariants } from 'utils/constants';

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
              placeholder={input.placeholder}
              onChange={input.onChange}
              variant={InputVariants.Filled}
            />
          )
        )}
      </div>
      <div className="flex justify-between">
        {Buttons.map(button => (
          <Button
            size={undefined}
            variant={button.variant}
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
