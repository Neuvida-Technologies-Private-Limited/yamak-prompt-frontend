import React from 'react';
import { StyledInput } from 'components/common';
import { Inputs } from './constants';

const index: React.FC = () => {
  return (
    <div className="grid grid-rows-3 h-full">
      {Inputs.map(item => (
        <div className={item.className}>
          <StyledInput
            label={item.label}
            placeholder={item.placeholder}
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default index;
