import React from 'react';
import { TextArea } from 'components/common';
import { WorkspaceChatInputs } from 'utils/constants';

const handleChange = () => {};

const ChatInputs: React.FC = () => {
  return (
    <div className="grid h-full">
      {WorkspaceChatInputs.map((item, index) => (
        <div
          key={`input-section-item-${index}`}
          className="flex flex-col font-poppins border rounded-lg p-4 h-full"
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

export default ChatInputs;
