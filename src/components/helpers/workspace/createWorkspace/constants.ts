import { Workspace, ButtonVariants } from 'utils/constants';

const handleChange = () => {};

const handleConnection = () => {};

const handleAddKey = () => {};

export const Inputs = [
  {
    id: '1',
    name: Workspace.KeyName,
    placeholder: Workspace.KeyName,
    onChange: handleChange,
  },
  {
    id: '2',
    name: Workspace.LLMProvider,
    placeholder: Workspace.LLMProvider,
    onChange: handleChange,
  },
  {
    id: '3',
    name: Workspace.LLMKey,
    placeholder: Workspace.LLMKey,
    onChange: handleChange,
  },
];
export const Buttons = [
  {
    name: Workspace.AddKey,
    onClick: handleAddKey,
    variant: ButtonVariants.LINK,
  },
  {
    name: Workspace.Test,
    onClick: handleConnection,
    variant: ButtonVariants.LINK,
    className:
      '!text-secondary !decoration-secondary hover:!decoration-primary',
  },
];
