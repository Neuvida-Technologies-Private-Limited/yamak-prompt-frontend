import { atom } from 'recoil';
import { KeyDetailsType } from 'types';

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
    query: '',
    itemsPerPage: 5,
    hasNext: null,
    hasPrevious: null,
    totalPages: 0,
  },
});
