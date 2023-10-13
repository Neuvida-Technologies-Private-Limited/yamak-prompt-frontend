import React from 'react';
import { TextArea } from 'components/common';
import { TextAreaVariants, WorkspaceChatInputs } from 'utils/constants';
import { useRecoilState } from 'recoil';
import { generateChatOutputState } from 'middleware/state';

const ChatInputs: React.FC = () => {
  const [, setChatOutputState] = useRecoilState(generateChatOutputState);

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
            variant={TextAreaVariants.DEFAULT}
            onChange={event => {
              setChatOutputState(old => ({
                ...old,
                system_message: event.target.value,
              }));
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatInputs;
