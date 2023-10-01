import { atom } from 'recoil';
import { KeyDetailsType } from 'types';

const DataType = [
  { uuid: '' },
  { title: '' },
  { description: '' },
  { provider: '' },
  { api_key: '' },
];

export const createKeystate = atom({
  key: 'createKey-state',
  default: {
    title: '',
    api_key: '',
    description: '',
    provider: '',
    titleError: '',
    api_keyError: '',
    descriptionError: '',
    providerError: '',
  },
});
export const keyManagementstate = atom({
  key: 'key-management-state',
  default: {
    key_details: [] as KeyDetailsType[],
  },
});
