import { StyledInput } from 'components/common';
import React from 'react';

const inputs = [
  {
    label: 'System',
    placeholder: 'You are helpful assistance',
    className: ' w-full',
  },
  {
    label: 'User',
    placeholder: 'Classify the following {{text 1}} into one of the following',
    className: 'pt-6 w-full',
  },
  {
    label: 'Variable',
    placeholder: 'Name          Value',
    className: 'py-6 w-full',
  },
];

const index: React.FC = () => {
  return (
    <div className="grid grid-rows-3 h-full">
      {inputs.map(item => (
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
