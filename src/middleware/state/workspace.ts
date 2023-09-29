import { atom } from 'recoil';

const DataType = [
  { id: '' },
  { title: '' },
  { model_key: '' },
  { user_uuid: '' },
];

export const workspaceState = atom({
  key: 'workspace-state',
  default: {
    workspace_details: DataType,
  },
});
