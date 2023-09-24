import { atom } from 'recoil';

export const keyManagementstate = atom({
  key: 'key-management-state',
  default: {
    title: '',
    api_key: '',
    description: '',
    provider: '',
  },
});
