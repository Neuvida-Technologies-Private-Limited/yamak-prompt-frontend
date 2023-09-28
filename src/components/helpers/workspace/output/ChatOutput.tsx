import { Button, Input, Label } from 'components/common';
import { Workspace } from 'utils/constants';

const ChatOutput = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="h-full">
        <div className="flex items-center">
          <Input
            variant="filled"
            id="prompt-title"
            name="prompt title"
            placeholder="Prompt title"
            onChange={() => {}}
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
              variant="filled"
              id="user-chat"
              name="user"
              placeholder="Enter the user message here"
              onChange={() => {}}
              className="bg-transparent border-b-2 rounded-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="assistant" className="font-bold">
              Assistant
            </label>
            <Input
              variant="filled"
              id="assistant-chat"
              name="assistant"
              placeholder="Enter the user message here"
              onChange={() => {}}
              className="bg-transparent border-b-2 rounded-none"
            />
          </div>
        </div>
      </div>
      <div className="flex py-6 md:justify-between items-center sm:flex-wrap md:flex-nowrap sm:gap-2 sm:justify-center">
        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            size="small"
            onClick={() => {}}
            name={'Submit'}
          />
          <Button
            variant="default"
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
