import { Button, Heading, Input, Label, Text } from 'components/common';
import {
  Workspace,
  InputVariants,
  ButtonVariants,
  TextVariants,
} from 'utils/constants';

const ChatOutput = () => {
  return (
    <div className="flex flex-col col-span-2 justify-between">
      <div className="flex flex-col">
        <div className="flex pb-4">
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
        <div className="font-poppins flex flex-col gap-4 w-full border rounded-lg p-4 h-[30rem] overflow-y-scroll">
          <div>
            <Heading level={5} children={'What is react js?'} />
            <Text variant={TextVariants.MEDIUM}>
              Suspendisse blandit suscipit risus, sit amet faucibus tortor
              egestas nec. Duis faucibus risus nisl, nec mattis urna luctus at.
              Phasellus quis euismod massa, vel tristique odio. Phasellus et
              commodo nisl, sit amet rhoncus sem. Duis sit amet sem ut ante
            </Text>
          </div>
          <div>
            <Heading
              level={5}
              children={'Tell me something about generative AI and its uses?'}
            />
            <Text variant={TextVariants.MEDIUM}>
              Suspendisse blandit suscipit risus, sit amet faucibus tortor
              egestas nec. Duis faucibus risus nisl, nec mattis urna luctus at.
              Phasellus quis euismod massa, vel tristique odio. Phasellus et
              commodo nisl, sit amet rhoncus sem. Duis sit amet sem ut ante
              Suspendisse blandit suscipit risus, sit amet faucibus tortor
              egestas nec. Duis faucibus risus nisl, nec mattis urna luctus at.
              Phasellus quis euismod massa, vel tristique odio. Phasellus et
              commodo nisl, sit amet rhoncus sem. Duis sit amet sem ut ante
              Suspendisse blandit suscipit risus, sit amet faucibus tortor
              egestas nec. Duis faucibus risus nisl, nec mattis urna luctus at.
              Phasellus quis euismod massa, vel tristique odio. Phasellus et
              commodo nisl, sit amet rhoncus sem. Duis sit amet sem ut ante
              Suspendisse blandit suscipit risus, sit amet faucibus tortor
              egestas nec. Duis faucibus risus nisl, nec mattis urna luctus at.
              Phasellus quis euismod massa, vel tristique odio. Phasellus et
              commodo nisl, sit amet rhoncus sem. Duis sit amet sem ut ante
              Suspendisse blandit suscipit risus, sit amet faucibus tortor
              egestas nec. Duis faucibus risus nisl, nec mattis urna luctus at.
              Phasellus quis euismod massa, vel tristique odio. Phasellus et
              commodo nisl, sit amet rhoncus sem. Duis sit amet sem ut ante
            </Text>
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
          onChange={() => {}}
        />
      </div>
      <div className="flex md:justify-between items-center sm:flex-wrap md:flex-nowrap sm:gap-2 sm:justify-center">
        <div className="flex items-center gap-4">
          <Button
            variant={ButtonVariants.PRIMARY}
            size="small"
            onClick={() => {}}
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
