import { Button, Input, Label } from 'components/common';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';

const ChatOutput = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="h-full">
        <div className="flex items-center">
          <Input
            id={Workspace.PromptTitle}
            name={Workspace.PromptTitle}
            placeholder={Workspace.PromptTitle}
            onChange={() => {}}
            variant={InputVariants.Filled}
            className="!w-1/2 !mb-0"
          />
          <Label />
        </div>
        <div className="flex flex-col w-full border p-4 rounded-lg h-3/4">
          <div className="flex flex-col gap-2">
            <label htmlFor="user" className="font-bold">
              User
            </label>
            <Input
              variant={InputVariants.Default}
              id="user-chat"
              name="user"
              placeholder={Workspace.EnterHere}
              onChange={() => {}}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="assistant" className="font-bold">
              Assistant
            </label>
            <Input
              variant={InputVariants.Default}
              id="assistant-chat"
              name="assistant"
              placeholder={Workspace.EnterHere}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
      <div className="flex py-6 md:justify-between items-center sm:flex-wrap md:flex-nowrap sm:gap-2 sm:justify-center">
        <div className="flex items-center gap-4">
          <Button
            variant={ButtonVariants.PRIMARY}
            size="small"
            onClick={() => {}}
            name={'Submit'}
          />
          <Button
            variant={ButtonVariants.DEFAULT}
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
