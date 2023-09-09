import { Workspace } from 'utils/contants';

const handleChange = () => {};

const handleConnection = () => {};

const handleSaveKey = () => {};

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
    name: Workspace.Test,
    onClick: handleConnection,
    className: 'text-black font-poppins font-bold',
  },
  {
    name: Workspace.Save,
    onClick: handleSaveKey,
    className: 'text-secondary font-poppins font-bold',
  },
];
