import { Button, Input, Label, Spinner, Text } from 'components/common';
import {
  generateChatOutputState,
  workspaceChatOutputs,
} from 'middleware/state';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';

interface ChatOutputProps {
  onSubmit: () => Promise<void>;
}

const ChatOutput: React.FC<ChatOutputProps> = ({ onSubmit }) => {
  const [
    { chats, isLoading, hasNext, hasPrevious, currentPage },
    setChatOutputs,
  ] = useRecoilState(workspaceChatOutputs);
  const [{ user_message }, setChatOutputState] = useRecoilState(
    generateChatOutputState
  );
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleTitleChange = (title: string) => {
    setChatOutputState(old => ({
      ...old,
      title,
    }));
  };

  const handleLabelsChange = (tags: string) => {
    setChatOutputState(old => ({
      ...old,
      tags: tags,
    }));
  };

  const handleUserMessage = (message: string) => {
    setChatOutputState(old => ({ ...old, user_message: message }));
  };

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
    <div className="flex flex-col col-span-3 justify-between">
      <div className="flex flex-col">
        <div className="flex pb-4">
          <Input
            id={Workspace.PromptTitle}
            name={Workspace.PromptTitle}
            placeholder={Workspace.PromptTitle}
            onChange={handleTitleChange}
            variant={InputVariants.Filled}
            className="!w-1/2 !mb-0"
          />
          <Label onChange={handleLabelsChange} initialLabels={''} />
        </div>
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
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="user" className="font-semibold">
          {Workspace.User}
        </label>
        <Input
          variant={InputVariants.Filled}
          id={Workspace.User}
          name={Workspace.User}
          placeholder={Workspace.EnterHere}
          onChange={handleUserMessage}
          value={user_message}
        />
      </div>
      <div className="flex md:justify-between items-center sm:flex-wrap md:flex-nowrap sm:gap-2 sm:justify-center">
        <div className="flex items-center gap-4">
          <Button
            variant={ButtonVariants.PRIMARY}
            size="small"
            onClick={onSubmit}
            name={'Submit'}
          />
          <Button
            variant={ButtonVariants.PRIMARY_LIGHT}
            size="small"
            onClick={() => {}}
            name={'Bookmark'}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatOutput;
