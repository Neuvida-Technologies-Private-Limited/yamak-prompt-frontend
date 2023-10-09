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

export const keyPaginationState = atom({
  key: 'key-pagination-state',
  default: {
    currentPage: 1,
    count: 0,
    itemsPerPage: 10,
    hasNext: null,
    hasPrevious: null,
    query: '',
    totalPages: 0,
  },
});
