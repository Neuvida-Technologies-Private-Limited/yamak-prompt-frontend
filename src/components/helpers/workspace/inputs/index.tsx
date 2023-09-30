import React from 'react';
import { TextArea } from 'components/common';
import { Inputs } from './constants';

const handleChange = () => {};

const InputSection: React.FC = () => {
  return (
    <div className="grid h-full">
      {Inputs.map((item, index) => (
        <div
          key={`input-section-item-${index}`}
          className="flex flex-col font-poppins border rounded-lg border-gray200 p-4 h-full"
        >
          <label className="font-semibold pb-2">{item.label}</label>
          <TextArea
            id={item.id}
            name={item.placeholder}
            rows={10}
            placeholder={item.placeholder}
            maxLength={0}
            className="!resize-none !h-full focus:border-gray50 hover:border-0"
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
};

export default InputSection;
