import { atom } from 'recoil';
import { KeyDetailsType } from 'types';

export const createKeystate = atom({
  key: 'createKey-state',
  default: {
    title: 'test',
    api_key: 'test12312',
    description: 'test',
    provider: 'Bard',
    titleError: '',
    api_keyError: '',
    descriptionError: '',
    providerError: '',
  },
});
export const keyManagementState = atom({
  key: 'key-management-state',
  default: {
    results: [] as KeyDetailsType[],
  },
});
