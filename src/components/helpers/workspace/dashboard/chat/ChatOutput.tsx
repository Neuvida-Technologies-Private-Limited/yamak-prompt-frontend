import { useRecoilState } from 'recoil';

import { Button, Input, Label } from 'components/common';
import { generateChatOutputState } from 'middleware/state';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';
import ChatBox from './ChatBox';

interface ChatOutputProps {
  onSubmit: (event: React.FormEvent) => Promise<void>;
}

const ChatOutput: React.FC<ChatOutputProps> = ({ onSubmit }) => {
  const [{ user_message }, setChatOutputState] = useRecoilState(
    generateChatOutputState
  );

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
        <ChatBox />
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="user" className="font-poppins font-semibold">
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
        <Button
          variant={ButtonVariants.PRIMARY}
          size="small"
          name={'Submit'}
          htmlType="submit"
        />
      </form>
    </div>
  );
};

export default ChatOutput;
