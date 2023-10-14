import { Button, Input, Label } from 'components/common';
import { generateChatOutputState } from 'middleware/state';
import { useRecoilState } from 'recoil';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';
import Typewriter from 'typewriter-effect';

interface ChatOutputProps {
  onSubmit: () => Promise<void>;
}

const ChatOutput: React.FC<ChatOutputProps> = ({ onSubmit }) => {
  const [chatOutputState, setChatOutputState] = useRecoilState(
    generateChatOutputState
  );

  const handleTitleChange = (title: string) => {
    setChatOutputState(old => ({
      ...old,
      title,
    }));
  };

  const handleLabelsChange = (tags: string[]) => {
    setChatOutputState(old => ({
      ...old,
      tags: [...tags],
    }));
  };

  const handleUserMessage = (message: string) => {
    setChatOutputState(old => ({ ...old, user_message: message }));
  };

  return (
    <div className="flex flex-col col-span-2 justify-between">
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
          <Label onChange={handleLabelsChange} />
        </div>
        <div className="font-poppins flex flex-col gap-4 w-full border rounded-lg h-[30rem] overflow-y-scroll">
          <div className="flex flex-col gap-2 border-b-2 p-4">
            <h4 className="font-semibold text-gray700">Assistant</h4>
            <Typewriter
              options={{
                strings: chatOutputState.output,
                autoStart: true,
                loop: false,
                delay: 50,
              }}
            />
          </div>
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
          value={chatOutputState.user_message}
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
        <div className="font-poppins text-xs text-primary700 p-2 border-2 border-primary700 rounded-2xl">
          {Workspace.CharacterLimit}
        </div>
      </div>
    </div>
  );
};

export default ChatOutput;
