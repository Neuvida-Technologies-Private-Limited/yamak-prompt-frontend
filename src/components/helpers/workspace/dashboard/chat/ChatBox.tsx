import { useRef, useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { Button, Spinner, Text } from 'components/common';
import { workspaceChatOutputs } from 'middleware/state';
import { ButtonVariants } from 'utils/constants';

const ChatBox = () => {
  const [
    { chats, isLoading, hasNext, hasPrevious, currentPage },
    setChatOutputs,
  ] = useRecoilState(workspaceChatOutputs);
  const bottomRef = useRef<HTMLDivElement>(null);

  function loadPreviousChats() {
    setChatOutputs(old => ({ ...old, currentPage: currentPage + 1 }));
  }

  function loadLatestChats() {
    setChatOutputs(old => ({ ...old, currentPage: currentPage - 1 }));
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats.length]);

  return (
    <div className="font-poppins flex flex-col w-full border rounded-lg h-[30rem] overflow-y-scroll shadow">
      {hasNext && (
        <Button
          variant={ButtonVariants.PRIMARY_LINK}
          name={'Load previous messages'}
          onClick={loadPreviousChats}
        />
      )}
      {chats.length === 0 && !isLoading && (
        <div className="p-4">
          <p className="text-gray700">Start chatting...</p>
        </div>
      )}
      {chats.length > 0 &&
        chats.map((chat, index) => (
          <div
            key={chat.uuid}
            className={`flex flex-col gap-4 p-4 border-b text-gray700 ${
              index % 2 === 0 ? '' : 'bg-gray50'
            }`}
          >
            <div>
              <h4 className="font-semibold text-gray900 mb-2">User</h4>
              <Text children={chat.user_message} />
            </div>
            <div>
              <h4 className="font-semibold text-gray900 mb-2">Assistant</h4>
              <Text children={chat.prompt_output.join('. ')} />
            </div>
          </div>
        ))}
      {isLoading && <Spinner />}
      {hasPrevious && (
        <Button
          variant={ButtonVariants.PRIMARY_LINK}
          name={'Load Next messages'}
          onClick={loadLatestChats}
        />
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ChatBox;
